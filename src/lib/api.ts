import { ApiResponse, Character } from './types';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export async function fetchCharacters(page: number = 1, name: string = '', status: string[] = [], species: string[] = [], gender: string[] = []): Promise<ApiResponse> {
  let url = `${BASE_URL}?page=${page}`;
  if (name) url += `&name=${encodeURIComponent(name)}`;
  // Note: API doesn't support multiple status/species/gender, so we'll filter client-side or use first one
  // For now, we'll make multiple requests and combine results
  if (status.length > 0) {
    // Make requests for each status and combine
    const promises = status.map(s => {
      let statusUrl = `${BASE_URL}?page=${page}`;
      if (name) statusUrl += `&name=${encodeURIComponent(name)}`;
      statusUrl += `&status=${encodeURIComponent(s)}`;
      if (species.length > 0) statusUrl += `&species=${encodeURIComponent(species[0])}`;
      if (gender.length > 0) statusUrl += `&gender=${encodeURIComponent(gender[0])}`;
      return fetch(statusUrl).then(res => res.json());
    });
    const results = await Promise.all(promises);
    // Combine and deduplicate results
    const allCharacters = results.flatMap(r => r.results || []);
    const uniqueCharacters = Array.from(new Map(allCharacters.map(c => [c.id, c])).values());
    // Filter by species and gender if needed
    let filtered = uniqueCharacters;
    if (species.length > 0) {
      filtered = filtered.filter(c => species.includes(c.species));
    }
    if (gender.length > 0) {
      filtered = filtered.filter(c => gender.includes(c.gender));
    }
    return {
      results: filtered,
      info: results[0]?.info || { pages: 1, count: filtered.length, next: null, prev: null }
    } as ApiResponse;
  }

  // Single status or no status filter
  if (status.length === 1) url += `&status=${encodeURIComponent(status[0])}`;
  if (species.length > 0) url += `&species=${encodeURIComponent(species[0])}`;
  if (gender.length > 0) url += `&gender=${encodeURIComponent(gender[0])}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('API error');
  const data = await res.json();

  // Apply additional filters client-side if multiple species/gender selected
  let filteredResults = data.results || [];
  if (species.length > 1) {
    filteredResults = filteredResults.filter((c: Character) => species.includes(c.species));
  }
  if (gender.length > 1) {
    filteredResults = filteredResults.filter((c: Character) => gender.includes(c.gender));
  }

  return {
    ...data,
    results: filteredResults
  };
}

export async function fetchCharacter(id: number): Promise<Character> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('API error');
  return res.json();
}