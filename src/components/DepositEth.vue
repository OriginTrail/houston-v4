<template>
  <div class="panel">
    <h1>Deposit ETH <el-popover
      placement="top-start"
      title="Deposit ETH"
      width="300"
      trigger="hover"
      content="ETH is required for your node to be able to publish transactions to the blockchain, which is handled by your node's operational wallet. This is mostly needed if you want to publish data sets on the network (as a DC node), but sometimes also required as a DH node. It is recommended to always have around 0.1 ETH on the node operational wallet.">
      <i class="el-icon-info" slot="reference"></i>
    </el-popover></h1>
    <span>Deposit ETH to your Operational Wallet</span>
    <el-form :rules="rules" ref="formData" :model="formData">
      <el-form-item label="Wallet to deposit from (i.e. Management wallet)">
        <el-input v-model="wallet"></el-input>
      </el-form-item>
      <el-form-item label="Please enter amount to deposit">
        <el-input-number v-model="formData.amount"
                         :precision="3" :step="0.01" :min="0"></el-input-number>
      </el-form-item>
      <el-button @click="depositEth">Deposit ETH</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ['operationalWallet'],
  data() {
    return {
      formData: {
        amount: 0,
      },
      wallet: '',
      rules: {
        amount: [
          { required: true, message: 'Please enter amount', trigger: 'blur' },
          { min: 0.001, message: 'Amount cannot be less than 0.001', trigger: 'blur' },
        ],
      },
    };
  },
  mounted() {
    window.eth.accounts().then((result) => {
      this.wallet = result[0];
    });

    window.EventBus.$on('management_wallet_changed', (managementWallet) => {
      this.wallet = managementWallet;
    });
  },
  methods: {
    depositEth() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          window.eth.sendTransaction({
            from: this.wallet,
            to: this.operationalWallet,
            value: window.Eth.toWei(this.formData.amount, 'ether'),
            gas: '3000000',
            data: '0x',
          }).then(async (hash) => {
            window.EventBus.$emit('loading');
            await window.Utilities.getTransactionReceipt(hash);
            window.EventBus.$emit('loading-done');
          }).catch((error) => {
            console.log(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>
<style>

</style>
