import './App.css';
import { useEffect, useReducer } from 'react';
import { getPodcasts } from './utils/api';
import PodcastList from './components/PodcastList';
import AddPodcast from './components/AddPodcast';

function reducer(state, action){
  switch (action.type){
    case 'load':
      return {podcasts: action.data};
    case 'add':
      return {podcasts: [...state.podcasts, action.data]};
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {podcasts: []})

  useEffect(() => {
    getPodcasts().then(res => dispatch({type: 'load', data: res.data}))
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