import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Repo } from "../types/Repo";

// Интерфейс описывает состояние среза репозиториев
interface ReposState {
  repos: Repo[]; // Массив репозиториев
  loading: boolean; // Флаг загрузки
  error: string | null; // Сообщение об ошибке, если есть
}

// Начальное состояние среза
const initialState: ReposState = {
  repos: [],
  loading: false,
  error: null,
};

// Асинхронный thunk для получения репозиториев пользователя
export const fetchRepos = createAsyncThunk(
  "repos/fetchRepos",
  async function (username: string, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      return response.data; // Возвращает данные репозиториев в случае успеха
    } catch (error) {
      // Обработка ошибок
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || "Something went wrong"
        );
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

// Создание среза с состоянием и редьюсерами
const reposSlice = createSlice({
  name: "repos", // Имя среза
  initialState, // Начальное состояние
  reducers: {}, // Стандартные редьюсеры (если нужны)
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        // Обработка состояния ожидания
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        // Обработка успешного получения данных
        state.loading = false;
        state.repos = action.payload;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        // Обработка ошибок
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспорт редьюсера среза
export default reposSlice.reducer;
