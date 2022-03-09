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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {styled, spacing} from '@mui/system';
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

const _IconButton = styled('IconButton')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

// TODO: Style player modal, structure layout, add description
// TODO: Add buttons for likes and dislikes
// TODO: Add functionality for likes and dislikes
// TODO: look into uploader(for songs?)

export default function Podcast({name, title, image, source, audio, description, likes, dislikes, id, vote}){
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false);
    const audioElement = useRef(null)

    useEffect(()=> {
        console.log("change detected");
    }, [likes])

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

    const handleLikeClick = () => {
        vote(id, 1);
    }

    const handleDislikeClick = () => {
        vote(id, -1);
    }

    return (<div>
        <Card style={{width: "50vw", display: "grid", "gridTemplateColumns": "1fr 50px"}}>
            <CardActionArea style={{display: "grid", gridTemplateColumns: "150px 1fr"}} onClick={()=> setOpen(true)}>
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
            <Box style={{display: 'grid', gridTemplateRows: "1fr 1fr"}}>
                <_IconButton>
                    <ThumbUpIcon />
                    <Typography variant="subtitle2" component="div">{likes}</Typography>
                </_IconButton>
                <_IconButton>
                    <ThumbDownIcon />
                    <Typography variant="subtitle2" component="div">{dislikes}</Typography>
                </_IconButton>
            </Box>
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
            <DialogActions style={{display: "flex", justifyContent: "space-between"}}>
                <Box style={{display: "flex", justifyContent: "space-between"}}>
                <IconButton onClick={handleLikeClick}>
                    <ThumbUpIcon sx={{}} />
                    <Typography variant="subtitle2" component="div">{likes}</Typography>
                </IconButton>
                <IconButton onClick={handleDislikeClick}>
                    <ThumbDownIcon />
                    <Typography variant="subtitle2" component="div">{dislikes}</Typography>
                </IconButton>
                </Box>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>

        </Dialog>


    </div>)
}