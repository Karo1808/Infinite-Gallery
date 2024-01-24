import styles from "../styles/photo-info.module.css";
import {
  MdOutlineDescription,
  MdOutlineLocationOn,
  MdCalendarMonth,
} from "react-icons/md";
import { formatRelativeDate } from "../utils";
import { Nullable } from "unsplash-js/dist/helpers/typescript";

interface Props {
  description: Nullable<string>;
  location: Nullable<string>;
  date: string;
}

const PhotoInfo = ({ description, location, date }: Props) => {
  const formattedDate = formatRelativeDate(date);
  return (
    <section className={styles.container}>
      <div className={styles.desc}>
        <MdOutlineDescription />
        <p>{description}</p>
      </div>
      <div className={styles.desc}>
        <MdOutlineLocationOn />
        <p>{location || "No Location"}</p>
      </div>
      <div className={styles.desc}>
        <MdCalendarMonth />
        <p>{formattedDate}</p>
      </div>
    </section>
  );
};

export default PhotoInfo;
