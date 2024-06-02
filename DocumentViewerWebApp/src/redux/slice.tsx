import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define an interface for the Page
interface Page {
  title: string;
  bodyText: string;
}

// Define the initial state type
interface PageState {
  Pages: Page[];
  loading: boolean;
  error: string | null;
}

// Define the async thunk to fetch pages
export const getPages = createAsyncThunk<Page[], void, { rejectValue: string }>(
  "getPages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://gist.githubusercontent.com/thehappybug/65a466dcdb0908767057b80f0cb7ea5d/raw/6f10747c5feb7ce91b83392f2cee23ae06b20fe6/doc.json"
      );
      return response.data?.Pages;
    } catch (error: any) {
      console.log('Error', error);
      return rejectWithValue(error.message);
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
  reducers: {},
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

export default pageSlice.reducer;
