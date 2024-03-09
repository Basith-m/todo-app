import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import './todoInput.css'
import { addTodoAPI, editTodoAPI } from '../../services/allAPI';
import { useDispatch } from 'react-redux';
import { todoChangeResponse } from '../../redux/todoSliece/todoSlice';

const TodoInput = ({ setShow, editTodo }) => {

    const [todo, setTodo] = useState({
        initiateDate: "", todo: "", status: "Pending"
    })

    const dispatch = useDispatch()

    const handleClose = () => {
        setShow(0)
    }

    const handleChange = (e) => {
        const date = new Date();
        let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        let currentDate = date.toLocaleDateString('en-US', options);
        setTodo({
            initiateDate: currentDate,
            todo: e.target.value
        })
    }

    useEffect(() => {
        if (editTodo) {
            setTodo(editTodo)
        }
    }, [editTodo])

    const handleTodoSave = async (e) => {
        e.preventDefault()
        if (!todo.todo) {
            alert("Please write your todo...")
        } else {
            if (editTodo) {
                const result = await editTodoAPI(editTodo._id, todo)
                if (result.status === 200) {
                    handleClose()
                    dispatch(todoChangeResponse(result.data))
                } else {
                    console.log(result.response.data);
                }
            }
            else {
                const result = await addTodoAPI(todo)
                if (result.status === 200) {
                    dispatch(todoChangeResponse(result.data))
                    handleClose()
                } else {
                    console.log(result);
                    alert(result.response.data)
                }
            }
        }
    }

    return (
        <div className="todo_input-container">
            <div className="todo_input-content">
                <form onSubmit={handleTodoSave}>
                    {/* <input type="email" class="form-control todo_input-area" value={currentDate}/> */}
                    <textarea class="form-control todo_input-area" rows="10" placeholder='Write your todo here...' value={todo.todo} onChange={(e) => handleChange(e)}></textarea>
                    <Button variant="dark" className='save_btn' type='submit'>Save</Button>
                </form>
                <i className="uil uil-times cross_icon" onClick={handleClose}></i>
            </div>
        </div>
    )
}

export default TodoInput