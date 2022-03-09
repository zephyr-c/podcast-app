import './App.css';
import { useEffect, useReducer } from 'react';
import { getPodcasts } from './utils/api';
import { actionLoadData } from './utils/actions';
import PodcastList from './components/PodcastList';
import AddPodcast from './components/AddPodcast';
import useAppState from './utils/useAppState';

function App() {
  const {state, dispatch} = useAppState();

  useEffect(() => {
    getPodcasts().then(res => dispatch(actionLoadData(res.data)))
  }, [])

  return (
    <div className="App">
      <header>Podcast App</header>
      <PodcastList data={state.podcasts} dispatch={dispatch} />
      <AddPodcast dispatch={dispatch}/>
    </div>
  );
}

export default App;


/*
newPodcasts = [...state.podcasts]
newPodcasts
*/