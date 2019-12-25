<template>
    <div class="container-fluid width100">
        <div class="">
            <el-row>
                <el-col :span="24" class="text-left">
                    <h1 class="margin-20 section-headline">Overview</h1>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" class="padd-right">
                    <h3 class="margin-10 text-left small-headline">General</h3>
                    <div class="el-row special-row margin-30" >
                        <el-col :span="6" class="first-radius">
                            <div class="el-col">
                                <span class="little-span">Network</span>
                            </div>
                        </el-col>
                        <el-col :span="18" class="second-radius">
                            <div class="el-col field">
                               <p> {{ network_type }}</p>
                            </div>
                        </el-col>
                    </div>
                    <div class="el-row special-row margin-30">
                        <el-col :span="6" class="first-radius">
                            <div class="el-col">
                                <span class="little-span">Node ID</span>
                            </div>
                        </el-col>
                        <el-col :span="18" class="second-radius">
                            <div class="el-col field">
                                <p> {{ nodeId }}</p>
                            </div>
                        </el-col>
                    </div>
                    <div class="el-row special-row margin-30">
                        <el-col :span="6" class="first-radius">
                            <div class="el-col ">
                                <span class="little-span">Management wallet ID</span>
                            </div>
                        </el-col>
                        <el-col :span="18" class="second-radius">
                            <div class="el-col field">
                                <p>{{ management_wallet }}</p>
                            </div>
                        </el-col>
                    </div>
                    <div class="el-row special-row margin-30">
                        <el-col :span="6" class="first-radius">
                            <div class="el-col ">
                                <span class="little-span">Operational wallet ID</span>
                            </div>
                        </el-col>

                        <el-col :span="18" class="second-radius">
                            <div class="el-col field">
                                <p>{{ operationalWallet }}</p>
                            </div>
                        </el-col>
                    </div>
                    <div class="el-row special-row margin-30">
                        <el-col :span="6" class="first-radius">
                            <div class="el-col ">
                                <span class="little-span">ERC 725 identity</span>
                            </div>
                        </el-col>

                        <el-col :span="18" class="second-radius">
                            <div class="el-col field">
                                <p>{{ erc725 }}</p>
                            </div>
                        </el-col>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="el-row">
                        <div class="el-col">
                            <h3 class="margin-10 margintop-10 text-left small-headline">NODE BALANCE</h3>
                        </div>
                    </div>

                    <el-row class="balance-wrapper">
                        <div ref="nesto" class="node-logo"></div>
                        <el-col class="balancebox margin-10 margintop-10" :span="12">
                            <img class="balance-logo" src="~@/assets/balance-atrac.svg" alt="">
                            <el-col>
                                <p class="balance-cur">TRAC</p>
                            </el-col>
                            <el-col>
                                <p class="balance-info">Total payouts</p>
                                <p v-if="total_payouts !== ''" class="balance-info-currency">{{ total_payouts }}</p>
                                <p v-else class="balance-info-currency">
                                    <i class="el-icon-loading"></i>
                                </p>
                            </el-col>
                            <el-col>
                                <p class="balance-info2">Staked (reserved)</p>
                                <p v-if="total_payouts !== ''" class="balance-info-currency">{{ stake }} ({{stake_reserved}})</p>
                                <p v-else class="balance-info-currency">
                                    <i class="el-icon-loading"></i>
                                </p>
                            </el-col>
                        </el-col>
                        <el-col class="balancebox margin-10 margintop-10" :span="12">
                            <img class="balance-logo" src="~@/assets/balance-eth.svg" alt="">
                            <el-col>
                                <p class="balance-cur">ETH</p>
                            </el-col>
                            <el-col>
                                <p class="balance-info">Current Balance</p>
                                <p class="balance-info-currency">{{ ow_eth_balance }}</p>
                            </el-col>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>


            <el-row>
                <el-col :span="24" class="right-balance">

                </el-col>
            </el-row>
            <!--<el-row>-->
            <!--<el-col>-->
            <!--<h3 class="margintop-40">IMPORT DATA</h3>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row>-->
            <!--<el-col>-->
            <!--<p>-->
            <!--Dataset being hold-->
            <!--<a href="">-->
            <!--Import Data-->
            <!--</a>-->
            <!--</p>-->
            <!--</el-col>-->
            <!--</el-row>-->


        </div>
    </div>

</template>

<script>

export default {
  props: [
    'profileStorageAddress',
    'erc725',
    'profileAddress',
    'operationalWallet',
    'tokenAddress',
    'management_wallet_input',
    'nodeId',
    'submitted',
    'configData',
    'systemData'
  ],
  data() {
    return {
      name: 'Account',
      node: '',
      vue: '',
      eth_balance: '',
      trac_balance: '',
      stake: '',
      stake_reserved: '',
      total_payouts: '',
      system: {
        contact: {
          protocol: '',
          host: '',
          port: '',
          wallet: '',
        },
        identity: '',
        versions: '',
      },
      config: {
        node_wallet: '',
        management_wallet: '',
        erc725Identity: '',
        blockchain: {
          rpc_server_url: '',
        },
      },
      web3: {},
      network_type:'',
      ow_eth_balance: 0,
      mw_eth_balance: 0,
      mw_trac_balance: 0,
      total_trac: 0,
      locked_trac: 0,
      minimum_stake: 0,
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
      management_wallet: '',
      node_id: '',
      node_address: ''
    };
  },
  mounted() {

    if (this.submitted) {
      this.getAllBalances();
      this.$socket.emit('get-total-payouts');
      this.$socket.emit('get-profile');
      console.log(this.systemData, 'pozvana u my account');
    }

    this.network_type = window.network_type_constant;

    window.EventBus.$on('system-data', (data) => {
      this.network_type = data.info.environment;
    });


    window.EventBus.$on('management_wallet_changed', (data) => {
      this.management_wallet = data;
    });

    window.EventBus.$on('node_id', (data) => {
      this.node_id = data;
    });

    // window.EventBus.$on('config', (data) => {
    //   this.configNetworkId = data.blockchain.network_id;
    // });
  },
  // updated(){
  //   if(this.configData){
  //     this.configNetworkId = this.configData.blockchain.network_id;
  //     console.log(this.configData,'data')
  //   }
  //
  // },
  watch: {
    network_type(newVal, oldVal) {

    },
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
  sockets: {
    balance(balance) {
      this.eth_balance = (balance / 1000000000000000000).toFixed(2);
    },
    trac_balance(value) {
      this.trac_balance = (value / 1).toFixed(4);
    },
    profile(profile) {
      this.stake = (profile.stake / 1000000000000000000).toFixed(2);
      this.stake_reserved = (profile.stakeReserved / 1000000000000000000).toFixed(2);
    },
    total_payouts(val) {
      this.total_payouts = (val / 1000000000000000000).toFixed(2);
    },
  },
  methods: {
    getAllBalances() {
      console.log(this.operationalWallet, 'this.operationalWallet');
      window.eth.getBalance(this.operationalWallet)
        .then((result) => {
          console.log(result, 'get Balance result in My Account');
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
          console.log(this.management_wallet, 'this.management_wallet');

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
  filters: {
    formatCurrency(value) {
      if (typeof value !== 'number') {
        return value;
      }

      return value;
    },
    toTrac(val) {
      const am = new window.Eth.BN(val);
      const base = new window.Eth.BN(10);
      const exponent = new window.Eth.BN(15);
      const multiply = base.pow(exponent);
      return (am.div(multiply).toNumber() < 0) ? 0 : am.div(multiply).toNumber() / 1000;
    },
  },
  computed: {

  },
};
</script>
<style>

</style>
<style scoped lang="scss">
    #app{
        height: 100vh;
    }
    .small-headline{
        font-weight: 800;
        font-family: Roboto;
        font-size: 24px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.33;
        letter-spacing: normal;
    }
    .padd-right{
        padding-right: 30px;
    }
    .line-breaker {
        width: 80%;
        height: 1px;
        background-color: #d9dbdf;
    }

    .balance-number {
        font-size: 32px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.31;
        letter-spacing: normal;
        color: #2d095e;
    }

    .float-right {
        float: right;
    }

    .token-logo {
        width: auto;
        height: 100%;
        margin: 0 auto;
    }


    .balance-cur {
        font-size: 24px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.33;
        letter-spacing: normal;
        color: #4c569c;
        text-align: center;
        margin-top: 25px;
        margin-bottom: 14px;
        font-weight: 900;
    }

    .balancebox {
        position: relative;
        height: 240px;
        width: 240px;
        margin-right: 50px;
        border: solid 1.7px #4c569c;
        border-radius: 50%;
    }

    .balance-logo {
        position: absolute;
        top: -2px;
        left: -2px;
        width: 240px;
    }

    .balance-info-currency {
        font-size: 20px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: center;
        margin-bottom: 7px;
        margin-top: 0;
    }

    .balance-info {
        opacity: 0.5;
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: normal;
        color: #526173;
        text-align: left;
        padding-left: 83px;
        margin-bottom: 0;
    }

    .balance-info2 {
        opacity: 0.5;
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: normal;
        color: #526173;
        text-align: left;
        padding-left: 72px;
        margin-bottom: 0;
    }

    .faucet-balance-link {
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.14;
        letter-spacing: normal;
        color: #307087;
        padding-left: 67px;
    }

    .balance-wrapper {
        margin-bottom: 50px;
    }

    .margintop-10 {
        margin-top: 10px;
    }

    .margintop-40 {
        margin-top: 40px;
    }

    a {
        color: #42b983;
        text-decoration: none;
    }

    .field {
        padding: 7px 10px;
        font-size: 16px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: normal;
        color: #526173;
        border: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 25px;
        border-radius: 4px;
        border: solid 1px #acacac;
        p{
            font-family: Roboto;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1;
            letter-spacing: normal;
            color: #131415;
            opacity: .5;
            line-height: 40px;
            margin-top: 30px;
        }
    }

    .first-radius{
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
        .el-col{
            text-align: left;
            span{
                font-family: Roboto;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1;
                letter-spacing: normal;
                color: #131415;
                opacity: .5;
                line-height: 40px;
            }
        }
    }

    .second-radius{
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
    }


    .jobs-running {
        display: flex;
        justify-content: space-between;
        border-radius: 4px;
        background-color: #ebeef5;
        border: solid 1px #dcdfe6;
        padding: 7px 10px;
        margin-bottom: 10px;
    }

    .right-balance {
        /*padding-left: 20px;*/
    }

    h3 {
        margin-bottom: 40px !important;
    }

    .inline {
        display: inline-block;
    }

    .balance {
        display: flex;
        align-content: center;
        margin-top: 3px;
    }

    .margin-10 {
        margin-bottom: 10px;
    }

    .margin-20 {
        margin-bottom: 20px;
    }

    .account-headline{
        color: #1a4559;
    }

    .lead-paragraph{
        color: #526173;
    }

    .margin-30 {
        margin-bottom: 30px;
    }

    .margin-40 {
        margin-bottom: 40px;
    }

    .margin-50 {
        margin-bottom: 50px;
    }
</style>
