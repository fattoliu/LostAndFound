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
            <div class="info">认领人：{{detail.name}}</div>
        </div>
        <div class="buttons">
            <div class="btn factual-collection" v-show="detail.statusid === 1 && loginType === 1" @click="doOperation(5)">事实领取</div>
            <div class="btn recycler" v-show="detail.statusid === 1 && loginType === 1" @click="doOperation(4)">回收处理</div>
            <div class="btn confirm-collection" v-show="detail.statusid === 2 && loginType === 1" @click="doOperation(3)">领取确认</div>
            <div class="btn recall" v-show="detail.statusid === 2 && loginType === 1" @click="doOperation(6)">撤回认领</div>
            <div class="genearch" v-show="detail.statusid === 1 && (loginType === 2 || loginType === -1)" @click="showToast = true">家长认领</div>
        </div>
        <div v-transfer-dom>
            <loading :show="loading" text></loading>
        </div>
        <div v-transfer-dom>
            <x-dialog class="dialog-demo" :show="showToast">
                <div class="dialog-container">
                    <div class="title">信息填写</div>
                    <input class="input-info" placeholder="请输入姓名" v-model="name">
                    <input class="input-info" placeholder="请输入手机号码" v-model="mobile">

                    <div class="buttons">
                        <div class="cancel" @click="showToast = false">取消</div>
                        <div class="ok" @click="doOperation(2)">提交</div>
                    </div>
                </div>
            </x-dialog>
        </div>
    </div>
</template>
<script>
import Toolbar from "@/components/Toolbar.vue"
import packageInfo from "../../package.json"
import { operation } from "@/api/lostandfound"
import { Loading, XDialog, TransferDomDirective as TransferDom } from "vux"
export default {
    name: "lost_details",
    directives: {
        TransferDom
    },
    components: {
        XDialog,
        Toolbar,
        Loading
    },
    data() {
        return {
            showToast: false,
            loading: false,
            detail: {},
            loginType: this.$store.state.user.loginType,
            name: "",
            mobile: ""
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
                statusid: statusId,
                name: this.name,
                mobile: this.mobile
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
        // 如果用户信息存在，说明登录过，否则为游客，只能认领
        if (this.$store.state && this.$store.state.user && this.$store.state.user.loginType) {
            this.loginType = this.$store.state.user.loginType
        } else {
            this.loginType = -1
        }
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
.dialog-container {
    padding: 16px;
    display: flex;
    flex-flow: column;
    .title {
        font-size: 18px;
        color: #333;
        font-weight: 500;
        text-align: left;
        margin-bottom: 10px;
    }
    .input-info {
        background: #f4fbff;
        outline: none;
        border: 1px solid #edf8ff;
        padding: 10px;
        margin-bottom: 10px;
        font-size: 14px;
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .cancel {
            color: #999;
            padding: 8px 16px;
            font-size: 14px;
            &:active {
                background: #f4fbff;
                border-radius: 4px;
            }
        }
        .ok {
            color: #2a6bcc;
            padding: 8px 16px;
            font-size: 14px;
            &:active {
                background: #f4fbff;
                border-radius: 4px;
            }
        }
    }
}
</style>
