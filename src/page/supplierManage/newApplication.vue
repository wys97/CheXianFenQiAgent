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
      <!-- <ul class="flex-item">
        <li></li>
        <li>申请时间：</li>
      </ul>
      <div class="flex-item" style="text-align: right;padding-top: 0;">
        <span>原因：</span>
        <el-button size="mini"></el-button>
      </div>-->
    </div>
    <div class="content">
      <div class="flex-item" style="position: relative;">
        <el-tabs type="card" v-model="activeName">
          <el-tab-pane label="基本信息" name="elementary">
            <el-form
              ref="form"
              label-width="180px"
              size="medium"
              style="width:500px; margin:60px 200px 0"
            >
              <el-form-item label="录入用户基本信息"></el-form-item>
              <el-form-item label="被保人类型：" prop="radio">
                <el-radio-group v-model="radio">
                  <el-radio label="0">个人</el-radio>
                  <el-radio label="1">企业</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form
                v-if="radio=='0'"
                :model="personageForm"
                :rules="personageRules"
                label-width="180px"
                style="width:100%"
              >
                <el-form-item label="被保人手机号：" prop="insuredPhone">
                  <el-input v-model="personageForm.insuredPhone" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="身份证：" prop="identityCardFile">
                  <div class="identityCard">
                    <el-upload
                      class="avatar-uploader"
                      action="/agent-api/add_apply/upload_idcard_front"
                      :show-file-list="false"
                      :http-request="IDCard"
                      style="width:100px; height:100px;"
                    >
                      <img
                        v-if="imageUrl"
                        :src="imageUrl"
                        class="avatar"
                        width="100%"
                        height="100%"
                      />
                      <i
                        v-else
                        class="el-icon-plus avatar-uploader-icon"
                        style="width:100px; height:100px; line-height:100px"
                      ></i>
                    </el-upload>
                    <el-upload
                      class="avatar-uploader"
                      action="/agent-api/add_apply/upload_cehicle_license_Back"
                      :show-file-list="false"
                      :http-request="IDCard2"
                      style="width:100px; height:100px;"
                    >
                      <img
                        v-if="imageUrl2"
                        :src="imageUrl2"
                        class="avatar"
                        width="100%"
                        height="100%"
                      />
                      <i
                        v-else
                        class="el-icon-plus avatar-uploader-icon"
                        style="width:100px; height:100px; line-height:100px"
                      ></i>
                    </el-upload>
                  </div>
                  <div class="identityCard">
                    <span style="padding:0 8px">身份证人像面</span>
                    <span style="padding:0 8px">身份证国徽面</span>
                  </div>
                </el-form-item>
                <el-form-item label="被保人姓名：" prop="insuredName">
                  <el-input v-model="personageForm.insuredName"></el-input>
                </el-form-item>
                <el-form-item label="被保人身份证号：" prop="identityCard">
                  <el-input v-model="personageForm.idNo"></el-input>
                </el-form-item>
                <el-form-item label="地址：">
                  <el-input v-model="personageForm.insuredAddres"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="savePersonalApply">保存</el-button>
                </el-form-item>
              </el-form>
              <el-form
                v-else
                :model="enterpriseForm"
                label-width="180px"
                style="width:100%"
                :rules="enterpriseRules"
              >
                <el-form-item label="经办人手机号：" prop="insuredPhone">
                  <el-input v-model="enterpriseForm.insuredPhone" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="经办人身份证：" prop="insuredFontUrl">
                  <div class="identityCard">
                    <el-upload
                      class="avatar-uploader"
                      action="/agent-api/add_apply/upload_idcard_front"
                      :show-file-list="false"
                      :http-request="operatorIdCard"
                      style="width:100px; height:100px;"
                    >
                      <img
                        v-if="imageUrl3"
                        :src="imageUrl3"
                        class="avatar"
                        width="100%"
                        height="100%"
                      />
                      <i
                        v-else
                        class="el-icon-plus avatar-uploader-icon"
                        style="width:100px; height:100px; line-height:100px"
                      ></i>
                    </el-upload>
                    <el-upload
                      class="avatar-uploader"
                      action="/agent-api/add_apply/upload_cehicle_license_Back"
                      :show-file-list="false"
                      :http-request="operatorIdCard2"
                      style="width:100px; height:100px;"
                    >
                      <img
                        v-if="imageUrl4"
                        :src="imageUrl4"
                        class="avatar"
                        width="100%"
                        height="100%"
                      />
                      <i
                        v-else
                        class="el-icon-plus avatar-uploader-icon"
                        style="width:100px; height:100px; line-height:100px"
                      ></i>
                    </el-upload>
                  </div>
                  <div class="identityCard">
                    <span style="padding:0 8px">身份证人像面</span>
                    <span style="padding:0 8px">身份证国徽面</span>
                  </div>
                </el-form-item>
                <el-form-item label="经办人姓名：" prop="insuredName">
                  <el-input v-model="enterpriseForm.insuredName"></el-input>
                </el-form-item>
                <el-form-item label="经办人身份证号：" prop="idNo">
                  <el-input v-model="enterpriseForm.idNo"></el-input>
                </el-form-item>
                <el-form-item label="地址：">
                  <el-input v-model="enterpriseForm.insuredAddres"></el-input>
                </el-form-item>
                <el-form-item label="经办人授权协议：">
                  <el-upload
                    action="/agent-api/add_apply/upload_agreement_license"
                    list-type="picture-card"
                    :http-request="agentProtocol"
                    :on-remove="agentProtocolRemove"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
                <hr width="160%" />

                <el-form-item label="企业营业执照：" style="margin-top:30px" prop="businessLicenseUrl">
                  <el-upload
                    action="/agent-api/add_apply/upload_agreement_license"
                    list-type="picture-card"
                    :http-request="businessLicense"
                    :on-remove="agentProtocolRemove"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="被保企业名称：" prop="enterpriseName">
                  <el-input v-model="enterpriseForm.enterpriseName"></el-input>
                </el-form-item>
                <el-form-item label="企业信用代码：" prop="businessLicenseNO">
                  <el-input v-model="enterpriseForm.businessLicenseNO"></el-input>
                </el-form-item>
                <el-form-item label="营业执照有效期：" prop="licenseValidity">
                  <el-input
                    v-model="enterpriseForm.licenseValidity"
                    @focus="show=true"
                    @blur="show=false"
                  ></el-input>
                  <span v-if="show">格式: 0000-00-00</span>
                </el-form-item>
                <el-form-item label="法人姓名：" prop="repreName">
                  <el-input v-model="enterpriseForm.repreName"></el-input>
                </el-form-item>
                <el-form-item label="法人身份证号：" prop="repreIdNo">
                  <el-input v-model="enterpriseForm.repreIdNo"></el-input>
                </el-form-item>
                <el-form-item label="企业账号：" prop="entAccount">
                  <el-input v-model="enterpriseForm.entAccount"></el-input>
                </el-form-item>
                <el-form-item label="开户支行：" prop="entOpenBank">
                  <el-input v-model="enterpriseForm.entOpenBank"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="companySave">保存</el-button>
                </el-form-item>
              </el-form>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="车辆信息" name="car">
            <div style="margin:40px 40px 0">
              <span>证件类型：</span>
              <el-radio-group v-model="carRadio">
                <el-radio label="VEHICLE_LICENSE">行驶证</el-radio>
                <el-radio label="QUALIFICATION">合格证（新车未上牌）</el-radio>
              </el-radio-group>
            </div>
            <div v-if="carRadio=='VEHICLE_LICENSE'">
              <div class="flex" style="padding:30px 0px 20px; width:90%; margin:0 auto ">
                <div>
                  <span>录入车辆信息</span>
                  <span>（行驶证正本和副本必传，上传正本即自动识别出车辆信息）</span>
                </div>
                <el-button type="primary" size="small" @click="newDataBtn">新增</el-button>
              </div>
              <el-table :data="carData" style="width:90%; margin:0 auto" border>
                <el-table-column label="序号" type="index" :index="indexMethod" align="center"></el-table-column>
                <el-table-column label="车牌号" align="center">
                  <template slot-scope="scope">
                    <el-input type="input" v-model="scope.row.licenseNo"  maxlength="10"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="车主姓名" align="center">
                  <template slot-scope="scope">
                    <el-input type="input" v-model="scope.row.ownerName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="车辆识别代码" align="center" width="210">
                  <template slot-scope="scope">
                    <el-input type="input" v-model="scope.row.frameNo"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="发动机号" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input type="input" v-model="scope.row.engineNo"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="行驶证正本" align="center" width="180">
                  <template slot-scope="scope">
                    <el-upload
                      class="upload-demo"
                      action="/agent-api/add_apply/upload_cehicle_license_front"
                      multiple
                      :http-request="(file)=>drivingLicense(file,scope.$index)"
                      :limit="1"
                      :on-remove="(file)=>agentProtocolRemove(file, scope.$index,1)"
                      :file-list="fileList"
                    >
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column label="行驶证副本" align="center" width="180">
                  <template slot-scope="scope">
                    <el-upload
                      class="upload-demo"
                      action="/agent-api/add_apply/upload_cehicle_license_Back"
                      multiple
                      :http-request="(file)=>drivingLicense2(file,scope.$index)"
                      :on-remove="(file)=>agentProtocolRemove(file, scope.$index,2)"
                      :file-list="fileList2"
                      :limit="1"
                    >
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="removeBtn(scope.$index,scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-else>
              <div class="flex" style="padding:30px 0px 20px; width:90%; margin:0 auto ">
                <div>
                  <span>录入车辆信息</span>
                  <span>（合格证必传，请人工录入车辆信息）</span>
                </div>
                <el-button type="primary" size="small" @click="newDataBtn">新增</el-button>
              </div>
              <el-table :data="carCertificateData" style="width:90%; margin:0 auto" border>
                <el-table-column label="序号" type="index" :index="indexMethod" align="center"></el-table-column>
                <!-- <el-table-column label="车牌号" align="center"  >
                  <template slot-scope="scope">
                    <el-input type="input" v-model="scope.row.licenseNo" maxlength="10"></el-input>
                  </template>
                </el-table-column> -->
                <el-table-column label="车主姓名" align="center">
                  <template slot-scope="scope">
                    <el-input type="input" v-model="scope.row.ownerName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="车辆识别代码" align="center" width="210">
                  <template slot-scope="scope">
                    <el-input type="input" v-model="scope.row.frameNo"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="发动机号" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input type="input" v-model="scope.row.engineNo"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="合格证" align="center" width="180">
                  <template slot-scope="ss">
                    <el-upload
                      class="upload-demo"
                      action="/agent-api/add_apply/upload_cehicle_license_Back"
                      multipleC
                      :http-request="(file)=>uploadCertificate(file,ss.$index)"
                      :limit="1"
                      :file-list="fileList3"
                      :on-remove="(file)=>fileRemove(file, ss.$index)"
                    >
                      <el-button size="small" type="primary">点击上传图片</el-button>
                    </el-upload>
                  </template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="removeBtn(scope.$index,scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="flex-item">
        <ul>
          <li class="background-gray color-black">
            <div>操作</div>
          </li>
          <li>
            <div>
              <el-button @click="cancelBtn">取消</el-button>
              <el-button type="primary" @click="createOrder">生成申请订单</el-button>
            </div>
          </li>
        </ul>
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
import axios from "@/api/supplierManage/supplierRegister";
import baseUtil from "@/utils/baseUtil";
import { validContent } from "@/utils/validate";
import { Format } from "@/utils/index";
const axiosRequest = require("axios");
export default {
  name: "newApplication",
  data() {
    return {
      activeName: "elementary", //标签页切换

      radio: "0", //基本信息 个人 或 企业
      loading: "",
      personageForm: {
        //个人数据
        insuredPhone: "", //被保人手机号
        insuredFontUrl: "", //身份证正面影像地址
        insuredBackUrl: "", //身份证反面影像地址
        insuredName: "", //被保人姓名
        idNo: "", //被保人身份证号
        insuredAddres: "" //地址
      },

      imageUrl: "",
      imageUrl2: "",
      //个人必填条件
      personageRules: {
        insuredPhone: [
          {
            required: true,
            message: "请输入被保人手机号",
            trigger: "blur"
          }
        ],
        identityCardFile: [
          {
            required: true,
            message: "请上传身份证",
            trigger: "blur"
          }
        ],
        insuredName: [
          {
            required: true,
            message: "请输入被保人姓名",
            trigger: "blur"
          }
        ],
        idNo: [
          {
            required: true,
            message: "请输入被保人身份证号",
            trigger: "blur"
          }
        ]
      },

      //企业数据
      enterpriseForm: {
        insuredPhone: "",
        insuredFontUrl: "",
        insuredBackUrl: "",
        insuredName: "",
        idNo: "",
        insuredAddres: "",
        agentAgreementUrl: "",
        businessLicenseUrl: "",
        enterpriseName: "",
        businessLicenseNO: "",
        licenseValidity: "",
        repreName: "",
        repreIdNo: "",
        entAccount: "",
        entOpenBank: ""
      },

      //企业必填条件
      enterpriseRules: {
        insuredPhone: [
          {
            required: true,
            message: "请输入经办人手机号",
            trigger: "blur"
          }
        ],
        insuredFontUrl: [
          {
            required: true,
            message: "请上传经办人身份证",
            trigger: "blur"
          }
        ],
        insuredName: [
          {
            required: true,
            message: "请输入经办人姓名",
            trigger: "change"
          }
        ],
        idNo: [
          {
            required: true,
            message: "请输入经办人身份证号",
            trigger: "blur"
          }
        ],
        businessLicenseUrl: [
          {
            required: true,
            message: "请上传企业营业执照",
            trigger: "blur"
          }
        ],
        enterpriseName: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: "blur"
          }
        ],
        businessLicenseNO: [
          {
            required: true,
            message: "请输入企业信用代码",
            trigger: "blur"
          }
        ],
        licenseValidity: [
          {
            required: true,
            message: "请输入企业信用代码",
            trigger: "blur"
          }
        ],
        repreName: [
          {
            required: true,
            message: "请输入法人姓名",
            trigger: "blur"
          }
        ],
        repreIdNo: [
          {
            required: true,
            message: "请输入法人身份证号",
            trigger: "blur"
          }
        ],
        entAccount: [
          {
            required: true,
            message: "请输入企业账号",
            trigger: "blur"
          }
        ],
        entOpenBank: [
          {
            required: true,
            message: "请输入开户支行",
            trigger: "blur"
          }
        ]
      },

      imageUrl3: "", //经办人身份证人像
      imageUrl4: "", //经办人身份证国徽
      show: false, //显示提示
      ids: "", //基本信息上传成功
      fileList3:[],
      fileList2:[],
      fileList:[],
      // 车辆信息

      carRadio: "VEHICLE_LICENSE", //选择 行驶证  或  合格证
      //行驶证
      carData: [
        {
          licenseNo: "",
          ownerName: "",
          frameNo: "",
          engineNo: "",
          licenseFontUrl: "",
          licenseBackUrl: ""
        }
      ],
      //合格证  新车未上牌
      carCertificateData: [
        {
          // licenseNo: "",
          ownerName: "",
          frameNo: "",
          engineNo: "",
          licenseFontUrl: ""
        }
      ],

      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      "roleHasPermissions", // 用户权限list
      "tableMaxHeight",
      'loginName',
    ])
  },

  watch: {
    carRadio(value){
     if(value=='VEHICLE_LICENSE'){
        this.carCertificateData = [
           {
          // licenseNo: "",
          ownerName: "",
          frameNo: "",
          engineNo: "",
          licenseFontUrl: ""
        }
        ]
     }else{
       this.carData = [
          {
          licenseNo: "",
          ownerName: "",
          frameNo: "",
          engineNo: "",
          licenseFontUrl: "",
          licenseBackUrl: ""
        }
       ]
     }

    },
  },
  created() {},
  mounted() {},
  methods: {
    //上传身份证人面成功
    IDCard(value) {
      let file = value.file;
      if (
        file.type == "image/jpeg" ||
        file.type == "image/jpg" ||
        file.type == "image/bmp" ||
        file.type == "image/png"
      ) {
        let url = URL.createObjectURL(file);
        axios
          .compressImage(url, {
            width: 250, // 压缩后图片的宽
            height: 165, // 压缩后图片的高，宽高若只传一个，则按图片原比例进行压缩
            quality: 0.988888 // 压缩后图片的清晰度，取值0-1，不传默认为0.7，值越小，所绘制出的图像越模糊
          })
          .then(result => {
            this.loading = this.$loading({
              lock: true,
              text: "上传中...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            let base64 = result.split(",");
            let data = {
              fileInfo: base64[1],
              suffix: "jpeg",
              desc: "身份证人像面"
            };
            //上传身份证ocr识别
            axiosRequest({
              url: "" + "/agent-api/add_apply/upload_idcard_front",
              method: "post",
              data: { ...data },
              headers: { "Content-Type": "application/json" }
            }).then(res => {
              this.loading.close();
              if (res.data.code == "200") {
                this.$message.success("上传成功");
                this.imageUrl = res.data.data.imageUrl;
                this.personageForm.insuredName = res.data.data.name;
                this.personageForm.idNo = res.data.data.idCardNo;
                this.personageForm.insuredAddres = res.data.data.address;
                this.personageForm.insuredFontUrl = res.data.data.imageUrl; //身份证正面影像地址
              } else {
                this.$message.error("上传失败,请重新上传");
              }
            });
          });
      } else {
        this.$message.error("图片格式错误");
      }
    },

    //上传身份证国徽成功
    IDCard2(value) {
      let file = value.file;
      if (
        file.type == "image/jpeg" ||
        file.type == "image/jpg" ||
        file.type == "image/bmp" ||
        file.type == "image/png"
      ) {
        let url = URL.createObjectURL(file);
        axios
          .compressImage(url, {
            width: 300, // 压缩后图片的宽
            height: 186, // 压缩后图片的高，宽高若只传一个，则按图片原比例进行压缩
            quality: 0.988888 // 压缩后图片的清晰度，取值0-1，不传默认为0.7，值越小，所绘制出的图像越模糊
          })
          .then(result => {
            this.loading = this.$loading({
              lock: true,
              text: "上传中...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            this.url = result;
            let base64 = result.split(",");
            let data = {
              fileInfo: base64[1],
              suffix: "jpeg",
              desc: "身份证国徽面"
            };
            //上传身份证ocr识别
            axiosRequest({
              url: "" + "/agent-api/add_apply/upload_idcard_back",
              method: "post",
              data: { ...data },
              headers: { "Content-Type": "application/json" }
            }).then(res => {
              this.loading.close();
              if (res.data.code == "200") {
                this.$message.success("上传成功");
                this.imageUrl2 = res.data.data.imageUrl;
                this.personageForm.insuredBackUrl = res.data.data.imageUrl; //身份证反面影像地址
              } else {
                this.$message.error("上传失败,请重新上传");
              }
            });
          });
      } else {
        this.$message.error("图片格式错误");
      }
    },

    //保存个人信息上传
    savePersonalApply() {
      let { personageForm } = this;

      if (!personageForm.insuredPhone) {
        this.$message.error("手机号不能为空");
        return;
      }
      if (!personageForm.insuredFontUrl) {
        this.$message.error("身份证人像面图片不能为空");
        return;
      }
      if (!personageForm.insuredBackUrl) {
        this.$message.error("身份证国徽面图片不能为空");
        return;
      }
      if (!personageForm.insuredName) {
        this.$message.error("名字不能为空");
        return;
      }
      let data = { insuredType: this.radio, ...personageForm };
      axios.saveDetails(data).then(res => {
        if (res.data.code == "200") {
          this.ids = res.data.data;
          this.$message.success(res.data.message);
          this.activeName = "car";
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    //经办人身份证人像
    operatorIdCard(value) {
      let file = value.file;
      if (
        file.type == "image/jpeg" ||
        file.type == "image/jpg" ||
        file.type == "image/bmp" ||
        file.type == "image/png"
      ) {
        let url = URL.createObjectURL(file);
        axios
          .compressImage(url, {
            width: 250, // 压缩后图片的宽
            height: 165, // 压缩后图片的高，宽高若只传一个，则按图片原比例进行压缩
            quality: 0.988888 // 压缩后图片的清晰度，取值0-1，不传默认为0.7，值越小，所绘制出的图像越模糊
          })
          .then(result => {
            this.loading = this.$loading({
              lock: true,
              text: "上传中...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            let base64 = result.split(",");
            let data = {
              fileInfo: base64[1],
              suffix: "jpeg",
              desc: "身份证人像面"
            };
            //上传身份证ocr识别
            axiosRequest({
              url: "" + "/agent-api/add_apply/upload_idcard_front",
              method: "post",
              data: { ...data },
              headers: { "Content-Type": "application/json" }
            }).then(res => {
              this.loading.close();
              if (res.data.code == "200") {
                this.$message.success("上传成功");
                this.imageUrl3 = res.data.data.imageUrl;
                this.enterpriseForm.insuredName = res.data.data.name;
                this.enterpriseForm.idNo = res.data.data.idCardNo;
                this.enterpriseForm.insuredAddres = res.data.data.address;
                this.enterpriseForm.insuredFontUrl = res.data.data.imageUrl; //身份证正面影像地址
              } else {
                this.$message.error("上传失败,请重新上传");
              }
            });
          });
      } else {
        this.$message.error("图片格式错误");
      }
    },
    //经办人身份证国徽
    operatorIdCard2(value) {
      let file = value.file;
      if (
        file.type == "image/jpeg" ||
        file.type == "image/jpg" ||
        file.type == "image/bmp" ||
        file.type == "image/png"
      ) {
        let url = URL.createObjectURL(file);
        axios
          .compressImage(url, {
            width: 300, // 压缩后图片的宽
            height: 186, // 压缩后图片的高，宽高若只传一个，则按图片原比例进行压缩
            quality: 0.988888 // 压缩后图片的清晰度，取值0-1，不传默认为0.7，值越小，所绘制出的图像越模糊
          })
          .then(result => {
            this.loading = this.$loading({
              lock: true,
              text: "上传中...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            this.url = result;
            let base64 = result.split(",");
            let data = {
              fileInfo: base64[1],
              suffix: "jpeg",
              desc: "身份证国徽面"
            };
            //上传身份证ocr识别
            axiosRequest({
              url: "" + "/agent-api/add_apply/upload_idcard_back",
              method: "post",
              data: { ...data },
              headers: { "Content-Type": "application/json" }
            }).then(res => {
              this.loading.close();
              if (res.data.code == "200") {
                this.$message.success("上传成功");
                this.imageUrl4 = res.data.data.imageUrl;
                this.enterpriseForm.insuredBackUrl = res.data.data.imageUrl; //身份证反面影像地址
              } else {
                this.$message.error("上传失败,请重新上传");
              }
            });
          });
      } else {
        this.$message.error("图片格式错误");
      }
    },

    //上传经办协议图片
    agentProtocol(value) {
      let file = value.file;
      if (
        file.type == "image/jpeg" ||
        file.type == "image/jpg" ||
        file.type == "image/bmp" ||
        file.type == "image/png"
      ) {
        let reader = new FileReader();
        let imgFile;
        this.loading = this.$loading({
          lock: true,
          text: "上传中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        reader.readAsDataURL(file);
        reader.onload = e => {
          imgFile = e.target.result;
          let arr = imgFile.split(",");
          let format = file.name.split(".");

          let data = {
            fileInfo: arr[1],
            suffix: format[1],
            desc: "经办人授信协议"
          };
          axiosRequest({
            url: "" + "/agent-api/add_apply/upload_agreement_license",
            method: "post",
            data: { ...data },
            headers: { "Content-Type": "application/json" }
          }).then(res => {
            this.loading.close();
            if (res.data.code == "200") {
              this.$message.success("上传成功");
              this.enterpriseForm.agentAgreementUrl = res.data.data.imageUrl;
            } else {
              this.$message.error("上传失败,请重新上传");
            }
          });
        };
      } else {
        this.$message.error("图片格式错误");
      }
    },
    //删除上传数据
    agentProtocolRemove(file, index, num) {
      //行驶证清空
      if (index && num) {
        this.carData[index].licenseNo = "";
        this.carData[index].ownerName = "";
        this.carData[index].frameNo = "";
        this.carData[index].engineNo = "";
        if (num == 1) {
          this.carData[index].licenseFontUrl = "";
        } else {
          this.carData[index].licenseBackUrl = "";
        }
      }
      //通用
      // this.$message.success("删除成功");
    },

    //企业营业执照ocr 上传
    businessLicense(value) {
      let file = value.file;
      if (
        file.type == "image/jpeg" ||
        file.type == "image/jpg" ||
        file.type == "image/bmp" ||
        file.type == "image/png"
      ) {
        let url = URL.createObjectURL(file);
        axios
          .compressImage(url, {
            width: 900, // 压缩后图片的宽
            height: 900, // 压缩后图片的高，宽高若只传一个，则按图片原比例进行压缩
            quality: 0.9888 // 压缩后图片的清晰度，取值0-1，不传默认为0.7，值越小，所绘制出的图像越模糊
          })
          .then(result => {
            this.loading = this.$loading({
              lock: true,
              text: "上传中...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            let base64 = result.split(",");
            let data = {
              fileInfo: base64[1],
              suffix: "jpeg",
              desc: "营业执照"
            };
            //企业营业执照ocr
            axiosRequest({
              url: "" + "/agent-api/add_apply/upload_business_license",
              method: "post",
              data: { ...data },
              headers: { "Content-Type": "application/json" }
            }).then(res => {
              this.loading.close();
              if (res.data.code == "200") {
                this.$message.success("上传成功");
                // this.imageUrl3 = res.data.data.imageUrl;
                this.enterpriseForm.enterpriseName =
                  res.data.data.enterpriseName;
                this.enterpriseForm.businessLicenseNO =
                  res.data.data.businessLicenseNo;
                this.enterpriseForm.licenseValidity = res.data.data.validPeriod;
                this.enterpriseForm.businessLicenseUrl = res.data.data.imageUrl; //身份证正面影像地址
              } else {
                this.$message.error("上传失败,请重新上传");
              }
            });
          });
      } else {
        this.$message.error("图片格式错误");
      }
    },

    //保存企业类型上传
    companySave() {
      let { enterpriseForm } = this;
      if (!enterpriseForm.insuredPhone) {
        this.$message.error("经办人手机号不能为空");
        return;
      }
      if (!enterpriseForm.insuredFontUrl) {
        this.$message.error("经办人身份证人像面图片,不能为空");
        return;
      }
      if (!enterpriseForm.insuredBackUrl) {
        this.$message.error("经办人身份证国徽面图片,不能为空");
        return;
      }
      if (!enterpriseForm.insuredName) {
        this.$message.error("经办人名称不能为空");
        return;
      }
      if (!enterpriseForm.idNo) {
        this.$message.error("经办人身份证号不能为空");
        return;
      }
      if (!enterpriseForm.businessLicenseUrl) {
        this.$message.error("企业营业执照不能为空");
        return;
      }
      if (!enterpriseForm.enterpriseName) {
        this.$message.error("被保企业名称不能为空");
        return;
      }
      if (!enterpriseForm.businessLicenseNO) {
        this.$message.error("企业信用代码不能为空");
        return;
      }
      if (!enterpriseForm.licenseValidity) {
        this.$message.error("营业执照有效期不能为空");
        return;
      }
      if (!enterpriseForm.repreName) {
        this.$message.error("法人姓名不能为空");
        return;
      }
      if (!enterpriseForm.repreIdNo) {
        this.$message.error("法人身份证号不能为空");
        return;
      }
      if (!enterpriseForm.entAccount) {
        this.$message.error("企业账号不能为空");
        return;
      }
      if (!enterpriseForm.entOpenBank) {
        this.$message.error("开户支行不能为空");
        return;
      }
      let data = { insuredType: this.radio, ...enterpriseForm };
      axios.enterpriseEntry(data).then(res => {
        if ((res.data.code = "200")) {
          this.ids = res.data.data;
          this.$message.success("保存成功");
          this.activeName = "car";
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    //车辆信息序号
    indexMethod(index) {
      return index + 1;
    },

    //车辆信息新增
    newDataBtn() {
      if (this.carRadio == "VEHICLE_LICENSE") {
        let data = {
          licenseNo: "",
          ownerName: "",
          frameNo: "",
          engineNo: "",
          licenseFontUrl: "",
          licenseBackUrl: ""
        };
        this.carData.push(data);
      } else {
        let data = {
          // licenseNo: "",
          ownerName: "",
          frameNo: "",
          engineNo: "",
          licenseFontUrl: ""
        };
        this.carCertificateData.push(data);
      }
    },

    //车辆信息删除
    removeBtn(index, data) {
      if (this.carRadio == "VEHICLE_LICENSE") {
        //行驶证项删除
        this.carData.splice(index, 1);
      } else {
        //合格证项删除
        this.carCertificateData.splice(index, 1);
      }
    },

    //上传行驶证正面
    drivingLicense(value, index) {
      let file = value.file;
      if (
        file.type == "image/jpeg" ||
        file.type == "image/jpg" ||
        file.type == "image/bmp" ||
        file.type == "image/png"
      ) {
        let url = URL.createObjectURL(file);
        axios
          .compressImage(url, {
            width: 410, // 压缩后图片的宽
            height: 410, // 压缩后图片的高，宽高若只传一个，则按图片原比例进行压缩
            quality: 0.988888 // 压缩后图片的清晰度，取值0-1，不传默认为0.7，值越小，所绘制出的图像越模糊
          })
          .then(result => {
            this.loading = this.$loading({
              lock: true,
              text: "上传中...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            let base64 = result.split(",");
            let data = {
              fileInfo: base64[1],
              suffix: "jpeg",
              desc: "行驶证正面"
            };
            //上传行驶证正面
            axiosRequest({
              url: "" + "/agent-api/add_apply/upload_cehicle_license_front",
              method: "post",
              data: { ...data },
              headers: { "Content-Type": "application/json" }
            }).then(res => {
              this.loading.close();
              if (res.data.code == "200") {
                this.$message.success("上传成功");
                this.carData[index].licenseNo = res.data.data.licenseNo;
                this.carData[index].ownerName = res.data.data.ownerName;
                this.carData[index].frameNo = res.data.data.frameNo;
                this.carData[index].engineNo = res.data.data.engineNo;
                this.carData[index].licenseFontUrl = res.data.data.imageUrl;
              } else {
                this.$message.error("上传失败,请重新上传");
              }
            });
          });
      } else {
        this.$message.error("图片格式错误");
      }
    },
    //上传行驶证反面
    drivingLicense2(value, index) {
      let file = value.file;
      if (
        file.type == "image/jpeg" ||
        file.type == "image/jpg" ||
        file.type == "image/bmp" ||
        file.type == "image/png"
      ) {
        let url = URL.createObjectURL(file);
        axios
          .compressImage(url, {
            width: 410, // 压缩后图片的宽
            height: 410, // 压缩后图片的高，宽高若只传一个，则按图片原比例进行压缩
            quality: 0.988888 // 压缩后图片的清晰度，取值0-1，不传默认为0.7，值越小，所绘制出的图像越模糊
          })
          .then(result => {
            this.loading = this.$loading({
              lock: true,
              text: "上传中...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            let base64 = result.split(",");
            let data = {
              fileInfo: base64[1],
              suffix: "jpeg",
              desc: "行驶证反面"
            };
            //上传行驶证ocr识别
            axiosRequest({
              url: "" + "/agent-api/add_apply/upload_cehicle_license_Back",
              method: "post",
              data: { ...data },
              headers: { "Content-Type": "application/json" }
            }).then(res => {
              this.loading.close();
              if (res.data.code == "200") {
                this.$message.success("上传成功");
                this.carData[index].licenseBackUrl = res.data.data.imageUrl;
              } else {
                this.$message.error("上传失败,请重新上传");
              }
            });
          });
      } else {
        this.$message.error("图片格式错误");
      }
    },

    //上传合格证
    uploadCertificate(value, index) {
      

      let file = value.file;
      if (
        file.type == "image/jpeg" ||
        file.type == "image/jpg" ||
        file.type == "image/bmp" ||
        file.type == "image/png"
      ) {
        let url = URL.createObjectURL(file);
        axios
          .compressImage(url, {
            width: 410, // 压缩后图片的宽
            height: 410, // 压缩后图片的高，宽高若只传一个，则按图片原比例进行压缩
            quality: 0.988888 // 压缩后图片的清晰度，取值0-1，不传默认为0.7，值越小，所绘制出的图像越模糊
          })
          .then(result => {
            this.loading = this.$loading({
              lock: true,
              text: "上传中...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            let base64 = result.split(",");
            let data = {
              fileInfo: base64[1],
              suffix: "jpeg",
              desc: "合格证"
            };
            //上传合格证
            axiosRequest({
              url: "" + "/agent-api/add_apply/upload_cehicle_license_Back",
              method: "post",
              data: { ...data },
              headers: { "Content-Type": "application/json" }
            }).then(res => {
              this.loading.close();
              if (res.data.code == "200") {
                 
                this.$message.success("上传成功");
                this.carCertificateData[index].licenseFontUrl = res.data.data.imageUrl;
              } else {
                this.$message.error("上传失败,请重新上传");
              }
            });
          });
      } else {
        this.$message.error("图片格式错误");
      }
    },

    //删除上传的合格证
    fileRemove(file, index) {
      this.carCertificateData[index].licenseFontUrl = "";
    },

    //生成申请订单
    createOrder() {
     
      let { carData, carCertificateData } = this;
      if (!this.ids) {
        this.$message.error("基本信息不能为空");
        return;
      }

      if (this.carRadio == "VEHICLE_LICENSE") {
        //填写完整的数据
        let completeData = carData.filter(item => {
          if (
            item.licenseNo &&
            item.ownerName &&
            item.frameNo &&
            item.engineNo &&
            item.licenseFontUrl &&
            item.licenseBackUrl
          ) {
            return item;
          }
        });
        //空数据或没有填完的数据
        let dataNull = carData.filter(item => {
          if (
            !item.licenseNo ||
            !item.ownerName ||
            !item.frameNo ||
            !item.engineNo ||
            !item.licenseFontUrl ||
            !item.licenseBackUrl
          ) {
            this.$message.error(
              "每项数据为必填,当前存在未补充完整的数据,建议补充完整或删除选项"
            );
          }
        });

        if (dataNull.length !== 0 || completeData.length == 0) {
          this.$message.error(
            "每项数据为必填,当前存在未补充完整的数据,建议补充完整或删除选项"
          );
          return;
        } else {
          let carInfo = JSON.stringify(completeData);
          let data = {
            licenseType: this.carRadio,
            carInfo,
            loginName:this.loginName,
            ids: this.ids
          };

          axios.insertApply(data).then(res => {
            if (res.data.code == "200") {
              this.$message.success("生成订单成功");
              this.$router.push({ path: "/supplierRegister" });
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      } else {
        //填写完整的数据
        let completeData = carCertificateData.filter(item => {
          if (
            // item.licenseNo &&
            item.ownerName &&
            item.frameNo &&
            item.engineNo &&
            item.licenseFontUrl
          ) {
            return item;
          }
        });
        //空数据或没有填完的数据
        let dataNull = carCertificateData.filter(item => {
          if (
            // !item.licenseNo ||
            !item.ownerName ||
            !item.frameNo ||
            !item.engineNo ||
            !item.licenseFontUrl
          ) {
            // this.$message.error(
            //   "每项数据为必填,当前存在未补充完整的数据,建议补充完整或删除选项"
            // );
          }
        });

        if (dataNull.length !== 0 || completeData.length == 0) {
          // this.$message.error(
          //   "每项数据为必填,当前存在未补充完整的数据,建议补充完整或删除选项"
          // );
          return;
        } else {
          let carInfo = JSON.stringify(completeData);
          let data = {
            licenseType: this.carRadio,
            loginName:this.loginName,
            carInfo,
            ids: this.ids
          };

          axios.insertApply(data).then(res => {
            if (res.data.code == "200") {
              this.$message.success("生成订单成功");
              this.$router.push({ path: "/supplierRegister" });
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      }
    },
    //取消生成订单
    cancelBtn() {
      this.$confirm("此操作将取消生成订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
              this.$message.success("取消生成订单成功");
              this.$router.go(-1)
        })
        .catch(() => {});
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "supplierDetail.scss";
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.identityCard {
  width: 230px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avatar {
  width: 100%;
  height: 100%;
}
</style>
