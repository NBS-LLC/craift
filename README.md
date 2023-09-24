# The crAIft API

AI Treasure Generator API

# prerequisites

- [nvm](https://github.com/nvm-sh/nvm)
- [gcloud cli](https://cloud.google.com/sdk/docs/install)

# installing

```
nvm use
npm install
```

# building

```
npm run build
```

# configuring

A Google Cloud account must be active:

```
> gcloud init
> gcloud auth application-default login
```

The following environment variables must be configured:

- CRAIFT_AI_PROJECT_ID - The id of a Google Cloud project with Vertex AI enabled

# developing

Use the following commands during development.

Changes will be applied automatically.

```
npm run watch
npm run start:dev
```

# testing

The server doesn't need to be running in order to execute the automated tests.

Note: tests will still execute correctly even if the server is running.

```
npm run build
# or
npm run watch

npm run test
```

# usage

```
npm run watch
npm run start:dev
curl localhost:3000/api/treasures/random
```
