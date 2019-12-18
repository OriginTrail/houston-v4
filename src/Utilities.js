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
};
