import './App.css';
import { useEffect } from 'react';
import { getPodcasts } from './utils/api';
import {requestPodcasts} from './utils/requests';
import { actionLoadData } from './utils/actions';
import PodcastList from './components/PodcastList';
import AddPodcast from './components/AddPodcast';
import useAppState from './utils/useAppState';
import Discover from './components/Discover';

function App() {
  const {state, dispatch} = useAppState();

  useEffect(() => {
    requestPodcasts().then(res => dispatch(actionLoadData(res.data)))
  }, [])

  return (
    <div className="App">
      <header>Podcast App</header>
      <PodcastList data={state.podcasts} sortBy={state.sortBy} dispatch={dispatch} />
      <AddPodcast dispatch={dispatch}/>
      <Discover />
    </div>
  );
}

export default App;
