import { render, screen } from '@testing-library/react';
import CharacterCard from '../src/components/CharacterCard';

const mockCharacter = {
  id: 1,
  name: 'Rick',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: { name: 'Earth' },
  location: { name: 'Earth' },
  image: '/rick.jpg',
  episode: [],
};

test('renders character card', () => {
  render(<CharacterCard character={mockCharacter} />);
  expect(screen.getByText('Rick')).toBeInTheDocument();
  expect(screen.getByText('Alive')).toBeInTheDocument();
});