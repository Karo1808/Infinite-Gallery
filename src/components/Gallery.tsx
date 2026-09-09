import {
  useInfiniteQueryImages,
  useInfiniteScroll,
  useUpdateColumnWidth,
  useViewportInitialSizeAndResize,
} from "../hooks";

import { SpinnerCircular } from "spinners-react";
import { useRef } from "react";
import Masonry from "react-masonry-css";
import { BREAKPOINT_COLUMN_OBJECT, TWO_COLUMNS_BREAKPOINT } from "../constants";
import Image from "./Image.tsx";
import MobileImageWrapper from "./MobileImageWrapper.tsx";
import styles from "../styles/gallery.module.css";

const Gallery = () => {
  const masonryWrapperRef = useRef<null | HTMLDivElement>(null);
  const {
    photos,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
    isError,
    error,
  } = useInfiniteQueryImages();

  const { columnWidth } = useUpdateColumnWidth(masonryWrapperRef);
  const { viewportWidth } = useViewportInitialSizeAndResize();

  const { lastPhoto } = useInfiniteScroll({
    fetchData: fetchNextPage,
    hasMore: hasNextPage,
    isLoading: isFetchingNextPage,
  });

  return (
    <div className={styles.masonry_wrapper} ref={masonryWrapperRef}>
      <Masonry
        className={styles.masonry}
        columnClassName={styles.masonry_column}
        breakpointCols={BREAKPOINT_COLUMN_OBJECT}
      >
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            ref={index > photos.length - 5 ? lastPhoto : null}
          >
            {viewportWidth >= TWO_COLUMNS_BREAKPOINT ? (
              <Image
                photo={photo}
                imageType="thumbnail"
                columnWidth={columnWidth}
              />
            ) : (
              <MobileImageWrapper
                username={photo.username}
                profilePhoto={photo.userProfileImage}
                profileLink={photo.userProfileLink}
                photo={photo}
              >
                <Image
                  photo={photo}
                  imageType="thumbnail"
                  columnWidth={columnWidth}
                />
              </MobileImageWrapper>
            )}
          </div>
        ))}
      </Masonry>
      {(isPending || isFetchingNextPage) && (
        <div className={styles.loading_spinner}>
          <SpinnerCircular
            color="#ced4da"
            secondaryColor="#dee2e6"
            speed={120}
            size={70}
          />
        </div>
      )}
      {isError && (
        <div className={styles.status} role="alert">
          <h2>Unable to load photos</h2>
          <p>
            {error instanceof Error ? error.message : "Please try again later."}
          </p>
        </div>
      )}
      {!isPending && !isError && photos.length === 0 && (
        <div className={styles.status}>
          <h2>No photos found</h2>
          <p>Try a broader search term.</p>
        </div>
      )}
      {!isFetching && photos.length > 0 && !hasNextPage && (
        <div className={styles.no_more_images_wrapper}>
          <h2 className={styles.no_more_images}>No more images found</h2>
        </div>
      )}
    </div>
  );
};

export default Gallery;
