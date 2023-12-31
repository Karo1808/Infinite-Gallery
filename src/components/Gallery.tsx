import {
  useInfiniteQueryImages,
  useInfiniteScroll,
  useUpdateColumnWidth,
} from "../hooks";
import Image from "./Image";

import { SpinnerCircular } from "spinners-react";
import { useRef } from "react";
import MasonryWrapper from "./MasonryWrapper";

const Gallery = () => {
  const masonryRef = useRef<null | HTMLDivElement>(null);
  const { photos, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQueryImages();

  const { columnWidth } = useUpdateColumnWidth(masonryRef);

  const { lastPhoto } = useInfiniteScroll({
    fetchData: fetchNextPage,
    hasMore: hasNextPage,
    isLoading: isFetchingNextPage,
  });

  return (
    <div>
      <MasonryWrapper reference={masonryRef}>
        {photos &&
          photos.map((photo, index) => (
            <div
              key={photo.id}
              ref={index === photos.length - 1 ? lastPhoto : null}
            >
              <Image columnWidth={columnWidth} {...photo} />
            </div>
          ))}
      </MasonryWrapper>
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
