# Cloud Translate

## How to Run

### Running Locally

1. Set the environment variable to the contents of the API key file:

```shell
export GOOGLE_APPLICATION_KEY=$(cat PATH_TO_API_KEY_FILE)
```

2. Start the server with `npm run start`
3. Access at localhost:9999

### Running as Docker Image

1. Create a docker image called 'cloud-translate-image' with `npm run docker-build`
2. Copy this `.env.example` to a new file `.env` and add contents of the api key file to
the new `.env` file after the =. Note that the api key will need to be minified and one one
line.

Run following snippet in the project root directory to add the key to the `.env` file as
required (you will need jq & vi installed):

```shell
jq -c '.' PATH_TO_API_KEY_FILE >> .env && vi -c 'normal f=v"ayd$"apJx wq' .env
```

To install jq & vi on ubuntu: `sudo apt-get install vim && sudo apt-get install jq`

3. Run this docker image with `npm run docker-run`, this command will also display the
port to access the running container on (localhost:${port})
4. Stop the container with `npm run docker-stop`

## API

### Requesting a translation

Connect to the Cloud Translate server with a WebSocket. To request a translation use
WebSocket Send with the following format:

```javascript
{
  text: 'text to translate',
  target: 'language code for source text to be translated to'
}
```

Note that the source language does not need to be specified as it will be automatically
detected.

A list of available language codes can be found [here](https://developers.google.com/admin-sdk/directory/v1/languages).

### Receiving a translation

Responses from the server can be received by the WebSocket requesting the translation with
a WebSocket Message in the following format:

```javascript
{
  translation: 'text translated into target language',
  original: 'source text sent to server'
}
```

### Example in JavaScript

```javascript
const webSocket = new WebSocket('ws://localhost:9999')
webSocket.addEventListener('open', () => { sendTranslation() })
webSocket.addEventListener('message' () => { receiveTranslation() })

function sendTranslation() {
  webSocket.send(JSON.stringify({
    text: 'hello world',
    target: 'de'
  })
}

function receiveTranslation(event) {
  console.log(event.data);
}
```
