import { RefObject, SyntheticEvent, useEffect, useRef, useState } from "react";
import { Blurhash } from "react-blurhash";
import {
  calculateImageHeight,
  calculateImageWidth,
  formatSearchParams,
} from "../utils";
import ImageOverlay from "./Overlay";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { MOBILE_CONDITION, SRC_FULL_HEIGHT } from "../constants";
import {
  useInfiniteQueryImages,
  useInfinityQueryByUser,
  usePhotoById,
  useViewportInitalSizeAndResize,
} from "../hooks";

import styles from "../styles/image.module.css";
import { useRootLocationContext } from "../context/root-location-context";
import { useIsUserContext } from "../context/is-user-context";

interface Props {
  byId?: boolean;
  columnWidth?: number | null;
  imageType: "thumbnail" | "full" | "details";
  currentId: string;
  user?: string;
}

const Image = ({ byId, columnWidth, imageType, currentId, user }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const params = useParams();
  const imageRef = useRef(null);
  const linkRef = useRef(null);
  const navigate = useNavigate();
  const { rootLocation, setRootLocation } = useRootLocationContext();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { setIsUser } = useIsUserContext();
  const { photo } = usePhotoById({ id: params.id || "" });
  const { photos } = useInfiniteQueryImages();
  const { photos: photosByUsername } = useInfinityQueryByUser();

  const currentPhoto = byId
    ? photo
    : user
    ? photosByUsername?.find((photo) => photo.id === currentId)
    : photos?.find((photo) => photo.id === currentId);
  const { viewportWidth } = useViewportInitalSizeAndResize();
  const query = searchParams.get("query");

  const handleClickImage = (e: SyntheticEvent, ref: RefObject<HTMLElement>) => {
    if (user) {
      setIsUser(true);
    }
    if (!user) {
      setRootLocation(location);
    }

    if (ref.current && e.target === ref.current) {
      navigate(
        {
          pathname: `/image/${id}`,
          search: formatSearchParams({ query, username: usernameId }),
        },
        {
          state: { background: user ? rootLocation : location },
        }
      );
    }
  };

  const handleClickImageMobile = (
    e: SyntheticEvent,
    ref: RefObject<HTMLElement>
  ) => {
    if (ref.current && e.target === ref.current) {
      navigate({
        pathname: `/image/${id}`,
        search: formatSearchParams({ query, username: usernameId }),
      });
    }
  };

  if (!currentPhoto) return;
  const {
    altDescription,
    blurHash,
    height,
    width,
    src,
    username,
    userProfileImage,
    downloadLink,
    userProfileLink,
    srcFull,
    id,
    usernameId,
  } = currentPhoto;

  const calculatedHeight = calculateImageHeight({
    columnWidth: imageType === "details" ? viewportWidth : columnWidth,
    imageWidth: width,
    imageHeight: height,
  });

  const calculatedWidth = calculateImageWidth({
    height: SRC_FULL_HEIGHT,
    imageWidth: width,
    imageHeight: height,
  });

  useEffect(() => {
    const img = new window.Image();
    if (imageType === "thumbnail" || imageType === "details") {
      img.onload = () => {
        setIsImageLoaded(true);
      };
    }
    img.src = src;
    img.alt = altDescription ?? "image";
  }, [location.pathname]);

  return (
    <>
      <div style={{ display: isImageLoaded ? "none" : "block" }}>
        <Blurhash
          hash={blurHash ?? "LEHV6nWB2yk8pyo0adR*.7kCMdnj"}
          width={
            imageType === "full" || imageType === "details"
              ? calculatedWidth
              : "100%"
          }
          height={imageType === "full" ? SRC_FULL_HEIGHT : calculatedHeight}
          resolutionX={32}
          resolutionY={32}
          punch={1}
          className={styles.blurhash}
        />
      </div>

      <div
        className={styles.image_container}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        style={{ display: isImageLoaded ? "block" : "none" }}
      >
        <a
          className={styles.image_link}
          onClick={
            viewportWidth > MOBILE_CONDITION
              ? (e) => handleClickImage(e, linkRef)
              : (e) => handleClickImageMobile(e, linkRef)
          }
          ref={linkRef}
        >
          <img
            loading={params.id ? "eager" : "lazy"}
            className={styles.image}
            src={imageType === "full" ? srcFull : src}
            alt={altDescription ?? "image"}
            onClick={
              viewportWidth > MOBILE_CONDITION
                ? (e) => handleClickImage(e, imageRef)
                : (e) => handleClickImageMobile(e, imageRef)
            }
            onLoad={
              imageType == "full" ? () => setIsImageLoaded(true) : () => {}
            }
            ref={imageRef}
          />
        </a>

        {isHovered &&
          imageType === "thumbnail" &&
          columnWidth &&
          viewportWidth &&
          viewportWidth > MOBILE_CONDITION && (
            <ImageOverlay
              username={username}
              profilePhoto={userProfileImage}
              profileLink={userProfileLink}
              id={id}
              downloadLink={downloadLink}
              handleClick={handleClickImage}
            />
          )}
      </div>
    </>
  );
};

export default Image;
