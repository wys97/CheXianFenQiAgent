<template>
  <div class="page-container" ref="page-container" id="page-container"><!---商户管理-商户入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <div class="tab-content">
							<div class="info-list">
								<div>
									<p class="title" style="display: inline-block;margin-bottom:40px">结算列表</p>
								</div>
								<template>
									<el-table :data="settleBatchList" border style="width: 100%">
										<el-table-column prop="settleBatchId" label=结算批次 width="200">
										</el-table-column>
										<el-table-column prop="accountName" label="账户名称">
										</el-table-column>
										<el-table-column prop="accountNum" label="账户号码" width="200">
										</el-table-column>
                                        <el-table-column prop="settleAmount" label="结算金额(元)" width="200">
										</el-table-column>
                                        <el-table-column prop="settleDate" label="结算日期" width="200">
										</el-table-column>
										<el-table-column prop="settleStatusText" width="100" label="结算状态">
										</el-table-column>
									</el-table>
								</template>
							</div>
						</div>
    </div>
   
  </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList } from '@/api/common'
	import settleBatch from '@/api/settleBatch/settleBatchList'
	import { validContent } from '@/utils/validate'
	import agentDetail from '@/api/agentManage/agentDetail'
	import { Format } from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	// import clip from '@/utils/clipboard'
	export default {
		name: 'AgentDetail',
		components: {
			Upload
		},
		data() {
			return {
				settleBatchList: [],    //结算列表
				agentId:'', //代理商编号
				tableData: [],
			}
		},
		watch: {
			//监听路由切换回调
			'$route': 'fetchdata'
		},
		computed: {
			...mapGetters([
				'roleHasPermissions', // 用户权限list
				'tableMaxHeight'
			])
		},
		created() {
			
		},
		mounted() {
			this.getAgentSettleList()      
		},
		methods: {
			fetchdata() {
				this.agentId = this.$route.params.id
				if(this.agentId) {
					/*this.init()*/
				}
			},


			//代理商结算列表
			getAgentSettleList() { 
				settleBatch.agentSettleList().then(res => {
					if(res.data.code === '200') {
						let settleBatchData = res.data.data
						this.settleBatchList = settleBatchData
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},			
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	@import "agentUpdate.scss";
</style>