import { GET_DETAILS, DELETE_DETAILS } from "./types";
import httpClient from "../../components/util/httpClient";
import notify from "../../components/util/notify";
import { SET_DELETING_ITEM } from "../products/type";

export const fetchDetails_ac = (params) => (dispatch) => {
//   console.log("Actions in fecth details", params);
  httpClient
    .GET("/details", false)
    .then((response) => {
    //   console.log("delay at actions to reducer");
      dispatch({
        type: GET_DETAILS,
        payload: response.data,
      });
    })
    .catch((err) => {
      notify.handleError(err);
    });
};

export const removeDetails_ac = (item) => dispatch => {
 
    httpClient.DELETE(`/details/${item._id}`,false)
        .then((response) => {
          notify.showInfo('Detail Removed');
            dispatch({
                type: DELETE_DETAILS,
                payload: item
            })

        })
        .catch((err) => {
            notify.handleError(err);
        })
}