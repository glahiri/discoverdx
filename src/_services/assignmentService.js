import axios from "axios";
import { endpoints } from "./endpoints";
import {actionTypes} from '../_actions/actionTypes';


export const getAssignments = (endpoint,username,password,dispatch) => {
    const encodedUser = btoa(username + ":" + password);

    return axios
        .get(endpoint + endpoints.ASSIGNMENTS, {
            headers: { Authorization: "Basic " + encodedUser }
        })
        .then(function(response) {
            return (
                dispatch(
                    {
                        type: actionTypes.ASSIGNMENTS_GET_SUCCESS,
                        payload: {
                            assignments: response.data
                        }
                    }
                )
            );
        })
        .catch(function(error) {
            return (dispatch({
                type: actionTypes.ASSIGNMENTS_GET_FAIL,
                payload: {}
            }));
        });
};

export const getByID = (endpoint,username,password,ID,dispatch) => {
    const encodedUser = btoa(username + ":" + password);

    return axios
        .get(endpoint + endpoints.ASSIGNMENTS + '/' + ID, {
            headers: { Authorization: "Basic " + encodedUser }
        })
        .then(function(response) {
            return (
                dispatch(
                    {
                        type: actionTypes.ASSIGNMENTS_GETBYID_SUCCESS,
                        payload: {
                            ID: ID,
                            assignment: response.data
                        }
                    }
                )
            );
        })
        .catch(function(error) {
            return (dispatch({
                type: actionTypes.ASSIGNMENTS_GETBYID_FAIL,
                payload: {}
            }));
        });
};

export const removeAction = (dispatch) => {
    return (
        dispatch (
            {
                type: actionTypes.ASSIGNMENTS_RESET,
                payload: {}
            }
        )
    );
};

export const getActionByID = (endpoint,username,password,ID,actionID,dispatch) => {
    const encodedUser = btoa(username + ":" + password);

    return axios
        .get(endpoint + endpoints.ASSIGNMENTS + '/' + ID + '/actions/' + actionID, {
            headers: { Authorization: "Basic " + encodedUser }
        })
        .then(function(response) {
            return (
                dispatch(
                    {
                        type: actionTypes.ASSIGNMENTS_GETACTION_BYID_SUCCESS,
                        payload: {
                            view: response.data
                        }
                    }
                )
            );
        })
        .catch(function(error) {
            return (dispatch({
                type: actionTypes.ASSIGNMENTS_GETBYID_FAIL,
                payload: {}
            }));
        });
};

export const postAssignment = (endpoint,username,password,ID,actionID,content,dispatch) => {
    const encodedUser = btoa(username + ":" + password);

    return axios
        .post(endpoint + endpoints.ASSIGNMENTS + '/' + ID + '?actionID=' + actionID, content, {
            headers: { Authorization: "Basic " + encodedUser }
        })
        .then(function(response) {
            return (
                dispatch(
                    {
                        type: actionTypes.ASSIGNMENTS_POST_BYID_SUCCESS,
                        payload: {}
                    }
                )
            );
        })
        .catch(function(error) {
            return (dispatch({
                type: actionTypes.ASSIGNMENTS_POST_BYID_FAIL,
                payload: {
                    actionErrors: {
                        errors: error.response.data
                    }
                }
            }));
        });
};

export const updateAssignment = (endpoint,username,password,ID,actionID,content,dispatch) => {
    const encodedUser = btoa(username + ":" + password);

    return axios
        .put(endpoint + endpoints.ASSIGNMENTS + '/' + ID + '/actions/' + actionID + '/refresh', content, {
            headers: { Authorization: "Basic " + encodedUser }
        })
        .then(function(response) {
            return (
                dispatch(
                    {
                        type: actionTypes.ASSIGNMENTS_PUT_BYID_SUCCESS,
                        payload: {
                            view: response.data
                        }
                    }
                )
            );
        })
        .catch(function(error) {
            return (dispatch({
                type: actionTypes.ASSIGNMENTS_PUT_BYID_FAIL,
                payload: {}
            }));
        });
};

export const removeAssignment = (dispatch) => {
    return (
        dispatch(
            {
                type: actionTypes.ASSIGNMENTS_GETBYID_FAIL,
                payload: {}
            }
        )
    );
}

export const resetActionStatus = (dispatch) => {
    return (
        dispatch({
            type: actionTypes.ASSIGNMENTS_RESET_ACTIONSTATUS,
            payload: {}
        })
    );
}
