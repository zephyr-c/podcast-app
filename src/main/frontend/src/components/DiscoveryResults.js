import React from 'react';
import {ImageList, ImageListItem, ImageListItemBar} from '@mui/material';
import Link from '@mui/material/Link';


export default function DiscoveryResults({data}){

    return (
    <>
    <ImageList>
        {data.map((pod) => (
            <ImageListItem key={pod.image60 || pod.image100}>
                <img src={pod.image60 || pod.image100} alt={pod.collectionName} />
                <ImageListItemBar>
                    title={pod.collectionName}
                    subtitle={pod.artistName}
                </ImageListItemBar>
            </ImageListItem>
        ))}    
    </ImageList>    
    </>
    )
}