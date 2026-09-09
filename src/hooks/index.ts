import {
  FetchNextPageOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import {
  calculateColumnWidth,
  fetchImageById,
  fetchImageByUsername,
  fetchImages,
  fetchImagesWithQuery,
  formatPhoto,
  getNextPhotoPage,
} from "../utils";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useInfiniteQueryImages = (enabled = true) => {
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get("query") ?? "";
  const {
    data,
    fetchNextPage,
    hasNextPage,
    fetchPreviousPage,
    isFetching,
    isFetchingNextPage,
    isPending,
    isError,
    error,
    isFetchNextPageError,
  } = useInfiniteQuery({
    queryKey: ["gallery-images", searchParam],
    queryFn: searchParam
      ? ({ pageParam }: { pageParam: number | false }) =>
          fetchImagesWithQuery({ query: searchParam, pageParam })
      : fetchImages,

    initialPageParam: 1,
    getNextPageParam: getNextPhotoPage,
    enabled,
  });

  const photos =
    data?.pages.flatMap((page) => page?.photos.results ?? []).map(formatPhoto) ??
    [];
  return {
    photos,
    fetchNextPage,
    hasNextPage,
    isFetching,
    fetchPreviousPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
    isFetchNextPageError,
  };
};

export const usePhotoById = ({
  id,
  enabled = true,
}: {
  id: string;
  enabled?: boolean;
}) => {
  const { data, isFetching, isPending, isError, error } = useQuery({
    queryKey: ["image", id],
    queryFn: () => fetchImageById({ id }),
    enabled: Boolean(id) && enabled,
  });

  const res = data?.photo;

  return {
    photo: res ? formatPhoto(res) : undefined,
    isFetching,
    isPending,
    isError,
    error,
  };
};

export const useInfinityQueryByUser = (
  usernameOverride?: string,
  enabled = true
) => {
  const [searchParams] = useSearchParams();
  const username = usernameOverride ?? searchParams.get("username") ?? "";
  const {
    data,
    fetchNextPage,
    hasNextPage,
    fetchPreviousPage,
    isFetching,
    isFetchingNextPage,
    isPending,
    isError,
    error,
    isFetchNextPageError,
  } = useInfiniteQuery({
    queryKey: ["user-images", username],
    queryFn: ({ pageParam }: { pageParam: number | false }) =>
      fetchImageByUsername({ username, pageParam }),

    initialPageParam: 1,
    getNextPageParam: getNextPhotoPage,
    enabled: Boolean(username) && enabled,
  });

  const photos =
    data?.pages.flatMap((page) => page?.photos.results ?? []).map(formatPhoto) ??
    [];
  return {
    photos,
    fetchNextPage,
    hasNextPage,
    isFetching,
    fetchPreviousPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
    isFetchNextPageError,
  };
};

export const useUpdateColumnWidth = (
  ref: RefObject<null | HTMLDivElement>,
  isMini?: boolean
) => {
  const [columnWidth, setColumnWidth] = useState<null | number>(null);

  useEffect(() => {
    const updateColumnWidth = () => {
      const calculatedColumnWidth = calculateColumnWidth(
        ref.current?.clientWidth,
        isMini
      );
      if (calculatedColumnWidth) setColumnWidth(calculatedColumnWidth);
    };

    updateColumnWidth();
    window.addEventListener("resize", updateColumnWidth);

    return () => {
      window.removeEventListener("resize", updateColumnWidth);
    };
  }, [isMini, ref]);
  return { columnWidth };
};

interface Params {
  fetchData: (options?: FetchNextPageOptions) => unknown;
  hasMore: boolean;
  isLoading: boolean;
}

export const useInfiniteScroll = ({ fetchData, hasMore, isLoading }: Params) => {
  const observer = useRef<null | IntersectionObserver>(null);

  const lastPhoto = useCallback((node: HTMLElement | null) => {
    if (observer.current) observer.current.disconnect();
    if (!node || isLoading || !hasMore) return;
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchData();
      }
    });
    observer.current.observe(node);
  }, [fetchData, hasMore, isLoading]);

  useEffect(() => () => observer.current?.disconnect(), []);
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
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handler]);
  return modalRef;
};

export const useArrowKeys = ({
  handleNextPage,
  handlePreviousPage,
}: {
  currentIndex?: number;
  photosLength?: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}) => {
  useEffect(() => {
    const handleLeftArrow = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest("button, a, input")) return;
      if (e.key === "ArrowLeft") handlePreviousPage();
    };
    const handleRightArrow = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest("button, a, input")) return;
      if (e.key === "ArrowRight") handleNextPage();
    };

    document.addEventListener("keydown", handleLeftArrow);
    document.addEventListener("keydown", handleRightArrow);

    return () => {
      document.removeEventListener("keydown", handleLeftArrow);
      document.removeEventListener("keydown", handleRightArrow);
    };
  }, [handleNextPage, handlePreviousPage]);
};

export const useViewportInitialSizeAndResize = () => {
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();

    window.addEventListener("resize", updateViewportWidth);

    return () => {
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);
  return { viewportWidth };
};
