import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  calculateColumnWidth,
  convertImageToWebp,
  createAttributionUrl,
  fetchImages,
} from "../utils";
import { GUTTER_SIZE, PHOTOS_PER_PAGE } from "../constants";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";

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
    // srcFull: res.urls.full,
    username: res.user.name,
    userProfileImage: res.user.profile_image.medium,
    userProfileLink: createAttributionUrl(res.user.username),
    downloadLink: res.links.download,
  }));

  return { photos, fetchNextPage, hasNextPage, isFetchingNextPage };
};

export const useUpdateColumnWidth = (ref: RefObject<null | HTMLDivElement>) => {
  const [columnWidth, setColumnWidth] = useState<null | number>(null);

  console.log("Called");

  useEffect(() => {
    const updateColumnWidth = () => {
      const calculatedColumnWidth = calculateColumnWidth(
        ref.current?.clientWidth
      );
      if (calculatedColumnWidth) setColumnWidth(calculatedColumnWidth);
    };
    updateColumnWidth();

    window.addEventListener("resize", updateColumnWidth);

    return () => {
      window.removeEventListener("resize", updateColumnWidth);
    };
  }, [ref]);
  return { columnWidth };
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
    if (!node) return;
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchData();
      }
    });
    observer.current.observe(node);
  }, []);
  return { lastPhoto };
};
