import {readQuery, createQuery, updateQuery, discover} from './api.js'
import { actionAddPodcast, actionLikePodcast, actionDislikePodcast } from './actions.js'


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

export const voteOnPodcast = (podcastId, vote, dispatch) => {
    const action = vote === 1 ? "like" : "dislike";
    return updateQuery({id: podcastId, action: action})
    .then((response) => 
        response.status === 200 && 
        dispatch(vote === 1 ? actionLikePodcast(podcastId) : actionDislikePodcast(podcastId)))
}


/////////////////// Discovery Requests ///////////////////
function parseResult(result) {
    return {
        artistName: result.artistName,
        collectionName: result.collectionName,
        collectionViewUrl: result.collectionViewUrl,
        image100: result.artworkUrl100,
        image60: result.artworkUrl60,
        image600: result.artworkUrl600,
        feedUrl: result.feedUrl,
    }
}

export const performSearch = (updateState, searchTerm) => {
        let params = {
            term: searchTerm,
            media: "podcast",
            limit: 50
        }
        discover(params)
        .then(res => {
            let formattedResults = res.data.results.map(p => parseResult(p))
            updateState(formattedResults)
            console.log(formattedResults)
        })
}