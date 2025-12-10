'use client';
import Link from 'next/link';
import { Character } from '../lib/types';

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  const statusColor =
    character.status.toLowerCase() === 'alive' ? 'status-alive' :
    character.status.toLowerCase() === 'dead' ? 'status-dead' :
    'status-unknown';

  return (
    <Link
      href={`/characters/${character.id}`}
      className="character-card"
    >
      {/* Status tag on top right */}
      <div className={`status-tag ${statusColor}`}>
        {character.status}
      </div>

      {/* Square image */}
      <div className="aspect-square">
        <img
          src={character.image}
          alt={character.name}
          className="character-card-image"
          loading="lazy"
        />
      </div>

      <div className="character-card-content">
        <h2 className="character-card-name">{character.name}</h2>
        <span className="character-card-species">{character.species}</span>
      </div>
    </Link>
  );
}