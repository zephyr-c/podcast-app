import axios from 'axios';

const mockServer = "https://84673c10-eb52-414e-8426-725be112dc87.mock.pstmn.io/api/podcasts"
const backendAddress = "http://localhost:8080/api/podcasts"

const server = backendAddress;

const errorLogger = (error) => {
    if (error.response){
            console.log(error.response.data);
            console.log(error.response.status);
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
}

export async function discover(params){
    return await axios.get("https://itunes.apple.com/search", {params: params})
}

export function builder(id, action){
    return `/${id}/${action}`
}

export async function readQuery(){
    try {
    return await axios.get(server);
    }
    catch (error) {
        errorLogger(error)
    }
}

export async function createQuery(query){
    try{
    return await axios.post(server, query.data)
    }
    catch (error) {
        errorLogger(error)
    }
}

export async function updateQuery(query){
    try {
        return await axios.put(server + builder(query.id, query.action))
    }
    catch (error){
        errorLogger(error)
    }
}