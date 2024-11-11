export const PurchaseReducer = (state, action) => {
    const { payload, type } = action;
    
    switch (type) {
        case "ADD_SALE":
        return {
            ...state,
            success: payload,
        };
        case "GET_SALES":
        return {
            ...state,
            sales: payload,
        };
        default:
        return state;
    }
    }