<template>
  <div class="page-container" ref="page-container" id="page-container" style="padding-top: 30px;overflow-y: auto;">
    <!---商户管理-商户入驻--->
    <h2 class="centerTitle">欢迎使用车险分期代理商管理后台!</h2>

    <el-dialog
      :visible.sync="loginUserInfo.firstLogin"
      title="首次登录需要修改密码"
      width="30%"
      center>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="新密码">
          <el-input type="password" v-model="formLabelAlign.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码">
          <el-input type="password" v-model="formLabelAlign.confirmPassword"></el-input>
        </el-form-item>
        <p v-show="passwordShow">两次密码不一致,请重新输入!</p>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisiblePull">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisibleSubmit">提 交</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import homeApi from '@/api/home/homeDetail'
  import NoteChart from '@/components/charts/noteChart'
  import loginInfo from '@/api/user'

  export default {
    name: 'Home',
    components: {NoteChart},
    data() {
      return {

        updatePassWord: '',
        labelPosition: 'right',
        formLabelAlign: {
          newPassword: '',
          confirmPassword: '',
        },
        centerDialogVisible: false,         //修改密码弹窗
        loginUserInfo: '',
        passwordShow: false,


        backlogData: {},//待办事项
        statisticsData: {},//数据统计
        collectionStatisticsData: {},//代收统计
        overdueStatisticalData: {},//逾期统计
        collectionData: '',//回款数据
        loanData: '',//放款数据
      }
    },

    watch: {
      collectionData(val) {
        this.collectionData = val;
      },
      loanData(val) {
        this.loanData = val;
      },

    },
    mounted() {
      this.getUserInfo()

    },
    methods: {
      getBacklogData() {//获取待办事项
        let that = this;
        homeApi.backlog().then(res => {
          if (res.data.code === '200') {
            that.backlogData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getStatisticsData() {//获取数据统计
        let that = this;
        homeApi.dataStatistics().then(res => {
          if (res.data.code === '200') {
            that.statisticsData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getCollectionStatisticsData() {//获取代收统计
        let that = this;
        homeApi.collectionStatistics().then(res => {
          if (res.data.code === '200') {
            that.collectionStatisticsData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getOverdueStatisticalData() {//获取逾期统计
        let that = this;
        homeApi.overdueStatistical().then(res => {
          if (res.data.code === '200') {
            that.overdueStatisticalData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getCollectionData() {//获取回款数据
        let that = this;
        homeApi.collectionData().then(res => {
          if (res.data.code === '200') {
            that.collectionData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getLoanData() {//获取放款数据
        let that = this;
        homeApi.loanData().then(res => {
          if (res.data.code === '200') {
            that.loanData = res.data.data;
            // console.log(that.loanData)
          } else {
            this.$message.error(res.data.message)
          }
        })
      },


      // 获取用户信息
      getUserInfo() {
        loginInfo.getUserInfo().then((res) => {
          if (res.data.code === '200') {
            let loginUserInfo = res.data.data
            this.loginUserInfo = loginUserInfo
            // console.log(res.data.data)
            // console.log(this.loginUserInfo.firstLogin)
            if (this.loginUserInfo.firstLogin) {
              // 如果用户是第一次登录, 将用户的状态修改不是首次登录
              loginInfo.UpdateLoginStatus().then(res => {
                if (res.data.code === '200') {
                  console.log('user status update successful');
                } else {
                  this.$message.error(res.data.message);
                }
              })
            }
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(() => {
        })
      },


      //点击取消
      centerDialogVisiblePull() {
        this.loginUserInfo.firstLogin = false;
      },


      //弹窗修改密码
      centerDialogVisibleSubmit() {
        let data = this.formLabelAlign
        if (this.formLabelAlign.newPassword !== this.formLabelAlign.confirmPassword) {
          this.passwordShow = true
        } else {
          loginInfo.updatePassword(data).then(res => {
            if (res.data.code === '200') {
              this.$message.success(res.data.message)
              this.loginUserInfo.firstLogin = false
              // this.$router.push('/')
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(() => {
          })
        }
      },

    },
    created() {
      let that = this;
      // that.getBacklogData();
      // that.getStatisticsData();
      // that.getCollectionStatisticsData();
      // that.getOverdueStatisticalData();
      // that.getCollectionData();
      // that.getLoanData();
    },

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .centerTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 200px;

  }

  .h_top {
    background-color: #F8F8F8;
    border: 1px solid #bbb;
    min-height: 100px;
    margin-bottom: 20px;
  }

  .h_title {
    line-height: 40px;
    text-align: center;
    color: #303133;
    background-color: #e9ecf3;
  }

  .h_name {
    line-height: 40px;
    text-align: center;
    font-size: 13px;
  }

  .h_amt {
    text-align: center;
    font-size: 20px;
    line-height: 40px;
  }

  .container {
    text-align: center;

    ul {
      margin: auto;
      width: 420px;
      padding: 12px 20px;
      list-style: none;
      background: #fff;

      li {
        display: flex;
        margin-bottom: 10px;

        &:last-of-type {
          margin-bottom: 0;
        }

        > div {
          &:first-of-type {
            text-align: left;
            width: 130px;
            color: #999;
          }
        }

        .title {
          text-align: center;
          width: 100%;
          margin-bottom: 20px;
          margin-top: 10px;
        }

        .inviteCode {
          font-size: 18px;
          font-weight: bold;
        }

        .info {
          text-align: left;
          color: #999;
          font-size: 13px;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
