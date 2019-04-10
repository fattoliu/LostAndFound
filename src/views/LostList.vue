<template>
    <div class="page-lost-list">
        <div class="filter-header">
            <Dropdown trigger="click" class="item" @on-click="selectCategory">
                <div>
                    {{category}}
                    <Icon type="ios-arrow-down"></Icon>
                </div>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="item in categoryList" :name="item.value">{{item.value}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown trigger="click" class="item" @on-click="selectStatus">
                <div>
                    {{status}}
                    <Icon type="ios-arrow-down"></Icon>
                </div>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="item in statusList" :name="item.value">{{item.value}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown trigger="click" class="item" @on-click="selectTime">
                <div>
                    {{time}}
                    <Icon type="ios-arrow-down"></Icon>
                </div>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="item in timeList" :name="item.value">{{item.value}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div class="divider"></div>
        <ul class="list-content">
            <li class="list-item" v-for="(item, index) in lostList" :key="index" @click="toDetail(item)">
                <div class="top">
                    <div class="code">编号: {{item.prodncode}}</div>
                    <div class="state">{{item.statusNAME}}</div>
                </div>
                <div class="bottom">
                    <img :src="getUrl(item)" alt class="lost-img">
                    <div class="info">
                        <div class="desc">{{item.proddes}}</div>
                        <div class="date">{{item.tjdate}}</div>
                    </div>
                </div>
                <div class="list-divider"></div>
            </li>
        </ul>
        <div v-transfer-dom>
            <loading :show="loading" text></loading>
        </div>
    </div>
</template>
<script>
import arrowIcon from "@/assets/imgs/icon_arrow_down.png"
import { create } from "domain"
import { getDictionary } from "@/api/dictionary"
import { getLostAndFoundList } from "@/api/lostandfound"
import packageInfo from "../../package.json"
import { mapMutations } from "vuex"
import { Loading, TransferDomDirective as TransferDom } from "vux"
export default {
    name: "lostList",
    computed: {},
    directives: {
        TransferDom
    },
    components: {
        Loading
    },
    data() {
        return {
            loading: false,
            arrowIcon: arrowIcon,
            showCategory: false,
            showStatus: false,
            showDate: false,
            lostList: [],
            categoryList: [],
            statusList: [
                {
                    key: "",
                    value: "全部状态"
                },
                {
                    key: "1",
                    value: "提交"
                },
                {
                    key: "2",
                    value: "认领"
                },
                {
                    key: "3",
                    value: "领取"
                },
                {
                    key: "4",
                    value: "回收"
                },
                {
                    key: "5",
                    value: "事实领取"
                }
            ],
            timeList: [
                {
                    key: "",
                    value: "全部时间"
                },
                {
                    key: "1",
                    value: "最近一周"
                },
                {
                    key: "2",
                    value: "最近一个月"
                },
                {
                    key: "3",
                    value: "最近三个月"
                },
                {
                    key: "4",
                    value: "最近六个月"
                },
                {
                    key: "5",
                    value: "最近一年"
                }
            ],
            categoryKey: "",
            statusKey: "",
            timeKey: "",
            category: "全部类型",
            status: "全部状态",
            time: "全部时间",
            pageIndex: 1
        }
    },
    methods: {
        ...mapMutations(["setLostDetail"]),
        toDetail(item) {
            if (this.$store.state.user.accountId) {
                this.$store.commit("setLostDetail", item)
                this.$router.push({ name: "lostDetails", params: { code: item.prodncode } })
            } else {
                this.$router.push({ name: "login", query: { verify: true } })
            }
        },
        getUrl(item) {
            if (item.imglist && item.imglist[0]) {
                return packageInfo.server + item.imglist[0].FILEPATH
            }
            return ""
        },
        selectCategory(name) {
            this.pageIndex = 1
            this.category = name
            this.categoryList.forEach(element => {
                if (element.value === name) {
                    this.categoryKey = element.key
                }
            })
            this.getList()
        },
        selectStatus(name) {
            this.pageIndex = 1
            this.status = name
            this.statusList.forEach(element => {
                if (element.value === name) {
                    this.statusKey = element.key
                }
            })
            this.getList()
        },
        selectTime(name) {
            this.pageIndex = 1
            this.time = name
            this.timeList.forEach(element => {
                if (element.value === name) {
                    this.timeKey = element.key
                }
            })
            this.getList()
        },
        getList() {
            this.loading = true
            getLostAndFoundList({
                prodtype: this.categoryKey,
                timetype: this.timeKey,
                statusid: this.statusKey,
                page: this.pageIndex,
                rows: 20
            })
                .then(result => {
                    this.loading = false
                    this.pageIndex++
                    console.log(result)
                    this.lostList = result.rows
                })
                .catch(err => {
                    this.loading = false
                    this.pageIndex--
                    this.showLoading = false
                    this.$vux.toast.text(err.msg || err.message || err || "未知错误")
                })
        }
    },
    created() {
        this.categoryKey = this.$route.params.category == 0 ? "" : this.$route.params.category
        this.statusKey = this.$route.params.status == 0 ? "" : this.$route.params.status
        this.timeKey = this.$route.params.time == 0 ? "" : this.$route.params.time
        getDictionary({ key: "PROD_TYPEID" })
            .then(result => {
                this.categoryList = result
                this.categoryList.forEach(item => {
                    if (item.key === this.categoryKey) {
                        if (item.key === "") {
                            item.value = "全部类型"
                        }
                        this.category = item.value
                    }
                })
            })
            .catch(err => {
                this.$vux.toast.text(err.msg || err.message || err || "未知错误")
            })
        this.statusList.forEach(item => {
            if (item.key === this.statusKey) {
                this.status = item.value
            }
        })
        this.timeList.forEach(item => {
            if (item.key === this.timeKey) {
                this.time = item.value
            }
        })

        this.getList()
    }
}
</script>
<style lang="less" scoped>
.page-lost-list {
    display: flex;
    flex-flow: column;
    background: #fafafa;
    .filter-header {
        background: #efefef;
        display: flex;
        flex-flow: row;
        align-items: center;
        align-content: center;
        justify-items: center;
        .item {
            padding: 8px;
            text-align: center;
            color: #052e6b;
            font-size: 12px;
            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: center;
            background: transparent;
            flex: 1;
            /deep/ .ivu-icon-ios-arrow-down {
                margin-left: 8px;
            }
        }
    }
    .divider {
        width: 100%;
        height: 1px;
        background: #ddd;
        transform: scaleY(0.5);
    }
    .list-content {
        overflow: scroll;
        flex: 1;
        .list-item {
            display: flex;
            flex-flow: column;
            background: white;
            .top {
                display: flex;
                align-items: center;
                margin: 10px 10px 0px 10px;
                box-sizing: border-box;

                .code {
                    flex: 1;
                }
            }
            .bottom {
                box-sizing: border-box;

                display: flex;
                flex-flow: row;
                flex-wrap: nowrap;
                margin: 10px;
                .lost-img {
                    width: 30vw;
                    background: #efefef;
                    border: 0;
                    height: 20vw;
                    object-fit: cover;
                }
                .info {
                    align-content: center;
                    margin: 10px;
                    flex: 4;
                    display: flex;
                    flex-flow: column;
                    .desc {
                        flex: 2;
                    }
                    .date {
                        flex: 1;
                        display: flex;
                        align-items: flex-end;
                    }
                }
            }
            .list-divider {
                width: 100%;
                height: 1px;
                background: #ddd;
                transform: scaleY(0.5);
            }
            &:active {
                background: #fafafa;
            }
        }
    }
}
</style>
