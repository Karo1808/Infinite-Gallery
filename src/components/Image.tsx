import { useEffect, useRef, useState } from "react";
import { Blurhash } from "react-blurhash";

const Image = ({
  src,
  alt,
  hash,
}: {
  src: string;
  alt: string;
  hash: string;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimension, setImageDimension] = useState({
    width: 1000,
    height: 1000,
  });
  const imageRef = useRef();

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.alt = alt;

    img.onload = () => {
      setTimeout(() => {
        setImageLoaded(true);
      }, 5000);
    };

    if (imageRef.current) {
      setImageDimension({
        width: imageRef.current.width,
        height: imageRef.current.height,
      });
      console.log(imageDimension, imageRef.current.clientHeight, imageRef);
    }
  }, [imageRef]);

  return (
    <>
      {!imageLoaded && (
        <Blurhash
          hash={hash ?? "LEHV6nWB2yk8pyo0adR*.7kCMdnj"}
          width={`${imageDimension.width}px`}
          height={`${imageDimension.height}px`}
          resolutionX={100}
          resolutionY={100}
          punch={1}
        />
      )}
      <img
        loading="lazy"
        src={src}
        alt={alt}
        style={{ display: imageLoaded ? "block" : "hidden" }}
        ref={imageRef}
      />
    </>
  );
};

export default Image;
