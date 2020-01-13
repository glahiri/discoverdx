import axios from "axios";
import { endpoints } from "./endpoints";
import {actionTypes} from '../_actions/actionTypes';
import {getCases} from './caseService';


export const userLogin = (endpoint,username,password,dispatch) => {
    const encodedUser = btoa(username + ":" + password);

    return axios
        .get(endpoint + endpoints.CASETYPES, {
            headers: { Authorization: "Basic " + encodedUser }
        })
        .then(function(response) {
            return (
                dispatch(
                    {
                        type: actionTypes.USER_LOGIN_SUCCESS,
                        payload: {
                            caseTypes: response.data,
                            credentials: {
                                endpoint,
                                username,
                                password
                            }
                        }
                    }
                ),
                getCases(endpoint,username,password,dispatch)
            );
        })
        .catch(function(error) {
            return (dispatch({
                type: actionTypes.USER_LOGIN_FAIL,
                payload: {}
            }));
        });
};
