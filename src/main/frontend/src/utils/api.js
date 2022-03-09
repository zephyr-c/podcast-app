import axios from 'axios';

const mockServer = "https://84673c10-eb52-414e-8426-725be112dc87.mock.pstmn.io/api/podcasts"
const backendAddress = "http://localhost:8080/api/podcasts"

export async function getPodcasts() {
    return await axios.get(mockServer)
}

export async function addPodcast(newPodcast) {
    return await axios.post(mockServer)
}