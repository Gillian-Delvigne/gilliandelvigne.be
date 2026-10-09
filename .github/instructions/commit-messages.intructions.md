---
name: 'Odoo Git Guidelines'
description: 'Format des messages de commit selon les conventions Odoo'
applyTo: '**'
---
# Format des messages de commit (conventions Odoo)

## Structure

[TAG] module: description courte (< 50 caractères)

Corps expliquant POURQUOI le changement a été fait, pas ce qui a
changé (le diff le montre déjà). Justifier les choix techniques.
Lignes limitées à 72 caractères.

task-123
Fixes #123


## Tags autorisés

- `[FIX]` : correction de bug (versions stables ou en développement)
- `[REF]` : refactoring, réécriture importante d'une fonctionnalité
- `[ADD]` : ajout d'un nouveau module
- `[REM]` : suppression de code mort, de vues ou de modules
- `[REV]` : revert d'un commit problématique
- `[MOV]` : déplacement de fichiers (via git mv, historique préservé)
- `[REL]` : commit de release (version majeure ou mineure)
- `[IMP]` : amélioration incrémentale en développement
- `[MERGE]` : commit de merge ou forward port
- `[CLA]` : signature du Contributor License Agreement
- `[I18N]` : modification des fichiers de traduction
- `[PERF]` : amélioration de performance
- `[CLN]` : nettoyage de code
- `[LINT]` : passe de linting

## Règles

- Toujours indiquer le module concerné après le tag, en minuscules,
  suivi de deux-points.
- La ligne de titre doit former une phrase valide après « if applied,
  this commit will... ».
- Jamais de description en un seul mot du type « bugfix », « update »
  ou « cleanup ».
- Références en fin de corps si pertinent : `task-123` (tâche liée),
  `Fixes #123` (ferme une issue GitHub), `Closes #123` (ferme une PR),
  `opw-123` (ticket lié).