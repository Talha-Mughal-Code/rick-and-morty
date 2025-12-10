import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../src/components/Pagination';

test('renders pagination and handles clicks', () => {
  const onPageChange = jest.fn();
  render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);
  expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Prev'));
  expect(onPageChange).toHaveBeenCalledWith(1);
});