import Masonry from "react-masonry-css";
import { BREAKPOINT_COLUMN_OBJECT } from "../constants";
import { RefObject } from "react";

const MasonryWrapper = ({
  children,
  reference,
}: {
  children: React.ReactNode;
  reference: RefObject<HTMLDivElement>;
}) => {
  return (
    <div ref={reference}>
      <Masonry
        className="masonry"
        columnClassName="masonry-column"
        breakpointCols={BREAKPOINT_COLUMN_OBJECT}
      >
        {children}
      </Masonry>
    </div>
  );
};

export default MasonryWrapper;
