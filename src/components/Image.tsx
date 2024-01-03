import { useEffect, useState } from "react";
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
    console.log("triggered");
    img.onload = () => {
      console.log("started loading");
      setTimeout(() => {
        console.log("loaded");
        setIsImageLoaded(true);
      }, 2000);
      console.log("loading");
    };
    img.src = src;
    img.alt = altDescription ?? "image";
  }, [src]);

  return (
    <>
      <div style={{ display: isImageLoaded ? "none" : "block" }}>
        <Blurhash
          hash={blurHash ?? "LEHV6nWB2yk8pyo0adR*.7kCMdnj"}
          width={params.id ? calculatedWidth : "100%"}
          height={params.id ? 600 : calculatedHeight}
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
        <img
          loading="lazy"
          className="image"
          src={imageType === "thumbnail" ? src : srcFull}
          alt={altDescription ?? "image"}
        />
        {isHovered && imageType === "thumbnail" && (
          <ImageOverlay
            username={username}
            profilePhoto={userProfileImage}
            profileLink={userProfileLink}
            id={id}
            downloadLink={src}
          />
        )}
      </div>
    </>
  );
};

export default Image;
