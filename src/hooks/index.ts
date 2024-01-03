import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  calculateColumnWidth,
  createAttributionUrl,
  fetchImages,
} from "../utils";
import { PHOTOS_PER_PAGE, SRC_FULL_HEIGHT } from "../constants";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";

export const useInfiniteQueryImages = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery({
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
      return lastPage?.prevOffSet ? lastPage?.prevOffSet + PHOTOS_PER_PAGE : 0;
    },
  });

  const photos = data?.pages
    .reduce((acc, page) => {
      if (page?.photos) {
        acc.push(...page.photos.results);
      }
      return acc;
    }, [] as Basic[])
    .map((res) => ({
      altDescription: res.alt_description,
      blurHash: res.blur_hash,
      height: res.height,
      width: res.width,
      id: res.id,
      src: `${res.urls.raw}&w=0.2&fm=webp`,
      srcFull: `${res.urls.raw}&h=${SRC_FULL_HEIGHT}&fm=webp`,
      // srcFull: res.urls.full,
      username: res.user.name,
      userProfileImage: res.user.profile_image.medium,
      userProfileLink: createAttributionUrl(res.user.username),
      downloadLink: res.links.download,
    }));
  return {
    photos,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
  };
};

export const useUpdateColumnWidth = (ref: RefObject<null | HTMLDivElement>) => {
  const [columnWidth, setColumnWidth] = useState<null | number>(null);

  useEffect(() => {
    const updateColumnWidth = () => {
      const calculatedColumnWidth = calculateColumnWidth(
        ref.current?.clientWidth
      );
      if (calculatedColumnWidth) setColumnWidth(calculatedColumnWidth);
    };

    if (!columnWidth) updateColumnWidth();
    window.addEventListener("resize", updateColumnWidth);

    return () => {
      window.removeEventListener("resize", updateColumnWidth);
    };
  }, []);
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

export const useInfiniteScroll = ({ fetchData, isLoading }: Params) => {
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

export const useModalClose = ({ handler }: { handler: () => void }) => {
  const modalRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && modalRef.current === e.target) {
        handler();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handler();
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [modalRef]);
  return modalRef;
};
