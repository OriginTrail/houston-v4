<template>
    <div class="container">
        <div class="wrapper">
            <el-row>
                <el-col :span="12" class="text-left">
                    <div class="el-row">
                        <div class="el-col">
                            <h1 class="config-headline">Configuration</h1>
                        </div>
                    </div>
                    <div class="el-row">
                        <div class="el-col">
                            <p class="lead-paragraph">
                                Important: Editing values on this page will change the configuration file of your node.
                            </p>
                            <p class="lead-paragraph bold">
                                This is for advanced users. Be very careful with the changes you make, as they may
                                result in breaking operations on your node. It's your sole responsibility to configure,
                                monitor and maintain your ODN node. If you are unsure about how to set it up, it is best
                                to stick to default values. For any questions, refer to the community Discord group.
                            </p>
                        </div>
                    </div>
                    <el-form ref="configuration" :model="config" >


                        <h2 class="smaller-headline">Blockchain info</h2>

                        <p class="section-explained">The following section shows information about which HUB contract is used within the network and allows for changing the gas information.</p>

                        <div class="first-conf-part">
                            <el-form-item>
                            <el-col :span="5">
                                <span class="label-left">Hub Address</span>
                            </el-col>
                            <el-col :span="16">
                                <strong>{{ config.blockchain.hub_contract_address }}</strong>
                            </el-col>
                            <el-col :span="3">
                                <el-popover
                                        placement="top-start"
                                        title="Hub Address"
                                        width="250"
                                        trigger="hover"
                                        content="Hub address."
                                        class="marginleft">
                                    <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info.svg" alt="" class="info-i"></el-button>
                                </el-popover>
                            </el-col>
                            </el-form-item>

                            <el-form-item>
                                <el-col :span="5">
                                    <span class="label-left">Trac Price in ETH</span>
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="config.blockchain.trac_price_in_eth" type="number"
                                              class="no-spin"></el-input>
                                </el-col>
                                <el-col :span="3">
                                    <el-popover
                                            placement="top-start"
                                            title="Trac Price in ETH"
                                            width="250"
                                            trigger="hover"
                                            content="Hub address."
                                            class="marginleft">

                                        <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info.svg"
                                                                                     alt=""
                                                                                     class="info-i"></el-button>
                                    </el-popover>
                                </el-col>
                            </el-form-item>

                            <el-form-item>
                                <el-col :span="5">
                                    <span class="label-left">Price Factor</span>
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="config.blockchain.price_factor" type="number" class="no-spin"></el-input>
                                </el-col>
                                <el-col :span="3">
                                    <el-popover
                                            placement="top-start"
                                            title="Price Factor"
                                            width="250"
                                            trigger="hover"
                                            content="Price Factor"
                                            class="marginleft">

                                        <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info.svg" alt="" class="info-i"></el-button>
                                    </el-popover>
                                </el-col>
                            </el-form-item>


                            <el-form-item>
                                <el-col :span="5">
                                    <span class="label-left">RPC server URL</span>
                                </el-col>
                                <el-col :span="16">
                                    <strong>{{ config.blockchain.rpc_server_url }}</strong>
                                </el-col>
                                <el-col :span="2">
                                    <el-popover
                                            placement="top-start"
                                            title="URL"
                                            width="250"
                                            trigger="hover"
                                            content="URL of the RPC server used in communication with blockchain."
                                            class="marginleft">

                                        <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info.svg"
                                                                                     alt=""
                                                                                     class="info-i"></el-button>
                                    </el-popover>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :span="5">
                                <span class="label-left">
                                    Gas limit [gas]
                                </span>
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="config.blockchain.gas_limit" type="number"
                                              class="no-spin"></el-input>
                                </el-col>


                                <el-col :span="2">
                                    <el-popover
                                            placement="top-start"
                                            title="Gas limit"
                                            width="250"
                                            trigger="hover"
                                            content="Gas limit for all transactions."
                                            class="marginleft pop">

                                        <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info.svg"
                                                                                     alt=""
                                                                                     class="info-i"></el-button>
                                    </el-popover>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :span="5">
                                    <span class="label-left">Gas price [wei]</span>
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="config.blockchain.gas_price" type="number"
                                              class="no-spin"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <el-popover
                                            placement="top-start"
                                            title="Gas price"
                                            width="250"
                                            trigger="hover"
                                            content="Gas price for all transactions."
                                            class="marginleft pop">

                                        <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info.svg"
                                                                                     alt=""
                                                                                     class="info-i"></el-button>
                                    </el-popover>
                                </el-col>
                            </el-form-item>
                        </div>


                        <h2 class="smaller-headline">Network</h2>

                        <p class="section-explained">The following section shows information about network and peer connections.</p>

                        <el-form-item>
                            <el-col :span="10">
                                <span class="label-left">Request timeout</span>
                            </el-col>
                            <el-col :span="11">
                                <el-input type="number" v-model="config.request_timeout"></el-input>
                            </el-col>
                            <el-col :span="2">
                                <el-popover
                                        placement="top-start"
                                        title="Request timeout"
                                        width="250"
                                        trigger="hover"
                                        content="The request timeout for your node. It is recommended to keep the default values."
                                        class="marginleft">

                                    <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info.svg"
                                                                                 alt=""
                                                                                 class="info-i"></el-button>
                                </el-popover>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <div v-for="(nb, index) in config.network.bootstraps" :key="nb.key">
                                <el-row>
                                    <el-col :span="10">
                                        <span class="label-left">Network bootstrap nodes</span>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-input v-model="config.network.bootstraps[index]"
                                                  class="input-p-bot"></el-input>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-button @click="addInputNetwork()" class="marginleft ">
                                            <i class="el-icon-circle-plus"></i>
                                        </el-button>
                                        <el-button @click="removeInputNetwork(nb)" class="marginleft ">
                                            <i class="el-icon-remove"></i>
                                        </el-button>
                                    </el-col>
                                    <el-col :span="2">
                                        <el-popover
                                                placement="top-start"
                                                title="Network bootstrap node"
                                                width="250"
                                                trigger="hover"
                                                content="These are the bootstrap nodes for the network. It is recommended to keep the default values."
                                                class="marginleft">

                                            <el-button class="pop" slot="reference"><img
                                                    src="~@/assets/id-ic-info.svg" alt=""
                                                    class="info-i"></el-button>
                                        </el-popover>

                                    </el-col>
                                </el-row>
                            </div>
                        </el-form-item>
                        <el-form-item label="Remote access whitelist">
                            <div v-for="(ra, index) in config.network.remoteWhitelist" :key="ra.key">
                                <el-row>
                                    <el-col :span="12">
                                        <el-input v-model="config.network.remoteWhitelist[index]"
                                                  class="input-p-bot"></el-input>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-button @click="addInput()" class="marginleft ">
                                            <i class="el-icon-circle-plus"></i>
                                        </el-button>
                                        <el-button @click="removeInput(ra)" class="marginleft ">
                                            <i class="el-icon-remove"></i>
                                        </el-button>
                                    </el-col>
                                    <el-col :span="2">
                                        <el-popover
                                                placement="top-start"
                                                title="Remote access whitelist"
                                                width="250"
                                                trigger="hover"
                                                content="List of enabled addresses for node remote access"
                                                class="marginleft">

                                            <el-button class="pop" slot="reference"><img
                                                    src="~@/assets/id-ic-info-circle.svg" alt=""
                                                    class="info-i"></el-button>
                                        </el-popover>

                                    </el-col>
                                </el-row>
                            </div>
                        </el-form-item>
                        <h2>Ports</h2>
                        <p class="section-explained">The following section opens up ports on your system for the node
                            services - make sure you set them correctly according to open ports on your machine.</p>
                        <el-form-item label="API Port">
                            <el-col :span="22">
                                <el-input type="number" v-model="config.node_rpc_port"></el-input>
                            </el-col>
                            <el-col :span="2">
                                <el-popover
                                        placement="top-start"
                                        title="API"
                                        width="250"
                                        trigger="hover"
                                        content="API of the node (for imports etc) will be exposed on this port. Recommended to leave the default values. "
                                        class="marginleft">

                                    <el-button class="pop" slot="reference"><img src="~@/assets/id-ic-info-circle.svg"
                                                                                 alt=""
                                                                                 class="info-i"></el-button>
                                </el-popover>
                            </el-col>
                        </el-form-item>
                        <h2>Data holding pricing settings</h2>

                        <p class="section-explained">The following section determines the fees you require for the
                            services
                            of your node, as well as the amounts your node should offer to other nodes in the network
                            for
                            data operations.</p>
                        <div class="offer-settings">
                            <el-form-item label="DC token amount per holder">
                                <el-col :span="17">
                                    <el-input v-model="config.dc_token_amount_per_holder" type="number"
                                              class="no-spin"></el-input>
                                </el-col>
                                <el-col :span="3">
                                    <p class="marginleft">mTRAC</p>
                                </el-col>
                                <el-col :span="2">
                                    <el-popover
                                            placement="top-start"
                                            title="Price"
                                            width="250"
                                            trigger="hover"
                                            content="How much mTRACs the DC node will pay per DH for holding data"
                                            class="marginleft pop">

                                        <el-button class="pop" slot="reference"><img
                                                src="~@/assets/id-ic-info-circle.svg" alt=""
                                                class="info-i"></el-button>
                                    </el-popover>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="DH minimum price">
                                <el-col :span="17">
                                    <el-input v-model="config.dh_min_token_price" type="number"
                                              class="no-spin"></el-input>
                                </el-col>
                                <el-col :span="3">
                                    <p class="marginleft">mTRAC</p>
                                </el-col>
                                <el-col :span="2">
                                    <el-popover
                                            placement="top-start"
                                            title="Title"
                                            width="250"
                                            trigger="hover"
                                            content="The amount in mTRACs for accepting the offer for holding data"
                                            class="marginleft">

                                        <el-button class="pop" slot="reference"><img
                                                src="~@/assets/id-ic-info-circle.svg" alt=""
                                                class="info-i"></el-button>
                                    </el-popover>
                                </el-col>
                            </el-form-item>

                            <el-form-item label="Maximum Dataset filesize in MB">
                                <el-col :span="17">
                                    <el-input v-model="config.dh_maximum_dataset_filesize_in_mb" type="number"
                                              class="no-spin"></el-input>
                                </el-col>
                                <el-col :span="3">
                                    <p class="marginleft">MB</p>
                                </el-col>
                                <el-col :span="2">
                                    <el-popover
                                            placement="top-start"
                                            title="Title"
                                            width="250"
                                            trigger="hover"
                                            content="Maximum Dataset filesize in MB"
                                            class="marginleft">

                                        <el-button class="pop" slot="reference"><img
                                                src="~@/assets/id-ic-info-circle.svg" alt=""
                                                class="info-i"></el-button>
                                    </el-popover>
                                </el-col>
                            </el-form-item>


                            <el-form-item label="Holding Time">
                                <el-col :span="17">
                                    <el-input v-model="config.dc_holding_time_in_minutes" type="number"></el-input>
                                </el-col>
                                <el-col :span="3">
                                    <p class="marginleft">minutes</p>
                                </el-col>
                                <el-col :span="2">
                                    <el-popover
                                            placement="top-start"
                                            title="DC holding time"
                                            width="250"
                                            trigger="hover"
                                            content="The default life span of data a DH should store."
                                            class="marginleft">

                                        <el-button class="pop" slot="reference"><img
                                                src="~@/assets/id-ic-info-circle.svg" alt=""
                                                class="info-i"></el-button>
                                    </el-popover>
                                </el-col>
                            </el-form-item>
                            <br>
                            <el-form-item label="DC Litigation Interval">
                                <el-col :span="17">
                                    <el-input v-model="config.dc_litigation_interval_in_minutes"
                                              type="number"></el-input>
                                </el-col>
                                <el-col :span="3">
                                    <p class="marginleft">minutes</p>
                                </el-col>
                                <el-col :span="2">
                                    <el-popover
                                            placement="top-start"
                                            title="DC litigation interval"
                                            width="250"
                                            trigger="hover"
                                            content="The default time interval for DC."
                                            class="marginleft">

                                        <el-button class="pop" slot="reference"><img
                                                src="~@/assets/id-ic-info-circle.svg" alt=""
                                                class="info-i"></el-button>
                                    </el-popover>
                                </el-col>
                            </el-form-item>
                            <br>
                            <el-form-item label="Maximum Holding Time for a DH">
                                <el-col :span="17">
                                    <el-input v-model="config.dh_max_holding_time_in_minutes" type="number"></el-input>
                                </el-col>
                                <el-col :span="3">
                                    <p class="marginleft">minutes</p>
                                </el-col>
                                <el-col :span="2">
                                    <el-popover
                                            placement="top-start"
                                            title="DH maximum holding time"
                                            width="250"
                                            trigger="hover"
                                            content="The maximum life span of data a DH should should accept."
                                            class="marginleft">

                                        <el-button class="pop" slot="reference"><img
                                                src="~@/assets/id-ic-info-circle.svg" alt=""
                                                class="info-i"></el-button>
                                    </el-popover>
                                </el-col>
                            </el-form-item>
                            <br>
                            <el-form-item label="Minimum Litigation Interval for a DH">
                                <el-col :span="17">
                                    <el-input v-model="config.dh_min_litigation_interval_in_minutes"
                                              type="number"></el-input>
                                </el-col>
                                <el-col :span="3">
                                    <p class="marginleft">minutes</p>
                                </el-col>
                                <el-col :span="2">
                                    <el-popover
                                            placement="top-start"
                                            title="DH minimum litigation interval."
                                            width="250"
                                            trigger="hover"
                                            content="The minimum interval for a DH for litigation."
                                            class="marginleft">

                                        <el-button class="pop" slot="reference"><img
                                                src="~@/assets/id-ic-info-circle.svg" alt=""
                                                class="info-i"></el-button>
                                    </el-popover>
                                </el-col>
                            </el-form-item>
                            <br>
                            <el-form-item label="Time for DC to Choose Offers">
                                <el-col :span="17">
                                    <el-input v-model="config.dc_choose_time" type="number"></el-input>
                                </el-col>
                                <el-col :span="3">
                                    <p class="marginleft">milliseconds</p>
                                </el-col>
                                <el-col :span="2">
                                    <el-popover
                                            placement="top-start"
                                            title="The time for DC to wait before choosing the offers."
                                            width="250"
                                            trigger="hover"
                                            content="The time for DC to wait before choosing the offers."
                                            class="marginleft">

                                        <el-button class="pop" slot="reference"><img
                                                src="~@/assets/id-ic-info-circle.svg" alt=""
                                                class="info-i"></el-button>
                                    </el-popover>
                                </el-col>
                            </el-form-item>
                            <br>
                        </div>
                        <h2>Advanced parameters</h2>

                        <el-col :span="12">
                            <el-form-item label="Verbose logging">
                                <el-col :span="6">
                                    <el-switch v-model="config.verbose_logging"></el-switch>
                                </el-col>
                                <el-col :span="2">
                                    <el-popover
                                            placement="top-start"
                                            title="Verbose logging"
                                            width="200"
                                            trigger="hover"
                                            content="Enable/disable verbose logs"
                                            class="marginleft">

                                        <el-button class="pop2" slot="reference"><img
                                                src="~@/assets/id-ic-info-circle.svg" alt=""
                                                class="info-i2"></el-button>
                                    </el-popover>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="Control port enabled">
                                <el-col :span="6">
                                    <el-switch v-model="config.control_port_enabled"></el-switch>
                                </el-col>
                                <el-col :span="2">
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">

                            <el-form-item label="Remote control enabled">
                                <el-col :span="6">
                                    <el-switch v-model="config.remote_control_enabled"></el-switch>
                                </el-col>
                                <el-col :span="2">
                                    <el-popover
                                            placement="top-start"
                                            title="Remote control enabled"
                                            width="250"
                                            trigger="hover"
                                            content="Enable remote control. Important: if disabled, you will not be able to use Houston."
                                            class="marginleft">

                                        <el-button class="pop2" slot="reference"><img
                                                src="~@/assets/id-ic-info-circle.svg" alt=""
                                                class="info-i2"></el-button>
                                    </el-popover>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="Send logs to OriginTrail">
                                <el-col :span="6">
                                    <el-switch v-model="config.send_logs_to_origintrail"></el-switch>
                                </el-col>
                                <el-col :span="2">
                                    <el-popover
                                            placement="top-start"
                                            title="Send logs to OriginTrail"
                                            width="250"
                                            trigger="hover"
                                            content="Keep this parameter on to send operational logs from your node to the OriginTrail team."
                                            class="marginleft">

                                        <el-button class="pop2" slot="reference"><img
                                                src="~@/assets/id-ic-info-circle.svg" alt=""
                                                class="info-i2"></el-button>
                                    </el-popover>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-button type="primary" @click="onSubmit" style="margin: 0 auto 20px auto">Update
                            configuration
                        </el-button>
                    </el-form>

                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

  export default {
    props: ['nodeConfig', 'system', 'nodeId'],
    created() {

    },
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
            dc_price_factor: '',
            dh_price_factor: ''
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
    watch: {
      // call again the method if the route changes
      $route: 'fetchData',
    },
    sockets: {
      updateComplete() {
        console.log('updated');
      },
    },
    methods: {
      fetchData() {

      },
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
      revealPass() {
        const passwordField = document.querySelector('#wallet-private-key');
        if (passwordField.getAttribute('type') === 'password') {
          passwordField.setAttribute('type', 'text');
        } else {
          passwordField.setAttribute('type', 'password');
        }
        // console.log(this.$store.state.OtNode.config);
      },
      change() {
        console.log(this.config);
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
<style lang="scss">

    .first-conf-part{
        input{

        }
    }
    .wrapper {
        padding: 0 50px;
    }

    .label-left{
        opacity: 0.5;
        font-family: Roboto;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1;
        letter-spacing: normal;
        color: #131415;
    }



    .smaller-headline {
        font-size: 28px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: normal;
        color: #131415;
    }

    .text-left {
        text-align: left;
    }

    .config-headline {
        font-family: Roboto;
        font-size: 46px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.17;
        letter-spacing: normal;
        color: #131415;
    }

    .bold {
        font-weight: 800;
    }

    #app {
        height: 100vh;
    }

    .section-explained {
        padding: 0 0 20px 0;
        width: 600px;
    }

    .el-popover__title {
        color: black !important;
    }

    .main {
        display: flex;
    }

    .eye-icon {
        position: absolute;
        right: 90px;
        top: 8px;

    }

    a {
        cursor: pointer;
    }

    .marginleft {
        margin-left: 20px;

    }

    .el-form-item__label {
        margin-top: 12px;
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
