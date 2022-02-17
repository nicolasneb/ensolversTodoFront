import React, {Component} from 'react';
import FolderService from "../services/folder.service";

class FoldersLst extends Component {

    constructor(props){
        super(props);
        this.state = {
            folderName: null,
            folders: []
        }

        this.handleEditFolderName = this.handleEditFolderName.bind(this);
        this.handleAddFolder = this.handleAddFolder.bind(this);
        this.handleDeleteFolder = this.handleDeleteFolder.bind(this);
    }

    handleEditFolderName(event){
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleAddFolder(event){
        event.preventDefault();
        FolderService.createFolder(this.state.folderName).then(
            response => {
                console.log(response.data);
                this.setState({
                    folders: [...this.state.folders, {name : this.state.folderName}]
                })        
            },
            error => {
            console.log('ocurrio un error');
            const resMessage =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            }
        )
    }

    handleDeleteFolder(idFolder){
        FolderService.deleteFolder(idFolder).then(
            response => {
                console.log(response.data);
                this.setState({
                    folders: this.state.folders.filter((folder) => {return folder.id !== idFolder})
                })        
            },
            error => {
            console.log('ocurrio un error');
            const resMessage =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            }
        )
    }

    componentDidMount(){
        FolderService.getFolders().then(
            response => {
                console.log(response.data);
                this.setState({
                    folders: response.data,
                });     
            },
            error => {
            console.log('ocurrio un error');
            const resMessage =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            }
        );
    }

    render() {
        return (
            <div class="container">
                <h4>Folders</h4>
                <form>
                    <div class="mb-3 col-auto">
                        {/* <input type="checkbox" class="form-check-input" id="exampleCheck1"/> */}
                        <div class="row g-3 align-items-center">
                            {
                               this.state.folders.map(folder => {
                                    console.log("folders:", folder)
                                    return(
                                        <div>                                        
                                            <div class="col-auto">
                                                <label for="inputPassword6" class="col-form-label">- {folder.name}</label>
                                            </div>
                                            <div class="col-auto">
                                                <label for="inputPassword6" class="col-form-label">View Items</label>
                                            </div>
                                            <div class="col-auto">
                                                <label for="inputPassword6" onClick={() => this.handleDeleteFolder(folder.id)} class="col-form-label">Remove</label>
                                            </div>
                                        </div>
                                    )
                                })
                            }                            
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" name="folderName" onChange={this.handleEditFolderName} placeholder="New Folder" aria-label="New Folder" aria-describedby="button-addon2"/>
                        <button onClick={this.handleAddFolder} class="btn btn-outline-secondary" type="submit" id="button-addon2">Add</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default FoldersLst;