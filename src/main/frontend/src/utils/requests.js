import {readQuery, createQuery, updateQuery, discover} from './api.js'
import { actionAddPodcast } from './actions.js'


/////////////////// Podcast Requests ///////////////////
export const requestPodcasts = () => {
    return readQuery()
}

export const addPodcast = (newPodcast, dispatch) => {
    return createQuery({data: newPodcast})
    .then((response) => {
          if(response.status === 201){
            console.log(response)
            dispatch(actionAddPodcast({...newPodcast, id: response.data}))
            console.log("succuessfully added ", newPodcast)
          }
        })
    
}

export const likePodcast = () => {}

export const dislikePodcast = () => {}


/////////////////// Discovery Requests ///////////////////
function parseResult(result) {
    return {
        artistName: result.artistName,
        collectionName: result.collectionName,
        collectionViewUrl: result.collectionViewUrl,
        image100: result.artworkUrl100,
        image60: result.artworkUrl60,
        feedUrl: result.feedUrl,
    }
}

export const performSearch = (updateState, params) => {
        discover(params)
        .then(res => {
            let formattedResults = res.data.results.map(p => parseResult(p))
            updateState(formattedResults)
            console.log(formattedResults)
        })
}