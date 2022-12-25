import{C as M}from"./CommonHeader.a228caf3.js";import{b as x}from"./api.22883e35.js";import{_ as P,C as u,r as h,k as E,o as i,c as p,d,b as r,w as c,i as o,l as m,m as U,F as v,h as y,f as G,t as I,p as X,q as K}from"./index.22501be6.js";import{t as W}from"./table2excel.fee53b5f.js";const k="dateYmd,month,dw1,custType,serviceHall,bank,bossType",L={\u65E5\u671F:"dateYmd",\u6708\u4EFD:"month",\u4E2D\u5FC3\u53CA\u5E7F\u7535\u7AD9:"dw1",\u5BA2\u6237\u7C7B\u578B:"custType",\u8425\u4E1A\u5385:"serviceHall",\u4EE3\u6263\u673A\u6784:"bank",boss\u79D1\u76EE\u540D\u79F0:"bossType"},g={month:{label:"\u6708\u4EFD",width:"150",sort:!0},dw1:{label:"\u4E2D\u5FC3\u53CA\u5E7F\u7535\u7AD9",width:"180",sort:!0},custType:{label:"\u5BA2\u6237\u7C7B\u578B",width:"120",sort:!0},servicePay:{label:"\u4ED8\u8D39\u8282\u76EE\u4E1A\u52A1",width:"150",sort:!0},serviceHdOrder:{label:"\u4E92\u52A8\u70B9\u64AD\u4E1A\u52A1",width:"150",sort:!0},serviceHdBasic:{label:"\u4E92\u52A8\u57FA\u672C\u4E1A\u52A1",width:"150",sort:!0},serviceKd:{label:"\u5BBD\u5E26\u4E1A\u52A1",width:"150",sort:!0},serviceBasic:{label:"\u6570\u5B57\u57FA\u672C\u4E1A\u52A1",width:"150",sort:!0},serviceIncrement:{label:"\u589E\u503C\u4E1A\u52A1",width:"150",sort:!0},sum:{label:"\u603B\u8BA1",width:"180",sort:!0},fenduan1:{label:"0-24",width:"150",sort:!0},fenduan2:{label:"24-50",width:"200",sort:!0},fenduan3:{label:"50-100",width:"200",sort:!0},fenduan4:{label:"100-200",width:"200",sort:!0},fenduan5:{label:"200-500",width:"200",sort:!0},fenduan6:{label:"500\u53CA\u4EE5\u4E0A",width:"200",sort:!0},serviceHall:{label:"\u8425\u4E1A\u5385",width:"150",sort:!0},bossType:{label:"boss\u79D1\u76EE\u540D\u79F0",width:"200",sort:!0},fee:{label:"\u8D39\u7528",width:"200",sort:!0},bank:{label:"\u4EE3\u6263\u673A\u6784",width:"150",sort:!0},dateYmd:{label:"\u65E5\u671F",width:"150",sort:!0}},A={components:{CommonHeader:M},data(){return{activeName:"\u9884\u9500\u8D26",tabDisable:!1,loading:!0,downLoading:!1,checkGroup:["\u6708\u4EFD"],group:"month",date:"",month:"",dw1:"",stationOptions:["\u5F00\u53D1\u533A\u5E7F\u7535\u4E2D\u5FC3","\u6C7E\u6E56\u5E7F\u7535\u4E2D\u5FC3","\u9AD8\u65B0\u533A\u5E7F\u7535\u4E2D\u5FC3","\u5434\u6C5F\u4E1C\u592A\u6E56\u4E2D\u5FC3","\u4E03\u90FD\u5E7F\u7535\u7AD9","\u6843\u6E90\u5E7F\u7535\u7AD9","\u9707\u6CFD\u5E7F\u7535\u7AD9","\u5E73\u671B\u5E7F\u7535\u7AD9","\u6A2A\u6247\u5E7F\u7535\u7AD9"],stationOptionsforOnce:[],custType:"",custTypeList:["\u516C\u4F17\u5BA2\u6237","\u666E\u901A\u5546\u4E1A\u5BA2\u6237","\u5408\u540C\u5546\u4E1A\u5BA2\u6237","\u5176\u4ED6"],serviceHall:"",serviceHallList:[],caller1:!1,bank:"",bankList:[],bossType:"",bossTypeList:[],caller2:!1,total:0,pageSize:100,currentPage:1,tableHeader:{},tableData:[],ascs:"",descs:""}},methods:{getTableList(a){this.loading=!0,this.tabDisable=!0,this.tableHeader={},this.tableData=[],a=="\u9884\u9500\u8D26"?x.getXiaozhangPre({size:this.pageSize,current:this.currentPage,month1:u(this.month)?this.month[0]:"",month2:u(this.month)?this.month[1]:"",dw1:this.dw1,custType:this.custType,groupBy:this.group,descs:this.descs,ascs:this.ascs}).then(t=>{t.records.length!=0&&Object.keys(t.records[0]).forEach(e=>{this.group.indexOf(e)!=-1&&(this.tableHeader[e]=g[e]),k.indexOf(e)==-1&&(this.tableHeader[e]=g[e])}),this.tableData=t.records,this.tableData.forEach(e=>{e.fee!=null&&(e.fee=e.fee.substr(0,10)),e.servicePay!=null&&(e.servicePay=e.servicePay.toFixed(2)),e.serviceHdOrder!=null&&(e.serviceHdOrder=e.serviceHdOrder.toFixed(2)),e.serviceHdBasic!=null&&(e.serviceHdBasic=e.serviceHdBasic.toFixed(2)),e.serviceKd!=null&&(e.serviceKd=e.serviceKd.toFixed(2)),e.serviceBasic!=null&&(e.serviceBasic=e.serviceBasic.toFixed(2)),e.serviceIncrement!=null&&(e.serviceIncrement=e.serviceIncrement.toFixed(2)),e.sum!=null&&(e.sum=e.sum.toFixed(2))}),this.total=t.total}).finally(()=>{this.tabDisable=!1,this.loading=!1,this.$nextTick(()=>{this.$refs.table.doLayout()})}):a=="\u6708\u6D88\u8D39"?x.getXiaozhangBillDistribute({size:this.pageSize,current:this.currentPage,month1:u(this.month)?this.month[0]:"",month2:u(this.month)?this.month[1]:"",dw1:this.dw1,custType:this.custType,groupBy:this.group,descs:this.descs,ascs:this.ascs}).then(t=>{t.records.length!=0&&Object.keys(t.records[0]).forEach(e=>{this.group.indexOf(e)!=-1&&(this.tableHeader[e]=g[e]),k.indexOf(e)==-1&&(this.tableHeader[e]=g[e])}),this.tableData=t.records,this.total=t.total}).finally(()=>{this.tabDisable=!1,this.loading=!1,this.$nextTick(()=>{this.$refs.table.doLayout()})}):a=="\u4E00\u6B21\u6027"?(x.getXiaozhangFin2({size:this.pageSize,current:this.currentPage,month1:u(this.month)?this.month[0]:"",month2:u(this.month)?this.month[1]:"",dw1:this.dw1,serviceHall:this.serviceHall,groupBy:this.group,descs:this.descs,ascs:this.ascs}).then(t=>{t.records.length!=0&&Object.keys(t.records[0]).forEach(e=>{this.group.indexOf(e)!=-1&&(this.tableHeader[e]=g[e]),k.indexOf(e)==-1&&(this.tableHeader[e]=g[e])}),this.tableData=t.records,this.tableData.forEach(e=>{e.fee!=null&&(e.fee=e.fee.toFixed(2))}),this.total=t.total}).finally(()=>{this.tabDisable=!1,this.loading=!1,this.$nextTick(()=>{this.$refs.table.doLayout()})}),this.caller1||x.getXiaozhangFin2({size:-1,groupBy:"month,dw1,serviceHall,bossType"}).then(t=>{t.records.length!=0&&(t.records.forEach(e=>{e.dw1!=null&&this.stationOptionsforOnce.indexOf(e.dw1)==-1&&this.stationOptionsforOnce.push(e.dw1),e.serviceHall!=null&&this.serviceHallList.indexOf(e.serviceHall)==-1&&this.serviceHallList.push(e.serviceHall),e.bossType!=null&&this.bossTypeList.indexOf(e.bossType)==-1&&this.bossTypeList.push(e.bossType)}),this.caller1=!0)})):a=="\u94F6\u884C"&&(x.getXiaozhangBankWithhold({size:this.pageSize,current:this.currentPage,date1:u(this.date)?this.date[0]:"",date2:u(this.date)?this.date[1]:"",month1:u(this.month)?this.month[0]:"",month2:u(this.month)?this.month[1]:"",dw1:this.dw1,bank:this.bank,groupBy:this.group,descs:this.descs,ascs:this.ascs}).then(t=>{t.records.length!=0&&Object.keys(t.records[0]).forEach(e=>{this.group.indexOf(e)!=-1&&(this.tableHeader[e]=g[e]),k.indexOf(e)==-1&&(this.tableHeader[e]=g[e])}),this.tableData=t.records,this.tableData.forEach(e=>{e.dateYmd!=null&&(e.dateYmd=e.dateYmd.substr(0,10)),e.fee!=null&&(e.fee=e.fee.toFixed(2))}),this.total=t.total}).finally(()=>{this.tabDisable=!1,this.loading=!1,this.$nextTick(()=>{this.$refs.table.doLayout()})}),this.caller2||x.getXiaozhangBankWithhold({size:-1,groupBy:"month,dw1,bank"}).then(t=>{t.records.length!=0&&(t.records.forEach(e=>{e.bank!=null&&this.bankList.indexOf(e.bank)==-1&&this.bankList.push(e.bank)}),this.caller2=!0)}))},handleClick(a){this.activeName=a.props.name,this.checkGroup=["\u6708\u4EFD"],this.group="month",this.ascs="",this.descs="",this.getTableList(this.activeName)},handleCheckedGroupChange(a){this.group="";for(let t=0;t<a.length;t++)t==a.length-1?this.group+=L[a[t]]:this.group+=L[a[t]]+",";this.getTableList(this.activeName)},changeTime(){this.getTableList(this.activeName)},getMonth(){let a=new Date,t=a.getMonth();t=t-1,t>11?(a.setFullYear(a.getFullYear()+1),a.setMonth(0)):t<0?(a.setFullYear(a.getFullYear()-1),a.setMonth(11)):a.setMonth(t);let e=a.getFullYear(),b=(a.getMonth()+1).toString();return b.length<=1&&(b="0"+b),e+"/"+b},handleSizeChange(a){this.pageSize=a,this.currentPage=1,this.getTableList(this.activeName)},handleCurrentChange(a){this.currentPage=a,this.getTableList(this.activeName)},sortTable({prop:a,order:t}){t=="ascending"?(this.ascs=a,this.descs=""):t=="descending"?(this.ascs="",this.descs=a):(this.ascs="",this.descs=""),this.getTableList(this.activeName,this.checkPeriod)},onExport(){let a=this.date?this.date:"\u5168\u90E8\u65E5\u671F",t=this.tableData;this.downLoading=!0;let e=[],b;for(let n in this.tableHeader)b={title:this.tableHeader[n].label,key:n,type:"text"},e.push(b);const l=`${a}-${this.activeName}`;W(e,t,l),this.downLoading=!1}},created(){this.month=[this.getMonth(),this.getMonth()],this.getTableList(this.activeName)}},q=a=>(X("data-v-04950086"),a=a(),K(),a),R={class:"page order"},J={class:"content"},Q={class:"tab-content"},Z={class:"group"},j={class:"toolbox"},$={class:"left"},ee={class:"right"},te={class:"table"},le=q(()=>r("div",{style:{"margin-top":"5%"}},"\u6682\u65E0\u6570\u636E",-1)),se={class:"pagination"};function ae(a,t,e,b,l,n){const N=h("common-header"),T=h("el-tab-pane"),V=h("el-tabs"),f=h("el-checkbox"),O=h("el-checkbox-group"),C=h("el-date-picker"),w=h("el-option"),_=h("el-select"),D=h("el-button"),z=h("el-table-column"),Y=h("el-table"),B=h("el-pagination"),S=E("loading");return i(),p("div",R,[d(N,{title:"\u9500\u8D26\u5206\u6790"}),r("div",J,[d(V,{modelValue:l.activeName,"onUpdate:modelValue":t[0]||(t[0]=s=>l.activeName=s),onTabClick:n.handleClick},{default:c(()=>[d(T,{disabled:l.tabDisable,label:"\u9884\u9500\u8D26\u60C5\u51B5",name:"\u9884\u9500\u8D26"},null,8,["disabled"]),d(T,{disabled:l.tabDisable,label:"\u7528\u6237\u6708\u6D88\u8D39\u989D\u5EA6\u5206\u5E03\u60C5\u51B5",name:"\u6708\u6D88\u8D39"},null,8,["disabled"]),d(T,{disabled:l.tabDisable,label:"\u4E00\u6B21\u6027\u8D39\u7528\u60C5\u51B5",name:"\u4E00\u6B21\u6027"},null,8,["disabled"]),d(T,{disabled:l.tabDisable,label:"\u94F6\u884C\u4EE3\u6263\u60C5\u51B5",name:"\u94F6\u884C"},null,8,["disabled"])]),_:1},8,["modelValue","onTabClick"]),r("div",Q,[r("div",Z,[d(O,{modelValue:l.checkGroup,"onUpdate:modelValue":t[1]||(t[1]=s=>l.checkGroup=s),onChange:n.handleCheckedGroupChange},{default:c(()=>[l.activeName=="\u94F6\u884C"?(i(),o(f,{key:0,label:"\u65E5\u671F"})):m("",!0),d(f,{label:"\u6708\u4EFD"}),d(f,{label:"\u4E2D\u5FC3\u53CA\u5E7F\u7535\u7AD9"}),l.activeName=="\u9884\u9500\u8D26"||l.activeName=="\u6708\u6D88\u8D39"?(i(),o(f,{key:1,label:"\u5BA2\u6237\u7C7B\u578B"})):l.activeName=="\u4E00\u6B21\u6027"?(i(),o(f,{key:2,label:"\u8425\u4E1A\u5385"})):l.activeName=="\u94F6\u884C"?(i(),o(f,{key:3,label:"\u4EE3\u6263\u673A\u6784"})):m("",!0),l.activeName=="\u4E00\u6B21\u6027"?(i(),o(f,{key:4,label:"boss\u79D1\u76EE\u540D\u79F0"})):m("",!0)]),_:1},8,["modelValue","onChange"])]),r("div",j,[r("div",$,[l.activeName=="\u94F6\u884C"?(i(),o(C,{key:0,modelValue:l.date,"onUpdate:modelValue":t[2]||(t[2]=s=>l.date=s),type:"daterange",format:"YYYY-MM-DD","value-format":"YYYY/MM/DD","start-placeholder":"\u5F00\u59CB\u65E5\u671F","end-placeholder":"\u7ED3\u675F\u65E5\u671F",style:{width:"250px","margin-right":"10px"},onChange:n.changeTime},null,8,["modelValue","onChange"])):m("",!0),d(C,{modelValue:l.month,"onUpdate:modelValue":t[3]||(t[3]=s=>l.month=s),type:"monthrange",format:"YYYY/MM","value-format":"YYYY/MM","start-placeholder":"\u5F00\u59CB\u6708\u4EFD","end-placeholder":"\u7ED3\u675F\u6708\u4EFD",style:{width:"250px","margin-right":"10px"},onChange:n.changeTime},null,8,["modelValue","onChange"]),r("div",null,[l.activeName!="\u4E00\u6B21\u6027"?(i(),o(_,{key:0,modelValue:l.dw1,"onUpdate:modelValue":t[4]||(t[4]=s=>l.dw1=s),placeholder:"\u4E2D\u5FC3\u53CA\u5E7F\u7535\u7AD9",clearable:"",onChange:t[5]||(t[5]=s=>n.getTableList(l.activeName))},{default:c(()=>[(i(!0),p(v,null,y(l.stationOptions,s=>(i(),o(w,{key:s,label:s,value:s},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])):l.activeName=="\u4E00\u6B21\u6027"?(i(),o(_,{key:1,modelValue:l.dw1,"onUpdate:modelValue":t[6]||(t[6]=s=>l.dw1=s),placeholder:"\u4E2D\u5FC3\u53CA\u5E7F\u7535\u7AD9",clearable:"",onChange:t[7]||(t[7]=s=>n.getTableList(l.activeName))},{default:c(()=>[(i(!0),p(v,null,y(l.stationOptionsforOnce,s=>(i(),o(w,{key:s,label:s,value:s},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])):m("",!0)]),r("div",null,[l.activeName=="\u9884\u9500\u8D26"||l.activeName=="\u6708\u6D88\u8D39"?(i(),o(_,{key:0,modelValue:l.custType,"onUpdate:modelValue":t[8]||(t[8]=s=>l.custType=s),placeholder:"\u5BA2\u6237\u7C7B\u578B",clearable:"",style:{width:"150px"},onChange:t[9]||(t[9]=s=>n.getTableList(l.activeName))},{default:c(()=>[(i(!0),p(v,null,y(l.custTypeList,s=>(i(),o(w,{key:s,label:s,value:s},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])):l.activeName=="\u4E00\u6B21\u6027"?(i(),o(_,{key:1,modelValue:l.serviceHall,"onUpdate:modelValue":t[10]||(t[10]=s=>l.serviceHall=s),placeholder:"\u8425\u4E1A\u5385",clearable:"",style:{width:"150px"},onChange:t[11]||(t[11]=s=>n.getTableList(l.activeName))},{default:c(()=>[(i(!0),p(v,null,y(l.serviceHallList,s=>(i(),o(w,{key:s,label:s,value:s},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])):l.activeName=="\u94F6\u884C"?(i(),o(_,{key:2,modelValue:l.bank,"onUpdate:modelValue":t[12]||(t[12]=s=>l.bank=s),placeholder:"\u4EE3\u6263\u673A\u6784",clearable:"",style:{width:"150px"},onChange:t[13]||(t[13]=s=>n.getTableList(l.activeName))},{default:c(()=>[(i(!0),p(v,null,y(l.bankList,s=>(i(),o(w,{key:s,label:s,value:s},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])):m("",!0)]),r("div",null,[l.activeName=="\u4E00\u6B21\u6027"?(i(),o(_,{key:0,modelValue:l.bossType,"onUpdate:modelValue":t[14]||(t[14]=s=>l.bossType=s),placeholder:"boss\u79D1\u76EE\u540D\u79F0",clearable:"",style:{width:"150px"},onChange:t[15]||(t[15]=s=>n.getTableList(l.activeName))},{default:c(()=>[(i(!0),p(v,null,y(l.bossTypeList,s=>(i(),o(w,{key:s,label:s,value:s},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])):m("",!0)])]),r("div",ee,[d(D,{type:"primary",onClick:n.onExport,loading:l.downLoading},{default:c(()=>[G("\u5BFC\u51FA\u6570\u636E")]),_:1},8,["onClick","loading"])])]),r("div",te,[U((i(),o(Y,{ref:"table",height:"100%",stripe:"",border:"",data:l.tableData,"header-cell-style":{background:"#eaf2fe",color:"#383838",fontSize:"16px",height:"34px"},"row-style":{height:"24px",fontSize:"14px"},onSortChange:n.sortTable},{empty:c(()=>[le]),default:c(()=>[(i(!0),p(v,null,y(l.tableHeader,(s,H)=>(i(),o(z,{label:s.label,prop:H,align:"center","min-width":s.width?s.width+"":"100",sortable:s.sort?"custom":!1,fit:!0},{default:c(F=>[r("span",null,I(F.row[H]),1)]),_:2},1032,["label","prop","min-width","sortable"]))),256))]),_:1},8,["data","onSortChange"])),[[S,l.loading]])]),r("div",se,[d(B,{"current-page":l.currentPage,"page-size":l.pageSize,"page-sizes":[20,30,50,100,1e3],total:l.total,layout:"total, sizes, prev, pager, next, jumper",onSizeChange:n.handleSizeChange,onCurrentChange:n.handleCurrentChange},null,8,["current-page","page-size","total","onSizeChange","onCurrentChange"])])])])])}var he=P(A,[["render",ae],["__scopeId","data-v-04950086"]]);export{he as default};
