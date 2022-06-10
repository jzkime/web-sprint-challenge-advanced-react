import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AppFunctional from './AppFunctional'

test("can render Functional Component", () => {
  render(<AppFunctional />);
})

test("can move one", () => {
  render(<AppFunctional />);
  
  const up = screen.getByText(/up/i);
  fireEvent.click(up);

  const moves = document.querySelector('#steps');
  expect(moves.textContent).toMatch(/You moved 1 time/i)
})

test("up down right left down left right right outputs 8", () => {
  render(<AppFunctional />);

  const up = screen.getByText(/up/i);
  const down = screen.getByText(/down/i);
  const left = screen.getByText(/left/i);
  const right = screen.getByText(/right/i);
  fireEvent.click(up);
  fireEvent.click(down);
  fireEvent.click(right);
  fireEvent.click(left);
  fireEvent.click(down);
  fireEvent.click(left);
  fireEvent.click(right);
  fireEvent.click(right);

  const moves = document.querySelector('#steps');
  expect(moves.textContent).toMatch(/You moved 8 times/i);
})

test("starts with empty email input", () => {
  render(<AppFunctional />);

  const emailInput = screen.getByPlaceholderText("type email");
  expect(emailInput.textContent).toMatch("");
})

test("can type in email", () => {
  render(<AppFunctional />);

  const emailInput = document.querySelector('#email')
  fireEvent.change(emailInput, {target: {value: "mytime@email.com"}})
  const email = screen.findByText("mytime@email.com");
  waitFor(() => expect(email).toBeInTheDocument());
})

test("can reset after moving", () => {
  render(<AppFunctional />);

  const up = screen.getByText(/up/i);
  const left = screen.getByText(/left/i);
  fireEvent.click(up);
  fireEvent.click(left);
  const reset = screen.getByText(/reset/i);
  fireEvent.click(reset);

  const noMove = screen.findByText("You moved 0 times");
  waitFor(() => expect(noMove).toBeInTheDocument());
})
