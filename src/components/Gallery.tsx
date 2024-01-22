import {
  useInfiniteQueryImages,
  useInfiniteScroll,
  useUpdateColumnWidth,
  useViewportInitalSizeAndResize,
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
  const { photos, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQueryImages();

  const { columnWidth } = useUpdateColumnWidth(masonryWrapperRef);
  const { viewportWidth } = useViewportInitalSizeAndResize();

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
        {photos &&
          photos.map((photo, index) => (
            <div
              key={photo.id}
              ref={index > photos.length - 5 ? lastPhoto : null}
            >
              {viewportWidth > TWO_COLUMNS_BREAKPOINT ? (
                <Image
                  imageType="thumbnail"
                  columnWidth={columnWidth}
                  currentId={photo.id}
                />
              ) : (
                <MobileImageWrapper
                  username={photo.username}
                  profilePhoto={photo.userProfileImage}
                  profileLink={photo.userProfileLink}
                  id={photo.id}
                  downloadLink={photo.downloadLink}
                >
                  <Image
                    imageType="thumbnail"
                    columnWidth={columnWidth}
                    currentId={photo.id}
                  />
                </MobileImageWrapper>
              )}
            </div>
          ))}
      </Masonry>
      {isFetching && (
        <div className={styles.loading_spinner}>
          <SpinnerCircular
            color="#ced4da"
            secondaryColor="#dee2e6"
            speed={120}
            size={70}
          />
        </div>
      )}
      {!isFetchingNextPage && hasNextPage && (
        <div className={styles.no_more_images_wrapper}>
          <h2 className={styles.no_more_images}>No more images found</h2>
        </div>
      )}
    </div>
  );
};

export default Gallery;
