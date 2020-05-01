# Decoration marketplace

## Introduction

Read more about this project and its development on <a href="https://www.rubendewitte.com/projects/deco-webapp" rel="noopener noreferrer" target="_blank">my website</a>.

View the backend of this project [here](https://github.com/DewitteRuben/nodejs_decoration_webshop_2020).

## Setup

*This project uses <a href="https://github.com/facebook/create-react-app" rel="noopener noreferrer" target="_blank">Create React App</a> under the hood, CRA requires `.env` keys to be prepended with `REACT_APP_` before they can be accessed with `process.env`.*

### API

Create an `.env` file that includes the following key:

```
REACT_APP_BASE_URL=base-url/api
```

Replace `base-url` with the address and port the backend is hosted on. (https://localhost:3000 is default)

### Firebase

Include the Firebase config object as keys in your `.env` file as follows:

```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
REACT_APP_MEASUREMENT_ID=
```

Read more on the Firebase config object <a href="https://firebase.google.com/docs/web/setup?hl=nl#config-object" rel="noopener noreferrer" target="_blank">here</a>.

## Build

Running this project (locally) can be done in just two lines:

```sh
npm install
npm start
```