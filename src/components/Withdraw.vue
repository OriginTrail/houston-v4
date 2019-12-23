<template>
  <div class="panel">
    <h1>Withdraw TRAC from Your Node<el-popover
      placement="top-start"
      title="Withdraw TRAC"
      width="300"
      style="margin-left: 10px"
      trigger="hover"
      content="You can always withdraw the amount of unstaked (not locked in a running job) TRAC from your node profile. This process is performed in a two-step fashion, with a 5min delay between steps. This is needed to avoid certain race conditions within the system functioning. Withdrawing TRAC from your node profile will send the TRAC to your management wallet.
The maximum amount of TRAC safe to withdraw is shown in the left sidebar. Keep in mind that if you withdraw all TRAC available, your node will not be able to respond to new offers because it will not be able to stake TRAC for the job. We recommend to always have some unlocked TRAC on the profile so that your node can receive new jobs.">
      <i class="el-icon-info" slot="reference"></i>
    </el-popover></h1>
    <span>This will withdraw TRAC from your ODN node profile.</span>
    <el-form>
      <p class="label-p">Amount to Withdraw:</p>
      <el-form-item>
        <el-input-number v-model="amount" :precision="3" :step="0.01" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item>
        <p class="label-p">Withdrawing to the following management wallet:</p>
        <el-input v-model="wallet" :disabled="true"></el-input>
      </el-form-item>
      <el-button class="houston-btn" style="width: 47%" @click="startTokenWithdrawal">Start Withdrawal</el-button>
      <el-button class="houston-white-btn " style="width: 47%;"
                 @click="withdrawTokens">Finish Withdrawal</el-button>
    </el-form>
  </div>
</template>
<script>
/* eslint-disable */

/* eslint-disable */

export default {
  props: ['profileAddress', 'erc725'],
  mounted() {
    /* eslint-disable */
    window.eth.accounts().then((result) => {
      // eslint-disable-next-line
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
    startTokenWithdrawal() {
      this.$alert('This operation will require 2 transactions to blockchain. ', 'Important', {
        confirmButtonText: 'OK',
        callback: () => {
          const profileContract = window.eth.contract(window.profileAbi).at(this.profileAddress);
          profileContract.startTokenWithdrawal(this.erc725, this.prepareNumber(),
            { from: this.wallet })
            .then(async (hash) => {
              window.EventBus.$emit('loading', 'First transaction in progress. Please wait.');
              await window.Utilities.getTransactionReceipt(hash);
              window.EventBus.$emit('loading-done');
              const countDownDate = new Date().getTime() + (5 * 65 * 1000);
              const x = setInterval(() => {
                window.EventBus.$emit('loading-done');
                const now = new Date().getTime();
                const distance = countDownDate - now;
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                window.EventBus.$emit('loading', `This operation will take another ${minutes} minutes and ${seconds} seconds. Please be patient and don't close the browser.`);
                if (distance < 0) {
                  clearInterval(x);
                }
              }, 1000);
              setTimeout(() => {
                window.EventBus.$emit('loading', 'Please approve second transaction');
                this.withdrawTokens();
              }, (5 * 65 * 1000));
            });
        },
      });
    },
    withdrawTokens() {
      const profileContract = window.eth.contract(window.profileAbi).at(this.profileAddress);
      profileContract.withdrawTokens(this.erc725,
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

/* eslint-disable */
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
