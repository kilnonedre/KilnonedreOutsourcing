import{C as P}from"./CommonHeader.a228caf3.js";import{d as I}from"./api.22883e35.js";import{_ as j,C as y,a as E,r as d,k as M,o as h,c as u,d as c,b as n,w as g,T as U,m as N,i as k,F as v,h as T,f as w,D as J,p as F,q,t as f}from"./index.22501be6.js";import{t as G}from"./table2excel.fee53b5f.js";import{_ as K}from"./icon_screen.7fe101fd.js";const b={dw1:{label:"\u4E2D\u5FC3\u53CA\u5E7F\u7535\u7AD9",width:"220"},dw2:{label:"\u4E8C\u7EA7\u673A\u6784",width:"200"},dateYmd:{label:"\u7EDF\u8BA1\u65E5\u671F",width:"180"},custCode:{label:"\u5BA2\u6237\u8BC1\u53F7",width:"200"},custName:{label:"\u5BA2\u6237\u59D3\u540D",width:"200"},custTag:{label:"\u5BA2\u6237\u6807\u8BC6",width:"120"},custType:{label:"\u5BA2\u6237\u7C7B\u578B",width:"120"},regionId:{label:"\u533A\u57DFID",width:"220"},regionName1:{label:"\u9547/\u8857\u9053",width:"180"},regionName2:{label:"\u6751/\u793E\u533A",width:"180"},regionName3:{label:"\u5C0F\u533A",width:"180"},loudong:{label:"\u697C\u680B",width:"180"},doorDesc:{label:"\u95E8\u724C",width:"180"},mobile1:{label:"\u79FB\u52A8\u7535\u8BDD1",width:"210"},mobile2:{label:"\u79FB\u52A8\u7535\u8BDD2",width:"210"},phone1:{label:"\u7535\u8BDD1",width:"210"},phone2:{label:"\u7535\u8BDD2",width:"210"},zt:{label:"\u72B6\u6001",width:"80"},restBalance:{label:"\u5F53\u524D\u4F59\u989D(\u5143)",width:"140"},payType:{label:"\u652F\u4ED8\u65B9\u5F0F",width:"120"},gridName:{label:"\u6240\u5C5E\u7F51\u683C",width:"200"},gridId:{label:"\u6240\u5C5E\u7F51\u683CID",width:"200"},doneDate:{label:"\u5BA2\u6237\u72B6\u6001\u53D8\u5316\u65F6\u95F4",width:"200"},createDate:{label:"\u5BA2\u6237\u521B\u5EFA\u65E5\u671F",width:"200"},offerNameP:{label:"\u4EA7\u54C1\u540D\u79F0",width:"500"},offerNameT:{label:"\u7EC8\u7AEF\u5957\u9910",width:"400"},states:{label:"\u7EC8\u7AEF\u72B6\u6001",width:"200"},subscriberInsId:{label:"\u7EC8\u7AEFid",width:"200"},password:{label:"\u7EC8\u7AEF\u5BC6\u7801",width:"200"}},Q={components:{CommonHeader:P},data(){return{loading:!0,tableData:[],allHeader:b,tableHeader:[],showHeader:[],downLoading:!1,content:"",station_grid:[],station:"",gridName:"",stationOptions:[],payTypeOptions:[{label:"\u73B0\u91D1\u4EE3\u6263",value:"1"},{label:"\u652F\u4ED8\u5B9D",value:"2"},{label:"\u94F6\u884C\u4EE3\u6263",value:"3"}],date:[],currentPage:1,total:1,pageSize:100,ascs:"",descs:"",showScreen:!1,checkAll:!0,checkedHeaders:[],typeList:["\u6D41\u5931\u5BA2\u6237","\u56DE\u6D41\u5BA2\u6237","\u65B0\u5BA2\u6237"],type:"",userInfo:{}}},methods:{changeTime(e){this.getTableList()},getTableList(){this.loading=!0,this.tableData=[],I.getBroadband({date1:y(this.date)?this.date[0]:"",date2:y(this.date)?this.date[1]:"",dw1:this.station,gridName:this.gridName,custTag:this.type,size:this.pageSize,current:this.currentPage,descs:this.descs,ascs:this.ascs}).then(e=>{this.tableData=e.records,this.total=e.total}).finally(()=>{this.loading=!1,this.$nextTick(()=>{this.$refs.broadband.doLayout()})})},computeCheckedHeaders(e){let t=[];for(let i in e)t.push(i);return this.checkedHeaders=t,t},getDay(e,t){var i=new Date,p=i.getTime(),a=24*3600*1e3*e;i.setTime(parseInt(p+a));var l=i.getFullYear(),_=(i.getMonth()+1).toString();_.length<=1&&(_="0"+_);var m=i.getDate().toString();return m.length<=1&&(m="0"+m),l+t+_+t+m},handleSizeChange(e){this.pageSize=e,this.currentPage=1,this.getTableList()},handleCurrentChange(e){this.currentPage=e,this.getTableList()},sortTable({prop:e,order:t}){t=="ascending"?(this.ascs=e,this.descs=""):t=="descending"?(this.ascs="",this.descs=e):(this.ascs="",this.descs=""),this.getTableList()},onExport(){let e=[];this.downLoading=!0,I.getBroadband({date1:y(this.date)?this.date[0]:"",date2:y(this.date)?this.date[1]:"",dw1:this.station,gridName:this.gridName,custTag:this.type,size:-1,descs:this.descs,ascs:this.ascs}).then(t=>{t.records.forEach(l=>{l.restBalance=l.restBalance?l.restBalance/100:0,l.payType=l.payType?this.payTypeOptions[l.payType-1].label:""}),e=t.records;let i=[],p;for(let l in this.tableHeader)p={title:this.tableHeader[l].label,key:l,type:"text"},i.push(p);G(i,e,"\u5149\u7EA4\u5BBD\u5E26\u5BA2\u6237\u53D8\u5316\u660E\u7EC6")}).finally(()=>{this.downLoading=!1})},handleCheckAllChange(e){this.checkedHeaders=e?this.computeCheckedHeaders(b):[],this.showHeader=e?b:[]},handleCheckedHeaderChange(e){let t=e.length;this.checkAll=t===Object.keys(b).length;let i={};e.forEach(p=>{i[p]=this.allHeader[p]}),this.showHeader=i},clickScreen(){this.showScreen=!0},confirm(){this.tableHeader=this.showHeader,window.localStorage.setItem("broadband",JSON.stringify(this.tableHeader)),this.showScreen=!1,this.$nextTick(()=>{this.$refs.broadband.doLayout()})},cancel(){this.showHeader=this.tableHeader,this.showScreen=!1,this.checkAll=Object.keys(this.tableHeader).length===Object.keys(this.computeCheckedHeaders(this.tableHeader)).length},change(e){this.station=e?e[0]:"",this.gridName=e&&e.length>1?e[1]:"",this.getTableList()},changeType(){this.currentPage=1,this.getTableList()}},created(){this.date=[this.getDay(-1,"/"),this.getDay(-1,"/")];let e=window.localStorage.getItem("broadband");this.showHeader=e?JSON.parse(e):b,this.tableHeader=e?JSON.parse(e):b,this.computeCheckedHeaders(this.tableHeader),this.checkAll=Object.keys(this.showHeader).length===Object.keys(b).length,this.userInfo=JSON.parse(E.get("user"));let t=[],i=this.userInfo.grid?this.userInfo.grid.split(","):[];t.push({value:this.userInfo.station,label:this.userInfo.station,children:[]}),i.forEach(p=>{t[0].children.push({value:p,label:p})}),this.stationOptions=this.userInfo.grade=="\u7BA1\u7406\u5458"?window.config.stationOptions:t,this.station_grid=[this.userInfo.station],i.length&&this.station_grid.push(i[0]),this.station=this.userInfo.station,this.gridName=i[0],this.getTableList()}},S=e=>(F("data-v-1dc7445c"),e=e(),q(),e),R={class:"page broadband"},W={class:"content"},X={class:"toolbox"},Z={class:"left"},$=S(()=>n("span",null,"\u6570\u636E\u65E5\u671F\uFF1A",-1)),ee={class:"date-pick"},te={class:"cascader"},ae={class:"right"},le={class:"table"},se={class:"screen-wrap"},oe=S(()=>n("div",{style:{margin:"15px 0"}},null,-1)),ie={key:0},ne={key:1},re={key:2},de={key:3},he=S(()=>n("div",{style:{"margin-top":"5%"}},"\u6682\u65E0\u6570\u636E",-1)),ce={class:"pagination"};function ge(e,t,i,p,a,l){const _=d("common-header"),m=d("el-date-picker"),D=d("el-cascader"),z=d("el-option"),L=d("el-select"),C=d("el-button"),V=d("el-tooltip"),H=d("el-checkbox"),O=d("el-checkbox-group"),x=d("el-table-column"),B=d("el-table"),Y=d("el-pagination"),A=M("loading");return h(),u("div",R,[c(_,{title:"\u5149\u7EA4\u5BBD\u5E26\u5BA2\u6237\u53D8\u5316\u660E\u7EC6"}),n("div",W,[n("div",X,[n("div",Z,[$,n("div",ee,[c(m,{modelValue:a.date,"onUpdate:modelValue":t[0]||(t[0]=o=>a.date=o),type:"daterange",placeholder:"\u9009\u62E9\u65E5\u671F",format:"YYYY-MM-DD","value-format":"YYYY/MM/DD",onChange:l.changeTime,"start-placeholder":"\u5F00\u59CB\u65F6\u95F4","end-placeholder":"\u7ED3\u675F\u65F6\u95F4"},null,8,["modelValue","onChange"])]),n("div",te,[c(D,{modelValue:a.station_grid,"onUpdate:modelValue":t[1]||(t[1]=o=>a.station_grid=o),style:{width:"300px"},options:a.stationOptions,props:{checkStrictly:a.userInfo.grade!="\u7F51\u683C\u5458"},onChange:l.change,placeholder:"\u4E2D\u5FC3\u53CA\u5E7F\u7535\u7AD9",clearable:a.userInfo.grade=="\u7BA1\u7406\u5458",filterable:""},null,8,["modelValue","options","props","onChange","clearable"])]),n("div",null,[c(L,{modelValue:a.type,"onUpdate:modelValue":t[2]||(t[2]=o=>a.type=o),clearable:"",filterable:"",placeholder:"\u5BA2\u6237\u6807\u8BC6",onChange:l.changeType},{default:g(()=>[(h(!0),u(v,null,T(a.typeList,o=>(h(),k(z,{key:o,label:o,value:o},null,8,["label","value"]))),128))]),_:1},8,["modelValue","onChange"])])]),n("div",ae,[c(C,{type:"primary",onClick:l.onExport,loading:a.downLoading},{default:g(()=>[w("\u5BFC\u51FA\u6570\u636E")]),_:1},8,["onClick","loading"])])]),n("div",le,[c(V,{effect:"dark",content:"\u7B5B\u9009\u8868\u683C\u5217",placement:"top"},{default:g(()=>[n("img",{onClick:t[3]||(t[3]=(...o)=>l.clickScreen&&l.clickScreen(...o)),class:"icon-screen",src:K,alt:""})]),_:1}),c(U,{name:"el-zoom-in-top"},{default:g(()=>[N(n("div",se,[c(H,{modelValue:a.checkAll,"onUpdate:modelValue":t[4]||(t[4]=o=>a.checkAll=o),onChange:l.handleCheckAllChange},{default:g(()=>[w("\u5168\u9009")]),_:1},8,["modelValue","onChange"]),oe,c(O,{modelValue:a.checkedHeaders,"onUpdate:modelValue":t[5]||(t[5]=o=>a.checkedHeaders=o),onChange:l.handleCheckedHeaderChange},{default:g(()=>[(h(!0),u(v,null,T(a.allHeader,(o,s)=>(h(),k(H,{label:s,key:s},{default:g(()=>[w(f(o.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue","onChange"]),c(C,{onClick:l.cancel,style:{"margin-top":"20px","margin-right":"20px"},size:"small"},{default:g(()=>[w("\u53D6\u6D88")]),_:1},8,["onClick"]),c(C,{onClick:l.confirm,style:{"margin-top":"20px","margin-right":"20px"},type:"primary",size:"small"},{default:g(()=>[w("\u786E\u5B9A")]),_:1},8,["onClick"])],512),[[J,a.showScreen]])]),_:1}),N((h(),k(B,{ref:"broadband",id:"table",height:"100%",stripe:"",border:"",data:a.tableData,"header-cell-style":{background:"#eaf2fe",color:"#383838",fontSize:"16px",height:"34px"},"cell-class-name":"cell-class","row-style":{height:"24px",fontSize:"14px"},onSortChange:l.sortTable},{empty:g(()=>[he]),default:g(()=>[(h(!0),u(v,null,T(a.showHeader,(o,s)=>(h(),k(x,{"min-width":o.width||100,fixed:s==="dw1"||s==="custName",fit:"",align:"center",prop:s,label:o.label,sortable:"custom"},{default:g(r=>[s==="payType"?(h(),u("span",ie,f(r.row[s]!==null&&r.row[s]!==void 0&&r.row[s]!==""&&!!a.payTypeOptions[r.row[s]-1].label?a.payTypeOptions[r.row[s]-1].label:"-"),1)):s==="dateYmd"?(h(),u("span",ne,f(r.row[s]?r.row[s].split(" ")[0]:"-"),1)):s==="restBalance"?(h(),u("span",re,f(r.row[s]==null||r.row[s]==null?"-":r.row[s]/100),1)):(h(),u("span",de,f(r.row[s]?r.row[s]:"-"),1))]),_:2},1032,["min-width","fixed","prop","label"]))),256))]),_:1},8,["data","onSortChange"])),[[A,a.loading]])]),n("div",ce,[c(Y,{onSizeChange:l.handleSizeChange,onCurrentChange:l.handleCurrentChange,"current-page":a.currentPage,"page-sizes":[100,200,300,400],"page-size":a.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:a.total},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])])])])}var we=j(Q,[["render",ge],["__scopeId","data-v-1dc7445c"]]);export{we as default};