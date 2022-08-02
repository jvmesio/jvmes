import React from "react";
import { screen, render } from '@testing-library/react';
import App from "../src/client/App";

describe('App unit testing', () => {
  it('should have text "Hi"', () => {
    render(<App />);
    expect(screen.getByText('Hi')).toHaveClass('greeting');
  });
});