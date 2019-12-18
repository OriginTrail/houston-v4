<template>
    <div class="wrapper container">
        <div class="el-row">
            <div class="el-col">
                <h1 class="jobs">JOBS</h1>
            </div>
        </div>
        <el-row>
            <el-col class="second-headline">
                {{ headline }}
            </el-col>
        </el-row>
        <div class="el-row">
            <div class="el-col">
                <p class="lead-paragraph">
                    {{ headparagraph }}
                </p>
            </div>
        </div>

        <el-row>
            <el-col>
                <el-tabs type="card" @tab-click="handleClick">
                    <el-tab-pane label="Pending bids">
                        <el-row>
                            <el-col :span="24">
                                <data-tables
                                        :data="bids"
                                        style="width: 100%"
                                        v-loading="loading">
                                    <el-table-column type="expand" fixed>

                                        <template slot-scope="props">
                                            <div class="m-l-imports">
                                                <h2 class="h2-imports"><strong>Job information</strong></h2>
                                                <el-row class="imports-row">
                                                    <el-col :span="20">
                                                        <el-row class="info-block">
                                                            <el-col :span="5" class="left-info-block">
                                                                Price (mTRAC)
                                                            </el-col>
                                                            <el-col :span="20" class="right-block-info" v-if="currentBidsIndicator">
                                                                <i class="el-icon-loading"></i>
                                                            </el-col>
                                                            <el-col :span="12" class="right-block-info" v-else>
                                                                {{ props.row.token_amount }}
                                                            </el-col>
                                                        </el-row>
                                                        <el-row class="info-block">
                                                            <el-col :span="5" class="left-info-block">
                                                                Offer ID
                                                            </el-col>
                                                            <el-col :span="12" class="right-block-info" v-if="currentBidsIndicator">
                                                                <i class="el-icon-loading"></i>
                                                            </el-col>
                                                            <el-col :span="12" class="right-block-info" v-else>
                                                                {{ props.row.offer_id }}
                                                            </el-col>
                                                        </el-row>
                                                        <el-row class="info-block">
                                                            <el-col :span="5" class="left-info-block">
                                                                DC ID
                                                            </el-col>
                                                            <el-col :span="12" class="right-block-info" v-if="currentBidsIndicator">
                                                                <i class="el-icon-loading"></i>
                                                            </el-col>
                                                            <el-col :span="12" class="right-block-info" v-else>
                                                                {{ props.row.dc_node_id }}
                                                            </el-col>
                                                        </el-row>
                                                        <el-row class="info-block">
                                                            <el-col :span="5" class="left-info-block">
                                                                Data size (bytes)
                                                            </el-col>
                                                            <el-col :span="12" class="right-block-info" v-if="currentBidsIndicator">
                                                                <i class="el-icon-loading"></i>
                                                            </el-col>
                                                            <el-col :span="12" class="right-block-info" v-else>
                                                                {{ props.row.data_size_in_bytes }}
                                                            </el-col>
                                                        </el-row>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="offer_id"
                                            label="Offer ID"
                                            width="200">
                                    </el-table-column>
                                    <el-table-column
                                            prop="holding_time_in_minutes"
                                            label="Holding time (minutes)"
                                            width="200">
                                    </el-table-column>
                                    <el-table-column
                                            prop="token_amount"
                                            label="Potential reward (mTRAC)">
                                    </el-table-column>
                                    <el-table-column
                                            prop="status"
                                            label="Status"
                                            class="status-text">
                                    </el-table-column>
                                </data-tables>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="Holding Data">
                        <el-row>
                            <el-col :span="24">
                                <data-tables
                                        :data="holding_data"
                                        style="width: 100%"
                                        v-loading="loading">
                                    <el-table-column type="expand" fixed>

                                        <template slot-scope="props">
                                            <div class="m-l-imports">
                                                <h2 class="h2-imports"><strong>Financials</strong></h2>
                                                <el-row class="imports-row">
                                                    <el-col :span="18">
                                                        <el-row class="info-block">
                                                            <el-col :span="8" class="left-info-block">
                                                                Staked for this job (mTRAC)
                                                            </el-col>
                                                            <el-col :span="12" class="right-block-info" >
                                                                {{ props.row.staked_amount }}
                                                            </el-col>
                                                        </el-row>
                                                        <el-row class="info-block">
                                                            <el-col :span="8" class="left-info-block">
                                                                Currently paid (mTRAC)
                                                            </el-col>
                                                            <el-col :span="12" class="right-block-info">
                                                                {{ props.row.paid_amount }}
                                                            </el-col>
                                                        </el-row>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label=""
                                            width="60">
                                        <template slot-scope="props">
                                            <div class="hexContainer" id="hexContainerID2">
                                                <div v-html="props.row.slika" style="border-radius: 50px; overflow: hidden; padding: 0px; margin: 0px; width: 30px; height: 30px; display: inline-block; background: rgb(1, 109, 142);">

                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="data_set_id"
                                            label="Dataset">
                                    </el-table-column>
                                    <el-table-column
                                            prop="offer_id"
                                            label="Offer ID">
                                    </el-table-column>
                                    <el-table-column
                                            prop="source_wallet"
                                            label="Source Wallet">
                                    </el-table-column>
                                    <el-table-column
                                            prop="root_hash"
                                            label="Root Hash">
                                    </el-table-column>
                                    <el-table-column
                                            prop="color"
                                            label="Encryption color">
                                    </el-table-column>
                                    <el-table-column
                                            prop="status"
                                            label="Status">
                                    </el-table-column>
                                </data-tables>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="Replicated Data">
                        <el-row>
                            <el-col :span="24">
                                <data-tables
                                        :data="replicated_data"
                                        style="width: 100%"
                                        v-loading="loading">
                                    <el-table-column
                                            prop="dh_id"
                                            label="Data holder">
                                    </el-table-column>
                                    <el-table-column
                                            label=""
                                            prop="data_set_id">
                                        <template slot-scope="props">
                                            <div class="hexContainer" id="hexContainerID3">
                                                <div v-html="props.row.slika" style="border-radius: 50px; overflow: hidden; padding: 0px; margin: 0px; width: 30px; height: 30px; display: inline-block; background: rgb(1, 109, 142);">

                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="data_set_id"
                                            label="Dataset"
                                            width="300">
                                    </el-table-column>
                                    <el-table-column
                                            prop="offer_id"
                                            label="Offer ID">
                                    </el-table-column>
                                    <el-table-column
                                            prop="status"
                                            label="Status">
                                    </el-table-column>
                                </data-tables>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>

    </div>
</template>

<script>


export default {
  props: ['submitted'],
  name: 'Jobs',
  created() {

  },
  mounted() {
    if (this.submitted) {
      this.$socket.emit('get-holding');
      this.$socket.emit('get-replicated');
      this.$socket.emit('get-bids');
      this.$socket.emit('get-read');

      if (this.holding_data === []) {
        this.loading = true;
      } else {
        this.loading = false;
      }

      if (this.replicated_data === []) {
        this.loading = true;
      } else {
        this.loading = false;
      }

      if (this.read_data === []) {
        this.loading = true;
      } else {
        this.loading = false;
      }

      this.headline = 'Current Bids';
      this.headparagraph = 'This is the overview of the current bids your node has submitted to open offers.';
    }
  },
  sockets: {
    holding(data) {
      this.holding_data = data;
      console.log('Holding data');
      console.log(data);

      this.holding_data.forEach((row, index) => {
        const importIdPerHolding = this.holding_data[index].data_set_id;

        const importIdHash = importIdPerHolding.substring(0, 15);
        const wrapper = document.createElement('div');
        const slikaHTml = jazzicon(30, Web3Utils.hexToNumber(importIdHash));
        wrapper.appendChild(slikaHTml);
        this.holding_data[index].slika = wrapper.innerHTML;

        const colorMapping = {
          0: 'Red',
          1: 'Green',
          2: 'Blue',
        };

        this.holding_data[index].color = colorMapping[this.holding_data[index].color];
        this.holding_data[index].slika = wrapper.innerHTML;

        const lowercase = this.holding_data[index].status.toLowerCase();
        this.holding_data[index].status = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
      });
    },
    replicated(data) {
      this.replicated_data = data;
      console.log('replicated');
      console.log(data);
      this.replicated_data.forEach((row, index) => {
        const importIdPerReplicate = this.replicated_data[index].data_set_id;
        const dvWalletPerReplicate = this.replicated_data[index].id;

        const importIdHash = importIdPerReplicate.substring(0, 15);
        const wrapper = document.createElement('div');
        const slikaHTml = jazzicon(30, Web3Utils.hexToNumber(importIdHash));
        wrapper.appendChild(slikaHTml);
        this.replicated_data[index].slika = wrapper.innerHTML;

        const lowercase = this.replicated_data[index].status.toLowerCase();
        this.replicated_data[index].status = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);

        if (this.replicated_data[index].status === 'ACTIVE') {
          this.active = true;
        }
      });
    },
    bids(data) {
      console.log(data, 'evo ga bids');
      this.bids = data;

      this.bids.forEach((row, index) => {
        const lowerCase = this.bids[index].status.replace('_', ' ').toLowerCase();
        const capitalized = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
        this.bids[index].status = capitalized;
      });
    },
    jobStake(val) {
      this.holding_data.forEach((row, index) => {
        const importIdPerHolding = this.holding_data[index].id;
        if (importIdPerHolding === val.import_id) {
          this.stakedPerJobIndicator = false;
          this.holding_data[index].staked = val.stakedAmount / 1000000000000000000;
        }
      });
    },
    holdingIncome(val) {
      this.holding_data.forEach((row, index) => {
        const importIdPerHolding = this.holding_data[index].id;
        if (importIdPerHolding === val.import_id) {
          this.incomePerJobIndicator = false;
          this.holding_data[index].income = val.holdingIncome / 1000000000000000000;
        }
      });
    },
    purchaseIncome(val) {
      this.holding_data.forEach((row, index) => {
        const importIdPerHolding = this.holding_data[index].id;
        if (importIdPerHolding === val.import_id) {
          this.earnedPerJobIndicator = false;
          this.holding_data[index].earned = val.stakedAmount / 1000000000000000000;
        }
      });
      console.log(val, 'purchase income');
    },
  },
  data() {
    return {
      config: '',
      activeName: 'first',
      active: false,
      ident: '',
      holding_data: [],
      replicated_data: [],
      read_data: [],
      headlineCheck: '',
      headline: '',
      headparagraph: '',
      stakedPerJobIndicator: true,
      incomePerJobIndicator: true,
      earnedPerJobIndicator: true,
      currentBidsIndicator: false,
      bids: [],
      loading: true,
      form: {
        node_wallet: '',
        node_private_key: '',
        node_rpc_ip: '',
        node_port: '',
      },
    };
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },
  methods: {
    handleClick(tab, event) {
      this.headline = tab.label;
      if (tab.label === 'Holding Data') {
        this.headparagraph = 'This is an overview of all your current datasets being held by you for other stakeholders of the ODN testnet. Here you can monitor the specifics of each job and compensation in TRAC that you’ve received for it.';
      } else if (tab.label === 'Pending bids') {
        this.headparagraph = 'This is the overview of the current bids your node has submitted to open offers.';
      } else if (tab.label === 'Replicated Data') {
        this.headparagraph = 'This is an overview of all the datasets you’ve deployed to the ODN testnet to be replicated and stored. Here, you can monitor the cost of your files being stored on the network, ensuring immutability.';
      }
    },
    viewImport(importId) {
      this.$router.push({ name: 'visualisation', params: { importId } });
    },
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style scoped>
    .el-table .cell {
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
    }

    .lead-paragraph {
        height: 78px;
        margin-bottom: 0px;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.5;
        letter-spacing: normal;
        color: #526173;
    }

    .h2-imports {
        font-size: 12px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 2;
        letter-spacing: 3.6px;
        color: #1a4559;
    }

    .second-headline {
        font-size: 36px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.33;
        letter-spacing: normal;
        color: #1a4559;
        margin-bottom: 15px;
    }

    .left-info-block {
        opacity: 0.5;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.14;
        letter-spacing: normal;
        color: #526173;
        border-right: 1px solid #ced2d7;
        margin-top: 4px;
        margin-left: 5px;
    }

    .active-replicate {
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.67;
        letter-spacing: normal;
        color: #1a4559;
        display: flex;
    }

    .active-replicate > img {
        margin-right: 6px;
    }

    .info-block {
        border-radius: 4px;
        background-color: #ffffff;
        border: solid 1px #ced2d7;
        margin: 10px 0;
    }

    .right-block-info {
        font-size: 12px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 2;
        letter-spacing: normal;
        color: #090932;
        margin-left: 14px;
    }

    .jobs {
        font-size: 20px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.2;
        letter-spacing: 6px;
        color: #526173;
        margin-bottom: 15px;
    }

    #hexContainerID > div > svg {
        position: static !important;
        left:inherit;
        height: 30px;
        width: 30px;
    }

    #hexContainerID2 > div > div > svg {
        position: static !important;
        left:inherit;
        height: 30px;
        width: 30px;
    }

    #hexContainerID3 > div > div > svg {
        position: static !important;
        left:inherit;
        height: 30px;
        width: 30px;
    }
</style>
