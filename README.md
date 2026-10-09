# atlas-portfolio

[![CI](https://github.com/Gillian-Delvigne/atlas-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Gillian-Delvigne/atlas-portfolio/actions/workflows/ci.yml)

Portfolio de développeur de **Gillian Delvigne** — site bilingue FR/EN, contenu
en MDX validé à la compilation, rendu statique.

Réécriture complète, depuis zéro, d'un portfolio précédent : Next 16 (App
Router), Tailwind CSS v4 en CSS-first, et un pipeline de contenu qui refuse de
construire le site si un article est mal formé.

> **État** — fondations en place : pipeline de contenu, i18n, routage localisé.
> Les pages sont en cours d'écriture.

---

## Stack

| | |
|---|---|
| **Next.js 16.3** | App Router, React 19, Turbopack |
| **TypeScript 5** | mode `strict` |
| **Tailwind CSS v4** | configuration CSS-first (`@theme`), pas de `tailwind.config` |
| **Velite 0.4** | MDX → JSON typé, schémas Zod, **hors du bundler** |
| **next-intl 4** | routage, chaînes et métadonnées localisés |
| **Vitest 4** | tests unitaires, Testing Library |

---

## Démarrage

Prérequis : **Node 22+**.

```bash
git clone https://github.com/Gillian-Delvigne/atlas-portfolio.git
cd atlas-portfolio
npm ci
cp .env.example .env      # puis renseigner les valeurs
npm run dev
```

Le serveur écoute sur <http://localhost:3000>. La racine ne rend aucune page :
elle redirige vers `/fr` ou `/en` selon l'en-tête `Accept-Language` du
navigateur.

### Variables d'environnement

Toutes sont listées dans [`.env.example`](.env.example), **sans valeurs**.

Seule `NEXT_PUBLIC_WEBSITE_URL` est nécessaire pour lancer le site ; elle a un
repli sur `http://localhost:3000`. Les autres servent le formulaire de contact
(SMTP, Cloudflare Turnstile) et ne sont requises que pour l'exercer.

Le préfixe `NEXT_PUBLIC_` n'est pas décoratif : ces variables sont **inlinées
dans le bundle JavaScript au build**, donc lisibles par n'importe quel visiteur.
Les autres ne quittent jamais le serveur.

---

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | serveur de développement ; compile le contenu et le surveille |
| `npm run build` | build de production ; compile le contenu en mode strict |
| `npm start` | sert le build de production |
| `npm run content` | (re)compile le contenu seul, en mode strict |
| `npm run test` | Vitest en mode watch |
| `npm run test:run` | Vitest, une passe |
| `npm run lint` | ESLint |

`npm run dev` et `npm run build` déclenchent Velite eux-mêmes, via la phase
détectée dans `next.config.ts`. `npm run content` sert à relancer la seule
compilation du contenu — utile pour voir une erreur de frontmatter sans attendre
un build complet.

---

## Structure

```
content/              sources MDX, rangées par type puis par locale
├── blog/{fr,en}/<catégorie>/<slug>.mdx
├── projects/{fr,en}/<slug>.mdx
└── categories/{fr,en}/<slug>.mdx

.velite/              sortie générée par Velite — GITIGNORÉE
messages/             chaînes d'interface, une par locale (next-intl)

src/
├── app/[lang]/       routes — toutes nichées sous la locale
├── content/          sélecteurs typés au-dessus de .velite
├── data/site.ts      source unique : nav, métadonnées du site
├── i18n/             configuration next-intl
├── lib/              utilitaires
└── proxy.ts          détection de locale, avant le rendu
```

Trois points que la seule lecture de l'arborescence ne donne pas :

**`content/` et `src/content/` sont deux choses différentes.** Le premier
contient le contenu (des fichiers MDX). Le second contient le code qui le lit —
des sélecteurs typés comme `getPosts(locale)` ou `getProject(locale, slug)`.

**`.velite/` n'est pas dans le dépôt.** Un clone neuf n'en a pas : c'est normal.
Il est régénéré par `npm run dev`, `npm run build` ou `npm run content`. Tant
qu'il n'existe pas, `tsc` et les tests échouent sur un module introuvable : c'est
le symptôme attendu.

**La catégorie d'un article est son dossier.** `content/blog/fr/c-series/…`
produit l'URL `/fr/blog/c-series/…`. Aucun champ `category` dans le frontmatter :
le chemin est la source de vérité, et un hook de validation refuse de construire
si un article référence une catégorie qui n'existe pas.

---

## Contenu

Chaque document MDX est validé par un schéma Zod à la compilation. Une date
absente, un titre trop long, une catégorie inconnue, une traduction orpheline :
la construction s'arrête avec le nom du fichier fautif.

Un article complet — `content/blog/fr/c-series/les-pointeurs-en-c.mdx` :

```mdx
---
type: post                                 # défaut : "post"
title: Les pointeurs en C, sans mystère    # ≤ 120 caractères
dek: Une adresse n'est pas une valeur.     # le chapô, ≤ 200 caractères
translationKey: pointers-in-c              # relie les versions FR et EN
date: 2025-03-06                           # ISO 8601
tags: [pointeurs, mémoire]                 # défaut : []
draft: false                               # défaut : false — exclu des listes
---

Le corps, en MDX : du markdown, et des composants React si besoin.
```

Sept champs, dont quatre facultatifs. **Ce qui n'y figure pas est déduit du
chemin** : `locale` (`fr`), `category` (`c-series`) et `slug`
(`les-pointeurs-en-c`). Déplacer le fichier suffit à changer son URL — il n'y a
rien à mettre à jour dedans.

Velite ajoute par ailleurs `excerpt`, `toc` et `metadata`
(`{ readingTime, wordCount }`), calculés à partir du corps.

Les articles et projets existent en deux langues, reliés par leur
`translationKey`. Les slugs, eux, restent dans la langue du document
(`les-pointeurs-en-c` ↔ `pointers-in-c`).

---

## Déploiement

Vercel. Les variables listées dans `.env.example` doivent être définies sur le
projet ; `NEXT_PUBLIC_WEBSITE_URL` doit pointer le domaine réel — elle est
inlinée au build, donc un changement exige un redéploiement.

---

## Licence

Le code est publié à titre de démonstration. Les textes, images et contenus du
carnet restent la propriété de leur auteur.
