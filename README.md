# Podcasts Web

## setup
The web relies in both functions and hosting so npm needs to be run on both parts

```
./functions/npm install && ./src/npm install
```

Once both projects are npm installed run them on firebase:

```
firebase serve --only functions,hosting
```

## deploy
```
firebase deploy --only functions,hosting
```

## functions
The functions part of this project is in charge of:
- Defining the routes in the app (functions/index.js)
- Defining the API calls which the app can make (functions/api/index.js)
- Server render the app (functions/index.js) based on a server.bundle.js generated from the `hosting` part of the project  

## hosting
Contains and builds the React app for both client and server (isomorphically). 3 npm scripts can be run on this part of the project:
- buildClient: builds the app and deploys it to public/assets/client.bundle.js so the client app can request it and do client rendering
- buildServer: builds the app and deploys it to functions/build/server.bundle.js so the server app can do the initial rendering
- build: runs buildClient and buildServer

**Note:** due to an alias in webpack's general configuration, we can import the api from the functions part by typing: `import {<apiCallName>} from 'api'`