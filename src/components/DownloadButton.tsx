import { saveAs } from "file-saver";
import { GoDownload } from "react-icons/go";
import { APP_NAME } from "../constants";

interface Props {
  downloadLink: string;
  type: "overlay" | "full";
  id: string;
}

const DownloadButton = ({ downloadLink, type, id }: Props) => {
  const handleDownload = ({
    imageLink,
    fileName,
  }: {
    imageLink: string;
    fileName: string;
  }) => {
    saveAs(imageLink, fileName);
  };

  return (
    <button
      onClick={() => {
        handleDownload({
          imageLink: downloadLink,
          fileName: `${APP_NAME}.${id}.png`,
        });
      }}
      className={`download-button ${type}-download-button`}
    >
      {type === "overlay" && <GoDownload color={"#e9ecef"} size={25} />}
      {type === "full" && (
        <>
          <GoDownload className="download-icon" size={20} />
          <span>Download</span>
        </>
      )}
    </button>
  );
};

export default DownloadButton;
