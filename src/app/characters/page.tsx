'use client';

import { useEffect } from 'react';
import { useCharacterStore } from '@/stores/useCharacterStore';
import CharacterCard from '@/components/CharacterCard';
import SearchBar from '@/components/SearchBar';
import FilterSelect from '@/components/FilterSelect';
import Pagination from '@/components/Pagination';
import CharacterSkeleton from '@/components/CharacterSkeleton';
import ErrorMessage from '@/components/ErrorMessage';

export default function HomePage() {
  const {
    characters,
    loading,
    error,
    fetchData,
    search,
    status,
    species,
    gender,
    setSearch,
    toggleStatus,
    toggleSpecies,
    toggleGender,
    resetFilters,
    page,
    totalPages,
    setPage,
  } = useCharacterStore();

  // Fetch data whenever page, search, or filters change
  useEffect(() => {
    fetchData();
  }, [page, search, status, species, gender]);

  if (loading)
    return (
      <div className="characters-page">
        <div className="grid grid-cols-6 gap-4">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <CharacterSkeleton key={i} />
            ))}
        </div>
      </div>
    );

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="characters-page">
      <div className="filters-row">
        <SearchBar value={search} onChange={setSearch} />
        <FilterSelect
          label="Status"
          selected={status}
          onToggle={toggleStatus}
          options={['All', 'Alive', 'Dead', 'Unknown']}
        />
        <FilterSelect
          label="Species"
          selected={species}
          onToggle={toggleSpecies}
          options={['All', 'Human', 'Alien', 'Humanoid']}
        />
        <FilterSelect
          label="Gender"
          selected={gender}
          onToggle={toggleGender}
          options={['All', 'Male', 'Female', 'Genderless']}
        />
        <button
          onClick={resetFilters}
          className="reset-button"
        >
          Reset Filters
        </button>
      </div>

      {characters.length === 0 ? (
        <ErrorMessage message="No characters found" />
      ) : (
        <div className="grid grid-cols-6 gap-4">
          {characters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}