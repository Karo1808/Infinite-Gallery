import { APP_NAME, BASE_URL, GUTTER_SIZE } from "../constants";
import { unpslashApi } from "../unsplash";

export const fetchImages = async ({
  pageParam,
}: {
  pageParam?: number | false;
}) => {
  try {
    if (pageParam) {
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

export const fetchImageByUsername = async ({
  username,
  pageParam,
}: {
  username: string;
  pageParam?: number | false;
}) => {
  try {
    if (!username) {
      throw new Error("No username  was provided");
    }
    if (pageParam) {
      const res = await unpslashApi.users.getPhotos({
        username,
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
        `An error occurred while fetching images by username: ${username}, ${error.message}`
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

export const calculateColumnWidth = (
  masonryWidth: number | undefined,
  isMini?: boolean
) => {
  if (isMini) {
    if (masonryWidth) {
      if (masonryWidth < 600) return masonryWidth / 2 - GUTTER_SIZE;
      if (masonryWidth < 1100) return masonryWidth / 3 - GUTTER_SIZE * 2;
      return masonryWidth / 4 - GUTTER_SIZE * 4;
    }
  }
  if (masonryWidth) {
    if (masonryWidth < 600) return masonryWidth;
    if (masonryWidth < 1100) return masonryWidth / 2 - GUTTER_SIZE;
    return masonryWidth / 3 - GUTTER_SIZE * 2;
  }
};

export const formatRelativeDate = (inputDate: string) => {
  const date = new Date(inputDate);

  // Get the current date and time
  const currentDate = new Date();
  const currentTime = currentDate.getTime();

  // Get the input date and time
  const inputTime = date.getTime();

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime - inputTime;

  // Convert milliseconds to seconds, minutes, hours, days, weeks, months, and years
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30); // Assuming an average month has 30 days
  const years = Math.floor(months / 12);

  // Generate the relative time string
  if (years > 1) {
    return `${years} years ago`;
  } else if (months > 1) {
    return `${months} months ago`;
  } else if (weeks > 1) {
    return `${weeks} weeks ago`;
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (hours > 1) {
    return `${hours} hours ago`;
  } else if (minutes > 1) {
    return `${minutes} minutes ago`;
  } else {
    return "Just now";
  }
};

export const formatSearchParams = ({
  query,
  username,
}: {
  query: string | null;
  username?: string;
}) => {
  return `?${query ? `query=${query}&` : ""}username=${username}`;
};
