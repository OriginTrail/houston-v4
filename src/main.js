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

window.profileAbi = profileAbi.default;
window.erc725Abi = erc725Abi.default;
window.tokenAbi = tokenAbi.default;
window.profileStorageAbi = profileStorageAbi.default;
window.keccakAbi = keccakAbi.default;

window.hubAddress = '0xE92dCa9Fe0F079D582a68ca8C55fb7BDa2558F2c';
window.keccakAddress = '0xfd010324268fec8868c663ce2cde2de8cb7d832a';


Vue.use(ElementUI, { locale });
if (typeof web3 !== 'undefined' && window.screen.width > 770) {
  // eslint-disable-next-line
    window.eth = new window.Eth(web3.currentProvider);
} else if (window.screen.width <= 770) {
  window.eth = new window.Eth(new window.Eth.HttpProvider('https://mainnet.infura.io/v3/f8c3858f892d4199840f5354cc954713'));
} else {
  alert('Please install Metamask');
}
try {
  window.hub = window.eth.contract(hubAbi.default).at(window.hubAddress);
  window.ethereum.enable();
} catch (err) {
  console.log(err);
}

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
