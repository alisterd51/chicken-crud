# Chicken-CRUD

## Descrition

Ce repo est une reponse a un test technique dont voici le sujet:

L’objectif de ce challenge est de créer une API en Javascript (NodeJS)
Le webservice /chicken sera un CRUD avec les méthodes suivantes : GET /
POST / PUT / PATCH / DELETE

L’objet chicken est tel que :
name: String (required),
birthday: Date,
weight: Number (required),
steps: Number (default 0),
isRunning: Boolean (default false) Puis le webservice /chicken/run
augmentera la variable steps de 1.

Libre à toi d’utiliser la base de données et les frameworks de ton
choix.

Une documentation détaillée serait un plus !

BONUS : Ajouter un lien de chicken vers un autre objet comme farmyard ou
coop.

Livrable : Gitlab ou Github.

## Choix des technologies

J'ai fait le choix d'utiliser le framework [nestjs](https://nestjs.com/) qui utilise par defaut du TypeScript.
Le TypeScript est un sur-ensemble de JavaScript qui sera transpillé en JavaScript au moment du build.

Pour la base de données, j'utilise un conteneur [postgres 15](https://hub.docker.com/_/postgres).

Les tests de end to end sont écrits avec [jest](https://docs.nestjs.com/fundamentals/testing).

La documentation est générée avec [swagger](https://docs.nestjs.com/openapi/introduction).

## Utiliser avec node (testé avec les versions 16.x, 18.x, 20.x)

```bash
# in a production environment you need to modify these variables
cp sample.env .env

# export of the .env file in the environment of the machine 
export $(grep -v '^#' .env | xargs)

# clean install a project
npm ci

# run postgres container
docker run --detach \
           --name postgres \
           --env POSTGRES_USER \
           --env POSTGRES_PASSWORD \
           --env POSTGRES_DB \
           --publish 5432:5432 \
           --volume ./data:/var/lib/postgresql/data \
           postgres:15

# optional: run e2e tests
npm run test:e2e

# test chicken-crud
open http://localhost:3000/api
```

## Utiliser avec docker compose

```bash
# in a production environment you need to modify these variables
cp sample.env .env

# run chicken-crud and postgres in docker compose
docker compose up -d

# test chicken-crud
open http://localhost:3000/api
```
