import {
  useInfiniteQueryImages,
  useInfiniteScroll,
  useUpdateColumnWidth,
  // useViewportInitalSizeAndResize,
} from "../hooks";

import { SpinnerCircular } from "spinners-react";
import { useRef } from "react";
import Masonry from "react-masonry-css";
import {
  BREAKPOINT_COLUMN_OBJECT /*, TWO_COLUMNS_BREAKPOINT*/,
} from "../constants";
import Image from "./Image.tsx";
import MobileImageWrapper from "./MobileImageWrapper.tsx";

const Gallery = () => {
  const masonryWrapperRef = useRef<null | HTMLDivElement>(null);
  const { photos, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQueryImages();

  const { columnWidth } = useUpdateColumnWidth(masonryWrapperRef);
  // const { viewportWidth } = useViewportInitalSizeAndResize();
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
              {/* <Image
                imageType="thumbnail"
                columnWidth={columnWidth}
                {...photo}
              /> */}
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
                  {...photo}
                />
              </MobileImageWrapper>
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
