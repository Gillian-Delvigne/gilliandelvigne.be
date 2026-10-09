# Stack — dépendances et choix

| | |
|---|---|
| **Runtime** | Next.js 16 · React 19 · TypeScript 5 |
| **Rendu** | Server Components par défaut ; `"use client"` en feuille d'arbre |
| **Style** | Tailwind CSS v4 (config CSS-first, `@theme` — pas de `tailwind.config.ts`) |
| **Contenu** | MDX validé et compilé par Velite (build step hors bundler) |
| **i18n** | next-intl · bilingue FR/EN · défaut FR |
| **Node** | **≥ 24** (voir `.node-version`) — requis par `vitest`/`jsdom` récents |

---

## Socle

| Paquet | Version | Rôle |
|---|---|---|
| `next` | 16.3.4 | Framework — App Router, rendu serveur, Turbopack, optimisation des polices et des images. |
| `react` · `react-dom` | 19.2.8 | Bibliothèque d'UI et son rendu DOM. Version imposée par Next 16. |
| `typescript` | 5.9 | Typage statique de tout le code. `strict: true`. |

---

## Runtime — `dependencies`

*Paquets nécessaires au fonctionnement de l'application (serveur, et parfois
navigateur — c'est l'usage sous `"use client"` qui décide, pas cette liste).*

### Contenu & internationalisation

| Paquet | Version | Rôle | Note |
|---|---|---|---|
| `next-intl` | 4.14 | Routage par locale (`/fr`, `/en`), traduction des chaînes d'UI (`useTranslations`), formatage localisé, et le `proxy.ts` de redirection racine. | Compatible Next 16 (peer `^16`). |
| `date-fns` | 4.4 | Formatage des dates d'article selon la locale active (« 6 mars 2025 » / « March 6, 2025 »). | Modulaire, seules les fonctions importées sont incluses. |

### Formulaire de contact

| Paquet | Version | Rôle | Note |
|---|---|---|---|
| `zod` | 4.5 | Schémas de validation. **Un schéma, deux usages** : valide le frontmatter du contenu au build (via Velite) et les champs du formulaire à l'exécution ; le type TypeScript en est *déduit*, jamais réécrit. | v4 — API différente de la v3 des tutoriels d'avant 2025. |
| `react-hook-form` | 7.87 | État, saisie et cycle de validation du formulaire, sans re-rendu inutile. | — |
| `@hookform/resolvers` | 5.9 | Pont entre `react-hook-form` et le schéma `zod` : la validation du formulaire réutilise le schéma partagé. | — |
| `nodemailer` | 10.0 | Envoi de l'e-mail du formulaire, côté serveur uniquement (Route Handler `nodejs`). | Sans types embarqués → `@types/nodemailer` en dev. |

### Interface & animation

| Paquet | Version | Rôle | Note |
|---|---|---|---|
| `motion` | 13.2 | Animations React : transition de route « pan de carte », sceau qui atterrit, révélations au scroll. | Nouveau nom de `framer-motion` (même projet). Import : `motion/react`. |
| `clsx` | 2.1 | Compose des listes de classes conditionnelles proprement. | — |
| `tailwind-merge` | 3.6 | Résout les conflits de classes Tailwind (`px-2 px-4` → `px-4`). | Associé à `clsx` dans un unique helper `src/lib/cn.ts`. |

---

## Outillage — `devDependencies`

*Paquets qui servent à **fabriquer et vérifier** l'app, pas à la faire tourner.
Les plateformes de build les installent quand même.*

### Pipeline de contenu

| Paquet | Version | Rôle | Note |
|---|---|---|---|
| `velite` | 0.4 | Lit `content/**/*.mdx`, **valide** le frontmatter (schémas `zod`), **compile** le MDX, écrit `.velite/` (données + types). | En `devDependencies` bien qu'il tourne au build : il produit un artefact puis se retire, il ne fait pas partie de l'app qui tourne. Choisi contre Contentlayer car **découplé du bundler** → survit aux montées de version de Next. |
| `@mdx-js/react` | 3.1 | Fournit les composants React au MDX compilé par Velite (le `MDXProvider`). | — |

### Markdown → HTML enrichi

| Paquet | Version | Rôle |
|---|---|---|
| `remark-gfm` | 4.0 | GitHub-Flavored Markdown : tableaux, listes de tâches, liens automatiques, barré. |
| `rehype-slug` | 6.0 | Ajoute un `id` à chaque titre de l'article. |
| `rehype-autolink-headings` | 7.1 | Ajoute une ancre cliquable sur ces titres → alimente le sommaire flottant. |
| `rehype-pretty-code` | 0.14 | Coloration syntaxique des blocs de code : légendes de fichier, numéros de ligne, lignes mises en évidence. |
| `shiki` | 4.4 | Le moteur de coloration utilisé par `rehype-pretty-code` (thème `night-owl`). |

### Style

| Paquet | Version | Rôle |
|---|---|---|
| `tailwindcss` | 4.3 | Le framework CSS. En v4, la configuration se fait **dans le CSS** (`@import "tailwindcss"` + `@theme`). |
| `@tailwindcss/postcss` | 4.3 | Le plugin PostCSS qui exécute Tailwind au build (`postcss.config.mjs`). |

### Tests

| Paquet | Version | Rôle | Note |
|---|---|---|---|
| `vitest` | 4.1 | Lanceur de tests unitaires et de composants ; API proche de Jest, rapide. | Épinglé en **v4** : la v5 exige `@types/node ≥ 22`, contrainte évitée. |
| `@vitejs/plugin-react` | 6.1 | Transforme le JSX/TSX pour que Vitest puisse exécuter les composants. |
| `@testing-library/react` | 16.3 | Monte les composants dans un DOM de test et expose une API orientée « ce que voit l'utilisateur ». |
| `@testing-library/jest-dom` | 7.0 | Matchers dédiés au DOM (`toBeInTheDocument`, `toHaveAttribute`…). |
| `jsdom` | 30.0 | Implémente un DOM en mémoire — l'environnement dans lequel tournent les tests de composants. | Requiert Node ≥ 22.22 (d'où `.node-version` = 24). |
| `vite-tsconfig-paths` | 6.1.1 | Résolveur d'alias pour Vitest |

### Lint & types

| Paquet | Version | Rôle |
|---|---|---|
| `eslint` | 9.39 | Analyse statique — erreurs, anti-patterns, règles d'accessibilité de base. Flat config (`eslint.config.mjs`). |
| `eslint-config-next` | 16.3.4 | Le jeu de règles Next : `core-web-vitals` + `typescript`. |
| `@types/node` | 20.x | Types de l'API Node (`process`, `fs`…). |
| `@types/react` · `@types/react-dom` | 19.x | Types de React (le paquet React n'en fournit pas). |
| `@types/nodemailer` | 8.0 | Types de `nodemailer`. |

---

## Non installés — volontairement

| Paquet | Pourquoi pas |
|---|---|
| `@next/mdx` | Velite compile le MDX ; le plugin natif de Next ferait doublon. |
| `contentlayer` / `contentlayer2` | Couplé à webpack, semi-abandonné, bug Turbopack ouvert. |
| `framer-motion` | Renommé `motion` — c'est le même projet en plus récent. |
| `@playwright/test` | Tests end-to-end : plus tard, avant le lancement seulement. |

---

## Reproduire l'environnement

```bash
fnm use            # lit .node-version → Node 24
npm install
npm run dev
```
