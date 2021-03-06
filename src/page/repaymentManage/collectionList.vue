<template>
  <div class="page-container" ref="page-container" id="page-container">
    <!---还款列表--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="业务单号：" prop="enterpriseName">
          <el-input v-model="listQuery.enterpriseName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="还款人名称：" prop="businessLicenseNo">
          <el-input v-model="listQuery.businessLicenseNo" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="还款人手机号：" prop="repreName">
          <el-input v-model="listQuery.repreName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="产品名称：" prop="repreMobile">
          <el-input v-model="listQuery.repreMobile" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="催收人员：" prop="repreMobile">
          <el-input v-model="listQuery.repreMobile" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="逾期状态：" class="query-select" prop="customerType">
          <el-select v-model="listQuery.customerType" style="width:110px;">
            <el-option label="全部" value></el-option>
            <el-option
              v-if="customerTypeListData"
              v-for="(val,key) in customerTypeListData"
              :label="val"
              :value="key"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" size="mini" type="primary" icon="el-icon-search">查询</el-button>
          <el-button
            @click="resetForm('listQueryForm')"
            size="mini"
            type="primary"
            icon="el-icon-refresh"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
   
    <el-table :data="list" @current-change="handleSelectionChange" highlight-current-row max-height='600'>
      <el-table-column prop="applySerialNo" width="200" label="业务单号"></el-table-column>

      <el-table-column prop="repreName" label="期数"></el-table-column>
      <el-table-column prop="repreName" label="还款人（被保人）"></el-table-column>

     
      <el-table-column prop="creditLineTimeLimit" label="还款人手机号"></el-table-column>
      <el-table-column prop="creditLineTimeLimit" label="催收人员"></el-table-column>

      <el-table-column prop="creditLineUse" label="当期应还金额"></el-table-column>
      <el-table-column prop="creditLineUse" label="逾期天数"></el-table-column>
      <el-table-column prop="creditLineUse" label="逾期金额"></el-table-column>
      <el-table-column prop="creditLineUse" label="跟进方式"></el-table-column>
      <el-table-column prop="creditLineUse" label="催收时间"></el-table-column>

      <el-table-column prop="customerSource" label="逾期状态">
      </el-table-column>
      <el-table-column label="操作" width="122" align="center">
        <template slot-scope="scope">
          <router-link :to="'supplierDetail/' + scope.row.supplierId" class="router-link">查看</router-link>
        </template>
      </el-table-column>
    </el-table>
    
    <div class="pagination-container" ref="pagination-container" id="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentPage"
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  handleSelectionChange,
  handleSizeChange,
  handleCurrentPage
} from "@/utils/common";
import {
  getListData,
  getRegisterStatusList,
  supplierGrade,
  supplystatusList
} from "@/api/supplierMaintain/supplierMaintainList";
import { customerType } from "@/api/common";
import { Format } from "@/utils/index";

export default {
  name: "SupplierRegister",
  filters: {
    filterStatus: function(value) {
      if (value === "PASS") {
        return "suc";
      } else if (value === "REJECT") {
        return "fail";
      }
    }
  },
  data() {
    return {
      registerStatusList: "", //入驻阶段下拉
      supplierGradeList: "", //供应商评级-下拉列表
      supplystatusListData: "", //资料明细-列表-状态下拉
      customerTypeListData: "", //客户类型下拉
      list: [
      
      ],
      total: 0, // 表格数据总条数
      listQuery: {
        // 查询参数
        page: 1,
        limit: 30,
        enterpriseName: "", // 企业名
        businessLicenseNo: "", // 信用代码
        repreName: "", // 法定代表人姓名
        repreMobile: "", // 手机号码
        status: "", // 状态
        customerType: ""
      },
      shipDate: [], // 时间范围
      yesterday: new Date().getTime() - 24 * 60 * 60 * 1000,
      selectedData: "", // 选中某一行的数据
      handleSelectionChange: handleSelectionChange.bind(this),
      handleSizeChange: handleSizeChange.bind(this),
      handleCurrentPage: handleCurrentPage.bind(this)
    };
  },
  computed: {
    ...mapGetters([
      "roleHasPermissions", // 用户权限list
      "tableMaxHeight"
    ])
  },
  watch: {
    shipDate(val, oldVal) {
      let that = this;
      if (val[0]) {
        that.listQuery.beginCreateTime = Format(val[0], "yyyy-MM-dd");
      } else {
        that.listQuery.beginCreateTime = "";
      }
      if (val[1]) {
        that.listQuery.endCreateTime = Format(val[1], "yyyy-MM-dd");
      } else {
        that.listQuery.endCreateTime = "";
      }
    }
  },
  created() {},
  mounted() {
    this.getList();
    this.getRegisterStatusList(); //获取入驻阶段下拉
    this.getSupplierGrade(); //供应商评级-下拉列表
    this.getSupplystatusList(); //资料明细-列表-状态下拉
    this.getCustomerTypeList(); //客户类型
    setTimeout(() => {
      this.$store.dispatch("SetTableMaxHeight");
    }, 500);
  },
  methods: {
    getRegisterStatusList() {
      getRegisterStatusList().then(res => {
        if (res.data.code === "200") {
          this.registerStatusList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getSupplierGrade() {
      supplierGrade().then(res => {
        if (res.data.code === "200") {
          this.supplierGradeList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getSupplystatusList() {
      supplystatusList().then(res => {
        if (res.data.code === "200") {
          this.supplystatusListData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getCustomerTypeList() {
      //客户类型
      customerType().then(res => {
        if (res.data.code === "200") {
          this.customerTypeListData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getList() {
      getListData(this.listQuery).then(res => {
        if (res.data.code === "200") {
          const listData = res.data.data.list;
          this.total = res.data.data.total;
          this.list = listData;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    search() {
      let that = this;
      that.getList();
    }, //查询
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.shipDate = [];
    } //重置表单
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.total-container {
  > span {
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid #ccc;
    &:last-of-type {
      border-right: none;
    }
  }
}
.router-link {
  display: block;
  color: #409eff;
}
</style>

