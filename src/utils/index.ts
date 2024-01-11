import { APP_NAME, BASE_URL, GUTTER_SIZE } from "../constants";
import { unpslashApi } from "../unsplash";

export const fetchImages = async ({
  pageParam,
}: {
  pageParam?: number | false;
}) => {
  try {
    if (pageParam) {
      console.log("fetch images");
      const res = await unpslashApi.photos.list({
        page: pageParam,
        perPage: 15,
      });
      if (res.errors) {
        throw new Error(`${res.errors[0]}`);
      }
      const photos = res.response;
      return { photos, prevOffSet: pageParam };
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while fetching images, ${error.message}`
      );
    }
  }
};
export const fetchImagesWithQuery = async ({
  pageParam,
  query,
}: {
  pageParam?: number | false;
  query: string;
}) => {
  try {
    if (!query) {
      throw new Error("No search query was provided");
    }
    if (pageParam) {
      console.log("fetch images with query");

      const res = await unpslashApi.search.getPhotos({
        query,
        page: pageParam,
        perPage: 15,
      });
      if (res.errors) {
        throw new Error(`${res.errors[0]}`);
      }
      const photos = res.response;
      return { photos, prevOffSet: pageParam };
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while fetching images by query: ${query}, ${error.message}`
      );
    }
  }
};

export const fetchImageById = async ({ id }: { id: string }) => {
  try {
    console.log("fetch image by id");

    if (!id) return null;
    {
      const res = await unpslashApi.photos.get({
        photoId: id,
      });
      if (res.errors) {
        throw new Error(`${res.errors[0]}`);
      }
      const photo = res.response;
      return { photo };
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while fetching image by ID, ${error.message}`
      );
    }
  }
};

export const calculateImageHeight = ({
  columnWidth,
  imageWidth,
  imageHeight,
}: {
  columnWidth?: number | null;
  imageWidth: number;
  imageHeight: number;
}): number => {
  if (!columnWidth) {
    return 0;
  }

  // Maintain the original aspect ratio
  return Math.round((columnWidth / imageWidth) * imageHeight) * 1.02;
};

export const calculateImageWidth = ({
  height,
  imageWidth,
  imageHeight,
}: {
  height?: number;
  imageWidth: number;
  imageHeight: number;
}): number => {
  if (!height) {
    return 0;
  }

  const targetAspectRatio = height / imageHeight;
  const actualAspectRatio = imageHeight / imageWidth;

  if (targetAspectRatio !== actualAspectRatio) {
    // Calculate the height while maintaining aspect ratio
    const adjustedWidth = Math.round(imageWidth * targetAspectRatio);
    return adjustedWidth;
  }

  // If aspect ratios match, use the original calculation
  return imageWidth * (height / imageHeight) * 1.05;
};

export const createAttributionUrl = (username?: string): string =>
  `${BASE_URL}/${
    username && `@${username}`
  }?utm_source=${APP_NAME}&utm_medium=referral`;

// export const convertImageToWebp = (src: string) =>
//   src.replace("png", "webp");

export const calculateColumnWidth = (masonryWidth: number | undefined) => {
  if (masonryWidth) {
    if (masonryWidth < 600) return masonryWidth;
    if (masonryWidth < 1100) return masonryWidth / 2 - GUTTER_SIZE;
    else return masonryWidth / 3 - GUTTER_SIZE * 2;
  }
};
