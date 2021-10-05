import Vue from 'vue'
import { Form, FormItem, Input, Button, Message, Loading, Container, Aside, Header, Main, Scrollbar, Menu, Submenu, MenuItemGroup, MenuItem, Tooltip, Dropdown, DropdownMenu, DropdownItem, Breadcrumb, BreadcrumbItem } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Scrollbar)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Tooltip)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
