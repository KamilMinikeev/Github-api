import React, { useState } from "react";
import styles from "./Results.module.scss";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setCurrentPage, setRowsPerPage } from "../../store/paginationSlice";

import { Repo } from "../../types/Repo";

import Pagination from "../Pagination/Pagination";
import Repository from "../Repository/Repository";

import { formatDate } from "../../utilities/formatDate";

import starIcon from "../../assets/icons/star.svg";

/**
 * Компонент, отображающий результаты поиска репозиториев с возможностью сортировки и пагинации.
 */
const Results = () => {
  // Получение данных из Redux-хранилища
  const { repos, loading, error } = useAppSelector((state) => state.repos);
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const rowsPerPage = useAppSelector((state) => state.pagination.rowsPerPage);

  // Состояние сортировки
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Выбранный репозиторий
  const [currentRepo, setCurrentRepo] = useState<Repo | null>(null);

  /**
   * Функция для сортировки репозиториев по выбранному критерию.
   * @param repos - Массив репозиториев для сортировки.
   * @returns Отсортированный массив репозиториев.
   */
  const sortRepos = (repos: Repo[]): Repo[] => {
    return [...repos].sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.updated_at).getTime();
        const dateB = new Date(b.updated_at).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortBy === "star") {
        const starsA = a.stargazers_count;
        const starsB = b.stargazers_count;
        return sortOrder === "asc" ? starsA - starsB : starsB - starsA;
      } else if (sortBy === "fork") {
        const forksA = a.forks_count;
        const forksB = b.forks_count;
        return sortOrder === "asc" ? forksA - forksB : forksB - forksA;
      }
      return 0;
    });
  };

  const totalRepos = repos.length;
  const sortedRepos = sortRepos(repos);

  const indexOfLastRepo = currentPage * rowsPerPage;
  const indexOfFirstRepo = indexOfLastRepo - rowsPerPage;
  const currentRepos = sortedRepos.slice(indexOfFirstRepo, indexOfLastRepo);

  /**
   * Обработчик клика для сортировки по критерию.
   * @param criteria - Критерий для сортировки ("date", "star" или "fork").
   */
  const handleSortClick = (criteria: "date" | "star" | "fork") => {
    if (sortBy === criteria) {
      setSortOrder((prevSortOrder) =>
        prevSortOrder === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  /**
   * Устанавливает информацию о текущем выбранном репозитории.
   * @param repo - Выбранный репозиторий.
   */
  const repoInfo = (repo: Repo) => {
    setCurrentRepo(repo);
  };

  return (
    <div className={styles.results}>
      {!loading && totalRepos === 0 && !error ? (
        <div className={styles.results__center}>
          <h2>Добро пожаловать</h2>
        </div>
      ) : (
        <div className={styles.results__inner}>
          <div className={styles.results__start}>
            {loading && "Загрузка данных"}
            {error && !loading && "Ошибка загрузки данных"}
            {!loading && totalRepos > 0 && (
              <div className="container">
                <h2 className={styles.results__title}>Результаты поиска</h2>
                <div className={styles.results__content}>
                  <div className={styles.results__header}>
                    <div className={styles.results__item}>Название</div>
                    <div className={styles.results__item}>Язык</div>
                    <div
                      className={styles.results__item}
                      onClick={() => {
                        handleSortClick("fork");
                      }}
                    >
                      Число форков
                    </div>
                    <div
                      className={styles.results__item}
                      onClick={() => {
                        handleSortClick("star");
                      }}
                    >
                      Число звезд
                    </div>
                    <div
                      className={styles.results__item}
                      onClick={() => {
                        handleSortClick("date");
                      }}
                    >
                      Дата обновления
                    </div>
                  </div>

                  {error && <p>Error: {error}</p>}

                  <div className={styles.results__itemsInner}>
                    {currentRepos.map((repo) => (
                      <div
                        key={repo.id}
                        className={styles.results__items}
                        onClick={() => {
                          repoInfo(repo);
                        }}
                      >
                        <div className={styles.results__item}>{repo.name}</div>
                        <div className={styles.results__item}>
                          {repo.language == null ? "--" : repo.language}
                        </div>
                        <div className={styles.results__item}>
                          {repo.forks_count}
                        </div>
                        <div className={styles.results__item}>
                          {repo.stargazers_count}
                        </div>
                        <div className={styles.results__item}>
                          {formatDate(repo.updated_at)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Pagination
                  totalItems={totalRepos}
                  rowsPerPage={rowsPerPage}
                  currentPage={currentPage}
                  onPageChange={(page) => dispatch(setCurrentPage(page))}
                  onRowsPerPageChange={(rows) => dispatch(setRowsPerPage(rows))}
                />
              </div>
            )}
          </div>
          <div className={styles.results__end}>
            <Repository currentRepo={currentRepo} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
