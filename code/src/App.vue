<template>
  <div id="app">
    <el-container>
      <el-header height="80px">
        <el-row>
          <el-col :xs="18" :md="18" :lg="16" class="topnav" style="margin-left:20px;">
            <el-menu
              :default-active="'1-1'"
              class="el-menu-demo"
              mode="horizontal"
              :show-timeout="50"
              :hide-timeout="50"
              background-color="rgba(0,0,0,.8)"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">供需</template>
                <el-menu-item index="1-1">
                  <router-link to="/gxcn" tag="span">产能</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link to="/gxcl" tag="span">产量</router-link>
                </el-menu-item>
                <el-menu-item index="1-3">库存</el-menu-item>
                <el-menu-item index="1-4">开工率</el-menu-item>
              </el-submenu>
              <el-menu-item index="2">价格</el-menu-item>
              <el-menu-item index="3">进出口</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped lang="less">
#app{
    width: 100%;
    min-height:1100px;
    height: auto;
    background-image: url(./assets/images/jcbg.jpg);
}
.el-menu-item a{
  color:#fff;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  border:1px solid #fff;
}
.bg-purple {
  border:1px solid #fff;
}
.bg-purple-light {
  border:1px solid #fff;
}
.grid-content {
  border:1px solid #fff;
  min-height: 36px;
}
</style>
