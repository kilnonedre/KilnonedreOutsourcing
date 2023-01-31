const carsulUl = document
  .getElementsByClassName('carsul')[0]
  .getElementsByTagName('ul')[0]
const carsulPCUl = document
  .getElementsByClassName('pc__carsul')[0]
  .getElementsByTagName('ul')[0]
const body = document.getElementsByTagName('body')[0]
const dataShow = document.getElementsByClassName('dataShow')[0]
const mask = document.getElementsByClassName('mask')[0]
const maskPc = document.getElementsByClassName('pc__mask')[0]
const maskTable = document
  .getElementsByClassName('mask')[0]
  .getElementsByTagName('table')[0]
const maskPcTable = document
  .getElementsByClassName('pc__mask')[0]
  .getElementsByTagName('table')[0]
const dataShowUl = document
  .getElementsByClassName('dataShow')[0]
  .getElementsByTagName('ul')[0]
const navDiv = document
  .getElementsByClassName('nav')[0]
  .getElementsByTagName('div')
const navPcDiv = document
  .getElementsByClassName('pc__nav')[0]
  .getElementsByTagName('div')
const moble = document.getElementsByClassName('moble')[0]
const pc = document.getElementsByClassName('pc')[0]
const dataPcShow = document.getElementsByClassName('pc__dataShow')[0]
const dataPcShowUl = document
  .getElementsByClassName('pc__dataShow')[0]
  .getElementsByTagName('ul')[0]
if (isMobile()) {
  moble.style.display = 'block'
  pc.style.display = 'none'
} else {
  moble.style.display = 'none'
  pc.style.display = 'block'
}

function isMobile() {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  return flag
}
let time = 1
setInterval(function () {
  carsulUl.style.transform = 'translateY( -' + 25 * time + '% )'
  carsulPCUl.style.transform = 'translateY( -' + 25 * time + '% )'
  time > 2 ? (time = 0) : time++
}, 1500)

dataShow.getElementsByTagName('div')[0].addEventListener('scroll', function () {
  if (this.clientHeight + this.scrollTop >= dataShowUl.clientHeight)
    console.log('ture')
})
dataPcShow
  .getElementsByTagName('div')[0]
  .addEventListener('scroll', function () {
    if (this.clientHeight + this.scrollTop >= dataPcShowUl.clientHeight)
      console.log('ture')
  })

if (
  document.documentElement.clientWidth > document.documentElement.clientHeight
) {
  dataShow.style.height = '100vh'
}

navDiv[0].addEventListener('click', () => {
  mask.style.display = 'block'
  maskTable.style.background = 'linear-gradient(#b195f7, #927ef8)'
  body.getElementsByTagName('div')[0].style.overflow = 'hidden'
})
navDiv[1].addEventListener('click', () => {
  mask.style.display = 'block'
  maskTable.style.background = 'linear-gradient(#f9c159, #fb8c3e)'
  body.getElementsByTagName('div')[0].style.overflow = 'hidden'
})
navPcDiv[0].addEventListener('click', () => {
  maskPc.style.display = 'block'
  maskPcTable.style.background = 'linear-gradient(#b195f7, #927ef8)'
  body.getElementsByTagName('div')[0].style.overflow = 'hidden'
})
navPcDiv[1].addEventListener('click', () => {
  maskPc.style.display = 'block'
  maskPcTable.style.background = 'linear-gradient(#f9c159, #fb8c3e)'
  body.getElementsByTagName('div')[0].style.overflow = 'hidden'
})
mask.addEventListener('click', () => {
  mask.style.display = 'none'
  body.getElementsByTagName('div')[0].style.overflow = 'auto'
})
maskPc.addEventListener('click', () => {
  maskPc.style.display = 'none'
  body.getElementsByTagName('div')[0].style.overflow = 'auto'
})

function show() {
  mask.style.display = 'block'
}
