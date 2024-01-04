import { useEffect, useState, Suspense } from "react";
import { Blurhash } from "react-blurhash";
import { calculateImageHeight, calculateImageWidth } from "../utils";
import ImageOverlay from "./Overlay";
import { Nullable } from "unsplash-js/dist/helpers/typescript";
import { useParams } from "react-router-dom";
import { SRC_FULL_HEIGHT } from "../constants";

interface Props {
  altDescription: Nullable<string>;
  blurHash: Nullable<string>;
  height: number;
  width: number;
  id: string;
  src: string;
  username: string;
  userProfileImage: string;
  userProfileLink: string;
  columnWidth?: number | null;
  srcFull: string;
  imageType: "thumbnail" | "full";
  downloadLink: string;
}

const Image = ({
  altDescription,
  blurHash,
  height,
  width,
  id,
  src,
  srcFull,
  username,
  userProfileImage,
  userProfileLink,
  columnWidth,
  imageType,
  downloadLink,
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const params = useParams();

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
          <Suspense>
            <img
              loading={params.id ? "eager" : "lazy"}
              className="image"
              src={imageType === "thumbnail" ? src : srcFull}
              alt={altDescription ?? "image"}
            />
          </Suspense>
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

        {isHovered && imageType === "thumbnail" && (
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
