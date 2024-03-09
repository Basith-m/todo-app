import React, { useState } from 'react'
import { LuClipboardEdit } from "react-icons/lu";
import { IconButton } from '@mui/material'
import TodoView from '../../components/todoView/TodoView';
import './home.css'
import TodoInput from '../../components/todoInput/TodoInput';

const Home = () => {

    const [show, setShow] = useState(0)

    return (
        <section className="home section">
            <div className="home_container container">
                <TodoView />
                <div className="new_todo-btn flex" onClick={() => setShow(1)}>
                    <IconButton size="large" className='todo_icon-div'>
                        <LuClipboardEdit className='todo_icon' />
                    </IconButton>
                    <span>New todo</span>
                </div>
                {
                    show ? <TodoInput setShow={setShow} /> : null
                }
            </div>
        </section>
    )
}

export default Home