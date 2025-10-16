import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from './App.jsx';

describe('App', () => {
  it('shows the heading', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 3, name: /my todolist/i })).toBeInTheDocument();
  });

  it('adds todos to the table and clears the inputs', () => {
    render(<App />);

    const descriptionInput = screen.getByPlaceholderText(/description/i);
    const dateInput = screen.getByPlaceholderText(/date/i);
    const statusInput = screen.getByPlaceholderText(/status/i);
    const addButton = screen.getByRole('button', { name: /add/i });
    const clearButton = screen.getByRole('button', { name: /clear/i });

    fireEvent.change(descriptionInput, { target: { value: 'Buy milk', name: 'description' } });
    fireEvent.change(dateInput, { target: { value: '2024-12-01', name: 'date' } });
    fireEvent.change(statusInput, { target: { value: 'open', name: 'status' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(screen.getByText('2024-12-01')).toBeInTheDocument();
    expect(screen.getByText('open')).toBeInTheDocument();
    expect(descriptionInput).toHaveValue('');
    expect(dateInput).toHaveValue('');
    expect(statusInput).toHaveValue('');

    fireEvent.click(clearButton);

    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();
  });
});
