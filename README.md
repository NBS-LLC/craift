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

In addition to these environment variables:

- CRAIFT_AI_PROJECT_ID - The id of a Google Cloud project with Vertex AI enabled

# developing

Changes can be applied in real-time:

```
npm run watch
npm run start:dev
```

# testing

No need to build or run a server:

```
npm run test
```

# usage

```
npm run watch
npm run start:dev
curl localhost:3000/api/treasures/random
```
