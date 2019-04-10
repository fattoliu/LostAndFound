<template>
    <div class="page-details">
        <toolbar :showBack="true" toolbarTitle="物品详情" @onBackPressed="onBackPressed"/>
        <div class="content">
            <img class="img" :src="getUrl()">
            <div class="desc">{{detail.proddes}}</div>
            <div class="status">{{detail.statusNAME}}</div>
            <div class="divider"></div>
            <div class="info">提交人：{{detail.tjzmessage}}</div>
            <div class="info">提交时间：{{detail.tjdate}}</div>
            <div class="info">物品分类：{{detail.prodtypeNAME}}</div>
        </div>
        <div class="buttons">
            <div class="btn factual-collection" v-show="detail.statusid === 1 && loginType === 1" @click="doOperation(5)">事实领取</div>
            <div class="btn recycler" v-show="detail.statusid === 1 && loginType === 1" @click="doOperation(4)">回收处理</div>
            <div class="btn confirm-collection" v-show="detail.statusid === 2 && loginType === 1" @click="doOperation(3)">领取确认</div>
            <div class="btn recall" v-show="detail.statusid === 2 && loginType === 1" @click="doOperation(6)">撤回认领</div>
            <div class="genearch" v-show="detail.statusid === 1 && loginType === 2" @click="doOperation(2)">家长认领</div>
        </div>
        <div v-transfer-dom>
            <loading :show="loading" text></loading>
        </div>
    </div>
</template>
<script>
import Toolbar from "@/components/Toolbar.vue"
import packageInfo from "../../package.json"
import { operation } from "@/api/lostandfound"
import { Loading, TransferDomDirective as TransferDom } from "vux"
export default {
    name: "lost_details",
    directives: {
        TransferDom
    },
    components: {
        Toolbar,
        Loading
    },
    data() {
        return {
            loading: false,
            detail: {},
            loginType: this.$store.state.user.loginType
        }
    },
    methods: {
        onBackPressed() {
            this.$router.go(-1)
        },
        getUrl() {
            if (this.detail.imglist && this.detail.imglist[0]) {
                return packageInfo.server + this.detail.imglist[0].FILEPATH
            }
            return ""
        },
        doOperation(statusId) {
            this.loading = true
            operation({
                prodid: this.$store.state.lost.lostDetail.prodid,
                accountid: this.$store.state.user.accountId,
                statusid: statusId
            })
                .then(result => {
                    this.loading = false
                    this.$vux.toast.show({ text: "操作成功！" })
                    this.$router.go(-1)
                })
                .catch(err => {
                    this.loading = false
                    this.$vux.toast.text(err.msg || err.message || err || "未知错误")
                })
        }
    },
    created() {
        this.detail = this.$store.state.lost.lostDetail
        console.log(this.detail)
    }
}
</script>
<style lang="less" scoped>
.page-details {
    display: flex;
    flex-flow: column;
    background: white;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .content {
        flex: 1;
        overflow: scroll;
        width: 100%;
        padding-bottom: 48px;
        .img {
            width: 100%;
        }
        .desc {
            color: #333;
            padding: 10px;
            font-weight: 500;
            font-size: 18px;
        }
        .divider {
            width: 100%;
            height: 16px;
            background: #efefef;
        }
        .status,
        .info {
            color: #333;
            font-size: 14px;
            padding: 10px;
        }
        .status {
            color: red;
        }
    }

    .buttons {
        width: 100%;
        display: flex;
        align-items: center;
        justify-items: center;
        .btn {
            flex: 1;
            text-align: center;
            color: #333;
            font-size: 14px;
            padding: 12px;
        }
        .btn:nth-child(odd) {
            background: #efefef;
            color: #333;
            &:active {
                background: #e2e2e2;
            }
        }

        .btn:nth-child(even) {
            background: #357ce4;
            color: white;
            &:active {
                background: #2a6bcc;
            }
        }
        .genearch {
            flex: 1;
            text-align: center;
            font-size: 14px;
            padding: 12px;
            background: #357ce4;
            color: white;
            &:active {
                background: #2a6bcc;
            }
        }
    }
}
</style>
