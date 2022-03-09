export const LOAD = 'LOAD';
export const ADD = 'ADD';
export const LIKE = 'LIKE';
export const DISLIKE = 'DISLIKE';

export const actionLoadData = (data) => ({type: LOAD, data: data})
export const actionAddPodcast = (podcast) => ({type: ADD, data: podcast})
export const actionLikePodcast = (podcast, index) => ({type: LIKE, podcast: podcast})
export const actionDislikePodcast = (podcast, index) => ({type: DISLIKE, podcast: podcast})