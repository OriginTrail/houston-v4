import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import { DataTables, DataTablesServer } from 'vue-data-tables';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';
import * as profileAbi from './abi/profile.json';
import * as erc725Abi from './abi/erc725.json';
import * as tokenAbi from './abi/token.json';
import * as profileStorageAbi from './abi/profile-storage.json';
import * as keccakAbi from './abi/testingutils.json';
import * as hubAbi from './abi/hub.json';
import App from './App.vue';
import Utilities from './Utilities';

window.EventBus = new Vue();

window.Utilities = Utilities;

window.Eth = require('ethjs');

window.EventBus = new Vue();


Vue.use(ElementUI, { locale });


Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://127.0.0.1:3000',
}));

Vue.config.productionTip = false;

Vue.use(DataTables);
Vue.use(DataTablesServer);


new Vue({
  render: h => h(App),
}).$mount('#app');


/* eslint-disable no-new */
