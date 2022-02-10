## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

```

# Swagger

`http://localhost:3000/api`

# Docker

```bash
# docker run dev
$ docker-compose up dev

```

```bash
# docker run prod
$ docker-compose up prod

```

## Fetch github repositories using Swagger, Postman or any Api platform

Endpoint is : `localhost:3000/`
data should be provided in body. ex:

```json
{
  "searchKey": "GithubRepositoryChecker",
  "ignoreKey": "ZZAttributeString",
  "limit": 2,
  "page": 1,
  "sortDir": "desc"
}
```

## Fetched Data is stored  in `log` dir  as `Json` files
