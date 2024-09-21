import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";
import { CreateToDo, UpdateTodo } from '../Models/Todo';

const api = "http://Localhost:5257/api/todo/"

export const DeleteToDoAPI = async (id: number) => {
    try {
        const data = await axios.delete<UserProfileToken>(api + `delete/${id}`)
        return data;
    } catch (error) {
        handleError(error)
    }
}
export const UpdateToDoAPI = async (id: number, updatedToDo: UpdateTodo) => {
    try {
        const data = await axios.put(api + `${id}`)
        return data;
    } catch (error) {
        handleError(error)
    }
}
export const CreateToDoAPI = async (todo: CreateToDo) => {
    try {
        const data = await axios.post(api)
        return data;
    } catch (error) {
        handleError(error)
    }
}
export const GetUsersToDos = async (userID: string) => {
    try {
        const data = await axios.get(api + `user/${userID}`)
        return data;
    } catch (error) {
        handleError(error)
    }
}


