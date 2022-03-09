import React, {useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Podcast from './Podcast';
import { actionLikePodcast, actionDislikePodcast, actionLoadData, actionSortBy } from '../utils/actions';

const exampleData = {
      "name": "Brain Sparks",
      "description": "This podcast is hosted by usability and UI design expert, Jared Spool. It offers tona of value with many industry leaders sharing insights on usability, UX design, and UI design.",
      "source": "https://www.uie.com/brainsparks/topics/podcasts/",
      "audio": "https://downloads.uie.fm/7/389/asset.uie.com/BSAL/UIEP015_Shipe_Goodwin.mp3",
      "image": "https://uie.fm/assets/album-art/the-uie-podcast.png",
      "title": "The Tension of Art and Science When Communicating Complex User Research"
    }

export default function PodcastList({ data, sortBy, dispatch }){

    useEffect(() => {
        const sortList = option => {
            const options = {
                name: 'name',
                title: 'title',
            }
            const sortValue = options[option];
            const sorted = [...data].sort((a, b) => (a[sortValue] > b[sortValue]) ? 1 : -1);
            dispatch(actionLoadData(sorted))
        }
        sortList(sortBy)
    }, [sortBy])



    const handleVote = (id, voteType) => {
        voteType === 1 ? dispatch(actionLikePodcast(id)) : dispatch(actionDislikePodcast(id));
    }
    return (
    <div style={{display: "flex", flexFlow: "column", alignItems: "center"}}>
    <select onChange={(e) => {
        dispatch(actionSortBy(e.target.value))}}>
        <option value="id"></option>
        <option value="name">Name</option>
        <option value="title">Title</option>
    </select>
    <List>
        {data.map((podcast, idx) => {
            return (
            <ListItem key={idx}>
                <Podcast
                name={podcast.name} 
                title={podcast.title} 
                image={podcast.imageUrl} 
                source={podcast.sourceUrl} 
                audio={podcast.audioUrl} 
                description={podcast.description}
                likes={podcast.numLikes}
                dislikes={podcast.numDislikes}
                id={podcast.id}
                vote={handleVote} />
            </ListItem>)
        })}
    </List>
    </div>)
}