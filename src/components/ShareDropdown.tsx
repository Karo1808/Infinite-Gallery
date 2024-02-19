import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
    await share({
      display: "popup",
      href: imageLink,
      hashtag: "infinite-gallery",
    });
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.entry}>
        <FaXTwitter />
        <a
          href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20image!&url=${encodedURL}`}
          target="_blank"
        >
          X
        </a>
      </div>
      <div className={styles.entry}>
        <FaFacebook />
        <p onClick={handleFbShare}>Facebook</p>
      </div>
      {typeof navigator.share === "function" && <div>test</div>}
    </div>
  );
};

export default ShareDropdown;
