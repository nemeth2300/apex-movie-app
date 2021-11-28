# Project

Could not find better representation of Wikipedia articles through it's REST api, therefore HTML parsing was implemented.

The IMDB id is not usable via the GQL API (null values), but getting it is trivial through the OMDB api, and probably other means as well.

Use of Context/Redux/Recoil was not necessary but I'd suggest using Recoil in the future for handling global state management.

# Scripts

## GraphQL CodeGen

### `npm run gen`

Running this command will generate the following files

- src/generated/gql.ts

- src/graphql/schema.graphql

# Tools

## VsCode GraphQL Extension

Configuration file

- .graphqlrc.yml
