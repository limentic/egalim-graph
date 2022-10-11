import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { formData } from '../components/Form';

export interface foodData {
    id: string;
    date: string;
    productName: string;
    weight: number;
    type: number;
}

interface FoodState {
    foodArray: foodData[];
    categories: any[];
}

const initialState: FoodState = {
    foodArray: [],
    categories: [
        {
            id: 0,
            name: "Bio",
            value: 0,
            color: '#8BC34A'
        },
        {
            id: 1,
            name: "Durable (hors bio)",
            value: 0,
            color: '#42A5F5'
        },
        {
            id: 2,
            name: "Autre",
            value: 0,
            color: '#FF9800'
        }
    ]
}

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    addFood: (state, action: PayloadAction<formData>) => {
      let weight: number = action.payload.weight;
      if (action.payload.unit === 'g') {
        weight = weight / 1000;
      }
      state.foodArray = [
        ...state.foodArray,
        {
          id: action.payload.id,
          date: action.payload.date,
          productName: action.payload.productName,
          weight: weight,
          type: action.payload.type,
        },
      ];

      state.categories[action.payload.type].value += weight;
    },
  },
});

export const { addFood } = foodSlice.actions;

export const selectFood = (state: RootState) => state.food.foodArray;

export default foodSlice.reducer;