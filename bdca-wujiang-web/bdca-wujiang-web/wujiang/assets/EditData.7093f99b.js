import{k as d}from"./api.22883e35.js";import{_ as u,r as n,o as m,i as f,w as o,b as _,d as a,f as c}from"./index.22501be6.js";const y={data(){return{show:!1,content:"",id:"",kpi:"",dailyApiId:"",date:""}},emits:["update"],methods:{editData(){this.$confirm(`\u786E\u5B9A${this.id?"\u4FEE\u6539":"\u65B0\u589E"}?`,"\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>{this.kpi==="daily"?this.id?this.editDaily({id:this.id,content:this.content}):this.editDaily({date:this.date,dailyApiId:this.dailyApiId,content:this.content}):this.kpi==="annual"&&(this.id?this.editAnnual({id:this.id,content:this.content}):this.editAnnual({name:"\u4E2D\u5FC3\u53CA\u5E7F\u7535\u7AD9\u5E74\u5EA6\u76EE\u6807",type:"\u5E74",date:this.date,content:this.content}))}).finally(()=>{})},editAnnual(i){d.editAnnual(i).then(t=>{this.$message.success(this.id?"\u4FEE\u6539\u6210\u529F\uFF01":"\u65B0\u589E\u6210\u529F\uFF01"),this.show=!1,this.$emit("update")})},editDaily(i){d.editDaily(i).then(t=>{this.$message.success(this.id?"\u4FEE\u6539\u6210\u529F\uFF01":"\u65B0\u589E\u6210\u529F\uFF01"),this.show=!1,this.$emit("update")})},addDaily(){}}},k={class:"dialog-footer"};function w(i,t,V,x,e,r){const h=n("el-input"),l=n("el-button"),p=n("el-dialog");return m(),f(p,{"close-on-click-modal":!1,"close-on-press-escape":!1,"destroy-on-close":!0,modelValue:e.show,"onUpdate:modelValue":t[2]||(t[2]=s=>e.show=s),title:"\u7F16\u8F91\u6570\u636E",width:"40%"},{footer:o(()=>[_("span",k,[a(l,{onClick:t[1]||(t[1]=s=>e.show=!1)},{default:o(()=>[c("\u53D6\u6D88")]),_:1}),a(l,{type:"primary",onClick:r.editData},{default:o(()=>[c("\u786E\u5B9A")]),_:1},8,["onClick"])])]),default:o(()=>[a(h,{rows:20,type:"textarea",modelValue:e.content,"onUpdate:modelValue":t[0]||(t[0]=s=>e.content=s),placeholder:"\u8BF7\u8F93\u5165\u6570\u636E"},null,8,["modelValue"])]),_:1},8,["modelValue"])}var g=u(y,[["render",w]]);export{g as E};
