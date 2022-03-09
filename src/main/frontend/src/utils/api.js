import axios from 'axios';

const mockServer = "https://84673c10-eb52-414e-8426-725be112dc87.mock.pstmn.io/api/podcasts"
const backendAddress = "http://localhost:8080/api/podcasts"

const server = mockServer;

export async function getPodcasts() {
    return await axios.get(server)
}

export async function addPodcast(newPodcast) {
    return await axios.post(server)
}

export async function likePodcast(id){
    return await axios.put(server + `/${id}/like`)
}

export async function dislikePodcast(id){
    return await axios.put(server + `/${id}/dislike`)
}