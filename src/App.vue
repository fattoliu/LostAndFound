<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "app",
    created() {}
}
</script>
<style lang="less">
@import "~vux/src/styles/reset.less";
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
* {
    padding: 0;
    margin: 0;
}
ul,
li {
    list-style: none;
}
</style>
