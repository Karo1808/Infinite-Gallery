import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { calculateImageHeight } from "../utils";
import ImageOverlay from "./Overlay";
import { useMeasure } from "@uidotdev/usehooks";

interface Props {
  src: string;
  alt: string;
  hash: string;
  columnWidth: number;
  imageWidth: number;
  imageHeight: number;
}

const Image = ({
  src,
  alt,
  hash,
  columnWidth,
  imageWidth,
  imageHeight,
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const calculatedHeight = calculateImageHeight({
    columnWidth,
    imageHeight,
    imageWidth,
  });

  useEffect(() => {
    const img = new window.Image();

    img.onload = () => {
      setTimeout(() => {
        setIsImageLoaded(true);
      });
    };

    img.src = src;
    img.alt = alt;
  }, []);

  return (
    <>
      {!isImageLoaded && (
        <Blurhash
          hash={hash ?? "LEHV6nWB2yk8pyo0adR*.7kCMdnj"}
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
          <img loading="lazy" className="image" src={src} alt={alt} />
          {isHovered && <ImageOverlay />}
        </div>
      )}
    </>
  );
};

export default Image;
