export const ItemReducer = (state, action) => {
    const { payload, type } = action;
    
    switch (type) {
        case "GET_ITEMS":
        return {
            ...state,
            items: payload,
        };
        case "GET_ITEM":
        return {
            ...state,
            selectedItem: payload,
        };
        default:
        return state;
    }
    }