# Livepeer API Demo

This is a demo app to showcase how to use the Livepeer API to create a live stream and play it back with JWPlayer. The app enables the user to create a stream and play it back via JWPlayer while tracking video analytics which can be accessed on the JWPlayer Dashboard.

**Note: To start a video stream, please use a broadcaster software like OBS/Streamyard on desktop, or Larix on mobile**

The demo app uses POST [/stream](https://livepeer.com/docs/guides/api/create-a-stream) endpoint to create a new stream.

For more information on the API and the endpoints availble, please check the [Livepeer API documentation](https://docs.livepeer.studio/).

**Note: You will need an API Key from Livepeer Studio AND JWPlayer to use this application**

### Steps to acquire a Livepeer.com API key:

- Sign up/ Log in to livepeer.studio
- On the dashboad click on API Keys tab
- Click on "Create" to create an API Key

You can enter this API key in the demo app.

### Steps to acquire a Livepeer Studio API key:

- Sign up/ Log in on JWPlayer
- On the top right corner click on settings (cogwheel icon).
- Click on "API Credentials"
- Copy the v1 API Credentials that is created by default or create a new one.

You will be asked to input the API key and secret in the demo app.

### Tech note:

This app uses NextJS api routes to communicate with the Livepeer API and JWPlayer API. Checkout `pages/api` directory for the relevant code.
