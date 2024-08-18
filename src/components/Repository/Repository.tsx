import React, { FC } from "react";
import { Repo } from "../../types/Repo";
import styles from "./Repository.module.scss";

import starIcon from "../../assets/icons/star.svg";

/**
 * Пропсы для компонента Repository.
 */
interface RepositoryProps {
  /**
   * Текущий выбранный репозиторий. Может быть `null`, если репозиторий не выбран.
   */
  currentRepo: Repo | null;
}

/**
 * Компонент для отображения информации о выбранном репозитории.
 * Если репозиторий не выбран, отображается соответствующее сообщение.
 *
 * @param currentRepo - Объект репозитория или `null`, если репозиторий не выбран.
 */
const Repository: FC<RepositoryProps> = ({ currentRepo }) => {
  return (
    <div className={styles.repo}>
      {currentRepo === null ? (
        <p className={styles.repo__text}>Выберите репозиторий</p>
      ) : (
        <div className={styles.repo__inner}>
          <h2 className={styles.repo__title}>{currentRepo.name}</h2>
          <div className={styles.repo__content}>
            <div className={styles.repo__language}>
              {currentRepo.language === null ? "--" : currentRepo.language}
            </div>
            <div className={styles.repo__stars}>
              <img src={starIcon} alt="star" />
              <span>{currentRepo.stargazers_count}</span>
            </div>
          </div>
          <p className={styles.repo__license}>
            {currentRepo.license === null
              ? "Нет лицензии"
              : currentRepo.license.name || "Лицензия не указана"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Repository;
