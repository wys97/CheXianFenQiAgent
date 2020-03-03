<template>
  <div class="container">
    <!-- <div ref="lookImgBox" class="look_img_box">
      <div ref="rotateImg" class="look_img_img" :style="{backgroundImage:'url('+lookImgSrc+')'}"></div>
      <div class="rotateBtnRow">
        <div class="rotateBtn">
          <i class="iconfont icon-rotate-left"></i>
        </div>
        <div class="rotateBtn">
          <i class="iconfont icon-rotate-right"></i>
        </div>
      </div>
    </div>-->
    <div class="top">
      <ul class="flex-item">
        <li></li>
        <li>申请时间：</li>
      </ul>
      <div class="flex-item" style="text-align: right;padding-top: 0;">
        <span>原因：</span>
        <el-button size="mini"></el-button>
      </div>
    </div>
    <div class="content">
      <div class="flex-item" style="position: relative; ">
        <el-tabs type="card">
          <el-tab-pane label="基本信息">
            <div style="padding-left:100px; padding-top:30px">分期申请信息</div>
            <el-form ref="form" label-width="120px" style="margin-left:120px" size="mini">
              <el-form-item label="还款人名称：">
                <span>2222</span>
              </el-form-item>
              <el-form-item label="业务单号：">
                <span>2222</span>
                <el-button type="primary" size="mini" @click="goViewDetails">详情</el-button>
              </el-form-item>
              <el-form-item label="分期期数：">
                <span>2222</span>
              </el-form-item>
              <el-form-item label="产品名称：">
                <span>2222</span>
              </el-form-item>
              <el-form-item label="当期应还金额：">
                <span>2222</span>
              </el-form-item>
              <el-form-item label="逾期天数：">
                <span>2222</span>
              </el-form-item>
              <el-form-item label="逾期金额：">
                <span>2222</span>
              </el-form-item>
            </el-form>
            <hr width='80%'/>
             <div style="padding-left:100px; padding-top:30px">催收信息</div>
            <el-form ref="form" label-width="120px" style="margin-left:120px" size="mini">
              <el-form-item label="催收人员：">
                <span>2222</span>
              </el-form-item>
              <el-form-item label="跟进方式：">
                <span>2222</span>
              </el-form-item>
              <el-form-item label="催收日期：">
                <span>2222</span>
              </el-form-item>
              <el-form-item label="逾期原因：">
                <span>2222</span>
              </el-form-item>
              
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!--左侧操作栏-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Upload from "@/components/Upload/Upload";
import Uploads from "@/components/Upload/Uploads";
import NoteChart from "@/components/charts/noteChart";
import PieChart from "@/components/charts/pieChart";

import baseUtil from "@/utils/baseUtil";
import { validContent } from "@/utils/validate";
import { Format } from "@/utils/index";

export default {
  name: "newApplication",
  data() {
    return {
      supplierId: "", // 商户id

      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      "roleHasPermissions", // 用户权限list
      "tableMaxHeight"
    ])
  },

  watch: {},

  created() {
    this.supplierId = this.$route.params.id;
  },
  mounted() {},
  methods: {
      goViewDetails(){
             this.$router.push({path:'/supplierMaintainDetail/'+ 1})
      }

  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container {
  background: #fff;
  height: 100%;
  font-size: 14px;
}
.top {
  padding: 0 30px;
}
.title {
  text-align: right;
  margin: 5px 0;
}
.contents {
  padding: 4px 8px;
  border-radius: 4px;
  background: #cccccc;
  margin: 5px 0;
}
</style>
