import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { calculateImageHeight, calculateImageWidth } from "../utils";
import ImageOverlay from "./Overlay";
import { useParams } from "react-router-dom";
import { MOBILE_CONDITION, SRC_FULL_HEIGHT } from "../constants";
import {
  useInfiniteQueryImages,
  usePhotoById,
  useViewportInitalSizeAndResize,
} from "../hooks";

interface Props {
  byId?: boolean;
  columnWidth?: number | null;
  imageType: "thumbnail" | "full";
  currentId: string;
}

const Image = ({ byId, columnWidth, imageType, currentId }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { viewportWidth } = useViewportInitalSizeAndResize();
  const params = useParams();

  const { photo } = usePhotoById({ id: params.id || "" });
  const { photos } = useInfiniteQueryImages();

  const currentPhoto = byId
    ? photo
    : photos?.find((photo) => photo.id === currentId);

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
  } = currentPhoto;

  const calculatedHeight = calculateImageHeight({
    columnWidth,
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
    if (!params.id) {
      img.onload = () => {
        setIsImageLoaded(true);
      };
    }
    img.src = src;
    img.alt = altDescription ?? "image";
  }, [src]);

  return (
    <>
      <div style={{ display: isImageLoaded ? "none" : "block" }}>
        <Blurhash
          hash={blurHash ?? "LEHV6nWB2yk8pyo0adR*.7kCMdnj"}
          width={params.id ? calculatedWidth : "100%"}
          height={params.id ? SRC_FULL_HEIGHT : calculatedHeight}
          resolutionX={32}
          resolutionY={32}
          punch={1}
          className="blurhash"
        />
      </div>

      <div
        className="image-container"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        style={{ display: isImageLoaded ? "block" : "none" }}
      >
        {!params.id && (
          <img
            loading={params.id ? "eager" : "lazy"}
            className="image"
            src={imageType === "thumbnail" ? src : srcFull}
            alt={altDescription ?? "image"}
          />
        )}

        {params.id && (
          <img
            loading={params.id ? "eager" : "lazy"}
            className="image"
            src={imageType === "thumbnail" ? src : srcFull}
            alt={altDescription ?? "image"}
            onLoad={() => setIsImageLoaded(true)}
          />
        )}

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
            />
          )}
      </div>
    </>
  );
};

export default Image;
