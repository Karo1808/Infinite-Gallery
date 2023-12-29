import { useInfiniteQuery } from "@tanstack/react-query";
import { createAttributionUrl, fetchImages } from "../utils";
import { PHOTOS_PER_PAGE } from "../constants";
import { Basic } from "unsplash-js/dist/methods/photos/types";

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

  const reducedData = data?.pages.reduce((acc, page) => {
    if (page?.photos) {
      acc.push(...page.photos.results);
    }
    return acc;
  }, [] as Basic[]);

  const photos = reducedData?.map((res) => ({
    altDescription: res.alt_description,
    blurHash: res.blur_hash,
    height: res.height,
    width: res.width,
    id: res.id,
    src: res.urls.regular,
    srcFull: res.urls.full,
    username: res.user.name,
    userProfileImage: res.user.profile_image.medium,
    userProfileLink: createAttributionUrl(res.user.username),
    downloadLink: res.links.download,
  }));

  return { photos, fetchNextPage, hasNextPage };
};
