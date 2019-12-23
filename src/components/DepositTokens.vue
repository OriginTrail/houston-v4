<template>
  <div class="panel">
    <h1>Deposit TRAC to Your Node<el-popover
      placement="top-start"
      title="Deposit TRAC"
      width="300"
      style="margin-left: 10px"
      trigger="hover"
      content="For the node to operate within the rules of the OriginTrail protocol, your node needs TRAC on it's network profile smart contract. This TRAC is used to reimburse DH nodes for their services (if you are publishing data sets as a DC node), to provide collateral (stake) as a DH node, and to provide the initial stake to join the network. Your node might from time to time respond to holding requests, which might lock in additional TRAC if it gets picked for the job (you can observe the available TRAC in the left sidebar), which will get unlocked once the job is completed. For each job, your node will be compensated in additional TRAC, which will be shown on your profile once the job is complete.">
      <i class="el-icon-info" slot="reference"></i>
    </el-popover></h1>
    <span>This will withdraw TRAC from your ODN node profile.</span>
    <el-form>
      <el-form-item>
        <p class="label-p">Depositing from Management Wallet:</p>
        <el-input v-model="wallet"></el-input>
      </el-form-item>
      <el-form-item>
        <p class="label-p">Amount to Deposit:</p>
        <el-input-number v-model="amount" :precision="3" :step="0.01" :min="0"></el-input-number> <span class="which-token">TRAC</span>
      </el-form-item>
      <el-col :span="24" class="second-radius">
      <div class="el-col field">
        <p class="label-p">Depositing to the Following ODN Node Profile:</p>
        <p class="op-wallet">SMART CONTRACT ADDRESS SHOULD BE HERE</p>
      </div>
      </el-col>
      <el-button class="houston-btn block" @click="increaseApproval">DEPOSIT TRAC</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ['profileAddress', 'tokenAddress', 'erc725', 'operationalWallet'],
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
