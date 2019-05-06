<template>
    <div class="page-home">
        <toolbar ref="toolbar" :showBack="false" :toolbarTitle="title" :showSearch="showSearchIcon()" @onSearchPressed="generateAndCopyUrl"/>
        <!-- 单页面内路由 view -->
        <router-view class="content-container" ref="content"/>
        <!-- 底部导航栏 -->
        <tabbar @on-index-change="updateTitle">
            <tabbar-item v-show="allowPublish" :link="publishLink">
                <img slot="icon" src="../assets/imgs/icon_publish_normal.png">
                <img slot="icon-active" src="../assets/imgs/icon_publish.png">
                <span slot="label">发布</span>
            </tabbar-item>
            <tabbar-item selected :link="listLink">
                <img slot="icon" src="../assets/imgs/icon_list_normal.png">
                <img slot="icon-active" src="../assets/imgs/icon_list.png">
                <span slot="label">列表</span>
            </tabbar-item>
            <tabbar-item :link="settingsLink">
                <img slot="icon" src="../assets/imgs/icon_setting_normal.png">
                <img slot="icon-active" src="../assets/imgs/icon_setting.png">
                <span slot="label">设置</span>
            </tabbar-item>
        </tabbar>
        <div v-transfer-dom>
            <loading :show="loading" :text="loadgingMsg"></loading>
        </div>
    </div>
</template>
<script>
import { Tabbar, TabbarItem, Loading, TransferDomDirective as TransferDom } from "vux"
import Toolbar from "@/components/Toolbar.vue"
import packageInfo from "../../package.json"
import { getShortUrl } from "@/api/lostandfound"
export default {
    name: "home",
    directives: {
        TransferDom
    },
    components: {
        Tabbar,
        TabbarItem,
        Toolbar,
        Loading
    },
    data() {
        return {
            shorturl: "",
            timerId: 0,
            loadgingMsg: "加载中...",
            loading: false,
            title: "",
            allowPublish: this.$store.state.user.loginType === 1,
            publishLink: {
                name: "lostPublish"
            },
            listLink: {
                name: "lostList",
                params: {
                    category: 0,
                    status: 0,
                    time: 0
                }
            },
            settingsLink: {
                name: "settings"
            }
        }
    },
    methods: {
        updateTitle(value) {
            if (value === 0) {
                this.title = "失物发布"
            } else if (value === 1) {
                this.title = "失物列表"
            } else if (value === 2) {
                this.title = "设置"
            }
        },

        /**
         * 生成短链接，并且复制到剪切板
         */
        generateAndCopyUrl() {
            let category = this.$refs.content.categoryKey === "" ? 0 : this.$refs.content.categoryKey
            let status = this.$refs.content.statusKey === "" ? 0 : this.$refs.content.statusKey
            let time = this.$refs.content.timeKey === "" ? 0 : this.$refs.content.timeKey
            let targetUrl
            var filePrifx = "file:///"
            if (location.href.startsWith(filePrifx)) {
                targetUrl = packageInfo.server + location.href.slice(filePrifx.length, location.href.length - 5) + category + "/" + status + "/" + time
            } else {
                targetUrl = location.href.slice(0, location.href.length - 5) + category + "/" + status + "/" + time
            }
            this.loadgingMsg = "正在生成分享链接..."
            this.loading = true
            // 开启定时轮询检测 short url 的值， 500 毫秒执行一次，直到交易返回该值，然后进行复制操作
            this.timerId = window.setInterval(() => {
                // 有值时才进行复制操作
                if (this.shorturl !== "") {
                    this.$copyText(this.shorturl).then(
                        () => {
                            // 复制成功后，清除定时轮询任务
                            this.clearInterval()
                            this.shorturl = ""
                            this.$vux.toast.show({
                                text: "链接已复制至剪切板！"
                            })
                        },
                        () => {
                            // 复制失败，记得清除定时轮询任务
                            this.clearInterval()
                            this.shorturl = ""
                            this.$vux.toast.text("复制失败，请重试...")
                        }
                    )
                }
            }, 500)
            // 向服务器发起生成短链接请求
            getShortUrl({ geturl: targetUrl })
                .then(result => {
                    this.loading = false
                    let obj = JSON.parse(result.returnurl)
                    if (obj.urls && obj.urls[0] && obj.urls[0].url_short) {
                        this.shorturl = obj.urls[0].url_short
                    } else {
                        this.$vux.toast.text("分享链接生成失败！")
                    }
                })
                .catch(err => {
                    this.loading = false
                    this.$vux.toast.text(err.msg || err.message || err || "未知错误")
                })
        },
        clearInterval() {
            window.clearInterval(this.timerId)
        },
        showSearchIcon() {
            return this.$store.state.route.name === "lostList"
        }
    }
}
</script>
<style lang="less" scoped>
.page-home {
    display: flex;
    flex-flow: column;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .content-container {
        flex: 1;
    }
    /deep/ .weui-tabbar {
        position: relative;
        background: white;
        box-shadow: 0px 1px 5px #e7e7e7;
        .weui-tabbar__item {
            padding: 8px;
        }
        /deep/ .weui-tabbar__icon {
            width: 22px;
            height: 22px;
            margin-bottom: 4px;
        }
        /deep/ .weui-tabbar__label {
            font-size: 12px;
            line-height: 12px;
            margin-top: 4px;
        }
    }
    /deep/ .weui-tabbar:before {
        border-top: none;
        color: transparent;
        height: 0px;
    }
}
</style>
