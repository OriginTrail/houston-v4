<template>
    <div class="container-fluid">
        <div class="wrapper">
            <el-row>
                <el-col :span="24" class="text-left">
                    <h1 class="section-headline">Pricing Configuration</h1>
                </el-col>
                <el-col :span="9" class="text-left">
                    <p class="lead-paragraph">
                        Since the v4 release of the OriginTrail node, the default pricing has been implemented utilizing
                        the pricing factor (Lambda). Use this page to configure the pricing of your node operating in
                        both DC and DH modes.
                    </p>
                </el-col>
            </el-row>
            <el-row class="splitter">
                <el-form ref="configuration" :model="config">
                    <!--<el-form-item label="Trac Price in ETH">
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
                                <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info-circle.svg" alt="" class="info-i"></el-button>
                            </el-popover>
                        </el-col>
                    </el-form-item>-->
                    <el-form-item>
                        <!-- PRICE FOR DATA HOLDER -->
                        <el-col :span="12" class="text-left">
                            <div class="white-card">
                                <h3 class="card-headline">
                                    Data Holder Price Factor (λ)
                                </h3>
                                <p class="label">Value</p>
                                <el-input-number class="value-input" v-model="config.blockchain.dh_price_factor"
                                                 @change="handleChangeDh" :min="0"></el-input-number>
                                <div class="display-block text-left">
                                    <el-button type="primary" @click="onSubmit" class="houston-btn"
                                               style="margin: 0 auto 20px auto" :disabled="updateDhButton">UPDATE
                                        NODE LAMBDA FACTOR
                                    </el-button>
                                </div>
                                <!--<el-popover
                                    placement="top-start"
                                    title="Price Factor"
                                    width="250"
                                    trigger="hover"
                                    content="Price Factor"
                                    class="marginleft">

                                <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info-circle.svg" alt="" class="info-i"></el-button>
                            </el-popover>-->
                            </div>
                        </el-col>
                        <el-col :span="12" class="text-left " style="padding-left: 20px;">
                            <h3 class="card-headline">
                                The estimated amount of TRAC your node would ask for as a DH node for jobs based on
                                currently set DH Lambda:
                            </h3>
                            <ul>
                                <li>A dataset of 0.1 MB with a 6-month lifespan: <span class="price-in-trac">{{ pricing_01mb_180days }}</span>
                                    TRAC
                                <li>A dataset of 1 MB with a 6-month lifespan: <span class="price-in-trac">{{ pricing_1mb_180days }}</span>
                                    TRAC
                                </li>
                                <li>A dataset of 10 MB with a 6-month lifespan: <span class="price-in-trac">{{ pricing_10mb_180days }}</span>
                                    TRAC
                                </li>
                                <li>A dataset of 10 MB with a 24-month lifespan: <span class="price-in-trac">{{ pricing_10mb_730days }}</span>
                                    TRAC
                                </li>
                            </ul>
                        </el-col>
                    </el-form-item>
                </el-form>
            </el-row>

            <el-row>
                <el-form ref="configuration" :model="config">
                    <!--<el-form-item label="Trac Price in ETH">
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
                                <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info-circle.svg" alt="" class="info-i"></el-button>
                            </el-popover>
                        </el-col>
                    </el-form-item>-->
                    <el-form-item>
                        <!-- PRICE FOR DATA CREATOR -->
                        <el-col :span="12" class="text-left">
                            <div class="white-card">
                                <h3 class="card-headline">
                                    Data Creator Price Factor (λ)
                                </h3>
                                <p class="label">Value</p>
                                <el-input-number class="value-input" v-model="config.blockchain.dc_price_factor"
                                                 @change="handleChangeDc" :min="0"></el-input-number>
                                <div class="display-block text-left">
                                    <el-button type="primary" @click="onSubmit" class="houston-btn"
                                               :disabled="updateDcButton"
                                               style="margin: 0 auto 20px auto">UPDATE NODE LAMBDA FACTOR
                                    </el-button>
                                </div>
                                <!--<el-popover
                                    placement="top-start"
                                    title="Price Factor"
                                    width="250"
                                    trigger="hover"
                                    content="Price Factor"
                                    class="marginleft">

                                <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info-circle.svg" alt="" class="info-i"></el-button>
                            </el-popover>-->
                            </div>
                        </el-col>
                        <el-col :span="12" class="text-left" style="padding-left: 20px;">
                            <h3 class="card-headline">
                                The estimated amount of TRAC your node would require as a DH and a DC for jobs based on
                                current Lambda:
                            </h3>
                            <p class="small-p">Since the ODN services market is open, each node is required to configure
                                it’s own service price. The lambda factor is a user friendly way to setup the pricing
                                configuration for your node data holder service. An overly optimistic Lambda (high cost)
                                could cause your node to be outpriced by other ODN nodes and not receive enough jobs to
                                be profitable, while a Lambda set too low might mean an insufficient ROI.
                                <br>The pricing formula (shown below), which utilizes Lambda, is designed to encompass:
                            </p>
                            <ul>
                                <li>The data lifespan and dataset size components;</li>
                                <li>The estimated blockchain withdrawal cost;</li>
                                <li>The estimation of current average network Lambda is in the Houston roadmap and
                                    planned for the next releases.
                                </li>
                            </ul>
                            <img class="formula-img" src="../assets/cubes-group@2x.png" height="auto" width="100%"/>
                        </el-col>
                    </el-form-item>
                </el-form>
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
      updateDcButton: false,
      updateDhButton: false,
      price_factor: 1,
      pricing: 1,
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
          dc_price_factor: '',
          dh_price_factor: '',
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
      pricing_01mb_180days: 0,
      pricing_1mb_180days: 0,
      pricing_10mb_180days: 0,
      pricing_10mb_730days: 0,
    };
  },
  mounted() {
    this.config = this.nodeConfig;
    this.systemData = this.system;
    this.handleChangeDc(this.config.blockchain.dc_price_factor);
    this.handleChangeDh(this.config.blockchain.dh_price_factor);

    console.log(this.config);

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
      /* this.config.dc_litigation_interval_in_minutes = Number(this.config.dc_litigation_interval_in_minutes);
        this.config.dh_max_holding_time_in_minutes = Number(this.config.dh_max_holding_time_in_minutes); */
      this.config.dc_choose_time = Number(this.config.dc_choose_time);
      this.config.remote_control_enabled = Boolean(this.config.remote_control_enabled);
      this.config.verbose_logging = Boolean(this.config.verbose_logging);
      this.config.control_port_enabled = Boolean(this.config.control_port_enabled);
      this.config.send_logs_to_origintrail = Boolean(this.config.send_logs_to_origintrail);
      this.$socket.emit('config-update', this.config);
    },
    handleChangeDh(value) {
      // this.pricing = calculatePrice(config.blockchain.trac_price_in_eth, config.blockchain.price_factor, 180, 1);

      if (value == 0) {
        this.updateDhButton = true;
        this.pricing_01mb_180days = 0;
        this.pricing_1mb_180days =0;
        this.pricing_10mb_180days =0;
        this.pricing_10mb_730days = 0;
      } else {
        this.updateDhButton = false;
        this.pricing_01mb_180days = Math.round(2 * (0.00075 / this.config.blockchain.trac_price_in_eth) + this.config.blockchain.dh_price_factor * Math.sqrt(2 * 180 * 0.1));
        this.pricing_1mb_180days = Math.round(2 * (0.00075 / this.config.blockchain.trac_price_in_eth) + this.config.blockchain.dh_price_factor * Math.sqrt(2 * 180 * 1));
        this.pricing_10mb_180days = Math.round(2 * (0.00075 / this.config.blockchain.trac_price_in_eth) + this.config.blockchain.dh_price_factor * Math.sqrt(2 * 180 * 10));
        this.pricing_10mb_730days = Math.round(2 * (0.00075 / this.config.blockchain.trac_price_in_eth) + this.config.blockchain.dh_price_factor * Math.sqrt(2 * 730 * 10));
      }
    },
    handleChangeDc(value) {
      // this.pricing = calculatePrice(config.blockchain.trac_price_in_eth, config.blockchain.price_factor, 180, 1);

      if (value == -1) {
        this.updateDcButton = true;
      } else {
        this.updateDcButton = false;
        //   this.pricing_01mb_180days = Math.round(2 * (0.00075 / this.config.blockchain.trac_price_in_eth) + this.config.blockchain.dc_price_factor * Math.sqrt(2 * 180 * 0.1));
        //   this.pricing_1mb_180days = Math.round(2 * (0.00075 / this.config.blockchain.trac_price_in_eth) + this.config.blockchain.dc_price_factor * Math.sqrt(2 * 180 * 1));
        //   this.pricing_10mb_180days = Math.round(2 * (0.00075 / this.config.blockchain.trac_price_in_eth) + this.config.blockchain.dc_price_factor * Math.sqrt(2 * 180 * 10));
        //   this.pricing_10mb_730days = Math.round(2 * (0.00075 / this.config.blockchain.trac_price_in_eth) + this.config.blockchain.dc_price_factor * Math.sqrt(2 * 730 * 10));
      }
    },
    calculatePrice(tracePrice, priceFactor, timeSpan, datasetSize) {
      // eslint-disable-next-line max-len
      return 2 * (0.00075 / tracePrice) + priceFactor * sqrt(2 * datasetSize * timeSpan / 1440);
    },
    checkDhPriceFactor() {
      return this.config.blockchain.price_factor_dh == 0 || this.config.blockchain.price_factor_dc >= 0;
    },
    checkDcPriceFactor() {
      return this.config.blockchain.price_factor_dc == 0 || this.config.blockchain.price_factor_dh >= 0;
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
  },
};
</script>
<style>
    #app {
        height: 100vh;
        background-color: #f6f6f6;
    }

    .houston-btn {
        border-radius: 4px;
        background-color: #1d2667;
        border: 1px solid #1d2667;
    }

    .el-menu {
        background-color: #f6f6f6;
    }

    .el-menu-item.hover {
        background-color: #f6f6f6;
    }

    .text-left {
        text-align: left;
    }

    .container-fluid {
        padding: 0 88px;
        width: 100%;
    }

    .section-headline {
        font-family: Roboto;
        font-size: 46px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.17;
        letter-spacing: normal;
        color: #131415;
        margin-bottom: 20px;
    }
</style>
<style scoped>
    .formula-img {
        margin-top: 20px;
    }

    .lead-paragraph {
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.6;
        letter-spacing: normal;
        color: #131415;
    }


    .small-p {
        font-family: Roboto;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: normal;
        color: #0a1a2d;
    }

    .splitter {
        margin-bottom: 40px;
    }

    .price-in-trac {
        font-size: 20px;
        font-weight: 800;
        color: #1d2667;
    }

    .el-icon-plus {
        color: #1d2667;
        font-weight: 900;
        font-size: 14px;
        bottom: -2px;
        position: relative;
    }

    li {
        height: 25px;
        font-size: 14px;
        line-height: 23px;
        color: #0a1a2d;
    }

    .add-left-padding {
        padding-right: 16%;
    }

    h3.card-headline {
        font-family: Roboto;
        font-size: 28px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: normal;
        color: #131415;
        margin-top: 0px;
    }

    .white-card {
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(82, 97, 115, 0.2);
        background-color: #ffffff;
        border: 1px solid #dfdfdf;
        padding: 20px;
        width: 90%;
    }

    .label {
        font-family: Roboto;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1;
        letter-spacing: normal;
        color: #131415;
        margin-bottom: 10px;
    }

    .value-input {
        margin-bottom: 30px;
    }

    .display-block {
        display: block;
    }

    .container-fluid {
        padding: 0 88px;
    }

    .text-left {
        text-align: left;
    }

    a {
        cursor: pointer;
    }

    .marginleft {
        margin-left: 20px;

    }


    h2 {
        margin-bottom: 30px;
    }

    .pop {
        background-color: transparent;
        border: none;
    }

    .pop:hover {
        background-color: transparent !important;
        border: none !important;
    }

    .pop:focus {
        background-color: transparent !important;
        border: none !important;
        color: #ffffff;
    }


    .pop img {
        width: 20px;
    }

    .pop img:hover {
        opacity: 1;
    }


    .pop2 {
        background-color: transparent;
        border: none;
    }

    .pop2:hover {
        background-color: transparent !important;
        border: none !important;
    }

    .pop2:focus {
        background-color: transparent !important;
        border: none !important;
        color: #ffffff;
    }


    .info-i2 {
        position: absolute;
        top: 7px;
        width: 18px;
        margin-left: 6px;

    }

    .pop2 img {
        position: absolute;
        top: 5px;
        opacity: 0.5;
        width: 20px;
        margin-left: 6px;
    }

    .pop2 img:hover {
        opacity: 1;
    }


    .input-p-bot {
        padding-bottom: 20px;
    }

    .no-spin input[type=number]::-webkit-inner-spin-button,
    .no-spin input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    h2 {
        margin-top: 40px;
        color: #526173;
        margin-bottom: 10px;
    }

    p {
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: normal;
        color: #526173;
        margin-bottom: 30px;
    }

</style>
