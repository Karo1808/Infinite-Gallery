import { useRef } from "react";

import Masonry from "react-masonry-css";

import {
  useInfiniteQueryImages,
  useInfiniteScroll,
  useUpdateWindowWidth,
} from "../hooks";
import Image from "./Image";
import {
  BREAKPOINT_COLUMN_OBJECT,
  GUTTER_SIZE,
  THREE_COLUMNS_BREAKPOINT,
  TWO_COLUMNS_BREAKPOINT,
} from "../constants";
import { SpinnerCircular } from "spinners-react";

const Gallery = () => {
  const { photos, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQueryImages();
  const { windowWidth } = useUpdateWindowWidth();

  const { lastPhoto } = useInfiniteScroll({
    fetchData: fetchNextPage,
    hasMore: hasNextPage,
    isLoading: isFetchingNextPage,
  });

  const columnWidth =
    windowWidth < TWO_COLUMNS_BREAKPOINT
      ? windowWidth
      : windowWidth < THREE_COLUMNS_BREAKPOINT
      ? (windowWidth - GUTTER_SIZE) / 2
      : (windowWidth - GUTTER_SIZE * 2) / 3;

  return (
    <div>
      <Masonry
        className="masonry"
        columnClassName="masonry-column"
        breakpointCols={BREAKPOINT_COLUMN_OBJECT}
      >
        {photos &&
          photos.map((photo, index) => (
            <div
              key={photo.id}
              ref={index === photos.length - 2 ? lastPhoto : null}
            >
              <Image columnWidth={columnWidth} {...photo} />
            </div>
          ))}
      </Masonry>
      {isFetchingNextPage && (
        <div className="loading-spinner">
          <SpinnerCircular
            color="#ced4da"
            secondaryColor="#dee2e6"
            speed={120}
            size={70}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
