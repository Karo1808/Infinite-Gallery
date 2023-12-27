import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useInfiniteQueryImages } from "../hooks";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "./Image";

const Gallery = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQueryImages();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const columnWidth =
    windowWidth <= 350
      ? windowWidth
      : windowWidth <= 750
      ? (windowWidth - 20) / 2
      : (windowWidth - 40) / 3;
  console.log(columnWidth);

  useEffect(() => {
    // Function to update window width in state
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("resize", updateWindowWidth);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  const photos = data?.pages.reduce((acc, page) => {
    if (page?.photos) {
      acc.push(...page.photos.results);
    }
    return acc;
  }, [] as Basic[]);
  console.log(photos);
  return (
    <div>
      <InfiniteScroll
        dataLength={photos ? photos?.length : 0}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loading={<div>loading...</div>}
      >
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="20px">
            {photos &&
              photos.map((photo) => (
                <Image
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  key={photo.id}
                  hash={photo.blur_hash}
                  columnWidth={columnWidth}
                  imageWidth={photo.width}
                  imageHeight={photo.height}
                />
              ))}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </div>
  );
};

export default Gallery;
