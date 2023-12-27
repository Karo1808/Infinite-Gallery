import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useInfiniteQueryImages } from "../hooks";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "./Image";

const Gallery = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQueryImages();
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
                />
              ))}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </div>
  );
};

export default Gallery;
