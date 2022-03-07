import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import PodcastList from './components/PodcastList';
import AddPodcast from './components/AddPodcast';


const axios = require('axios');

function App() {
  const [podcasts, setPodcasts] = useState([]);
  // useEffect(() => {
  //   axios.get("localhost:8080/api/podcasts")
  //       .then(function(response) {
  //     console.log(response)
  //   })
  //       .catch(function (error) {
  //         console.log(error)
  //       })
  //       .then(function() {
  //         console.log("performed effect")
  //       });
  // })
  return (
    <div className="App">
      <header>Podcast App</header>
      <PodcastList />
      <AddPodcast />
    </div>
  );
}

export default App;
