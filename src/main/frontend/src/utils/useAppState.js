import { useReducer } from 'react';
import { LOAD, ADD, LIKE, DISLIKE, SORT } from './actions';

function reducer(state, action){
  switch (action.type){
    case LOAD:
      return {...state, podcasts: action.data};
    case ADD:
      return {...state, podcasts: [...state.podcasts, action.data]};
    case LIKE:
        return {...state, podcasts: updateLikes([...state.podcasts], action.id, "like")};
    case DISLIKE:
        return {...state, podcasts: updateLikes([...state.podcasts], action.id, "dislike")};
    case SORT:
        return {...state, sortBy: action.sortValue}
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
    const [state, dispatch] = useReducer(reducer, {podcasts: [], sortBy: 'id'})

    return {state: state, dispatch: dispatch}
}