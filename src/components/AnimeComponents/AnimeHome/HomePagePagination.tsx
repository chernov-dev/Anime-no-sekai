import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IPagination } from "../../../types/Pagination";

const HomePagePagination = ({
  pagination,
  paginate,
}: {
  pagination?: IPagination;
  paginate?: (number) => void;
}) => {

  const handlePageChange = (e,page) => {
    paginate(page);
  };

  let lastPage = pagination.totalPages - 2 ?? !pagination.hasNextPage;

  if (!paginate && !pagination) {
    return <div></div>;
  }

  return (
    <div className="text-neumorph-secondary flex gap-4">
      <button
        accessKey="j"
        className="paginate-btn"
        title={
          "Go to previous page " + "\nCan be accessed with ALT + J combination"
        }
        disabled={pagination.currentPage == 1}
        onClick={(e) => handlePageChange(e,--pagination.currentPage)}
      >
        <FaChevronLeft size={18} />
      </button>
      <button
        accessKey="l"
        className="paginate-btn"
        title={
          "Go to next page " + "\nCan be accessed with ALT + L combination"
        }
        disabled={pagination.currentPage == lastPage}
        onClick={(e) => handlePageChange(e,++pagination.currentPage)}
      >
        <FaChevronRight size={18} />
      </button>
    </div>
  );
};

export default HomePagePagination;
