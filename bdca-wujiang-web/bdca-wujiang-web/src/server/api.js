import http from './http.js'
import Cookies from 'js-cookie'
// import axios from "axios";
// const service1 = axios.create({
//   baseURL: 'http://192.168.2.25:8081',
//   withCredentials: true,
//   // timeout: 5000, // 请求超时时间
// });


// export const getColumnSelectorget = (type) => {
//   return service1({
//     url: `/api/v1/bdca/boss/boss/kpi/5gdailystatistic/getMessage?type=${type}`,
//     method:"post",
//   });
// };
class Home{
  //发展英雄榜
  Fazhanyxi = (type) =>{
    return http({url: `/api/v1/bdca/daping/5gdailystatistic/fazhanyingxiongbang?type=${type}`, 
      method:"post"
    })
  }
  //套餐发展情况
  Taocanfazhanqingkuang = (type) => {
    return http({url: `/api/v1/bdca/daping/5gdailystatistic/taocanfazhanqingkuang?type=${type}`, 
      method:"post"
    })
  }
  //历史发展情况
  Lishifazhanqushi = (type,subType) => {
    return http({url: `/api/v1/bdca/daping/5gdailystatistic/lishifazhanqushi?type=${type}&&subType=${subType}`, 
      method:"post"
    })
  }

  //今日发展情况
  Todayfazhanqingkuang = (type) => {
    return http({url: `/api/v1/bdca/daping/5gdailystatistic/todayfazhanqingkuang`, 
      method:"post"
    })
  }
}
class User {
  login = (data) =>
    http({
      url: '/api/v1/bdca/login',
      data,
      method: 'post',
      type: 'formData',
    })
  logout = () => http({ url: '/api/v1/bdca/logout' })
  editPassword = (data) => {
    return http({
      url:
        '/api/v1/bdca/password?password=' +
        encodeURIComponent(data.password) +
        '&newpassword=' +
        encodeURIComponent(data.newpassword),
      method: 'put',
    })
  }
}

class Kpi {
  getApi = () => {
    return http({ url: `/api/v1/bdca/boss/kpi/daily/api` })
  }
  getBasic = (dailyApiId, date) => {
    return http({
      url: `/api/v1/bdca/boss/kpi/daily/api/content?dailyApiId=${dailyApiId}&date=${date}&descs=updated&size=1`,
    })
  }
  getDaily = (dailyApiId, date) => {
    let dateStr = date ? '&date=' + date : ''
    return http({
      url: `/api/v1/bdca/boss/kpi/daily/report?dailyApiId=${dailyApiId}${dateStr}&descs=updated&size=1`,
    })
  }
  editDaily = (data) => {
    return http({
      url: `/api/v1/bdca/boss/kpi/daily/api/content`,
      method: 'post',
      data,
    })
  }
  rerun = (id) => {
    return http({
      url: `/api/v1/bdca/cloudboss/kpi/daily/api/content/rerun?ids=${id}`,
      method: 'post',
    })
  }
  getAnnual = (date) => {
    return http({
      url: `/api/v1/bdca/boss/kpi/year/indicator?date=${date}&descs=updated&size=1`,
    })
  }
  editAnnual = (data) => {
    return http({
      url: `/api/v1/bdca/boss/kpi/year/indicator`,
      method: 'post',
      data,
    })
  }
  getHistoryDays = (data) => {
    return http({ url: `/api/v1/bdca/boss/kpi/daily/report/days`, data })
  }
  getHistoryMonths = (data) => {
    return http({ url: `/api/v1/bdca/boss/kpi/daily/report/months`, data })
  }
}

class Detail {
  getArrearage(data) {
    return http({ url: `/api/v1/bdca/boss/szwj/arrearage/customer/tag/daily`, data })
  }
  getTelevision(data) {
    return http({ url: `/api/v1/bdca/boss/szwj/sdtv/customer/tag/daily`, data })
  }
  getBroadband(data) {
    return http({ url: `/api/v1/bdca/boss/szwj/hitv/customer/tag/daily`, data })
  }
  getInstalled(data) {
    return http({ url: `/api/v1/bdca/yhxw/order/anzhuang/detail`, data })
  }
  getRepaired(data) {
    return http({ url: `/api/v1/bdca/yhxw/order/weixiu/detail`, data })
  }
  getOnce(data) {
    return http({ url: `/api/v1/bdca/yhxw/xiaozhang/fin2/received/mingxi`, data })
  }
}

class Behavior {
  getDailyInstalled(data) {
    return http({ url: `/api/v1/bdca/yhxw/order/anzhuang/statistic/day`, data })
  }
  getDailyInstalledGroup(data) {
    return http({ url: `/api/v1/bdca/yhxw/order/anzhuang/statistic/day/groupby`, data })
  }
  getWeekInstalled(data) {
    return http({ url: `/api/v1/bdca/yhxw/order/anzhuang/statistic/week`, data })
  }
  getWeekInstalledGroup(data) {
    return http({ url: `/api/v1/bdca/yhxw/order/anzhuang/statistic/week/groupby`, data })
  }
  getMonthInstalled(data) {
    return http({ url: `/api/v1/bdca/yhxw/order/anzhuang/statistic/month`, data })
  }
  getMonthInstalledGroup(data) {
    return http({ url: `/api/v1/bdca/yhxw/order/anzhuang/statistic/month/groupby`, data })
  }
  getDailyRepaired(data) {
    return http({ url: `/api/v1/bdca/yhxw/order/weixiu/statistic/day`, data })
  }
  getDailyRepairedGroup(data) {
    return http({ url: `/api/v1/bdca/yhxw/order/weixiu/statistic/day/groupby`, data })
  }
  getWeekRepaired(data) {
    return http({ url: `/api/v1/bdca/yhxw/order/weixiu/statistic/week`, data })
  }
  getWeekRepairedGroup(data) {
    return http({ url: `/api/v1/bdca/yhxw/order/weixiu/statistic/week/groupby`, data })
  }
  getMonthRepaired(data) {
    return http({ url: `/api/v1/bdca/yhxw/order/weixiu/statistic/month`, data })
  }
  getMonthRepairedGroup(data) {
    return http({ url: `/api/v1/bdca/yhxw/order/weixiu/statistic/month/groupby`, data })
  }
  getRegionClickDay(data) {
    return http({ url: `/api/v1/bdca/yhxw/station/cust/click/day`, data })
  }
  getRegionClickDayGroup(data) {
    return http({ url: `/api/v1/bdca/yhxw/station/cust/click/day/groupby`, data })
  }
  getRegionClickWeek(data) {
    return http({ url: `/api/v1/bdca/yhxw/station/cust/click/week`, data })
  }
  getRegionClickWeekGroup(data) {
    return http({ url: `/api/v1/bdca/yhxw/station/cust/click/week/groupby`, data })
  }
  getRegionClickMonth(data) {
    return http({ url: `/api/v1/bdca/yhxw/station/cust/click/month`, data })
  }
  getRegionClickMonthGroup(data) {
    return http({ url: `/api/v1/bdca/yhxw/station/cust/click/month/groupby`, data })
  }
  getLanmuClickMonth(data) {
    return http({ url: `/api/v1/bdca/yhxw/app/cust/statistic/data/month`, data })
  }
  getLanmuClickDayGroup(data) {
    return http({ url: `/api/v1/bdca/yhxw/app/cust/statistic/data/day/groupby`, data })
  }
  getLanmuClickWeekGroup(data) {
    return http({ url: `/api/v1/bdca/yhxw/app/cust/statistic/data/week/groupby`, data })
  }
  getLanmuClickMonthGroup(data) {
    return http({ url: `/api/v1/bdca/yhxw/app/cust/statistic/data/month/groupby`, data })
  }
  getZhuanquClickDay(data) {
    return http({ url: `/api/v1/bdca/yhxw/zhuangqu/click/statistic/day`, data })
  }
  getZhuanquClickDayGroup(data) {
    return http({ url: `/api/v1/bdca/yhxw/zhuangqu/click/statistic/day/groupby`, data })
  }
  getZhuanquClickWeek(data) {
    return http({ url: `/api/v1/bdca/yhxw/zhuangqu/click/statistic/week`, data })
  }
  getZhuanquClickWeekGroup(data) {
    return http({ url: `/api/v1/bdca/yhxw/zhuangqu/click/statistic/week/groupby`, data })
  }
  getZhuanquClickMonth(data) {
    return http({ url: `/api/v1/bdca/yhxw/zhuangqu/click/statistic/month`, data })
  }
  getZhuanquClickMonthGroup(data) {
    return http({ url: `/api/v1/bdca/yhxw/zhuangqu/click/statistic/month/groupby`, data })
  }
  getCardClickDay(data) {
    return http({ url: `/api/v1/bdca/yhxw/card/click/day`, data })
  }
  getCardClickWeek(data) {
    return http({ url: `/api/v1/bdca/yhxw/card/click/week`, data })
  }
  getCardClickMonth(data) {
    return http({ url: `/api/v1/bdca/yhxw/card/click/month`, data })
  }
  getXiaozhangPre(data) {
    return http({ url: `/api/v1/bdca/yhxw/xiaozhang/pre/statistic/groupby`, data })
  }
  getXiaozhangBillDistribute(data) {
    return http({ url: `/api/v1/bdca/yhxw/xiaozhang/bill/distribute/statistic/groupby`, data })
  }
  getXiaozhangFin2(data) {
    return http({ url: `/api/v1/bdca/yhxw/xiaozhang/fin2/statistic/groupby`, data })
  }
  getXiaozhangBankWithhold(data) {
    return http({ url: `/api/v1/bdca/yhxw/xiaozhang/bank/withhold/statistic/groupby`, data })
  }
  getLostBasic(data) {
    return http({url: `/api/v1/bdca/yhxw/lost/basic/mingxi`, data})
  }
  getLostHitvClick(data) {
    return http({url: `/api/v1/bdca/yhxw/lost/hitv/click/statistic`, data})
  }
  getLostHitvWeixiu(data) {
    return http({url: `/api/v1/bdca/yhxw/lost/hitv/weixiu/statistic`, data})
  }
  getLostSdtvClick(data) {
    return http({url: `/api/v1/bdca/yhxw/lost/sdtv/click/statistic`, data})
  }
  getLostSdtvWeixiu(data) {
    return http({url: `/api/v1/bdca/yhxw/lost/sdtv/weixiu/statistic`, data})
  }
}

class Media {
  getColumnSelector(data) {
    return http({url: `/api/v1/bdca/xmtyy/columnManage/selector`, data})
  }
  getColumnSelectordr(type,station) {
    return http({url: `/api/v1/bdca/boss/kpi/5gdailystatistic/getMessageForPc?type=${type}`, 
    method:"post"
  })
  }
  getColumnSelectord2r(type,size,station="") {
    return http({url: `/api/v1/bdca/boss/kpi/5gdailystatistic/getMessageForPc?type=${type}&size=${size}&station=${station}`, 
    method:"post"
  })
  }
  getColumnSelectordrsta() {
    return http({url: '/api/v1/bdca/boss/kpi/5gdailystatistic/getStation', 
    method:"post"
  })
  }
  getColumnManage(data) {
    return http({url: `/api/v1/bdca/xmtyy/columnManage/list`, data})
  }
  addColumnManage(data) {
    let str = '?'
    for (let i in data) {
      if (data[i]) {
        str += i + '=' + data[i] + '&'
      }
    }
    str = str.slice(0, -1)
    return http({
      url: `/api/v1/bdca/xmtyy/columnManage/add` + str, 
      method: 'post',
    })
  }
  editColumnManage(data) {
    let str = '?'
    for (let i in data) {
      if (data[i]) {
        str += i + '=' + data[i] + '&'
      }
    }
    str = str.slice(0, -1)
    return http({
      url: `/api/v1/bdca/xmtyy/columnManage/edit` + str, 
      method: 'put',
    })
  }
  delColumnManage(id) {
    return http({
      url: `/api/v1/bdca/xmtyy/columnManage/delete?id=${id}`,
      method: 'delete'
    })
  }
  getColumnPutPlan(data) {
    return http({url: `/api/v1/bdca/xmtyy/columnPutPlan/list`, data})
  }
  addColumnPutPlan(data) {
    let str = '?'
    for (let i in data) {
      if (data[i]) {
        str += i + '=' + data[i] + '&'
      }
    }
    str = str.slice(0, -1)
    return http({
      url: `/api/v1/bdca/xmtyy/columnPutPlan/add` + str, 
      method: 'post',
    })
  }
  editColumnPutPlan(data) {
    let str = '?'
    for (let i in data) {
      if (data[i]) {
        str += i + '=' + data[i] + '&'
      }
    }
    str = str.slice(0, -1)
    return http({
      url: `/api/v1/bdca/xmtyy/columnPutPlan/edit` + str, 
      method: 'put',
    })
  }
  delColumnPutPlan(id) {
    return http({
      url: `/api/v1/bdca/xmtyy/columnPutPlan/delete?id=${id}`,
      method: 'delete'
    })
  }
}

class Subscribe {
  subsArrearage(data) {
    let str = '?'
    for (let i in data) {
      if (data[i]) {
        str += i + '=' + data[i] + '&'
      }
    }
    str = str.slice(0, -1)
    return http({
      url: `/api/v1/bdca/boss/szwj/arrearage/customer/tag/daily/subscribe` + str,
      method: 'post',
    })
  }
  subsTelevision(data) {
    let str = '?'
    for (let i in data) {
      if (data[i]) {
        str += i + '=' + data[i] + '&'
      }
    }
    str = str.slice(0, -1)
    return http({
      url: `/api/v1/bdca/boss/szwj/sdtv/customer/tag/daily/subscribe` + str,
      method: 'post',
    })
  }
  subsBroadband(data) {
    let str = '?'
    for (let i in data) {
      if (data[i]) {
        str += i + '=' + data[i] + '&'
      }
    }
    str = str.slice(0, -1)
    return http({
      url: `/api/v1/bdca/boss/szwj/hitv/customer/tag/daily/subscribe` + str,
      method: 'post',
    })
  }
  getArrearage(data) {
    return http({url: `/api/v1/bdca/boss/szwj/arrearage/customer/tag/daily/subscribe/user`, data})
  }
  getTelevision(data) {
    return http({url: `/api/v1/bdca/boss/szwj/sdtv/customer/tag/daily/subscribe/user`, data})
  }
  getBroadband(data) {
    return http({url: `/api/v1/bdca/boss/szwj/hitv/customer/tag/daily/subscribe/user`, data})
  }
  delArrearage(id) {
    return http({url: `/api/v1/bdca/boss/szwj/arrearage/customer/tag/daily/subscribe?id=${id}`, method: 'delete' })
  }
  delTelevision(id) {
    return http({url: `/api/v1/bdca/boss/szwj/sdtv/customer/tag/daily/subscribe?id=${id}`, method: 'delete' })
  }
  delBroadband(id) {
    return http({url: `/api/v1/bdca/boss/szwj/hitv/customer/tag/daily/subscribe?id=${id}`, method: 'delete' })
  }
}

class Management {
  getLoginLog(data) {
    return http({ url: `/api/v1/bdca/management/loginlog`, data})
  }
  getParamList(data) {
    return http({ url: `/api/v1/bdca/data/paramList`, data})
  }
  addUser(data) {
    let str = '?'
    for (let i in data) {
      if (i !== 'station_grid') {
        str += i + '=' + data[i] + '&'
      }
    }
    str = str.slice(0, -1)
    return http({
      url: `/api/v1/bdca/management/user` + str,
      method: 'post',
    })
  }
  editUser(data) {
    let str = '?'
    for (let i in data) {
      if (i !== 'station_grid') {
        str += i + '=' + data[i] + '&'
      }
    }
    str = str.slice(0, -1)
    return http({
      url: `/api/v1/bdca/management/user` + str,
      method: 'put',
    })
  }
  getUser(data) {
    return http({ url: `/api/v1/bdca/management/user`, data})
  }
  delUser(id) {
    return http({ url: `/api/v1/bdca/management/user?id=${id}`, method: 'delete'})
  }
  resetUserPwd(data) {
    let str = '?'
    for (let i in data) {
      if (data[i]) {
        str += i + '=' + data[i] + '&'
      }
    }
    str = str.slice(0, -1)
    return http({
      url: `/api/v1/bdca/management/user/password` + str,
      method: 'put',
    })
  }
  getRole() {
    return http({ url: `/api/v1/bdca/management/role`})
  }
  getUserRole(id) {
    return http({ url: `/api/v1/bdca/management/user/role?userid=${id}` })
  }
  updateUserRole(data) {
    return http({ url: `/api/v1/bdca/management/user/role?userId=${data.userId}&roleId=${data.roleId}`, method:'put', data })
  }
  delUserRole(id) {
    return http({ url: `/api/v1/bdca/management/user/role?id=${id}`, method: 'delete' })
  }
}

class File {
  addFile(data) {
    console.log(data);
    return http({
      url: `/api/v1/bdca/files`, 
      method: 'post',
      data,
      type: 'form',
    })
  }
}

export const user = new User()
export const kpi = new Kpi()
export const detail = new Detail()
export const behavior = new Behavior()
export const media = new Media()
export const subscribe = new Subscribe()
export const management = new Management()
export const file = new File()
export const home = new Home()
