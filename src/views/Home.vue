<template>
    <div class="page-home">
        <router-view />
        <tabbar>
            <tabbar-item selected>
                <img
                    slot="icon"
                    src="../assets/imgs/icon_publish_normal.png"
                >
                <img
                    slot="icon-active"
                    src="../assets/imgs/icon_publish.png"
                >
                <span slot="label">发布</span>
            </tabbar-item>
            <tabbar-item>
                <img
                    slot="icon"
                    src="../assets/imgs/icon_list_normal.png"
                >
                <img
                    slot="icon-active"
                    src="../assets/imgs/icon_list.png"
                >
                <span slot="label">列表</span>
            </tabbar-item>
            <tabbar-item>
                <img
                    slot="icon"
                    src="../assets/imgs/icon_setting_normal.png"
                >
                <img
                    slot="icon-active"
                    src="../assets/imgs/icon_setting.png"
                >
                <span slot="label">设置</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
    name: 'home',
    components: {
        Tabbar,
        TabbarItem
    }
}
</script>
<style lang="less" scoped>
.page-home {
    /deep/ .weui-tabbar {
        flex: 1;
        padding: 4px;
        margin-top: 4px;
        background: white;
        box-shadow: 0px 1px 5px #e7e7e7;
        /deep/ .weui-tabbar__label {
            font-size: 14px;
        }
    }
    /deep/ .weui-tabbar:before {
        border-top: none;
        color: transparent;
        height: 0px;
    }
}
</style>
