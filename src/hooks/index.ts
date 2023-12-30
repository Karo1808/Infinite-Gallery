import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { createAttributionUrl, fetchImages } from "../utils";
import { PHOTOS_PER_PAGE } from "../constants";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { useCallback, useEffect, useRef, useState } from "react";

export const useInfiniteQueryImages = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["images"],
      queryFn: fetchImages,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (
          lastPage?.prevOffSet !== undefined &&
          lastPage?.photos?.total !== undefined &&
          lastPage.prevOffSet + PHOTOS_PER_PAGE > lastPage.photos.total
        ) {
          return false;
        }
        return lastPage?.prevOffSet
          ? lastPage?.prevOffSet + PHOTOS_PER_PAGE
          : 0;
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

  return { photos, fetchNextPage, hasNextPage, isFetchingNextPage };
};

export const useUpdateWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);
  return { windowWidth };
};

interface Params {
  fetchData: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<
        | { photos: { results: Basic[]; total: number }; prevOffSet: number }
        | undefined,
        unknown
      >,
      Error
    >
  >;
  hasMore: boolean;
  isLoading: boolean;
}

export const useInfiniteScroll = ({
  fetchData,
  hasMore,
  isLoading,
}: Params) => {
  const observer = useRef<null | IntersectionObserver>(null);

  const lastPhoto = useCallback((node: HTMLElement | null) => {
    console.log(hasMore);
    if (!node) return;
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log(node);
        fetchData();
      }
    });
    observer.current.observe(node);
  }, []);
  return { lastPhoto };
};
