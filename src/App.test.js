import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the semester result entry form', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /vit semester result portal/i })).toBeInTheDocument();
  expect(screen.getByText(/student information/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /calculate result/i })).toBeInTheDocument();
});
