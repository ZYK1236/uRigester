<template>
  <div>
    <a-alert :message="'离验证结束还有' + countDown + '秒'" banner id="alert" v-if="show" />
    <div id="form">
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
        <a-form-model-item label="组织" prop="party">
          <a-select v-model="ruleForm.party">
            <a-select-option v-for="(item,index) in party" :key="index" :value="item">{{item}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item has-feedback label="部门名称" prop="branch">
          <a-input placeholder="例:外联部" v-model.number="ruleForm.branch" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="账号" prop="name">
          <a-input placeholder="自定义账号" v-model.number="ruleForm.name" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="密码" prop="pass">
          <a-input
            placeholder="字母+数字且不少于8位"
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback label="确认密码" prop="checkPass">
          <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 21, offset: 3 }">
          <a-button @click="resetForm('ruleForm')">重置</a-button>
          <a-button
            style="float:right"
            type="primary"
            @click="submitForm('ruleForm')"
            :loading="loading"
          >提交</a-button>
        </a-form-model-item>
      </a-form-model>
      <ValiDate v-if="show" />
    </div>
  </div>
</template>
<script>
import Api from "../../api/api";
import ValiDate from "@/components/Validate/validate";

export default {
  data() {
    let checkPending;
    let checkName = (rule, value, callback) => {
      clearTimeout(checkPending);
      if (!value) {
        return callback(new Error("此处不能空白"));
      }
      callback();
    };
    let validatePass = (rule, value, callback) => {
      const reg = /(\d\D)|(\D\d)/;
      if (this.ruleForm.pass === "") {
        callback(new Error("请输入密码"));
      } else if (
        reg.test(this.ruleForm.pass) === false ||
        this.ruleForm.pass.length < 8
      ) {
        callback(new Error("请输入正确形式的密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      countDown: 10,
      show: false,
      loading: false,
      result: "#", //转态存储
      party: ["青志协会", "校科协", "学生会", "团委"],
      ruleForm: {
        party: "",
        pass: "",
        checkPass: "",
        name: "",
        branch: ""
      },
      rules: {
        party: [
          {
            required: true,
            message: "请选择组织!",
            trigger: "change"
          }
        ],
        pass: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
        name: [{ validator: checkName, trigger: "change" }],
        branch: [{ validator: checkName, trigger: "change" }]
      },
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      }
    };
  },
  components: {
    ValiDate
  },
  methods: {
    async submitForm(formName) {
      //倒计时定时器
      let timer = setInterval(() => {
        this.countDown--;
      }, 1000);

      //如果还没验证,已经验证的可以跳过这段判断
      if (!this.$store.state.validate.validate) {
        this.show = true;
        this.loading = true;
        //把验证的结果用this.result存起来
        this.result = await this.validate();
        console.log(this.result);
      }

      if (this.result === "success" || this.$store.state.validate.validate) {
        this.show = false;
        clearInterval(timer);
        this.$refs[formName].validate(async valid => {
          if (valid) {
            console.log(this.ruleForm);
            const data = {
              organizationName: this.ruleForm.party,
              departmentName: this.ruleForm.party + this.ruleForm.branch,
              departmentAccount: this.ruleForm.name,
              departmentPwd: this.ruleForm.pass
            };
            try {
              let result = await Api.Register(data);
              if (result.code === 1) {
                this.$notification.open({
                  message: "消息提示",
                  description: "注册成功,正在跳转页面...",
                  icon: <a-icon type="smile" style="color: #108ee9" />,
                  duration: 0.8
                });
                setTimeout(() => {
                  this.$router.push({ name: "Login" });
                }, 800);
              } else {
                this.loading = false;
                /**这里是注册账号重复的 */
              }
            } catch (error) {
              this.loading = false;
              console.log(`☹ error is ☞ ${error} `);
            }
          } else {
            this.loading = false;
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        clearInterval(timer);
        this.show = false;
        this.loading = false;
        this.$message.error("验证失败");
        this.countDown = 10;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    validate() {
      return new Promise((resolve, reject) => {
        let timer = setInterval(() => {
          if (this.$store.state.validate.validate) {
            clearInterval(timer);
            resolve("success");
          }
        }, 500);
        setTimeout(() => {
          resolve("error");
        }, 10000);
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
#alert
  width: 40%
  margin: 0 auto
  z-index: 10
#form
  position: fixed
  width: 30%
  padding: 20px 50px
  top: 200px
  right: 0
  left: 0
  margin: 0 auto
  background-color: rgba(255, 255, 255, 0.7)
  border-radius: 10px
@media (max-width: 350px)
    #form
        width: 250px
        height: 560px
        top: 30px
</style>