<template>
  <div class="common-aside">
    <div class="logo">
      <img src="../assets/img/logo.png" />
      <div class="title">运行维护数据统计分析系统</div>
    </div>
    <el-menu
      class="menu"
      unique-opened
      :default-active="$route.path"
      text-color="#383838"
      active-text-color="#2C7EF8"
      @select="onMenuSelect"
      :router="true"
    >
      <template v-for="item in menu" :key="item.path" :index="item.path">
        <el-sub-menu v-if="item.children.length > 0" :index="item.path">
          <template #title>
            <img
              class="menu-icon"
              :src="
                item.path.indexOf($route.path) > -1 ? item.iconOn : item.icon
              "
            />
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="subitem in item.children"
            :index="subitem.path"
            :disabled="subitem.disabled"
            >{{ subitem.name }}</el-menu-item
          >
        </el-sub-menu>
        
        <el-menu-item v-else :index="item.path" :disabled="item.disabled">
          <template #title>
            <img
              class="menu-icon"
              :src="$route.path === item.path ? item.iconOn : item.icon"
            />
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
    <span class="update-time">更新时间：{{ updateTime }}</span>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      routePath: '',
      updateTime: '',
      menu: [],
    }
  },
  mounted() {
    this.updateTime = window.config.updateTime
    this.routePath = this.$route.meta?.parent || this.$route.path
    let grade = JSON.parse(Cookies.get('user')).grade
    let role = JSON.parse(Cookies.get('user')).role
    switch (grade) {
      case '网格员':
        this.menu = [
          {
            icon: new URL(
              '../assets/img/icon_detail_normal.png',
              import.meta.url,
            ),
            iconOn: new URL(
              '../assets/img/icon_detail_on.png',
              import.meta.url,
            ),
            path: '/arrearage/television/broadband/one/bank/cash',
            name: '明细查询',
            children: [
              {
                path: '/arrearage',
                name: '欠费用户明细',
              },
              {
                path: '/television',
                name: '数字电视特殊客户明细',
              },
              {
                path: '/broadband',
                name: '光纤宽带特殊客户明细',
              },
              {
                path: '/install',
                name: '安装工单明细',
              },
              {
                path: '/repair',
                name: '维修工单明细',
              },
              {
                path: '/once',
                name: '一次性费用明细',
              },
            ],
          },
        ]
        break
      case '站长':
        this.menu = [
          {
            icon: new URL(
              '../assets/img/icon_cloud_normal.png',
              import.meta.url,
            ),
            iconOn: new URL('../assets/img/icon_cloud_on.png', import.meta.url),
            path: '/basic/daily/history',
            name: '云BOSS',
            children: [
              {
                path: '/daily',
                name: 'KPI日报',
              },
              {
                path: '/history',
                name: 'KPI历史趋势',
              },
              {
                path: '/basic',
                name: 'KPI基础数据',
              },
              {
                path: '/report',
                name: '5G发展报表',
              },
            ],
          },
          {
            icon: new URL(
              '../assets/img/icon_detail_normal.png',
              import.meta.url,
            ),
            iconOn: new URL(
              '../assets/img/icon_detail_on.png',
              import.meta.url,
            ),
            path: '/arrearage/television/broadband/install/repair',
            name: '明细查询',
            children: [
              {
                path: '/arrearage',
                name: '欠费用户明细',
              },
              {
                path: '/television',
                name: '数字电视客户变化明细',
              },
              {
                path: '/broadband',
                name: '光纤宽带客户变化明细',
              },
              {
                path: '/install',
                name: '安装工单明细',
              },
              {
                path: '/repair',
                name: '维修工单明细',
              },
              {
                path: '/once',
                name: '一次性费用明细',
              },
            ],
          },
          {
            icon: new URL(
              '../assets/img/icon_analysis_normal.png',
              import.meta.url,
            ),
            iconOn: new URL(
              '../assets/img/icon_analysis_on.png',
              import.meta.url,
            ),
            path: '/OrderAnalysis/APPAnalysis',
            name: '用户行为分析',
            children: [
              {
                path: '/OrderAnalysis',
                name: '工单系统分析',
              },
              {
                path: '/APPAnalysis',
                name: '电视栏目分析',
              },
              {
                path: '/WriteoffAnalysis',
                name: '销账分析',
              },
              {
                path: '/LostAnalysis',
                name: '流失用户分析',
              },
            ],
          },
          {
            icon: new URL(
              '../assets/img/icon_manual_normal.png',
              import.meta.url,
            ),
            iconOn: new URL(
              '../assets/img/icon_manual_on.png',
              import.meta.url,
            ),
            path: '/annual/country',
            name: '手动设置',
            children: [
              {
                path: '/annual',
                name: 'KPI年度目标',
              },
              // {
              //   path: '/country',
              //   name: '整村付费',
              // },
            ],
          },
        ]
        break
      case '管理员':
        this.menu = [
          {
            icon: new URL(
              '../assets/img/icon_cloud_normal.png',
              import.meta.url,
            ),
            iconOn: new URL('../assets/img/icon_cloud_on.png', import.meta.url),
            path: '/basic/daily/history',
            name: '云BOSS',
            children: [
              {
                path: '/daily',
                name: 'KPI日报',
              },
              {
                path: '/history',
                name: 'KPI历史趋势',
              },
              {
                path: '/basic',
                name: 'KPI基础数据',
              },
              {
                path: '/report',
                name: '5G发展报表',
              },
            ],
          },
          {
            icon: new URL(
              '../assets/img/icon_detail_normal.png',
              import.meta.url,
            ),
            iconOn: new URL(
              '../assets/img/icon_detail_on.png',
              import.meta.url,
            ),
            path: '/arrearage/television/broadband/install/repair',
            name: '明细查询',
            children: [
              {
                path: '/arrearage',
                name: '欠费用户明细',
              },
              {
                path: '/television',
                name: '数字电视客户变化明细',
              },
              {
                path: '/broadband',
                name: '光纤宽带客户变化明细',
              },
              {
                path: '/install',
                name: '安装工单明细',
              },
              {
                path: '/repair',
                name: '维修工单明细',
              },
              {
                path: '/once',
                name: '一次性费用明细',
              },
            ],
          },
          {
            icon: new URL(
              '../assets/img/icon_analysis_normal.png',
              import.meta.url,
            ),
            iconOn: new URL(
              '../assets/img/icon_analysis_on.png',
              import.meta.url,
            ),
            path: '/OrderAnalysis/APPAnalysis',
            name: '用户行为分析',
            children: [
              {
                path: '/OrderAnalysis',
                name: '工单系统分析',
              },
              {
                path: '/APPAnalysis',
                name: '电视栏目分析',
              },
              {
                path: '/WriteoffAnalysis',
                name: '销账分析',
              },
              {
                path: '/LostAnalysis',
                name: '流失用户分析',
              },
            ],
          },
          {
            icon: new URL(
              '../assets/img/icon_media_normal.png',
              import.meta.url,
            ),
            iconOn: new URL(
              '../assets/img/icon_media_on.png',
              import.meta.url,
            ),
            path: '/MediaAnalysis/Lanmu',
            name: '新媒体运营分析',
            children: [
              {
                path: '/Lanmu',
                name: '栏目管理',
              },
              {
                path: '/Toufang',
                name: '投放计划',
              },
            ],
          },
          {
            icon: new URL(
              '../assets/img/icon_manual_normal.png',
              import.meta.url,
            ),
            iconOn: new URL(
              '../assets/img/icon_manual_on.png',
              import.meta.url,
            ),
            path: '/annual/country',
            name: '手动设置',
            children: [
              {
                path: '/annual',
                name: 'KPI年度目标',
              },
            ],
          },
        ]
        break
    }
    if (role == '系统管理者') {
      this.menu.push(
        {
          icon: new URL('../assets/img/icon_user_normal.png', import.meta.url),
          iconOn: new URL('../assets/img/icon_user_on.png', import.meta.url),
          path: '/UserManage/LoginLog',
          name: '平台管理',
          children: [
            {
              path: '/UserManage',
              name: '用户管理',
            },
            {
              path: '/LoginLog',
              name: '登录日志',
            },
          ],
        },
        {
          icon: new URL(
            '../assets/img/icon_subscribe_normal.png',
            import.meta.url,
          ),
          iconOn: new URL(
            '../assets/img/icon_subscribe_on.png',
            import.meta.url,
          ),
          path: '/ArrearageSubscribe/TVSubscribe/FDDISubscribe',
          name: '消息订阅',
          children: [
            {
              path: '/ArrearageSubscribe',
              name: '欠费客户消息',
            },
            {
              path: '/TVSubscribe',
              name: '数字电视客户变化消息',
            },
            {
              path: '/FDDISubscribe',
              name: '光纤宽带客户变化消息',
            },
          ],
        },
      )
    }
  },
  methods: {
    onMenuSelect(path) {
      this.$router.push(path)
    },
  },
  watch: {
    $route: {
      handler: function (route) {
        this.routePath = route.path
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>

<style lang="scss">
.common-aside {
  width: 300px;
  height: 100%;
  padding-top: 70px;
  text-align: center;
  overflow: hidden;
  position: relative;
  .logo {
    img {
      width: 74px;
      height: 66px;
    }
  }
  .title {
    width: 190px;
    height: 64px;
    margin: 13px auto 0;
    font-size: 28px;
    font-weight: bold;
    color: #383838;
    line-height: 38px;
  }
  .menu {
    margin-top: 40px;
    padding: 0 20px;
    > .el-menu-item {
      width: 252px;
      height: 56px;
      border-radius: 4px;
      margin-bottom: 20px;
      color: #383838;
      text-align: left;
      padding-left: 40px !important;
      &:hover {
        opacity: 0.8;
      }
      &.is-active {
        color: #fff;
        background-color: #2c7ef8 !important;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.16);
      }
    }
    > .el-sub-menu {
      margin-bottom: 20px;
      .el-menu-item {
        justify-content: flex-start;
      }
      &.is-active {
        .el-sub-menu__title {
          color: #fff !important;
          background-color: #2c7ef8 !important;
          text-align: left;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
  .el-menu {
    height: calc(100% - 220px);
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: transparent;
    .el-sub-menu {
      text-align: left;
      .el-menu-item {
        padding-left: 80px !important;
      }
      .el-sub-menu__title {
        justify-content: flex-start;
        border-radius: 4px;
        margin-bottom: 20px;
        padding-left: 40px !important;
      }
    }
    .el-menu-item,
    .el-sub-menu__title {
      align-items: center;
      justify-content: flex-start;
      span {
        height: 56px;
        font-size: 16px;
        font-weight: 400;
        line-height: 56px;
        padding-left: 0 !important;
        text-align: center;
      }
    }
    .menu-icon {
      width: 24px;
      height: 24px;
      margin-right: 15px;
    }
  }
  .update-time {
    position: absolute;
    z-index: 99;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%);
    font-size: 12px;
    color: #b6b6b6;
    white-space: nowrap;
  }
}
</style>
