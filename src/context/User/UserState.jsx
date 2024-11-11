import { useReducer } from "react";
import { UserReducer } from "./UserReducer";
import axios from 'axios';
import { UserContext } from "./UserContext";
import { ADD_USER, MODIFY_USER } from "../types";

/**
 * Este archivo representa la definicion del estado, aqui estara toda la informacion que se va a compartir
 * 
 */
export const UserState = (props) => {
    // Definimos el estado inicial
    const initialState = {
        users: [],
        selectedUser: null,
        alert: null
    }

    // Definimos un useReducer para manejar el estado de la aplicacion
    const [state, dispatch] = useReducer(UserReducer, initialState);

    const getUsers = async () => {
        const response = await axios.get('https://reqres.in/api/users');
        console.log(response.data.data);
        dispatch({
            type: 'GET_USERS',
            payload: response.data.data
        })
    }

    const getProfile = async (id) => {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        console.log(response.data.data);
        dispatch({
            type: 'GET_PROFILE',
            payload: response.data.data
        })
    }

    const addUser = async (user) => {
        const response = await axios.post('https://reqres.in/api/users', user);
        console.log(response.data);
        dispatch({
            type: 'ADD_USER',
            payload: response.data
        })
        return response.data;
    }

    const modifyUser = async (user) => {
        const response = await axios.put(`https://reqres.in/api/users/${user.id}`, user);
        console.log(response.data);
        dispatch({
            type: 'MODIFY_USER',
            payload: response.data
        })
        return response.data;
    }

    const deleteUser = async (id) => {
        const response = await axios.delete(`https://reqres.in/api/users/${id}`);
        console.log(response);
        dispatch({
            type: 'DELETE_USER',
            payload: response
        })
    }

    const cleanSelectedUser = () => {
        dispatch({
            type: 'GET_PROFILE',
            payload: null
        })
    }


  return (
    /** Todos los componentes de UsersContext van a poder acceder al state */
    <UserContext.Provider value={{
        users: state.users,
        selectedUser: state.selectedUser,
        alert: state.alert,
        getUsers,
        getProfile,
        addUser,
        modifyUser,
        deleteUser,
        cleanSelectedUser
        }}>
        {props.children}
    </UserContext.Provider>
  )
}
