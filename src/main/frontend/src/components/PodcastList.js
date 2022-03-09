import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddPodcast from './AddPodcast';
import Podcast from './Podcast';


const exampleData = {
      "name": "Brain Sparks",
      "description": "This podcast is hosted by usability and UI design expert, Jared Spool. It offers tona of value with many industry leaders sharing insights on usability, UX design, and UI design.",
      "source": "https://www.uie.com/brainsparks/topics/podcasts/",
      "audio": "https://downloads.uie.fm/7/389/asset.uie.com/BSAL/UIEP015_Shipe_Goodwin.mp3",
      "image": "https://uie.fm/assets/album-art/the-uie-podcast.png",
      "title": "The Tension of Art and Science When Communicating Complex User Research"
    }

export default function PodcastList({ data }){

    return (
    <div style={{display: "flex", flexFlow: "column", alignItems: "center"}}>
    <List>
        {data.map((podcast, idx) => {
            return (
            <ListItem>
                <Podcast key={idx} 
                name={podcast.name} 
                title={podcast.title} 
                image={podcast.imageUrl} 
                source={podcast.sourceUrl} 
                audio={podcast.audioUrl} 
                description={podcast.description}
                likes={podcast.numLikes}
                dislikes={podcast.numDislikes}
                id={podcast.id} />
            </ListItem>)
        })}
    </List>
    </div>)
}