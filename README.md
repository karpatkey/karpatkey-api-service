# karpatkey API service made with Node, Express & Typescript

[![Tests](https://github.com/KarpatkeyDAO/karpatkey-nc-aum-api/workflows/Tests/badge.svg)](https://github.com/KarpatkeyDAO/karpatkey-nc-aum-api/actions?query=workflow%3ATests)
[![Lint](https://github.com/KarpatkeyDAO/karpatkey-nc-aum-api/workflows/Lint/badge.svg)](https://github.com/KarpatkeyDAO/karpatkey-nc-aum-api/actions?query=workflow%3ALint)

## About
This is a simple karpatkey API service, which exposes some data to be used publicly.

## Project Links
- 📰 [Kanban Board](https://github.com/orgs/KarpatkeyDAO/projects/2)

## Usage:

You should copy `.env.example` to `.env` and then:

`yarn dev` - Run the development server.

`yarn test` - Run tests.

`yarn test:watch` - Run tests when files update.

`yarn build` - Builds the server.

`yarn start` - Runs the server.

## Default endpoints:

A `GET` request to `/aum` will respond with the value of non-custodial assets under management.
A `GET` request to `/posts` will respond with the latest posts from the mirror.xyz blog.

## Contribution
Any and every contribution are welcomed and appreciated.
