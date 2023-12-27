import { useEffect, useState } from "react";
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

  useEffect(() => {
    const img = new window.Image();

    img.onload = () => {
      setTimeout(() => {
        setImageLoaded(true);
      }, 5000);
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
          height={"100px"}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
      {imageLoaded && <img loading="lazy" src={src} alt={alt} />}
    </>
  );
};

export default Image;
