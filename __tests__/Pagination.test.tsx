import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../src/components/Pagination';

test('renders pagination and handles clicks', () => {
  const onPageChange = jest.fn();
  render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);
  expect(screen.getByText((content, node) => node?.textContent === 'Page 2 of 5')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /previous/i }));
  expect(onPageChange).toHaveBeenCalledWith(1);
});