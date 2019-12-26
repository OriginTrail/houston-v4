<template>
    <div class="panel">
        <h1>Manage Wallets
            <el-popover
                    placement="top-start"
                    title="Manage wallets"
                    width="500"
                    trigger="hover"
                    content="The OriginTrail node identity is compatible with the ERC725 standard and utilizes it for key management.

                It distinguishes two different types of keys in the identity contract:
                - The operational wallet, whose private key is stored on the node itself and is used to perform a multitude of operations in the ODN (signing, execution, etc). It requires a small balance of ETH in order to be able to publish transactions to the blockchain, and it can be filled periodically. No TRAC tokens are required for this wallet
                - The management wallet, whose private key is NOT stored on the node and is used to deal with the funds (TRAC rewards) and to manage the keys associated with the ERC725 identity. The management wallet can be any ERC20 supporting wallet (Trezor, Ledger, Metamask etc).
                This approach is taken as a convenience measure to provide for flexibility with key management and to minimize the risk of loosing funds in case of the operational key stored on the node somehow gets compromised.
                You can use this interface to manage your wallets (add/remove both). IMPORTANT NOTE: Only use this interface if you know what you are doing! With improper use, your node can stop operating and you can loose your rewards!">
                <i class="el-icon-info " style="padding-left: 8px" slot="reference"></i>
            </el-popover>
        </h1>
        <span>Add/Remove wallets (Management & Operational)</span>
        <p>Note: You cannot remove a management wallet if you only have one associated with to your node. To change your
            existing management wallet, first add a new one, and then proceed with removing the old wallet.</p>
        <el-form>
            <el-form-item>
                <p class="label-p">Wallet Type to Manage:</p>
                <el-select style="width: 100%" v-model="selected_wallet_type" placeholder="Select" clearable>
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <p class="label-p">Enter Wallet:</p>
                <el-input v-model="walletToAdd"></el-input>
            </el-form-item>

            <el-button style="width: 47%" class="houston-btn" @click="add">ADD WALLET</el-button>
            <el-button style="width: 47%" class="" @click="remove">REMOVE WALLET</el-button>
        </el-form>

    </div>
</template>
<script>
    export default {
        props: ['erc725'],
        mounted() {
            window.eth.accounts().then((result) => {
                this.wallet = result[0];
            });
        },
        data() {
            return {
                options: [
                    {value: 'mv', label: 'Management Wallet'},
                    {value: 'ov', label: 'Operational Wallet'},
                ],
                selected_wallet_type: 'mv',
                walletToAdd: '',
                wallet: '',
            };
        },
        methods: {
            add() {
                const ercContract = window.eth.contract(window.erc725Abi).at(this.erc725);
                const arr = (this.selected_wallet_type === 'mv') ? [1, 2, 3, 4] : [2, 4];
                const keccakContract = window.eth.contract(window.keccakAbi).at(window.keccakAddress);
                keccakContract.keccakAddress(this.walletToAdd)
                    .then((walletToAdd) => {
                        ercContract.addKey(walletToAdd[0], arr, 1,
                            {from: this.wallet})
                            .then(async (hash) => {
                                window.EventBus.$emit('loading');
                                await window.Utilities.getTransactionReceipt(hash);
                                window.EventBus.$emit('loading-done');
                            });
                    });
            },
            remove() {
                const ercContract = window.eth.contract(window.erc725Abi).at(this.erc725);
                const keccakContract = window.eth.contract(window.keccakAbi).at(window.keccakAddress);
                keccakContract.keccakAddress(this.walletToAdd)
                    .then((walletToRemove) => {
                        console.log(walletToRemove, 'wallet to remove');
                        ercContract.removeKey(walletToRemove['0'],
                            {from: this.wallet})
                            .then(async (hash) => {
                                window.EventBus.$emit('loading');
                                await window.Utilities.getTransactionReceipt(hash);
                                window.EventBus.$emit('loading-done');
                            });
                    });
            },
        },
    };
</script>
<style>
    .full {
        width: 100%;
    }

    .el-select-dropdown__item {
        font-family: 'Roboto', Arial, sans-serif;
    }
</style>
