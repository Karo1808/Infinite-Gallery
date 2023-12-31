import { APP_NAME, BASE_URL, GUTTER_SIZE } from "../constants";
import { unpslashApi } from "../unsplash";
import { saveAs } from "file-saver";

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

export const calculateImageHeight = ({
  columnWidth,
  imageWidth,
  imageHeight,
}: {
  columnWidth: number | null;
  imageWidth: number;
  imageHeight: number;
}) => {
  if (columnWidth) {
    return imageHeight * (columnWidth / imageWidth);
  }
};

export const createAttributionUrl = (username?: string): string =>
  `${BASE_URL}/${
    username && `@${username}`
  }?utm_source=${APP_NAME}&utm_medium=referral`;

export const handleDownload = ({
  imageLink,
  fileName,
}: {
  imageLink: string;
  fileName: string;
}) => {
  saveAs(imageLink, fileName);
};

export const convertImageToWebp = (src: string) =>
  src.replace(["png", "jpg"], "webp");

export const calculateColumnWidth = (masonryWidth: number | undefined) => {
  if (masonryWidth) {
    if (masonryWidth < 600) return masonryWidth;
    if (masonryWidth < 1100) return masonryWidth / 2 - GUTTER_SIZE;
    else return masonryWidth / 3 - GUTTER_SIZE * 2;
  }
};
