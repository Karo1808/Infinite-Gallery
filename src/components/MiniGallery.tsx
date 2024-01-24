import {
  useInfiniteScroll,
  useInfinityQueryByUser,
  useUpdateColumnWidth,
} from "../hooks";

import { SpinnerCircular } from "spinners-react";
import { useRef } from "react";
import Masonry from "react-masonry-css";
import { MINI_BREAKPOINT_COLUMN_OBJECT } from "../constants";
import Image from "./Image.tsx";

import styles from "../styles/gallery.module.css";

const MiniGallery = () => {
  const masonryWrapperRef = useRef<null | HTMLDivElement>(null);
  const { photos, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfinityQueryByUser();

  const { columnWidth } = useUpdateColumnWidth(masonryWrapperRef, true);

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
        breakpointCols={MINI_BREAKPOINT_COLUMN_OBJECT}
      >
        {photos &&
          photos.map((photo, index) => (
            <div
              key={photo.id}
              ref={index > photos.length - 5 ? lastPhoto : null}
            >
              <Image
                imageType="thumbnail"
                columnWidth={columnWidth}
                currentId={photo.id}
                user={photo.usernameId}
              />
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

export default MiniGallery;
