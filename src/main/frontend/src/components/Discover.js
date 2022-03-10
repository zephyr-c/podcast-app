import React, { useState } from 'react';
import { performSearch } from '../utils/requests';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DiscoveryResults from './DiscoveryResults';




export default function Discover() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([])
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
       let payload = {
           term: searchTerm,
           media: "podcast",
           limit: 5,
        }
        performSearch(setSearchResults, payload)
    }

    const toggleOpenClose = () => {
        setSearchTerm("")
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <Button variant="outlined" onClick={toggleOpenClose}>
                Discover!
            </Button>

            <Dialog open={isOpen} onClose={toggleOpenClose} aria-labelledby="discover-podcasts-title">
                <DialogTitle id="discover-podcasts-title">Discover New Podcasts</DialogTitle>
                <DialogContentText>
                    Search Apple Podcasts to discover new shows!
                </DialogContentText>
                <DialogContent>
                    <TextField 
                        margin="dense" 
                        id="search"
                        label="Search for..." 
                        type="text" 
                        content={searchTerm} 
                        defaultValue={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    {searchResults && <DiscoveryResults data={searchResults}/>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleOpenClose}>Cancel</Button>
                    <Button onClick={handleClick}>Search</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}