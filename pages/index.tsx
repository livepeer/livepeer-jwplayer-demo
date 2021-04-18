import React from "react";

import { APP_STATES } from "../utils/types";
import AppBody from "../components/AppBody";
import { createStream, getStreamStatus } from "../utils/apiFactory";

const INITIAL_STATE = {
  appState: APP_STATES.API_KEY,
  apiKey: null,
  streamId: null,
  playbackId: null,
  streamKey: null,
  streamIsActive: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SUBMIT_API_KEY":
      return {
        ...state,
        appState: APP_STATES.CREATE_BUTTON,
        apiKey: action.payload.apiKey,
      };
    case "CREATE_CLICKED":
      return {
        ...state,
        appState: APP_STATES.CREATING_STREAM,
      };
    case "STREAM_CREATED":
      return {
        ...state,
        appState: APP_STATES.WAITING_FOR_VIDEO,
        streamId: action.payload.streamId,
        playbackId: action.payload.playbackId,
        streamKey: action.payload.streamKey,
      };
    case "VIDEO_STARTED":
      return {
        ...state,
        appState: APP_STATES.SHOW_VIDEO,
        streamIsActive: true,
      };
    case "VIDEO_STOPPED":
      return {
        ...state,
        appState: APP_STATES.WAITING_FOR_VIDEO,
        streamIsActive: false,
      };
    case "RESET_DEMO_CLICKED":
      return {
        ...INITIAL_STATE,
      };
    default:
      break;
  }
};

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  React.useEffect(() => {
    if (state.appState === APP_STATES.CREATING_STREAM) {
      (async function () {
        const streamCreateResponse = await createStream(state.apiKey);

        if (streamCreateResponse.data) {
          const {
            id: streamId,
            playbackId,
            streamKey,
          } = streamCreateResponse.data;
          dispatch({
            type: "STREAM_CREATED",
            payload: {
              streamId,
              playbackId,
              streamKey,
            },
          });
        }
      })();
    }

    let interval;
    if (state.streamId) {
      interval = setInterval(async () => {
        const streamStatusResponse = await getStreamStatus(
          state.apiKey,
          state.streamId
        );
        if (streamStatusResponse.data) {
          const { isActive } = streamStatusResponse.data;
          dispatch({
            type: isActive ? "VIDEO_STARTED" : "VIDEO_STOPPED",
          });
        }
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [state.appState]);

  return (
    <main className="container pb-12 h-screen">
      <header className="w-screen p-3 flex justify-between items-center">
        <a
          href="https://livepeer.com/docs/"
          target="_blank"
          rel="noopener, nofollow"
          className="logo flex flex-col w-2/5 lg:w-1/5"
        >
          <img src="/logo.svg"></img>
          <span className="font-bold">API Demo</span>
        </a>

        <button
          className="border p-2 h-1/2 rounded border-livepeer hover:bg-livepeer hover:text-white"
          onClick={() => dispatch({ type: "RESET_DEMO_CLICKED" })}
        >
          Reset Demo
        </button>
      </header>
      <AppBody
        state={state}
        setApiKey={(apiKey) =>
          dispatch({ type: "SUBMIT_API_KEY", payload: { apiKey } })
        }
        createStream={() => dispatch({ type: "CREATE_CLICKED" })}
      />
      <footer className="fixed bottom-0 left-0 w-full h-12 bg-black text-white flex items-center justify-center">
        Made with&nbsp;
        <a href="https://livepeer.com/docs/" className="text-livepeer text-xl">
          Livepeer.com
        </a>
        &nbsp;API
      </footer>
    </main>
  );
}
