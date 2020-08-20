import types from '../types';

const state = {
    name: ''
}

const mutations= {
    [types.SET_NAME](state,payload) {
        state.name = payload.name
    }
}

export default {state,mutations}