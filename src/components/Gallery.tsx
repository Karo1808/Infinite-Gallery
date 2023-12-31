import {
  useInfiniteQueryImages,
  useInfiniteScroll,
  useUpdateColumnWidth,
} from "../hooks";
import Image from "./Image";

import { SpinnerCircular } from "spinners-react";
import { useRef } from "react";
import Masonry from "react-masonry-css";
import { BREAKPOINT_COLUMN_OBJECT } from "../constants";

const Gallery = () => {
  const masonryWrapperRef = useRef<null | HTMLDivElement>(null);
  const { photos, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQueryImages();

  const { columnWidth } = useUpdateColumnWidth(masonryWrapperRef);

  const { lastPhoto } = useInfiniteScroll({
    fetchData: fetchNextPage,
    hasMore: hasNextPage,
    isLoading: isFetchingNextPage,
  });

  return (
    <div className="masonry-wrapper" ref={masonryWrapperRef}>
      <Masonry
        className="masonry"
        columnClassName="masonry-column"
        breakpointCols={BREAKPOINT_COLUMN_OBJECT}
      >
        {photos &&
          photos.map((photo, index) => (
            <div
              key={photo.id}
              ref={index === photos.length - 1 ? lastPhoto : null}
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
