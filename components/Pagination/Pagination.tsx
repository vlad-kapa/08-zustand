import ReactPaginate from "react-paginate";
import css from "./Paginatoin.module.css";
interface PaginationProps {
  totalPages: number;
  forcePage: number;
  setCurrentPage: (selectedItem: { selected: number }) => void;
}
function Pagination({
  totalPages,
  forcePage,
  setCurrentPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={setCurrentPage}
      forcePage={forcePage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}

export default Pagination;
