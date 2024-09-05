'use client';

import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';

export type EditorState = {
  generating: boolean;
};

const initialState: EditorState = {
  generating: false,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setGenerating: (state, action: PayloadAction<boolean>) => {
      state.generating = action.payload;
    },
  },
  selectors: {
    selectGenerating: (state) => state.generating,
  },
});

export const { setGenerating } = editorSlice.actions;
export const { selectGenerating } = editorSlice.selectors;

export const editorReducer = editorSlice.reducer;
