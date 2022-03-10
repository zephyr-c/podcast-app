import React from 'react';
import {ImageList, ImageListItem, ImageListItemBar} from '@mui/material';
import { style } from '@mui/system';
import Link from '@mui/material/Link';


export default function DiscoveryResults({data}){

    return (
    <>
    <ImageList cols={2} sx={{width: 600}}>
        {data.map((pod, idx) => (
            <ImageListItem key={idx}>
                <img src={pod.image600} alt={pod.collectionName} />
                <Link href={pod.collectionViewUrl} target="_blank" rel="noreferrer noopener">
                <ImageListItemBar
                    title={pod.collectionName}
                    subtitle={pod.artistName}
                />
                </Link>
            </ImageListItem>
        ))}    
    </ImageList>    
    </>
    )
}