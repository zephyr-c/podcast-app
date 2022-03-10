import axios from 'axios';

const mockServer = "https://84673c10-eb52-414e-8426-725be112dc87.mock.pstmn.io/api/podcasts"
const backendAddress = "http://localhost:8080/api/podcasts"

const server = mockServer;

export async function getPodcasts() {
    return await axios.get(server)
}

export async function addPodcast(newPodcast) {
    return await axios.post(server, newPodcast)
}

export async function likePodcast(id){
    return await axios.put(server + `/${id}/like`)
}

export async function dislikePodcast(id){
    return await axios.put(server + `/${id}/dislike`)
}

export async function discover(params){
    return await axios.get("https://itunes.apple.com/search", {params: params})
}

export function builder(id, action){
    return `/{id}/{action}`
}

export async function readQuery(){
    return await axios.get(server);
}

export async function createQuery(query){
    try{
    return await axios.post(server, query.data)
    }
    catch (error) {
        console.error("error =>", error)
    }
}

export async function updateQuery(query){
    return await axios.put(server + builder(query.id, query.action))
}

/*
queries...
builder(id, endpoint)
    returns `/{id}/{endpoint}

async readQuery(query)
    options = makeOptions('get', query.params, query.body)
    return await axios(options)

async createQuery(data)
    return await axios.post()

async updateQuery(query)
    return await axios.put(server + builder(id, action))



*/