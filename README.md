# Rick and Morty Character Explorer

A Next.js application to browse, search, and filter characters from the [Rick and Morty API](https://rickandmortyapi.com/). Built with React, TypeScript, Zustand for state management, and styled for a modern user experience.

---

## Time Allocated

**Total Project Time Allocated:** 6 hours

| Task                              | Time Allocated  |
|------------------------------------|-----------------|
| Project setup & dependencies       | 0.5 hour        |
| Building main UI/pages/components  | 2 hours         |
| API integration & state management | 1 hour          |
| Features (filters, search, theme)  | 1.5 hours       |
| Testing, bug fixes, polish         | 1 hour          |
| **Deployment (Cloudflare Pages)**  | **1 hour**      |


---

## Features

- 🔍 **Search** by character name.
- ⚙️ **Filter** by status, species, and gender.
- 🔄 **Pagination** to explore all characters.
- 🌑 **Theme toggle** (dark/light mode).
- 📄 **Character details page** for more information.
- 🚦 **Loading skeletons** and error messages for robust UX.
- ☁️ **Cloudflare deployment-ready** with OpenNext support.

## Getting Started

### Install dependencies

```bash
npm install
# or
yarn install
```

### Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Project Structure

- `src/app/` – Next.js App Router pages and layouts  
  - `page.tsx` – Main page with character grid/search.  
  - `characters/[id]/page.tsx` – Character details.
- `src/components/` – UI components  
  - `CharacterCard.tsx`, `CharacterSkeleton.tsx`, `ErrorMessage.tsx`, `Pagination.tsx`, etc.
- `src/lib/` – API and type definitions  
  - `api.ts` – API logic for fetching characters.  
  - `types.ts` – TypeScript interfaces for API responses.
- `src/stores/useCharacterStore.ts` – Zustand global store for UI state management.

### Scripts

- `dev` – Run Next.js dev server
- `build` – Next.js production build
- `start` – Start Next.js production server
- `deploy`/`preview` – For deploying via OpenNext on Cloudflare (see `wrangler.toml`, `open-next.config.ts`)
- `test` – Run tests with Jest and Testing Library

### Testing

Run tests with:

```bash
npm test
# or
yarn test
```

### Deployment

This app is ready for deployment on Cloudflare Pages using OpenNext:

```bash
npm run deploy
```

Or refer to your `wrangler.toml` and `open-next.config.ts` for custom settings.

## Technologies Used

- [Next.js](https://nextjs.org/docs/app)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Axios](https://axios-http.com/)
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/) + [OpenNext](https://open-next.js.org/)

## License

This project is for educational/demonstration use and not affiliated with the creators of Rick and Morty.
