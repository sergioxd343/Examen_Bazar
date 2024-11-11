import { useReducer } from "react";
import { ItemReducer } from "./ItemReducer";
import axios from "axios";
import { ItemContext } from "./ItemContext";

export const ItemState = (props) => {
    // Definimos el estado inicial
    const initialState = {
        items: [],
        selectedItem: null
    }

    // Definimos un useReducer para manejar el estado de la aplicacion
    const [state, dispatch] = useReducer(ItemReducer, initialState);

    const getItems = async (search) => {
        console.log("search", search);
        const response = await axios.get(`https://examenbazar-1.onrender.com/api/items?q=${search}`);
        console.log(response.data);
        dispatch({
            type: 'GET_ITEMS',
            payload: response.data
        })
    }

    const getItem = async (id) => {
        console.log("id", id);
        const response = await axios.get(`https://examenbazar-1.onrender.com/api/items/${id}`);
        console.log(response.data);
        dispatch({
            type: 'GET_ITEM',
            payload: response.data
        })
    }


  return (
    /** Todos los componentes de UsersContext van a poder acceder al state */
    <ItemContext.Provider value={{
        items: state.items,
        selectedItem: state.selectedItem,
        getItems,
        getItem
        }}>
        {props.children}
    </ItemContext.Provider>
  )
}