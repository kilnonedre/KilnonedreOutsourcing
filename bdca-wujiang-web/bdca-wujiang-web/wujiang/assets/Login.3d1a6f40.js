import{u}from"./api.22883e35.js";import{_ as p,a as f,r as n,o as g,c as h,b as o,d as s,w as l,e as v,f as w}from"./index.22501be6.js";var b="./assets/icon_username@3x.642f5ce3.svg",x="./assets/icon_pwd@3x.0ddad272.svg";const y={name:"Login",data(){return{form:{username:"",password:""}}},methods:{submitForm(){u.login(this.form).then(e=>{f.set("user",JSON.stringify({username:e.username,usernick:e.usernick,id:e.id,grade:e.grade,station:e.station,grid:e.grid,role:e.roles.length?e.roles[0].roleName:""})),this.$router.push("/")})}}},V={class:"login-wrap"},k=o("div",{class:"left"},null,-1),N={class:"right"},C=o("h1",null,"\u8FD0\u884C\u7EF4\u62A4\u6570\u636E\u7EDF\u8BA1\u5206\u6790\u7CFB\u7EDF",-1),B=o("div",{class:"icon"},[o("img",{src:b})],-1),F=o("div",{class:"icon"},[o("img",{src:x})],-1),K={class:"bottom"},L=o("div",{class:"tips"},"\u5982\u5FD8\u8BB0\u767B\u5F55\u5BC6\u7801\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458",-1);function U(e,r,z,E,t,i){const m=n("el-input"),d=n("el-form-item"),_=n("el-form"),c=n("el-button");return g(),h("div",V,[k,o("div",N,[C,s(_,{model:t.form,"status-icon":"",ref:"form","label-width":"0",class:"demo-form"},{default:l(()=>[s(d,{prop:"id"},{default:l(()=>[B,s(m,{"prefix-icon":"",modelValue:t.form.username,"onUpdate:modelValue":r[0]||(r[0]=a=>t.form.username=a),placeholder:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7",autofocus:""},null,8,["modelValue"])]),_:1}),s(d,{prop:"pass"},{default:l(()=>[F,s(m,{type:"password",modelValue:t.form.password,"onUpdate:modelValue":r[1]||(r[1]=a=>t.form.password=a),autocomplete:"off",placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801",onKeyup:v(i.submitForm,["enter"])},null,8,["modelValue","onKeyup"])]),_:1})]),_:1},8,["model"]),o("div",K,[L,s(c,{size:"large",type:"primary",class:"login-btn",onClick:i.submitForm},{default:l(()=>[w("\u767B\u5F55")]),_:1},8,["onClick"])])])])}var S=p(y,[["render",U]]);export{S as default};
