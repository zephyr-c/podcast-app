export const LOAD = 'LOAD';
export const ADD = 'ADD';
export const LIKE = 'LIKE';
export const DISLIKE = 'DISLIKE';

export const actionLoadData = (data) => ({type: LOAD, data: data})
export const actionAddPodcast = (podcast) => ({type: ADD, data: podcast})
export const actionLikePodcast = (id) => ({type: LIKE, id: id})
export const actionDislikePodcast = (id) => ({type: DISLIKE, id: id})