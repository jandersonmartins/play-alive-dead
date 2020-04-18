import React, { useReducer, useEffect } from 'react';
import aliveUrl from './sounds/alive-pt.ogg'
import deadUrl from './sounds/dead-pt.ogg'
import aliveImage from './images/alive.svg'
import deadImage from './images/dead.svg'
import './App.css';

const audios = [
  new Audio(aliveUrl),
  new Audio(deadUrl)
]

const images = [
  aliveImage,
  deadImage
]

const zeroOrOne = () => Math.round(Math.random())

const INITIAL_STATE = {
  playing: false,
  audio: null
}

const Types = {
  STOP: 'STOP',
  PLAY: 'PLAY',
  CHANGE_AUDIO: 'CHANGE_AUDIO'
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.STOP:
      return {
        ...state,
        playing: false,
        audio: null
      }

    case Types.PLAY:
      return {
        ...state,
        playing: true,
        audio: action.audio
      }

    case Types.CHANGE_AUDIO:
      return {
        ...state,
        audio: action.audio
      }

    default:
      return { ...state }
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    if (state.playing) {
      audios[state.audio].play().then(() => {
        setTimeout(() => {
          dispatch({ type: Types.CHANGE_AUDIO, audio: zeroOrOne() })
        }, 900) // TODO: Get random milliseconds
      })
    }
  }, [state])

  const handleOnClick = () => {
    if (state.playing) {
      return dispatch({ type: Types.STOP })
    }
    dispatch({ type: Types.PLAY, audio: zeroOrOne() })
  }

  return (
    <div className="app">
      <div className="btn-container">
        <button onClick={handleOnClick}>{state.playing ? 'Parar' : 'Começar'}</button>
      </div>

      <div className="image-container">
        {state.playing && <img src={images[state.audio]} alt={state.audio ? 'vivo' : 'morto'} />}
      </div>
    </div>
  );
}

export default App;
