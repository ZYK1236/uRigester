import Api from "../../api/api";

const Methods = {
  /**
   * @description登录请求
   * @param {object} values是一个对象即values.userName和values.password
   * 通过vuex更改登录状态
   */
  async handleSubmit(e) {
    e.preventDefault();
    this.form.validateFields(async (err, values) => {
      const data = {
        departmentAccount: values.userName,
        departmentPwd: values.password,
      };
      if (!err) {
        try {
          this.status = "validating";
          let result = await Api.Login(data);

          if (result.code === 2000) {
            this.$store.commit({
              type: "SET_NAME",
              name: result.data.t.departmentName,
            });
            this.$store.commit({
              type: "SET_TOKEN",
              token: result.data.token,
            });
            this.$store.commit({
              type: "ALLOW_LOGIN",
            });
            this.$store.commit({
              type: "SET_DEPARTMENT",
              departmentID: result.data.t.departmentId,
            });
            this.$store.commit({
              type: "SET_ORGANIZATIONID",
              organizationID: result.data.t.organizationId,
            });
            try {
              this.$store.commit({
                type: "SET_ORGANIZATIONNAME",
                organizationName: result.data.t.organizationName,
              });
            } catch (error) {
              console.log(error);
            }
            this.$store.commit({
              type: "SET_DEPARTMENTNAME",
              departmentName: result.data.t.departmentName,
            });
            let data_2 = await Api.getInterviewMsg(
              this.$store.state.login.departmentID
            );
            const turns = data_2.data.interviewRounds + "";
            this.$store.commit({
              type: "SET_TURNS",
              turns,
            });
            this.status = "success";
            setTimeout(() => {
              this.$router.push({ name: "Home" });
            }, 500);
          } else {
            this.status = "error";
          }
        } catch (error) {
          console.log(`☹ error is ☞ ${error} `);
          this.status = "error";
        }
      } else {
        this.status = "error";
      }
    });
  },

  /**
   * @description如果已经登录可以直接进入
   */
  stepIn() {
    if (this.$store.state.login.login === true) {
      this.$router.push({ name: "Home" });
    } else {
      this.$notification.open({
        message: "消息提示",
        description: "当前不在已登陆状态",
        icon: <a-icon type="frown" style="color: red" />,
        duration: 2,
      });
    }
  },
};

export default Methods;
