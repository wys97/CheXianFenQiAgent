<template>
	<div>
		<el-form ref="verifyFirmFinancialTrideForm" label-width="180px" size="mini" label-position="right">
			<div class="info-list">
				<p style="line-height: 40px;">
					<span v-if="!addGuarantor">修改结算信息</span>
					<span v-if="addGuarantor">新增结算信息</span>
					<span  class="r_f" v-if="!addGuarantor">
						<el-button @click="delGuarantor" type="danger" size="mini">删除</el-button>
					</span>
				</p>
				<el-form-item label="代理商：">
					<!-- <span  class="input_read">{{this.agentId}}  {{this.agentGetagentName}}</span> -->
						<el-input  v-model="agentId" style="width: 300px;">
						</el-input>
				</el-form-item>
				<el-form-item label="结算批次：">
					<span v-if="readOnly" class="input_read">{{settleBatchData.settleBatchId}}</span>
					<el-input v-else v-model="settleBatchData.settleBatchId" class="must_input" style="width: 300px;">
					</el-input>
				</el-form-item>
                <el-form-item label="账户名称：">
					<template>
						<span v-if="readOnly" class="input_read">{{settleBatchData.accountName}}</span>
						<el-radio-group class="must_input" v-else v-model="settleBatchData.accountName">
							<el-radio label="PERSONAL">个人</el-radio>
							<el-radio label="ENTERPRISE">企业</el-radio>
						</el-radio-group>
					</template>
				</el-form-item>
                <el-form-item label="账户号码：">
						<span v-if="readOnly" class="input_read">{{settleBatchData.accountNum}}</span>
						<el-input  class="must_input" v-else v-model="settleBatchData.accountNum" style="width: 300px;">
						</el-input>
				</el-form-item>	
                <el-form-item label="结算金额：">
					<span v-if="readOnly" class="input_read">{{settleBatchData.settleAmount}}</span>
					<el-input v-else v-model="settleBatchData.settleAmount" style="width: 300px;">
					</el-input>元
				</el-form-item>		
                <el-form-item label="结算日期：">
                    <span v-if="readOnly" class="input_read">{{settleBatchData.settleDate}}</span>
					<el-date-picker v-else v-model="settleBatchData.settleDate" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>	
                <el-form-item label="状态：">
					<template>
						<span v-if="readOnly" class="input_read">{{settleBatchData.settleStatus}}</span>
						<el-radio-group v-else v-model="settleBatchData.settleStatus">
							<el-radio label="WAIT">待结算</el-radio>
							<el-radio label="DONE">已结算</el-radio>
						</el-radio-group>
					</template>
				</el-form-item>
				<el-form-item label="操作id：" style="display:none;">
					<!-- <span  class="input_read">{{this.agentId}}  {{this.agentGetagentName}}</span> -->
						<el-input  v-model="operateId" style="width: 300px; display:none;">
						</el-input>
				</el-form-item>
				
				<div v-if="!readOnly" style="text-align: right;">
					<el-button @click="doSaveGuarantor"  type="primary">保存</el-button>
					<!-- v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" -->
				</div>
			</div>
		</el-form>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
	import Uploads from '@/components/Upload/Uploads'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList, collateralType, collateralSource,maritalStatus,educationBackground } from '@/api/common'
	import guarantorDetail from '@/api/guarantorManage/guarantorDetail'
	import agentDetail from '@/api/agentManage/agentDetail'
	import { validContent } from '@/utils/validate'
	import { Format, delcommafy } from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
		name: 'register',
		components: {
			Upload,
			Uploads
		},
		
		data() {
			return {
				agentGetagentId:'' ,     //代理商编号
				agentGetagentName:'',     //代理商名称
				agentSettleStatus:'',     //代理商结算状态
				settleBatchData:{
					operateId:'',
					agentId:'',
					agentName:'',
					settleBatchId:'',
					accountName:'',
					accountNum:'',
					settleAmount:'',
					settleDate:'',
					settleStatus:'',
					settleStatusText:''
				},
				guarantorDetailData: {
					enterpriseName:'',
					supplierId:'',
					businessLicenseNo:'',
					repreName:'',
					repreIdcardNo:'',
					id:'',
					name:'',
					idcardNo:'',
					gender:'',
					genderText:'',
					address:'',
					mobile:'',
					email:'',
					idcardPicFrontKey:'',
					idcardPicFrontUrl:'',
					idcardPicBackKey:'',
					idcardPicBackUrl:'',
					educationBackground:'',
					educationBackgroundText:'',
					maritalStatus:'',
					maritalStatusText:'',
					localResident:'',
				}, //担保人详情数据
				uploadImgData: {
					supplierId: '',
					isImage: true
				},
			}
		},
		props: {
			operateId:{
                type: String,
				default: ''
			},
			agentId:{
                type: String,
				default: ''
			},
			guarantorId: {
				type: String,
				default: ''
			},
			readOnly: {
				type: Boolean,
				default: false
			},
			addGuarantor: {
				type: Boolean,
				default: false
			},
			
		},
		watch: {
			//监听路由切换回调
			'$route': 'fetchdata',
			settleBatchData: function(val, oldVal) {
				this.settleBatchData = val;
			}
		},
		computed: {
			...mapGetters([
				'roleHasPermissions', // 用户权限list
				'tableMaxHeight'
			])
		},
		created() {},
		mounted() {
			
			this.settleBatchData.agentId = this.agentId
			this.settleBatchData.operateId = this.operateId
			this.getAgentGetAgentInfo()        //获取代理商编号和名称
			this.getAgentSettleStatus()         //代理商结算状态		
			this.init();
		},
		methods: {
			init() {
				if(!this.addGuarantor){
					this.getAgentSettleDetail()     //获取结算信息详情数据
					// this.getGuarantorDetail(); //获取担保人详情数据					
				}else{				
					this.settleBatchData.id = this.operateId	
					this.getAgentGetAgentInfo()      //获取代理商编号和名称
				}
				
			}, // 初始化


			getAgentSettleDetail() {
				this.settleBatchData.id = this.operateId
                agentDetail.agentSettleDetail(this.operateId).then(res => {
					if(res.data.code === '200') {
						this.settleBatchData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},


			getGuarantorDetail() { //获取担保人详情数据-----查询
				guarantorDetail.guarantorInfo(this.guarantorId).then(res => {
					if(res.data.code === '200') {
						this.guarantorDetailData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			// delGuarantor(){//删除担保人
			// 	guarantorDetail.deleteGuarantor(this.guarantorId).then(res => {
			// 		if(res.data.code === '200') {
			// 			this.$message.success(res.data.message)
			// 			this.$router.replace({path:'/guarantorManage/guarantorList'})
			// 		} else {
			// 			this.$message.error(res.data.message)
			// 		}
			// 	}).catch(() => {})
			// },




            //代理商结算信息保存
			doSaveGuarantor(){
				if(this.addGuarantor){//新增
				    this.changeDate()
					let data = baseUtil.copy(this.settleBatchData)
					agentDetail.agentSettleAdd(data).then(res => {
						if(res.data.code === '200') {
							this.$message.success(res.data.message)
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}else {//修改			
					// this.changeDate()
					// let operateId = baseUtil.copy(this.operateId)
					let data = baseUtil.copy(this.settleBatchData)
					data.id = this.operateId
					agentDetail.agentSettleUpdate(data).then(res => {
						if(res.data.code === '200') {
							this.$message.success(res.data.message)
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}
				
			},


			 //日期格式处理
			changeDate(){
				let nowDate = this.settleBatchData.settleDate
				// console.log(nowDate)
				let newYear = nowDate.getMonth() + 1
				let newDate = nowDate.getDate()
				if(newYear<10){
					newYear = '0'+newYear
				}
				if(newDate<10){
					newDate = '0'+newDate
				}
				let myDate = nowDate.getFullYear() + '-' + newYear + '-' + newDate
				
				this.settleBatchData.settleDate = myDate	
			},


			//代理商结算状态
			getAgentSettleStatus (){
				
				agentDetail.agentSettleStatus ().then(res => {
					if (res.data.code === '200') {
						this.agentSettleStatus= res.data.data
					} else {
						this.$message.error(res.data.message)
					}
				})       
			},


			//获取代理商编号和名称
			getAgentGetAgentInfo() {
				this.settleBatchData.id = this.operateId
		
				// console.log(this.settleBatchData.operateId)
				agentDetail.agentGetAgentInfo (this.agentId).then(res => {
					if (res.data.code === '200') {
						this.agentGetagentId= res.data.data.agentId
						this.agentGetagentName= res.data.data.agentName
						// this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}) 
			}





			// doSaveGuarantor(){//担保人-保存
			// 	if(this.addGuarantor){//新增
			// 		let data = baseUtil.copy(this.guarantorDetailData)
			// 		guarantorDetail.saveGuarantor(data).then(res => {
			// 			if(res.data.code === '200') {
			// 				this.$message.success(res.data.message)
			// 			} else {
			// 				this.$message.error(res.data.message)
			// 			}
			// 		}).catch(() => {})
			// 	}else {//修改
			// 		let data = baseUtil.copy(this.guarantorDetailData)
			// 		guarantorDetail.updateGuarantor(data).then(res => {
			// 			if(res.data.code === '200') {
			// 				this.$message.success(res.data.message)
			// 			} else {
			// 				this.$message.error(res.data.message)
			// 			}
			// 		}).catch(() => {})
			// 	}
				
			// },
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>