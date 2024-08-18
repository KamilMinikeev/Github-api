import React, { FC } from "react";
import styles from "./Pagination.module.scss";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import arrowLeftIcon from "../../assets/icons/arrow-left.svg";
import arrowRightIcon from "../../assets/icons/arrow-right.svg";

/**
 * Пропсы для компонента Pagination.
 */
interface PaginationProps {
  /**
   * Общее количество элементов для пагинации.
   */
  totalItems: number;

  /**
   * Количество элементов на одной странице.
   */
  rowsPerPage: number;

  /**
   * Текущая страница.
   */
  currentPage: number;

  /**
   * Функция для изменения страницы.
   *
   * @param page - Новая страница.
   */
  onPageChange: (page: number) => void;

  /**
   * Функция для изменения количества строк на странице.
   *
   * @param rows - Новое количество строк.
   */
  onRowsPerPageChange: (rows: number) => void;
}

/**
 * Компонент пагинации, который позволяет пользователю управлять
 * количеством элементов на странице и переключаться между страницами.
 *
 * @param totalItems - Общее количество элементов для отображения.
 * @param rowsPerPage - Количество элементов на одной странице.
 * @param currentPage - Текущая выбранная страница.
 * @param onPageChange - Функция для изменения текущей страницы.
 * @param onRowsPerPageChange - Функция для изменения количества строк на странице.
 */
const Pagination: FC<PaginationProps> = ({
  totalItems,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__rows}>
        <p className={styles.pagination__text}>Rows per page:</p>

        <Select
          className={styles.pagination__select}
          sx={{
            padding: 0,
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
              padding: 0,
            },
          }}
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </div>

      <p className={styles.pagination__pages}>
        {currentPage}-{totalPages} of {totalPages}
      </p>

      <button
        style={{ marginRight: "30px" }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={arrowLeftIcon} alt="Previous Page" />
      </button>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={arrowRightIcon} alt="Next Page" />
      </button>
    </div>
  );
};

export default Pagination;
