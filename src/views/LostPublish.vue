<template>
    <div class="page-lost-publish">
        <uploader v-model="picIds"></uploader>
        <div class="divider"></div>
        <group gutter="0">
            <x-input title="提交者" v-model="tjzmessage" placeholder="请输入" placeholder-align="right" text-align="right"></x-input>
            <datetime v-model="tjdate" title="提交时间" format="YYYY-MM-DD HH:mm" placeholder="请选择"></datetime>
            <popup-radio title="物品类别" :options="categoryList" v-model="prodtype" placeholder="请选择"></popup-radio>
            <x-textarea :max="200" title="物品描述" v-model="proddes" placeholder="请输入"></x-textarea>
        </group>
        <div class="btn-submit" @click="submit">提交发布</div>
        <div v-transfer-dom>
            <loading :show="loading" text></loading>
        </div>
    </div>
</template>
<script>
import Uploader from "@/components/uploader"
import { XInput, Group, Datetime, PopupRadio, XTextarea, Loading, TransferDomDirective as TransferDom } from "vux"
import { getDictionary } from "@/api/dictionary"
import { publish } from "@/api/lostandfound"

export default {
    name: "lostPublish",
    directives: {
        TransferDom
    },
    components: {
        Uploader,
        XInput,
        Group,
        Datetime,
        PopupRadio,
        XTextarea,
        Loading
    },
    data() {
        return {
            loading: false,
            categoryList: [],
            picIds: [],
            proddes: "",
            tjdate: "",
            prodtype: "",
            tjzmessage: ""
        }
    },
    methods: {
        submit() {
            this.loading = true
            publish({ accountid: this.$store.state.user.accountId, prodimgid: this.picIds.join(","), proddes: this.proddes, tjdate: this.tjdate, prodtype: this.prodtype, tjzmessage: this.tjzmessage })
                .then(result => {
                    this.loading = false
                    // 显示
                    this.$vux.toast.show({
                        text: "提交成功!"
                    })
                })
                .catch(err => {
                    this.loading = false
                    this.$vux.toast.text(err.msg || err.message || err || "未知错误")
                })
        }
    },
    created() {
        getDictionary({ key: "PROD_TYPEID" })
            .then(result => {
                this.categoryList = result
            })
            .catch(err => {
                this.$vux.toast.text(err.msg || err.message || err || "未知错误")
            })
    }
}
</script>
<style lang="less" scoped>
.page-lost-publish {
    background: white;
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%;
    /deep/ .weui-cells,
    .weui-label {
        font-size: 14px;
        color: #333;
    }
    .divider {
        width: 100%;
        height: 8px;
        background: #efefef;
    }
    .btn-submit {
        padding: 10px;
        text-align: center;
        color: white;
        font-size: 14px;
        margin: 24px;
        border-radius: 4px;
        background: #357ce4;
        &:active {
            background: #2869ca;
        }
    }
}
</style>
