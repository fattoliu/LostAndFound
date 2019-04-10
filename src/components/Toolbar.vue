<template>
    <div class="toolbar">
        <img :class="{'icon-menu':true, 'icon-show': showBack, 'icon-hidden':!showBack}" :src="backIcon" alt @click="onBackPressed">
        <div class="toolbar-title">{{toolbarTitle}}</div>
        <img :class="{'icon-menu':true, 'small':true, 'icon-hidden': !showSearch}" :src="searchIcon" alt @click="onSearchPressed">
    </div>
</template>
<script>
import icon_back from "@/assets/imgs/icon_back.png"
import icon_search from "@/assets/imgs/icon_share.png"

export default {
    name: "toolbar",
    props: {
        showBack: {
            type: Boolean,
            default: true
        },
        showSearch: {
            type: Boolean,
            default: false
        },
        toolbarTitle: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            backIcon: icon_back,
            searchIcon: icon_search
        }
    },
    methods: {
        onSearchPressed() {
            this.$emit("onSearchPressed")
        },
        onBackPressed() {
            this.$emit("onBackPressed")
        }
    }
}
</script>
<style lang="less" scoped>
.toolbar {
    background: #367ce4;
    width: 100vw;
    height: 50px;
    display: flex;
    align-items: center;
    box-shadow: 0px 1px 5px #888;
    z-index: 1;
    .icon-menu {
        height: 100%;
    }
    .small {
        width: 24px;
        height: 24px;
        margin-right: 16px;
    }
    .icon-show {
        visibility: visible;
    }
    .icon-hidden {
        visibility: hidden;
    }
    .toolbar-title {
        font-size: 16px;
        line-height: 16px;
        height: 16px;
        flex: 1;
        color: white;
        text-align: center;
    }
}
</style>
