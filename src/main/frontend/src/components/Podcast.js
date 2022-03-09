import React, {useState, useEffect, useRef} from "react";
import { makeStyles } from "@mui/styles";
import {Card, CardContent, CardMedia, CardActionArea} from "@mui/material";
import {Dialog, DialogContent, DialogActions} from "@mui/material";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {styled, spacing} from '@mui/system';
import podcast_placeholder from '../podcast_placeholder.jpg';
import { likePodcast, dislikePodcast } from "../utils/api";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const useStyles = makeStyles((theme) => ({
    cardButton: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialogButton: {},
}));

const ContentBox = styled('Box')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
})

// TODO: Style player modal, structure layout, add description
// TODO: look into uploader(for songs?)

export default function Podcast({name, title, image, source, audio, description, likes, dislikes, id, vote}){
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

    const handleLikeClick = () => {
        likePodcast(id)
        .then(res => res.status === 200 && vote(id, 1))
        .catch((error) => {
          if (error.response){
            console.log(error.response.data);
            console.log(error.response.status);
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
        })
    }

    const handleDislikeClick = () => {
        dislikePodcast(id)
        .then(res => res.status === 200 && vote(id, 0))
        .catch((error) => {
          if (error.response){
            console.log(error.response.data);
            console.log(error.response.status);
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
        })
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
                <IconButton className={classes.cardButton}>
                    <ThumbUpIcon />
                    <Typography variant="subtitle2" component="div">{likes}</Typography>
                </IconButton>
                <IconButton className={classes.cardButton}>
                    <ThumbDownIcon />
                    <Typography variant="subtitle2" component="div">{dislikes}</Typography>
                </IconButton>
            </Box>
        </Card>

        <Dialog open={open} onBackdropClick={handleClose}>
            <DialogContent>
                <Card>
                    <ContentBox>
                        <CardContent style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography>
                                {name}
                            </Typography>
                            <CardMedia component="img" src={image} style={{height: 150, width: 150}} alt="PodcastCover" />
                            <Typography>
                                {title}
                            </Typography>
                            {/* <audio src={audio} ref={audioElement} controls/> */}
                            <AudioPlayer src={audio} />
                        </CardContent>
                        
                        {/* <Box>
                            <IconButton aria-label="play/pause" fontSize="large" onClick={handlePlayClick}>
                                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                            </IconButton>
                        </Box> */}
                    </ContentBox>
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