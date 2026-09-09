import { useState } from "react";
import { saveAs } from "file-saver";
import { GoDownload } from "react-icons/go";
import { APP_NAME } from "../constants";
import classes from "../styles/download-button.module.css";
import { Photo } from "../types";
import { trackPhotoDownload } from "../utils";

interface Props {
  photo: Photo;
  type: "overlay" | "full";
}

const DownloadButton = ({ photo, type }: Props) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const downloadUrl = await trackPhotoDownload({
        downloadLocation: photo.downloadLocation,
        fallbackUrl: photo.downloadLink,
      });
      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error("Download failed");
      saveAs(await response.blob(), `${APP_NAME}.${photo.id}.jpg`);
    } catch {
      window.open(photo.downloadLink, "_blank", "noopener,noreferrer");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      aria-label={type === "overlay" ? "Download photo" : undefined}
      className={
        type === "overlay"
          ? classes.overlay_download_button
          : classes.full_download_button
      }
    >
      {type === "overlay" && <GoDownload color="#e9ecef" size={25} />}
      {type === "full" && (
        <>
          <GoDownload className={classes.download_icon} size={20} />
          <span>{isDownloading ? "Preparing..." : "Download"}</span>
        </>
      )}
    </button>
  );
};

export default DownloadButton;
