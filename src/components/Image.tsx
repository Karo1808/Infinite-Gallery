import { MouseEvent, useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import {
  Location,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { MOBILE_CONDITION, SRC_FULL_HEIGHT } from "../constants";
import styles from "../styles/image.module.css";
import { Photo } from "../types";
import {
  calculateImageHeight,
  calculateImageWidth,
  formatSearchParams,
} from "../utils";
import ImageOverlay from "./Overlay";

interface Props {
  photo: Photo;
  columnWidth?: number | null;
  imageType: "thumbnail" | "full" | "details";
  fromUserGallery?: boolean;
}

const Image = ({ photo, columnWidth, imageType, fromUserGallery }: Props) => {
  const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const routeState = location.state as
    | { background?: Location; source?: "gallery" | "user" }
    | null;

  const calculatedHeight = calculateImageHeight({
    columnWidth,
    imageWidth: photo.width,
    imageHeight: photo.height,
  });
  const calculatedWidth = calculateImageWidth({
    height: SRC_FULL_HEIGHT,
    imageWidth: photo.width,
    imageHeight: photo.height,
  });
  const source = imageType === "full" ? photo.srcFull : photo.src;
  const photoLocation = {
    pathname: `/image/${photo.id}`,
    search: formatSearchParams({
      query: searchParams.get("query"),
      username: photo.usernameId,
    }),
  };

  useEffect(() => setImageStatus("loading"), [source]);

  const openPhoto = () => {
    const useModal = window.innerWidth >= MOBILE_CONDITION;
    const background = routeState?.background ?? location;

    navigate(
      photoLocation,
      useModal
        ? {
            replace: Boolean(routeState?.background),
            state: {
              background,
              source: fromUserGallery ? "user" : "gallery",
            },
          }
        : undefined
    );
  };

  const handlePhotoLink = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    openPhoto();
  };

  const image = (
    <img
      loading={imageType === "thumbnail" ? "lazy" : "eager"}
      className={styles.image}
      src={source}
      srcSet={
        imageType === "thumbnail"
          ? `${photo.src} 720w, ${photo.srcMobile} 1200w`
          : undefined
      }
      sizes={
        imageType === "thumbnail" ? "(max-width: 600px) 100vw, 34vw" : undefined
      }
      alt={photo.altDescription ?? `Photo by ${photo.username}`}
      onLoad={() => setImageStatus("loaded")}
      onError={() => setImageStatus("error")}
    />
  );

  return (
    <div
      className={styles.image_container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageStatus === "loading" && (
        <div className={styles.placeholder} aria-hidden="true">
          <Blurhash
            hash={photo.blurHash ?? "LEHV6nWB2yk8pyo0adR*.7kCMdnj"}
            width={imageType === "full" ? calculatedWidth : "100%"}
            height={imageType === "full" ? SRC_FULL_HEIGHT : calculatedHeight}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
      )}

      {imageStatus === "error" && (
        <div className={styles.image_error} role="status">
          Photo unavailable
        </div>
      )}

      {imageType === "thumbnail" ? (
        <a
          href={`#${photoLocation.pathname}${photoLocation.search}`}
          className={styles.image_link}
          onClick={handlePhotoLink}
          aria-label={`View ${photo.altDescription ?? `photo by ${photo.username}`}`}
        >
          {imageStatus !== "error" && image}
        </a>
      ) : (
        imageStatus !== "error" ? image : null
      )}

      {isHovered &&
        imageStatus === "loaded" &&
        imageType === "thumbnail" &&
        columnWidth && <ImageOverlay photo={photo} openPhoto={openPhoto} />}
    </div>
  );
};

export default Image;
