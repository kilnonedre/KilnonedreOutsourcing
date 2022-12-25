import{C as O}from"./CommonHeader.a228caf3.js";import{i as z}from"./index.c073a47f.js";import{_ as I,u as Y,r as p,o as u,i as k,w as b,b as _,c as y,d as g,f as v,F as C,h as D,t as H,k as M,m as W,n as T,p as P,q as E}from"./index.22501be6.js";import{k as V}from"./api.22883e35.js";import{t as j}from"./table2excel.fee53b5f.js";const U={props:["tableData","tableHeader"],data(){return{show:!1,xAxis:[],yAxis:[],chart:null}},methods:{drawChart(){const t=this;this.chart=Y(z(this.$refs.myChart));let e=this.tableHeader,s=this.tableData,r=[],a=[];for(let l=0;l<this.yAxis.length;l++)r.push({name:e[l],type:"bar",smooth:!0,tooltip:{},itemStyle:{normal:{label:{show:!0,position:"top",textStyle:{fontSize:12,color:"#383838",fontWeight:"bold"}}}},data:this.yAxis[l]}),a.push({name:e[l],type:"bar",yAxisIndex:l,smooth:!0,tooltip:{valueFormatter:function(h){let c=e[l].split("-");return(s[0][c[0]][c[1]]+"").includes("%")?h+"%":h}},itemStyle:{normal:{label:{show:!0,position:"top",textStyle:{fontSize:12,color:"#383838",fontWeight:"bold"}}}},data:this.yAxis[l]});let o=[];for(let l=0;l<e.length;l++){let h=l===0?"left":"right",c=l===0?"":l*80-80,m=l===0?"end":"middle",x=l===0?"30":"40";o.push({type:"value",name:e[l],nameLocation:m,nameGap:x,position:h,offset:c,alignTicks:!0,axisLine:{show:!0},axisLabel:{fontWeight:"bold",formatter:function(w){let d=e[l].split("-");return(s[0][d[0]][d[1]]+"").includes("%")?w+"%":w}}})}let i=e.length*4+"%",n={grid:{right:i,top:"20%"},tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}},formatter:function(l){let h=l[0].axisValue+": <br /> ";return l.forEach(c=>{h+=c.seriesName+"\uFF1A"+c.value+(c.seriesName.includes("\u7387")?"%":"")+"<br />"}),h}},toolbox:{right:"20",feature:{magicType:{show:!0,title:{line:"\u5207\u6362\u4E3A\u6298\u7EBF\u56FE",bar:"\u5207\u6362\u4E3A\u67F1\u72B6\u56FE"},type:["line","bar"]},saveAsImage:{show:!0,title:"\u4FDD\u5B58\u4E3A\u56FE\u7247",name:"\u5404\u7AD9\u6570\u636E\u5BF9\u6BD4\u56FE"},myRestore:{show:!0,title:"\u91CD\u8F7D",icon:"image://./refresh.png",onclick:function(){t.chart.clear(),t.chart.setOption(n)}},myTool:{show:!0,title:"\u5207\u6362\u4E3A\u591A\u8F74",icon:"image://./doubleY.png",onclick:function(){console.log(f),t.chart.clear(),t.chart.setOption(f)}}}},legend:{data:this.tableHeader,type:"scroll",textStyle:{fontSize:"1rem",fontWeight:"500"}},xAxis:[{type:"category",data:this.xAxis,axisLabel:{interval:0,fontSize:"0.8rem",fontWeight:"bold"},axisPointer:{type:"shadow"}}],yAxis:[{type:"value",alignTicks:!0,axisLine:{show:!0},axisLabel:{fontSize:"0.8rem",fontWeight:"bold"}}],series:r},f={grid:{right:i,top:"20%"},tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}},formatter:function(l){let h=l[0].axisValue+": <br /> ";return l.forEach(c=>{h+=c.seriesName+"\uFF1A"+c.value+(c.seriesName.includes("\u7387")?"%":"")+"<br />"}),h}},toolbox:{right:"20",feature:{magicType:{show:!0,title:{line:"\u5207\u6362\u4E3A\u6298\u7EBF\u56FE",bar:"\u5207\u6362\u4E3A\u67F1\u72B6\u56FE"},type:["line","bar"]},saveAsImage:{show:!0,title:"\u4FDD\u5B58\u4E3A\u56FE\u7247",name:"\u5404\u7AD9\u6570\u636E\u5BF9\u6BD4\u56FE"},myRestore:{show:!0,title:"\u91CD\u8F7D",icon:"image://./refresh.png",onclick:function(){t.chart.clear(),t.chart.setOption(n)}},myTool:{show:!0,title:"\u5207\u6362\u4E3A\u591A\u8F74",icon:"image://./doubleY.png",onclick:function(){t.chart.clear(),t.chart.setOption(f)}}}},legend:{data:this.tableHeader,type:"scroll",textStyle:{fontSize:"1rem",fontWeight:"500"}},xAxis:[{type:"category",data:this.xAxis,axisLabel:{interval:0,fontSize:"0.8rem",fontWeight:"bold"},axisPointer:{type:"shadow"}}],yAxis:o,series:a};this.chart.setOption(n),window.addEventListener("resize",()=>{this.chart.resize()})},open(){let t=window.config.stationOptions.reduce((r,a,o)=>(r[o]=a.label,r),[]);this.xAxis=t;let e=this.tableData.reduce((r,a,o)=>(r[a.\u4E2D\u5FC3\u53CA\u5E7F\u7535\u7AD9]=a,r),{}),s=[];for(let r=0;r<this.tableHeader.length;r++){let a=this.tableHeader[r].split("-"),o=[];for(let i=0;i<this.tableData.length;i++)if(this.tableData[i].\u4E2D\u5FC3\u53CA\u5E7F\u7535\u7AD9!=="\u603B\u8BA1"){let n=e[this.tableData[i].\u4E2D\u5FC3\u53CA\u5E7F\u7535\u7AD9][a[0]][a[1]]||0;o.push((n+"").includes("%")?Number(n.split("%")[0]):Number(n))}s.push(o)}this.yAxis=s,this.$nextTick(()=>{this.drawChart()})},close(){this.chart.dispose(),this.chart=null}}},B={class:"chart-wrap",ref:"myChart"};function F(t,e,s,r,a,o){const i=p("el-dialog");return u(),k(i,{"close-on-click-modal":!1,"close-on-press-escape":!1,onOpened:o.open,onClose:o.close,width:"80vw",modelValue:a.show,"onUpdate:modelValue":e[0]||(e[0]=n=>a.show=n)},{default:b(()=>[_("div",B,null,512)]),_:1},8,["onOpened","onClose","modelValue"])}var J=I(U,[["render",F],["__scopeId","data-v-06dfbe7c"]]);const R={components:{Chart:J},props:["tableData","tableHeader"],data(){return{show:!1,checkAll:!1,checkedHeader:[],combination:{}}},computed:{allHeader(){let t=[];for(let e in this.tableData[0])if(typeof this.tableData[0][e]=="string")e!=="\u4E2D\u5FC3\u53CA\u5E7F\u7535\u7AD9"&&t.push(e);else for(let s in this.tableData[0][e])t.push(e+"-"+s);return t}},methods:{handleCheckAllChange(t){this.checkedHeader=t?this.allHeader:[]},handleCheckedHeadersChange(t){const e=t.length;this.checkAll=e===this.allHeader.length},confirm(){this.show=!1,this.$refs.chart.show=!0},addCombination(t){let e=window.localStorage.getItem("combination")?JSON.parse(window.localStorage.getItem("combination")):{};e[t]=this.checkedHeader,window.localStorage.setItem("combination",JSON.stringify(e)),this.$refs.chart.show=!0},open(){this.combination=window.localStorage.getItem("combination")?JSON.parse(window.localStorage.getItem("combination")):{}},clickCombination(t){this.checkedHeader=t},remove(t){delete this.combination[t],window.localStorage.setItem("combination",JSON.stringify(this.combination))}}},G={class:"dialog-footer"};function q(t,e,s,r,a,o){const i=p("el-tag"),n=p("el-checkbox"),f=p("el-checkbox-group"),l=p("el-button"),h=p("el-dialog"),c=p("chart");return u(),y(C,null,[g(h,{onOpen:o.open,"close-on-click-modal":!1,"close-on-press-escape":!1,modelValue:a.show,"onUpdate:modelValue":e[2]||(e[2]=m=>a.show=m),title:"\u9009\u62E9\u5C55\u793A\u6570\u636E"},{footer:b(()=>[_("span",G,[g(l,{onClick:e[1]||(e[1]=m=>a.show=!1)},{default:b(()=>[v("\u53D6\u6D88")]),_:1}),g(l,{type:"primary",onClick:o.confirm},{default:b(()=>[v("\u786E\u5B9A")]),_:1},8,["onClick"])])]),default:b(()=>[(u(!0),y(C,null,D(a.combination,(m,x)=>(u(),k(i,{round:"",closable:"",key:x,onClick:w=>o.clickCombination(m),onClose:w=>o.remove(x)},{default:b(()=>[v(H(x),1)]),_:2},1032,["onClick","onClose"]))),128)),g(f,{modelValue:a.checkedHeader,"onUpdate:modelValue":e[0]||(e[0]=m=>a.checkedHeader=m),onChange:o.handleCheckedHeadersChange,max:5},{default:b(()=>[(u(!0),y(C,null,D(o.allHeader,m=>(u(),k(n,{key:m,label:m},{default:b(()=>[v(H(m),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue","onChange"])]),_:1},8,["onOpen","modelValue"]),g(c,{ref:"chart",tableData:s.tableData,tableHeader:a.checkedHeader},null,8,["tableData","tableHeader"])],64)}var K=I(R,[["render",q],["__scopeId","data-v-5fbf03b2"]]);const Q={components:{CommonHeader:O,ChartHeader:K},data(){return{tabList:[],activeId:"",activeName:"",date:"",loading:!0,tableData:[],tableHeader:[],downLoading:!1,option:{}}},methods:{getMenu(){V.getApi().then(t=>{this.tabList=t.records,this.activeId=this.tabList.length?this.tabList[0].id:"",this.activeName=this.tabList.length?this.tabList[0].name:"",this.getTableList(this.activeId,this.date)})},handleClick(t){this.activeId=t.props.name,this.activeName=t.props.label,this.$refs.header.checkedHeader=[],window.localStorage.setItem("combination",""),this.getTableList(this.activeId,this.date)},getTableList(t,e){this.loading=!0,this.tableData=[],this.tableHeader=[],V.getDaily(t,e).then(s=>{s.length>0&&(this.tableData=s,this.tableHeader=this.tableData.length?Object.keys(this.tableData[0]):[])}).finally(()=>{this.loading=!1,this.$nextTick(()=>{this.$refs.table.doLayout()})})},getDay(t,e){var s=new Date,r=s.getTime(),a=24*3600*1e3*t;s.setTime(parseInt(r+a));var o=s.getFullYear(),i=(s.getMonth()+1).toString();i.length<=1&&(i="0"+i);var n=s.getDate().toString();return n.length<=1&&(n="0"+n),o+e+i+e+n},changeTime(){this.getTableList(this.activeId,this.date)},getHeader(t){console.log(t)},getProp(t){let e;return typeof this.tableData[0][t]=="string"?e="":e=Object.keys(this.tableData[0][t]),e},clickChart(){this.$refs.header.show=!0},onExport(){let t="",e=[],s=[];this.downLoading=!0,t=this.date,e=this.tableHeader,s=this.tableData;let r=[],a;for(let i=0;i<e.length;i++){if(typeof s[0][e[i]]=="string")a={title:e[i],key:e[i],type:"text"};else{let n=Object.keys(s[0][e[i]]),f=[];for(let l=0;l<n.length;l++)f.push({title:n[l],key:n[l],type:"text"});a={title:e[i],children:f}}r.push(a)}const o=`${t}-${this.activeName}`;j(r,s,o),this.downLoading=!1}},created(){this.getMenu(),this.date=this.getDay(-1,"")}},X=t=>(P("data-v-58b03656"),t=t(),E(),t),Z={class:"page daily"},$={class:"content"},ee={class:"tab-content"},te={class:"toolbox"},ae={class:"left"},le={class:"right"},oe={class:"table"},ie=X(()=>_("div",{style:{"margin-top":"5%"}},"\u6682\u65E0\u6570\u636E",-1));function se(t,e,s,r,a,o){const i=p("common-header"),n=p("el-tab-pane"),f=p("el-tabs"),l=p("el-date-picker"),h=p("el-button"),c=p("el-table-column"),m=p("el-table"),x=p("chart-header"),w=M("loading");return u(),y("div",Z,[g(i,{title:"KPI\u65E5\u62A5"}),_("div",$,[g(f,{modelValue:a.activeId,"onUpdate:modelValue":e[0]||(e[0]=d=>a.activeId=d),class:"demo-tabs",onTabClick:o.handleClick},{default:b(()=>[(u(!0),y(C,null,D(a.tabList,d=>(u(),k(n,{label:d.name,name:d.id},null,8,["label","name"]))),256))]),_:1},8,["modelValue","onTabClick"]),_("div",ee,[_("div",te,[_("div",ae,[g(l,{modelValue:a.date,"onUpdate:modelValue":e[1]||(e[1]=d=>a.date=d),type:"date",placeholder:"\u9009\u62E9\u65E5\u671F",format:"YYYY-MM-DD","value-format":"YYYYMMDD",clearable:!1,editable:!1,onChange:o.changeTime},null,8,["modelValue","onChange"])]),_("div",le,[g(h,{type:"primary",plain:"",onClick:o.clickChart},{default:b(()=>[v("\u67E5\u770B\u56FE\u8868")]),_:1},8,["onClick"]),g(h,{type:"primary",onClick:o.onExport,loading:a.downLoading},{default:b(()=>[v("\u5BFC\u51FA\u6570\u636E")]),_:1},8,["onClick","loading"])])]),_("div",oe,[W((u(),k(m,{ref:"table",height:"100%",stripe:"",border:"",data:a.tableData,"header-cell-style":{background:"#eaf2fe",color:"#383838",fontSize:"16px",height:"34px"},"cell-class-name":"cell-class","row-style":{height:"24px",fontSize:"14px"}},{empty:b(()=>[ie]),default:b(()=>[(u(!0),y(C,null,D(a.tableHeader,(d,A)=>(u(),k(c,{key:d,label:d,align:"center","min-width":"220",fit:!0,fixed:A===0},{default:b(N=>[typeof a.tableData[0][d]=="string"||""?(u(),y("span",{key:0,class:T(A===0?"blod":"")},H(N.row[d]||"-"),3)):(u(!0),y(C,{key:1},D(o.getProp(d),(S,ne)=>(u(),k(c,{key:S,label:S,align:"center","min-width":"160",fit:!0},{default:b(L=>[_("span",{class:T(a.tableData[L.$index][a.tableHeader[0]]=="\u603B\u8BA1"?"blod":"")},H(L.row[d]?L.row[d][S]:"-"),3)]),_:2},1032,["label"]))),128))]),_:2},1032,["label","fixed"]))),128))]),_:1},8,["data"])),[[w,a.loading]])])])]),g(x,{ref:"header",tableData:a.tableData},null,8,["tableData"])])}var pe=I(Q,[["render",se],["__scopeId","data-v-58b03656"]]);export{pe as default};
