import types from '../types'

const state = {
    validate: false
}

const mutations = {
    [types.VALIDATE]() {
        state.validate = true
    },
    [types.UNVALIDATE]() {
        state.validate = false
    }
}

export default { state, mutations }