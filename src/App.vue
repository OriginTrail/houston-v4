<template>
    <div id="app">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="0">
                <img alt="OriginTrail" src="./assets/ot-dark_purple.svg" class="logo"> Houston
            </el-menu-item>
            <el-menu-item index="1" :disabled="!submitted">My Account</el-menu-item>
            <el-menu-item index="2" :disabled="!submitted">Node Profile</el-menu-item>
            <el-menu-item index="3" :disabled="!submitted && !showConfig">Node Configuration</el-menu-item>
            <el-menu-item index="4" :disabled="!submitted">Pricing Configuration</el-menu-item>
            <el-menu-item index="5" :disabled="!submitted">Jobs/Offers</el-menu-item>
        </el-menu>
        <el-container>
            <el-container v-if="submitted && activeIndex2 === '1'">
                <my-account :profile-storage-address="profile_storage_address"
                            :profile-address="profile_address"
                            :erc725="erc_identity"
                            :submitted="submitted"
                            :operational-wallet="operational_wallet"
                            :token-address="token_contract"
                            :node-id="node_id"
                            :management_wallet_input="management_wallet_input"></my-account>
            </el-container>
            <el-container v-else-if="submitted && activeIndex2 === '2'">
                <el-aside width="300px">
                    <balances
                            :profile-storage-address="profile_storage_address"
                            :profile-address="profile_address"
                            :erc725="erc_identity"
                            :operational-wallet="operational_wallet"
                            :token-address="token_contract"
                            :management_wallet_input="management_wallet_input"
                    ></balances>
                </el-aside>
                <el-main v-loading="loading"
                         :element-loading-text="loading_text">
                    <el-row>
                        <el-col :span="12">
                            <deposit-eth :operational-wallet="operational_wallet"></deposit-eth>
                        </el-col>
                        <el-col :span="12">
                            <deposit-tokens
                                    :profile-address="profile_address"
                                    :token-address="token_contract"
                                    :erc725="erc_identity">
                            </deposit-tokens>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <withdraw
                                    :erc725="erc_identity"
                                    :profile-address="profile_address"
                            ></withdraw>
                        </el-col>
                        <el-col :span="12">
                            <manage-wallets
                                    :erc725="erc_identity"></manage-wallets>
                        </el-col>
                    </el-row>
                </el-main>
            </el-container>
            <el-container v-else-if="submitted && activeIndex2 === '3'">
                <node-config :node-config="configData" :system="systemData" :node-id="node_id" v-if="showConfig"></node-config>
            </el-container>
            <el-container v-else-if="submitted && activeIndex2 === '4'">
                <node-pricing :node-config="configData" :system="systemData" :node-id="node_id" v-if="showConfig"></node-pricing>
            </el-container>
            <el-container v-else-if="submitted && activeIndex2 === '5'">
                <jobs :submitted="submitted"></jobs>
            </el-container>
            <el-container v-else-if="submitted && mobileTrue">
                <el-main>
                    <balances
                            v-if="showNodeProfile"
                            :profile-storage-address="profile_storage_address"
                            :profile-address="profile_address"
                            :erc725="erc_identity"
                            :operational-wallet="operational_wallet"
                            :token-address="token_contract"
                            :management_wallet_input="management_wallet_input"
                    ></balances>
                </el-main>
            </el-container>
            <el-container v-else>
                <el-main>
                    <div class="landing-page-form-wrapper">
                        <h1>Houston App</h1>
                        <div class="landing-page-inner-wrapper">
                            <el-form>
                                <el-form-item label="Please enter your Node address"
                                >
                                    <el-input
                                            type="textarea"
                                            :autosize="{ minRows: 1, maxRows: 2}"
                                            resize="none"
                                            v-model="node_address"></el-input>
                                </el-form-item>
                                <el-form-item label="Please enter your Houston password"
                                >
                                    <el-input
                                            type="textarea"
                                            :autosize="{ minRows: 1, maxRows: 2}"
                                            resize="none"
                                            v-model="houston_pass"></el-input>
                                </el-form-item>
                                <el-form-item label="Please enter your ERC725 identity"
                                >
                                    <el-input
                                            type="textarea"
                                            :autosize="{ minRows: 1, maxRows: 2}"
                                            resize="none"
                                            v-model="erc_identity"></el-input>
                                </el-form-item>
                                <el-form-item label="Please enter your operational wallet address"
                                >
                                    <el-input
                                            type="textarea"
                                            :autosize="{ minRows: 1, maxRows: 2}"
                                            resize="none"
                                            v-model="operational_wallet"></el-input>
                                </el-form-item>
                                <el-form-item
                                        v-if="mobileTrue"
                                        label="Please enter your management wallet address"

                                >
                                    <el-input
                                            maxlength="42"
                                            minlength="42"
                                            type="textarea"
                                            :autosize="{ minRows: 1, maxRows: 2}"
                                            resize="none"
                                            v-model="management_wallet_input"></el-input>
                                </el-form-item>
                                <el-button class="landing-page-button" @click="submitIdentity">Submit</el-button>
                            </el-form>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Balances from './components/Balances.vue';
import DepositEth from './components/DepositEth.vue';
import DepositTokens from './components/DepositTokens.vue';
import Withdraw from './components/Withdraw.vue';
import ManageWallets from './components/ManageWallets.vue';
import MyAccount from './components/MyAccount.vue';
import NodePricing from './components/NodePricing.vue';
import Jobs from './components/Jobs.vue';
import NodeConfig from './components/NodeConfig.vue';

export default {
  name: 'app',
  data() {
    return {
      node_address: '',
      activeIndex2: '/',
      token_contract: '',
      profile_address: '',
      profile_storage_address: '',
      submitted: 0,
      loading_text: 'Transaction in progress. Please wait for transaction to finish.',
      loading: false,
      mobileTrue: false,
      management_wallet_input: '',
      erc_identity: '',
      operational_wallet: '',
      houston_pass: '',
      rules: {
        operational_wallet: [
          { required: true, message: 'Please input your operational wallet', trigger: 'blur' },
          { max: 42, message: 'Your wallet should not be more than 42 characters' },
          { min: 42, message: 'Your wallet should be at least 42 characters long' },
        ],
        erc_identity: [
          { required: true, message: 'Please input your ERC-Identity', trigger: 'blur' },
          { max: 42, message: 'Your ERC-Identity should not be more than 42 characters' },
          { min: 42, message: 'Your ERC-Identity should be at least 42 characters long' },
        ],
      },
      showNodeProfile: false,
      showMyAccount: false,
      showNodeConfig: false,
      showNodePricing: false,
      showJobs: false,
      configData: {},
      systemData: {},
      showConfig: false,
      node_id: '',
    };
  },
  mounted() {
    if (localStorage.getItem('node_address') !== null) {
      this.node_address = localStorage.getItem('node_address');
    }

    if (localStorage.getItem('erc_identity') !== null) {
      this.erc_identity = localStorage.getItem('erc_identity');
    }

    if (localStorage.getItem('houston_pass') !== null) {
      this.houston_pass = localStorage.getItem('houston_pass');
    }

    if (localStorage.getItem('operational_wallet') !== null) {
      this.operational_wallet = localStorage.getItem('operational_wallet');
    }

    window.hub.tokenAddress().then((result) => {
      this.token_contract = result[0];
    });

    window.hub.getContractAddress('Profile').then((result) => {
      this.profile_address = result[0];
    });

    window.hub.getContractAddress('ProfileStorage').then((result) => {
      this.profile_storage_address = result[0];
    });

    window.EventBus.$on('loading', (msg) => {
      this.loading = true;
      this.loading_text = msg || 'Transaction in progress. Please wait for transaction to finish.';
    });

    window.EventBus.$on('loading-done', () => {
      this.loading = false;
    });
    if (window.screen.width <= 770) {
      this.mobileTrue = true;
    }
  },
  methods: {
    submitIdentity() {
      localStorage.setItem('erc_identity', this.erc_identity);
      localStorage.setItem('operational_wallet', this.operational_wallet);
      localStorage.setItem('houston_pass', this.houston_pass);
      localStorage.setItem('node_address', this.node_address);

      this.submitted = 1;
      this.activeIndex2 = '1';

      this.$socket.io.uri = `https://${this.node_address}:3000/?password=${this.houston_pass}`;
      this.$socket.open();

      window.EventBus.$emit('get-balances-event');
    },
    handleSelect(key, keyPath) {
      /* eslint-disable */
      this.activeIndex2 = key;
      if (key == 1) {
        this.showMyAccount = true;
      } else if (key == 2) {
        this.showNodeProfile = true;
      } else if (key == 3) {
        this.showNodeConfig = true;
      } else if (key == 4) {
        this.showNodePricing = true;
      } else if (key == 5) {
        this.showJobs = true;
      }
    },

  },
  sockets: {
    connect() {
      console.log('Socket connected. Checking for version!');
      this.$socket.emit('get-balance');
        this.$socket.emit('get-balance');
      this.$socket.emit('get-node-info');
    },
    config(val) {
      console.log(val, 'config');
      this.node_id = val.identity;
      this.configData = val;
      this.showConfig = true;

        window.EventBus.$emit('node_id', this.node_id);

    },
    system(val) {
        this.systemData = val;
      console.log(val, 'system');
    },
    balance(val) {
      console.log(val, 'balance');
    },
    nodeInfo(val) {
      console.log(val, 'node info');
    },

  },
  components: {
    Jobs,
    NodePricing,
    NodeConfig,
    Balances,
    DepositEth,
    DepositTokens,
    Withdraw,
    ManageWallets,
    MyAccount,
  },
};
</script>

<style lang="scss">

    @import "./scss/landig-page";

    #app {
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .logo {
        width: 59%;

    }

    .el-aside {
        text-align: left;
    }

    .panel {
        background-color: #f3f3f3;
        margin: 10px;
        padding: 10px 20px;
        border-radius: 8px;
    }

    .panel-form {
        width: 400px;
        margin: 100px auto;
    }

    .el-message-box {
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
    }

    .el-popover {
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
    }

    .el-message__content {
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
    }

    .el-main {
        height: 100%;
    }
</style>
