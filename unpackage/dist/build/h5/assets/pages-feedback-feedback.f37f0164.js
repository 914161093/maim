import{g as s,r as e,a,O as t,o as l,c,w as n,i as u,f as o,j as d,v as i,Q as m,u as p,q as r,t as f}from"./index-2552b00d.js";import{_}from"./_plugin-vue_export-helper.1b428a4d.js";const h=""+new URL("feedback_success-527009c3.png",import.meta.url).href;const x=_({data:()=>({inputText:"",num:0,success:!1}),methods:{writeComments(){this.num=this.inputText.length,this.num},handleClick(){let t=s("token");e({url:"https://api.maimangbox.cn/problem",data:{desc:this.inputText},header:{"content-type":"application/json","api-token":t},method:"POST",success:s=>{1e4==s.data.resultCode&&(a({title:s.data.resultMsg,icon:"none"}),this.success=!0)}})},back(){t({url:"/pages/my/my"})}}},[["render",function(s,e,a,t,_,x){const b=u,k=m,g=p,C=r,T=f;return l(),c(b,{class:"container"},{default:n((()=>[_.success?(l(),c(b,{key:1,class:"success_box"},{default:n((()=>[o(C,{src:h,class:"success_icon"}),o(b,{class:"success_text"},{default:n((()=>[d("我们会认真评估您的建议，如您有问题，可联系官方客服处理，客服电话："),o(T,{class:"phone"},{default:n((()=>[d("400 0000 8888")])),_:1})])),_:1}),o(g,{class:"btn",onClick:e[2]||(e[2]=s=>x.back())},{default:n((()=>[d("返回")])),_:1})])),_:1})):(l(),c(b,{key:0,class:"submitBefor"},{default:n((()=>[o(b,{class:"info"},{default:n((()=>[o(b,{class:"name"},{default:n((()=>[d("意见反馈")])),_:1}),o(b,{class:"desc"},{default:n((()=>[d("获得您的意见反馈并改进")])),_:1})])),_:1}),o(b,{class:"box"},{default:n((()=>[o(b,{class:"title"},{default:n((()=>[d("问题与建议")])),_:1}),o(k,{class:"text",maxlength:"200",onInput:x.writeComments,modelValue:_.inputText,"onUpdate:modelValue":e[0]||(e[0]=s=>_.inputText=s)},null,8,["onInput","modelValue"]),o(b,{class:"num"},{default:n((()=>[d(i(_.num)+"/200",1)])),_:1})])),_:1}),o(g,{class:"btn",onClick:e[1]||(e[1]=s=>x.handleClick())},{default:n((()=>[d("提交")])),_:1})])),_:1}))])),_:1})}],["__scopeId","data-v-baefa7c0"]]);export{x as default};
