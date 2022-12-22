import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Pizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, currentPage } = params;
    // const { data } = await axios.get<Pizza[]>(
    // `https://62aca07e402135c7acb5c16b.mockapi.io/items?page=${currentPage}&limit=15&${category}&sortBy=${sortBy}&order=${order}`,
    // );
    const { data } = await axios.get<Pizza[]>(
      `/pizzas/${category}/${sortBy}/${order}`,
    );
    return data;
  },
);

export const fetchRemovePizza = createAsyncThunk<void, string>(
  'pizza/fetchRemovePizza',
  async (id) => axios.delete(`/pizzas/${id}`),
);
