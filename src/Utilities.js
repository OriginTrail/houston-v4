import * as profileAbi from './abi/profile.json';
import * as erc725Abi from './abi/erc725.json';
import * as tokenAbi from './abi/token.json';
import * as profileStorageAbi from './abi/profile-storage.json';
import * as keccakAbi from './abi/testingutils.json';
import * as hubAbi from './abi/hub.json';

window.profileAbi = profileAbi.default;
window.erc725Abi = erc725Abi.default;
window.tokenAbi = tokenAbi.default;
window.profileStorageAbi = profileStorageAbi.default;
window.keccakAbi = keccakAbi.default;


export default {
  async getTransactionReceipt(hash) {
    let receipt = null;
    while (receipt === null) {
      // eslint-disable-next-line
      receipt = await this.getTransactionReceiptPromise(hash);
      // eslint-disable-next-line
      await this.wait(1000);
    }
    return receipt;
  },

  wait(milliseconds) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  },

  getTransactionReceiptPromise(hash) {
    return new Promise((resolve, reject) => {
      window.eth.getTransactionReceipt(hash)
        .then((data) => {
          resolve(data);
        }).catch((e) => {
          reject(e);
        });
    });
  },

  buildNodeSocketUrl: (credentials) => {
    if (!('inputIp' in credentials) || !('inputPort' in credentials)
        || !('secured' in credentials)) {
      throw Error(`Invalid credentials object. ${JSON.stringify(credentials)}`);
    }

    if (credentials.secured) {
      return `https://${credentials.inputIp}:${credentials.inputPort}`;
    }
    return `http://${credentials.inputIp}:${credentials.inputPort}`;
  },

  buildNodeApiUrl: (credentials, config) => {
    if (!('inputIp' in credentials) || !('inputPort' in credentials)
        || !('secured' in credentials)) {
      throw Error(`Invalid credentials object. ${JSON.stringify(credentials)}`);
    }

    if (!('node_rpc_port' in config)) {
      throw Error('Node RPC port is missing in configuration.');
    }

    if (credentials.secured) {
      return `https://${credentials.inputIp}:${config.node_rpc_port}`;
    }
    return `http://${credentials.inputIp}:${config.node_rpc_port}`;
  },

  connectToMainnet() {
    window.hubAddress = '0xa287d7134fb40bef071c932286bd2cd01efccf30';
    // TODO: Get mainnet Keccak
    window.keccakAddress = '0xfd010324268fec8868c663ce2cde2de8cb7d832a';

    if (typeof web3 !== 'undefined' && window.screen.width > 770) {
      try {
        // eslint-disable-next-line
        window.eth = new window.Eth(web3.currentProvider);
      } catch (e) {
        alert('Something is wrong with your connection, please double-check provided data');
      }
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
      alert('Something is wrong with your connection, please double-check provided data');
    }
  },

  connectToTestnet() {
    window.hubAddress = '0x85720D4D09A52eD66656b28c68567E41AD45dD0e';
    window.keccakAddress = '0xfd010324268fec8868c663ce2cde2de8cb7d832a';

    if (typeof web3 !== 'undefined' && window.screen.width > 770) {
      // eslint-disable-next-line

      try {
        window.eth = new window.Eth(web3.currentProvider);
      } catch (e) {
        alert('Something is wrong with your connection, please double-check provided data');
      }
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

      alert('Something is wrong with your connection, please double-check provided data');
    }
  },
};
