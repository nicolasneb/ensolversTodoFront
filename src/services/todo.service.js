import axios from 'axios';

const API_URL = "https://ensolverstodobackend.herokuapp.com/folders";

class ToDoService {
    getTodos(idFolder){
        return axios.get(API_URL + "/" + idFolder);
    }

    getFolder(idFolder){
        return axios.get(API_URL + "/" + idFolder);
    }

    deleteToDo(idFolder, idToDo){
        return axios.delete(API_URL + "/" + idFolder + "/todos/" + idToDo);
    }

    createToDo(idFolder, toDoName){
        return axios.post(API_URL + "/" + idFolder + "/todos", {
            "name": toDoName,
        });
    }

    updateFolder(idFolder, folderName){
        return axios.put(API_URL + "/" + idFolder, {
            "name": folderName,
        });
    }

    completeToDo(idFolder, idToDo){
        return axios.delete(API_URL + "/" + idFolder + "/todos/" + idToDo + "/complete");
    }
}

export default new ToDoService();