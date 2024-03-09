import { Button } from '@mui/material'
import React, { useState } from 'react'
import { LuFileEdit } from 'react-icons/lu'
import TodoInput from '../todoInput/TodoInput'

const Edit = ({ todo }) => {

    const [show, setShow] = useState(0)

    return (
        <>
            <Button variant="outlined" startIcon={<LuFileEdit />} onClick={() => setShow(1)}>
                Edit
            </Button>

            {
                show ? <TodoInput setShow={setShow} editTodo={todo} /> : null
            }
        </>
    )
}

export default Edit