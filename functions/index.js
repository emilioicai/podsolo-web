const functions = require("firebase-functions");
const app = require("express")();
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { getEpisodes, getTopPodcasts } = require("./api");

// React App
const ServerApp = React.createFactory(
  require("./build/server.bundle.js").default
);
const template = require("./template");

// Helper function to get the markup from React, inject the initial state, and
// send the server-side markup to the client
const renderApplication = (url, res, initialState) => {
  const html = ReactDOMServer.renderToString(
    ServerApp({ url: url, context: {}, initialState })
  );
  const templatedHtml = template({
    body: html,
    initialState: JSON.stringify(initialState)
  });
  res.send(templatedHtml);
};

app.get("/favicon.ico", (req, res) => {
  return res.send(204);
});

app.get("/:podcastId?", (req, res) => {
  res.set("Cache-Control", "public, max-age=60, s-maxage=180");
  if (req.params.podcastId) {
    // client is requesting podcast specific page with podcastId
    // load the data for that podcast
    return getEpisodes(req.params.podcastId).then(resp => {
      return renderApplication(req.url, res, { episodes: resp });
    });
  } else {
    // index page. load data for all podcasts
    return getTopPodcasts().then(resp => {
      return renderApplication(req.url, res, { topPodcasts: resp });
    });
  }
});

exports.app = functions.https.onRequest(app);
