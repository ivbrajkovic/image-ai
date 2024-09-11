import React from 'react';

export const stopPropagation =
  <TEvent extends React.MouseEvent, TResult>(cb?: (e: TEvent) => TResult) =>
  (e: TEvent) => {
    e.stopPropagation();
    cb?.(e);
  };
