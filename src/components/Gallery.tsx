import {
  useInfiniteQueryImages,
  useInfiniteScroll,
  useUpdateColumnWidth,
} from "../hooks";

import { SpinnerCircular } from "spinners-react";
import { useRef, lazy, Suspense, memo } from "react";
import Masonry from "react-masonry-css";
import { BREAKPOINT_COLUMN_OBJECT } from "../constants";

const Image = lazy(() => import("./Image.tsx"));

const Gallery = memo(() => {
  const masonryWrapperRef = useRef<null | HTMLDivElement>(null);
  const { photos, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQueryImages();

  const { columnWidth } = useUpdateColumnWidth(masonryWrapperRef);
  // Use for cache clearing
  // useEffect(() => {
  //   queryClient.resetQueries();
  // }, []);

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
              ref={index > photos.length - 5 ? lastPhoto : null}
            >
              <Suspense>
                <Image
                  imageType="thumbnail"
                  columnWidth={columnWidth}
                  {...photo}
                />
              </Suspense>
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
});

export default Gallery;
