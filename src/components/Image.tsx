import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { calculateImageHeight } from "../utils";

const Image = ({
  src,
  alt,
  hash,
  columnWidth,
  imageWidth,
  imageHeight,
}: {
  src: string;
  alt: string;
  hash: string;
  columnWidth: number;
  imageWidth: number;
  imageHeight: number;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const calculatedHeight = calculateImageHeight({
    columnWidth,
    imageHeight,
    imageWidth,
  });

  useEffect(() => {
    const img = new window.Image();

    img.onload = () => {
      setImageLoaded(true);
    };

    img.src = src;
    img.alt = alt;
  }, []);

  return (
    <>
      {!imageLoaded && (
        <Blurhash
          hash={hash ?? "LEHV6nWB2yk8pyo0adR*.7kCMdnj"}
          width={"100%"}
          height={`${calculatedHeight}px`}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
      {imageLoaded && <img src={src} alt={alt} />}
    </>
  );
};

export default Image;
