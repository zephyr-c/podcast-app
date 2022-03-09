import { useReducer } from 'react';
import { LOAD, ADD, LIKE, DISLIKE } from './actions';

function reducer(state, action){
  switch (action.type){
    case LOAD:
      return {podcasts: action.data};
    case ADD:
      return {podcasts: [...state.podcasts, action.data]};
    case LIKE:
        return {podcasts: updateLikes([...state.podcasts], action.id, "like")};
    case DISLIKE:
        return {podcasts: updateLikes([...state.podcasts], action.id, "dislike")};
    default:
      throw new Error();
  }
}

function updateLikes(podcasts, id, vote){
    try{
    const target = podcasts.find(pod=> pod.id === id)
    vote === "like" ? target.numLikes += 1 : target.numDislikes += 1;
    return podcasts
    } catch (error){
        console.error(error);
    }
}

export default function useAppState() {
    const [state, dispatch] = useReducer(reducer, {podcasts: []})

    return {state: state, dispatch: dispatch}
}