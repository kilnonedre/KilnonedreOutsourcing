<template>
  <div class="page flex-col" id="fullId">
    <div class="section_17 flex-col">
      <div class="title_bg">
        <div class="title_text">
          <div>{{ days || '000' }}</div>
          <div style="margin-left: 20px; font-size: 16px;">
            {{ weeks || '周末' }}
          </div>
          <div style="margin-left: 20px;">{{ time }}
            <i class="el-icon-full-screen" size="22" style="margin-left:10px"  @click="fullScern"> 
</i>
          </div>
        </div>
      </div>
      <el-row :gutter="20" class="report_screen_el-row">
        <el-col :span="16">
          <div class="grid-content ep-bg-purple">
            <div class="Development_title">
              <div class="Development_tag"></div>
              <div class="title">实时发展情况</div>
            </div>
            <div class="Development_analysis">
              <div class="analysis_cumulative">
                <div class="analysis_title">
                  <div>累计发展数：</div>
                  <div class="number">
                    <countTo :startVal="0" separator="" :endVal="endVal" :duration="3000"></countTo>
                  </div>
                </div>
                <div class="analysis_title">
                  <div>目标完成率：</div>
                  <div class="number">
                    <countTo :startVal="0" separator="" :endVal="endValVal" :duration="3000"></countTo>
                    %
                  </div>
                </div>
                <div class="analysis_title">
                  <div>以固促移发展：</div>
                  <div class="number">
                    <countTo :startVal="0" separator="" :endVal="endValue" :duration="3000"></countTo>
                    %
                  </div>
                </div>
                <div class="analysis_title">
                  <div>当日发展数：</div>
                  <div class="number">
                    <countTo :startVal="0" separator="" :endVal="enValu" :duration="3000"></countTo>
                  </div>
                </div>
                <div class="analysis_title">
                  <div>日目标完成率：</div>
                  <div class="number">
                    <countTo :startVal="0" separator="" :endVal="endhuValue" :duration="3000"></countTo>
                    %
                  </div>
                </div>
              </div>
              <div class="analysis_echarts">
                <div class="analysis_echarts_title">广电站发展情况</div>
                <el-row style="padding-top: 5px;">
                  <el-col :span="8" class="amalysis_o">
                    <div class="grid-content ep-bg-purple analysis_one">
                      <div class="analysis_one_title">今日发展</div>
                      <div class="analysis_mychart">
                        <MyEcharTs :options="options"></MyEcharTs>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8" class="amalysis_o">
                    <div class="grid-content ep-bg-purple analysis_one">
                      <div class="analysis_one_title">总发展</div>
                      <div class="analysis_mychart">
                        <MyEcharTs :options="optionsone"></MyEcharTs>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8" class="amalysis_o">
                    <div class="grid-content ep-bg-purple analysis_one">
                      <div class="analysis_one_title">以固促移发展</div>
                      <div class="analysis_mychart">
                        <MyEcharTs :options="optionstwo"></MyEcharTs>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="grid-content ep-bg-purple">
            <div class="Development_title">
              <div class="Development_tag"></div>
              <div class="title">历史发展趋势</div>
            </div>
            <div class="Development_analysis2">
              <el-row>
                <el-col :span="12" class="Development_analysis_one">
                  <div class="grid-content ep-bg-purple">
                    <!-- <el-radio-group v-model="radio" size="mini" v-for="item in labelName" :key="item">
                      <el-radio-button :label="item" @input=""></el-radio-button>

                    </el-radio-group> -->
                    <div class="Development_analysis2_title">
                      <div v-for="(item, index) in labelName" :key="index" :class="
                        radio == index
                          ? 'Development_analysis2_select1'
                          : 'Development_analysis2_select'
                      " @click="tageCheck(index)">
                        {{ item }}
                      </div>
                      <!-- <div
                     class="Development_analysis2_select"
                     :class="{ active: radio == 1 }"
                     @click="Active(1)"
                   >
                     周趋势图
                   </div>
                   <div
                     class="Development_analysis2_select"
                     :class="{ active: radio == 2 }"
                     @click="Active(2)"
                   >
                     月趋势图
                   </div>  -->
                    </div>

                    <div class="Development_analysis_two_analsis" v-if="radio == 0">
                      <MyEcharTs :options="options2"></MyEcharTs>
                    </div>
                    <div class="Development_analysis_two_analsis" v-if="radio == 1">
                      <MyEcharTs :options="options6"></MyEcharTs>
                    </div>
                    <div class="Development_analysis_two_analsis" v-if="radio == 2">
                      <MyEcharTs :options="options7"></MyEcharTs>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="Development_analysis_one">
                  <div class="grid-content ep-bg-purple-light">
                    <div class="Development_analysis_two_title">
                      各广电站完成率发展趋势图
                    </div>
                    <div class="Development_analysis_two_analsis" v-if="radio == 0">
                      <MyEcharTs :options="options3"></MyEcharTs>
                    </div>
                    <div class="Development_analysis_two_analsis" v-if="radio == 1">
                      <MyEcharTs :options="optionss3"></MyEcharTs>
                    </div>
                    <div class="Development_analysis_two_analsis" v-if="radio == 2">
                      <MyEcharTs :options="optionsss3"></MyEcharTs>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content ep-bg-purple">
            <div class="Development_title">
              <div class="Development_tag"></div>
              <div class="title">套餐发展情况</div>
            </div>
            <div class="package">
              <div class="package_title">
                <div class="ts">套餐类型占比</div>
                <div class="package_title_titles">
                  <div class="package_title_select" @click="Pack_Select(1, '慧家套餐明细占比')">
                    慧家套餐明细占比
                  </div>
                  <div class="package_title_select" @click="Pack_Select(2, '精彩套餐明细占比')">
                    精彩套餐明细占比
                  </div>
                  <span class="before" :style="{ left: `${before_left}px` }"></span>
                </div>
              </div>
              <div class="package_analysis">
                <el-row>
                  <el-col :span="9">
                    <div class="grid-content ep-bg-purple">
                      <MyEcharTs :options="options4"></MyEcharTs>
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="grid-content ep-bg-purple-light">
                      <MyEcharTs :options="options5"></MyEcharTs>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="grid-content ep-bg-purple">
            <div class="Development_title">
              <div class="Development_tag"></div>
              <div class="title">发展英雄榜</div>
            </div>
            <div class="Heroes">
              <div class="Heroes_Personal_accumulation">
                <el-row>
                  <el-col :span="14">
                    <div class="grid-content ep-bg-purple" style="padding: 0px 5px;">
                      <div class="accumulation_title">个人累计发展TOP15</div>
                      <div class="accumulation_ranking">
                        <div class="ranking_one1_one5">
                          <div class="text" v-for="(item, index) in list" :key="index">
                            <img v-if="(index == 0)" src="./../../../assets/img/Reportscreen/gold.png" />
                            <img v-if="(index == 1)" src="./../../../assets/img/Reportscreen/silver.png" />
                            <img v-if="(index == 2)" src="./../../../assets/img/Reportscreen/copper.png" />
                            <div class="img" v-if="(index != 1 && index != 2 && index != 0)"></div>
                            <span :class="[
                              index == 0
                                ? 'one'
                                : index == 1
                                  ? 'two'
                                  : index == 2
                                    ? 'three'
                                    : '',
                            ]">
                              {{ item.name }} {{ item.station }}
                            </span>
                          </div>
                        </div>
                        <div class="ranking_one1_one6 scrollbar" ref="scrollbar">
                          <div v-for="(items, index) in list2" :key="index" class="ranking_one1_one6_text">
                            <div class="text_top">{{ (index + 6) }}</div>
                            <span>{{ items.name }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="10">
                    <div class="grid-content ep-bg-purple" style="padding: 0px 5px;">
                      <div class="accumulation_title">个人日发展TOP10</div>
                      <div class="accumulation_ranking">
                        <div class="accumulation_ranking_one1_one5">
                          <template v-for="(iteem, list3index) in list3" :key="list3index">
                            <div class="text" v-if="(list3index < 5)">
                              <img v-if="(list3index == 0)" src="./../../../assets/img/Reportscreen/gold.png" />
                              <img v-if="(list3index == 1)" src="./../../../assets/img/Reportscreen/silver.png" />
                              <img v-if="(list3index == 2)" src="./../../../assets/img/Reportscreen/copper.png" />
                              <div class="img" v-if="(list3index != 1 && list3index != 2 && list3index != 0)"></div>
                              <span :class="[
                                index == 0
                                  ? 'one'
                                  : index == 1
                                    ? 'two'
                                    : index == 2
                                      ? 'three'
                                      : '',
                              ]">
                                {{ iteem.name }}
                              </span>
                            </div>
                          </template>
                        </div>
                        <div class="accumulation_ranking_one1_one5">
                          <template v-for="(Top10, top10index) in list3" :key="top10index">
                            <div class="text1" style="padding: 1.8px 0px;" v-if="(top10index >= 5)">
                              <span class="text2">{{ (top10index + 1) }}</span>
                              <span>{{ Top10.name }}</span>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="Top10">网格月发展TOP10</div>

              <div class="Heroes_Personal_accumulation_2">
                <div class="accumulation_day_top10">
                  <div class="accumy-top">
                    <div class="day_top" v-for="(list4_item, index) in list4" :key="index">
                      <img v-if="(index == 0)" src="./../../../assets/img/Reportscreen/gold.png" />
                      <img v-if="(index == 1)" src="./../../../assets/img/Reportscreen/silver.png" />
                      <img v-if="(index == 2)" src="./../../../assets/img/Reportscreen/copper.png" />
                      <div class="img" v-if="(index != 1 && index != 2 && index != 0)"></div>
                      <div class="day_top_number" :class="[
                        index == 0
                          ? 'one'
                          : index == 1
                            ? 'two'
                            : index == 2
                              ? 'three'
                              : 'default',
                      ]">
                        {{ (index + 1) }}
                      </div>
                      <div class="day_top_text">
                        <div :class="[
                          index == 0
                            ? 'one'
                            : index == 1
                              ? 'two'
                              : index == 2
                                ? 'three'
                                : '',
                        ]">
                          {{ list4_item.grid }}
                        </div>
                        <div :class="[
                          index == 0
                            ? 'one'
                            : index == 1
                              ? 'two'
                              : index == 2
                                ? 'three'
                                : '',
                        ]">
                          {{ list4_item.fazhan }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { CountTo } from 'vue3-count-to'
import MyEcharTs from '../../../components/MyEcharTs.vue'
import { home } from '@api'
import screenfull from "screenfull"; // 引入screenfull

let num1 = []
let num2 = []
let num3 = []
let num = []
export default {
  components: {
    CountTo,
    MyEcharTs,
  },

  data() {
    return {
            labelName: ['日趋势图', '周趋势图', '月趋势图'],
      isFull: false, // 判断是否全屏，默认不全屏
      endVal: '',
      endValVal: '',
      enValu: '',
      endValVal: '',
      endhuValue: '',
      days: '',
      weeks: '',
      show: false,
      EcharsSzie:5,
      time: '00:00:00',
      timer: '', //定时器寄存器
      radio: 0,
      before_left: 20,
      children: [],
      setinterval: '',

      list: [{}], //个人累计发展
      list2: [{}, {}, {}, {}, {}, {}, {}, {}], //个人
      list3: [{}],
      list4: [],
      optionsone: {
        color: ['#2C7EF8', '#00EAFF', '#DDDDDD', '#FF6600'],
        tooltip: {
          // trigger: 'axis',
          // axisPointer: {
          //   // Use axis to trigger tooltip
          //   type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
          // },
          // formatter: null,
        },
        legend: {
          padding: 0,
          itemGap: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize:this.EcharsSzie,
            color: '#fff',
          },
          data: [
            {
              name: '固移融合',
              icon: 'rect',
            },
            {
              name: '单移',
              icon: 'rect',
            },
            {
              name: '未完成目标',
              icon: 'rect',
            },
            {
              name: '今日时序进展',
              // icon: 'rect',
            },
          ],
        },
        grid: {
          left: '3%',
          right: '2%',
          bottom: '-3%',
          top: '16%',
          containLabel: true,
        },
        xAxis: {
          splitLine: {
            show: false,
          },
          type: 'value',
          show: false,
          max: 100,
        },
        yAxis: [
          {
            splitLine: {
              show: false,
            },
            type: 'category',
            inverse: true,
            data: [
              // '横扇',
              // '高新区',
              // '七都',
              // '桃源',
              // '东太湖',
              // '震泽',
              // '平望',
              // '汾湖',
              // '开发区',
            ],
            axisLabel: {
              color: '#fff',
              fontWeight: "bold",
              fontSize: this.EcharsSzie,
            },
          },
          {
            splitLine: {
              show: false,
            },
            type: 'category',
            inverse: true,
            data: [],
            axisLabel: {
              //刻度标签
              margin: 20,
              color: '#fff',
              fontSize:this.EcharsSzie,
            },
            axisLine: {
              show: false, //Y轴线
            },
            axisTick: {
              //刻度线
              show: false,
            },
          },
          {
            position: 'top',
            axisLine: {
              show: false, //Y轴线
            },
            axisTick: {
              //刻度线
              show: false,
            },
          },
          {
            position: 'top',
            axisLine: {
              show: false, //Y轴线
            },
            axisTick: {
              //刻度线
              show: false,
            },
          },
        ],
        series: [
          {
            name: '固移融合',
            type: 'bar',
            stack: 'total',
            label: {
              show: false,
              position: 'right',
            },
            emphasis: {
              focus: 'series',
            },
            data: [],
            barWidth: '70%', //柱状图宽度
          },
          {
            name: '单移',
            type: 'bar',
            stack: 'total',
            label: {
              show: false,
              position: 'right',
            },
            emphasis: {
              focus: 'series',
            },
            data: [],
            label: {
              show: true,
              position: 'right',
              textAlign: 'center',
              width: 20,
              formatter(pars) {
            
                return num2[pars.dataIndex] + '%'
                // return '总金额：' + data[params.dataIndex] + '元\n\n总数量：' + datalabel[params.dataIndex]+ '个'
              },
              textStyle: {
                // 数值样式
                color: '#fff',
                borderRadius: 22,
                fontSize: this.EcharsSzie,
                borderWidth: 1,
                padding: [1, 2],
                borderColor: '#fff',
                height: 15,
                align: 'center',
                backgroundColor: '#2E80F7',
                lineHeight: 22,
              },
            },
          },
          {
            name: '未完成目标',
            type: 'bar',
            stack: 'total',
            label: {
              show: false,
              position: 'right',
            },
            emphasis: {
              focus: 'series',
            },
            data: [100, 100, 100, 100, 100, 100, 100, 100, 100],
          },
          {
            name: '今日时序进展',
            type: 'line',
            stack: 'total',
            show: false,
            label: {
              show: false,
              position: 'top',
            },
            emphasis: {
              focus: 'series',
            },
            // data: [],
            //               markPoint: {
            //        data: [
            //     { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
            //     { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
            //   ]
            // },
            markLine: {
              silent: true,
              symbol: ['none', 'none'], //去掉箭头
              lineStyle: {
                normal: {
                  type: 'solid',
                  width: 2,
                  color: '#FF6600', // 这儿设置安全基线颜色
                },
              },
              data: [
                {
                  xAxis: 50,
                },
              ],
              label: {
                formatter: '{c}%',
                show: true,
                // backgroundColor: '#FFF7F2',
                color: '#DB6525',
                fontSize: 10,
                borderColor: '#FFF7F2',
                position: 'start',
                textStyle: {
                  fontWeight: "bold",
                },
                // position:'top',

                // formatter: function(v){
                //   var s = parseInt(v.value / 10 * 100);
                //   return s + '%';
                // },
                padding: [100, 0, 0, 0],
                borderRadius: 150,
              },
            },
          },
        ],
      },
      optionstwo: {
        color: ['#2C7EF8', '#2AE0F3', '#FF6600', '#DDDDDD'],
        tooltip: {
          // trigger: 'axis',
          // axisPointer: {
          //   // Use axis to trigger tooltip
          //   type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
          // },
          // formatter: null,
        },
        legend: {
          padding: 0,
          itemGap: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: this.EcharsSzie,
            color: '#fff',
          },

          data: [
            {
              name: '固移融合',
              icon: 'rect',
            },
            {
              name: '目标',
              icon: 'rect',
            },

            {
              name: '今日时序进展',
              icon: 'rect',
            },
            {
              name: '未完成目标',
              icon: 'rect',
            },
          ],
        },
        grid: {
          left: '10%',
          right: '13%',
          bottom: '-3%',
          top: '16%',
          containLabel: true,
        },
        xAxis: {
          splitLine: {
            show: false,
          },
          type: 'value',
          show: false,
          max: 100,
        },
        yAxis: [
          {
            splitLine: {
              show: false,
            },
            type: 'category',
            inverse: true,
            data: [
              // '横扇',
              // '高新区',
              // '七都',
              // '桃源',
              // '东太湖',
              // '震泽',
              // '平望',
              // '汾湖',
              // '开发区',
            ],
            axisLabel: {
              color: '#fff',
              fontWeight: "bold",
              fontSize: this.EcharsSzie,
            },
          },
          {
            show: false,
            splitLine: {
              show: false,
            },
            position: 'right',
            type: 'category',
            inverse: true,
            //刻度标签
            axisLabel: {
              color: '#fff',
              fontSize: this.EcharsSzie,
            },
            //Y轴线
            axisLine: {
              show: false,
            },
            //刻度线
            axisTick: {
              show: false,
            },
          },
          {
            position: 'top',
            axisLine: {
              show: true,
            },
            axisTick: {
              show: true,
            },
            axisLabel: {
              show: true,
            },
            splitArea: {
              show: true,
            },
            splitLine: {
              show: true,
            },
            data: [],
          },
        ],
        series: [
          {
            name: '固移融合',
            type: 'bar',
            stack: 'total',
            label: {
              show: false,
              position: 'right',
            },
            emphasis: {
              focus: 'series',
            },
            data: [],
            barWidth: '70%', //柱状图宽度
            label: {
              show: true,
              position: 'right',
              textAlign: 'center',
              width: 20,
              formatter(pars) {
    
                return num3[pars.dataIndex] + '%'
              },
              textStyle: {
                // 数值样式
                color: '#fff',
                borderRadius: 22,
                fontSize: this.EcharsSzie,
                borderWidth: 1,
                padding: [1, 2],
                borderColor: '#fff',
                height: 15,
                align: 'center',
                backgroundColor: '#2E80F7',
                lineHeight: 22,
              },
            },
          },
          {
            name: '目标',
            type: 'line',
            stack: 'total',
            show: false,
            label: {
              show: false,
              position: 'top',
            },
            emphasis: {
              focus: 'series',
            },
            markLine: {
              silent: true,
              symbol: ['none', 'none'], //去掉箭头
              lineStyle: {
                normal: {
                  // type: 'dashed',
                  width: 2,
                  color: '#2AE0F3', // 这儿设置安全基线颜色
                },
              },
              data: [
                {
                  xAxis: 50,
                },
              ],
              label: {
                formatter: '{c}%',
                show: true,
                // backgroundColor: '#FFF7F2',
                color: '#2AE0F3',
                fontSize: 10,
                borderColor: '#2AE0F3',
                position: 'start',

                // position:'top',

                // formatter: function(v){
                //   var s = parseInt(v.value / 10 * 100);
                //   return s + '%';
                // },
                padding: [100, 0, 0, 0],
                borderRadius: 150,
              },
            },
          },
          // {/*这个bar是撑起横线的高度，并设置透明*/
          //     name: "单移",
          //     stack: 'breakevenEleGroup',/*盈亏点数据组，需要设置才能将两个bar堆积在一起*/
          //     type: 'bar',
          //     label: {
          //       show: false,
          //       position:'right',
          //     },
          //     emphasis: {
          //       focus: 'series'
          //     },
          //     yAxisIndex:1,
          //     itemStyle: {
          //         normal: {
          //             color: 'rgba(0,0,0,0)',/*设置bar为隐藏，撑起下面横线*/
          //         }
          //     },
          //     data: [50, 50, 50, 50, 50, 50, 50, 50, 50]
          // },
          //   {
          //       /*这个bar是横线的显示*/
          //       name: "单移",
          //       type: 'bar',
          //       stack: 'breakevenEleGroup',/*盈亏点数据组，需要设置才能将两个bar堆积在一起*/
          //       type: 'bar',
          //       yAxisIndex:1,
          //       barGap: "0",
          //       itemStyle: {
          //           normal: {
          //               color: '#00EAFF'
          //           }
          //       },
          //       data: [
          //        1,1,1,1,1,1,1,1,1
          //     ],
          //   },

          {
            name: '今日时序进展',
            type: 'line',
            stack: 'total',
            show: false,
            label: {
              show: false,
              position: 'top',
            },
            emphasis: {
              focus: 'series',
            },
            textStyle: {
              fontWeight: 'bold'
            },
            markLine: {
              silent: true,
              symbol: ['none', 'none'], //去掉箭头
              lineStyle: {
                normal: {
                  type: 'solid',
                  width: 2,
                  color: '#FF6600', // 这儿设置安全基线颜色
                },
              },
              data: [
                {
                  xAxis: 60,
                },
              ],
              label: {
                formatter: '{c}%',
                show: true,
                // backgroundColor: '#FFF7F2',
                color: '#DB6525',
                fontSize: 10,
                borderColor: '#FFF7F2',
                position: 'start',

                // position:'top',

                // formatter: function(v){
                //   var s = parseInt(v.value / 10 * 100);
                //   return s + '%';
                // },
                padding: [100, 0, 0, 0],
                borderRadius: 150,
              },
            },
          },
          {
            name: '未完成目标',
            type: 'bar',
            stack: 'total',
            label: {
              show: false,
              position: 'right',
            },
            emphasis: {
              focus: 'series',
            },
            data: [100, 100, 100, 100, 100, 100, 100, 100, 100],
          },
        ],
      },
      options: {
        color: ['#2C7EF8', '#00EAFF', '#DDDDDD', '#FF6600'],
        tooltip: {
          // trigger: 'axis',
          // axisPointer: {
          //   // Use axis to trigger tooltip
          //   type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
          // },
        },
        legend: {
          padding: 0,
          itemGap: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: this.EcharsSzie,
            color: '#fff',
          },
          data: [
            {
              name: '固移融合',
              icon: 'rect',
            },
            {
              name: '单移',
              icon: 'rect',
            },
            {
              name: '未完成目标',
              icon: 'rect',
            },
            {
              name: '今日时序进展',
              // icon: 'rect',
            },
          ],
        },
        grid: {
          left: '3%',
          right: '2%',
          bottom: '-3%',
          top: '16%',
          containLabel: true,
        },
        xAxis: {
          splitLine: {
            show: false,
          },
          type: 'value',
          show: false,
          max: 100,
        },
        yAxis: [
          {
            splitLine: {
              show: false,
            },
            type: 'category',
            inverse: true,
            data: [
              // '横扇',
              // '高新区',
              // '七都',
              // '桃源',
              // '东太湖',
              // '震泽',
              // '平望',
              // '汾湖',
              // '开发区',
            ],
            axisLabel: {
              color: '#fff',
              fontWeight: "bold",
              fontSize: this.EcharsSzie,
            },
          },
          {
            splitLine: {
              show: false,
            },
            type: 'category',
            inverse: true,
            data: [],
            axisLabel: {
              //刻度标签
              margin: 20,
              color: '#fff',
              fontSize: this.EcharsSzie,
            },
            axisLine: {
              show: false, //Y轴线
            },
            axisTick: {
              //刻度线
              show: false,
            },
          },
          {
            position: 'top',
            axisLine: {
              show: false, //Y轴线
            },
            axisTick: {
              //刻度线
              show: false,
            },
          },
          {
            position: 'top',
            axisLine: {
              show: false, //Y轴线
            },
            axisTick: {
              //刻度线
              show: false,
            },
          },
        ],
        series: [
          {
            name: '固移融合',
            type: 'bar',
            stack: 'total',
            label: {
              show: false,
              position: 'right',
            },
            emphasis: {
              focus: 'series',
            },
            data: [],
            barWidth: '70%', //柱状图宽度
          },
          {
            name: '单移',
            type: 'bar',
            stack: 'total',
            label: {
              show: false,
              position: 'right',
            },
            emphasis: {
              focus: 'series',
            },
            data: [],
            label: {
              show: true,
              position: 'right',
              textAlign: 'center',
              width: 20,
              formatter(pars) {
            
                return num1[pars.dataIndex] + '%'
                // return '总金额：' + data[params.dataIndex] + '元\n\n总数量：' + datalabel[params.dataIndex]+ '个'
              },
              textStyle: {
                // 数值样式
                color: '#fff',
                borderRadius: 22,
                fontSize: this.EcharsSzie,
                borderWidth: 1,
                padding: [1, 2],
                borderColor: '#fff',
                height: 15,
                align: 'center',
                backgroundColor: '#2E80F7',
                lineHeight: 22,
              },
            },
          },
          {
            name: '未完成目标',
            type: 'bar',
            stack: 'total',
            label: {
              show: false,
              position: 'right',
            },
            emphasis: {
              focus: 'series',
            },
            data: [100, 100, 100, 100, 100, 100, 100, 100, 100],
          },
        ],
      },
      options2: {
        color: ['#00EAFF', '#2C7EF8'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#00EAFF',
            },
          },
        },
        legend: {
          icon: 'rect',
          padding: 0,
          itemGap: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: this.EcharsSzie,
            color: '#fff',
          },
        },
        grid: {
          x: 45,
          y: 30,
          x2: 40,
          y2: 30,
          borderWidth: 10,
        },
        toolbox: {
          show: false,
          feature: {
            dataView: {
              readOnly: false,
            },
            restore: {},
            saveAsImage: {},
          },
        },
        // dataZoom: {
        //   show: false,
        //   start: 0,
        //   end: 100
        // },
        xAxis: [
          {
            show: true,
            type: 'category',
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: this.EcharsSzie,
                color: '#fff',
              },
              rotate: 40,
            },
            data: [],
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '累计发展数',
            min: 0,
            position: 'left',
            nameTextStyle: {
              color: '#fff',
              fontSize: this.EcharsSzie,
            },
            axisLine: {
              lineStyle: {
                color: '#0C2258',
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#0C2258',
                type: 'dotted',
              },
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff',
              },
            },
          },
          {
            type: 'value',
            name: '目标完成率',
            min: 0,
            position: 'right',
            nameTextStyle: {
              color: '#fff',
              fontSize: this.EcharsSzie,
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#fff',
                // type: "dotted",
              },
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff',
              },
            },
          },
        ],
        series: [
          {
            name: '累计发展数',
            type: 'bar',
            data: [],
          },
          {
            name: '目标完成率',
            type: 'line',
            yAxisIndex: 1,
            data: [],
          },
        ],
      },
      options6: {
        color: ['#00EAFF', '#2C7EF8'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#00EAFF',
            },
          },
        },
        legend: {
          icon: 'rect',
          padding: 0,
          itemGap: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
            color: '#fff',
          },
        },
        grid: {
          x: 45,
          y: 30,
          x2: 40,
          y2: 30,
          borderWidth: 10,
        },
        toolbox: {
          show: false,
          feature: {
            dataView: {
              readOnly: false,
            },
            restore: {},
            saveAsImage: {},
          },
        },
        // dataZoom: {
        //   show: false,
        //   start: 0,
        //   end: 100
        // },
        xAxis: [
          {
            show: true,
            type: 'category',
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: '10',
                color: '#fff',
              },
              rotate: 40,
            },
            data: [],
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '日完成量',
            min: 0,
            position: 'left',
            nameTextStyle: {
              color: '#fff',
              fontSize: 11,
            },
            axisLine: {
              lineStyle: {
                color: '#0C2258',
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#0C2258',
                type: 'dotted',
              },
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff',
              },
            },
          },
          {
            type: 'value',
            name: '日完成率',
            min: 0,
            position: 'right',
            nameTextStyle: {
              color: '#fff',
              fontSize: 11,
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#fff',
                // type: "dotted",
              },
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff',
              },
            },
          },
        ],
        series: [
          {
            name: '日完成量',
            type: 'bar',
            data: [],
          },
          {
            name: '日完成率',
            type: 'line',
            yAxisIndex: 1,
            data: [],
          },
        ],
      },
      options7: {
        color: ['#00EAFF', '#2C7EF8'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#00EAFF',
            },
          },
        },
        legend: {
          icon: 'rect',
          padding: 0,
          itemGap: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
            color: '#fff',
          },
        },
        grid: {
          x: 45,
          y: 30,
          x2: 40,
          y2: 30,
          borderWidth: 10,
        },
        toolbox: {
          show: false,
          feature: {
            dataView: {
              readOnly: false,
            },
            restore: {},
            saveAsImage: {},
          },
        },
        // dataZoom: {
        //   show: false,
        //   start: 0,
        //   end: 100
        // },
        xAxis: [
          {
            show: true,
            type: 'category',
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: '10',
                color: '#fff',
              },
              rotate: 40,
            },
            data: [],
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '日完成量',
            min: 0,
            position: 'left',
            nameTextStyle: {
              color: '#fff',
              fontSize: 11,
            },
            axisLine: {
              lineStyle: {
                color: '#0C2258',
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#0C2258',
                type: 'dotted',
              },
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff',
              },
            },
          },
          {
            type: 'value',
            name: '日完成率',
            min: 0,
            position: 'right',
            nameTextStyle: {
              color: '#fff',
              fontSize: 11,
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#fff',
                // type: "dotted",
              },
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff',
              },
            },
          },
        ],
        series: [
          {
            name: '日完成量',
            type: 'bar',
            data: [],
          },
          {
            name: '日完成率',
            type: 'line',
            yAxisIndex: 1,
            data: [],
          },
        ],
      },
      options3: {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          con: 'rect',
          padding: 0,
          itemGap: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: this.EcharsSzie,
            color: '#fff',
          },
        },
        grid: {
          x: 45,
          y: 46,
          x2: 80,
          y2: 28,
          borderWidth: 10,
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          // 大小
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: this.EcharsSzie,
              color: '#fff',
            },
            rotate: 40,
          },
          data: [],
        },
        yAxis: {
          type: 'value',
          scale: true,

          axisLabel: {
            formatter: '{value} %',
            textStyle: {
              fontSize: this.EcharsSzie,
              color: '#fff',
            },
          },
          show: true,
        },
        series: [
          {
            name: '横扇',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '高新区',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '七都',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '桃源',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '东太湖',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '震泽',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '平望',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '汾湖',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '开发区',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
        ],
      },
      optionss3: {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          con: 'rect',
          padding: 0,
          itemGap: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
            color: '#fff',
          },
        },
        grid: {
          // x: 50,
          // x2: 26,
          // y2: 40,
          left: '3%',
          right: '10%',
          bottom: '0%',
          top: '15%',
          containLabel: true,
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          // 大小
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: '10',
              color: '#fff',
            },
            rotate: 40,
          },
          data: [],
        },
        yAxis: {
          type: 'value',
          scale: true,

          axisLabel: {
            formatter: '{value} %',
            textStyle: {
              fontSize: '10',
              color: '#fff',
            },
          },
          show: true,
        },
        series: [
          {
            name: '横扇',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '高新区',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '七都',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '桃源',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '东太湖',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '震泽',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '平望',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '汾湖',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '开发区',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
        ],
      },
      optionsss3: {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          con: 'rect',
          padding: 0,
          itemGap: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
            color: '#fff',
          },
        },
        grid: {
          // x: 50,
          // x2: 26,
          // y2: 40,
          left: '3%',
          right: '10%',
          bottom: '0%',
          top: '15%',
          containLabel: true,
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          // 大小
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: '10',
              color: '#fff',
            },
            rotate: 40,
          },
          data: [],
        },
        yAxis: {
          type: 'value',
          scale: true,

          axisLabel: {
            formatter: '{value} %',
            textStyle: {
              fontSize: '10',
              color: '#fff',
            },
          },
          show: true,
        },
        series: [
          {
            name: '横扇',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '高新区',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '七都',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '桃源',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '东太湖',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '震泽',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '平望',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '汾湖',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
          {
            name: '开发区',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              },
            },
            data: [],
          },
        ],
      },
      options4: {
        tooltip: {
          trigger: 'item',
          formatter: function (parms) {
            var str =
              parms.seriesName +
              '</br>' +
              parms.marker +
              '' +
              parms.data.legendname +
              '</br>' +
              '数量：' +
              parms.data.value +
              '</br>' +
              '占比：' +
              parms.percent +
              '%'
            return str
          },
        },
        legend: {
          // type: 'scroll',
          orient: 'vertical',
          align: 'left',
          right: '-1%',
          top: '15',
          textStyle: {
            color: '#fff',
            fontSize:this.EcharsSzie,
          },
          padding: 0,
          itemGap: 5,
          itemWidth: 10,
          itemHeight: 10,
        },
        series: [
          {
            name: '套餐类型占比',
            type: 'pie',
            center: ['35%', '50%'],
            radius: ['40%', '65%'],
            clockwise: false, //饼图的扇区是否是顺时针排布
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'outter',
                formatter: function (parms) {
                  return parms.data.legendname
                },
              },
            },
            labelLine: {
              show: false,
              normal: {
                length: 5,
                length2: 3,
                smooth: true,
              },
            },
            data: [
              {
                value: 335,
                legendname: '默认种类01',
                name: '335',
                itemStyle: {
                  color: '#8d7fec',
                },
              },
              {
                value: 310,
                legendname: '默认种类02',
                name: '310',
                itemStyle: {
                  color: '#5085f2',
                },
              },
              {
                value: 234,
                legendname: '默认种类03',
                name: '234',
                itemStyle: {
                  color: '#e75fc3',
                },
              },
            ],
          },
        ],
      },
      options5: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          align: 'left',
          right: '1%',
          top: '15',
          textStyle: {
            color: '#fff',
            fontSize: this.EcharsSzie
          },
          padding: 0,
          itemGap: 5,
          itemWidth: 10,
          itemHeight: 10,
        },
        series: [
          {
            name: '标题',
            type: 'pie',
            center: ['20%', '50%'],
            radius: ['40%', '65%'],
            clockwise: false, //饼图的扇区是否是顺时针排布
            avoidLabelOverlap: false,
            left: 0,
            label: {
              normal: {
                show: false,
                position: 'outter',
                formatter: function (parms) {
                  return parms.data.legendname
                },
              },
            },
            labelLine: {
              show: false,
              normal: {
                length: 5,
                length2: 3,
                smooth: true,
              },
            },
            data: [
              {
                value: 335,
                legendname: '种类01',
                name: '种类01  335',
                itemStyle: {
                  color: '#8d7fec',
                },
              },
              {
                value: 310,
                legendname: '种类02',
                name: '种类02  310',
                itemStyle: {
                  color: '#5085f2',
                },
              },
              {
                value: 234,
                legendname: '种类03',
                name: '种类03  234',
                itemStyle: {
                  color: '#e75fc3',
                },
              },
              {
                value: 154,
                legendname: '种类04',
                name: '种类04  154',
                itemStyle: {
                  color: '#f87be2',
                },
              },
            ],
          },
        ],
      },
    }
  },
  created() {
    this.Init_Echarts()
  },
  mounted() {
    this.children = this.$refs.scrollbar.children
    this.handleScroll()
    if (!this.timer) {
      this.getNowDate()
    } else {
      clearInterval(this.timer)
    }
    this.Gethomelist();
  },
  methods: {
    tageCheck(index) {
      this.radio = index
    },
    Gethomelist() {
      home.Fazhanyxi(0).then((res) => {
        this.list = []
        this.list2 = []
        for (let i = 0; i < res.length; ++i) {
          if (i < 5) {
            this.list.push(res[i])
          } else {
            this.list2.push(res[i])
          }
        }
      })
      home.Fazhanyxi(1).then((res) => {
        this.list3 = []
        for (let i = 0; i < res.length; ++i) {
          if (i < 10) {
            this.list3.push(res[i])
          }
        }
  
      })
      home.Fazhanyxi(2).then((res) => {
        this.list4 = res
      })

      home.Taocanfazhanqingkuang(0).then((res) => {
  
        let list = []
        for (let i = 0; i < res.length; ++i) {
          if (res[i].name == '有线专属卡') {
            list.push({
              value: res[i].num,
              legendname: res[i].name,
              name: res[i].name,
              itemStyle: {
                color: '#F5C22B',
              },
            })
          } else if (res[i].name == '慧家') {
            list.push({
              value: res[i].num,
              legendname: res[i].name,
              name: res[i].name,
              itemStyle: {
                color: '#8d7fec',
              },
            })
          } else if (res[i].name == '精彩') {
            list.push({
              value: res[i].num,
              legendname: res[i].name,
              name: res[i].name,
              itemStyle: {
                color: '#5AD8A6',
              },
            })
          }
        }
  
        this.options4.series[0].data = list
        // list.forEach((item)=>{

        // })
      })

      home.Todayfazhanqingkuang().then((res) => {
        this.endVal = res.sum
        this.endValVal = res.complete_pro * 100
        this.endValue = res.gu_yi_pro * 100

        this.enValu = res.today_sum
        this.endhuValue = res.today_complete_pro * 100
        res.jinrifazhan.forEach((item) => {
          num1.push(
            Number(JSON.parse(JSON.stringify(item.complete_pro)) * 100).toFixed(
              0,
            ),
          )
          num.push(JSON.parse(JSON.stringify(item.danyi)))
          this.options.yAxis[0].data.push(item.station)
          this.options.series[0].data.push(Math.round(item.guyi * 100))
          this.options.series[1].data.push(Math.round(item.danyi * 100))
          this.options.yAxis[1].data.push(item.pro)
        })
        res.zongfazhan.forEach((item) => {
          num2.push(
            Number(JSON.parse(JSON.stringify(item.complete_pro)) * 100).toFixed(
              0,
            ),
          )
          this.optionsone.yAxis[1].data.push(item.pro)
          this.optionsone.yAxis[0].data.push(item.station)
          this.optionsone.series[0].data.push(Math.round(item.guyi * 100))
          this.optionsone.series[1].data.push(Math.round(item.danyi * 100))
        })
        const date = Math.round(res.time_sequence_contrast * 100)
        this.optionsone.series[3].markLine.data[0].xAxis = date
        res.yigucuyifazhan.forEach((item) => {
          this.optionstwo.series[0].data.push(Math.round(item.guyi * 100))
          this.optionstwo.yAxis[0].data.push(item.station)
          num3.push(
            Number(JSON.parse(JSON.stringify(item.guyi)) * 100).toFixed(0),
          )
        })
        const datetime = Math.round(res.time_sequence_contrast_gu_yi * 100)
        this.optionstwo.series[2].markLine.data[0].xAxis = datetime
      })

      this.Pack_Select(1, '慧家套餐明细占比')
      this.Active(0)
      this.Activee(1)
      this.Activee1(2)
    },
    handleScroll() {
      let scrollbar = this.$refs.scrollbar //总高度
      let childrenlist = this.children //所有子节点高度
      let scrollHeight = scrollbar.scrollHeight //滚动条高度
      let clientHeight = scrollbar.clientHeight //可视宽度
      let childrenlistheight = []
      for (let i = 0; i < childrenlist.length; ++i) {
        childrenlistheight.push(childrenlist[i].clientHeight)
      }
      if (!this.setinterval) {
        this.setinterval = setInterval(() => {
          if (scrollHeight > scrollbar.scrollTop + clientHeight + 20) {
            scrollbar.scrollTop += 20
          } else {
            scrollbar.scrollTop = 0
          }
        }, 3000)
      } else {
        clearInterval(this.setinterval)
        this.handleScroll()
      }
    },
    Pack_Select(val, title) {
      let listt = []
      let data = [
        '#8d7fec',
        '#5085f2',
        '#e75fc3',
        '#f87be2',
        '#f2719a',
        '#fca4bb',
        '#f59a8f',
        '#57e7ec',
        '#cf9ef1',
        '#57e7ec',
        '#cf9ef1',
      ]
      home.Taocanfazhanqingkuang(val).then((res) => {
        for (let i = 0; i < res.length; ++i) {
          listt.push({
            value: res[i].num,
            legendname: res[i].name,
            name: res[i].name,
            itemStyle: {
              color: data[i] ? data[i] : '',
            },
          })
        }
        this.options5.series[0].name = title
        this.options5.series[0].data = listt
      })
      if (val == 1) {
        this.before_left = 20
      } else {
        this.before_left = 230
      }
    },

    max(list) {
      let data = list
      for (let i = 0; i < data.length; ++i) {
        for (let j = 0; j < data.length - i - 1; ++j) {
          if (typeof data[i] == 'string') {
            if (parseFloat(data[j]) < parseFloat(data[j + 1])) {
              let temp = data[j]
              data[j] = data[j + 1]
              data[j + 1] = temp
            }
          }
        }
      }
      return data
    },
    Active(val) {
      home.Lishifazhanqushi(0, val).then((res) => {
        res.forEach((item, index) => {
          this.options2.series[0].data.push(item.leiji_fazhan)
          this.options2.series[1].data.push(item.fazhan_pro)
          // console.log(this.options2.series[1].data);
          //
          const date = item.date_ymd
          this.options2.xAxis[0].data.push(date)
          // this.options2.yAxis[1].max=item.fazhan_pro
        })
      })
      // 折线图
      home.Lishifazhanqushi(1, val).then((res) => {
    
        res.dateList.forEach((v) => {
          this.options3.xAxis.data.push(v)
        })

        res.dataList.forEach((item) => {
          if (item.station === '横扇广电站') {
            item.fazhan_pros.forEach((v) => {

              this.options3.series[0].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '高新区广电中心') {
            item.fazhan_pros.forEach((v) => {
        
              this.options3.series[1].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '七都广电站') {
            item.fazhan_pros.forEach((v) => {
              this.options3.series[2].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '桃源广电站') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.options3.series[3].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '东太湖广电中心') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.options3.series[4].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '震泽广电站') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.options3.series[5].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '平望广电站') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.options3.series[6].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '汾湖广电中心') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.options3.series[7].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '开发区广电中心') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.options3.series[8].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          }
        })
      })
    },
    Activee(val) {
      home.Lishifazhanqushi(0, val).then((res) => {
  
        res.forEach((item, index) => {
          this.options6.series[0].data.push(item.leiji_fazhan)
          this.options6.series[1].data.push(item.fazhan_pro)
          const date = item.date_ymd

          this.options6.xAxis[0].data.push()
          this.options6.xAxis[0].data.push(date)
        })
      })
      // 折线图
      home.Lishifazhanqushi(1, val).then((res) => {
      
        res.dateList.forEach((v) => {
          this.optionss3.xAxis.data.push(v)
        })
        res.dataList.forEach((item) => {
          if (item.station === '横扇广电站') {
            item.fazhan_pros.forEach((v) => {
              this.optionss3.series[0].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '高新区广电中心') {
            item.fazhan_pros.forEach((v) => {
              const de = Math.round((v * 100).toFixed(2))
              this.optionss3.series[1].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '七都广电站') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.optionss3.series[2].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '桃源广电站') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.optionss3.series[3].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '东太湖广电中心') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.optionss3.series[4].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '震泽广电站') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.optionss3.series[5].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '平望广电站') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.optionss3.series[6].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '汾湖广电中心') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.optionss3.series[7].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '开发区广电中心') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.optionss3.series[8].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          }
        })
      })
    },
    Activee1(val) {
      home.Lishifazhanqushi(0, val).then((res) => {
        res.forEach((item, index) => {
          this.options7.series[0].data.push(item.leiji_fazhan)
          this.options7.series[1].data.push(item.fazhan_pro)
          const date = item.date_ymd
          this.options7.xAxis[0].data.push(date)
        })
      })
      // 折线图
      home.Lishifazhanqushi(1, val).then((res) => {
        res.dateList.forEach((v) => {
          this.optionsss3.xAxis.data.push(v)
        })
        res.dataList.forEach((item) => {
          if (item.station === '横扇广电站') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.optionsss3.series[0].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '高新区广电中心') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.optionsss3.series[1].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '七都广电站') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.optionsss3.series[2].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '桃源广电站') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.optionsss3.series[3].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '东太湖广电中心') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.optionsss3.series[4].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '震泽广电站') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.optionsss3.series[5].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '平望广电站') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.optionsss3.series[6].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          } else if (item.station === '汾湖广电中心') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.optionsss3.series[7].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
            // this.optionsss3.xAxis.data.push(item.date_ymd.join(" "))
          } else if (item.station === '开发区广电中心') {
            item.fazhan_pros.forEach((v) => {
              // console.log(v);
              this.optionsss3.series[8].data.push(
                Math.round((v * 100).toFixed(2)),
              )
            })
          }
        })
      })
    },
    Init_Echarts() { },
    getTime() {
      let date = new Date()
      let hour = date.getHours() // 时
      let minutes = date.getMinutes() // 分
      let seconds = date.getSeconds() //秒

      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      this.time = `${hour}:${minutes}:${seconds}`
    },
    getNowDate() {
      let date = new Date()
      let year = date.getFullYear() // 年
      let month = date.getMonth() + 1 // 月
      let day = date.getDate() // 日
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (day >= 0 && day <= 9) {
        day = '0' + day
      }
      this.days = year + '-' + month + '-' + day + ' '

      let weekArr = ['周天', '周一', '周二', '周三', '周四', '周五', '周六']
      this.weeks = weekArr[date.getDay()]
      this.getTime()
      this.timer = setInterval(() => {
        this.getTime()
      }, 1000)
    },
    fullScern() {
      if (screenfull.isEnabled) {// 返回一个布尔值，是否允许您进入全屏模式  如果你当前是非全屏 则返回true
        var full = document.getElementById('fullId');
        screenfull.request(full); // 如果不要full 则页面全屏
        // console.log(screenfull.request(full));
        this.EcharsSzie = 16;  
      }
     
    }
  },
}
</script> 
<style scoped lang="scss">
@import "./index.scss";

.page {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  position: relative;
  overflow: hidden;


}

.section_17 {
  width: calc(100% + 11.9375rem);
  height: 67.5rem;
  //   background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps2s8pquohwcvmhjmha7uhpjm0pxye3kffk3a8f9a80-9a2a-4ad3-a01d-4eea636a315a) -106px -191px
  background: url('../../../../public/背景@3x.png') -6.625rem -11.9375rem no-repeat;
  //     no-repeat;
  background-size: 100% 100%;
}

.text-wrapper_1 {
  width: 120rem;
  height: 3.9375rem;
  //   background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/psieq1h7v4udbxjyt4wdddlh6x1fa0bgwvfebfe176-6696-4931-934d-7bd2887a862a) -1px -1px
  // no-repeat;
  background: url('../../../../public/标题框.png') -1px -1px no-repeat;
  background-size: 120.0625rem 4rem;
}

.title_bg {
  width: calc(100% - 11.9375rem);
  height: 50px;
  background: url('../../../assets/img/Reportscreen/title_3x.png') 100% no-repeat;
  background-size: 100% 100%;
}

.title_text {
  color: #fff;
  display: flex;
  justify-content: flex-end;
  font-size: 1.125rem;
  font-weight: bold;
  align-items: center;
  padding: 0.5rem 1.25rem;
}

.report_screen_el-row {
  padding: 0.625rem;
}

.Development_title {
  display: flex;
  margin-top: 0.625rem;

  .Development_tag {
    width: 0.9375rem;
    height: 1.875rem;
    background-color: #00c6ff;
  }

  .title {
    flex: 1;
    color: #fff;
    display: flex;
    align-items: center;
    background: linear-gradient(90deg,
        rgba(37, 88, 187, 0.99) 1%,
        rgba(37, 88, 187, 0) 100%);
    margin-left: 0.25rem;
    padding: 0px 1.125rem;
    font-weight: bold;
    font-size: 1.125rem;
  }
}

.Development_analysis {
  background: url('../../../assets/img/Reportscreen/bottom_bg.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 17.375rem;
  margin-top: 0.625rem;
  padding: 0.625rem;
}

.Development_analysis2 {
  background: url('../../../assets/img/Reportscreen/bottom_bg.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 22.4375rem;
  margin-top: 0.625rem;
}

.package {
  background: url('../../../assets/img/Reportscreen/package_bj.png') no-repeat;
  background-size: 100% 100%;
  height: 11.375rem;
  margin-top: 0.625rem;
}

.Heroes {
  background: url('../../../assets/img/Reportscreen/bottom_3x.png') no-repeat;
  background-size: 100% 100%;
  height: 28.5325rem;
  margin-top: 0.5625rem;
  padding: 0.625rem;

  .Top10 {
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    text-align: center;
    margin-top: 0.3125rem;
  }
}

.Heroes_Personal_accumulation {
  .accumulation_title {
    font-size: 1rem;
    text-align: center;
    color: #fff;
    font-weight: bold;
    margin-top: -0.3rem;
  }

  .accumulation_ranking {
    width: 100%;
    height: 10.875rem;
    background: rgba(0, 198, 255, 0.1);
    border: 1px solid #00c6ff;
    margin-top: 0.375rem;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0.3125rem;
    transition: all 0.5s;

    .scrollbar {
      overflow-x: hidden;
      overflow-y: scroll;
      scrollbar-width: none;
      scroll-behavior: smooth;
    }

    .accumulation_ranking_one1_one5::-webkit-scrollbar {
      display: none;
    }

    .accumulation_ranking_one1_one5 {
      width: 50%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;

      scrollbar-width: none;
      scroll-behavior: smooth;

      .text1 {
        font-size: 0.875rem;
        margin: 0.625rem 0;
      }

      .text2 {
        font-size: 0.875rem;
        margin: 0.625rem 0.9375rem;
      }

      .text {
        display: flex;
        font-size: 0.875rem;
        margin: 0.625rem 0;
        align-items: center;

        .one {
          color: #eec444;
        }

        .two {
          color: #dddddd;
        }

        .three {
          color: #da8639;
        }

        span {
          margin-left: 0.25rem;
        }

        .img {
          width: 1.25rem;
          height: 1.25rem;
        }

        img {
          box-sizing: border-box;
          width: 1.25rem;
          height: 1.25rem;
        }
      }
    }

    .ranking_one1_one5::-webkit-scrollbar {
      display: none;
    }

    .ranking_one1_one5 {
      width: 67%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      scrollbar-width: none;

      .text {
        padding: 0.375rem 0.125rem;
        font-size: 0.875rem;
        display: flex;
        align-items: center;

        .one {
          color: #eec444;
        }

        .two {
          color: #dddddd;
        }

        .three {
          color: #da8639;
        }

        span {
          margin-left: 0.25rem;
        }

        .img {
          width: 1.25rem;
          height: 1.25rem;
        }

        img {
          box-sizing: border-box;
          width: 1.25rem;
          height: 1.25rem;
        }
      }
    }

    .ranking_one1_one6 {
      flex: 1;
      font-size: 0.75rem;
      height: 100%;
      border-left: 0.0625rem solid #e0e0e0;
      padding-left: 0.625rem;

      .ranking_one1_one6_text {
        display: flex;
        align-items: center;
        margin-left: 0.625rem;

        margin: -0.0625rem 0.625rem 0.125rem 0;
        text-align: center;
      }

      .text_top {
        width: 1.25rem;
        // height: 20px;
        margin-right: 0.3125rem;
        font-size: 0.5rem;
        display: flex;
        align-items: center;
      }
    }

    .accumy-top {
      display: flex;
      justify-content: center;
    }

    .ranking_one1_one6::-webkit-scrollbar {
      display: none;
    }
  }
}

.Heroes_Personal_accumulation_2 {
  width: 100%;
  height: 13.48rem;

  background: rgba(0, 198, 255, 0.1);
  border: 0.0625rem solid #00c6ff;
  margin-top: 0.3125rem;

  .accumulation_day_top10::-webkit-scrollbar {
    display: none;
  }

  .accumulation_day_top10 {
    padding: 0.125rem;
    // height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-width: none;

    .day_top {
      display: flex;
      align-items: center;
      font-size: 0.5rem;
      padding: 0.0315rem 0px;

      img {
        width: 1.25rem;
        height: 1.25rem;
      }

      .day_top_number {
        width: 2.5rem;
        text-align: center;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.875rem;
        font-weight: bold;
      }

      .day_top_text {
        display: flex;
        align-items: center;
        font-weight: bold;
        // font-size: 8px;
        color: #fff;
        justify-content: space-between;
        padding-bottom: 0.0625rem;
        flex: 1;
      }

      .one {
        color: #eec444;
      }

      .two {
        color: #dddddd;
      }

      .three {
        color: #da8639;
      }

      .default {
        color: #00eaff;
        font-size: 0.75rem;
      }

      span {
        margin-left: 0.25rem;
      }

      .img {
        width: 1.25rem;
        height: 1.25rem;
      }

      img {
        box-sizing: border-box;
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }
}

.report_screen_el-row {
  width: calc(100% - 11.9375rem);
}

.analysis_cumulative {
  display: flex;
  color: #fff;
  width: 100%;
  font-size: 0.875rem;

  .analysis_title {
    width: 20%;
    display: flex;
    align-items: center;

    .number {
      font-size: 1.875rem;
      color: #00eaff;
      margin-left: 0.625rem;
    }
  }
}

.analysis_echarts {
  .amalysis_o {
    padding-right: 0.5rem;

    &:last-child {
      padding-right: 0px;
    }
  }

  .analysis_one {
    background: rgba(0, 198, 255, 0.1);
    border: 0.0625rem solid #00c6ff;
    // height: 200px;
    color: #fff;

    .analysis_one_title {
      text-align: center;
      padding: 0 0 0.3125rem 0;
    }
  }
}

.analysis_echarts_title {
  color: #fff;
  margin-top: 0.375rem;
  font-size: 1rem;
}

.analysis_mychart {
  width: 100%;
  height: 10.5625rem;
  // margin: 8px 0 0 0;
}

.Development_analysis2_title {
  display: flex;

  .Development_analysis2_select {
    padding: 0.3125rem 0.625rem;
    border: 0.0625rem solid #2c7ef8;
    color: #fff;
    font-size: 0.75rem;
    cursor: pointer;

    &:first-child {
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
    }

    &:last-child {
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }
  }

  .Development_analysis2_select1 {
    background-color: #2c7ef8;
    // transition: all 0.1s;
    padding: 0.3125rem 0.625rem;
  }
}

.Development_analysis_one {
  padding: 0.625rem;

  .Development_analysis_two_title {
    color: #fff;
    font-size: 0.75rem;
    font-weight: bold;
  }

  .Development_analysis_two_analsis {
    width: 100%;
    height: 17.5rem;
    margin-top: 0.9375rem;
  }
}

.package_title {
  display: flex;
  // padding: 5px;
  padding: 0.3125rem 0 0.3125rem 4.875rem;

  .ts {
    font-size: 0.875rem;
    color: #fff;
    font-weight: bold;
  }

  .package_title_titles {
    display: flex;
    position: relative;
    align-items: center;
    margin-left: 1.25rem;
    font-size: 0.875rem;
    color: #fff;
    font-weight: bold;
    border-bottom: 0.0625rem solid #4ef0ff;
    padding-bottom: 0.125rem;
    cursor: pointer;

    .before {
      content: '';
      position: absolute;
      border-bottom: 0.0625rem solid #00c6ff;
      width: 4.375rem;
      bottom: 0px;
      left: 0.625rem;
      transition: all 0.5s;
    }
  }

  .package_title_select {
    padding: 0px 0.625rem;
  }
}

.package_analysis {
  width: 100%;

  ::v-deep .el-col {
    height: 9rem !important;

    &>div {
      height: 100%;
    }
  }
}

::v-deep.el-radio-button__inner {
  background-color: #2c7ef8;
  transition: all 0.1s;
  color: #ffff;
}
</style>
