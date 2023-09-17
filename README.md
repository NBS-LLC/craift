# The crAIft API

AI Treasure Generator API

# prerequisites

[nvm](https://github.com/nvm-sh/nvm)

# installing

```
nvm use
npm install
```

# building

```
npm run build
```

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
