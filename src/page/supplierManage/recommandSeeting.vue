<template>
  <div class="page-container" ref="page-container" id="page-container"><!---商户管理-商户入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <div class="tab-content">
						<el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right">
								<div class="info-list">
									<p class="title" style="margin-bottom:40px">推广配置</p>
                                    <el-form-item label="操作员姓名：">
										<el-input v-model="promotionData.operatorName" style="width: 300px;">
										</el-input>
										<el-button    @click="handleCopy(promotionData.operatorName,$event)">复制</el-button>
									</el-form-item>
                                    <el-form-item label="推荐码：">
										<el-input v-model="promotionData.recommandCode" style="width: 300px;">
										</el-input>
										<el-button    @click="handleCopy(promotionData.recommandCode,$event)">复制</el-button>
									</el-form-item>
									<el-form-item label="推荐链接：">
										<el-input v-model="promotionData.recommandUrl" style="width: 300px;">
										</el-input>
										<el-button    @click="handleCopy(promotionData.recommandUrl,$event)">复制</el-button>										
									</el-form-item>
									<el-form-item label="推荐二维码：">
										<img :src="'/agent-api/recommend/recommand_qrcode'" alt="" style="display:block;width:300px;height:300px;">
									</el-form-item>
								</div>
							</el-form>
						</div>
    </div>
   
  </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
	import defaultImg from '@/assets/imgs/default.jpg'
	import settleBatch from '@/api/settleBatch/settleBatchList'
	import agentDetail from '@/api/agentManage/agentDetail'
	import { Format } from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	import clip from '@/utils/clipboard'
	export default {
		name: 'AgentDetail',
		components: {
			Upload
		},
		data() {
			return {
				settleBatchList: [],    //结算列表
				agentId:'', //代理商编号
				promotionData:'',  //推广配置详情
				promotionCode:'',      //推广配置二维码
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
            this.getAgentRecommandSetting()      //代理商推广配置
            this.getAgentRecommandQrcode()         //代理商推广二维码
			
		},
		mounted() {
            
		},
		methods: {
			fetchdata() {
				this.agentId = this.$route.params.id
				if(this.agentId) {
					/*this.init()*/
				}
			},


		   handleCopy(text, event) {
           clip(text, event)
         },


			//代理商推广配置详情
			getAgentRecommandSetting () {
				settleBatch.agentRecommandSetting().then(res => {
					if (res.data.code === '200') {
						this.promotionData= res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})       
            },
            

			//代理商推广配置二维码
			getAgentRecommandQrcode () {
				settleBatch.agentRecommandQrcode(this.agentId).then(res => {
					if (res.data.code === '200') {
						this.promotionCode= res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})       
			},	
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	@import "agentUpdate.scss";
</style>