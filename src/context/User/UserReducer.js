import { GET_USERS, GET_PROFILE, ADD_USER, MODIFY_USER, DELETE_USER } from "../types";

export const UserReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        selectedUser: payload,
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, payload],
        alert: payload,
      };
    case MODIFY_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === payload.id ? payload : user
        ),
        alert: payload,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== payload.id),
        alert: payload,
      };
    default:
      return state;
  }
};