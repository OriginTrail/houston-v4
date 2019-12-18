<template>
  <div class="panel">
    <h1>Deposit TRAC <el-popover
      placement="top-start"
      title="Deposit TRAC"
      width="300"
      trigger="hover"
      content="For the node to operate within the rules of the OriginTrail protocol, your node needs TRAC on it's network profile smart contract. This TRAC is used to reimburse DH nodes for their services (if you are publishing data sets as a DC node), to provide collateral (stake) as a DH node, and to provide the initial stake to join the network. Your node might from time to time respond to holding requests, which might lock in additional TRAC if it gets picked for the job (you can observe the available TRAC in the left sidebar), which will get unlocked once the job is completed. For each job, your node will be compensated in additional TRAC, which will be shown on your profile once the job is complete.">
      <i class="el-icon-info" slot="reference"></i>
    </el-popover></h1>
    <span>Deposit TRAC to your Profile</span>
    <el-form>
      <el-form-item label="Wallet to deposit from - Management wallet">
        <el-input v-model="wallet" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="Please enter amount to deposit">
        <el-input-number v-model="amount" :precision="3" :step="0.01" :min="0"></el-input-number>
      </el-form-item>
      <el-button @click="increaseApproval">Deposit Tokens</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ['profileAddress', 'tokenAddress', 'erc725'],
  mounted() {
    window.eth.accounts().then((result) => {
      this.wallet = result[0];
    });

    window.EventBus.$on('management_wallet_changed', (managementWallet) => {
      this.wallet = managementWallet;
    });
  },
  data() {
    return {
      amount: 0,
      wallet: '',
    };
  },
  methods: {
    increaseApproval() {
      this.$alert('This operation will require 2 transactions to blockchain.', 'Important', {
        confirmButtonText: 'OK',
        callback: () => {
          const tokenContract = window.eth.contract(window.tokenAbi).at(this.tokenAddress);
          tokenContract.increaseApproval(this.profileAddress, this.prepareNumber(),
            { from: this.wallet })
            .then(async (hash) => {
              window.EventBus.$emit('loading', 'First transaction in progress. Please wait.');
              await window.Utilities.getTransactionReceipt(hash);
              window.EventBus.$emit('loading-done');
              window.EventBus.$emit('loading', 'Please approve second transaction');
              this.depositToken();
            });
        },
      });
    },
    depositToken() {
      const profileContract = window.eth.contract(window.profileAbi).at(this.profileAddress);
      profileContract.depositTokens(this.erc725, this.prepareNumber(),
        { from: this.wallet })
        .then(async (hash) => {
          window.EventBus.$emit('loading', 'Second transaction in progress. Please wait.');
          await window.Utilities.getTransactionReceipt(hash);
          window.EventBus.$emit('loading-done');
        });
    },
    prepareNumber() {
      const am = new window.Eth.BN(this.amount * 1000);
      const base = new window.Eth.BN(10);
      const exponent = new window.Eth.BN(15);
      const multiply = base.pow(exponent);
      return am.mul(multiply);
    },
  },
};
</script>
<style>

</style>
