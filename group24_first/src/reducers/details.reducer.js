import { GET_DETAILS, DELETE_DETAILS } from "../actions/details/types";

const initialState = {
  details: "",
};

export const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case DELETE_DETAILS:
      return{
        ...state,
          details : state.details.splice(action.payload, 1),
      }
        // return {
        //   ...state,
        //   details: state.details.splice(action.payload, 1),
        // };


    default:
      return {
        ...state,
      };
  }
};
