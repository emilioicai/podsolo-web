# Podcasts Web

## setup
The web relies in both functions and hosting so npm needs to be run on both parts

```
cd ./functions && npm install && cd ../src/ && npm install
```

Once both projects are npm installed run them on firebase:

```
firebase serve --only functions,hosting
```

## development
In order to have a proper dev environment, two commands need to be running in parallel:
```
firebase serve --only functions,hosting
```

and

```
./src/npm run buildDevServer
```
This will make sure any changes are built and available on the client bundle. It's important to note that, for the changes to show in the browser, we need to refresh the page clearing the cache (`cmd + shift + r`)

## deploy
```
firebase deploy --only functions,hosting
```

## functions
in the functions folder we can find the functions part of the app which is in charge of:
- Defining the routes in the app (functions/index.js)
- Defining the API calls which the app can make (functions/api/index.js)
- Server render the app (functions/index.js) based on a server.bundle.js generated from the `hosting` part of the project  

## hosting
In the src folder we can find the hosting part of the app. It contains and builds the React app for both client and server (isomorphically). 3 npm scripts can be run on this part of the project:
- buildClient: builds the app and deploys it to public/assets/client.bundle.js so the client app can request it and do client rendering
- buildServer: builds the app and deploys it to functions/build/server.bundle.js so the server app can do the initial rendering
- buildDevServer: use this for development as it watches changes in any file and creates a new version of public/assets/client.bundle.js
- build: runs buildClient and buildServer

**Note:** due to an alias in webpack's general configuration, we can import the api from the functions part by typing: `import {<apiCallName>} from 'api'`
