import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./server_url";

// add todo api
export const addTodoAPI = async (reqBody) => {
    return await commonAPI("POST",`${SERVER_URL}/add-todo`,reqBody,"")
}

// get all todo api
export const getAllTodoAPI = async () => {
    return await commonAPI("GET",`${SERVER_URL}/all-todo`,"","")
}

// delete todo api
export const deleteTodoAPI = async (id) => {
    return await commonAPI("DELETE",`${SERVER_URL}/remove-todo/${id}`,{},"")
}

// edit todo api
export const editTodoAPI = async (id, reqBody) => {
    return await commonAPI("PUT",`${SERVER_URL}/edit-todo/${id}`,reqBody,"")
}