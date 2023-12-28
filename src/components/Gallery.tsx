import { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import Masonry from "react-masonry-css";

import { useInfiniteQueryImages } from "../hooks";
import Image from "./Image";
import {
  BREAKPOINT_COLUMN_OBJECT,
  GUTTER_SIZE,
  THREE_COLUMNS_BREAKPOINT,
  TWO_COLUMNS_BREAKPOINT,
} from "../constants";

const Gallery = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQueryImages();
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  const columnWidth =
    windowWidth < TWO_COLUMNS_BREAKPOINT
      ? windowWidth
      : windowWidth < THREE_COLUMNS_BREAKPOINT
      ? (windowWidth - GUTTER_SIZE) / 2
      : (windowWidth - GUTTER_SIZE * 2) / 3;
  console.log(columnWidth, windowWidth);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateWindowWidth);

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

  return (
    <div>
      <InfiniteScroll
        dataLength={photos ? photos?.length : 0}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<div>loading...</div>}
      >
        <Masonry
          className="masonry"
          columnClassName="masonry-column"
          breakpointCols={BREAKPOINT_COLUMN_OBJECT}
        >
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
      </InfiniteScroll>
    </div>
  );
};

export default Gallery;
