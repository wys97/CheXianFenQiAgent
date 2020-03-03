import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../page/layout/Layout.vue'
import LayoutTwo from '../page/layoutTwo/Layout.vue'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [
    { path: '/login', component: _import('Login'), hidden: true },
    { path: '/404', component: _import('errorPage/404'), hidden: true },
    { path: '/401', component: _import('errorPage/401'), hidden: true },
    {
        path: '/',
        redirect: '/home',
        component: Layout,
        isHome: true,
        name: '',
        children: [{
            path: 'home',
            name: '首页',
            component: resolve => require(['@/page/Home.vue'], resolve)
        }]
    },

    {
        path: '',
        icon: 'icon-home',
        redirect: 'home',
        component: Layout,
        noDropdown: true,
        name: '首页',
        children: [{
            path: 'home',
            name: '首页',
            component: resolve => require(['@/page/Home.vue'], resolve)
        }]
    },
]
export default new Router({
    routes: constantRouterMap
})
export const asyncRouterMap = [
    { path: '*', redirect: '/404', hidden: true },
    {
        path: '',
        component: Layout,
        name: '业务受理',
        icon: 'icon-supplier-manage',
        children: [{
            path: 'supplierRegister',
            icon: 'icon-supplier-manage',
            name: '分期申请',
            component: resolve => require(['@/page/supplierManage/SupplierRegister.vue'], resolve)
        }, {
            hidden: true,
            path: 'supplierDetail/:id/:orderNo',
            name: '分期申请详情',
            component: resolve => require(['@/page/supplierManage/SupplierDetail.vue'], resolve)
        },
        {
            hidden: true,
            path: 'newApplication',
            name: '新增分期申请',
            component: resolve => require(['@/page/supplierManage/newApplication.vue'], resolve)
        },
        {
            hidden: true,
            path: 'supplementaryInformation/:id',
            name: '分期申请补充详情',
            component: resolve => require(['@/page/supplierManage/supplementaryInformation.vue'], resolve)
        },
        ]
    },
    {
        path: '',
        component: Layout,

        name: '订单查询',
        icon: 'icon-supplier-manage',
        children: [{
            path: 'supplierMaintainList',
            icon: 'icon-supplier-manage',
            name: '分期订单查询',
            component: resolve => require(['@/page/supplierMaintain/supplierMaintainList.vue'], resolve)
        }, {
            hidden: true,
            path: 'supplierMaintainDetail/:id/:orderNo',
            name: '分期订单详情',
            component: resolve => require(['@/page/supplierMaintain/supplierMaintainDetail.vue'], resolve)
        },]
    },
    {
        path: '',
        component: Layout,

        name: '还款管理',
        icon: 'icon-supplier-manage',
        children: [{
            path: 'repaymentList',
            icon: 'icon-supplier-manage',
            name: '还款列表',
            component: resolve => require(['@/page/repaymentManage/repaymentList.vue'], resolve)
        }, {
            hidden: true,
            path: 'repaymentDetail/:orderNo/:periodNo',
            name: '还款详情',
            component: resolve => require(['@/page/repaymentManage/repaymentDetail.vue'], resolve)
        },
        {
            path: 'collectionList',
            icon: 'icon-supplier-manage',
            name: '催收列表',
            component: resolve => require(['@/page/repaymentManage/collectionList.vue'], resolve)
        }, {
            hidden: true,
            path: 'collectionDetail/:id',
            name: '催收详情',
            component: resolve => require(['@/page/repaymentManage/collectionDetail.vue'], resolve)
        },
        ]
    },
    {
        path: '',
        component: Layout,

        name: '结算账单',
        icon: 'icon-supplier-manage',
        children: [{
            path: 'settleBatchList',
            icon: 'icon-supplier-manage',
            name: '结算列表',
            component: resolve => require(['@/page/supplierManage/settleBatchList.vue'], resolve)
        }]
    },
    {
        path: '',
        component: Layout,

        name: '推广配置',
        icon: 'icon-supplier-manage',
        children: [{
            path: 'recommandSeeting',
            icon: 'icon-supplier-manage',
            name: '推广配置',
            component: resolve => require(['@/page/supplierManage/recommandSeeting.vue'], resolve)
        }]
    },
]