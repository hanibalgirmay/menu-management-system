import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchMenu,
  getMenuData,
  createMenu,
  updateMenu,
  deleteMenu,
} from '../service/apiService';
import { CreateMenuPayload, MenuNode } from '../types/types';

interface ApiState {
  data: MenuNode[];
  loading: boolean;
  error: string | null;
  selectedMenuNode: MenuNode[];
}

const initialState: ApiState = {
  data: [],
  loading: false,
  error: null,
  selectedMenuNode: [],
};

// Create asynchronous thunk actions
export const fetchMenuData = createAsyncThunk('api/fetchMenu', async () => {
  console.log('start fetching api data...++');
  const data = await fetchMenu();
  console.log('fetching api data...++', data);
  return data;
});

export const fetchMenuDataById = createAsyncThunk(
  'api/getMenuData',
  async (id: string) => {
    const data = await getMenuData(id);
    return data;
  },
);

export const createNewMenu = createAsyncThunk(
  'api/createMenu',
  async (data: CreateMenuPayload) => {
    const response = await createMenu(data);
    return response;
  },
);

export const updateExistingMenu = createAsyncThunk(
  'api/updateMenu',
  async ({ id, data }: { id: string; data: CreateMenuPayload }) => {
    const response = await updateMenu(data, id);
    return response;
  },
);

export const removeMenu = createAsyncThunk(
  'api/deleteMenu',
  async (id: string) => {
    const response = await deleteMenu(id);
    return response;
  },
);

// Create a slice of the Redux store
const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(fetchMenuDataById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuDataById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMenuNode = action.payload;
      })
      .addCase(fetchMenuDataById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(createNewMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createNewMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(updateExistingMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingMenu.fulfilled, (state, action) => {
        state.loading = false;
        // Find the index of the updated menu node and replace it
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateExistingMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(removeMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeMenu.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted menu node from the data array
        state.data = state.data.filter((item) => item.id !== action.meta.arg);
      })
      .addCase(removeMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default apiSlice.reducer;
