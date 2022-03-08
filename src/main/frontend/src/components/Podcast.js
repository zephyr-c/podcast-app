import React, {useState} from "react";
import { makeStyles } from "@mui/styles";
import {Card, CardContent, CardMedia, CardActionArea} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddPodcast from "./AddPodcast";
import podcast_placeholder from '../podcast_placeholder.jpg';

const useStyles = makeStyles((theme) => ({
    podcastCard: {
        display: "flex",
        height: "15vh",
        width: "75vw", 
        padding: "5px",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "2em",
    },
    thumbnail: {
        height: 75,
        width: 75
    }
}));

// one component/card for thumbnail and title
// onClick of that card, opens 'player' modal with all details

export default function Podcast({name, title, image, source, audio, description}){
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    return (<div>
        <Card style={{width: "50vw"}}>
            <CardActionArea style={{display: "grid", gridTemplateColumns: "150px 1fr 50px"}}>
            <CardMedia component="img" 
            src={image} alt="Podcast Cover" 
            style={{height: 75, width: 75, justifySelf: "center"}}
            onError={event => {
                event.target.src = podcast_placeholder
                event.onerror = null 
                }}/>
            <Box>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">{name}</Typography>
                    <Typography variant="subtitle1">{title}</Typography>
                </CardContent>
            </Box>
            </CardActionArea>
        </Card>
    </div>)
}