import axios from 'axios';

const API_URL = "https://ensolverstodobackend.herokuapp.com/folders";

class FolderService {
    getFolders(){
        return axios.get(API_URL);
    }

    getFolder(idFolder){
        return axios.get(API_URL + "/" + idFolder);
    }

    deleteFolder(idFolder){
        return axios.delete(API_URL + "/" + idFolder);
    }

    createFolder(folderName){
        return axios.post(API_URL, {
            "name": folderName,
        },
        {
            headers: {"Access-Control-Allow-Origin": "*"
        } 
        });
    }

    updateFolder(idFolder, folderName){
        return axios.put(API_URL + "/" + idFolder, {
            "name": folderName,
        });
    }
}

export default new FolderService();