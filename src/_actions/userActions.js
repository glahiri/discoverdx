import {userLogin} from '../_services/userService';
import { getByID, removeAction, getActionByID, postAssignment, updateAssignment, removeAssignment, resetActionStatus } from '../_services/assignmentService';
import { getCaseByID, removeCase, createCase, removeCreatedCase } from '../_services/caseService';

export const login = (credentials,dispatch) => {
    userLogin(
        credentials.endpoint,
        credentials.username,
        credentials.password,
        dispatch
    );
}

export const getAssignmentByID = (credentials, id, dispatch) => {
    getByID(
        credentials.endpoint,
        credentials.username,
        credentials.password,
        id,
        dispatch
    );
}

export const resetAction = (dispatch) => {
    removeAction(dispatch);
}

export const getAction = (credentials, id, actionId, dispatch) => {
    getActionByID(
        credentials.endpoint,
        credentials.username,
        credentials.password,
        id, 
        actionId, 
        dispatch
    );
}

export const postAction = (credentials, id, actionId, content, dispatch) => {
    postAssignment(
        credentials.endpoint,
        credentials.username,
        credentials.password,
        id, 
        actionId,
        content, 
        dispatch
    );
}

export const updateAction = (credentials, id, actionId, content, dispatch) => {
    updateAssignment(
        credentials.endpoint,
        credentials.username,
        credentials.password,
        id, 
        actionId,
        content, 
        dispatch
    );
}

export const getCase = (credentials, id, dispatch) => {
    getCaseByID(
        credentials.endpoint,
        credentials.username,
        credentials.password,
        id, 
        dispatch
    );
}

export const resetAssignment = (dispatch) => {
    removeAssignment(dispatch);
}

export const resetCase = (dispatch) => {
    removeCase(dispatch);
}

export const addCase = (credentials,caseType,parentCaseID,content,dispatch) => {
    createCase(
        credentials.endpoint,
        credentials.username,
        credentials.password,
        caseType.caseTypeID,
        caseType.startingProcess,
        parentCaseID,
        content,
        dispatch
    );
}

export const resetCreatedCase = (dispatch) => {
    removeCreatedCase(dispatch);
}

export const resetActionMessage = (dispatch) => {
    resetActionStatus(dispatch);
}