<template>
    <div class="container">
        <div class="wrapper">
            <el-row>
                <el-col :span="24">
                    <div class="el-row">
                        <div class="el-col">
                            <h1 class="config-headline">OT Node Pricing Configuration</h1>
                        </div>
                    </div>
                    <div class="el-row">
                        <div class="el-col">
                            <p class="lead-paragraph">
                                The place to refine the pricing parameters regarding your node.
                            </p>
                        </div>
                    </div>
                    <el-form ref="configuration" :model="config" label-width="220px">
                        <el-form-item label="Network">
                            <el-col :span="22">
                                <strong>{{ network }}</strong>
                            </el-col>
                            <el-col :span="2">
                                <el-popover
                                        placement="top-start"
                                        title="Network"
                                        width="250"
                                        trigger="hover"
                                        content="This is name of the network your node operates on"
                                        class="marginleft">

                                    <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info-circle.svg" alt=""
                                                                                 class="info-i"></el-button>
                                </el-popover>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="Your Identity">
                            <el-col :span="22">
                                <strong>{{ nodeId }}</strong>
                            </el-col>
                            <el-col :span="2">
                                <el-popover
                                        placement="top-start"
                                        title="Your Identity"
                                        width="250"
                                        trigger="hover"
                                        content="This is your network ID"
                                        class="marginleft">

                                    <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info-circle.svg" alt=""
                                                                                 class="info-i"></el-button>
                                </el-popover>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="Operational wallet">
                            <el-col :span="22">
                                <strong>{{ config.node_wallet }}</strong>
                            </el-col>
                            <el-col :span="2">
                                <el-popover
                                        placement="top-start"
                                        title="Your Wallet"
                                        width="250"
                                        trigger="hover"
                                        content="This is the operational wallet address associated with your node, and paired with your private key."
                                        class="marginleft">

                                    <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info-circle.svg" alt=""
                                                                                 class="info-i"></el-button>
                                </el-popover>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="Management wallet">
                            <el-col :span="22">
                                <strong>{{ config.management_wallet }}</strong>
                            </el-col>
                            <el-col :span="2">
                                <el-popover
                                        placement="top-start"
                                        title="Your Management Wallet"
                                        width="250"
                                        trigger="hover"
                                        content="This is the management wallet address associated with your node."
                                        class="marginleft">

                                    <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info-circle.svg" alt=""
                                                                                 class="info-i"></el-button>
                                </el-popover>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="Node RPC URL">
                            <el-col :span="22">
                                <strong>http://{{ config.node_rpc_ip }}:{{ config.node_rpc_port }}</strong>
                            </el-col>
                            <el-col :span="2">
                                <el-popover
                                        placement="top-start"
                                        title="Your Node RPC"
                                        width="250"
                                        trigger="hover"
                                        content="This is your node address"
                                        class="marginleft">

                                    <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info-circle.svg" alt=""
                                                                                 class="info-i"></el-button>
                                </el-popover>
                            </el-col>
                        </el-form-item>
                        <h2>Blockchain info</h2>

                        <p class="section-explained">The following section shows information about which Hub contract is
                            used and allows changing the gas information.</p>

                        <el-form-item label="Trac Price in ETH">
                            <el-col :span="22">
                                <el-input v-model="config.blockchain.trac_price_in_eth" type="number" class="no-spin" ></el-input>
                            </el-col>
                            <el-col :span="2">
                                <el-popover
                                        placement="top-start"
                                        title="Trac Price in ETH"
                                        width="250"
                                        trigger="hover"
                                        content="Hub address."
                                        class="marginleft">

                                    <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info-circle.svg" alt=""
                                                                                 class="info-i"></el-button>
                                </el-popover>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="Price Factor">
                            <el-col :span="22">
                                <el-input v-model="config.blockchain.price_factor" type="number" class="no-spin" ></el-input>
                            </el-col>
                            <el-col :span="2">
                                <el-popover
                                        placement="top-start"
                                        title="Price Factor"
                                        width="250"
                                        trigger="hover"
                                        content="Price Factor"
                                        class="marginleft">

                                    <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info-circle.svg" alt=""
                                                                                 class="info-i"></el-button>
                                </el-popover>
                            </el-col>
                        </el-form-item>


                        <el-button  type="primary" @click="onSubmit" style="margin: 0 auto 20px auto" >Update configuration</el-button>
                    </el-form>

                </el-col>
            </el-row>
        </div>
    </div>

</template>

<script>
export default {
  props: ['nodeConfig', 'system', 'nodeId'],
  name: 'NodePricing',
  data() {
    return {
      loading: true,
      ident: '',
      original_config: null,
      network: '',
      config: {
        identity: '',
        node_wallet: '',
        node_private_key: '',
        node_rpc_ip: '',
        node_port: '',
        request_timeout: '',
        ssl_keypath: '',
        ssl_certificate_path: '',
        verbose_logging: '',
        control_port_enabled: '',
        control_port: '',
        control_sock_enabled: '',
        control_sock: '',
        onion_enabled: '',
        test_network: '',
        ssl_authority_paths: '',
        network_bootstrap_nodes: '',
        solve_hashes: '',
        remote_access_whitelist: '',
        node_rpc_port: '',
        send_logs_to_origintrail: '',
        max_token_amount_per_dh: '',
        remote_control_enabled: true,
        node_remote_control_port: '',
        dh_maximum_dataset_filesize_in_mb: '',
        network: {
          hostname: '',
          id: '',
          bootstraps: [''],
          remoteWhitelist: [''],
          solutionDifficulty: '',
          identityDifficulty: '',
        },
        blockchain: {
          blockchain_title: '',
          network_id: '',
          gas_limit: '',
          gas_price: '',
          hub_contract_address: '',
          rpc_server_url: '',
          plugins: [''],
          trac_price_in_eth: '',
          price_factor: '',
        },
        dc_holding_time_in_minutes: '',
        dc_token_amount_per_holder: '',
        dc_litigation_interval_in_minutes: '',
        dh_max_holding_time_in_minutes: '',
        dh_min_token_price: '',
        dh_min_litigation_interval_in_minutes: '',
        dc_choose_time: 600000,
        requireApproval: false,
        litigationEnabled: true,
        commandExecutorVerboseLoggingEnabled: false,
      },
      node_id: '',
    };
  },
  mounted() {
    this.config = this.nodeConfig;
    this.systemData = this.system;

    switch (this.systemData.info.environment.toLowerCase()) {
      case 'mariner':
        this.network = 'Mainnet';
        break;
      case 'production':
        this.network = 'Testnet';
        break;
      default:
        this.network = 'Mainnet';
    }

    window.EventBus.$on('node_id', (data) => {
      this.node_id = data;
    });
  },
  sockets: {
    updateComplete() {
      console.log('updated');
    },
  },
  methods: {
    onSubmit() {
      // Fix types.
      this.config.node_port = Number(this.config.node_port);
      this.config.node_rpc_port = Number(this.config.node_rpc_port);
      this.config.node_remote_control_port = Number(this.config.node_remote_control_port);
      this.config.request_timeout = Number(this.config.request_timeout);
      this.config.dc_holding_time_in_minutes = Number(this.config.dc_holding_time_in_minutes);
      this.config.dc_litigation_interval_in_minutes = Number(this.config.dc_litigation_interval_in_minutes);
      this.config.dh_max_holding_time_in_minutes = Number(this.config.dh_max_holding_time_in_minutes);
      this.config.dc_choose_time = Number(this.config.dc_choose_time);
      this.config.remote_control_enabled = Boolean(this.config.remote_control_enabled);
      this.config.verbose_logging = Boolean(this.config.verbose_logging);
      this.config.control_port_enabled = Boolean(this.config.control_port_enabled);
      this.config.send_logs_to_origintrail = Boolean(this.config.send_logs_to_origintrail);

      this.$socket.emit('config-update', this.config);
    },
  },
  addInput() {
    this.config.network.remoteWhitelist.push('');
  },
  removeInput(item) {
    if (this.config.network.remoteWhitelist.length === 1) {
      return;
    }
    const index = this.config.network.remoteWhitelist.indexOf(item);
    if (index !== -1) {
      this.config.network.remoteWhitelist.splice(index, 1);
    }
  },
  addInputNetwork() {
    this.config.network.bootstraps.push('');
  },
  removeInputNetwork(item) {
    if (this.config.network.bootstraps.length === 1) {
      return;
    }
    const index = this.config.network.bootstraps.indexOf(item);
    if (index !== -1) {
      this.config.network.bootstraps.splice(index, 1);
    }
  },
};
</script>

<style scoped>
    .section-explained{
        padding: 0 0 20px 0;
        width: 600px;
    }
    .el-popover__title{
        color: black !important;
    }
    .main {
        display: flex;
    }

    .eye-icon{
        position: absolute;
        right: 90px;
        top: 8px;

    }
    a{
        cursor: pointer;
    }
    .marginleft{
        margin-left: 20px;

    }

    .el-form-item__label{
        margin-top: 12px;
    }

    h2{
        margin-bottom: 30px;
    }
    .pop {
        background-color: transparent;
        border: none;
    }
    .pop:hover{background-color: transparent !important;
        border: none !important;
    }
    .pop:focus{
        background-color: transparent !important;
        border: none !important;
        color: #ffffff;
    }


    .pop img {
        width: 20px;
    }
    .pop img:hover{
        opacity: 1;
    }


    .pop2 {
        background-color: transparent;
        border: none;
    }
    .pop2:hover{background-color: transparent !important;
        border: none !important;
    }
    .pop2:focus{
        background-color: transparent !important;
        border: none !important;
        color: #ffffff;
    }


    .info-i2{
        position: absolute;
        top: 7px;
        width: 18px;
        margin-left: 6px;
    }

    .pop2 img{
        position: absolute;
        top: 5px;
        opacity: 0.5;
        width: 20px;
        margin-left: 6px;
    }
    .pop2 img:hover{
        opacity: 1;
    }


    .input-p-bot{
        padding-bottom: 20px;
    }

    .no-spin input[type=number]::-webkit-inner-spin-button,
    .no-spin input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    h2{
        margin-top: 40px;
        color: #526173;
        margin-bottom: 10px;
    }

    p{
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: normal;
        color: #526173;
        margin-bottom: 30px;
    }

    .config-headline{
        font-size: 36px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.33;
        letter-spacing: normal;
        color: #1a4559;
    }
</style>
