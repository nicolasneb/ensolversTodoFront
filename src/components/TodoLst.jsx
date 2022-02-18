import React, { Component, useState, useEffect } from 'react';
import ToDoService from "../services/todo.service";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

function TodoLst(props) {
    let { id } = useParams();
    const [todos, setTodos] = useState([]);
    const [toDoName, setToDoName] = useState("");

    const onNameChange = e => setToDoName(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(toDoName);
        ToDoService.createToDo(id, toDoName).then(
            response => {
                console.log(response.data);
                setTodos([...todos, {name: toDoName}]);
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

    const handleDeleteToDo = idToDo => {
        console.log(idToDo)
        ToDoService.deleteToDo(id, idToDo).then(
            response => {
                console.log(response.data);
                setTodos(todos.filter((todo) => {return todo.id !== idToDo}));
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

    const handleCompleteToDo = idToDo => {
        console.log(idToDo);
        ToDoService.completeToDo(id, idToDo).then(
            response => {
                console.log(response.data);
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

    useEffect(() => {
        ToDoService.getTodos(id).then(
            response => {
                console.log(response.data.todos);
                setTodos(response.data.todos);
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
    }, [])
    
    return (
        <div class="container">
            <h4>Folders - </h4>
            <form>
                <div class="mb-3 col-auto">                            
                    <div class="row g-3 align-items-center">
                        {todos.map(todo => { return(
                            <div className="bg-success text-white">                                        
                                <div class="col-auto">
                                    <input type="checkbox" onClick={() => handleCompleteToDo(todo.id)} class="form-check-input" {...todo.completed ? "checked" : null} id="exampleCheck1"/>
                                </div>
                                <div class="col-auto">
                                    <label for="inputPassword6" class="col-form-label">- {todo.name}</label>
                                </div>
                                <div class="col-auto">
                                    <label for="inputPassword6" class="col-form-label">
                                        <Link to={"/folders/"}>Edit</Link>
                                    </label>
                                </div>
                                <div class="col-auto">
                                    <label for="inputPassword6" onClick={() => handleDeleteToDo(todo.id)} class="col-form-label">Remove</label>
                                </div>
                            </div>                    
                        )    
                    })}
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" value={toDoName} onChange={onNameChange} name="toDoName" placeholder="New To Do" aria-label="New To Do" aria-describedby="button-addon2"/>
                    <button onClick={handleSubmit} class="btn btn-outline-secondary" type="submit" id="button-addon2">Add</button>
                </div>
            </form>
        </div>
    );
}

export default TodoLst;