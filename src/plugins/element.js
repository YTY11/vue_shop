import Vue from 'vue'
import { Form, FormItem, Input, Button, Message, Loading, Container, Aside, Header, Main } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
