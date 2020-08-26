import types from '../types';

const state = {
    login: false,
    token: '',
    departmentID: 0,
    organizationID: 0,
    organizationName: ''
}

const mutations = {
    [types.ALLOW_LOGIN](state) {
        state.login = true
    },
    [types.LOG_OUT](state) {
        state.login = false
    },
    [types.SET_TOKEN](state,payload) {
        state.token = payload.token
    },
    [types.SET_DEPARTMENT](state,payload) {
        state.departmentID = payload.departmentID
    },
    [types.SET_ORGANIZATIONID](state,payload) {
        state.organizationID = payload.organizationID
    },
    [types.SET_ORGANIZATIONNAME](state,payload) {
        state.organizationName = payload.organizationName
    }
}

export default {
    state,
    mutations
}