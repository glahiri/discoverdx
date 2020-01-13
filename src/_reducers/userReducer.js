import {actionTypes} from '../_actions/actionTypes';

const credentials = {
    endpoint: '',
    username: '',
    password: ''
};

const initialState = {
    isLoggedIn: 0,
    credentials: credentials,
    caseTypes: {
        isVisible: false,
        apiData: {}
    },
    createdCase: {
        isVisible: false,
        apiData: {}
    },
    cases: {
        isVisible: false,
        apiData: {}
    },
    selectedCase: {
        isVisible: false,
        apiData: {}
    },
    assignments: {
        isVisible: false,
        apiData: {}
    },
    selectedAction: {
        isVisible: false,
        apiData: {},
        actionErrors: {}
    },
    selectedView: {
        isVisible: false,
        apiData: {}
    },
    actionStatus: ''
};

export const userReducer = (state=initialState,action) => {
    console.log(action);
    switch(action.type){
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: 1,
                caseTypes: {
                    isVisible: true,
                    apiData: action.payload.caseTypes
                },
                credentials: action.payload.credentials
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: 2,
                credentials: credentials
            }
        case actionTypes.CASES_GET_SUCCESS:
            return {
                ...state,
                cases: {
                    isVisible: true,
                    apiData: action.payload.cases
                }
            }
        case actionTypes.CASES_GET_BYID_SUCCESS:
            return {
                ...state,
                selectedCase: {
                    isVisible: true,
                    apiData: action.payload.selectedCase
                }
            }
        case actionTypes.CASES_GET_BYID_FAIL:
            return {
                ...state,
                selectedCase: {
                    isVisible: false,
                    apiData: {}
                }
            }
        case actionTypes.CASES_POST_SUCCESS:
            return {
                ...state,
                createdCase: {
                    isVisible: true,
                    apiData: action.payload.case
                }
            }
        case actionTypes.CASES_POST_FAIL:
            return {
                ...state,
                createdCase: {
                    isVisible: false,
                    apiData: {}
                }
            }
        case actionTypes.ASSIGNMENTS_GET_SUCCESS:
            return {
                ...state,
                assignments: {
                    isVisible: true,
                    apiData: action.payload.assignments
                }
            }
        case actionTypes.ASSIGNMENTS_GETBYID_SUCCESS:
            return {
                ...state,
                selectedAction: {
                    isVisible: true,
                    apiData: action.payload.assignment
                }
            }
        case actionTypes.ASSIGNMENTS_GETBYID_FAIL:
            return {
                ...state,
                selectedAction: {
                    isVisible: false,
                    apiData: {}
                }
            }
        case actionTypes.ASSIGNMENTS_RESET:
            return {
                ...state,
                selectedAction: {
                    isVisible:false,
                    apiData: {}
                },
                selectedView: {
                    isVisible: false,
                    apiData: {}
                }
            }
        case actionTypes.ASSIGNMENTS_GETACTION_BYID_SUCCESS: 
            return {
                ...state,
                selectedView: {
                    isVisible: true,
                    apiData: action.payload.view
                },
                actionStatus: ''
            }
        case actionTypes.ASSIGNMENTS_RESET_ACTIONSTATUS:
            return {
                ...state,
                actionStatus: ''
            }
        case actionTypes.ASSIGNMENTS_PUT_BYID_SUCCESS: 
            return {
                ...state,
                selectedView: {
                    isVisible: true,
                    apiData: action.payload.view
                }
            }
        case actionTypes.ASSIGNMENTS_POST_BYID_SUCCESS:
            return {
                ...state,
                actionStatus: 'success'
            }
        case actionTypes.ASSIGNMENTS_POST_BYID_FAIL:
            return {
                ...state,
                actionStatus: 'fail',
                selectedAction: {
                    ...state.selectedAction,
                    actionErrors: action.payload.actionErrors
                }
            }
        default:
            return state;
    }
}
