import service from "../utlis/service";

/**
 * @description接口
 */
const Api = {
  Login(data) {
    return service({
      method: "post",
      url: "/department/login",
      data,
    });
  },
  Register(data) {
    return service({
      method: "post",
      url: "/department/register",
      data,
    });
  },
  addInterviewMsg(data) {
    return service({
      method: "post",
      url: "/department/detail",
      data,
    });
  },
  addInterviewEr(data) {
    return service({
      method: "post",
      url: "/department/interviewer",
      data,
    });
  },
  getInterviewEr(departmentId) {
    console.log(departmentId);

    return service({
      method: "get",
      url: "/department/interviewer",
      params: {
        departmentId,
      },
    });
  },

  getInterviewMsg(departmentId) {
    return service({
      method: "get",
      url: "/department/detail",
      params: {
        departmentId,
      },
    });
  },

  getUnfirstMsg(data) {
    return service({
      method: "get",
      url: "/interview/data/unfirst",
      params: data,
    });
  },
  getFirstedMsg(data) {
    return service({
      method: "get",
      url: "/interview/data/firsted",
      params: data,
    });
  },
  addSecondMsg(data) {
    return service({
      method: "post",
      url: "/interview/status/first/pass",
      data,
    });
  },
  getUnSecondMsg(data) {
    return service({
      method: "get",
      url: "/interview/data/unretest",
      params: data,
    });
  },
  getSecondedMsg(data) {
    return service({
      method: "get",
      url: "/interview/data/retested",
      params: data,
    });
  },
  getLowerMsg(data) {
    return service({
      method: "get",
      url: "/interview/data/eliminationList",
      params: data,
    });
  },
  getMemberMsg(data) {
    return service({
      method: "get",
      url: "/department/members",
      params: data
    })
  }
};

export default Api;