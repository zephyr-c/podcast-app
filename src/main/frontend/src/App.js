import './App.css';
import { useEffect } from 'react';
import {requestPodcasts} from './utils/requests';
import { actionLoadData } from './utils/actions';
import PodcastList from './components/PodcastList';
import AddPodcast from './components/AddPodcast';
import useAppState from './utils/useAppState';
import Discover from './components/Discover';
import Navbar from './components/Navbar';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b392d9'
    },
    secondary: {
      main: '#87bfb9'
    },
    like: {
      main: "#B2FF59"
    },
    background: {
      default: "#111111",
      paper: "#212121"
    },
    typography: {
      allVariants: {
        color: '#b392d9'
      }
    }
  },
})
 
function App() {
  const {state, dispatch} = useAppState();

  useEffect(() => {
    requestPodcasts().then(res => dispatch(actionLoadData(res.data)))
  }, [])

  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    <div className="App" backgroundColor="default">
      <Navbar dispatch={dispatch}/>
      <PodcastList data={state.podcasts} sortBy={state.sortBy} dispatch={dispatch} />
      <AddPodcast dispatch={dispatch}/>
      <Discover />
    </div>
    // </ThemeProvider>
  );
}

export default App;
