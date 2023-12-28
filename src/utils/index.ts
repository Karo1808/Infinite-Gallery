import { unpslashApi } from "../unsplash";

export const fetchImages = async ({ pageParam = 1 }: { pageParam: number }) => {
  try {
    const res = await unpslashApi.photos.list({ page: pageParam, perPage: 15 });
    if (res.errors) {
      throw new Error(`${res.errors[0]}`);
    }
    const photos = res.response;
    return { photos, prevOffset: pageParam };
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
