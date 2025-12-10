import { create } from 'zustand';
import { fetchCharacters } from '../lib/api';
import { ApiResponse, Character } from '../lib/types';

interface CharacterState {
  characters: Character[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  search: string;
  status: string[];
  species: string[];
  gender: string[];
  fetchData: () => Promise<void>;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  toggleStatus: (status: string) => void;
  toggleSpecies: (species: string) => void;
  toggleGender: (gender: string) => void;
  resetFilters: () => void;
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  characters: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  search: '',
  status: [],
  species: [],
  gender: [],

  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const { page, search, status, species, gender } = get();
      console.log('Fetching with params:', { page, search, status, species, gender });

      const data: ApiResponse = await fetchCharacters(page, search, status, species, gender);

      console.log('Received data:', {
        resultsCount: data.results.length,
        totalPages: data.info.pages,
        currentPage: page
      });

      // IMPORTANT FIX: Only set state, don't fetch again here
      set({
        characters: data.results,
        totalPages: data.info.pages || 1,
        loading: false,
      });

    } catch (err) {
      console.error('Error fetching data:', err);
      set({
        error: (err as Error).message,
        loading: false,
        characters: []
      });
    }
  },

  setPage: (page: number) => {
    const currentPage = get().page;
    const totalPages = get().totalPages;

    // Ensure page is within bounds
    const newPage = Math.max(1, Math.min(page, totalPages));

    if (newPage !== currentPage) {
      console.log('Setting page from', currentPage, 'to', newPage);
      set({ page: newPage });
    }
  },

  setSearch: (search: string) => {
    console.log('Setting search:', search);
    set({ search, page: 1 });
  },

  toggleStatus: (status: string) => {
    const current = get().status;
    const newStatus = current.includes(status)
      ? current.filter(s => s !== status)
      : [...current, status];
    console.log('Toggling status:', status, '->', newStatus);
    set({ status: newStatus, page: 1 });
  },

  toggleSpecies: (species: string) => {
    const current = get().species;
    const newSpecies = current.includes(species)
      ? current.filter(s => s !== species)
      : [...current, species];
    console.log('Toggling species:', species, '->', newSpecies);
    set({ species: newSpecies, page: 1 });
  },

  toggleGender: (gender: string) => {
    const current = get().gender;
    const newGender = current.includes(gender)
      ? current.filter(g => g !== gender)
      : [...current, gender];
    console.log('Toggling gender:', gender, '->', newGender);
    set({ gender: newGender, page: 1 });
  },

  resetFilters: () => {
    console.log('Resetting filters');
    set({
      search: '',
      status: [],
      species: [],
      gender: [],
      page: 1
    });
  },
}));