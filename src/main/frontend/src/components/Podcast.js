import React, {useState, useEffect, useRef} from "react";
import { makeStyles } from "@mui/styles";
import {Card, CardContent, CardMedia, CardActionArea} from "@mui/material";
import {Dialog, DialogContent, DialogActions} from "@mui/material";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from '@mui/icons-material/Pause';
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
    const [isPlaying, setIsPlaying] = useState(false);
    const audioElement = useRef(null)

    const handlePlayClick = () => {
        if (isPlaying) {
            audioElement.current.pause();
            setIsPlaying(false);
        } else {
            audioElement.current.play();
            setIsPlaying(true);
        }
    }

    const handleClose = () => {
        setIsPlaying(false);
        setOpen(false);
    }

    return (<div>
        <Card style={{width: "50vw"}}>
            <CardActionArea style={{display: "grid", gridTemplateColumns: "150px 1fr 50px"}} onClick={()=> setOpen(true)}>
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

        <Dialog open={open} onBackdropClick={handleClose}>
            <DialogContent>
                <Card>
                    <audio src={audio} ref={audioElement}/>
                    <Box style={{display: 'flex', flexDirection: 'column'}}>
                        <CardContent>
                            <Typography>
                                {title}
                            </Typography>
                            <Typography>
                                {name}
                            </Typography>
                        </CardContent>
                        <Box>
                            <IconButton aria-label="play/pause" onClick={handlePlayClick}>
                                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                            </IconButton>
                        </Box>
                    </Box>
                    <CardMedia component="img" src={image} alt="PodcastCover" />
                </Card>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>

        </Dialog>


    </div>)
}