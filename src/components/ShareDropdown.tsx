import { FaTwitter } from "react-icons/fa";
import styles from "../styles/share-dropdown.module.css";
import { useShare } from "react-facebook";

interface Props {
  imageLink: string;
}

const ShareDropdown = ({ imageLink }: Props) => {
  const { share } = useShare();
  const encodedURL = encodeURIComponent(imageLink);
  console.log(imageLink);
  const handleFbShare = async () => {
    console.log("facebook");
    await share({ display: "popup", href: encodedURL });
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.entry}>
        <FaTwitter />
        <a
          href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20image!&url=${encodedURL}`}
          target="_blank"
        >
          Twitter
        </a>
      </div>
      <a type="button" onClick={handleFbShare}>
        Facebook
      </a>
    </div>
  );
};

export default ShareDropdown;
