<template>
  <div class="panel">
    <h1 style="margin-right: 10px">Deposit ETH to Your Node<el-popover
      placement="top-start"
      title="Deposit ETH"
      width="300"
      trigger="hover"
      style="margin-left: 10px"
      content="ETH is required for your node to be able to publish transactions to the blockchain, which is handled by your node's operational wallet. This is mostly needed if you want to publish data sets on the network (as a DC node), but sometimes also required as a DH node. It is recommended to always have around 0.1 ETH on the node operational wallet.">
      <i class="el-icon-info" slot="reference"></i>
    </el-popover></h1>
    <span style="margin-bottom: 30px">This will tranfer ETH to your operational wallet.</span>
    <el-form :rules="rules" ref="formData" :model="formData">
      <el-form-item >
        <p class="label-p">Depositing From:</p>
        <el-input v-model="wallet"></el-input>
      </el-form-item>
      <el-form-item>
        <p class="label-p">Amount to Deposit:</p>
        <el-input-number v-model="formData.amount" :precision="3" :step="0.01" :min="0"></el-input-number> <span class="which-token">ETH</span>
      </el-form-item>

      <el-col :span="24" class="second-radius">
        <div class="el-col field">
          <p class="label-p">Depositing to the Following Operational Wallet:</p>
          <p class="op-wallet">{{ operationalWallet }}</p>
        </div>
      </el-col>
      <el-button class="houston-btn block" @click="depositEth">DEPOSIT ETH</el-button>
    </el-form>
  </div>
</template>
<script>
  /* eslint-disable */
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
<style scoped>
  .block{
    display: block;
  }
  .houston-btn{
    color: #ffffff;
  }
  .houston-btn:hover{
    color: #ffffff;
    background-color: #1d2667;
    transition: all .2s;
  }
  .houston-btn:focus{
    color: #ffffff;
    background-color: #1d2667;
    transition: all .2s;
  }
  .which-token{
    margin-left: 10px;
    font-family: Roboto;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #131415;
  }
  .label-p{
    opacity: 0.5;
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    margin-bottom: 10px;
    color: #131415;
  }

  .op-wallet{
    border-radius: 4px;
    border: solid 1px #acacac;
    background-color: #f6f6f6;
    opacity: 0.5;
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #131415;
    padding: 13px 15px;
  }
</style>
