import React, {useState} from "react";
import { addPodcast } from '../utils/requests';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    dialogContent: {
        display: "flex",
        flexFlow: "column",
    }

}));

function InputField({id, label, type, content, handleChange}){
    return (<TextField margin="dense" id={id} label={label} type={type} defaultValue={content} onChange={(e) => handleChange(e.target.value)}/>)
}

export default function AddPodcast({dispatch}) {
    const classes = useStyles();
    
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [source, setSource] = useState("");
    const [audio, setAudio] = useState("");
    const [description, setDescription] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const reset = () => {
      setName("");
      setTitle("");
      setImage("");
      setSource("");
      setAudio("");
      setDescription("");
    }

    const handleSubmit = () => {
        const newPodcast = {
            "name": name,
            "title": title,
            "imageUrl": image,
            "sourceUrl": source,
            "audioUrl": audio,
            "description": description,
            "numLikes": 0,
            "numDislikes": 0
        }

        addPodcast(newPodcast, dispatch)
        reset();
        handleClose();
    }

    return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Podcast
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-podcast-title"
      >
        <DialogTitle id="add-podcast-title">Add New Podcast</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText>
            Fill out all fields to add a new podcast to the list
          </DialogContentText>
          <InputField id="name" label="Show Name" type="text" content={name} handleChange={setName}/>
          <InputField id="title" label="Episode Title" type="text" content={title} handleChange={setTitle} />
          <InputField id="image" label="Image URL" type="text" content={image} handleChange={setImage} />
          <InputField id="source" label="Source URL" type="text" content={source} handleChange={setSource} />
          <InputField id="audio" label="Audio URL" type="text" content={audio} handleChange={setAudio} />
          <InputField id="desc" label="Description" type="textarea" content={description} handleChange={setDescription} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}