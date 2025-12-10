'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchCharacter } from '../../../lib/api';
import { Character } from '../../../lib/types';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorMessage from '../../../components/ErrorMessage';

export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchCharacter(Number(id));
        setCharacter(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error || !character) return <ErrorMessage message={error || 'Character not found'} />;

  return (
    <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">
      <img
        src={character.image}
        alt={character.name}
        className="w-full object-contain rounded-lg mx-auto shadow-lg"
        style={{ maxHeight: '24rem' }}
      />
      <h1 className="text-3xl font-bold">{character.name}</h1>
      <p>Status: <span className={`badge ${character.status.toLowerCase()}`}>{character.status}</span></p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
      <div>
        <h2 className="text-xl font-semibold">Episodes:</h2>
        <ul className="list-disc pl-5">
          {character.episode.map((ep, i) => (
            <li key={i}>{ep}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}