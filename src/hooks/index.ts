import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchImages } from "../utils";
import { PHOTOS_PER_PAGE } from "../constants";

export const useInfiniteQueryImages = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (
        lastPage?.prevOffset !== undefined &&
        lastPage?.photos?.total !== undefined &&
        lastPage.prevOffset + PHOTOS_PER_PAGE > lastPage.photos.total
      ) {
        return false;
      }
      return lastPage?.prevOffset ? lastPage?.prevOffset + PHOTOS_PER_PAGE : 0;
    },
  });
  return { data, fetchNextPage, hasNextPage };
};
