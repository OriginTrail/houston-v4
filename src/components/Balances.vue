<template>
  <div>
    <el-row v-bind:class="[
    total_trac_increased ? 'increased' : '',
    total_trac_decreased ? 'decreased' : '',
    'balance-row'
    ]">
      <el-col>
        <h2 class="balance-headline">ODN Node Profile</h2>
      </el-col>
      <el-col :span="12" class="align-left left-text">TOTAL</el-col>
      <el-col :span="12" class="result">{{total_trac | toTrac}} TRAC</el-col>
    </el-row>

    <el-row class="balance-row"
            v-bind:class="[locked_trac_changed ? 'changed' : '', 'balance-row']">
      <el-col :span="12" class="align-left">LOCKED</el-col>
      <el-col :span="12" class="result">{{locked_trac | toTrac}} TRAC</el-col>
    </el-row>

    <el-row class="balance-row">
      <el-col :span="12" class="align-left">MIN. STAKE</el-col>
      <el-col :span="12" class="result">{{minimum_stake | toTrac}} TRAC</el-col>
    </el-row>

    <el-row class="balance-row">
      <el-col :span="12" class="align-left">SAFE TO WITHDRAW</el-col>
      <el-col :span="12" class="result">{{safe_to_withdraw | toTrac}} TRAC</el-col>
    </el-row>

    <h2 class="balance-headline">Operational wallet</h2>
    <h6 class="address">{{operationalWallet}}</h6>
    <el-row class="balance-row" v-bind:class="[
    ow_eth_balance_increased ? 'increased' : '',
    ow_eth_balance_decreased ? 'decreased' : '',
    'balance-row'
    ]">
      <el-col :span="12" class="align-left">ETH</el-col>
      <el-col :span="12" class="result">{{ow_eth_balance}}</el-col>
    </el-row>

    <h2 class="balance-headline">Management wallet</h2>
    <p class="address">{{management_wallet}}</p>
    <el-row class="balance-row" v-bind:class="[
    mw_eth_balance_increased ? 'increased' : '',
    mw_eth_balance_decreased ? 'decreased' : '',
    'balance-row'
    ]">
      <el-col :span="12" class="align-left">ETH</el-col>
      <el-col :span="12" >{{mw_eth_balance}}</el-col>
    </el-row>

    <el-row class="balance-row" v-bind:class="[
    mw_trac_balance_increased ? 'increased' : '',
    mw_trac_balance_decreased ? 'decreased' : '',
    'balance-row'
    ]">
      <el-col :span="12" class="align-left">TRAC</el-col>
      <el-col :span="12" class="result">{{mw_trac_balance}}</el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ['profileStorageAddress', 'erc725', 'profileAddress', 'operationalWallet', 'tokenAddress', 'management_wallet_input', 'submitted'],
  name: 'Balances',
  data() {
    return {
      ow_eth_balance: 0,
      mw_eth_balance: 0,
      mw_trac_balance: 0,
      total_trac: 0,
      locked_trac: 0,
      minimum_stake: 0,
      management_wallet: '',
      total_trac_changed: false,
      locked_trac_changed: false,
      total_trac_increased: false,
      total_trac_decreased: false,
      mw_trac_balance_increased: false,
      mw_trac_balance_decreased: false,
      mw_eth_balance_increased: false,
      mw_eth_balance_decreased: false,
      ow_eth_balance_increased: false,
      ow_eth_balance_decreased: false,
    };
  },
  watch: {
    locked_trac(newVal, oldVal) {
      if (newVal.toString() !== oldVal.toString() && oldVal !== 0) {
        this.locked_trac_changed = true;
        setTimeout(() => {
          this.locked_trac_changed = false;
        }, 3000);
      } else {
        this.locked_trac_changed = false;
      }
    },
    total_trac(newVal, oldVal) {
      if (newVal.toString() !== oldVal.toString() && oldVal !== 0) {
        if (newVal.toString() > oldVal.toString()) {
          this.total_trac_increased = true;
          setTimeout(() => {
            this.total_trac_increased = false;
          }, 3000);
        } else {
          this.total_trac_decreased = true;
          setTimeout(() => {
            this.total_trac_decreased = false;
          }, 3000);
        }
        // this.total_trac_changed = true;
      } else {
        this.total_trac_increased = false;
        this.total_trac_decreased = false;
      }
    },
    mw_trac_balance(newVal, oldVal) {
      if (newVal.toString() !== oldVal.toString() && oldVal !== 0) {
        if (newVal.toString() > oldVal.toString()) {
          this.mw_trac_balance_increased = true;
          setTimeout(() => {
            this.mw_trac_balance_increased = false;
          }, 3000);
        } else {
          this.mw_trac_balance_decreased = true;
          setTimeout(() => {
            this.mw_trac_balance_decreased = false;
          }, 3000);
        }
      } else {
        this.mw_trac_balance_increased = false;
        this.mw_trac_balance_decreased = false;
      }
    },
    mw_eth_balance(newVal, oldVal) {
      if (newVal.toString() !== oldVal.toString() && oldVal !== 0) {
        if (newVal.toString() > oldVal.toString()) {
          this.mw_eth_balance_increased = true;
          setTimeout(() => {
            this.mw_eth_balance_increased = false;
          }, 3000);
        } else {
          this.mw_eth_balance_decreased = true;
          setTimeout(() => {
            this.mw_eth_balance_decreased = false;
          }, 3000);
        }
      } else {
        this.mw_eth_balance_increased = false;
        this.mw_eth_balance_decreased = false;
      }
    },
    ow_eth_balance(newVal, oldVal) {
      if (newVal.toString() !== oldVal.toString() && oldVal !== 0) {
        if (newVal.toString() > oldVal.toString()) {
          this.ow_eth_balance_increased = true;
          setTimeout(() => {
            this.ow_eth_balance_increased = false;
          }, 3000);
        } else {
          this.ow_eth_balance_decreased = true;
          setTimeout(() => {
            this.ow_eth_balance_decreased = false;
          }, 3000);
        }
      } else {
        this.ow_eth_balance_increased = false;
        this.ow_eth_balance_decreased = false;
      }
    },
    management_wallet(newVal, oldVal) {
      const erc = window.eth.contract(window.erc725Abi).at(this.erc725);

      const keccakContract = window.eth.contract(window.keccakAbi).at(window.keccakAddress);
      keccakContract.keccakAddress(newVal).then((response) => {
        const responseArray = Object.values(response);
        const wallet = responseArray[0];

        erc.getKeysByPurpose(1).then((result) => {
          const keys = result.keys;
          const isValid = keys.includes(wallet);

          if (!isValid) {
            this.$message.error({
              message: 'This wallet is not registered as a management wallet, please change it in MetaMask!',
              duration: 7000,
            });
          }
        });
      });
    },
  },
  computed: {
    safe_to_withdraw() {
      try {
        return this.total_trac.sub(this.locked_trac).sub(this.minimum_stake);
      } catch (e) {
        // console.log(e)
        return '';
      }
    },
  },
  filters: {
    toTrac(val) {
      const am = new window.Eth.BN(val);
      const base = new window.Eth.BN(10);
      const exponent = new window.Eth.BN(15);
      const multiply = base.pow(exponent);
      return (am.div(multiply).toNumber() < 0) ? 0 : am.div(multiply).toNumber() / 1000;
    },
  },
  mounted() {
    console.log('pozvana u balances');
    this.getAllBalances();
    window.EventBus.$on('loading-done', () => {
      this.getAllBalances();
    }, 5000);
    setInterval(() => {
      this.getAllBalances();
    }, 10000);
    if (screen.width <= 770 && this.management_wallet_input !== '') {
      this.management_wallet = this.management_wallet_input;
    }
  },
  methods: {
    getAllBalances() {
      console.log('pozvana get balances');

      console.log(this.operationalWallet, 'operational wallet');

      window.eth.getBalance(this.operationalWallet)
        .then((result) => {
          this.ow_eth_balance = Math.round(window.Eth.fromWei(result, 'ether') * 1000) / 1000;
        })
        .catch((error) => {
          console.log(error);
        });
      window.eth.accounts().then((result) => {
        if (this.management_wallet_input !== '') {
          this.management_wallet = this.management_wallet_input;
          window.EventBus.$emit('management_wallet_changed', this.management_wallet);
        } else {
          this.management_wallet = result[0];
          window.EventBus.$emit('management_wallet_changed', this.management_wallet);
        }
        window.eth.getBalance(this.management_wallet)
          .then((result) => {
            this.mw_eth_balance = Math.round(window.Eth.fromWei(result, 'ether') * 1000) / 1000;
          })
          .catch((error) => {
            console.log(error);
          });
        const tokenContract = window.eth.contract(window.tokenAbi).at(this.tokenAddress);
        tokenContract.balanceOf(this.management_wallet)
          .then((balance) => {
            this.mw_trac_balance = this.$options.filters.toTrac(balance[0].toString());
          })
          .catch((error) => {
            console.log(error);
          });
      });

      const profileStorageContract = window.eth.contract(window.profileStorageAbi)
        .at(this.profileStorageAddress);

      const profileContract = window.eth.contract(window.profileAbi)
        .at(this.profileAddress);

      profileStorageContract.getStake(this.erc725).then((result) => {
        console.log(result, 'rezultat get Stake');

        this.total_trac = new window.Eth.BN(result[0]);
      });

      profileStorageContract.getStakeReserved(this.erc725).then((result) => {
        this.locked_trac = new window.Eth.BN(result[0]);
      });

      profileContract.minimalStake().then((result) => {
        this.minimum_stake = new window.Eth.BN(result[0]);
      });
    },
  },
};
</script>
<style>
  .main-headline{
    font-family: Roboto;
    font-size: 46px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    color: #131415;
  }

  .address{
    font-family: Roboto;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.75;
    letter-spacing: normal;
    color: #131415;
    margin: 15px 0;
  }

  .balance-headline{
    color: #131415;
    font-family: Roboto;
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
  }

  .align-left {
    text-align: left;
    opacity: 0.5;
    font-family: Roboto;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #131415;
  }

  .result{
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #131415;
  }

  .balance-row {
    padding: 5px;
    margin: 5px 0;
    transition: 1s all;
  }

  .balance-row:nth-of-type(odd) {
    color: white;
  }

  .balance-row div:nth-child(2) {
    transition: 1s color;
  }

  .changed div:nth-child(2) {
    color: red;
    transition: 1s color;
  }

  .increased div:nth-child(2) {
    color: #14da9e;
    transition: 1s color;
  }

  .decreased div:nth-child(2) {
    color: red;
    transition: 1s color;
  }

</style>
