<template>
    <div class="page-settings">
        <group gutter="0" class="group">
            <cell title="修改密码" is-link @click.native="modifyPwd">
                <img slot="icon" width="24" :src="modifyPwdIcon" class="icon">
            </cell>
            <cell title="分类管理" is-link @click.native="categoryManage">
                <img slot="icon" width="24" :src="categroyIcon" class="icon">
            </cell>
            <cell title="一键回收" is-link @click.native="oneKeyRecycler">
                <img slot="icon" width="24" :src="recyclerIcon" class="icon">
            </cell>
        </group>
        <div class="logout" @click="logout">退出当前账户</div>
    </div>
</template>
<script>
import { Group, Cell } from "vux"
import modPwdIcon from "@/assets/imgs/icon_modify_pwd2.png"
import categroyIcon from "@/assets/imgs/icon_category.png"
import recyclerIcon from "@/assets/imgs/icon_recycler.png"

export default {
    name: "settings",
    components: {
        Group,
        Cell
    },
    data() {
        return {
            modifyPwdIcon: modPwdIcon,
            categroyIcon: categroyIcon,
            recyclerIcon: recyclerIcon
        }
    },
    methods: {
        modifyPwd() {
            this.$vux.toast.text("功能尚未开放...")
        },
        categoryManage() {
            if (this.$store.state.user.loginType === 2) {
                this.$vux.toast.text("无权限，请联系管理员!")
            } else {
                this.$vux.toast.text("功能尚未开放...")
            }
        },
        oneKeyRecycler() {
            if (this.$store.state.user.loginType === 2) {
                this.$vux.toast.text("无权限，请联系管理员!")
            } else {
                this.$vux.toast.text("功能尚未开放...")
            }
        },
        logout() {
            this.$router.replace({ name: "login" })
        }
    }
}
</script>
<style lang="less" scoped>
.page-settings {
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%;
    background: #fafafa;
    .group {
        width: 100%;
        flex: 1;
        /deep/ .weui-cell {
            padding: 16px;
        }
        /deep/ .vux-label {
            color: #333;
            font-size: 14px;
        }
    }
    .icon {
        display: block;
        margin-right: 8px;
    }
    .logout {
        padding: 10px;
        margin: 24px;
        color: white;
        text-align: center;
        font-size: 14px;
        border-radius: 8px;
        background: #ff5f5f;
        &:active {
            background: #e65454;
        }
    }
}
</style>
