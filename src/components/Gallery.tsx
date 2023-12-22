import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Gallery = () => {
  const [imageNames, setImageNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/images");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        setImageNames(data);
        console.log(imageNames);
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to fetch images, ${error.message}`);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ResponsiveMasonry>
        <Masonry gutter="50px">
          {imageNames.map((imageName) => (
            <img src={imageName} alt="image" key={imageName} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Gallery;
