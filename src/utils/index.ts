import { APP_NAME, BASE_URL } from "../constants";
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

export const calculateImageHeight = ({
  columnWidth,
  imageWidth,
  imageHeight,
}: {
  columnWidth: number;
  imageWidth: number;
  imageHeight: number;
}) => {
  const aspectRatio = imageHeight / imageWidth;
  return columnWidth * aspectRatio;
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
  const imageURL = imageLink;

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = fileName;
  link.target = "_blank";

  link.click();
};
