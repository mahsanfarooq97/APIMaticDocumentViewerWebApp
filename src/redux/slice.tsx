import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define an interface for the Page
export interface PageData {
  title: string;
  bodyText: string;
  index: number;
}

// Define the initial state type
interface PageState {
  Pages: PageData[];
  loading: boolean;
  error: string | null;
}

// Define the async thunk to fetch pages
export const getPages = createAsyncThunk<PageData[], string>(
  "getPages",
  async (url) => {
    try {
      const response = await axios.get(url?.trim());
      return response.data?.Pages;
    } catch (error: any) {
      console.log("Error", error);
      alert(error?.message)
      throw error; 
    }
  }
);

// Define the initial state
const initialState: PageState = {
  Pages: [],
  loading: false,
  error: null,
};

// Create the slice with a callback function for extraReducers
const pageSlice = createSlice({
  name: "pageSlice",
  initialState,
  reducers: {
    updatePages: (state, action: PayloadAction<PageData[]>) => {
      state.Pages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPages.fulfilled, (state, action) => {
        state.loading = false;
        state.Pages = action.payload;
      })
      .addCase(getPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { updatePages } = pageSlice.actions;
export default pageSlice.reducer;
