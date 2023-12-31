import Masonry from "react-masonry-css";
import { BREAKPOINT_COLUMN_OBJECT } from "../constants";
import { RefObject } from "react";
import { useUpdateColumnWidth } from "../hooks";

const MasonryWrapper = ({
  children,
  reference,
}: {
  children: React.ReactNode;
  reference: RefObject<HTMLDivElement>;
}) => {
  const {} = useUpdateColumnWidth(reference);
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
