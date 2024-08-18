import React, { useState } from "react";
import Header from "./components/Header/Header";
import Results from "./components/Results/Results";

import { useAppDispatch } from "./store/hooks";
import { fetchRepos } from "./store/reposSlice";

function App() {
  const [query, setQuery] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const searchRepos = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchRepos(query.trim()));
    }
    setQuery("");
  };

  return (
    <div className="wrapper">
      <Header
        handleChange={handleChange}
        searchRepos={searchRepos}
        value={query}
      />
      <div className="content">
        <Results />
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
