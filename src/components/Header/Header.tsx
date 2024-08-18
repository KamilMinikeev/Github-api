import React, { FC } from "react";
import styles from "./Header.module.scss";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

/**
 * Пропсы для компонента Header.
 */
interface HeaderProps {
  /**
   * Значение текстового поля для поиска.
   */
  value: string;

  /**
   * Обработчик изменения значения в текстовом поле.
   *
   * @param e - Событие изменения ввода.
   */
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Обработчик клика по кнопке поиска.
   *
   * @param e - Событие клика по кнопке.
   */
  searchRepos: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Компонент заголовка с поисковой формой.
 * Содержит текстовое поле для ввода поискового запроса и кнопку для выполнения поиска.
 *
 * @param value - Текущее значение поискового запроса.
 * @param handleChange - Функция для обработки изменений в текстовом поле.
 * @param searchRepos - Функция для обработки клика по кнопке поиска.
 */
const Header: FC<HeaderProps> = ({ handleChange, value, searchRepos }) => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.header__content}>
          <form className={styles.header__form}>
            <TextField
              className={styles.header__input}
              placeholder="Введите поисковый запрос"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={value}
            />
            <Button
              className={styles.header__btn}
              variant="contained"
              type="submit"
              onClick={searchRepos}
            >
              Искать
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
