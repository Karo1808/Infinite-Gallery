import { IoMdShare } from "react-icons/io";
import styles from "../styles/share-button.module.css";
import { useState } from "react";
import ShareDropdown from "./ShareDropdown";
import { FacebookProvider } from "react-facebook";

interface Props {
  imageLink: string;
}

const ShareButton = ({ imageLink }: Props) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <FacebookProvider appId="770580218276427">
      <button onClick={handleClick} className={styles.share_button}>
        <>
          <IoMdShare className={styles.icon} size={18} />
          <span>Share</span>
        </>
        {isDropDownOpen && <ShareDropdown imageLink={imageLink} />}
      </button>
    </FacebookProvider>
  );
};

export default ShareButton;
