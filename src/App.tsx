import React, { useState } from "react";
import Header from "./components/Header/Header";
import Results from "./components/Results/Results";

import { useAppDispatch } from "./store/hooks";
import { fetchRepos } from "./store/reposSlice";

/**
 * Основной компонент приложения.
 * Отвечает за управление состоянием поиска репозиториев и отображение результатов.
 */
function App() {
  /**
   * Локальное состояние для хранения значения поискового запроса.
   */
  const [query, setQuery] = useState<string>("");

  /**
   * Диспатчер для отправки асинхронных экшенов в store.
   */
  const dispatch = useAppDispatch();

  /**
   * Обработчик изменения значения поискового запроса.
   * @param e - событие изменения значения input.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  /**
   * Обработчик отправки поискового запроса.
   * Запускает поиск репозиториев, если запрос не пуст.
   * @param e - событие клика по кнопке отправки запроса.
   */
  const searchRepos = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchRepos(query.trim()));
    }
    setQuery(""); // Очистка поля поиска после выполнения запроса
  };

  return (
    <div className="wrapper">
      {/* Компонент Header отвечает за отображение поискового поля и кнопки поиска */}
      <Header
        handleChange={handleChange}
        searchRepos={searchRepos}
        value={query}
      />
      <div className="content">
        {/* Компонент Results отвечает за отображение результатов поиска */}
        <Results />
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
