import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { Button } from '@mui/material'
import { MdDelete } from "react-icons/md";
import Edit from '../edit/Edit';
import './todoView.css'
import { deleteTodoAPI, editTodoAPI, getAllTodoAPI } from '../../services/allAPI';
import { useDispatch, useSelector } from 'react-redux';
import { todoChangeResponse } from '../../redux/todoSliece/todoSlice';

const TodoView = () => {

    const dispatch = useDispatch()
    const [todos, setTodos] = useState([])

    const todoResponse = useSelector(state => state.todoReducer)

    const getAllTodo = async () => {
        try {
            const response = await getAllTodoAPI()
            if (response.status === 200) {
                setTodos(response.data)
            } else {
                console.log(response.response.data);
            }
        } catch (error) {
            console.log(`Failed to fetch todo Error : ${error}`)
        }
    }

    const toggleTodoStatus = async (id) => {

        // First, find the todo item in the state
        const todo = todos.find(todo => todo._id === id);
        if (!todo) {
            console.log("Todo not found");
            return;
        }

        // Toggle the status
        const updatedStatus = todo.status === "Completed" ? "Pending" : "Completed";
        const updatedTodo = { ...todo, status: updatedStatus };

        try {
            // Call the API to update the todo in the backend
            const result = await editTodoAPI(id, updatedTodo);
            if (result.status === 200) {
                console.log(result.data);

                // Update the todo in the local state
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo._id === id ? { ...todo, status: updatedStatus } : todo
                    )
                );
            } else {
                console.log(result.response.data);
            }
        } catch (error) {
            console.error("Failed to update todo status", error);
        }
    };

    const handleDlete = async (id) => {
        try {
            const result = await deleteTodoAPI(id)
            if (result.status === 200) {
                console.log(result.data);
                dispatch(todoChangeResponse(result.data))
            } else {
                console.log(result.response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllTodo()
    }, [todoResponse])

    return (
        <div className="todo_list-container">
            <h1 className="todo_title">What’s On Your List?</h1>
            {
                todos?.length > 0 ?
                    todos.map((todo, key) => (
                        <Accordion key={key}>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <div className='todo_box' >
                                        <div>
                                            {
                                                todo.todo.length > 30 ? `${todo.todo.slice(0, 30)}...` : todo.todo
                                            }
                                            {todo.status === "Pending" ?
                                                <i className="uil uil-clock text-primary status_icon"></i>
                                                : <i className="uil uil-check-circle text-success status_icon"></i>}
                                        </div>
                                        {
                                            <Button variant="contained" color={todo.status === "Pending" ? 'success' : 'secondary'} onClick={() => toggleTodoStatus(todo._id)}>
                                                {todo.status === "Pending" ? 'Completed' : 'Not Completed'}
                                            </Button>
                                        }
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className='todo_info'>
                                        <h3 className="todo_task"><span>Task : {todo.todo}</span></h3>
                                        <span className='todo_date'><span>Initiated On :</span> {todo.initiateDate}</span>
                                        <div className="todo_actions">
                                            <Edit todo={todo} />
                                            <Button className='border-danger text-danger' variant="outlined" startIcon={<MdDelete />} onClick={() => handleDlete(todo._id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))
                    :

                    <span className="no_task-alert">No tasks to do</span>
            }
        </div>
    )
}

export default TodoView