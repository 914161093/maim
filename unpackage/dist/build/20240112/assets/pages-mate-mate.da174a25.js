import{g as s,r as l,n as a,H as t,a as e,o as c,c as i,w as o,i as r,b as u,d,t as n,e as p,f as _,F as m,m as f,j as y,l as g,k}from"./index-9d063f4c.js";import{_ as L}from"./luck_bg.0bdaa49e.js";import{_ as h}from"./kangkk.1279d65a.js";import{_ as b}from"./close.aaf06974.js";import{_ as x}from"./_plugin-vue_export-helper.1b428a4d.js";const j=""+new URL("pip_fail-8c4f7651.png",import.meta.url).href,A=""+new URL("tip_ico-f6f70c7f.png",import.meta.url).href,w=""+new URL("zstj_ico-f1d750ee.png",import.meta.url).href;const C=x({data:()=>({myApplyList:[],productList:[],mate:!1,clickNum:0,tjLayer:!1}),onShow(){let t=s("token");l({url:"https://api.maimangbox.cn/mate",header:{"api-token":t},method:"POST",success:s=>{1e4==s.data.resultCode?(console.log(s.data.resultMsg),this.myApplyList=s.data.resultMsg.myApplyList,this.productList=s.data.resultMsg.productList,s.data.resultMsg.myApplyList.length>=1&&(this.mate=!0)):a({url:"/pages/login/login?next=mate"})}})},methods:{goToHome(s){0==this.clickNum?this.tjLayer=!0:t({url:s})},goToKnowledgeDetail(s){a({url:"/pages/knowledgedetail/knowledgedetail?id="+s})},listApplyBtn(t,c){l({url:"https://api.maimangbox.cn/click",data:{productId:c},header:{"api-token":s("token")},method:"POST",success:s=>{console.log(t),e("clickUrl",t),1e4==s.data.resultCode?(this.clickNum=1,a({url:"/pages/webview/webview?url="+s.data.applyUrl})):a({url:"/pages/login"+s.data.applyUrl})}})},closeLayer(){this.tjLayer=!1}}},[["render",function(s,l,a,t,e,x){const C=y,U=g,T=r,v=k;return c(),i(T,{class:"container"},{default:o((()=>[u(T,{class:"pages"},{default:o((()=>[e.mate?(c(),i(T,{key:0,class:"mate_success"},{default:o((()=>[u(T,{class:"scroll_box"},{default:o((()=>[u(C,{src:L,class:"scroll_bg"}),u(T,{class:"scroll_text"},{default:o((()=>[u(U,null,{default:o((()=>[d("已匹配以下服务机构稍后将与您联系，")])),_:1}),u(U,{class:"tips"},{default:o((()=>[d("请注意接听电话")])),_:1})])),_:1})])),_:1}),u(T,{class:"info"},{default:o((()=>[u(T,{class:"top",onClick:l[0]||(l[0]=s=>x.listApplyBtn(e.myApplyList[0].name.url,e.myApplyList[0].name.id))},{default:o((()=>[u(T,{class:"info_l"},{default:o((()=>[u(T,{class:"name"},{default:o((()=>[d(n(e.myApplyList[0].name),1)])),_:1}),u(T,{class:"xiey"},{default:o((()=>[d("《信息推送授权协议》")])),_:1})])),_:1}),u(T,{class:"jg_box"},{default:o((()=>[u(C,{src:e.myApplyList[0].business_license,class:"jg_logo"},null,8,["src"])])),_:1})])),_:1})])),_:1})])),_:1})):(c(),i(T,{key:1,class:"mate_error"},{default:o((()=>[u(C,{src:j,class:"icon"}),u(T,{class:"tips"},{default:o((()=>[d("匹配失败，您所在地区暂无相关服务")])),_:1}),u(v,{class:"gotohome",onClick:l[1]||(l[1]=s=>x.goToHome("/pages/index/index"))},{default:o((()=>[d("去首页")])),_:1})])),_:1})),u(T,{class:"list"},{default:o((()=>[u(T,{class:"title"},{default:o((()=>[d("优选机构")])),_:1}),(c(!0),p(m,null,_(e.productList,((s,l)=>(c(),i(T,{class:"item"},{default:o((()=>[u(C,{src:h,class:"tag_bg"}),u(T,{class:"jig_name"},{default:o((()=>[u(C,{src:s.icon,class:"img"},null,8,["src"]),d(" "+n(s.title),1)])),_:2},1024),u(T,{class:"jig_info"},{default:o((()=>[u(T,{class:"money_box"},{default:o((()=>[u(T,{class:"money"},{default:o((()=>[u(U,{class:"currency"},{default:o((()=>[d("￥")])),_:1}),d(n(s.max_price)+"0,000",1)])),_:2},1024),u(T,{class:"bottom_title"},{default:o((()=>[d("最高可借(元)")])),_:1})])),_:2},1024),u(T,{class:"rate_box"},{default:o((()=>[u(T,{class:"rate"},{default:o((()=>[d(n(365*s.day_rate)+"%",1)])),_:2},1024),u(T,{class:"bottom_title"},{default:o((()=>[d("年利率")])),_:1})])),_:2},1024),u(v,{class:"jig_applyNow",onClick:l=>x.listApplyBtn(s.url,s.id)},{default:o((()=>[d("立即申请")])),_:2},1032,["onClick"])])),_:2},1024)])),_:2},1024)))),256))])),_:1}),e.tjLayer?(c(),i(T,{key:2,class:"alert_box"},{default:o((()=>[u(T,{class:"small_win"},{default:o((()=>[u(T,{class:"alert_box_title"},{default:o((()=>[u(C,{src:b,class:"close",onClick:x.closeLayer},null,8,["onClick"])])),_:1}),u(T,{class:"tip"},{default:o((()=>[u(C,{src:A,class:"icon"}),d("没有合适的产品，试试这款123")])),_:1}),u(T,{class:"alert_box_content"},{default:o((()=>[u(C,{src:e.myApplyList[0].business_license,class:"img"},null,8,["src"]),u(T,{class:"info"},{default:o((()=>[u(T,{class:"title"},{default:o((()=>[d(n(e.myApplyList[0].name),1)])),_:1}),u(C,{src:w,class:"icon"})])),_:1})])),_:1}),u(v,{class:"tosee",onClick:l[2]||(l[2]=s=>x.listApplyBtn(e.myApplyList[0].url,e.myApplyList[0].id))},{default:o((()=>[d("去看看")])),_:1})])),_:1})])),_:1})):f("",!0)])),_:1})])),_:1})}],["__scopeId","data-v-83b7df8d"]]);export{C as default};
