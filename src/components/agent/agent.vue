<template>
	<div>
		<el-form ref="verifyFirmFinancialTrideForm" label-width="180px" size="mini" label-position="right">
			<div class="info-list">
				<p style="line-height: 40px;">
					<span>代理商新增</span>
					<span  class="r_f" v-if="!addGuarantor">
						<el-button @click="delGuarantor" type="danger" size="mini">删除</el-button>
					</span>
				</p>
				<!-- <el-row>
					<el-col :span="12">
						<el-form-item label="所属企业：">
							<span v-if="readOnly">{{guarantorDetailData.enterpriseName}}</span>
		    				<template v-else>
							  <el-select @change="changeSupplierId" v-model="guarantorDetailData.supplierId" filterable  placeholder="请选择" style="width: 200px;">
							    <el-option
							      v-for="item in enterpriseNameList"
							      :key="item.supplierId"
							      :label="item.enterpriseName"
							      :value="item.supplierId">
							    </el-option>
							  </el-select>
							</template>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="社会统一信用代码：">
							<template>
								<span v-if="readOnly" class="input_read">{{guarantorDetailData.businessLicenseNo}}</span>
								<el-input v-else v-model="guarantorDetailData.businessLicenseNo" :disabled="true" style="width: 300px;">
								</el-input>
							</template>
						</el-form-item>
					</el-col>
				</el-row> -->
				<el-form-item label="代理商编号：">
					<span v-if="readOnly" class="input_read">{{agentId}}</span>
						<el-input v-else :disabled="true" v-model="agentId" style="width: 300px;">
						</el-input>
				</el-form-item>
				<el-form-item label="代理商名称：">
					<span v-if="readOnly" class="input_read">{{agentDetailData.agentName}}</span>
					<el-input v-else v-model="agentDetailData.agentName" class="must_input" style="width: 300px;">
					</el-input>
				</el-form-item>
                <el-form-item label="代理商类型：">
					<template>
						<span v-if="readOnly" class="input_read">{{agentDetailData.agentType}}</span>
						<el-radio-group class="must_input" v-else v-model="agentDetailData.agentType">
							<el-radio label="PERSONAL">个人</el-radio>
							<el-radio label="ENTERPRISE">企业</el-radio>
						</el-radio-group>
					</template>
				</el-form-item>
                <el-form-item label="联系人名称：">
						<span v-if="readOnly" class="input_read">{{agentDetailData.contactName}}</span>
						<el-input  class="must_input" v-else v-model="agentDetailData.contactName" style="width: 300px;">
						</el-input>
				</el-form-item>	
                <el-form-item label="联系人手机号：">
					<span v-if="readOnly" class="input_read">{{agentDetailData.contactMobile}}</span>
					<el-input class="must_input" v-else v-model="agentDetailData.contactMobile" style="width: 300px;">
					</el-input>
				</el-form-item>		
                <el-form-item label="注册日期：">
                    <span v-if="readOnly" class="input_read">{{agentDetailData.registerDate}}</span>
					<el-date-picker v-else v-model="agentDetailData.registerDate" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>	
				
				<el-form-item label="分润比例：">
					<span v-if="readOnly" class="input_read">{{agentDetailData.profitScale}}</span>
					<el-input v-else v-model="agentDetailData.profitScale" style="width: 300px;">
					</el-input>
				</el-form-item>
                <el-form-item label="结算周期：">
					<span v-if="readOnly">{{agentDetailData.settleCycle}}</span>
		    			<template v-else>
							<el-select @change="changeSupplierId" v-model="agentDetailData.settleCycle" filterable  placeholder="请选择" style="width: 200px;">
                                <el-option v-if="agentDetailData.settleCycle" v-for="(val,key) in agentDetailData.settleCycle" :label="val" :value='key' :key='key'>
            					</el-option>
						    </el-select>
						</template>
				</el-form-item>	
                <el-form-item label="状态：">
					<template>
						<span v-if="readOnly" class="input_read">{{agentDetailData.agentStatus}}</span>
						<el-radio-group v-else class="must_input" v-model="agentDetailData.agentStatus">
							<el-radio label="ENABLED">启动</el-radio>
							<el-radio label="DISABLED">停用</el-radio>
						</el-radio-group>
					</template>
				</el-form-item>
                <el-form-item label="备注：">
                    <span v-if="readOnly" class="input_read">{{agentDetailData.agentDesc}}</span>
					<el-input v-else type="textarea" :rows="4" v-model="agentDetailData.agentDesc" style="width: 300px;">
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
				agentId:'',    //代理商编号
				agentDetailData:{       //代理商详情数据
						agentName:'',
						agentType:'',
						contactName:'',
						contactMobile:'',
						registerDate:'',
						profitScale:'',
						settleCycle:'',
						agentStatus:'',
						agentDesc:''
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
				maritalStatusList:'',//学历下拉
				educationBackgroundList:'',//婚姻状态下拉
				enterpriseNameList: '', //企业名称列表
				uploadImgData: {
					supplierId: '',
					isImage: true
				},
			}
		},
		props: {
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
			}
		},
		watch: {
			//监听路由切换回调
			'$route': 'fetchdata',
			agentDetailData: function(val, oldVal) {
				this.agentDetailData = val;
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
			this.init();
		},
		methods: {
			init() {
				if(!this.addGuarantor){
					// this.getGuarantorDetail(); //获取担保人详情数据
				}
				// this.changeDate()
				this.getSettleCycle()          //结算周期下拉
			}, // 初始化
			// getGuarantorDetail() { //获取担保人详情数据-----查询
			// 	guarantorDetail.guarantorInfo(this.guarantorId).then(res => {
			// 		if(res.data.code === '200') {
			// 			this.guarantorDetailData = res.data.data;
			// 		} else {
			// 			this.$message.error(res.data.message)
			// 		}
			// 	}).catch(() => {})
			// },
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


			// doSaveGuarantor(){//担保人-保存
			// 	if(this.addGuarantor){//新增
			// 		let data = baseUtil.copy(this.agentDetailData)
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


			//代理商结算周期下拉
			getSettleCycle (){
				agentDetail.agentSettleCycle ().then(res => {
				if (res.data.code === '200') {
					this.agentDetailData.settleCycle= res.data.data
				} else {
					this.$message.error(res.data.message)
				}
				})       
			},


			 
            //日期格式处理
			changeDate(){
				let nowDate = this.agentDetailData.registerDate
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
				
				this.agentDetailData.registerDate = myDate	
			},
 

            //代理商新增保存
			doSaveGuarantor(){
				if(this.addGuarantor){//新增
				    this.changeDate()
					let data = baseUtil.copy(this.agentDetailData)
					agentDetail.agentAdd(data).then(res => {
						if(res.data.code === '200') {
							let agentId = res.data.data.agentId
							this.agentId = agentId							
							this.$message.success(res.data.message)
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(() => {})
				}				
			}			
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>