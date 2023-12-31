import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { calculateImageHeight } from "../utils";
import ImageOverlay from "./Overlay";
import { Nullable } from "unsplash-js/dist/helpers/typescript";

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
  columnWidth: number | null;
}

const Image = ({
  altDescription,
  blurHash,
  height,
  width,
  id,
  src,
  username,
  userProfileImage,
  userProfileLink,
  columnWidth,
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const calculatedHeight = calculateImageHeight({
    columnWidth,
    imageWidth: width,
    imageHeight: height,
  });

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setIsImageLoaded(true);
    };

    img.src = src;
    img.alt = altDescription ?? "image";
  }, []);

  return (
    <>
      {!isImageLoaded && (
        <Blurhash
          hash={blurHash ?? "LEHV6nWB2yk8pyo0adR*.7kCMdnj"}
          width="100%"
          height={calculatedHeight}
          resolutionX={32}
          resolutionY={32}
          punch={1}
          className="blurhash"
        />
      )}
      {isImageLoaded && (
        <div
          className="image-container"
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          <img
            loading="lazy"
            className="image"
            src={src}
            alt={altDescription ?? "image"}
          />
          {isHovered && (
            <ImageOverlay
              username={username}
              profilePhoto={userProfileImage}
              profileLink={userProfileLink}
              id={id}
              downloadLink={src}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Image;
