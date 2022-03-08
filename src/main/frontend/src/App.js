import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import PodcastList from './components/PodcastList';
import AddPodcast from './components/AddPodcast';


const axios = require('axios');
const mockServer = "https://84673c10-eb52-414e-8426-725be112dc87.mock.pstmn.io/api/podcasts"

function App() {
  const [podcasts, setPodcasts] = useState([]);
  useEffect(() => {
    axios.get(mockServer)
    .then((response) => {
      setPodcasts(response.data)
    })
    .then(function(){
      console.log("performed effect")
      console.log("podcasts: ", podcasts)
    })
  }, [])
  return (
    <div className="App">
      <header>Podcast App</header>
      <PodcastList data={podcasts}/>
      <AddPodcast />
    </div>
  );
}

export default App;
