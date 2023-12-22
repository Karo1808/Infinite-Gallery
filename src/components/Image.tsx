const Image = ({ src, alt }: { src: string; alt: string }) => {
  return <img loading="lazy" className="image" src={src} alt={alt} />;
};

export default Image;
