<template>
    <div>
        <el-row :gutter="10">
            <el-col :xs="24" :md="12">
              <div class="h500"></div>
              </el-col>
            <el-col :xs="24" :md="12">
              <jck></jck>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :xs="24" :md="12">
                <kucun></kucun>
            </el-col>
            <el-col :xs="24" :md="12">
                <div class="h500"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import kucun from './kucun';
import jck from './jck'
    export default {
        components:{kucun,jck}
    }
</script>

<style scoped>

.el-row{
    margin-bottom:10px;
}
</style>