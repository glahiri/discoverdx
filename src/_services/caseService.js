import axios from "axios";
import { endpoints } from "./endpoints";
import {actionTypes} from '../_actions/actionTypes';
import {getAssignments} from './assignmentService';


export const getCases = (endpoint,username,password,dispatch) => {
    const encodedUser = btoa(username + ":" + password);

    return axios
        .get(endpoint + endpoints.CASES, {
            headers: { Authorization: "Basic " + encodedUser }
        })
        .then(function(response) {
            return (
                dispatch(
                    {
                        type: actionTypes.CASES_GET_SUCCESS,
                        payload: {
                            cases: response.data
                        }
                    }
                ),
                getAssignments(endpoint,username,password,dispatch)
            );
        })
        .catch(function(error) {
            return (dispatch({
                type: actionTypes.CASES_GET_FAIL,
                payload: {}
            }));
        });
};

export const getCaseByID = (endpoint,username,password,id,dispatch) => {
    const encodedUser = btoa(username + ":" + password);

    return axios
        .get(endpoint + endpoints.CASES + '/' + id, {
            headers: { Authorization: "Basic " + encodedUser }
        })
        .then(function(response) {
            return (
                dispatch(
                    {
                        type: actionTypes.CASES_GET_BYID_SUCCESS,
                        payload: {
                            selectedCase: response.data
                        }
                    }
                )
            );
        })
        .catch(function(error) {
            return (dispatch({
                type: actionTypes.CASES_GET_BYID_FAIL,
                payload: {}
            }));
        });
};

export const removeCase = (dispatch) => {
    return (
        dispatch(
            {
                type: actionTypes.CASES_GET_BYID_FAIL,
                payload: {}
            }
        )
    );
}

export const removeCreatedCase = (dispatch) => {
    return (
        dispatch(
            {
                type: actionTypes.CASES_POST_FAIL,
                payload: {}
            }
        )
    );
}

export const createCase = (endpoint,username,password,caseTypeID,startingProcess,parentCaseID,content,dispatch) => {
    const encodedUser = btoa(username + ":" + password);
    const requestBody = {
        caseTypeID,
        startingProcess,
        parentCaseID,
        content
    };
    return axios
        .post(endpoint + endpoints.CASES, requestBody, {
            headers: { Authorization: "Basic " + encodedUser }
        })
        .then(function(response) {
            getCases(endpoint,username,password,dispatch);
            return (
                dispatch(
                    {
                        type: actionTypes.CASES_POST_SUCCESS,
                        payload: {
                            case: response.data
                        }
                    }
                )
            );
        })
        .catch(function(error) {
            return (
                dispatch(
                    {
                        type: actionTypes.CASES_POST_FAIL,
                        payload: {}
                    }
                )
            );
        });
};