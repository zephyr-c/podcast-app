import logo from './logo.svg';
import './App.css';
import {useState, useEffect, useReducer} from 'react';
import PodcastList from './components/PodcastList';
import AddPodcast from './components/AddPodcast';


const axios = require('axios');
const mockServer = "https://84673c10-eb52-414e-8426-725be112dc87.mock.pstmn.io/api/podcasts"
const backendAddress = "http://localhost:8080/api/podcasts"

function reducer(state, action){
  switch (action.type){
    case 'load':
      return {podcasts: action.data};
    case 'add':
      return {podcasts: [...state.podcasts, action.data]}
    default:
      throw new Error();
  }
}

function App() {
  // const [podcasts, setPodcasts] = useState([]);
  const [state, dispatch] = useReducer(reducer, {podcasts: []})

  useEffect(() => {
    axios.get(mockServer)
    .then((response) => {
      // setPodcasts(response.data)
      dispatch({type: 'load', data: response.data})
    })
    .then(function(){
      console.log("performed effect")
      console.log("podcasts: ", state.podcasts)
    })
  }, [])
  return (
    <div className="App">
      <header>Podcast App</header>
      <PodcastList data={state.podcasts}/>
      <AddPodcast dispatch={dispatch}/>
    </div>
  );
}

export default App;
