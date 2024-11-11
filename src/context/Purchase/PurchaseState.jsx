import { useReducer } from "react";
import { PurchaseReducer } from "./PurchaseReducer";
import axios from "axios";
import { PurchaseContext } from "./PurchaseContext";

export const PurchaseState = (props) => {
    // Definimos el estado inicial
    const initialState = {
        sales: [],
        success: null
    }

    // Definimos un useReducer para manejar el estado de la aplicacion
    const [state, dispatch] = useReducer(PurchaseReducer, initialState);

    const addSale = async (item) => {
        const sale = {
            product_id: item.id,
            total: item.price,
        }
        const response = await axios.post('https://examenbazar-1.onrender.com/api/addSale', sale);
        console.log(response.data.success);
        dispatch({
            type: 'ADD_SALE',
            payload: response.data.success
        })
        console.log(state.success);
    }

    const getSales = async () => {
        const response = await axios.get(`https://examenbazar-1.onrender.com/api/sales`);
        console.log(response.data);
        dispatch({
            type: 'GET_SALES',
            payload: response.data
        })
    }


  return (
    /** Todos los componentes de UsersContext van a poder acceder al state */
    <PurchaseContext.Provider value={{
        sales: state.sales,
        success: state.success,
        getSales,
        addSale
        }}>
        {props.children}
    </PurchaseContext.Provider>
  )
}