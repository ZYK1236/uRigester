import App from './App'
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './style/global.styl'
import store from './store/store';
import { Form, FormModel, Input, Button, Select, message, Icon, Checkbox, Alert, Layout, Menu, Switch, Breadcrumb, Radio, Divider ,notification,Table} from 'ant-design-vue';



Vue.config.productionTip = false;
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;

Vue.use(Form);
Vue.use(Input);
Vue.use(Button);
Vue.use(FormModel);
Vue.use(Select);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(Alert);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Switch);
Vue.use(Breadcrumb);
Vue.use(Radio);
Vue.use(Divider);
Vue.use(Table);



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')


router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
})

router.afterEach(() => {
  NProgress.done()
})