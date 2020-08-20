const state = {
  param4: "",
  param5: "",
  unSecond: [],
  low: []
};

const mutations = {
  setParam(state, payload) {
    state.param4 = payload.param4;
    state.param5 = payload.param5
  },
  setUnSecond(state,payload) {
    state.unSecond.push(...payload.unSecond)
  },
  setLow(state,payload) {
    state.low.push(...payload.low)
  }
};

export default { state, mutations };
