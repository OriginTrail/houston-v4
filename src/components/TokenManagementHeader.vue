<template>
    <div>
        <el-row>
            <el-col :span="12" class="text-left">
                <h1 class="token-mng-headline">Token Management</h1>
                <p class="regular-text">To manage tokens and ETH, for your node use the interface below. Additionally, you can add or change your management wallet using the "Manage Wallets" interface below.</p>
                <p class="bold-text">Note that performing actions on this page requires you to connect your management wallet via Metamask and spend a small amount of ETH, as it will interact with Ethereum smart contracts.</p>
            </el-col>
        </el-row>
    </div>
</template>
<script>

</script>
<style>
    #app{
        height: 100%;
    }
</style>
<style scoped>

    .regular-text{
        font-family: Roboto;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.6;
        letter-spacing: normal;
        color: #131415;
    }
    .bold-text{
        font-family: Roboto;
        font-size: 20px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.6;
        letter-spacing: normal;
        color: #131415;
    }
    .text-left{
        text-align: left;
    }
    .token-mng-headline{
        font-family: Roboto;
        font-size: 46px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.17;
        letter-spacing: normal;
    }
</style>
