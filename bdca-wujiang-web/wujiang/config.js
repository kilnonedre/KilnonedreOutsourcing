window.config = {
  baseUrl: '',
  updateTime: '2022-07-21',
  stationOptions: [],
}

async function getStationList() {
  let list = []
  await fetch('./station_grid.json').then((res) => {
    return res.json()
  }).then(data => {
    let arr = data.reduce((pre, item) => {
      pre[item['一级机构']] = [...(pre[item['一级机构']] || []), item]
      return pre
    }, {})
    for (let i in arr) {
      let t = {
        value: i,
        label: i,
      }
      if (arr[i].length > 0) {
        t.children = []
        for (let j = 0; j < arr[i].length; j++) {
          t.children.push({
            value: arr[i][j]['所属网格'],
            label: arr[i][j]['所属网格'],
          })
        }
      }
      list.push(t)
    }
  })
  return list
}

getStationList().then(res => {
  window.config.stationOptions = res
})