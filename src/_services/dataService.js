import axios from "axios";
import { endpoints } from "./endpoints";
import {actionTypes} from '../_actions/actionTypes';

export const getDataPageById = (endpoint,username,password,id,metadata,dispatch) => {
    const encodedUser = btoa(username + ":" + password);

    return axios
        .get(endpoint + endpoints.DATA + '/' + id, {
            headers: { Authorization: "Basic " + encodedUser }
        })
        .then(function(response) {
            return (
                dispatch(
                    {
                        type: actionTypes.DATATYPE_GET_BYID_SUCCESS,
                        payload: {
                            data: response.data,
                            id: id
                        }
                    }
                )
            );
        })
        .catch(function(error) {
            return (dispatch({
                type: actionTypes.DATATYPE_GET_BYID_FAIL,
                payload: {}
            }));
        });

};

export const resetData = (dispatch) => {
    return (dispatch({
        type: actionTypes.DATATYPE_GET_BYID_FAIL,
        payload: {}
    }));
};