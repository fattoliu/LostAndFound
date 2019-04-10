<template>
    <div class="component-uploader">
        <div v-transfer-dom>
            <previewer :list="picList" ref="previewer" :options="options"></previewer>
        </div>
        <div class="fleft">
            <div class="img-card" v-for="(item, index) in picList" :key="index" @click="show(index)">
                <div class="img-layer" @click.stop :style="{transform:`translateY(${item.percent})`}"></div>
                <img class="previewer-demo-img" :src="item.src" @error="loadErrorImg">
                <i class="iconfont icon-close1 i-close" @click.stop="del(index)" v-show="item.percent === '100%'"></i>
            </div>
            <div class="take-photo" @click="upload" v-show="picList.length < numberLimit && !uploading">
                <img src="../assets/imgs/icon_take_photo.png" class="camera">
                <div>添加照片</div>
            </div>
        </div>
        <div v-transfer-dom>
            <actionsheet v-model="showAction" :menus="actionMenu" @on-click-menu="getPicture" show-cancel></actionsheet>
        </div>
    </div>
</template>
<script>
import { Flexbox, FlexboxItem, Actionsheet, Previewer, TransferDom } from "vux"
export default {
    name: "uploader",
    directives: {
        TransferDom
    },
    components: {
        Flexbox,
        FlexboxItem,
        Actionsheet,
        Previewer
    },
    props: {
        value: {
            type: Array,
            default: () => []
        },
        list: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: "上传附件"
        },
        numberLimit: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            uploading: false,
            showAction: false,
            picList: [],
            actionMenu: {
                CAMERA: "拍照",
                PHOTOLIBRARY: "从相册选取"
            },
            options: {
                getThumbBoundsFn(index) {
                    // find thumbnail element
                    let thumbnail = document.querySelectorAll(".previewer-demo-img")[index]
                    // get window scroll Y
                    let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                    // optionally get horizontal scroll
                    // get position of element relative to viewport
                    let rect = thumbnail.getBoundingClientRect()
                    // w = width
                    return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
                    // Good guide on how to get element coordinates:
                    // http://javascript.info/tutorial/coordinates
                }
            }
        }
    },
    created() {
        this.initPic()
    },
    watch: {
        list(val) {
            this.initPic()
        }
    },
    methods: {
        initPic() {
            this.picList = this.list.map(item => {
                return {
                    src: item,
                    percent: "100%"
                }
            })
        },
        loadErrorImg($event) {
            //   $event.target.src = lostImg
        },
        upload() {
            this.showAction = true
        },
        show(index) {
            this.$refs.previewer.show(index)
        },
        del(index) {
            this.picList.splice(index, 1)
            this.value.splice(index, 1)
        },
        getPicture(key) {
            let _this = this
            if (key === "cancel") return
            let file = {
                src: "",
                percent: "0"
            }
            console.log(window.cordovaFile)
            window.cordovaFile.getPicture(key, {
                uploadSuccess: op => {
                    let res = JSON.parse(op.response)
                    _this.value.push(res.id)
                    _this.uploading = false
                },
                uploadProcess: per => {
                    file.percent = per
                },
                uploadFail: () => {
                    _this.uploading = false
                },
                chooseSuccess: fileURI => {
                    file.src = fileURI
                    _this.picList.push(file)
                    _this.uploading = true
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.fleft {
    display: flex;
    padding: 4px;
}
.take-photo {
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    background: #efefef;
    width: 100px;
    height: 100px;
    margin: 4px;
    flex-flow: column;
    .camera {
        width: 24px;
        height: 24px;
        margin-bottom: 4px;
    }
}
.img-card {
    position: relative;
    background: #efefef;
    width: 100px;
    height: 100px;
    overflow: hidden;
    text-align: center;
    margin: 4px;
    vertical-align: -webkit-baseline-middle;

    img {
        display: block;
        width: 100%;
    }

    .img-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(250, 250, 250, 0.5);
        z-index: 10;
        transition: transform3d(0, 0, 0);
    }
    .i-plus {
        font-size: 2rem;
        line-height: 4.4rem;
        color: #cdd1d4;
    }
    .i-close {
        position: absolute;
        top: 0;
        right: 0;
        color: @theme-color;
        font-size: 1.3rem;
        background: rgba(250, 250, 250, 0.5);
    }
}
</style>
