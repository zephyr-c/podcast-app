import React, {useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Podcast from './Podcast';
import { actionLikePodcast, actionDislikePodcast, actionLoadData, actionSortBy } from '../utils/actions';

export default function PodcastList({ data, sortBy, dispatch }){

    useEffect(() => {
        const sortList = option => {
            const options = {
                name: 'name',
                title: 'title',
                numLikes: 'numLikes',
                numDislikes: 'numDislikes'
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
    <List>
        {data.map((podcast, idx) => {
            return (
            <ListItem key={idx} color="primary">
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
                vote={handleVote}
                dispatch={dispatch} />
            </ListItem>)
        })}
    </List>
    </div>)
}