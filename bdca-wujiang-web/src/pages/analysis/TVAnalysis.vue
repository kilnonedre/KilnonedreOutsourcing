<template>
  <div class="page order">
    <common-header title="电视栏目分析"></common-header>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :disabled="tabDisable" label="区域点击量分析" name="区域"></el-tab-pane>
        <el-tab-pane :disabled="tabDisable" label="栏目点击量分析" name="栏目"></el-tab-pane>
        <el-tab-pane :disabled="tabDisable" label="专区用户点击量分析" name="专区"></el-tab-pane>
        <el-tab-pane :disabled="tabDisable" label="用户点击量分析" name="用户"></el-tab-pane>
      </el-tabs>
      <div class="tab-content">
        <div class="group">
          <el-radio-group v-model="checkPeriod" style="margin-right: 20px" @change="handleCheckedPeriodChange">
            <el-radio-button :disabled="tabDisable" label="按日统计"></el-radio-button>
            <el-radio-button :disabled="tabDisable" label="按周统计"></el-radio-button>
            <el-radio-button :disabled="tabDisable" label="按月统计"></el-radio-button>
          </el-radio-group>
          <el-checkbox-group v-if="activeName != '用户' && activeName != '栏目'" v-model="checkGroup" @change="handleCheckedGroupChange">
            <el-checkbox label="中心及广电站" />
            <el-checkbox label="客户类型" />
            <el-checkbox v-if="checkPeriod == '按日统计'" label="客户创建日期" />
            <el-checkbox v-else-if="checkPeriod == '按周统计'" label="客户创建周" />
            <el-checkbox v-else-if="checkPeriod == '按月统计'" label="客户创建月" />
            <el-checkbox v-if="checkPeriod == '按日统计'" label="终端创建日期" />
            <el-checkbox v-else-if="checkPeriod == '按周统计'" label="终端创建周" />
            <el-checkbox v-else-if="checkPeriod == '按月统计'" label="终端创建月" />
            <el-checkbox label="客户状态" />
            <el-checkbox label="乡镇/街道" />
            <el-checkbox label="村/社区" />
            <el-checkbox label="小区" />
          </el-checkbox-group>
          <el-checkbox-group v-else-if="activeName == '栏目'" v-model="checkGroupforLanmu" @change="handleCheckedGroupforLanmuChange">
            <el-checkbox v-if="checkPeriod == '按日统计'" label="按日统计" />
            <el-checkbox v-else-if="checkPeriod == '按周统计'" label="按周统计" />
            <el-checkbox v-else-if="checkPeriod == '按月统计'" label="按月统计" />
            <el-checkbox label="栏目名称（栏目ID+名称）" />
            <el-checkbox label="栏目大类" />
            <el-checkbox label="一级栏目位" />
            <el-checkbox label="二级栏目位" />
          </el-checkbox-group>
          <div v-else class="input-search">
            <el-input
              v-model="caCard"
              placeholder="请输入卡号"
              clearable
              @blur="search"
              @clear="search"
              style="margin-right: 20px"
            ></el-input>
            <el-input
              v-model="custId"
              placeholder="请输入客户证号"
              clearable
              @blur="search"
              @clear="search"
            ></el-input>
          </div>
        </div>
        <div class="toolbox">
          <div class="left" v-if="activeName != '栏目'">
            <div class="date-pick">
              <el-date-picker
                v-if="checkPeriod == '按日统计'"
                v-model="date"
                type="daterange"
                format="YYYY-MM-DD"
                value-format="YYYY/MM/DD"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 250px"
                @change="changeTime"
              />
              <div v-else-if ="checkPeriod == '按周统计'">
                <el-date-picker
                  v-model="week1forShow"
                  type="week"
                  format="YYYY 第 ww 周"
                  placeholder="开始周"
                  style="width: 160px">
                </el-date-picker>
                至
                <el-date-picker
                  v-model="week2forShow"
                  type="week"
                  format="YYYY 第 ww 周"
                  placeholder="结束周"
                  style="width: 160px"
                  @change="changeWeekTime">
                </el-date-picker>
              </div>
              <el-date-picker
                v-else-if ="checkPeriod == '按月统计'"
                v-model="month"
                type="monthrange"
                format="YYYY/MM"
                value-format="YYYY/MM"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                style="width: 250px"
                @change="changeTime">
              </el-date-picker>
            </div>
            <div>
              <el-select
                v-model="station"
                placeholder="中心及广电站"
                clearable
                style="width: 150px"
                @change="getTableList(activeName, checkPeriod)"
              >
                <el-option v-for="item in stationOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <el-select
                v-model="custType"
                placeholder="客户类型"
                clearable
                style="width: 150px"
                @change="getTableList(activeName, checkPeriod)"
              >
                <el-option v-for="item in custTypeList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div class="date-pick">
              <el-date-picker
                v-if="checkPeriod == '按日统计'"
                v-model="createDate"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY/MM/DD"
                placeholder="客户创建日期"
                style="width: 150px"
                @change="changeTime">
              </el-date-picker>
              <el-date-picker
                v-else-if="checkPeriod == '按周统计'"
                v-model="createWeek"
                type="week"
                format="YYYY 第 ww 周"
                placeholder="客户创建周"
                style="width: 150px"
                @change="changeTime">
              </el-date-picker>
              <el-date-picker
                v-else-if="checkPeriod == '按月统计'"
                v-model="createMonth"
                type="month"
                format="YYYY/MM"
                value-format="YYYY/MM"
                placeholder="客户创建月"
                style="width: 150px"
                @change="changeTime">
              </el-date-picker>
            </div>
            <div class="date-pick">
              <el-date-picker
                v-if="checkPeriod == '按日统计'"
                v-model="createDateS"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY/MM/DD"
                placeholder="终端创建日期"
                style="width: 150px"
                @change="changeTime">
              </el-date-picker>
              <el-date-picker
                v-else-if="checkPeriod == '按周统计'"
                v-model="createSWeek"
                type="week"
                format="YYYY 第 ww 周"
                placeholder="终端创建周"
                style="width: 150px"
                @change="changeTime">
              </el-date-picker>
              <el-date-picker
                v-else-if="checkPeriod == '按月统计'"
                v-model="createSMonth"
                type="month"
                format="YYYY/MM"
                value-format="YYYY/MM"
                placeholder="终端创建月"
                style="width: 150px"
                @change="changeTime">
              </el-date-picker>
            </div>
            <div>
              <el-select
                v-model="zt"
                placeholder="客户状态"
                clearable
                style="width: 150px"
                @change="getTableList(activeName, checkPeriod)"
              >
                <el-option v-for="item in ztList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <el-select
                v-model="region1"
                placeholder="乡镇/街道"
                clearable
                style="width: 150px"
                @change="getTableList(activeName, checkPeriod)"
              >
                <el-option v-for="item in regionList1" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <el-select
                v-model="region2"
                placeholder="村/社区"
                clearable
                style="width: 150px"
                @change="getTableList(activeName, checkPeriod)"
              >
                <el-option v-for="item in regionList2" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <el-select
                v-model="region3"
                placeholder="小区"
                clearable
                style="width: 150px"
                @change="getTableList(activeName, checkPeriod)"
              >
                <el-option v-for="item in regionList3" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
          </div>
          <div class="left" v-else>
            <div class="date-pick">
              <el-date-picker
                v-if="checkPeriod == '按日统计'"
                v-model="date"
                type="daterange"
                format="YYYY-MM-DD"
                value-format="YYYY/MM/DD"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 250px"
                @change="changeTime"
              />
              <div v-else-if ="checkPeriod == '按周统计'">
                <el-date-picker
                  v-model="week1forShow"
                  type="week"
                  format="YYYY 第 ww 周"
                  placeholder="开始周"
                  style="width: 160px">
                </el-date-picker>
                至
                <el-date-picker
                  v-model="week2forShow"
                  type="week"
                  format="YYYY 第 ww 周"
                  placeholder="结束周"
                  style="width: 160px"
                  @change="changeWeekTime">
                </el-date-picker>
              </div>
              <el-date-picker
                v-else-if ="checkPeriod == '按月统计'"
                v-model="month"
                type="monthrange"
                format="YYYY/MM"
                value-format="YYYY/MM"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                style="width: 250px"
                @change="changeTime">
              </el-date-picker>
            </div>
            <div>
              <el-select
                v-model="name"
                placeholder="栏目名称"
                clearable
                style="width: 150px"
                @change="getTableList(activeName, checkPeriod)"
              >
                <el-option v-for="item in nameList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <el-select
                v-model="appClass"
                placeholder="栏目大类"
                clearable
                style="width: 150px"
                @change="getTableList(activeName, checkPeriod)"
              >
                <el-option v-for="item in appClassList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <el-select
                v-model="positionLevel1"
                placeholder="一级栏目位"
                clearable
                style="width: 150px"
                @change="getTableList(activeName, checkPeriod)"
              >
                <el-option v-for="item in positionLevel1List" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <el-select
                v-model="positionLevel2"
                placeholder="二级栏目位"
                clearable
                style="width: 150px"
                @change="getTableList(activeName, checkPeriod)"
              >
                <el-option v-for="item in positionLevel2List" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
          </div>
          <div class="right">
            <el-button type="primary" @click="onExport" :loading="downLoading">导出数据</el-button>
          </div>
        </div>
        <div class="table">
          <el-table
            ref="table"
            height="100%"
            stripe
            border
            v-loading="loading"
            :data="tableData"
            :header-cell-style="{
              background: '#eaf2fe',
              color: '#383838',
              fontSize: '16px',
              height: '34px',
            }"
            :row-style="{
              height: '24px',
              fontSize: '14px',
            }"
            @sort-change="sortTable"
          >
            <el-table-column
              v-for="(item, index) in tableHeader"
              :label="item.label"
              :prop="index"
              align="center"
              :min-width="item.width ? item.width + '' : '100'"
              :sortable="item.sort ? 'custom' : false"
            >
              <template #default="scope">
                <span>{{ scope.row[index] }}</span>
              </template>
            </el-table-column>
            <template #empty>
              <div style="margin-top: 5%">暂无数据</div>
            </template>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[20, 30, 50, 100, 1000]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from '#/CommonHeader.vue'

import { behavior, management } from '@api'
import { isArray } from '@vue/shared'

import table2excel from '../../plugins/table2excel'

const originGroup = 'regionName1,regionName2,regionName3,station,custType,createDate,createDateS,createWeek,createSWeek,createMonth,createSMonth,zt'

const GROUP = {
  '乡镇/街道': 'regionName1',
  '村/社区': 'regionName2',
  '小区': 'regionName3',
  '中心及广电站': 'station',
  '客户类型': 'custType',
  '客户创建日期': 'createDate',
  '终端创建日期': 'createDateS',
  '客户创建周': 'createWeek',
  '终端创建周': 'createWeek',
  '客户创建月': 'createMonth',
  '终端创建月': 'createMonth',
  '统计日期': 'dateYmd',
  '统计周': 'week',
  '统计月': 'month',
  '客户状态': 'zt',
}

const originGroupforLanmu = 'dateYmd,dateWeek,statisticMonth,appId,name,appClass,positionLevel1,positionLevel2'

const GROUPforLanmu = {
  '按日统计': 'dateYmd',
  '按周统计': 'dateWeek',
  '按月统计': 'statisticMonth',
  '栏目名称（栏目ID+名称）': 'appId,name',
  '栏目大类': 'appClass',
  '一级栏目位': 'positionLevel1',
  '二级栏目位': 'positionLevel2',
}

const header = {
  station: {
    label: '广电中心及广电站',
    width: '180',
    sort: true
  },
  regionName1: {
    label: '乡镇/街道',
    width: '120',
    sort: true
  },
  regionName2: {
    label: '村/社区',
    width: '120',
    sort: true
  },
  regionName3: {
    label: '小区',
    width: '250',
    sort: true
  },
  custType: {
    label: '客户类型',
    width: '120',
    sort: true
  },
  zt: {
    label: '客户状态',
    width: '120',
    sort: true
  },
  createDate: {
    label: '客户创建日期',
    width: '160',
    sort: true
  },
  createDateS: {
    label: '终端创建日期',
    width: '160',
    sort: true
  },
  createWeek: {
    label: '客户创建周',
    width: '160',
    sort: true
  },
  createSWeek: {
    label: '终端创建周',
    width: '160',
    sort: true
  },
  createMonth: {
    label: '客户创建月',
    width: '160',
    sort: true
  },
  createSMonth: {
    label: '终端创建月',
    width: '160',
    sort: true
  },
  dateYmd: {
    label: '统计日期',
    width: '160',
    sort: true
  },
  week: {
    label: '统计周',
    width: '160',
    sort: true
  },
  month: {
    label: '统计月',
    width: '160',
    sort: true
  },
  clickSum: {
    label: '总点击量',
    width: '120',
    sort: true
  },
  openCustCount: {
    label: '开机户数',
    width: '120',
    sort: true
  },
  custSum: {
    // label: '总客户数',
    label: '开机户比',
    width: '120',
    sort: false
  },
  openSubCount: {
    label: '开机终端数',
    width: '130',
    sort: true
  },
  subSum: {
    // label: '总终端数',
    label: '开机端比',
    width: '120',
    sort: false
  },
  appCountAvg: {
    label: '平均访问app数',
    width: '180',
    sort: true
  },
  openDaysAvg: {
    label: '平均开机天数',
    width: '150',
    sort: true
  },
  openWorkDaysAvg: {
    label: '工作日平均开机天数',
    width: '200',
    sort: true
  },
  openWeekendDaysAvg: {
    label: '周六日平均开机天数',
    width: '200',
    sort: true
  },
  openCustDays10: {
    label: '开机天数>10客户数',
    width: '200',
    sort: true
  },
  openSubDays10: {
    label: '开机天数>10终端数',
    width: '200',
    sort: true
  },
  openCustXuanliCount: {
    label: '炫力少儿开机户数',
    width: '200',
    sort: true
  },
  openCustXuanliSum: {
    // label: '炫力少儿总户数',
    label: '炫力少儿开机户比',
    width: '200',
    sort: false
  },
  openCustQiyiCount: {
    label: '爱奇艺开机户数',
    width: '200',
    sort: true
  },
  openCustQiyiSum: {
    // label: '爱奇艺总户数',
    label: '爱奇艺开机户比',
    width: '200',
    sort: false
  },
  openCustXuebaCount: {
    label: '学霸宝盒开机户数',
    width: '200',
    sort: true
  },
  openCustXuebaSum: {
    // label: '学霸宝盒总户数',
    label: '学霸宝盒开机户比',
    width: '220',
    sort: false
  },
  openCustMovieCount: {
    label: '电影开机户数',
    width: '200',
    sort: true
  },
  openCustMovieSum: {
    // label: '电影总户数',
    label: '电影开机户比',
    width: '200',
    sort: false
  },
  openCustManguoCount: {
    label: '芒果tv开机户数',
    width: '220',
    sort: true
  },
  openCustManguoSum: {
    // label: '芒果tv总户数',
    label: '芒果tv开机户比',
    width: '200',
    sort: false
  },
  openCustDianjingCount: {
    label: '电竞开机户数',
    width: '200',
    sort: true
  },
  openCustDianjingSum: {
    // label: '电竞总户数',
    label: '电竞开机户比',
    width: '200',
    sort: false
  },
  caCard: {
    label: '用户cacard',
    width: '150',
    sort: true
  },
  custId: {
    label: '客户证号',
    width: '150',
    sort: true
  },
  statisticTime: {
    label: '统计日期',
    width: '150',
    sort: true
  },
  clickAvg: {
    label: '平均点击数',
    width: '150',
    sort: true
  },
  appCount: {
    label: '访问app数',
    width: '150',
    sort: true
  },
  openDays: {
    label: '开机天数',
    width: '150',
    sort: true
  },
  openWorkDays: {
    label: '工作日开机天数',
    width: '180',
    sort: true
  },
  openWeekendDays: {
    label: '周六日开机天数',
    width: '180',
    sort: true
  },
  appId: {
    label: '应用id',
    width: '180',
    sort: true
  },
  name: {
    label: '名称',
    width: '180',
    sort: true
  },
  appClass: {
    label: '栏目大类',
    width: '180',
    sort: true
  },
  positionLevel1: {
    label: '一级栏目位',
    width: '180',
    sort: true
  },
  positionLevel2: {
    label: '二级栏目位',
    width: '180',
    sort: true
  },
  dateWeek: {
    label: '统计周',
    width: '180',
    sort: true
  },
  statisticMonth: {
    label: '统计月份',
    width: '180',
    sort: true
  },
  custAll: {
    label: '缴费开机户比',
    width: '180',
    sort: true
  },
  openCustSum: {
    label: '开机总户数',
    width: '180',
    sort: true
  },
  clickSumLost: {
    label: '流失客户点击总量',
    width: '180',
    sort: true
  },
  openCustCountLost: {
    label: '流失客户开机户数',
    width: '180',
    sort: true
  },
  custLostAll: {
    label: '流失客户开机户比',
    width: '180',
    sort: true
  },
  clickSumNew: {
    label: '新客户点击总量',
    width: '180',
    sort: true
  },
  openCustCountNew: {
    label: '新客户开机户数',
    width: '180',
    sort: true
  },
  custNewAll: {
    label: '新客户开机户比',
    width: '180',
    sort: false
  },
}

const count = ['openCustXuanliCount','openCustQiyiCount','openCustXuebaCount','openCustMovieCount','openCustManguoCount','openCustDianjingCount']
const sum = ['openCustXuanliSum','openCustQiyiSum','openCustXuebaSum','openCustMovieSum','openCustManguoSum','openCustDianjingSum']

export default {
  components: {
    CommonHeader,
  },
  data() {
    return {
      activeName: '区域',
      tabDisable: false,
      loading: true,
      downLoading: false,
      checkPeriod: '按日统计',
      checkGroup: ['中心及广电站'],
      group: 'station,dateYmd',
      checkGroupforLanmu: ['按日统计'],
      groupforLanmu: 'dateYmd',
      // checkGroup: ['乡镇/街道','村/社区','小区','中心及广电站','客户类型','客户创建日期','终端创建日期','统计日期','客户状态'],
      date: '',
      week1: '',
      week2: '',
      week1forShow: '',
      week2forShow: '',
      month: '',
      region1: '',
      regionList1: [],
      region2: '',
      regionList2: [],
      region3: '',
      regionList3: [],
      station: '',
      stationOptions: ['开发区广电中心','汾湖广电中心','高新区广电中心','吴江东太湖中心','七都广电站','桃源广电站','震泽广电站','平望广电站','横扇广电站'],
      custType: '',
      custTypeList: ['公众客户', '普通商业客户','合同商业客户','其他'],
      zt: '缴费',
      ztList: ['暂停','欠停','缴费','销户','管停'],
      appClass: '',
      appClassList: [],
      name: '',
      nameList: [],
      positionLevel1: '',
      positionLevel1List: [],
      positionLevel2: '',
      positionLevel2List: [],
      total: 0,
      pageSize: 100,
      currentPage: 1,
      tableHeader: {},
      tableData: [],
      createDate: '',
      createDateS: '',
      createWeek: '',
      createSWeek: '',
      createMonth: '',
      createSMonth: '',
      caCard: '',
      custId: '',
      ascs: '',
      descs: '',
    }
  },
  // computed: {
  //   week() {
  //     return Math.round((this.week2 - this.week1) / (24 * 60 * 60 * 1000 * 7)) + 1
  //   },
  // },
  watch: {
    week1forShow(newData) {
      if (!newData || !this.week2forShow) {
        this.week1 = ''
      } else if (newData > this.week2forShow) {   // 保证week2大于week1
        this.week1forShow = this.week2forShow
        this.week1 = this.getWeek(this.week1forShow)
      } else {
        this.week1 = this.getWeek(newData)
      }
    }
  },
  methods: {
    getTableList(activeName, period) {
      this.loading = true
      this.tabDisable = true  // 表格加载前把其他 tab 给 disable 掉，不能点击
      this.tableHeader = {}
      this.tableData = []
      if (activeName == '区域') {
        if (period == '按日统计') {
          behavior.getRegionClickDayGroup({
            size: this.pageSize,
            current: this.currentPage,
            date1: isArray(this.date) ? this.date[0] : '',
            date2: isArray(this.date) ? this.date[1] : '',
            regionName1: this.region1,
            regionName2: this.region2,
            regionName3: this.region3,
            station: this.station,
            custType: this.custType,
            createDate: this.createDate,
            createDateS: this.createDateS,
            zt: this.zt,
            groupBy: this.group,
            descs: this.descs,
            ascs: this.ascs,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                if (this.group.indexOf(key) != -1) {
                  this.tableHeader[key] = header[key]
                }
                if (originGroup.indexOf(key) == -1) {
                  this.tableHeader[key] = header[key]
                }
              })
            }
            this.tableData = res.records
            this.tableData.forEach(item => {
              if (item['dateYmd'] != null) {
                item['dateYmd'] = item['dateYmd'].substr(0, 10)
              }
              if (item['createDate'] != null) {
                item['createDate'] = item['createDate'].substr(0, 10)
              }
              if (item['createDateS'] != null) {
                item['createDateS'] = item['createDateS'].substr(0, 10)
              }
              if (item['custSum'] != null) {
                item['custSum'] = Number(item['openCustCount'] / item['custSum'] * 100).toFixed(2) + '%'
              }
              if (item['subSum'] != null) {
                item['subSum'] = Number(item['openSubCount'] / item['subSum'] * 100).toFixed(2) + '%'
              }
              if (item['appCountAvg'] != null) {
                item['appCountAvg'] = item['appCountAvg'].toFixed(2)
              }
            })
            this.total = res.total
          })
          .finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        } else if (period == '按周统计') {
          behavior.getRegionClickWeekGroup({
            size: this.pageSize,
            current: this.currentPage,
            week1: this.week1,
            week2: this.week2,
            regionName1: this.region1,
            regionName2: this.region2,
            regionName3: this.region3,
            station: this.station,
            custType: this.custType,
            createWeek: this.createWeek,
            createSWeek: this.createSWeek,
            zt: this.zt,
            groupBy: this.group,
            descs: this.descs,
            ascs: this.ascs,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                if (this.group.indexOf(key) != -1) {
                  this.tableHeader[key] = header[key]
                }
                if (originGroup.indexOf(key) == -1) {
                  this.tableHeader[key] = header[key]
                }
              })
            }
            this.tableData = res.records
            this.tableData.forEach(item => {
              if (item['custSum'] != null) {
                item['custSum'] = Number(item['openCustCount'] / item['custSum'] * 100).toFixed(2) + '%'
              }
              if (item['subSum'] != null) {
                item['subSum'] = Number(item['openSubCount'] / item['subSum'] * 100).toFixed(2) + '%'
              }
              if (item['openDaysAvg'] != null) {
                item['openDaysAvg'] = item['openDaysAvg'].toFixed(2)
              }
              if (item['openWorkDaysAvg'] != null) {
                item['openWorkDaysAvg'] = item['openWorkDaysAvg'].toFixed(2)
              }
              if (item['openWeekendDaysAvg'] != null) {
                item['openWeekendDaysAvg'] = item['openWeekendDaysAvg'].toFixed(2)
              }
            })
            this.total = res.total
          })
          .finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        } else if (period == '按月统计') {
          behavior.getRegionClickMonthGroup({
            size: this.pageSize,
            current: this.currentPage,
            month1: isArray(this.month) ? this.month[0] : '',
            month2: isArray(this.month) ? this.month[1] : '',
            regionName1: this.region1,
            regionName2: this.region2,
            regionName3: this.region3,
            station: this.station,
            custType: this.custType,
            createMonth: this.createMonth,
            createSMonth: this.createSMonth,
            zt: this.zt,
            groupBy: this.group,
            descs: this.descs,
            ascs: this.ascs,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                if (this.group.indexOf(key) != -1) {
                  this.tableHeader[key] = header[key]
                }
                if (originGroup.indexOf(key) == -1) {
                  this.tableHeader[key] = header[key]
                }
              })
            }
            this.tableData = res.records
            this.tableData.forEach(item => {
              if (item['custSum'] != null) {
                item['custSum'] = Number(item['openCustCount'] / item['custSum'] * 100).toFixed(2) + '%'
              }
              if (item['subSum'] != null) {
                item['subSum'] = Number(item['openSubCount'] / item['subSum'] * 100).toFixed(2) + '%'
              }
              if (item['openDaysAvg'] != null) {
                item['openDaysAvg'] = item['openDaysAvg'].toFixed(2)
              }
              if (item['openWorkDaysAvg'] != null) {
                item['openWorkDaysAvg'] = item['openWorkDaysAvg'].toFixed(2)
              }
              if (item['openWeekendDaysAvg'] != null) {
                item['openWeekendDaysAvg'] = item['openWeekendDaysAvg'].toFixed(2)
              }
            })
            this.total = res.total
          })
          .finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        }
      } else if (activeName == '栏目') {
        if (period == '按日统计') {
          behavior.getLanmuClickDayGroup({
            size: this.pageSize,
            current: this.currentPage,
            date1: isArray(this.date) ? this.date[0] : '',
            date2: isArray(this.date) ? this.date[1] : '',
            name: this.name,
            appClass: this.appClass,
            positionLevel1: this.positionLevel1,
            positionLevel2: this.positionLevel2,
            descs: this.descs,
            ascs: this.ascs,
            groupby: this.groupforLanmu,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                if (this.groupforLanmu.indexOf(key) != -1) {
                  this.tableHeader[key] = header[key]
                }
                if (originGroupforLanmu.indexOf(key) == -1) {
                  this.tableHeader[key] = header[key]
                }
              })
              this.tableHeader['openCustCount'] = {
                label: '缴费开机户数',
                width: '180',
              }
            }
            this.tableData = res.records
            this.tableData.forEach(item => {
              if (item['dateYmd'] != null) {
                item['dateYmd'] = item['dateYmd'].substr(0, 10)
              }
              if (item['custNewAll'] != null) {
                item['custNewAll'] = Number(item['openCustCountNew'] / item['custNewAll'] * 100).toFixed(2) + '%'
              }
              if (item['custLostAll'] != null) {
                item['custLostAll'] = Number(item['openCustCountLost'] / item['custLostAll'] * 100).toFixed(2) + '%'
              }
              if (item['custAll'] != null) {
                item['custAll'] = Number(item['openCustCount'] / item['custAll'] * 100).toFixed(2) + '%'
              }
              for (let i = 0; i < count.length; i++) {
                if (item[sum[i]] == 0) {
                  item[sum[i]] = '/'
                } else {
                  item[sum[i]] = Number(item[count[i]] / item[sum[i]] * 100).toFixed(2) + '%'
                }
              }
            })
            this.total = res.total
          })
          .finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        }
        else if (period == '按周统计') {
          behavior.getLanmuClickWeekGroup({
            size: this.pageSize,
            current: this.currentPage,
            week1: this.week1,
            week2: this.week2,
            name: this.name,
            appClass: this.appClass,
            positionLevel1: this.positionLevel1,
            positionLevel2: this.positionLevel2,
            descs: this.descs,
            ascs: this.ascs,
            groupby: this.groupforLanmu,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                if (this.groupforLanmu.indexOf(key) != -1) {
                  this.tableHeader[key] = header[key]
                }
                if (originGroupforLanmu.indexOf(key) == -1) {
                  this.tableHeader[key] = header[key]
                }
              })
              this.tableHeader['openCustCount'] = {
                label: '缴费开机户数',
                width: '180',
              }
            }
            this.tableData = res.records
            this.tableData.forEach(item => {
              if (item['custNewAll'] != null) {
                item['custNewAll'] = Number(item['openCustCountNew'] / item['custNewAll'] * 100).toFixed(2) + '%'
              }
              if (item['custLostAll'] != null) {
                item['custLostAll'] = Number(item['openCustCountLost'] / item['custLostAll'] * 100).toFixed(2) + '%'
              }
              if (item['custAll'] != null) {
                item['custAll'] = Number(item['openCustCount'] / item['custAll'] * 100).toFixed(2) + '%'
              }
              for (let i = 0; i < count.length; i++) {
                if (item[sum[i]] == 0) {
                  item[sum[i]] = '/'
                } else {
                  item[sum[i]] = Number(item[count[i]] / item[sum[i]] * 100).toFixed(2) + '%'
                }
              }
            })
            this.total = res.total
          })
          .finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        }
        else if (period == '按月统计') {
          behavior.getLanmuClickMonthGroup({
            size: this.pageSize,
            current: this.currentPage,
            month1: isArray(this.month) ? this.month[0] : '',
            month2: isArray(this.month) ? this.month[1] : '',
            name: this.name,
            appClass: this.appClass,
            positionLevel1: this.positionLevel1,
            positionLevel2: this.positionLevel2,
            descs: this.descs,
            ascs: this.ascs,
            groupby: this.groupforLanmu,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                if (this.groupforLanmu.indexOf(key) != -1) {
                  this.tableHeader[key] = header[key]
                }
                if (originGroupforLanmu.indexOf(key) == -1) {
                  this.tableHeader[key] = header[key]
                }
              })
              this.tableHeader['openCustCount'] = {
                label: '缴费开机户数',
                width: '180',
              }
            }
            this.tableData = res.records
            this.tableData.forEach(item => {
              if (item['custNewAll'] != null) {
                item['custNewAll'] = Number(item['openCustCountNew'] / item['custNewAll'] * 100).toFixed(2) + '%'
              }
              if (item['custLostAll'] != null) {
                item['custLostAll'] = Number(item['openCustCountLost'] / item['custLostAll'] * 100).toFixed(2) + '%'
              }
              if (item['custAll'] != null) {
                item['custAll'] = Number(item['openCustCount'] / item['custAll'] * 100).toFixed(2) + '%'
              }
              for (let i = 0; i < count.length; i++) {
                if (item[sum[i]] == 0) {
                  item[sum[i]] = '/'
                } else {
                  item[sum[i]] = Number(item[count[i]] / item[sum[i]] * 100).toFixed(2) + '%'
                }
              }
            })
            this.total = res.total
          })
          .finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        }
      } else if (activeName == '专区') {
        if (period == '按日统计') {
          behavior.getZhuanquClickDayGroup({
            size: this.pageSize,
            current: this.currentPage,
            date1: isArray(this.date) ? this.date[0] : '',
            date2: isArray(this.date) ? this.date[1] : '',
            regionName1: this.region1,
            regionName2: this.region2,
            regionName3: this.region3,
            station: this.station,
            custType: this.custType,
            createDate: this.createDate,
            createDateS: this.createDateS,
            zt: this.zt,
            groupBy: this.group,
            descs: this.descs,
            ascs: this.ascs,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                if (this.group.indexOf(key) != -1) {
                  this.tableHeader[key] = header[key]
                }
                if (originGroup.indexOf(key) == -1) {
                  this.tableHeader[key] = header[key]
                }
              })
            }
            this.tableData = res.records
            this.tableData.forEach(item => {
              if (item['dateYmd'] != null) {
                item['dateYmd'] = item['dateYmd'].substr(0, 10)
              }
              if (item['createDate'] != null) {
                item['createDate'] = item['createDate'].substr(0, 10)
              }
              if (item['createDateS'] != null) {
                item['createDateS'] = item['createDateS'].substr(0, 10)
              }
              for (let i = 0; i < count.length; i++) {
                if (item[sum[i]] == 0) {
                  item[sum[i]] = '/'
                } else {
                  item[sum[i]] = Number(item[count[i]] / item[sum[i]] * 100).toFixed(2) + '%'
                }
              }
            })
            this.total = res.total
          })
          .finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        } else if (period == '按周统计') {
          behavior.getZhuanquClickWeekGroup({
            size: this.pageSize,
            current: this.currentPage,
            week1: this.week1,
            week2: this.week2,
            regionName1: this.region1,
            regionName2: this.region2,
            regionName3: this.region3,
            station: this.station,
            custType: this.custType,
            createMonth: this.createMonth,
            createSMonth: this.createSMonth,
            zt: this.zt,
            groupBy: this.group,
            descs: this.descs,
            ascs: this.ascs,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                if (this.group.indexOf(key) != -1) {
                  this.tableHeader[key] = header[key]
                }
                if (originGroup.indexOf(key) == -1) {
                  this.tableHeader[key] = header[key]
                }
              })
            }
            this.tableData = res.records
            this.tableData.forEach(item => {
              for (let i = 0; i < count.length; i++) {
                if (item[sum[i]] == 0) {
                  item[sum[i]] = '/'
                } else {
                  item[sum[i]] = Number(item[count[i]] / item[sum[i]] * 100).toFixed(2) + '%'
                }
              }
            })
            this.total = res.total
          })
          .finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        } else if (period == '按月统计') {
          behavior.getZhuanquClickMonthGroup({
            size: this.pageSize,
            current: this.currentPage,
            month1: isArray(this.month) ? this.month[0] : '',
            month2: isArray(this.month) ? this.month[1] : '',
            regionName1: this.region1,
            regionName2: this.region2,
            regionName3: this.region3,
            station: this.station,
            custType: this.custType,
            createMonth: this.createMonth,
            createSMonth: this.createSMonth,
            zt: this.zt,
            groupBy: this.group,
            descs: this.descs,
            ascs: this.ascs,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                if (this.group.indexOf(key) != -1) {
                  this.tableHeader[key] = header[key]
                }
                if (originGroup.indexOf(key) == -1) {
                  this.tableHeader[key] = header[key]
                }
              })
            }
            this.tableData = res.records
            this.tableData.forEach(item => {
              for (let i = 0; i < count.length; i++) {
                if (item[sum[i]] == 0) {
                  item[sum[i]] = '/'
                } else {
                  item[sum[i]] = Number(item[count[i]] / item[sum[i]] * 100).toFixed(2) + '%'
                }
              }
            })
            this.total = res.total
          })
          .finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        }
      } else if (activeName == '用户') {
        if (period == '按日统计') {
          behavior.getCardClickDay({
            size: this.pageSize,
            current: this.currentPage,
            date1: isArray(this.date) ? this.date[0] : '',
            date2: isArray(this.date) ? this.date[1] : '',
            custId: this.custId,
            caCard: this.caCard,
            regionName1: this.region1,
            regionName2: this.region2,
            regionName3: this.region3,
            station: this.station,
            custType: this.custType,
            createDate: this.createDate,
            createDateS: this.createDateS,
            zt: this.zt,
            descs: this.descs,
            ascs: this.ascs,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                this.tableHeader[key] = header[key]
              })
            }
            this.tableData = res.records
            this.tableData.forEach(item => {
              if (item['dateYmd'] != null) {
                item['dateYmd'] = item['dateYmd'].substr(0, 10)
              }
              if (item['createDate'] != null) {
                item['createDate'] = item['createDate'].substr(0, 10)
              }
              if (item['createDateS'] != null) {
                item['createDateS'] = item['createDateS'].substr(0, 10)
              }
            })
            this.total = res.total
          })
          .finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        } else if (period == '按周统计') {
          behavior.getCardClickWeek({
            size: this.pageSize,
            current: this.currentPage,
            week1: this.week1,
            week2: this.week2,
            custId: this.custId,
            caCard: this.caCard,
            regionName1: this.region1,
            regionName2: this.region2,
            regionName3: this.region3,
            station: this.station,
            custType: this.custType,
            createWeek: this.createWeek,
            createSWeek: this.createSWeek,
            zt: this.zt,
            descs: this.descs,
            ascs: this.ascs,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                this.tableHeader[key] = header[key]
              })
            }
            this.tableData = res.records
            this.total = res.total
          })
          .finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        } else if (period == '按月统计') {
          behavior.getCardClickMonth({
            size: this.pageSize,
            current: this.currentPage,
            month1: isArray(this.month) ? this.month[0] : '',
            month2: isArray(this.month) ? this.month[1] : '',
            custId: this.custId,
            caCard: this.caCard,
            regionName1: this.region1,
            regionName2: this.region2,
            regionName3: this.region3,
            station: this.station,
            custType: this.custType,
            createMonth: this.createMonth,
            createSMonth: this.createSMonth,
            zt: this.zt,
            descs: this.descs,
            ascs: this.ascs,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                this.tableHeader[key] = header[key]
              })
            }
            this.tableData = res.records
            this.total = res.total
          })
          .finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        }
      }
    },
    initList() {
      management.getParamList({
        params: "yhxw_station_cust_click_month-REGION_NAME1," +
                "yhxw_station_cust_click_month-REGION_NAME2," +
                "yhxw_station_cust_click_month-REGION_NAME3," +
                "yhxw_app_cust_statistic_data_month-name," +
                "yhxw_app_cust_statistic_data_month-app_class," +
                "yhxw_app_cust_statistic_data_month-position_level1," +
                "yhxw_app_cust_statistic_data_month-position_level2"
      }).then((res) => {
        this.regionList1 = res['yhxw_station_cust_click_month-REGION_NAME1']
        this.regionList2 = res['yhxw_station_cust_click_month-REGION_NAME2']
        this.regionList3 = res['yhxw_station_cust_click_month-REGION_NAME3']
        this.nameList = res['yhxw_app_cust_statistic_data_month-name']
        this.appClassList = res['yhxw_app_cust_statistic_data_month-app_class']
        this.positionLevel1List = res['yhxw_app_cust_statistic_data_month-position_level1']
        this.positionLevel2List = res['yhxw_app_cust_statistic_data_month-position_level2']
      })
    },
    handleClick(e) {
      this.ascs = ''
      this.descs = ''
      this.activeName = e.props.name
      this.checkPeriod = '按日统计'
      this.checkGroup = ['中心及广电站']
      this.group = 'station,dateYmd'
      this.checkGroupforLanmu = ['按日统计']
      this.groupforLanmu = 'dateYmd'
      this.getTableList(this.activeName, this.checkPeriod)
    },
    handleCheckedPeriodChange(period) {
      if (period == '按日统计') {
        this.checkGroup = ['中心及广电站']
        this.group = 'station,dateYmd'
        this.checkGroupforLanmu = ['按日统计']
        this.groupforLanmu = 'dateYmd'
      } else if (period == '按周统计') {
        this.checkGroup = ['中心及广电站']
        this.group = 'station,week'
        this.checkGroupforLanmu = ['按周统计']
        this.groupforLanmu = 'dateWeek'
      } else if (period == '按月统计') {
        this.checkGroup = ['中心及广电站']
        this.group = 'station,month'
        this.checkGroupforLanmu = ['按月统计']
        this.groupforLanmu = 'statisticMonth'
      }
      this.getTableList(this.activeName, period)
    },
    handleCheckedGroupforLanmuChange(arr) {
      this.groupforLanmu = ''
      for (let i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
          this.groupforLanmu += GROUPforLanmu[arr[i]]
        } else {
          this.groupforLanmu += GROUPforLanmu[arr[i]] + ','
        }
      }
      this.getTableList(this.activeName, this.checkPeriod)
    },
    handleCheckedGroupChange(arr) {
      if (this.checkPeriod == '按日统计') {
        this.group = 'dateYmd,'
      } else if (this.checkPeriod == '按周统计') {
        this.group = 'week,'
      } else if (this.checkPeriod == '按月统计') {
        this.group = 'month,'
      }
      for (let i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
          this.group += GROUP[arr[i]]
        } else {
          this.group += GROUP[arr[i]] + ','
        }
      }
      this.getTableList(this.activeName, this.checkPeriod)
    },
    changeTime() {
      this.getTableList(this.activeName, this.checkPeriod)
    },
    changeWeekTime(newWeek) {
      if (!newWeek || !this.week1forShow) {
        this.week2 = ''
      } else if (newWeek < this.week1forShow) {   // 保证week2大于week1
        this.week2forShow = this.week1forShow
        this.week2 = this.getWeek(this.week2forShow)
      } else {
        this.week2 = this.getWeek(newWeek)
      }
      this.getTableList(this.activeName, this.checkPeriod)
    },
    getDay(num, str) {
      var today = new Date();
      var nowTime = today.getTime();
      var ms = 24*3600*1000*num;
      today.setTime(parseInt(nowTime + ms));
      var oYear = today.getFullYear();
      var oMoth = (today.getMonth() + 1).toString();
      if (oMoth.length <= 1) oMoth = '0' + oMoth;
      var oDay = today.getDate().toString();
      if (oDay.length <= 1) oDay = '0' + oDay;
      return oYear + str + oMoth + str + oDay;
    },
    getLastMonday() {
      let today = new Date();
      let nowTime = today.getTime();
      let day = today.getDay();
      let oneDayTime = 24 * 3600 * 1000;
      let lastMondayTime = nowTime - (day - 1 + 7) * oneDayTime;
      return new Date(lastMondayTime)

      // let oYear = Monday.getFullYear();
      // let oMoth = (Monday.getMonth() + 1).toString();
      // if (oMoth.length <= 1) oMoth = '0' + oMoth;
      // let oDay = Monday.getDate().toString();
      // if (oDay.length <= 1) oDay = '0' + oDay;
      // return oYear + '/' + oMoth + '/' + oDay;
    },
    getWeek(day) {
      // 当年的第一天
      const fist_day_of_year = new Date(day.getFullYear().toString(), 0, 1)
      // 毫秒差
      const ms_count= day - fist_day_of_year
      // 今天是今年的第几天
      const days_count= Math.ceil(ms_count/ 86400000)

      let oYear = day.getFullYear();
      return oYear + '/' + Math.ceil(days_count / 7);
    },
    getMonth() {
      let today = new Date();
      let preMonth = today.getMonth();
      preMonth = preMonth - 1;
      if (preMonth > 11) {
        today.setFullYear(today.getFullYear() + 1);
        today.setMonth(0);
      } else if (preMonth < 0) {
        today.setFullYear(today.getFullYear() - 1);
        today.setMonth(11);
      } else {
        today.setMonth(preMonth);
      }

      let oYear = today.getFullYear();
      let oMoth = (today.getMonth() + 1).toString();
      if (oMoth.length <= 1) oMoth = '0' + oMoth;
      return oYear + '/' + oMoth;
    },
    search() {
      this.currentPage = 1
      this.getTableList(this.activeName, this.checkPeriod)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getTableList(this.activeName, this.checkPeriod)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableList(this.activeName, this.checkPeriod)
    },
    sortTable({ prop, order }) {
      if(order == 'ascending') {
        this.ascs = prop
        this.descs = ''
      } else if(order == 'descending') {
        this.ascs = ''
        this.descs = prop
      } else {
        this.ascs = ''
        this.descs = ''
      }
      this.getTableList(this.activeName, this.checkPeriod)
    },
    onExport() {
      let date = this.date ? this.date : '全部日期'
      let data = this.tableData
      this.downLoading = true
      let column = []
      let t
      for (let i in this.tableHeader) {
        t = {
          title: this.tableHeader[i].label,
          key: i,
          type: 'text',
        }
        column.push(t)
      }
      const excelName = `${date}-${this.activeName}`
      table2excel(column, data, excelName)
      this.downLoading = false
    },
  },
  created() {
    this.date = [this.getDay(-1, '/'), this.getDay(-1, '/')]
    this.week1forShow = this.week2forShow = this.getLastMonday()
    this.week1 = this.week2 = this.getWeek(this.week1forShow)
    this.month = [this.getMonth(), this.getMonth()]
    this.initList()
    this.getTableList(this.activeName, this.checkPeriod)
  }
}
</script>

<style lang="scss" scoped>
.tab-content {
  width: 100%;
  height: calc(100% - 60px);
  .group {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .input-search {
      display: flex;
    }
  }
  .toolbox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      .date-pick {
        display: flex;
      }
      & > div {
        display: flex;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }
  .table {
    width: 100%;
    height: calc(100% - 200px);
  }
  .pagination {
    float: right;
    margin-top: 20px;
  }
}
</style>
