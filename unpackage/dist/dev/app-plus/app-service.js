if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$m = {
    data() {
      return {
        productList: [],
        articleList: [],
        showHome: false,
        noData: false
      };
    },
    onShow() {
      let _this = this;
      let token = uni.getStorageSync("token");
      async function getToken() {
        let num = "";
        if (uni.getSystemInfoSync().platform == "ios") {
          formatAppLog("log", "at pages/index/index.vue:163", "我是ios");
          num = 2;
        } else if (uni.getSystemInfoSync().platform == "android") {
          formatAppLog("log", "at pages/index/index.vue:166", "我是安卓");
          num = 1;
        }
        formatAppLog("log", "at pages/index/index.vue:169", 1234);
        formatAppLog("log", "at pages/index/index.vue:170", num);
        try {
          var res = await uni.request({
            url: "https://api.maimangbox.cn/getToken",
            header: {
              "content-type": "application/json"
            },
            data: {
              platform: num
            },
            method: "POST"
          });
          if (res.data.resultCode == 1e4) {
            uni.setStorageSync("token", res.data.data);
            var res1 = await uni.request({
              url: "https://api.maimangbox.cn/home",
              data: {},
              header: {
                "content-type": "application/json",
                "api-token": uni.getStorageSync("token")
              },
              method: "POST"
            });
            if (res1.data.resultCode == 1e4) {
              _this.noData = false;
              _this.showHome = true;
              _this.productList = res1.data.data.productList;
              _this.articleList = res1.data.data.article;
            } else {
              uni.showToast({ title: res1.data.resultMsg, icon: "none" });
              _this.showHome = false;
            }
          } else {
            if (uni.getSystemInfoSync().platform == "ios") {
              uni.getNetworkType({
                success: function(res2) {
                  if (res2.networkType != "none") {
                    _this.noData = true;
                  }
                }
              });
              uni.onNetworkStatusChange(function(res2) {
                if (res2.isConnected != false) {
                  _this.noData = true;
                }
              });
            }
            uni.setStorageSync("token", "");
            uni.hideTabBar();
            uni.showToast({ title: res.data.resultMsg, icon: "none" });
          }
        } catch (err) {
          formatAppLog("error", "at pages/index/index.vue:231", err);
        }
      }
      async function getHome() {
        formatAppLog("log", "at pages/index/index.vue:235", "111222");
        var res = await uni.request({
          url: "https://api.maimangbox.cn/home",
          data: {},
          header: {
            "content-type": "application/json",
            "api-token": token
          },
          method: "POST"
        });
        if (res.data.resultCode == 1e4) {
          _this.showHome = true;
          _this.noData = false;
          _this.productList = res.data.data.productList;
          _this.articleList = res.data.data.article;
        } else {
          uni.showToast({ title: res.data.resultMsg, icon: "none" });
          _this.showHome = false;
        }
      }
      if (token == "") {
        getToken();
        if (uni.getSystemInfoSync().platform == "ios") {
          uni.getNetworkType({
            success: function(res) {
              if (res.networkType == "none") {
                uni.showToast({ title: "请检查您的网络", icon: "none" });
                _this.noData = true;
              }
            }
          });
          uni.onNetworkStatusChange(function(res) {
            if (res.isConnected == false) {
              _this.noData = true;
            }
          });
        }
      } else {
        getHome();
      }
    },
    methods: {
      getData() {
        this.getToken();
      },
      //发送请求获取 token
      async getToken() {
        let _this = this;
        let num = "";
        if (uni.getSystemInfoSync().platform == "ios") {
          formatAppLog("log", "at pages/index/index.vue:318", "我是ios");
          num = 2;
        } else if (uni.getSystemInfoSync().platform == "android") {
          formatAppLog("log", "at pages/index/index.vue:321", "我是安卓");
          num = 1;
        }
        formatAppLog("log", "at pages/index/index.vue:324", 1234);
        formatAppLog("log", "at pages/index/index.vue:325", num);
        try {
          var res = await uni.request({
            url: "https://api.maimangbox.cn/getToken",
            header: {
              "content-type": "application/json"
            },
            data: {
              platform: num
            },
            method: "POST"
          });
          if (res.data.resultCode == 1e4) {
            formatAppLog("log", "at pages/index/index.vue:345", res.data.data);
            uni.setStorageSync("token", res.data.data);
            var res1 = await uni.request({
              url: "https://api.maimangbox.cn/home",
              data: {},
              header: {
                "content-type": "application/json",
                "api-token": uni.getStorageSync("token")
              },
              method: "POST"
            });
            if (res1.data.resultCode == 1e4) {
              formatAppLog("log", "at pages/index/index.vue:357", "获取成功");
              _this.showHome = true;
              _this.productList = res1.data.data.productList;
              _this.articleList = res1.data.data.article;
            } else {
              uni.showToast({ title: res1.data.resultMsg, icon: "none" });
              _this.showHome = false;
            }
          } else {
            uni.setStorageSync("token", "");
            uni.hideTabBar();
            uni.showToast({ title: res.data.resultMsg, icon: "none" });
          }
        } catch (err) {
          formatAppLog("error", "at pages/index/index.vue:371", err);
        }
      },
      goToLoanPage(url) {
        uni.navigateTo({
          url
        });
      },
      goToKnowledgeDetail(key) {
        uni.navigateTo({
          url: "/pages/knowledgedetail/knowledgedetail?key=" + key
        });
      },
      listApplyBtn(url, id) {
        uni.request({
          url: "https://api.maimangbox.cn/click",
          data: {
            productId: id
          },
          header: {
            "api-token": uni.getStorageSync("token")
          },
          method: "POST",
          success: (res) => {
            formatAppLog("log", "at pages/index/index.vue:395", res.data.applyUrl);
            uni.setStorageSync("clickUrl", url);
            if (res.data.resultCode == 1e4) {
              uni.navigateTo({
                url: "/pages/webview/webview?url=" + res.data.applyUrl
              });
            } else {
              uni.showToast({ title: res.data.resultMsg, icon: "none" });
              uni.navigateTo({
                url: "/pages/login/login"
              });
            }
          }
        });
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      $data.showHome ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "container"
      }, [
        vue.createElementVNode("view", { class: "top-info" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("image", {
              src: "/static/xin_logo.png",
              class: "xin_logo"
            }),
            vue.createTextVNode("麦麦 | 一站式咨询服务")
          ]),
          vue.createElementVNode("view", { class: "subtitle" }, "个人大额信贷"),
          vue.createElementVNode("view", { class: "edu" }, "最高可获得额度(元)"),
          vue.createElementVNode("view", { class: "money" }, "200,000"),
          vue.createElementVNode("view", { class: "" }, "年化利润率：6~18%"),
          vue.createElementVNode("button", {
            class: "applyNow",
            onClick: _cache[0] || (_cache[0] = ($event) => $options.goToLoanPage("/pages/largeloan/largeloan"))
          }, "立即申请"),
          vue.createElementVNode("view", { class: "kouh" }, "额度高 | 利息低 | 放款快")
        ]),
        vue.createElementVNode("view", { class: "scroll_box" }, [
          vue.createElementVNode("image", {
            src: "/static/luck_bg.png",
            class: "scroll_bg"
          }),
          vue.createElementVNode("view", { class: "scroll_text" }, [
            vue.createElementVNode("image", {
              src: "/static/notification.png",
              class: "notification"
            }),
            vue.createElementVNode("text", null, "恭喜维护8930的用户获得个人信用贷款解决方案")
          ])
        ]),
        vue.createElementVNode("view", { class: "tab_box" }, [
          vue.createElementVNode("view", {
            class: "tab_list",
            onClick: _cache[1] || (_cache[1] = ($event) => $options.goToLoanPage("/pages/corporateloan/corporateloan"))
          }, [
            vue.createElementVNode("image", {
              src: "/static/enterprise.png",
              class: "tab_pic"
            }),
            vue.createElementVNode("text", { class: "tab_name" }, "企业融资")
          ]),
          vue.createElementVNode("view", {
            class: "tab_list",
            onClick: _cache[2] || (_cache[2] = ($event) => $options.goToLoanPage("/pages/housingloan/housingloan"))
          }, [
            vue.createElementVNode("image", {
              src: "/static/house.png",
              class: "tab_pic"
            }),
            vue.createElementVNode("text", { class: "tab_name" }, "房产抵押")
          ]),
          vue.createElementVNode("view", {
            class: "tab_list",
            onClick: _cache[3] || (_cache[3] = ($event) => $options.goToLoanPage("/pages/autoloan/autoloan"))
          }, [
            vue.createElementVNode("image", {
              src: "/static/car.png",
              class: "tab_pic"
            }),
            vue.createElementVNode("text", { class: "tab_name" }, "车辆抵押")
          ]),
          vue.createElementVNode("view", {
            class: "tab_list",
            onClick: _cache[4] || (_cache[4] = ($event) => $options.goToLoanPage("/pages/overdue/overdue"))
          }, [
            vue.createElementVNode("image", {
              src: "/static/overdue.png",
              class: "tab_pic"
            }),
            vue.createElementVNode("text", { class: "tab_name" }, "逾期上岸")
          ])
        ]),
        vue.createElementVNode("view", { class: "jig_box" }, [
          vue.createElementVNode("view", { class: "com_title" }, [
            vue.createElementVNode("text", { class: "title_text" }, "优选产品"),
            vue.createElementVNode("text", {
              class: "title_more",
              onClick: _cache[5] || (_cache[5] = ($event) => $options.goToLoanPage("/pages/institutionlist/institutionlist"))
            }, "查看更多 >>")
          ]),
          vue.createElementVNode("view", { class: "jig_list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.productList, (item) => {
                return vue.openBlock(), vue.createElementBlock("view", { class: "jig_item" }, [
                  vue.createElementVNode("view", { class: "jig_info" }, [
                    vue.createElementVNode("view", { class: "jig_left" }, [
                      vue.createElementVNode(
                        "view",
                        { class: "jig_title" },
                        vue.toDisplayString(item.title),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "jig_highest" }, "最高可借(元)"),
                      vue.createElementVNode("view", { class: "jig_price" }, [
                        vue.createElementVNode("text", { class: "currency" }, "￥"),
                        vue.createElementVNode(
                          "text",
                          { class: "price" },
                          vue.toDisplayString(item.max_price) + "0000",
                          1
                          /* TEXT */
                        )
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "jig_logo" }, [
                      vue.createElementVNode("image", {
                        src: item.icon,
                        class: "jig_logo_img"
                      }, null, 8, ["src"])
                    ])
                  ]),
                  vue.createElementVNode("button", {
                    class: "jig_apply",
                    onClick: ($event) => $options.listApplyBtn(item.url, item.id)
                  }, "立即申请", 8, ["onClick"])
                ]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ])
        ]),
        vue.createElementVNode("view", { class: "knows" }, [
          vue.createElementVNode("view", { class: "com_title" }, [
            vue.createElementVNode("text", { class: "title_text" }, "金融知识")
          ]),
          vue.createElementVNode("view", { class: "knows_list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.articleList, (item) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "item",
                  onClick: ($event) => $options.goToKnowledgeDetail(item.key)
                }, [
                  vue.createElementVNode("view", { class: "item_info" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "item_title" },
                      vue.toDisplayString(item.source_title),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      { class: "item_time" },
                      vue.toDisplayString(item.source_date),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("image", {
                    src: item.source_logo,
                    class: "item_img"
                  }, null, 8, ["src"])
                ], 8, ["onClick"]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ])
        ]),
        vue.createElementVNode("view", { class: "advantage" }, [
          vue.createElementVNode("view", { class: "title" }, "我们的优势"),
          vue.createElementVNode("view", { class: "list" }, [
            vue.createElementVNode("view", { class: "item" }, [
              vue.createElementVNode("image", {
                src: "/static/yous_01.png",
                class: "img"
              }),
              vue.createElementVNode("view", { class: "text" }, [
                vue.createTextVNode("专业服务体系"),
                vue.createElementVNode("br"),
                vue.createTextVNode("多年从业经验")
              ])
            ]),
            vue.createElementVNode("view", { class: "item" }, [
              vue.createElementVNode("image", {
                src: "/static/yous_02.png",
                class: "img"
              }),
              vue.createElementVNode("view", { class: "text" }, [
                vue.createTextVNode("省心高效"),
                vue.createElementVNode("br"),
                vue.createTextVNode("专业资深团队")
              ])
            ]),
            vue.createElementVNode("view", { class: "item" }, [
              vue.createElementVNode("image", {
                src: "/static/yous_03.png",
                class: "img"
              }),
              vue.createElementVNode("view", { class: "text" }, [
                vue.createTextVNode("专业细致"),
                vue.createElementVNode("br"),
                vue.createTextVNode("一对一服务")
              ])
            ]),
            vue.createElementVNode("view", { class: "item" }, [
              vue.createElementVNode("image", {
                src: "/static/yous_04.png",
                class: "img"
              }),
              vue.createElementVNode("view", { class: "text" }, [
                vue.createTextVNode("保障安全"),
                vue.createElementVNode("br"),
                vue.createTextVNode("保密个人信息安全")
              ])
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "advantage" }, [
          vue.createElementVNode("view", { class: "title" }, "服务流程"),
          vue.createElementVNode("view", { class: "process_list" }, [
            vue.createElementVNode("view", { class: "item" }, [
              vue.createElementVNode("image", {
                src: "/static/flow_01.png",
                class: "img"
              }),
              vue.createElementVNode("view", { class: "text" }, [
                vue.createTextVNode("了解客户"),
                vue.createElementVNode("br"),
                vue.createTextVNode("需求情况")
              ])
            ]),
            vue.createElementVNode("image", {
              src: "/static/arrow_r_h.png",
              class: "arrow"
            }),
            vue.createElementVNode("view", { class: "item" }, [
              vue.createElementVNode("image", {
                src: "/static/flow_02.png",
                class: "img"
              }),
              vue.createElementVNode("view", { class: "text" }, [
                vue.createTextVNode("签收正规"),
                vue.createElementVNode("br"),
                vue.createTextVNode("授权合同")
              ])
            ]),
            vue.createElementVNode("image", {
              src: "/static/arrow_r_h.png",
              class: "arrow"
            }),
            vue.createElementVNode("view", { class: "item" }, [
              vue.createElementVNode("image", {
                src: "/static/flow_03.png",
                class: "img"
              }),
              vue.createElementVNode("view", { class: "text" }, [
                vue.createTextVNode("专业服务"),
                vue.createElementVNode("br"),
                vue.createTextVNode("制定方案")
              ])
            ]),
            vue.createElementVNode("image", {
              src: "/static/arrow_r_h.png",
              class: "arrow"
            }),
            vue.createElementVNode("view", { class: "item" }, [
              vue.createElementVNode("image", {
                src: "/static/flow_04.png",
                class: "img"
              }),
              vue.createElementVNode("view", { class: "text" }, [
                vue.createTextVNode("协助指导"),
                vue.createElementVNode("br"),
                vue.createTextVNode("放款流程")
              ])
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "foot" }, [
          vue.createElementVNode("view", { class: "title" }, "借钱优选"),
          vue.createElementVNode("view", { class: "text" }, "平台为综合金融咨询服务平台，不为学生/未满18周岁用户提供服务")
        ])
      ])) : vue.createCommentVNode("v-if", true),
      $data.noData ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "noData"
      }, [
        vue.createElementVNode("image", {
          src: "/static/pip_fail.png",
          class: "icon"
        }),
        vue.createElementVNode("view", { class: "tips" }, "获取信息失败"),
        vue.createElementVNode("button", {
          class: "gotohome",
          onClick: _cache[6] || (_cache[6] = ($event) => $options.getData())
        }, "获取信息")
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__file", "D:/lj/haoxingj/haoxingj/pages/index/index.vue"]]);
  const _sfc_main$l = {
    data() {
      return {};
    },
    methods: {
      goTofeedback() {
        uni.navigateTo({
          url: "/pages/feedback/feedback"
        });
      },
      goToKnowledgeDetail(key) {
        uni.navigateTo({
          url: "/pages/knowledgedetail/knowledgedetail?key=" + key
        });
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode("view", { class: "name" }, "关于我们"),
        vue.createElementVNode("view", { class: "desc" }, "麦麦v1.1.1")
      ]),
      vue.createElementVNode("view", { class: "list" }, [
        vue.createElementVNode("view", {
          class: "item",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.goToKnowledgeDetail("7"))
        }, [
          vue.createElementVNode("view", { class: "item_l" }, "公司介绍"),
          vue.createElementVNode("image", {
            src: "/static/dingw_arrow.png",
            class: "arrow"
          })
        ]),
        vue.createElementVNode("view", {
          class: "item",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.goTofeedback())
        }, [
          vue.createElementVNode("view", { class: "item_l" }, "投诉"),
          vue.createElementVNode("image", {
            src: "/static/dingw_arrow.png",
            class: "arrow"
          })
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("view", { class: "item_l" }, "版本更新"),
          vue.createElementVNode("image", {
            src: "/static/dingw_arrow.png",
            class: "arrow"
          })
        ])
      ])
    ]);
  }
  const PagesAboutAbout = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__file", "D:/lj/haoxingj/haoxingj/pages/about/about.vue"]]);
  const _sfc_main$k = {
    data() {
      return {
        phone: "",
        //手机号码
        pwd: "",
        //密码
        second: 60,
        //默认60秒
        interval: null,
        showText: true,
        //判断短信是否发送
        code: "",
        isCode: false
      };
    },
    onShow() {
      async function getToken() {
        let num = "";
        if (uni.getSystemInfoSync().platform == "ios") {
          formatAppLog("log", "at pages/login/login.vue:58", "我是ios");
          num = 2;
        } else if (uni.getSystemInfoSync().platform == "android") {
          formatAppLog("log", "at pages/login/login.vue:61", "我是安卓");
          num = 1;
        }
        formatAppLog("log", "at pages/login/login.vue:64", 1234);
        formatAppLog("log", "at pages/login/login.vue:65", num);
        try {
          var res = await uni.request({
            url: "https://api.maimangbox.cn/getToken",
            header: {
              "content-type": "application/json"
            },
            data: {
              platform: num
            },
            method: "POST"
          });
          if (res.data.resultCode == 1e4) {
            formatAppLog("log", "at pages/login/login.vue:85", "10000");
            uni.setStorageSync("token", res.data.data);
            uni.request({
              url: "https://api.maimangbox.cn/login/page",
              data: {},
              header: {
                "content-type": "application/json",
                "api-token": res.data.data
              },
              method: "POST",
              success: (res2) => {
                formatAppLog("log", "at pages/login/login.vue:96", res2);
                let isCodeNum = res2.data.data.isCode;
                if (isCodeNum == 2) {
                  this.isCode = true;
                }
              }
            });
          } else {
            formatAppLog("log", "at pages/login/login.vue:103", res);
            uni.setStorageSync("token", "");
            uni.hideTabBar();
            uni.showToast({ title: res.data.resultMsg, icon: "none" });
          }
        } catch (err) {
          formatAppLog("error", "at pages/login/login.vue:109", err);
        }
      }
      if (uni.getStorageSync("token") == "") {
        getToken();
      } else {
        uni.request({
          url: "https://api.maimangbox.cn/login/page",
          data: {},
          header: {
            "content-type": "application/json",
            "api-token": uni.getStorageSync("token")
          },
          method: "POST",
          success: (res) => {
            formatAppLog("log", "at pages/login/login.vue:125", res);
            let isCodeNum = res.data.data.isCode;
            if (isCodeNum == 2) {
              this.isCode = true;
            }
          }
        });
      }
    },
    methods: {
      startCountdown() {
        let that = this;
        that.interval = setInterval(() => {
          this.second--;
          if (that.second === 0) {
            clearInterval(that.interval);
            this.showText = true;
            this.second = 60;
          }
        }, 1e3);
      },
      //当前登录按钮操作
      login() {
        var that = this;
        if (!that.phone) {
          uni.showToast({ title: "请输入您的手机号", icon: "none" });
          return;
        }
        if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(that.phone)) {
          uni.showToast({ title: "请输入正确手机号", icon: "none" });
          return;
        }
        if (this.isCode && this.code == "") {
          uni.showToast({ title: "请输入验证码", icon: "none" });
          return;
        }
        uni.request({
          url: "https://api.maimangbox.cn/login",
          data: {
            phone: this.phone,
            code: this.code,
            next: "login"
          },
          header: {
            "content-type": "application/json",
            "api-token": uni.getStorageSync("token")
          },
          method: "POST",
          success: (res) => {
            if (res.data.resultCode == 1e4) {
              uni.showToast({ title: "登录成功！", icon: "none" });
              formatAppLog("log", "at pages/login/login.vue:186", res.data.data);
              uni.setStorageSync("token", res.data.data);
              formatAppLog("log", "at pages/login/login.vue:189", uni.getStorageSync("token"));
              uni.navigateBack();
            }
          }
        });
      },
      getCode() {
        if (!this.phone) {
          uni.showToast({ title: "请输入您的手机号", icon: "none" });
          return;
        }
        if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phone)) {
          uni.showToast({ title: "请输入正确手机号", icon: "none" });
          return;
        }
        uni.getStorageSync("token");
        uni.request({
          url: "https://api.maimangbox.cn/sendMsg",
          data: {
            phone: this.phone
          },
          header: {
            "content-type": "application/json",
            "api-token": uni.getStorageSync("token")
          },
          method: "POST",
          success: (res) => {
            uni.showToast({ title: res.data.resultMsg, icon: "none" });
            if (res.data.resultCode == 1e4) {
              this.showText = false;
              this.startCountdown();
            }
          }
        });
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "img-a" }, [
        vue.createElementVNode("view", { class: "t-b" }, [
          vue.createElementVNode("image", {
            src: "/static/login_bg.png",
            class: "logo",
            mode: "widthFix"
          }),
          vue.createElementVNode("view", null, [
            vue.createElementVNode("view", { class: "title" }, "智能金融,管家服务"),
            vue.createElementVNode("view", { class: "subtitle" }, "麦麦")
          ])
        ])
      ]),
      vue.createElementVNode("view", {
        class: "login-view",
        style: {}
      }, [
        vue.createElementVNode("view", { class: "t-login" }, [
          vue.createElementVNode("form", { class: "cl" }, [
            vue.createElementVNode("view", { class: "t-a" }, [
              vue.createElementVNode("text", { class: "txt" }, "手机号"),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "number",
                  name: "phone",
                  placeholder: "请输入您的手机号",
                  maxlength: "11",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.phone = $event)
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.phone]
              ])
            ]),
            vue.withDirectives(vue.createElementVNode(
              "view",
              { class: "t-a" },
              [
                vue.createElementVNode("text", { class: "txt" }, "验证码"),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    type: "number",
                    name: "code",
                    maxlength: "18",
                    placeholder: "请输入您的密码",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.code = $event)
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.code]
                ]),
                $data.showText ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "t-c",
                  onClick: _cache[2] || (_cache[2] = ($event) => $options.getCode())
                }, "发送验证码")) : (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 1,
                    class: "t-c",
                    style: { "background-color": "#A7A7A7" }
                  },
                  "重新发送(" + vue.toDisplayString($data.second) + ")",
                  1
                  /* TEXT */
                ))
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, $data.isCode]
            ]),
            vue.createElementVNode("button", {
              onClick: _cache[3] || (_cache[3] = ($event) => $options.login()),
              class: "login_btn"
            }, "登 录")
          ])
        ])
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__file", "D:/lj/haoxingj/haoxingj/pages/login/login.vue"]]);
  const _sfc_main$j = {
    data() {
      return {
        detailData: "",
        content: ""
      };
    },
    onLoad(option) {
      let key = option.key;
      let token = uni.getStorageSync("token");
      uni.request({
        url: "https://api.maimangbox.cn/content",
        data: {
          key
        },
        header: {
          "content-type": "application/json",
          "api-token": token
        },
        method: "POST",
        success: (res) => {
          formatAppLog("log", "at pages/knowledgedetail/knowledgedetail.vue:41", res);
          if (res.data.resultCode == 1e4) {
            this.detailData = res.data.data;
            formatAppLog("log", "at pages/knowledgedetail/knowledgedetail.vue:44", this.detailData);
          }
        }
      });
    },
    methods: {
      shareFn(title) {
        uni.share({
          provider: "weixin",
          scene: "WXSceneSession",
          type: 1,
          summary: title,
          success: function(res) {
            formatAppLog("log", "at pages/knowledgedetail/knowledgedetail.vue:57", "success:" + JSON.stringify(res));
          },
          fail: function(err) {
            formatAppLog("log", "at pages/knowledgedetail/knowledgedetail.vue:60", "fail:" + JSON.stringify(err));
          }
        });
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "top" }, [
        vue.createElementVNode("view", { class: "sources" }, [
          vue.createElementVNode("image", {
            src: $data.detailData.source_logo,
            class: "img"
          }, null, 8, ["src"]),
          vue.createElementVNode("view", { class: "name" }, [
            vue.createElementVNode(
              "view",
              { class: "title" },
              vue.toDisplayString($data.detailData.source_name),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "time" },
              vue.toDisplayString($data.detailData.source_date),
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createElementVNode("view", {
          class: "follow",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.shareFn($data.detailData.source_title))
        }, "分享")
      ]),
      vue.createElementVNode("view", { class: "detail" }, [
        vue.createElementVNode(
          "view",
          { class: "title" },
          vue.toDisplayString($data.detailData.source_title),
          1
          /* TEXT */
        ),
        vue.createElementVNode("rich-text", {
          nodes: $data.detailData.content
        }, null, 8, ["nodes"])
      ])
    ]);
  }
  const PagesKnowledgedetailKnowledgedetail = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__file", "D:/lj/haoxingj/haoxingj/pages/knowledgedetail/knowledgedetail.vue"]]);
  const _sfc_main$i = {
    name: "agree",
    data() {
      return {
        isAgree: false
      };
    },
    methods: {
      handleChange(e) {
        let _this = this;
        _this.value = e.detail.value;
        formatAppLog("log", "at components/agree/agree.vue:31", _this.value);
        if (_this.value.length == 0) {
          uni.showToast({ title: "请勾选用户协议和隐私协议!", icon: "none" });
          _this.isAgree = false;
          _this.$emit("isAgree", false);
        } else {
          _this.isAgree = true;
          _this.$emit("isAgree", true);
        }
      },
      goToKnowledgeDetail(key) {
        uni.navigateTo({
          url: "/pages/knowledgedetail/knowledgedetail?key=" + key
        });
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "agree_box" }, " 同意，平台顾问将向您提供专业1对一咨询服务， 不同意仅将信息保存为个人信息。 "),
      vue.createElementVNode(
        "checkbox-group",
        {
          onChange: _cache[2] || (_cache[2] = (...args) => $options.handleChange && $options.handleChange(...args))
        },
        [
          vue.createElementVNode("label", { class: "agree_check" }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass($data.isAgree ? "agree checked" : "agree unchecked")
              },
              null,
              2
              /* CLASS */
            ),
            vue.createElementVNode("checkbox", { hidden: "" }),
            vue.createElementVNode("view", null, [
              vue.createTextVNode("我已阅读并同意 "),
              vue.createElementVNode("text", {
                class: "col-g",
                onClick: _cache[0] || (_cache[0] = ($event) => $options.goToKnowledgeDetail("3"))
              }, "《用户协议》"),
              vue.createElementVNode("text", {
                class: "col-g",
                onClick: _cache[1] || (_cache[1] = ($event) => $options.goToKnowledgeDetail("4"))
              }, "《隐私协议》")
            ])
          ])
        ],
        32
        /* HYDRATE_EVENTS */
      )
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-7d30396c"], ["__file", "D:/lj/haoxingj/haoxingj/components/agree/agree.vue"]]);
  var AreaJson = [
    {
      "value": "北京市",
      "id": "010",
      "childs": [{
        "value": "北京市",
        "id": "010",
        "childs": [
          {
            "value": "东城区",
            "id": "110101"
          },
          {
            "value": "西城区",
            "id": "110102"
          },
          {
            "value": "朝阳区",
            "id": "110105"
          },
          {
            "value": "丰台区",
            "id": "110106"
          },
          {
            "value": "石景山区",
            "id": "110107"
          },
          {
            "value": "海淀区",
            "id": "110108"
          },
          {
            "value": "门头沟区",
            "id": "110109"
          },
          {
            "value": "房山区",
            "id": "110111"
          },
          {
            "value": "通州区",
            "id": "110112"
          },
          {
            "value": "顺义区",
            "id": "110113"
          },
          {
            "value": "昌平区",
            "id": "110114"
          },
          {
            "value": "大兴区",
            "id": "110115"
          },
          {
            "value": "怀柔区",
            "id": "110116"
          },
          {
            "value": "平谷区",
            "id": "110117"
          },
          {
            "value": "密云区",
            "id": "110118"
          },
          {
            "value": "延庆区",
            "id": "110119"
          }
        ]
      }]
    },
    {
      "value": "天津市",
      "id": "030",
      "childs": [{
        "value": "天津市",
        "id": "030",
        "childs": [
          {
            "value": "和平区",
            "id": "120101"
          },
          {
            "value": "河东区",
            "id": "120102"
          },
          {
            "value": "河西区",
            "id": "120103"
          },
          {
            "value": "南开区",
            "id": "120104"
          },
          {
            "value": "河北区",
            "id": "120105"
          },
          {
            "value": "红桥区",
            "id": "120106"
          },
          {
            "value": "东丽区",
            "id": "120110"
          },
          {
            "value": "西青区",
            "id": "120111"
          },
          {
            "value": "津南区",
            "id": "120112"
          },
          {
            "value": "北辰区",
            "id": "120113"
          },
          {
            "value": "武清区",
            "id": "120114"
          },
          {
            "value": "宝坻区",
            "id": "120115"
          },
          {
            "value": "滨海新区",
            "id": "120116"
          },
          {
            "value": "宁河区",
            "id": "120117"
          },
          {
            "value": "静海区",
            "id": "120118"
          },
          {
            "value": "蓟州区",
            "id": "120119"
          }
        ]
      }]
    },
    {
      "value": "河北省",
      "id": "140",
      "childs": [
        {
          "value": "石家庄市",
          "id": "140020",
          "childs": [
            {
              "value": "长安区",
              "id": "130102"
            },
            {
              "value": "桥西区",
              "id": "130104"
            },
            {
              "value": "新华区",
              "id": "130105"
            },
            {
              "value": "井陉矿区",
              "id": "130107"
            },
            {
              "value": "裕华区",
              "id": "130108"
            },
            {
              "value": "藁城区",
              "id": "130109"
            },
            {
              "value": "鹿泉区",
              "id": "130110"
            },
            {
              "value": "栾城区",
              "id": "130111"
            },
            {
              "value": "井陉县",
              "id": "130121"
            },
            {
              "value": "正定县",
              "id": "130123"
            },
            {
              "value": "行唐县",
              "id": "130125"
            },
            {
              "value": "灵寿县",
              "id": "130126"
            },
            {
              "value": "高邑县",
              "id": "130127"
            },
            {
              "value": "深泽县",
              "id": "130128"
            },
            {
              "value": "赞皇县",
              "id": "130129"
            },
            {
              "value": "无极县",
              "id": "130130"
            },
            {
              "value": "平山县",
              "id": "130131"
            },
            {
              "value": "元氏县",
              "id": "130132"
            },
            {
              "value": "赵县",
              "id": "130133"
            },
            {
              "value": "晋州市",
              "id": "130183"
            },
            {
              "value": "新乐市",
              "id": "130184"
            }
          ]
        },
        {
          "value": "唐山市",
          "id": "140080",
          "childs": [
            {
              "value": "路南区",
              "id": "130202"
            },
            {
              "value": "路北区",
              "id": "130203"
            },
            {
              "value": "古冶区",
              "id": "130204"
            },
            {
              "value": "开平区",
              "id": "130205"
            },
            {
              "value": "丰南区",
              "id": "130207"
            },
            {
              "value": "丰润区",
              "id": "130208"
            },
            {
              "value": "曹妃甸区",
              "id": "130209"
            },
            {
              "value": "滦县",
              "id": "130223"
            },
            {
              "value": "滦南县",
              "id": "130224"
            },
            {
              "value": "乐亭县",
              "id": "130225"
            },
            {
              "value": "迁西县",
              "id": "130227"
            },
            {
              "value": "玉田县",
              "id": "130229"
            },
            {
              "value": "遵化市",
              "id": "130281"
            },
            {
              "value": "迁安市",
              "id": "130283"
            }
          ]
        },
        {
          "value": "秦皇岛市",
          "id": "140070",
          "childs": [
            {
              "value": "海港区",
              "id": "130302"
            },
            {
              "value": "山海关区",
              "id": "130303"
            },
            {
              "value": "北戴河区",
              "id": "130304"
            },
            {
              "value": "抚宁区",
              "id": "130306"
            },
            {
              "value": "青龙满族自治县",
              "id": "130321"
            },
            {
              "value": "昌黎县",
              "id": "130322"
            },
            {
              "value": "卢龙县",
              "id": "130324"
            }
          ]
        },
        {
          "value": "邯郸市",
          "id": "140050",
          "childs": [
            {
              "value": "邯山区",
              "id": "130402"
            },
            {
              "value": "丛台区",
              "id": "130403"
            },
            {
              "value": "复兴区",
              "id": "130404"
            },
            {
              "value": "峰峰矿区",
              "id": "130406"
            },
            {
              "value": "邯郸县",
              "id": "130421"
            },
            {
              "value": "临漳县",
              "id": "130423"
            },
            {
              "value": "成安县",
              "id": "130424"
            },
            {
              "value": "大名县",
              "id": "130425"
            },
            {
              "value": "涉县",
              "id": "130426"
            },
            {
              "value": "磁县",
              "id": "130427"
            },
            {
              "value": "肥乡县",
              "id": "130428"
            },
            {
              "value": "永年县",
              "id": "130429"
            },
            {
              "value": "邱县",
              "id": "130430"
            },
            {
              "value": "鸡泽县",
              "id": "130431"
            },
            {
              "value": "广平县",
              "id": "130432"
            },
            {
              "value": "馆陶县",
              "id": "130433"
            },
            {
              "value": "魏县",
              "id": "130434"
            },
            {
              "value": "曲周县",
              "id": "130435"
            },
            {
              "value": "武安市",
              "id": "130481"
            }
          ]
        },
        {
          "value": "邢台市",
          "id": "邢台",
          "childs": [
            {
              "value": "桥东区",
              "id": "130502"
            },
            {
              "value": "桥西区",
              "id": "130503"
            },
            {
              "value": "邢台县",
              "id": "130521"
            },
            {
              "value": "临城县",
              "id": "130522"
            },
            {
              "value": "内丘县",
              "id": "130523"
            },
            {
              "value": "柏乡县",
              "id": "130524"
            },
            {
              "value": "隆尧县",
              "id": "130525"
            },
            {
              "value": "任县",
              "id": "130526"
            },
            {
              "value": "南和县",
              "id": "130527"
            },
            {
              "value": "宁晋县",
              "id": "130528"
            },
            {
              "value": "巨鹿县",
              "id": "130529"
            },
            {
              "value": "新河县",
              "id": "130530"
            },
            {
              "value": "广宗县",
              "id": "130531"
            },
            {
              "value": "平乡县",
              "id": "130532"
            },
            {
              "value": "威县",
              "id": "130533"
            },
            {
              "value": "清河县",
              "id": "130534"
            },
            {
              "value": "临西县",
              "id": "130535"
            },
            {
              "value": "南宫市",
              "id": "130581"
            },
            {
              "value": "沙河市",
              "id": "130582"
            }
          ]
        },
        {
          "value": "保定市",
          "id": "140030",
          "childs": [
            {
              "value": "竞秀区",
              "id": "130602"
            },
            {
              "value": "莲池区",
              "id": "130606"
            },
            {
              "value": "满城区",
              "id": "130607"
            },
            {
              "value": "清苑区",
              "id": "130608"
            },
            {
              "value": "徐水区",
              "id": "130609"
            },
            {
              "value": "涞水县",
              "id": "130623"
            },
            {
              "value": "阜平县",
              "id": "130624"
            },
            {
              "value": "定兴县",
              "id": "130626"
            },
            {
              "value": "唐县",
              "id": "130627"
            },
            {
              "value": "高阳县",
              "id": "130628"
            },
            {
              "value": "容城县",
              "id": "130629"
            },
            {
              "value": "涞源县",
              "id": "130630"
            },
            {
              "value": "望都县",
              "id": "130631"
            },
            {
              "value": "安新县",
              "id": "130632"
            },
            {
              "value": "易县",
              "id": "130633"
            },
            {
              "value": "曲阳县",
              "id": "130634"
            },
            {
              "value": "蠡县",
              "id": "130635"
            },
            {
              "value": "顺平县",
              "id": "130636"
            },
            {
              "value": "博野县",
              "id": "130637"
            },
            {
              "value": "雄县",
              "id": "130638"
            },
            {
              "value": "涿州市",
              "id": "130681"
            },
            {
              "value": "安国市",
              "id": "130683"
            },
            {
              "value": "高碑店市",
              "id": "130684"
            }
          ]
        },
        {
          "value": "张家口市",
          "id": "140090",
          "childs": [
            {
              "value": "桥东区",
              "id": "130702"
            },
            {
              "value": "桥西区",
              "id": "130703"
            },
            {
              "value": "宣化区",
              "id": "130705"
            },
            {
              "value": "下花园区",
              "id": "130706"
            },
            {
              "value": "万全区",
              "id": "130708"
            },
            {
              "value": "崇礼区",
              "id": "130709"
            },
            {
              "value": "张北县",
              "id": "130722"
            },
            {
              "value": "康保县",
              "id": "130723"
            },
            {
              "value": "沽源县",
              "id": "130724"
            },
            {
              "value": "尚义县",
              "id": "130725"
            },
            {
              "value": "蔚县",
              "id": "130726"
            },
            {
              "value": "阳原县",
              "id": "130727"
            },
            {
              "value": "怀安县",
              "id": "130728"
            },
            {
              "value": "怀来县",
              "id": "130730"
            },
            {
              "value": "涿鹿县",
              "id": "130731"
            },
            {
              "value": "赤城县",
              "id": "130732"
            }
          ]
        },
        {
          "value": "承德市",
          "id": "140040",
          "childs": [
            {
              "value": "双桥区",
              "id": "130802"
            },
            {
              "value": "双滦区",
              "id": "130803"
            },
            {
              "value": "鹰手营子矿区",
              "id": "130804"
            },
            {
              "value": "承德县",
              "id": "130821"
            },
            {
              "value": "兴隆县",
              "id": "130822"
            },
            {
              "value": "平泉县",
              "id": "130823"
            },
            {
              "value": "滦平县",
              "id": "130824"
            },
            {
              "value": "隆化县",
              "id": "130825"
            },
            {
              "value": "丰宁满族自治县",
              "id": "130826"
            },
            {
              "value": "宽城满族自治县",
              "id": "130827"
            },
            {
              "value": "围场满族蒙古族自治县",
              "id": "130828"
            }
          ]
        },
        {
          "value": "沧州市",
          "id": "140110",
          "childs": [
            {
              "value": "新华区",
              "id": "130902"
            },
            {
              "value": "运河区",
              "id": "130903"
            },
            {
              "value": "沧县",
              "id": "130921"
            },
            {
              "value": "青县",
              "id": "130922"
            },
            {
              "value": "东光县",
              "id": "130923"
            },
            {
              "value": "海兴县",
              "id": "130924"
            },
            {
              "value": "盐山县",
              "id": "130925"
            },
            {
              "value": "肃宁县",
              "id": "130926"
            },
            {
              "value": "南皮县",
              "id": "130927"
            },
            {
              "value": "吴桥县",
              "id": "130928"
            },
            {
              "value": "献县",
              "id": "130929"
            },
            {
              "value": "孟村回族自治县",
              "id": "130930"
            },
            {
              "value": "泊头市",
              "id": "130981"
            },
            {
              "value": "任丘市",
              "id": "130982"
            },
            {
              "value": "黄骅市",
              "id": "130983"
            },
            {
              "value": "河间市",
              "id": "130984"
            }
          ]
        },
        {
          "value": "廊坊市",
          "id": "140060",
          "childs": [
            {
              "value": "安次区",
              "id": "131002"
            },
            {
              "value": "广阳区",
              "id": "131003"
            },
            {
              "value": "固安县",
              "id": "131022"
            },
            {
              "value": "永清县",
              "id": "131023"
            },
            {
              "value": "香河县",
              "id": "131024"
            },
            {
              "value": "大城县",
              "id": "131025"
            },
            {
              "value": "文安县",
              "id": "131026"
            },
            {
              "value": "大厂回族自治县",
              "id": "131028"
            },
            {
              "value": "霸州市",
              "id": "131081"
            },
            {
              "value": "三河市",
              "id": "131082"
            }
          ]
        },
        {
          "value": "衡水市",
          "id": "140120",
          "childs": [
            {
              "value": "桃城区",
              "id": "131102"
            },
            {
              "value": "冀州区",
              "id": "131103"
            },
            {
              "value": "枣强县",
              "id": "131121"
            },
            {
              "value": "武邑县",
              "id": "131122"
            },
            {
              "value": "武强县",
              "id": "131123"
            },
            {
              "value": "饶阳县",
              "id": "131124"
            },
            {
              "value": "安平县",
              "id": "131125"
            },
            {
              "value": "故城县",
              "id": "131126"
            },
            {
              "value": "景县",
              "id": "131127"
            },
            {
              "value": "阜城县",
              "id": "131128"
            },
            {
              "value": "深州市",
              "id": "131182"
            }
          ]
        },
        {
          "value": "省直辖县级行政区划",
          "id": "139000",
          "childs": [
            {
              "value": "定州市",
              "id": "139001"
            },
            {
              "value": "辛集市",
              "id": "139002"
            }
          ]
        }
      ]
    },
    {
      "value": "山西省",
      "id": "260",
      "childs": [
        {
          "value": "太原市",
          "id": "260020",
          "childs": [
            {
              "value": "小店区",
              "id": "140105"
            },
            {
              "value": "迎泽区",
              "id": "140106"
            },
            {
              "value": "杏花岭区",
              "id": "140107"
            },
            {
              "value": "尖草坪区",
              "id": "140108"
            },
            {
              "value": "万柏林区",
              "id": "140109"
            },
            {
              "value": "晋源区",
              "id": "140110"
            },
            {
              "value": "清徐县",
              "id": "140121"
            },
            {
              "value": "阳曲县",
              "id": "140122"
            },
            {
              "value": "娄烦县",
              "id": "140123"
            },
            {
              "value": "古交市",
              "id": "140181"
            }
          ]
        },
        {
          "value": "大同市",
          "id": "260030",
          "childs": [
            {
              "value": "城区",
              "id": "140202"
            },
            {
              "value": "矿区",
              "id": "140203"
            },
            {
              "value": "南郊区",
              "id": "140211"
            },
            {
              "value": "新荣区",
              "id": "140212"
            },
            {
              "value": "阳高县",
              "id": "140221"
            },
            {
              "value": "天镇县",
              "id": "140222"
            },
            {
              "value": "广灵县",
              "id": "140223"
            },
            {
              "value": "灵丘县",
              "id": "140224"
            },
            {
              "value": "浑源县",
              "id": "140225"
            },
            {
              "value": "左云县",
              "id": "140226"
            },
            {
              "value": "大同县",
              "id": "140227"
            }
          ]
        },
        {
          "value": "阳泉市",
          "id": "260070",
          "childs": [
            {
              "value": "城区",
              "id": "140302"
            },
            {
              "value": "矿区",
              "id": "140303"
            },
            {
              "value": "郊区",
              "id": "140311"
            },
            {
              "value": "平定县",
              "id": "140321"
            },
            {
              "value": "盂县",
              "id": "140322"
            }
          ]
        },
        {
          "value": "长治市",
          "id": "260060",
          "childs": [
            {
              "value": "城区",
              "id": "140402"
            },
            {
              "value": "郊区",
              "id": "140411"
            },
            {
              "value": "长治县",
              "id": "140421"
            },
            {
              "value": "襄垣县",
              "id": "140423"
            },
            {
              "value": "屯留县",
              "id": "140424"
            },
            {
              "value": "平顺县",
              "id": "140425"
            },
            {
              "value": "黎城县",
              "id": "140426"
            },
            {
              "value": "壶关县",
              "id": "140427"
            },
            {
              "value": "长子县",
              "id": "140428"
            },
            {
              "value": "武乡县",
              "id": "140429"
            },
            {
              "value": "沁县",
              "id": "140430"
            },
            {
              "value": "沁源县",
              "id": "140431"
            },
            {
              "value": "潞城市",
              "id": "140481"
            }
          ]
        },
        {
          "value": "晋城市",
          "id": "260080",
          "childs": [
            {
              "value": "城区",
              "id": "140502"
            },
            {
              "value": "沁水县",
              "id": "140521"
            },
            {
              "value": "阳城县",
              "id": "140522"
            },
            {
              "value": "陵川县",
              "id": "140524"
            },
            {
              "value": "泽州县",
              "id": "140525"
            },
            {
              "value": "高平市",
              "id": "140581"
            }
          ]
        },
        {
          "value": "朔州市",
          "id": "260090",
          "childs": [
            {
              "value": "朔城区",
              "id": "140602"
            },
            {
              "value": "平鲁区",
              "id": "140603"
            },
            {
              "value": "山阴县",
              "id": "140621"
            },
            {
              "value": "应县",
              "id": "140622"
            },
            {
              "value": "右玉县",
              "id": "140623"
            },
            {
              "value": "怀仁县",
              "id": "140624"
            }
          ]
        },
        {
          "value": "晋中市",
          "id": "260100",
          "childs": [
            {
              "value": "榆次区",
              "id": "140702"
            },
            {
              "value": "榆社县",
              "id": "140721"
            },
            {
              "value": "左权县",
              "id": "140722"
            },
            {
              "value": "和顺县",
              "id": "140723"
            },
            {
              "value": "昔阳县",
              "id": "140724"
            },
            {
              "value": "寿阳县",
              "id": "140725"
            },
            {
              "value": "太谷县",
              "id": "140726"
            },
            {
              "value": "祁县",
              "id": "140727"
            },
            {
              "value": "平遥县",
              "id": "140728"
            },
            {
              "value": "灵石县",
              "id": "140729"
            },
            {
              "value": "介休市",
              "id": "140781"
            }
          ]
        },
        {
          "value": "运城市",
          "id": "260050",
          "childs": [
            {
              "value": "盐湖区",
              "id": "140802"
            },
            {
              "value": "临猗县",
              "id": "140821"
            },
            {
              "value": "万荣县",
              "id": "140822"
            },
            {
              "value": "闻喜县",
              "id": "140823"
            },
            {
              "value": "稷山县",
              "id": "140824"
            },
            {
              "value": "新绛县",
              "id": "140825"
            },
            {
              "value": "绛县",
              "id": "140826"
            },
            {
              "value": "垣曲县",
              "id": "140827"
            },
            {
              "value": "夏县",
              "id": "140828"
            },
            {
              "value": "平陆县",
              "id": "140829"
            },
            {
              "value": "芮城县",
              "id": "140830"
            },
            {
              "value": "永济市",
              "id": "140881"
            },
            {
              "value": "河津市",
              "id": "140882"
            }
          ]
        },
        {
          "value": "忻州市",
          "id": "260110",
          "childs": [
            {
              "value": "忻府区",
              "id": "140902"
            },
            {
              "value": "定襄县",
              "id": "140921"
            },
            {
              "value": "五台县",
              "id": "140922"
            },
            {
              "value": "代县",
              "id": "140923"
            },
            {
              "value": "繁峙县",
              "id": "140924"
            },
            {
              "value": "宁武县",
              "id": "140925"
            },
            {
              "value": "静乐县",
              "id": "140926"
            },
            {
              "value": "神池县",
              "id": "140927"
            },
            {
              "value": "五寨县",
              "id": "140928"
            },
            {
              "value": "岢岚县",
              "id": "140929"
            },
            {
              "value": "河曲县",
              "id": "140930"
            },
            {
              "value": "保德县",
              "id": "140931"
            },
            {
              "value": "偏关县",
              "id": "140932"
            },
            {
              "value": "原平市",
              "id": "140981"
            }
          ]
        },
        {
          "value": "临汾市",
          "id": "260040",
          "childs": [
            {
              "value": "尧都区",
              "id": "141002"
            },
            {
              "value": "曲沃县",
              "id": "141021"
            },
            {
              "value": "翼城县",
              "id": "141022"
            },
            {
              "value": "襄汾县",
              "id": "141023"
            },
            {
              "value": "洪洞县",
              "id": "141024"
            },
            {
              "value": "古县",
              "id": "141025"
            },
            {
              "value": "安泽县",
              "id": "141026"
            },
            {
              "value": "浮山县",
              "id": "141027"
            },
            {
              "value": "吉县",
              "id": "141028"
            },
            {
              "value": "乡宁县",
              "id": "141029"
            },
            {
              "value": "大宁县",
              "id": "141030"
            },
            {
              "value": "隰县",
              "id": "141031"
            },
            {
              "value": "永和县",
              "id": "141032"
            },
            {
              "value": "蒲县",
              "id": "141033"
            },
            {
              "value": "汾西县",
              "id": "141034"
            },
            {
              "value": "侯马市",
              "id": "141081"
            },
            {
              "value": "霍州市",
              "id": "141082"
            }
          ]
        },
        {
          "value": "吕梁市",
          "id": "260120",
          "childs": [
            {
              "value": "离石区",
              "id": "141102"
            },
            {
              "value": "文水县",
              "id": "141121"
            },
            {
              "value": "交城县",
              "id": "141122"
            },
            {
              "value": "兴县",
              "id": "141123"
            },
            {
              "value": "临县",
              "id": "141124"
            },
            {
              "value": "柳林县",
              "id": "141125"
            },
            {
              "value": "石楼县",
              "id": "141126"
            },
            {
              "value": "岚县",
              "id": "141127"
            },
            {
              "value": "方山县",
              "id": "141128"
            },
            {
              "value": "中阳县",
              "id": "141129"
            },
            {
              "value": "交口县",
              "id": "141130"
            },
            {
              "value": "孝义市",
              "id": "141181"
            },
            {
              "value": "汾阳市",
              "id": "141182"
            }
          ]
        }
      ]
    },
    {
      "value": "内蒙古自治区",
      "id": "220",
      "childs": [
        {
          "value": "呼和浩特市",
          "id": "220020",
          "childs": [
            {
              "value": "新城区",
              "id": "150102"
            },
            {
              "value": "回民区",
              "id": "150103"
            },
            {
              "value": "玉泉区",
              "id": "150104"
            },
            {
              "value": "赛罕区",
              "id": "150105"
            },
            {
              "value": "土默特左旗",
              "id": "150121"
            },
            {
              "value": "托克托县",
              "id": "150122"
            },
            {
              "value": "和林格尔县",
              "id": "150123"
            },
            {
              "value": "清水河县",
              "id": "150124"
            },
            {
              "value": "武川县",
              "id": "150125"
            }
          ]
        },
        {
          "value": "包头市",
          "id": "220030",
          "childs": [
            {
              "value": "东河区",
              "id": "150202"
            },
            {
              "value": "昆都仑区",
              "id": "150203"
            },
            {
              "value": "青山区",
              "id": "150204"
            },
            {
              "value": "石拐区",
              "id": "150205"
            },
            {
              "value": "白云鄂博矿区",
              "id": "150206"
            },
            {
              "value": "九原区",
              "id": "150207"
            },
            {
              "value": "土默特右旗",
              "id": "150221"
            },
            {
              "value": "固阳县",
              "id": "150222"
            },
            {
              "value": "达尔罕茂明安联合旗",
              "id": "150223"
            }
          ]
        },
        {
          "value": "乌海市",
          "id": "220060",
          "childs": [
            {
              "value": "海勃湾区",
              "id": "150302"
            },
            {
              "value": "海南区",
              "id": "150303"
            },
            {
              "value": "乌达区",
              "id": "150304"
            }
          ]
        },
        {
          "value": "赤峰市",
          "id": "220040",
          "childs": [
            {
              "value": "红山区",
              "id": "150402"
            },
            {
              "value": "元宝山区",
              "id": "150403"
            },
            {
              "value": "松山区",
              "id": "150404"
            },
            {
              "value": "阿鲁科尔沁旗",
              "id": "150421"
            },
            {
              "value": "巴林左旗",
              "id": "150422"
            },
            {
              "value": "巴林右旗",
              "id": "150423"
            },
            {
              "value": "林西县",
              "id": "150424"
            },
            {
              "value": "克什克腾旗",
              "id": "150425"
            },
            {
              "value": "翁牛特旗",
              "id": "150426"
            },
            {
              "value": "喀喇沁旗",
              "id": "150428"
            },
            {
              "value": "宁城县",
              "id": "150429"
            },
            {
              "value": "敖汉旗",
              "id": "150430"
            }
          ]
        },
        {
          "value": "通辽市",
          "id": "220070",
          "childs": [
            {
              "value": "科尔沁区",
              "id": "150502"
            },
            {
              "value": "科尔沁左翼中旗",
              "id": "150521"
            },
            {
              "value": "科尔沁左翼后旗",
              "id": "150522"
            },
            {
              "value": "开鲁县",
              "id": "150523"
            },
            {
              "value": "库伦旗",
              "id": "150524"
            },
            {
              "value": "奈曼旗",
              "id": "150525"
            },
            {
              "value": "扎鲁特旗",
              "id": "150526"
            },
            {
              "value": "霍林郭勒市",
              "id": "150581"
            }
          ]
        },
        {
          "value": "鄂尔多斯市",
          "id": "220050",
          "childs": [
            {
              "value": "东胜区",
              "id": "150602"
            },
            {
              "value": "康巴什区",
              "id": "150603"
            },
            {
              "value": "达拉特旗",
              "id": "150621"
            },
            {
              "value": "准格尔旗",
              "id": "150622"
            },
            {
              "value": "鄂托克前旗",
              "id": "150623"
            },
            {
              "value": "鄂托克旗",
              "id": "150624"
            },
            {
              "value": "杭锦旗",
              "id": "150625"
            },
            {
              "value": "乌审旗",
              "id": "150626"
            },
            {
              "value": "伊金霍洛旗",
              "id": "150627"
            }
          ]
        },
        {
          "value": "呼伦贝尔市",
          "id": "220080",
          "childs": [
            {
              "value": "海拉尔区",
              "id": "150702"
            },
            {
              "value": "扎赉诺尔区",
              "id": "150703"
            },
            {
              "value": "阿荣旗",
              "id": "150721"
            },
            {
              "value": "莫力达瓦达斡尔族自治旗",
              "id": "150722"
            },
            {
              "value": "鄂伦春自治旗",
              "id": "150723"
            },
            {
              "value": "鄂温克族自治旗",
              "id": "150724"
            },
            {
              "value": "陈巴尔虎旗",
              "id": "150725"
            },
            {
              "value": "新巴尔虎左旗",
              "id": "150726"
            },
            {
              "value": "新巴尔虎右旗",
              "id": "150727"
            },
            {
              "value": "满洲里市",
              "id": "150781"
            },
            {
              "value": "牙克石市",
              "id": "150782"
            },
            {
              "value": "扎兰屯市",
              "id": "150783"
            },
            {
              "value": "额尔古纳市",
              "id": "150784"
            },
            {
              "value": "根河市",
              "id": "150785"
            }
          ]
        },
        {
          "value": "巴彦淖尔市",
          "id": "220090",
          "childs": [
            {
              "value": "临河区",
              "id": "150802"
            },
            {
              "value": "五原县",
              "id": "150821"
            },
            {
              "value": "磴口县",
              "id": "150822"
            },
            {
              "value": "乌拉特前旗",
              "id": "150823"
            },
            {
              "value": "乌拉特中旗",
              "id": "150824"
            },
            {
              "value": "乌拉特后旗",
              "id": "150825"
            },
            {
              "value": "杭锦后旗",
              "id": "150826"
            }
          ]
        },
        {
          "value": "乌兰察布市",
          "id": "220100",
          "childs": [
            {
              "value": "集宁区",
              "id": "150902"
            },
            {
              "value": "卓资县",
              "id": "150921"
            },
            {
              "value": "化德县",
              "id": "150922"
            },
            {
              "value": "商都县",
              "id": "150923"
            },
            {
              "value": "兴和县",
              "id": "150924"
            },
            {
              "value": "凉城县",
              "id": "150925"
            },
            {
              "value": "察哈尔右翼前旗",
              "id": "150926"
            },
            {
              "value": "察哈尔右翼中旗",
              "id": "150927"
            },
            {
              "value": "察哈尔右翼后旗",
              "id": "150928"
            },
            {
              "value": "四子王旗",
              "id": "150929"
            },
            {
              "value": "丰镇市",
              "id": "150981"
            }
          ]
        },
        {
          "value": "兴安盟",
          "id": "220110",
          "childs": [
            {
              "value": "乌兰浩特市",
              "id": "152201"
            },
            {
              "value": "阿尔山市",
              "id": "152202"
            },
            {
              "value": "科尔沁右翼前旗",
              "id": "152221"
            },
            {
              "value": "科尔沁右翼中旗",
              "id": "152222"
            },
            {
              "value": "扎赉特旗",
              "id": "152223"
            },
            {
              "value": "突泉县",
              "id": "152224"
            }
          ]
        },
        {
          "value": "锡林郭勒盟",
          "id": "220120",
          "childs": [
            {
              "value": "二连浩特市",
              "id": "152501"
            },
            {
              "value": "锡林浩特市",
              "id": "152502"
            },
            {
              "value": "阿巴嘎旗",
              "id": "152522"
            },
            {
              "value": "苏尼特左旗",
              "id": "152523"
            },
            {
              "value": "苏尼特右旗",
              "id": "152524"
            },
            {
              "value": "东乌珠穆沁旗",
              "id": "152525"
            },
            {
              "value": "西乌珠穆沁旗",
              "id": "152526"
            },
            {
              "value": "太仆寺旗",
              "id": "152527"
            },
            {
              "value": "镶黄旗",
              "id": "152528"
            },
            {
              "value": "正镶白旗",
              "id": "152529"
            },
            {
              "value": "正蓝旗",
              "id": "152530"
            },
            {
              "value": "多伦县",
              "id": "152531"
            }
          ]
        },
        {
          "value": "阿拉善盟",
          "id": "220130",
          "childs": [
            {
              "value": "阿拉善左旗",
              "id": "152921"
            },
            {
              "value": "阿拉善右旗",
              "id": "152922"
            },
            {
              "value": "额济纳旗",
              "id": "152923"
            }
          ]
        }
      ]
    },
    {
      "value": "辽宁省",
      "id": "210",
      "childs": [
        {
          "value": "沈阳市",
          "id": "210020",
          "childs": [
            {
              "value": "和平区",
              "id": "210102"
            },
            {
              "value": "沈河区",
              "id": "210103"
            },
            {
              "value": "大东区",
              "id": "210104"
            },
            {
              "value": "皇姑区",
              "id": "210105"
            },
            {
              "value": "铁西区",
              "id": "210106"
            },
            {
              "value": "苏家屯区",
              "id": "210111"
            },
            {
              "value": "浑南区",
              "id": "210112"
            },
            {
              "value": "沈北新区",
              "id": "210113"
            },
            {
              "value": "于洪区",
              "id": "210114"
            },
            {
              "value": "辽中区",
              "id": "210115"
            },
            {
              "value": "康平县",
              "id": "210123"
            },
            {
              "value": "法库县",
              "id": "210124"
            },
            {
              "value": "新民市",
              "id": "210181"
            }
          ]
        },
        {
          "value": "大连市",
          "id": "210040",
          "childs": [
            {
              "value": "中山区",
              "id": "210202"
            },
            {
              "value": "西岗区",
              "id": "210203"
            },
            {
              "value": "沙河口区",
              "id": "210204"
            },
            {
              "value": "甘井子区",
              "id": "210211"
            },
            {
              "value": "旅顺口区",
              "id": "210212"
            },
            {
              "value": "金州区",
              "id": "210213"
            },
            {
              "value": "普兰店区",
              "id": "210214"
            },
            {
              "value": "长海县",
              "id": "210224"
            },
            {
              "value": "瓦房店市",
              "id": "210281"
            },
            {
              "value": "庄河市",
              "id": "210283"
            }
          ]
        },
        {
          "value": "鞍山市",
          "id": "210030",
          "childs": [
            {
              "value": "铁东区",
              "id": "210302"
            },
            {
              "value": "铁西区",
              "id": "210303"
            },
            {
              "value": "立山区",
              "id": "210304"
            },
            {
              "value": "千山区",
              "id": "210311"
            },
            {
              "value": "台安县",
              "id": "210321"
            },
            {
              "value": "岫岩满族自治县",
              "id": "210323"
            },
            {
              "value": "海城市",
              "id": "210381"
            }
          ]
        },
        {
          "value": "抚顺市",
          "id": "210060",
          "childs": [
            {
              "value": "新抚区",
              "id": "210402"
            },
            {
              "value": "东洲区",
              "id": "210403"
            },
            {
              "value": "望花区",
              "id": "210404"
            },
            {
              "value": "顺城区",
              "id": "210411"
            },
            {
              "value": "抚顺县",
              "id": "210421"
            },
            {
              "value": "新宾满族自治县",
              "id": "210422"
            },
            {
              "value": "清原满族自治县",
              "id": "210423"
            }
          ]
        },
        {
          "value": "本溪市",
          "id": "210070",
          "childs": [
            {
              "value": "平山区",
              "id": "210502"
            },
            {
              "value": "溪湖区",
              "id": "210503"
            },
            {
              "value": "明山区",
              "id": "210504"
            },
            {
              "value": "南芬区",
              "id": "210505"
            },
            {
              "value": "本溪满族自治县",
              "id": "210521"
            },
            {
              "value": "桓仁满族自治县",
              "id": "210522"
            }
          ]
        },
        {
          "value": "丹东市",
          "id": "210080",
          "childs": [
            {
              "value": "元宝区",
              "id": "210602"
            },
            {
              "value": "振兴区",
              "id": "210603"
            },
            {
              "value": "振安区",
              "id": "210604"
            },
            {
              "value": "宽甸满族自治县",
              "id": "210624"
            },
            {
              "value": "东港市",
              "id": "210681"
            },
            {
              "value": "凤城市",
              "id": "210682"
            }
          ]
        },
        {
          "value": "锦州市",
          "id": "210090",
          "childs": [
            {
              "value": "古塔区",
              "id": "210702"
            },
            {
              "value": "凌河区",
              "id": "210703"
            },
            {
              "value": "太和区",
              "id": "210711"
            },
            {
              "value": "黑山县",
              "id": "210726"
            },
            {
              "value": "义县",
              "id": "210727"
            },
            {
              "value": "凌海市",
              "id": "210781"
            },
            {
              "value": "北镇市",
              "id": "210782"
            }
          ]
        },
        {
          "value": "营口市",
          "id": "210100",
          "childs": [
            {
              "value": "站前区",
              "id": "210802"
            },
            {
              "value": "西市区",
              "id": "210803"
            },
            {
              "value": "鲅鱼圈区",
              "id": "210804"
            },
            {
              "value": "老边区",
              "id": "210811"
            },
            {
              "value": "盖州市",
              "id": "210881"
            },
            {
              "value": "大石桥市",
              "id": "210882"
            }
          ]
        },
        {
          "value": "阜新市",
          "id": "210110",
          "childs": [
            {
              "value": "海州区",
              "id": "210902"
            },
            {
              "value": "新邱区",
              "id": "210903"
            },
            {
              "value": "太平区",
              "id": "210904"
            },
            {
              "value": "清河门区",
              "id": "210905"
            },
            {
              "value": "细河区",
              "id": "210911"
            },
            {
              "value": "阜新蒙古族自治县",
              "id": "210921"
            },
            {
              "value": "彰武县",
              "id": "210922"
            }
          ]
        },
        {
          "value": "辽阳市",
          "id": "210120",
          "childs": [
            {
              "value": "白塔区",
              "id": "211002"
            },
            {
              "value": "文圣区",
              "id": "211003"
            },
            {
              "value": "宏伟区",
              "id": "211004"
            },
            {
              "value": "弓长岭区",
              "id": "211005"
            },
            {
              "value": "太子河区",
              "id": "211011"
            },
            {
              "value": "辽阳县",
              "id": "211021"
            },
            {
              "value": "灯塔市",
              "id": "211081"
            }
          ]
        },
        {
          "value": "盘锦市",
          "id": "210130",
          "childs": [
            {
              "value": "双台子区",
              "id": "211102"
            },
            {
              "value": "兴隆台区",
              "id": "211103"
            },
            {
              "value": "大洼区",
              "id": "211104"
            },
            {
              "value": "盘山县",
              "id": "211122"
            }
          ]
        },
        {
          "value": "铁岭市",
          "id": "210140",
          "childs": [
            {
              "value": "银州区",
              "id": "211202"
            },
            {
              "value": "清河区",
              "id": "211204"
            },
            {
              "value": "铁岭县",
              "id": "211221"
            },
            {
              "value": "西丰县",
              "id": "211223"
            },
            {
              "value": "昌图县",
              "id": "211224"
            },
            {
              "value": "调兵山市",
              "id": "211281"
            },
            {
              "value": "开原市",
              "id": "211282"
            }
          ]
        },
        {
          "value": "朝阳市",
          "id": "210150",
          "childs": [
            {
              "value": "双塔区",
              "id": "211302"
            },
            {
              "value": "龙城区",
              "id": "211303"
            },
            {
              "value": "朝阳县",
              "id": "211321"
            },
            {
              "value": "建平县",
              "id": "211322"
            },
            {
              "value": "喀喇沁左翼蒙古族自治县",
              "id": "211324"
            },
            {
              "value": "北票市",
              "id": "211381"
            },
            {
              "value": "凌源市",
              "id": "211382"
            }
          ]
        },
        {
          "value": "葫芦岛市",
          "id": "210050",
          "childs": [
            {
              "value": "连山区",
              "id": "211402"
            },
            {
              "value": "龙港区",
              "id": "211403"
            },
            {
              "value": "南票区",
              "id": "211404"
            },
            {
              "value": "绥中县",
              "id": "211421"
            },
            {
              "value": "建昌县",
              "id": "211422"
            },
            {
              "value": "兴城市",
              "id": "211481"
            }
          ]
        }
      ]
    },
    {
      "value": "吉林省",
      "id": "190",
      "childs": [
        {
          "value": "长春市",
          "id": "190020",
          "childs": [
            {
              "value": "南关区",
              "id": "220102"
            },
            {
              "value": "宽城区",
              "id": "220103"
            },
            {
              "value": "朝阳区",
              "id": "220104"
            },
            {
              "value": "二道区",
              "id": "220105"
            },
            {
              "value": "绿园区",
              "id": "220106"
            },
            {
              "value": "双阳区",
              "id": "220112"
            },
            {
              "value": "九台区",
              "id": "220113"
            },
            {
              "value": "农安县",
              "id": "220122"
            },
            {
              "value": "榆树市",
              "id": "220182"
            },
            {
              "value": "德惠市",
              "id": "220183"
            }
          ]
        },
        {
          "value": "吉林市",
          "id": "190030",
          "childs": [
            {
              "value": "昌邑区",
              "id": "220202"
            },
            {
              "value": "龙潭区",
              "id": "220203"
            },
            {
              "value": "船营区",
              "id": "220204"
            },
            {
              "value": "丰满区",
              "id": "220211"
            },
            {
              "value": "永吉县",
              "id": "220221"
            },
            {
              "value": "蛟河市",
              "id": "220281"
            },
            {
              "value": "桦甸市",
              "id": "220282"
            },
            {
              "value": "舒兰市",
              "id": "220283"
            },
            {
              "value": "磐石市",
              "id": "220284"
            }
          ]
        },
        {
          "value": "四平市",
          "id": "190040",
          "childs": [
            {
              "value": "铁西区",
              "id": "220302"
            },
            {
              "value": "铁东区",
              "id": "220303"
            },
            {
              "value": "梨树县",
              "id": "220322"
            },
            {
              "value": "伊通满族自治县",
              "id": "220323"
            },
            {
              "value": "公主岭市",
              "id": "190120"
            },
            {
              "value": "双辽市",
              "id": "220382"
            }
          ]
        },
        {
          "value": "辽源市",
          "id": "190050",
          "childs": [
            {
              "value": "龙山区",
              "id": "220402"
            },
            {
              "value": "西安区",
              "id": "220403"
            },
            {
              "value": "东丰县",
              "id": "220421"
            },
            {
              "value": "东辽县",
              "id": "220422"
            }
          ]
        },
        {
          "value": "通化市",
          "id": "190060",
          "childs": [
            {
              "value": "东昌区",
              "id": "220502"
            },
            {
              "value": "二道江区",
              "id": "220503"
            },
            {
              "value": "通化县",
              "id": "220521"
            },
            {
              "value": "辉南县",
              "id": "220523"
            },
            {
              "value": "柳河县",
              "id": "220524"
            },
            {
              "value": "梅河口市",
              "id": "220581"
            },
            {
              "value": "集安市",
              "id": "220582"
            }
          ]
        },
        {
          "value": "白山市",
          "id": "190070",
          "childs": [
            {
              "value": "浑江区",
              "id": "220602"
            },
            {
              "value": "江源区",
              "id": "220605"
            },
            {
              "value": "抚松县",
              "id": "220621"
            },
            {
              "value": "靖宇县",
              "id": "220622"
            },
            {
              "value": "长白朝鲜族自治县",
              "id": "220623"
            },
            {
              "value": "临江市",
              "id": "220681"
            }
          ]
        },
        {
          "value": "松原市",
          "id": "190080",
          "childs": [
            {
              "value": "宁江区",
              "id": "220702"
            },
            {
              "value": "前郭尔罗斯蒙古族自治县",
              "id": "220721"
            },
            {
              "value": "长岭县",
              "id": "220722"
            },
            {
              "value": "乾安县",
              "id": "220723"
            },
            {
              "value": "扶余市",
              "id": "220781"
            }
          ]
        },
        {
          "value": "白城市",
          "id": "190090",
          "childs": [
            {
              "value": "洮北区",
              "id": "220802"
            },
            {
              "value": "镇赉县",
              "id": "220821"
            },
            {
              "value": "通榆县",
              "id": "220822"
            },
            {
              "value": "洮南市",
              "id": "220881"
            },
            {
              "value": "大安市",
              "id": "220882"
            }
          ]
        },
        {
          "value": "延边朝鲜族自治州",
          "id": "190110",
          "childs": [
            {
              "value": "延吉市",
              "id": "222401"
            },
            {
              "value": "图们市",
              "id": "222402"
            },
            {
              "value": "敦化市",
              "id": "222403"
            },
            {
              "value": "珲春市",
              "id": "222404"
            },
            {
              "value": "龙井市",
              "id": "222405"
            },
            {
              "value": "和龙市",
              "id": "222406"
            },
            {
              "value": "汪清县",
              "id": "222424"
            },
            {
              "value": "安图县",
              "id": "222426"
            }
          ]
        }
      ]
    },
    {
      "value": "黑龙江省",
      "id": "160",
      "childs": [
        {
          "value": "哈尔滨市",
          "id": "160020",
          "childs": [
            {
              "value": "道里区",
              "id": "230102"
            },
            {
              "value": "南岗区",
              "id": "230103"
            },
            {
              "value": "道外区",
              "id": "230104"
            },
            {
              "value": "平房区",
              "id": "230108"
            },
            {
              "value": "松北区",
              "id": "230109"
            },
            {
              "value": "香坊区",
              "id": "230110"
            },
            {
              "value": "呼兰区",
              "id": "230111"
            },
            {
              "value": "阿城区",
              "id": "230112"
            },
            {
              "value": "双城区",
              "id": "230113"
            },
            {
              "value": "依兰县",
              "id": "230123"
            },
            {
              "value": "方正县",
              "id": "230124"
            },
            {
              "value": "宾县",
              "id": "230125"
            },
            {
              "value": "巴彦县",
              "id": "230126"
            },
            {
              "value": "木兰县",
              "id": "230127"
            },
            {
              "value": "通河县",
              "id": "230128"
            },
            {
              "value": "延寿县",
              "id": "230129"
            },
            {
              "value": "尚志市",
              "id": "230183"
            },
            {
              "value": "五常市",
              "id": "230184"
            }
          ]
        },
        {
          "value": "齐齐哈尔市",
          "id": "160060",
          "childs": [
            {
              "value": "龙沙区",
              "id": "230202"
            },
            {
              "value": "建华区",
              "id": "230203"
            },
            {
              "value": "铁锋区",
              "id": "230204"
            },
            {
              "value": "昂昂溪区",
              "id": "230205"
            },
            {
              "value": "富拉尔基区",
              "id": "230206"
            },
            {
              "value": "碾子山区",
              "id": "230207"
            },
            {
              "value": "梅里斯达斡尔族区",
              "id": "230208"
            },
            {
              "value": "龙江县",
              "id": "230221"
            },
            {
              "value": "依安县",
              "id": "230223"
            },
            {
              "value": "泰来县",
              "id": "230224"
            },
            {
              "value": "甘南县",
              "id": "230225"
            },
            {
              "value": "富裕县",
              "id": "230227"
            },
            {
              "value": "克山县",
              "id": "230229"
            },
            {
              "value": "克东县",
              "id": "230230"
            },
            {
              "value": "拜泉县",
              "id": "230231"
            },
            {
              "value": "讷河市",
              "id": "230281"
            }
          ]
        },
        {
          "value": "鸡西市",
          "id": "160070",
          "childs": [
            {
              "value": "鸡冠区",
              "id": "230302"
            },
            {
              "value": "恒山区",
              "id": "230303"
            },
            {
              "value": "滴道区",
              "id": "230304"
            },
            {
              "value": "梨树区",
              "id": "230305"
            },
            {
              "value": "城子河区",
              "id": "230306"
            },
            {
              "value": "麻山区",
              "id": "230307"
            },
            {
              "value": "鸡东县",
              "id": "230321"
            },
            {
              "value": "虎林市",
              "id": "230381"
            },
            {
              "value": "密山市",
              "id": "230382"
            }
          ]
        },
        {
          "value": "鹤岗市",
          "id": "160080",
          "childs": [
            {
              "value": "向阳区",
              "id": "230402"
            },
            {
              "value": "工农区",
              "id": "230403"
            },
            {
              "value": "南山区",
              "id": "230404"
            },
            {
              "value": "兴安区",
              "id": "230405"
            },
            {
              "value": "东山区",
              "id": "230406"
            },
            {
              "value": "兴山区",
              "id": "230407"
            },
            {
              "value": "萝北县",
              "id": "230421"
            },
            {
              "value": "绥滨县",
              "id": "230422"
            }
          ]
        },
        {
          "value": "双鸭山市",
          "id": "160090",
          "childs": [
            {
              "value": "尖山区",
              "id": "230502"
            },
            {
              "value": "岭东区",
              "id": "230503"
            },
            {
              "value": "四方台区",
              "id": "230505"
            },
            {
              "value": "宝山区",
              "id": "230506"
            },
            {
              "value": "集贤县",
              "id": "230521"
            },
            {
              "value": "友谊县",
              "id": "230522"
            },
            {
              "value": "宝清县",
              "id": "230523"
            },
            {
              "value": "饶河县",
              "id": "230524"
            }
          ]
        },
        {
          "value": "大庆市",
          "id": "160030",
          "childs": [
            {
              "value": "萨尔图区",
              "id": "230602"
            },
            {
              "value": "龙凤区",
              "id": "230603"
            },
            {
              "value": "让胡路区",
              "id": "230604"
            },
            {
              "value": "红岗区",
              "id": "230605"
            },
            {
              "value": "大同区",
              "id": "230606"
            },
            {
              "value": "肇州县",
              "id": "230621"
            },
            {
              "value": "肇源县",
              "id": "230622"
            },
            {
              "value": "林甸县",
              "id": "230623"
            },
            {
              "value": "杜尔伯特蒙古族自治县",
              "id": "230624"
            }
          ]
        },
        {
          "value": "伊春市",
          "id": "160100",
          "childs": [
            {
              "value": "伊春区",
              "id": "230702"
            },
            {
              "value": "南岔区",
              "id": "230703"
            },
            {
              "value": "友好区",
              "id": "230704"
            },
            {
              "value": "西林区",
              "id": "230705"
            },
            {
              "value": "翠峦区",
              "id": "230706"
            },
            {
              "value": "新青区",
              "id": "230707"
            },
            {
              "value": "美溪区",
              "id": "230708"
            },
            {
              "value": "金山屯区",
              "id": "230709"
            },
            {
              "value": "五营区",
              "id": "230710"
            },
            {
              "value": "乌马河区",
              "id": "230711"
            },
            {
              "value": "汤旺河区",
              "id": "230712"
            },
            {
              "value": "带岭区",
              "id": "230713"
            },
            {
              "value": "乌伊岭区",
              "id": "230714"
            },
            {
              "value": "红星区",
              "id": "230715"
            },
            {
              "value": "上甘岭区",
              "id": "230716"
            },
            {
              "value": "嘉荫县",
              "id": "230722"
            },
            {
              "value": "铁力市",
              "id": "230781"
            }
          ]
        },
        {
          "value": "佳木斯市",
          "id": "160040",
          "childs": [
            {
              "value": "向阳区",
              "id": "230803"
            },
            {
              "value": "前进区",
              "id": "230804"
            },
            {
              "value": "东风区",
              "id": "230805"
            },
            {
              "value": "郊区",
              "id": "230811"
            },
            {
              "value": "桦南县",
              "id": "230822"
            },
            {
              "value": "桦川县",
              "id": "230826"
            },
            {
              "value": "汤原县",
              "id": "230828"
            },
            {
              "value": "同江市",
              "id": "230881"
            },
            {
              "value": "富锦市",
              "id": "230882"
            },
            {
              "value": "抚远市",
              "id": "230883"
            }
          ]
        },
        {
          "value": "七台河市",
          "id": "160110",
          "childs": [
            {
              "value": "新兴区",
              "id": "230902"
            },
            {
              "value": "桃山区",
              "id": "230903"
            },
            {
              "value": "茄子河区",
              "id": "230904"
            },
            {
              "value": "勃利县",
              "id": "230921"
            }
          ]
        },
        {
          "value": "牡丹江市",
          "id": "160050",
          "childs": [
            {
              "value": "东安区",
              "id": "231002"
            },
            {
              "value": "阳明区",
              "id": "231003"
            },
            {
              "value": "爱民区",
              "id": "231004"
            },
            {
              "value": "西安区",
              "id": "231005"
            },
            {
              "value": "林口县",
              "id": "231025"
            },
            {
              "value": "绥芬河市",
              "id": "231081"
            },
            {
              "value": "海林市",
              "id": "231083"
            },
            {
              "value": "宁安市",
              "id": "231084"
            },
            {
              "value": "穆棱市",
              "id": "231085"
            },
            {
              "value": "东宁市",
              "id": "231086"
            }
          ]
        },
        {
          "value": "黑河市",
          "id": "160120",
          "childs": [
            {
              "value": "爱辉区",
              "id": "231102"
            },
            {
              "value": "嫩江县",
              "id": "231121"
            },
            {
              "value": "逊克县",
              "id": "231123"
            },
            {
              "value": "孙吴县",
              "id": "231124"
            },
            {
              "value": "北安市",
              "id": "231181"
            },
            {
              "value": "五大连池市",
              "id": "231182"
            }
          ]
        },
        {
          "value": "绥化市",
          "id": "160130",
          "childs": [
            {
              "value": "北林区",
              "id": "231202"
            },
            {
              "value": "望奎县",
              "id": "231221"
            },
            {
              "value": "兰西县",
              "id": "231222"
            },
            {
              "value": "青冈县",
              "id": "231223"
            },
            {
              "value": "庆安县",
              "id": "231224"
            },
            {
              "value": "明水县",
              "id": "231225"
            },
            {
              "value": "绥棱县",
              "id": "231226"
            },
            {
              "value": "安达市",
              "id": "231281"
            },
            {
              "value": "肇东市",
              "id": "231282"
            },
            {
              "value": "海伦市",
              "id": "231283"
            }
          ]
        },
        {
          "value": "大兴安岭地区",
          "id": "160140",
          "childs": [
            {
              "value": "呼玛县",
              "id": "232721"
            },
            {
              "value": "塔河县",
              "id": "232722"
            },
            {
              "value": "漠河县",
              "id": "232723"
            }
          ]
        }
      ]
    },
    {
      "value": "上海市",
      "id": "020",
      "childs": [{
        "value": "上海市",
        "id": "020",
        "childs": [
          {
            "value": "黄浦区",
            "id": "310101"
          },
          {
            "value": "徐汇区",
            "id": "310104"
          },
          {
            "value": "长宁区",
            "id": "310105"
          },
          {
            "value": "静安区",
            "id": "310106"
          },
          {
            "value": "普陀区",
            "id": "310107"
          },
          {
            "value": "虹口区",
            "id": "310109"
          },
          {
            "value": "杨浦区",
            "id": "310110"
          },
          {
            "value": "闵行区",
            "id": "310112"
          },
          {
            "value": "宝山区",
            "id": "310113"
          },
          {
            "value": "嘉定区",
            "id": "310114"
          },
          {
            "value": "浦东新区",
            "id": "310115"
          },
          {
            "value": "金山区",
            "id": "310116"
          },
          {
            "value": "松江区",
            "id": "310117"
          },
          {
            "value": "青浦区",
            "id": "310118"
          },
          {
            "value": "奉贤区",
            "id": "310120"
          },
          {
            "value": "崇明区",
            "id": "310151"
          }
        ]
      }]
    },
    {
      "value": "江苏省",
      "id": "060",
      "childs": [
        {
          "value": "南京市",
          "id": "060020",
          "childs": [
            {
              "value": "玄武区",
              "id": "320102"
            },
            {
              "value": "秦淮区",
              "id": "320104"
            },
            {
              "value": "建邺区",
              "id": "320105"
            },
            {
              "value": "鼓楼区",
              "id": "320106"
            },
            {
              "value": "浦口区",
              "id": "320111"
            },
            {
              "value": "栖霞区",
              "id": "320113"
            },
            {
              "value": "雨花台区",
              "id": "320114"
            },
            {
              "value": "江宁区",
              "id": "320115"
            },
            {
              "value": "六合区",
              "id": "320116"
            },
            {
              "value": "溧水区",
              "id": "320117"
            },
            {
              "value": "高淳区",
              "id": "320118"
            }
          ]
        },
        {
          "value": "无锡市",
          "id": "060100",
          "childs": [
            {
              "value": "锡山区",
              "id": "320205"
            },
            {
              "value": "惠山区",
              "id": "320206"
            },
            {
              "value": "滨湖区",
              "id": "320211"
            },
            {
              "value": "梁溪区",
              "id": "320213"
            },
            {
              "value": "新吴区",
              "id": "320214"
            },
            {
              "value": "江阴市",
              "id": "320281"
            },
            {
              "value": "宜兴市",
              "id": "320282"
            }
          ]
        },
        {
          "value": "徐州市",
          "id": "060110",
          "childs": [
            {
              "value": "鼓楼区",
              "id": "320302"
            },
            {
              "value": "云龙区",
              "id": "320303"
            },
            {
              "value": "贾汪区",
              "id": "320305"
            },
            {
              "value": "泉山区",
              "id": "320311"
            },
            {
              "value": "铜山区",
              "id": "320312"
            },
            {
              "value": "丰县",
              "id": "320321"
            },
            {
              "value": "沛县",
              "id": "320322"
            },
            {
              "value": "睢宁县",
              "id": "320324"
            },
            {
              "value": "新沂市",
              "id": "320381"
            },
            {
              "value": "邳州市",
              "id": "320382"
            }
          ]
        },
        {
          "value": "常州市",
          "id": "060040",
          "childs": [
            {
              "value": "天宁区",
              "id": "320402"
            },
            {
              "value": "钟楼区",
              "id": "320404"
            },
            {
              "value": "新北区",
              "id": "320411"
            },
            {
              "value": "武进区",
              "id": "320412"
            },
            {
              "value": "金坛区",
              "id": "320413"
            },
            {
              "value": "溧阳市",
              "id": "320481"
            }
          ]
        },
        {
          "value": "苏州市",
          "id": "060080",
          "childs": [
            {
              "value": "虎丘区",
              "id": "320505"
            },
            {
              "value": "吴中区",
              "id": "320506"
            },
            {
              "value": "相城区",
              "id": "320507"
            },
            {
              "value": "姑苏区",
              "id": "320508"
            },
            {
              "value": "吴江区",
              "id": "320509"
            },
            {
              "value": "常熟市",
              "id": "320581"
            },
            {
              "value": "张家港市",
              "id": "320582"
            },
            {
              "value": "昆山市",
              "id": "320583"
            },
            {
              "value": "太仓市",
              "id": "320585"
            }
          ]
        },
        {
          "value": "南通市",
          "id": "060070",
          "childs": [
            {
              "value": "崇川区",
              "id": "320602"
            },
            {
              "value": "港闸区",
              "id": "320611"
            },
            {
              "value": "通州区",
              "id": "320612"
            },
            {
              "value": "海安县",
              "id": "320621"
            },
            {
              "value": "如东县",
              "id": "320623"
            },
            {
              "value": "启东市",
              "id": "320681"
            },
            {
              "value": "如皋市",
              "id": "320682"
            },
            {
              "value": "海门市",
              "id": "320684"
            }
          ]
        },
        {
          "value": "连云港市",
          "id": "060060",
          "childs": [
            {
              "value": "连云区",
              "id": "320703"
            },
            {
              "value": "海州区",
              "id": "320706"
            },
            {
              "value": "赣榆区",
              "id": "320707"
            },
            {
              "value": "东海县",
              "id": "320722"
            },
            {
              "value": "灌云县",
              "id": "320723"
            },
            {
              "value": "灌南县",
              "id": "320724"
            }
          ]
        },
        {
          "value": "淮安市",
          "id": "060140",
          "childs": [
            {
              "value": "淮安区",
              "id": "320803"
            },
            {
              "value": "淮阴区",
              "id": "320804"
            },
            {
              "value": "清江浦区",
              "id": "320812"
            },
            {
              "value": "洪泽区",
              "id": "320813"
            },
            {
              "value": "涟水县",
              "id": "320826"
            },
            {
              "value": "盱眙县",
              "id": "320830"
            },
            {
              "value": "金湖县",
              "id": "320831"
            }
          ]
        },
        {
          "value": "盐城市",
          "id": "060150",
          "childs": [
            {
              "value": "亭湖区",
              "id": "320902"
            },
            {
              "value": "盐都区",
              "id": "320903"
            },
            {
              "value": "大丰区",
              "id": "320904"
            },
            {
              "value": "响水县",
              "id": "320921"
            },
            {
              "value": "滨海县",
              "id": "320922"
            },
            {
              "value": "阜宁县",
              "id": "320923"
            },
            {
              "value": "射阳县",
              "id": "320924"
            },
            {
              "value": "建湖县",
              "id": "320925"
            },
            {
              "value": "东台市",
              "id": "320981"
            }
          ]
        },
        {
          "value": "扬州市",
          "id": "060120",
          "childs": [
            {
              "value": "广陵区",
              "id": "321002"
            },
            {
              "value": "邗江区",
              "id": "321003"
            },
            {
              "value": "江都区",
              "id": "321012"
            },
            {
              "value": "宝应县",
              "id": "321023"
            },
            {
              "value": "仪征市",
              "id": "321081"
            },
            {
              "value": "高邮市",
              "id": "321084"
            }
          ]
        },
        {
          "value": "镇江市",
          "id": "060130",
          "childs": [
            {
              "value": "京口区",
              "id": "321102"
            },
            {
              "value": "润州区",
              "id": "321111"
            },
            {
              "value": "丹徒区",
              "id": "321112"
            },
            {
              "value": "丹阳市",
              "id": "321181"
            },
            {
              "value": "扬中市",
              "id": "321182"
            },
            {
              "value": "句容市",
              "id": "321183"
            }
          ]
        },
        {
          "value": "泰州市",
          "id": "060160",
          "childs": [
            {
              "value": "海陵区",
              "id": "321202"
            },
            {
              "value": "高港区",
              "id": "321203"
            },
            {
              "value": "姜堰区",
              "id": "321204"
            },
            {
              "value": "兴化市",
              "id": "321281"
            },
            {
              "value": "靖江市",
              "id": "321282"
            },
            {
              "value": "泰兴市",
              "id": "321283"
            }
          ]
        },
        {
          "value": "宿迁市",
          "id": "060170",
          "childs": [
            {
              "value": "宿城区",
              "id": "321302"
            },
            {
              "value": "宿豫区",
              "id": "321311"
            },
            {
              "value": "沭阳县",
              "id": "321322"
            },
            {
              "value": "泗阳县",
              "id": "321323"
            },
            {
              "value": "泗洪县",
              "id": "321324"
            }
          ]
        }
      ]
    },
    {
      "value": "浙江省",
      "id": "070",
      "childs": [
        {
          "value": "杭州市",
          "id": "070020",
          "childs": [
            {
              "value": "上城区",
              "id": "330102"
            },
            {
              "value": "下城区",
              "id": "330103"
            },
            {
              "value": "江干区",
              "id": "330104"
            },
            {
              "value": "拱墅区",
              "id": "330105"
            },
            {
              "value": "西湖区",
              "id": "330106"
            },
            {
              "value": "滨江区",
              "id": "330108"
            },
            {
              "value": "萧山区",
              "id": "330109"
            },
            {
              "value": "余杭区",
              "id": "330110"
            },
            {
              "value": "富阳区",
              "id": "330111"
            },
            {
              "value": "桐庐县",
              "id": "330122"
            },
            {
              "value": "淳安县",
              "id": "330127"
            },
            {
              "value": "建德市",
              "id": "330182"
            },
            {
              "value": "临安市",
              "id": "330185"
            }
          ]
        },
        {
          "value": "宁波市",
          "id": "070030",
          "childs": [
            {
              "value": "海曙区",
              "id": "330203"
            },
            {
              "value": "江东区",
              "id": "330204"
            },
            {
              "value": "江北区",
              "id": "330205"
            },
            {
              "value": "北仑区",
              "id": "330206"
            },
            {
              "value": "镇海区",
              "id": "330211"
            },
            {
              "value": "鄞州区",
              "id": "330212"
            },
            {
              "value": "象山县",
              "id": "330225"
            },
            {
              "value": "宁海县",
              "id": "330226"
            },
            {
              "value": "余姚市",
              "id": "330281"
            },
            {
              "value": "慈溪市",
              "id": "330282"
            },
            {
              "value": "奉化市",
              "id": "330283"
            }
          ]
        },
        {
          "value": "温州市",
          "id": "070040",
          "childs": [
            {
              "value": "鹿城区",
              "id": "330302"
            },
            {
              "value": "龙湾区",
              "id": "330303"
            },
            {
              "value": "瓯海区",
              "id": "330304"
            },
            {
              "value": "洞头区",
              "id": "330305"
            },
            {
              "value": "永嘉县",
              "id": "330324"
            },
            {
              "value": "平阳县",
              "id": "330326"
            },
            {
              "value": "苍南县",
              "id": "330327"
            },
            {
              "value": "文成县",
              "id": "330328"
            },
            {
              "value": "泰顺县",
              "id": "330329"
            },
            {
              "value": "瑞安市",
              "id": "330381"
            },
            {
              "value": "乐清市",
              "id": "330382"
            }
          ]
        },
        {
          "value": "嘉兴市",
          "id": "070090",
          "childs": [
            {
              "value": "南湖区",
              "id": "330402"
            },
            {
              "value": "秀洲区",
              "id": "330411"
            },
            {
              "value": "嘉善县",
              "id": "330421"
            },
            {
              "value": "海盐县",
              "id": "330424"
            },
            {
              "value": "海宁市",
              "id": "330481"
            },
            {
              "value": "平湖市",
              "id": "330482"
            },
            {
              "value": "桐乡市",
              "id": "330483"
            }
          ]
        },
        {
          "value": "湖州市",
          "id": "070080",
          "childs": [
            {
              "value": "吴兴区",
              "id": "330502"
            },
            {
              "value": "南浔区",
              "id": "330503"
            },
            {
              "value": "德清县",
              "id": "330521"
            },
            {
              "value": "长兴县",
              "id": "330522"
            },
            {
              "value": "安吉县",
              "id": "330523"
            }
          ]
        },
        {
          "value": "绍兴市",
          "id": "070050",
          "childs": [
            {
              "value": "越城区",
              "id": "330602"
            },
            {
              "value": "柯桥区",
              "id": "330603"
            },
            {
              "value": "上虞区",
              "id": "330604"
            },
            {
              "value": "新昌县",
              "id": "330624"
            },
            {
              "value": "诸暨市",
              "id": "330681"
            },
            {
              "value": "嵊州市",
              "id": "330683"
            }
          ]
        },
        {
          "value": "金华市",
          "id": "070060",
          "childs": [
            {
              "value": "婺城区",
              "id": "330702"
            },
            {
              "value": "金东区",
              "id": "330703"
            },
            {
              "value": "武义县",
              "id": "330723"
            },
            {
              "value": "浦江县",
              "id": "330726"
            },
            {
              "value": "磐安县",
              "id": "330727"
            },
            {
              "value": "兰溪市",
              "id": "330781"
            },
            {
              "value": "义乌市",
              "id": "330782"
            },
            {
              "value": "东阳市",
              "id": "330783"
            },
            {
              "value": "永康市",
              "id": "330784"
            }
          ]
        },
        {
          "value": "衢州市",
          "id": "070100",
          "childs": [
            {
              "value": "柯城区",
              "id": "330802"
            },
            {
              "value": "衢江区",
              "id": "330803"
            },
            {
              "value": "常山县",
              "id": "330822"
            },
            {
              "value": "开化县",
              "id": "330824"
            },
            {
              "value": "龙游县",
              "id": "330825"
            },
            {
              "value": "江山市",
              "id": "330881"
            }
          ]
        },
        {
          "value": "舟山市",
          "id": "070120",
          "childs": [
            {
              "value": "定海区",
              "id": "330902"
            },
            {
              "value": "普陀区",
              "id": "330903"
            },
            {
              "value": "岱山县",
              "id": "330921"
            },
            {
              "value": "嵊泗县",
              "id": "330922"
            }
          ]
        },
        {
          "value": "台州市",
          "id": "070070",
          "childs": [
            {
              "value": "椒江区",
              "id": "331002"
            },
            {
              "value": "黄岩区",
              "id": "331003"
            },
            {
              "value": "路桥区",
              "id": "331004"
            },
            {
              "value": "玉环县",
              "id": "331021"
            },
            {
              "value": "三门县",
              "id": "331022"
            },
            {
              "value": "天台县",
              "id": "331023"
            },
            {
              "value": "仙居县",
              "id": "331024"
            },
            {
              "value": "温岭市",
              "id": "331081"
            },
            {
              "value": "临海市",
              "id": "331082"
            }
          ]
        },
        {
          "value": "丽水市",
          "id": "070110",
          "childs": [
            {
              "value": "莲都区",
              "id": "331102"
            },
            {
              "value": "青田县",
              "id": "331121"
            },
            {
              "value": "缙云县",
              "id": "331122"
            },
            {
              "value": "遂昌县",
              "id": "331123"
            },
            {
              "value": "松阳县",
              "id": "331124"
            },
            {
              "value": "云和县",
              "id": "331125"
            },
            {
              "value": "庆元县",
              "id": "331126"
            },
            {
              "value": "景宁畲族自治县",
              "id": "331127"
            },
            {
              "value": "龙泉市",
              "id": "331181"
            }
          ]
        }
      ]
    },
    {
      "value": "安徽省",
      "id": "080",
      "childs": [
        {
          "value": "合肥市",
          "id": "080020",
          "childs": [
            {
              "value": "瑶海区",
              "id": "340102"
            },
            {
              "value": "庐阳区",
              "id": "340103"
            },
            {
              "value": "蜀山区",
              "id": "340104"
            },
            {
              "value": "包河区",
              "id": "340111"
            },
            {
              "value": "长丰县",
              "id": "340121"
            },
            {
              "value": "肥东县",
              "id": "340122"
            },
            {
              "value": "肥西县",
              "id": "340123"
            },
            {
              "value": "庐江县",
              "id": "340124"
            },
            {
              "value": "巢湖市",
              "id": "340181"
            }
          ]
        },
        {
          "value": "芜湖市",
          "id": "080050",
          "childs": [
            {
              "value": "镜湖区",
              "id": "340202"
            },
            {
              "value": "弋江区",
              "id": "340203"
            },
            {
              "value": "鸠江区",
              "id": "340207"
            },
            {
              "value": "三山区",
              "id": "340208"
            },
            {
              "value": "芜湖县",
              "id": "340221"
            },
            {
              "value": "繁昌县",
              "id": "340222"
            },
            {
              "value": "南陵县",
              "id": "340223"
            },
            {
              "value": "无为县",
              "id": "340225"
            }
          ]
        },
        {
          "value": "蚌埠市",
          "id": "080040",
          "childs": [
            {
              "value": "龙子湖区",
              "id": "340302"
            },
            {
              "value": "蚌山区",
              "id": "340303"
            },
            {
              "value": "禹会区",
              "id": "340304"
            },
            {
              "value": "淮上区",
              "id": "340311"
            },
            {
              "value": "怀远县",
              "id": "340321"
            },
            {
              "value": "五河县",
              "id": "340322"
            },
            {
              "value": "固镇县",
              "id": "340323"
            }
          ]
        },
        {
          "value": "淮南市",
          "id": "080060",
          "childs": [
            {
              "value": "大通区",
              "id": "340402"
            },
            {
              "value": "田家庵区",
              "id": "340403"
            },
            {
              "value": "谢家集区",
              "id": "340404"
            },
            {
              "value": "八公山区",
              "id": "340405"
            },
            {
              "value": "潘集区",
              "id": "340406"
            },
            {
              "value": "凤台县",
              "id": "340421"
            },
            {
              "value": "寿县",
              "id": "340422"
            }
          ]
        },
        {
          "value": "马鞍山市",
          "id": "080070",
          "childs": [
            {
              "value": "花山区",
              "id": "340503"
            },
            {
              "value": "雨山区",
              "id": "340504"
            },
            {
              "value": "博望区",
              "id": "340506"
            },
            {
              "value": "当涂县",
              "id": "340521"
            },
            {
              "value": "含山县",
              "id": "340522"
            },
            {
              "value": "和县",
              "id": "340523"
            }
          ]
        },
        {
          "value": "淮北市",
          "id": "080080",
          "childs": [
            {
              "value": "杜集区",
              "id": "340602"
            },
            {
              "value": "相山区",
              "id": "340603"
            },
            {
              "value": "烈山区",
              "id": "340604"
            },
            {
              "value": "濉溪县",
              "id": "340621"
            }
          ]
        },
        {
          "value": "铜陵市",
          "id": "080090",
          "childs": [
            {
              "value": "铜官区",
              "id": "340705"
            },
            {
              "value": "义安区",
              "id": "340706"
            },
            {
              "value": "郊区",
              "id": "340711"
            },
            {
              "value": "枞阳县",
              "id": "340722"
            }
          ]
        },
        {
          "value": "安庆市",
          "id": "080030",
          "childs": [
            {
              "value": "迎江区",
              "id": "340802"
            },
            {
              "value": "大观区",
              "id": "340803"
            },
            {
              "value": "宜秀区",
              "id": "340811"
            },
            {
              "value": "怀宁县",
              "id": "340822"
            },
            {
              "value": "潜山县",
              "id": "340824"
            },
            {
              "value": "太湖县",
              "id": "340825"
            },
            {
              "value": "宿松县",
              "id": "340826"
            },
            {
              "value": "望江县",
              "id": "340827"
            },
            {
              "value": "岳西县",
              "id": "340828"
            },
            {
              "value": "桐城市",
              "id": "340881"
            }
          ]
        },
        {
          "value": "黄山市",
          "id": "080100",
          "childs": [
            {
              "value": "屯溪区",
              "id": "341002"
            },
            {
              "value": "黄山区",
              "id": "341003"
            },
            {
              "value": "徽州区",
              "id": "341004"
            },
            {
              "value": "歙县",
              "id": "341021"
            },
            {
              "value": "休宁县",
              "id": "341022"
            },
            {
              "value": "黟县",
              "id": "341023"
            },
            {
              "value": "祁门县",
              "id": "341024"
            }
          ]
        },
        {
          "value": "滁州市",
          "id": "080110",
          "childs": [
            {
              "value": "琅琊区",
              "id": "341102"
            },
            {
              "value": "南谯区",
              "id": "341103"
            },
            {
              "value": "来安县",
              "id": "341122"
            },
            {
              "value": "全椒县",
              "id": "341124"
            },
            {
              "value": "定远县",
              "id": "341125"
            },
            {
              "value": "凤阳县",
              "id": "341126"
            },
            {
              "value": "天长市",
              "id": "341181"
            },
            {
              "value": "明光市",
              "id": "341182"
            }
          ]
        },
        {
          "value": "阜阳市",
          "id": "080120",
          "childs": [
            {
              "value": "颍州区",
              "id": "341202"
            },
            {
              "value": "颍东区",
              "id": "341203"
            },
            {
              "value": "颍泉区",
              "id": "341204"
            },
            {
              "value": "临泉县",
              "id": "341221"
            },
            {
              "value": "太和县",
              "id": "341222"
            },
            {
              "value": "阜南县",
              "id": "341225"
            },
            {
              "value": "颍上县",
              "id": "341226"
            },
            {
              "value": "界首市",
              "id": "341282"
            }
          ]
        },
        {
          "value": "宿州市",
          "id": "080130",
          "childs": [
            {
              "value": "埇桥区",
              "id": "341302"
            },
            {
              "value": "砀山县",
              "id": "341321"
            },
            {
              "value": "萧县",
              "id": "341322"
            },
            {
              "value": "灵璧县",
              "id": "341323"
            },
            {
              "value": "泗县",
              "id": "341324"
            }
          ]
        },
        {
          "value": "六安市",
          "id": "080140",
          "childs": [
            {
              "value": "金安区",
              "id": "341502"
            },
            {
              "value": "裕安区",
              "id": "341503"
            },
            {
              "value": "叶集区",
              "id": "341504"
            },
            {
              "value": "霍邱县",
              "id": "341522"
            },
            {
              "value": "舒城县",
              "id": "341523"
            },
            {
              "value": "金寨县",
              "id": "341524"
            },
            {
              "value": "霍山县",
              "id": "341525"
            }
          ]
        },
        {
          "value": "亳州市",
          "id": "080150",
          "childs": [
            {
              "value": "谯城区",
              "id": "341602"
            },
            {
              "value": "涡阳县",
              "id": "341621"
            },
            {
              "value": "蒙城县",
              "id": "341622"
            },
            {
              "value": "利辛县",
              "id": "341623"
            }
          ]
        },
        {
          "value": "池州市",
          "id": "080160",
          "childs": [
            {
              "value": "贵池区",
              "id": "341702"
            },
            {
              "value": "东至县",
              "id": "341721"
            },
            {
              "value": "石台县",
              "id": "341722"
            },
            {
              "value": "青阳县",
              "id": "341723"
            }
          ]
        },
        {
          "value": "宣城市",
          "id": "080170",
          "childs": [
            {
              "value": "宣州区",
              "id": "341802"
            },
            {
              "value": "郎溪县",
              "id": "341821"
            },
            {
              "value": "广德县",
              "id": "341822"
            },
            {
              "value": "泾县",
              "id": "341823"
            },
            {
              "value": "绩溪县",
              "id": "341824"
            },
            {
              "value": "旌德县",
              "id": "341825"
            },
            {
              "value": "宁国市",
              "id": "341881"
            }
          ]
        }
      ]
    },
    {
      "value": "福建省",
      "id": "090",
      "childs": [
        {
          "value": "福州市",
          "id": "090020",
          "childs": [
            {
              "value": "鼓楼区",
              "id": "350102"
            },
            {
              "value": "台江区",
              "id": "350103"
            },
            {
              "value": "仓山区",
              "id": "350104"
            },
            {
              "value": "马尾区",
              "id": "350105"
            },
            {
              "value": "晋安区",
              "id": "350111"
            },
            {
              "value": "闽侯县",
              "id": "350121"
            },
            {
              "value": "连江县",
              "id": "350122"
            },
            {
              "value": "罗源县",
              "id": "350123"
            },
            {
              "value": "闽清县",
              "id": "350124"
            },
            {
              "value": "永泰县",
              "id": "350125"
            },
            {
              "value": "平潭县",
              "id": "350128"
            },
            {
              "value": "福清市",
              "id": "350181"
            },
            {
              "value": "长乐市",
              "id": "350182"
            }
          ]
        },
        {
          "value": "厦门市",
          "id": "090040",
          "childs": [
            {
              "value": "思明区",
              "id": "350203"
            },
            {
              "value": "海沧区",
              "id": "350205"
            },
            {
              "value": "湖里区",
              "id": "350206"
            },
            {
              "value": "集美区",
              "id": "350211"
            },
            {
              "value": "同安区",
              "id": "350212"
            },
            {
              "value": "翔安区",
              "id": "350213"
            }
          ]
        },
        {
          "value": "莆田市",
          "id": "090060",
          "childs": [
            {
              "value": "城厢区",
              "id": "350302"
            },
            {
              "value": "涵江区",
              "id": "350303"
            },
            {
              "value": "荔城区",
              "id": "350304"
            },
            {
              "value": "秀屿区",
              "id": "350305"
            },
            {
              "value": "仙游县",
              "id": "350322"
            }
          ]
        },
        {
          "value": "三明市",
          "id": "090070",
          "childs": [
            {
              "value": "梅列区",
              "id": "350402"
            },
            {
              "value": "三元区",
              "id": "350403"
            },
            {
              "value": "明溪县",
              "id": "350421"
            },
            {
              "value": "清流县",
              "id": "350423"
            },
            {
              "value": "宁化县",
              "id": "350424"
            },
            {
              "value": "大田县",
              "id": "350425"
            },
            {
              "value": "尤溪县",
              "id": "350426"
            },
            {
              "value": "沙县",
              "id": "350427"
            },
            {
              "value": "将乐县",
              "id": "350428"
            },
            {
              "value": "泰宁县",
              "id": "350429"
            },
            {
              "value": "建宁县",
              "id": "350430"
            },
            {
              "value": "永安市",
              "id": "350481"
            }
          ]
        },
        {
          "value": "泉州市",
          "id": "090030",
          "childs": [
            {
              "value": "鲤城区",
              "id": "350502"
            },
            {
              "value": "丰泽区",
              "id": "350503"
            },
            {
              "value": "洛江区",
              "id": "350504"
            },
            {
              "value": "泉港区",
              "id": "350505"
            },
            {
              "value": "惠安县",
              "id": "350521"
            },
            {
              "value": "安溪县",
              "id": "350524"
            },
            {
              "value": "永春县",
              "id": "350525"
            },
            {
              "value": "德化县",
              "id": "350526"
            },
            {
              "value": "金门县",
              "id": "350527"
            },
            {
              "value": "石狮市",
              "id": "350581"
            },
            {
              "value": "晋江市",
              "id": "350582"
            },
            {
              "value": "南安市",
              "id": "350583"
            }
          ]
        },
        {
          "value": "漳州市",
          "id": "090050",
          "childs": [
            {
              "value": "芗城区",
              "id": "350602"
            },
            {
              "value": "龙文区",
              "id": "350603"
            },
            {
              "value": "云霄县",
              "id": "350622"
            },
            {
              "value": "漳浦县",
              "id": "350623"
            },
            {
              "value": "诏安县",
              "id": "350624"
            },
            {
              "value": "长泰县",
              "id": "350625"
            },
            {
              "value": "东山县",
              "id": "350626"
            },
            {
              "value": "南靖县",
              "id": "350627"
            },
            {
              "value": "平和县",
              "id": "350628"
            },
            {
              "value": "华安县",
              "id": "350629"
            },
            {
              "value": "龙海市",
              "id": "350681"
            }
          ]
        },
        {
          "value": "南平市",
          "id": "090080",
          "childs": [
            {
              "value": "延平区",
              "id": "350702"
            },
            {
              "value": "建阳区",
              "id": "350703"
            },
            {
              "value": "顺昌县",
              "id": "350721"
            },
            {
              "value": "浦城县",
              "id": "350722"
            },
            {
              "value": "光泽县",
              "id": "350723"
            },
            {
              "value": "松溪县",
              "id": "350724"
            },
            {
              "value": "政和县",
              "id": "350725"
            },
            {
              "value": "邵武市",
              "id": "350781"
            },
            {
              "value": "武夷山市",
              "id": "350782"
            },
            {
              "value": "建瓯市",
              "id": "350783"
            }
          ]
        },
        {
          "value": "龙岩市",
          "id": "090090",
          "childs": [
            {
              "value": "新罗区",
              "id": "350802"
            },
            {
              "value": "永定区",
              "id": "350803"
            },
            {
              "value": "长汀县",
              "id": "350821"
            },
            {
              "value": "上杭县",
              "id": "350823"
            },
            {
              "value": "武平县",
              "id": "350824"
            },
            {
              "value": "连城县",
              "id": "350825"
            },
            {
              "value": "漳平市",
              "id": "350881"
            }
          ]
        },
        {
          "value": "宁德市",
          "id": "090100",
          "childs": [
            {
              "value": "蕉城区",
              "id": "350902"
            },
            {
              "value": "霞浦县",
              "id": "350921"
            },
            {
              "value": "古田县",
              "id": "350922"
            },
            {
              "value": "屏南县",
              "id": "350923"
            },
            {
              "value": "寿宁县",
              "id": "350924"
            },
            {
              "value": "周宁县",
              "id": "350925"
            },
            {
              "value": "柘荣县",
              "id": "350926"
            },
            {
              "value": "福安市",
              "id": "350981"
            },
            {
              "value": "福鼎市",
              "id": "350982"
            }
          ]
        }
      ]
    },
    {
      "value": "江西省",
      "id": "200",
      "childs": [
        {
          "value": "南昌市",
          "id": "200020",
          "childs": [
            {
              "value": "东湖区",
              "id": "360102"
            },
            {
              "value": "西湖区",
              "id": "360103"
            },
            {
              "value": "青云谱区",
              "id": "360104"
            },
            {
              "value": "湾里区",
              "id": "360105"
            },
            {
              "value": "青山湖区",
              "id": "360111"
            },
            {
              "value": "新建区",
              "id": "360112"
            },
            {
              "value": "南昌县",
              "id": "360121"
            },
            {
              "value": "安义县",
              "id": "360123"
            },
            {
              "value": "进贤县",
              "id": "360124"
            }
          ]
        },
        {
          "value": "景德镇市",
          "id": "200090",
          "childs": [
            {
              "value": "昌江区",
              "id": "360202"
            },
            {
              "value": "珠山区",
              "id": "360203"
            },
            {
              "value": "浮梁县",
              "id": "360222"
            },
            {
              "value": "乐平市",
              "id": "360281"
            }
          ]
        },
        {
          "value": "萍乡市",
          "id": "200100",
          "childs": [
            {
              "value": "安源区",
              "id": "360302"
            },
            {
              "value": "湘东区",
              "id": "360313"
            },
            {
              "value": "莲花县",
              "id": "360321"
            },
            {
              "value": "上栗县",
              "id": "360322"
            },
            {
              "value": "芦溪县",
              "id": "360323"
            }
          ]
        },
        {
          "value": "九江市",
          "id": "200030",
          "childs": [
            {
              "value": "濂溪区",
              "id": "360402"
            },
            {
              "value": "浔阳区",
              "id": "360403"
            },
            {
              "value": "九江县",
              "id": "360421"
            },
            {
              "value": "武宁县",
              "id": "360423"
            },
            {
              "value": "修水县",
              "id": "360424"
            },
            {
              "value": "永修县",
              "id": "360425"
            },
            {
              "value": "德安县",
              "id": "360426"
            },
            {
              "value": "都昌县",
              "id": "360428"
            },
            {
              "value": "湖口县",
              "id": "360429"
            },
            {
              "value": "彭泽县",
              "id": "360430"
            },
            {
              "value": "瑞昌市",
              "id": "360481"
            },
            {
              "value": "共青城市",
              "id": "360482"
            },
            {
              "value": "庐山市",
              "id": "360483"
            }
          ]
        },
        {
          "value": "新余市",
          "id": "200110",
          "childs": [
            {
              "value": "渝水区",
              "id": "360502"
            },
            {
              "value": "分宜县",
              "id": "360521"
            }
          ]
        },
        {
          "value": "鹰潭市",
          "id": "200120",
          "childs": [
            {
              "value": "月湖区",
              "id": "360602"
            },
            {
              "value": "余江县",
              "id": "360622"
            },
            {
              "value": "贵溪市",
              "id": "360681"
            }
          ]
        },
        {
          "value": "赣州市",
          "id": "200040",
          "childs": [
            {
              "value": "章贡区",
              "id": "360702"
            },
            {
              "value": "南康区",
              "id": "360703"
            },
            {
              "value": "赣县",
              "id": "360721"
            },
            {
              "value": "信丰县",
              "id": "360722"
            },
            {
              "value": "大余县",
              "id": "360723"
            },
            {
              "value": "上犹县",
              "id": "360724"
            },
            {
              "value": "崇义县",
              "id": "360725"
            },
            {
              "value": "安远县",
              "id": "360726"
            },
            {
              "value": "龙南县",
              "id": "360727"
            },
            {
              "value": "定南县",
              "id": "360728"
            },
            {
              "value": "全南县",
              "id": "360729"
            },
            {
              "value": "宁都县",
              "id": "360730"
            },
            {
              "value": "于都县",
              "id": "360731"
            },
            {
              "value": "兴国县",
              "id": "360732"
            },
            {
              "value": "会昌县",
              "id": "360733"
            },
            {
              "value": "寻乌县",
              "id": "360734"
            },
            {
              "value": "石城县",
              "id": "360735"
            },
            {
              "value": "瑞金市",
              "id": "360781"
            }
          ]
        },
        {
          "value": "吉安市",
          "id": "200060",
          "childs": [
            {
              "value": "吉州区",
              "id": "360802"
            },
            {
              "value": "青原区",
              "id": "360803"
            },
            {
              "value": "吉安县",
              "id": "360821"
            },
            {
              "value": "吉水县",
              "id": "360822"
            },
            {
              "value": "峡江县",
              "id": "360823"
            },
            {
              "value": "新干县",
              "id": "360824"
            },
            {
              "value": "永丰县",
              "id": "360825"
            },
            {
              "value": "泰和县",
              "id": "360826"
            },
            {
              "value": "遂川县",
              "id": "360827"
            },
            {
              "value": "万安县",
              "id": "360828"
            },
            {
              "value": "安福县",
              "id": "360829"
            },
            {
              "value": "永新县",
              "id": "360830"
            },
            {
              "value": "井冈山市",
              "id": "360881"
            }
          ]
        },
        {
          "value": "宜春市",
          "id": "200050",
          "childs": [
            {
              "value": "袁州区",
              "id": "360902"
            },
            {
              "value": "奉新县",
              "id": "360921"
            },
            {
              "value": "万载县",
              "id": "360922"
            },
            {
              "value": "上高县",
              "id": "360923"
            },
            {
              "value": "宜丰县",
              "id": "360924"
            },
            {
              "value": "靖安县",
              "id": "360925"
            },
            {
              "value": "铜鼓县",
              "id": "360926"
            },
            {
              "value": "丰城市",
              "id": "360981"
            },
            {
              "value": "樟树市",
              "id": "360982"
            },
            {
              "value": "高安市",
              "id": "360983"
            }
          ]
        },
        {
          "value": "抚州市",
          "id": "200080",
          "childs": [
            {
              "value": "临川区",
              "id": "361002"
            },
            {
              "value": "南城县",
              "id": "361021"
            },
            {
              "value": "黎川县",
              "id": "361022"
            },
            {
              "value": "南丰县",
              "id": "361023"
            },
            {
              "value": "崇仁县",
              "id": "361024"
            },
            {
              "value": "乐安县",
              "id": "361025"
            },
            {
              "value": "宜黄县",
              "id": "361026"
            },
            {
              "value": "金溪县",
              "id": "361027"
            },
            {
              "value": "资溪县",
              "id": "361028"
            },
            {
              "value": "东乡县",
              "id": "361029"
            },
            {
              "value": "广昌县",
              "id": "361030"
            }
          ]
        },
        {
          "value": "上饶市",
          "id": "200070",
          "childs": [
            {
              "value": "信州区",
              "id": "361102"
            },
            {
              "value": "广丰区",
              "id": "361103"
            },
            {
              "value": "上饶县",
              "id": "361121"
            },
            {
              "value": "玉山县",
              "id": "361123"
            },
            {
              "value": "铅山县",
              "id": "361124"
            },
            {
              "value": "横峰县",
              "id": "361125"
            },
            {
              "value": "弋阳县",
              "id": "361126"
            },
            {
              "value": "余干县",
              "id": "361127"
            },
            {
              "value": "鄱阳县",
              "id": "361128"
            },
            {
              "value": "万年县",
              "id": "361129"
            },
            {
              "value": "婺源县",
              "id": "361130"
            },
            {
              "value": "德兴市",
              "id": "361181"
            }
          ]
        }
      ]
    },
    {
      "value": "山东省",
      "id": "250",
      "childs": [
        {
          "value": "济南市",
          "id": "250020",
          "childs": [
            {
              "value": "历下区",
              "id": "370102"
            },
            {
              "value": "市中区",
              "id": "370103"
            },
            {
              "value": "槐荫区",
              "id": "370104"
            },
            {
              "value": "天桥区",
              "id": "370105"
            },
            {
              "value": "历城区",
              "id": "370112"
            },
            {
              "value": "长清区",
              "id": "370113"
            },
            {
              "value": "平阴县",
              "id": "370124"
            },
            {
              "value": "济阳县",
              "id": "370125"
            },
            {
              "value": "商河县",
              "id": "370126"
            },
            {
              "value": "章丘市",
              "id": "370181"
            }
          ]
        },
        {
          "value": "青岛市",
          "id": "250070",
          "childs": [
            {
              "value": "市南区",
              "id": "370202"
            },
            {
              "value": "市北区",
              "id": "370203"
            },
            {
              "value": "黄岛区",
              "id": "370211"
            },
            {
              "value": "崂山区",
              "id": "370212"
            },
            {
              "value": "李沧区",
              "id": "370213"
            },
            {
              "value": "城阳区",
              "id": "370214"
            },
            {
              "value": "胶州市",
              "id": "370281"
            },
            {
              "value": "即墨市",
              "id": "370282"
            },
            {
              "value": "平度市",
              "id": "370283"
            },
            {
              "value": "莱西市",
              "id": "370285"
            }
          ]
        },
        {
          "value": "淄博市",
          "id": "250130",
          "childs": [
            {
              "value": "淄川区",
              "id": "370302"
            },
            {
              "value": "张店区",
              "id": "370303"
            },
            {
              "value": "博山区",
              "id": "370304"
            },
            {
              "value": "临淄区",
              "id": "370305"
            },
            {
              "value": "周村区",
              "id": "370306"
            },
            {
              "value": "桓台县",
              "id": "370321"
            },
            {
              "value": "高青县",
              "id": "370322"
            },
            {
              "value": "沂源县",
              "id": "370323"
            }
          ]
        },
        {
          "value": "枣庄市",
          "id": "250140",
          "childs": [
            {
              "value": "市中区",
              "id": "370402"
            },
            {
              "value": "薛城区",
              "id": "370403"
            },
            {
              "value": "峄城区",
              "id": "370404"
            },
            {
              "value": "台儿庄区",
              "id": "370405"
            },
            {
              "value": "山亭区",
              "id": "370406"
            },
            {
              "value": "滕州市",
              "id": "370481"
            }
          ]
        },
        {
          "value": "东营市",
          "id": "250040",
          "childs": [
            {
              "value": "东营区",
              "id": "370502"
            },
            {
              "value": "河口区",
              "id": "370503"
            },
            {
              "value": "垦利区",
              "id": "370505"
            },
            {
              "value": "利津县",
              "id": "370522"
            },
            {
              "value": "广饶县",
              "id": "370523"
            }
          ]
        },
        {
          "value": "烟台市",
          "id": "250120",
          "childs": [
            {
              "value": "芝罘区",
              "id": "370602"
            },
            {
              "value": "福山区",
              "id": "370611"
            },
            {
              "value": "牟平区",
              "id": "370612"
            },
            {
              "value": "莱山区",
              "id": "370613"
            },
            {
              "value": "长岛县",
              "id": "370634"
            },
            {
              "value": "龙口市",
              "id": "370681"
            },
            {
              "value": "莱阳市",
              "id": "370682"
            },
            {
              "value": "莱州市",
              "id": "370683"
            },
            {
              "value": "蓬莱市",
              "id": "370684"
            },
            {
              "value": "招远市",
              "id": "370685"
            },
            {
              "value": "栖霞市",
              "id": "370686"
            },
            {
              "value": "海阳市",
              "id": "370687"
            }
          ]
        },
        {
          "value": "潍坊市",
          "id": "250110",
          "childs": [
            {
              "value": "潍城区",
              "id": "370702"
            },
            {
              "value": "寒亭区",
              "id": "370703"
            },
            {
              "value": "坊子区",
              "id": "370704"
            },
            {
              "value": "奎文区",
              "id": "370705"
            },
            {
              "value": "临朐县",
              "id": "370724"
            },
            {
              "value": "昌乐县",
              "id": "370725"
            },
            {
              "value": "青州市",
              "id": "370781"
            },
            {
              "value": "诸城市",
              "id": "370782"
            },
            {
              "value": "寿光市",
              "id": "370783"
            },
            {
              "value": "安丘市",
              "id": "370784"
            },
            {
              "value": "高密市",
              "id": "370785"
            },
            {
              "value": "昌邑市",
              "id": "370786"
            }
          ]
        },
        {
          "value": "济宁市",
          "id": "250050",
          "childs": [
            {
              "value": "任城区",
              "id": "370811"
            },
            {
              "value": "兖州区",
              "id": "370812"
            },
            {
              "value": "微山县",
              "id": "370826"
            },
            {
              "value": "鱼台县",
              "id": "370827"
            },
            {
              "value": "金乡县",
              "id": "370828"
            },
            {
              "value": "嘉祥县",
              "id": "370829"
            },
            {
              "value": "汶上县",
              "id": "370830"
            },
            {
              "value": "泗水县",
              "id": "370831"
            },
            {
              "value": "梁山县",
              "id": "370832"
            },
            {
              "value": "曲阜市",
              "id": "370881"
            },
            {
              "value": "邹城市",
              "id": "370883"
            }
          ]
        },
        {
          "value": "泰安市",
          "id": "250090",
          "childs": [
            {
              "value": "泰山区",
              "id": "370902"
            },
            {
              "value": "岱岳区",
              "id": "370911"
            },
            {
              "value": "宁阳县",
              "id": "370921"
            },
            {
              "value": "东平县",
              "id": "370923"
            },
            {
              "value": "新泰市",
              "id": "370982"
            },
            {
              "value": "肥城市",
              "id": "370983"
            }
          ]
        },
        {
          "value": "威海市",
          "id": "250100",
          "childs": [
            {
              "value": "环翠区",
              "id": "371002"
            },
            {
              "value": "文登区",
              "id": "371003"
            },
            {
              "value": "荣成市",
              "id": "371082"
            },
            {
              "value": "乳山市",
              "id": "371083"
            }
          ]
        },
        {
          "value": "日照市",
          "id": "250080",
          "childs": [
            {
              "value": "东港区",
              "id": "371102"
            },
            {
              "value": "岚山区",
              "id": "371103"
            },
            {
              "value": "五莲县",
              "id": "371121"
            },
            {
              "value": "莒县",
              "id": "371122"
            }
          ]
        },
        {
          "value": "莱芜市",
          "id": "250180",
          "childs": [
            {
              "value": "莱城区",
              "id": "371202"
            },
            {
              "value": "钢城区",
              "id": "371203"
            }
          ]
        },
        {
          "value": "临沂市",
          "id": "250060",
          "childs": [
            {
              "value": "兰山区",
              "id": "371302"
            },
            {
              "value": "罗庄区",
              "id": "371311"
            },
            {
              "value": "河东区",
              "id": "371312"
            },
            {
              "value": "沂南县",
              "id": "371321"
            },
            {
              "value": "郯城县",
              "id": "371322"
            },
            {
              "value": "沂水县",
              "id": "371323"
            },
            {
              "value": "兰陵县",
              "id": "371324"
            },
            {
              "value": "费县",
              "id": "371325"
            },
            {
              "value": "平邑县",
              "id": "371326"
            },
            {
              "value": "莒南县",
              "id": "371327"
            },
            {
              "value": "蒙阴县",
              "id": "371328"
            },
            {
              "value": "临沭县",
              "id": "371329"
            }
          ]
        },
        {
          "value": "德州市",
          "id": "250030",
          "childs": [
            {
              "value": "德城区",
              "id": "371402"
            },
            {
              "value": "陵城区",
              "id": "371403"
            },
            {
              "value": "宁津县",
              "id": "371422"
            },
            {
              "value": "庆云县",
              "id": "371423"
            },
            {
              "value": "临邑县",
              "id": "371424"
            },
            {
              "value": "齐河县",
              "id": "371425"
            },
            {
              "value": "平原县",
              "id": "371426"
            },
            {
              "value": "夏津县",
              "id": "371427"
            },
            {
              "value": "武城县",
              "id": "371428"
            },
            {
              "value": "乐陵市",
              "id": "371481"
            },
            {
              "value": "禹城市",
              "id": "371482"
            }
          ]
        },
        {
          "value": "聊城市",
          "id": "250160",
          "childs": [
            {
              "value": "东昌府区",
              "id": "371502"
            },
            {
              "value": "阳谷县",
              "id": "371521"
            },
            {
              "value": "莘县",
              "id": "371522"
            },
            {
              "value": "茌平县",
              "id": "371523"
            },
            {
              "value": "东阿县",
              "id": "371524"
            },
            {
              "value": "冠县",
              "id": "371525"
            },
            {
              "value": "高唐县",
              "id": "371526"
            },
            {
              "value": "临清市",
              "id": "371581"
            }
          ]
        },
        {
          "value": "滨州市",
          "id": "250150",
          "childs": [
            {
              "value": "滨城区",
              "id": "371602"
            },
            {
              "value": "沾化区",
              "id": "371603"
            },
            {
              "value": "惠民县",
              "id": "371621"
            },
            {
              "value": "阳信县",
              "id": "371622"
            },
            {
              "value": "无棣县",
              "id": "371623"
            },
            {
              "value": "博兴县",
              "id": "371625"
            },
            {
              "value": "邹平县",
              "id": "371626"
            }
          ]
        },
        {
          "value": "菏泽市",
          "id": "250170",
          "childs": [
            {
              "value": "牡丹区",
              "id": "371702"
            },
            {
              "value": "定陶区",
              "id": "371703"
            },
            {
              "value": "曹县",
              "id": "371721"
            },
            {
              "value": "单县",
              "id": "371722"
            },
            {
              "value": "成武县",
              "id": "371723"
            },
            {
              "value": "巨野县",
              "id": "371724"
            },
            {
              "value": "郓城县",
              "id": "371725"
            },
            {
              "value": "鄄城县",
              "id": "371726"
            },
            {
              "value": "东明县",
              "id": "371728"
            }
          ]
        }
      ]
    },
    {
      "value": "河南省",
      "id": "150",
      "childs": [
        {
          "value": "郑州市",
          "id": "150020",
          "childs": [
            {
              "value": "中原区",
              "id": "410102"
            },
            {
              "value": "二七区",
              "id": "410103"
            },
            {
              "value": "管城回族区",
              "id": "410104"
            },
            {
              "value": "金水区",
              "id": "410105"
            },
            {
              "value": "上街区",
              "id": "410106"
            },
            {
              "value": "惠济区",
              "id": "410108"
            },
            {
              "value": "中牟县",
              "id": "410122"
            },
            {
              "value": "巩义市",
              "id": "410181"
            },
            {
              "value": "荥阳市",
              "id": "410182"
            },
            {
              "value": "新密市",
              "id": "410183"
            },
            {
              "value": "新郑市",
              "id": "410184"
            },
            {
              "value": "登封市",
              "id": "410185"
            }
          ]
        },
        {
          "value": "开封市",
          "id": "150030",
          "childs": [
            {
              "value": "龙亭区",
              "id": "410202"
            },
            {
              "value": "顺河回族区",
              "id": "410203"
            },
            {
              "value": "鼓楼区",
              "id": "410204"
            },
            {
              "value": "禹王台区",
              "id": "410205"
            },
            {
              "value": "金明区",
              "id": "410211"
            },
            {
              "value": "祥符区",
              "id": "410212"
            },
            {
              "value": "杞县",
              "id": "410221"
            },
            {
              "value": "通许县",
              "id": "410222"
            },
            {
              "value": "尉氏县",
              "id": "410223"
            },
            {
              "value": "兰考县",
              "id": "410225"
            }
          ]
        },
        {
          "value": "洛阳市",
          "id": "150040",
          "childs": [
            {
              "value": "老城区",
              "id": "410302"
            },
            {
              "value": "西工区",
              "id": "410303"
            },
            {
              "value": "瀍河回族区",
              "id": "410304"
            },
            {
              "value": "涧西区",
              "id": "410305"
            },
            {
              "value": "吉利区",
              "id": "410306"
            },
            {
              "value": "洛龙区",
              "id": "410311"
            },
            {
              "value": "孟津县",
              "id": "410322"
            },
            {
              "value": "新安县",
              "id": "410323"
            },
            {
              "value": "栾川县",
              "id": "410324"
            },
            {
              "value": "嵩县",
              "id": "410325"
            },
            {
              "value": "汝阳县",
              "id": "410326"
            },
            {
              "value": "宜阳县",
              "id": "410327"
            },
            {
              "value": "洛宁县",
              "id": "410328"
            },
            {
              "value": "伊川县",
              "id": "410329"
            },
            {
              "value": "偃师市",
              "id": "410381"
            }
          ]
        },
        {
          "value": "平顶山市",
          "id": "150070",
          "childs": [
            {
              "value": "新华区",
              "id": "410402"
            },
            {
              "value": "卫东区",
              "id": "410403"
            },
            {
              "value": "石龙区",
              "id": "410404"
            },
            {
              "value": "湛河区",
              "id": "410411"
            },
            {
              "value": "宝丰县",
              "id": "410421"
            },
            {
              "value": "叶县",
              "id": "410422"
            },
            {
              "value": "鲁山县",
              "id": "410423"
            },
            {
              "value": "郏县",
              "id": "410425"
            },
            {
              "value": "舞钢市",
              "id": "410481"
            },
            {
              "value": "汝州市",
              "id": "410482"
            }
          ]
        },
        {
          "value": "安阳市",
          "id": "150060",
          "childs": [
            {
              "value": "文峰区",
              "id": "410502"
            },
            {
              "value": "北关区",
              "id": "410503"
            },
            {
              "value": "殷都区",
              "id": "410505"
            },
            {
              "value": "龙安区",
              "id": "410506"
            },
            {
              "value": "安阳县",
              "id": "410522"
            },
            {
              "value": "汤阴县",
              "id": "410523"
            },
            {
              "value": "滑县",
              "id": "410526"
            },
            {
              "value": "内黄县",
              "id": "410527"
            },
            {
              "value": "林州市",
              "id": "410581"
            }
          ]
        },
        {
          "value": "鹤壁市",
          "id": "150140",
          "childs": [
            {
              "value": "鹤山区",
              "id": "410602"
            },
            {
              "value": "山城区",
              "id": "410603"
            },
            {
              "value": "淇滨区",
              "id": "410611"
            },
            {
              "value": "浚县",
              "id": "410621"
            },
            {
              "value": "淇县",
              "id": "410622"
            }
          ]
        },
        {
          "value": "新乡市",
          "id": "150080",
          "childs": [
            {
              "value": "红旗区",
              "id": "410702"
            },
            {
              "value": "卫滨区",
              "id": "410703"
            },
            {
              "value": "凤泉区",
              "id": "410704"
            },
            {
              "value": "牧野区",
              "id": "410711"
            },
            {
              "value": "新乡县",
              "id": "410721"
            },
            {
              "value": "获嘉县",
              "id": "410724"
            },
            {
              "value": "原阳县",
              "id": "410725"
            },
            {
              "value": "延津县",
              "id": "410726"
            },
            {
              "value": "封丘县",
              "id": "410727"
            },
            {
              "value": "长垣县",
              "id": "410728"
            },
            {
              "value": "卫辉市",
              "id": "410781"
            },
            {
              "value": "辉县市",
              "id": "410782"
            }
          ]
        },
        {
          "value": "焦作市",
          "id": "150090",
          "childs": [
            {
              "value": "解放区",
              "id": "410802"
            },
            {
              "value": "中站区",
              "id": "410803"
            },
            {
              "value": "马村区",
              "id": "410804"
            },
            {
              "value": "山阳区",
              "id": "410811"
            },
            {
              "value": "修武县",
              "id": "410821"
            },
            {
              "value": "博爱县",
              "id": "410822"
            },
            {
              "value": "武陟县",
              "id": "410823"
            },
            {
              "value": "温县",
              "id": "410825"
            },
            {
              "value": "沁阳市",
              "id": "410882"
            },
            {
              "value": "孟州市",
              "id": "410883"
            }
          ]
        },
        {
          "value": "濮阳市",
          "id": "150100",
          "childs": [
            {
              "value": "华龙区",
              "id": "410902"
            },
            {
              "value": "清丰县",
              "id": "410922"
            },
            {
              "value": "南乐县",
              "id": "410923"
            },
            {
              "value": "范县",
              "id": "410926"
            },
            {
              "value": "台前县",
              "id": "410927"
            },
            {
              "value": "濮阳县",
              "id": "410928"
            }
          ]
        },
        {
          "value": "许昌市",
          "id": "150110",
          "childs": [
            {
              "value": "魏都区",
              "id": "411002"
            },
            {
              "value": "许昌县",
              "id": "411023"
            },
            {
              "value": "鄢陵县",
              "id": "411024"
            },
            {
              "value": "襄城县",
              "id": "411025"
            },
            {
              "value": "禹州市",
              "id": "411081"
            },
            {
              "value": "长葛市",
              "id": "411082"
            }
          ]
        },
        {
          "value": "漯河市",
          "id": "150120",
          "childs": [
            {
              "value": "源汇区",
              "id": "411102"
            },
            {
              "value": "郾城区",
              "id": "411103"
            },
            {
              "value": "召陵区",
              "id": "411104"
            },
            {
              "value": "舞阳县",
              "id": "411121"
            },
            {
              "value": "临颍县",
              "id": "411122"
            }
          ]
        },
        {
          "value": "三门峡市",
          "id": "150130",
          "childs": [
            {
              "value": "湖滨区",
              "id": "411202"
            },
            {
              "value": "陕州区",
              "id": "411203"
            },
            {
              "value": "渑池县",
              "id": "411221"
            },
            {
              "value": "卢氏县",
              "id": "411224"
            },
            {
              "value": "义马市",
              "id": "411281"
            },
            {
              "value": "灵宝市",
              "id": "411282"
            }
          ]
        },
        {
          "value": "南阳市",
          "id": "150170",
          "childs": [
            {
              "value": "宛城区",
              "id": "411302"
            },
            {
              "value": "卧龙区",
              "id": "411303"
            },
            {
              "value": "南召县",
              "id": "411321"
            },
            {
              "value": "方城县",
              "id": "411322"
            },
            {
              "value": "西峡县",
              "id": "411323"
            },
            {
              "value": "镇平县",
              "id": "411324"
            },
            {
              "value": "内乡县",
              "id": "411325"
            },
            {
              "value": "淅川县",
              "id": "411326"
            },
            {
              "value": "社旗县",
              "id": "411327"
            },
            {
              "value": "唐河县",
              "id": "411328"
            },
            {
              "value": "新野县",
              "id": "411329"
            },
            {
              "value": "桐柏县",
              "id": "411330"
            },
            {
              "value": "邓州市",
              "id": "411381"
            }
          ]
        },
        {
          "value": "商丘市",
          "id": "150050",
          "childs": [
            {
              "value": "梁园区",
              "id": "411402"
            },
            {
              "value": "睢阳区",
              "id": "411403"
            },
            {
              "value": "民权县",
              "id": "411421"
            },
            {
              "value": "睢县",
              "id": "411422"
            },
            {
              "value": "宁陵县",
              "id": "411423"
            },
            {
              "value": "柘城县",
              "id": "411424"
            },
            {
              "value": "虞城县",
              "id": "411425"
            },
            {
              "value": "夏邑县",
              "id": "411426"
            },
            {
              "value": "永城市",
              "id": "411481"
            }
          ]
        },
        {
          "value": "信阳市",
          "id": "150180",
          "childs": [
            {
              "value": "浉河区",
              "id": "411502"
            },
            {
              "value": "平桥区",
              "id": "411503"
            },
            {
              "value": "罗山县",
              "id": "411521"
            },
            {
              "value": "光山县",
              "id": "411522"
            },
            {
              "value": "新县",
              "id": "411523"
            },
            {
              "value": "商城县",
              "id": "411524"
            },
            {
              "value": "固始县",
              "id": "411525"
            },
            {
              "value": "潢川县",
              "id": "411526"
            },
            {
              "value": "淮滨县",
              "id": "411527"
            },
            {
              "value": "息县",
              "id": "411528"
            }
          ]
        },
        {
          "value": "周口市",
          "id": "150150",
          "childs": [
            {
              "value": "川汇区",
              "id": "411602"
            },
            {
              "value": "扶沟县",
              "id": "411621"
            },
            {
              "value": "西华县",
              "id": "411622"
            },
            {
              "value": "商水县",
              "id": "411623"
            },
            {
              "value": "沈丘县",
              "id": "411624"
            },
            {
              "value": "郸城县",
              "id": "411625"
            },
            {
              "value": "淮阳县",
              "id": "411626"
            },
            {
              "value": "太康县",
              "id": "411627"
            },
            {
              "value": "鹿邑县",
              "id": "411628"
            },
            {
              "value": "项城市",
              "id": "411681"
            }
          ]
        },
        {
          "value": "驻马店市",
          "id": "150160",
          "childs": [
            {
              "value": "驿城区",
              "id": "411702"
            },
            {
              "value": "西平县",
              "id": "411721"
            },
            {
              "value": "上蔡县",
              "id": "411722"
            },
            {
              "value": "平舆县",
              "id": "411723"
            },
            {
              "value": "正阳县",
              "id": "411724"
            },
            {
              "value": "确山县",
              "id": "411725"
            },
            {
              "value": "泌阳县",
              "id": "411726"
            },
            {
              "value": "汝南县",
              "id": "411727"
            },
            {
              "value": "遂平县",
              "id": "411728"
            },
            {
              "value": "新蔡县",
              "id": "411729"
            }
          ]
        },
        {
          "value": "省直辖县级行政区划",
          "id": "419000",
          "childs": [{
            "value": "济源市",
            "id": "150190"
          }]
        }
      ]
    },
    {
      "value": "湖北省",
      "id": "170",
      "childs": [
        {
          "value": "武汉市",
          "id": "170020",
          "childs": [
            {
              "value": "江岸区",
              "id": "420102"
            },
            {
              "value": "江汉区",
              "id": "420103"
            },
            {
              "value": "硚口区",
              "id": "420104"
            },
            {
              "value": "汉阳区",
              "id": "420105"
            },
            {
              "value": "武昌区",
              "id": "420106"
            },
            {
              "value": "青山区",
              "id": "420107"
            },
            {
              "value": "洪山区",
              "id": "420111"
            },
            {
              "value": "东西湖区",
              "id": "420112"
            },
            {
              "value": "汉南区",
              "id": "420113"
            },
            {
              "value": "蔡甸区",
              "id": "420114"
            },
            {
              "value": "江夏区",
              "id": "420115"
            },
            {
              "value": "黄陂区",
              "id": "420116"
            },
            {
              "value": "新洲区",
              "id": "420117"
            }
          ]
        },
        {
          "value": "黄石市",
          "id": "170090",
          "childs": [
            {
              "value": "黄石港区",
              "id": "420202"
            },
            {
              "value": "西塞山区",
              "id": "420203"
            },
            {
              "value": "下陆区",
              "id": "420204"
            },
            {
              "value": "铁山区",
              "id": "420205"
            },
            {
              "value": "阳新县",
              "id": "420222"
            },
            {
              "value": "大冶市",
              "id": "420281"
            }
          ]
        },
        {
          "value": "十堰市",
          "id": "170030",
          "childs": [
            {
              "value": "茅箭区",
              "id": "420302"
            },
            {
              "value": "张湾区",
              "id": "420303"
            },
            {
              "value": "郧阳区",
              "id": "420304"
            },
            {
              "value": "郧西县",
              "id": "420322"
            },
            {
              "value": "竹山县",
              "id": "420323"
            },
            {
              "value": "竹溪县",
              "id": "420324"
            },
            {
              "value": "房县",
              "id": "420325"
            },
            {
              "value": "丹江口市",
              "id": "420381"
            }
          ]
        },
        {
          "value": "宜昌市",
          "id": "170050",
          "childs": [
            {
              "value": "西陵区",
              "id": "420502"
            },
            {
              "value": "伍家岗区",
              "id": "420503"
            },
            {
              "value": "点军区",
              "id": "420504"
            },
            {
              "value": "猇亭区",
              "id": "420505"
            },
            {
              "value": "夷陵区",
              "id": "420506"
            },
            {
              "value": "远安县",
              "id": "420525"
            },
            {
              "value": "兴山县",
              "id": "420526"
            },
            {
              "value": "秭归县",
              "id": "420527"
            },
            {
              "value": "长阳土家族自治县",
              "id": "420528"
            },
            {
              "value": "五峰土家族自治县",
              "id": "420529"
            },
            {
              "value": "宜都市",
              "id": "420581"
            },
            {
              "value": "当阳市",
              "id": "420582"
            },
            {
              "value": "枝江市",
              "id": "420583"
            }
          ]
        },
        {
          "value": "襄阳市",
          "id": "170040",
          "childs": [
            {
              "value": "襄城区",
              "id": "420602"
            },
            {
              "value": "樊城区",
              "id": "420606"
            },
            {
              "value": "襄州区",
              "id": "420607"
            },
            {
              "value": "南漳县",
              "id": "420624"
            },
            {
              "value": "谷城县",
              "id": "420625"
            },
            {
              "value": "保康县",
              "id": "420626"
            },
            {
              "value": "老河口市",
              "id": "420682"
            },
            {
              "value": "枣阳市",
              "id": "420683"
            },
            {
              "value": "宜城市",
              "id": "420684"
            }
          ]
        },
        {
          "value": "鄂州市",
          "id": "170100",
          "childs": [
            {
              "value": "梁子湖区",
              "id": "420702"
            },
            {
              "value": "华容区",
              "id": "420703"
            },
            {
              "value": "鄂城区",
              "id": "420704"
            }
          ]
        },
        {
          "value": "荆门市",
          "id": "170070",
          "childs": [
            {
              "value": "东宝区",
              "id": "420802"
            },
            {
              "value": "掇刀区",
              "id": "420804"
            },
            {
              "value": "京山县",
              "id": "420821"
            },
            {
              "value": "沙洋县",
              "id": "420822"
            },
            {
              "value": "钟祥市",
              "id": "420881"
            }
          ]
        },
        {
          "value": "孝感市",
          "id": "170120",
          "childs": [
            {
              "value": "孝南区",
              "id": "420902"
            },
            {
              "value": "孝昌县",
              "id": "420921"
            },
            {
              "value": "大悟县",
              "id": "420922"
            },
            {
              "value": "云梦县",
              "id": "420923"
            },
            {
              "value": "应城市",
              "id": "420981"
            },
            {
              "value": "安陆市",
              "id": "420982"
            },
            {
              "value": "汉川市",
              "id": "420984"
            }
          ]
        },
        {
          "value": "荆州市",
          "id": "170080",
          "childs": [
            {
              "value": "沙市区",
              "id": "421002"
            },
            {
              "value": "荆州区",
              "id": "421003"
            },
            {
              "value": "公安县",
              "id": "421022"
            },
            {
              "value": "监利县",
              "id": "421023"
            },
            {
              "value": "江陵县",
              "id": "421024"
            },
            {
              "value": "石首市",
              "id": "421081"
            },
            {
              "value": "洪湖市",
              "id": "421083"
            },
            {
              "value": "松滋市",
              "id": "421087"
            }
          ]
        },
        {
          "value": "黄冈市",
          "id": "170110",
          "childs": [
            {
              "value": "黄州区",
              "id": "421102"
            },
            {
              "value": "团风县",
              "id": "421121"
            },
            {
              "value": "红安县",
              "id": "421122"
            },
            {
              "value": "罗田县",
              "id": "421123"
            },
            {
              "value": "英山县",
              "id": "421124"
            },
            {
              "value": "浠水县",
              "id": "421125"
            },
            {
              "value": "蕲春县",
              "id": "421126"
            },
            {
              "value": "黄梅县",
              "id": "421127"
            },
            {
              "value": "麻城市",
              "id": "421181"
            },
            {
              "value": "武穴市",
              "id": "421182"
            }
          ]
        },
        {
          "value": "咸宁市",
          "id": "170130",
          "childs": [
            {
              "value": "咸安区",
              "id": "421202"
            },
            {
              "value": "嘉鱼县",
              "id": "421221"
            },
            {
              "value": "通城县",
              "id": "421222"
            },
            {
              "value": "崇阳县",
              "id": "421223"
            },
            {
              "value": "通山县",
              "id": "421224"
            },
            {
              "value": "赤壁市",
              "id": "421281"
            }
          ]
        },
        {
          "value": "随州市",
          "id": "170140",
          "childs": [
            {
              "value": "曾都区",
              "id": "421303"
            },
            {
              "value": "随县",
              "id": "421321"
            },
            {
              "value": "广水市",
              "id": "421381"
            }
          ]
        },
        {
          "value": "恩施土家族苗族自治州",
          "id": "170180",
          "childs": [
            {
              "value": "恩施市",
              "id": "422801"
            },
            {
              "value": "利川市",
              "id": "422802"
            },
            {
              "value": "建始县",
              "id": "422822"
            },
            {
              "value": "巴东县",
              "id": "422823"
            },
            {
              "value": "宣恩县",
              "id": "422825"
            },
            {
              "value": "咸丰县",
              "id": "422826"
            },
            {
              "value": "来凤县",
              "id": "422827"
            },
            {
              "value": "鹤峰县",
              "id": "422828"
            }
          ]
        },
        {
          "value": "省直辖县级行政区划",
          "id": "429000",
          "childs": [
            {
              "value": "仙桃市",
              "id": "170150"
            },
            {
              "value": "潜江市",
              "id": "170060"
            },
            {
              "value": "天门市",
              "id": "170160"
            },
            {
              "value": "神农架林区",
              "id": "170170"
            }
          ]
        }
      ]
    },
    {
      "value": "湖南省",
      "id": "180",
      "childs": [
        {
          "value": "长沙市",
          "id": "180020",
          "childs": [
            {
              "value": "芙蓉区",
              "id": "430102"
            },
            {
              "value": "天心区",
              "id": "430103"
            },
            {
              "value": "岳麓区",
              "id": "430104"
            },
            {
              "value": "开福区",
              "id": "430105"
            },
            {
              "value": "雨花区",
              "id": "430111"
            },
            {
              "value": "望城区",
              "id": "430112"
            },
            {
              "value": "长沙县",
              "id": "430121"
            },
            {
              "value": "宁乡县",
              "id": "430124"
            },
            {
              "value": "浏阳市",
              "id": "430181"
            }
          ]
        },
        {
          "value": "株洲市",
          "id": "180040",
          "childs": [
            {
              "value": "荷塘区",
              "id": "430202"
            },
            {
              "value": "芦淞区",
              "id": "430203"
            },
            {
              "value": "石峰区",
              "id": "430204"
            },
            {
              "value": "天元区",
              "id": "430211"
            },
            {
              "value": "株洲县",
              "id": "430221"
            },
            {
              "value": "攸县",
              "id": "430223"
            },
            {
              "value": "茶陵县",
              "id": "430224"
            },
            {
              "value": "炎陵县",
              "id": "430225"
            },
            {
              "value": "醴陵市",
              "id": "430281"
            }
          ]
        },
        {
          "value": "湘潭市",
          "id": "180030",
          "childs": [
            {
              "value": "雨湖区",
              "id": "430302"
            },
            {
              "value": "岳塘区",
              "id": "430304"
            },
            {
              "value": "湘潭县",
              "id": "430321"
            },
            {
              "value": "湘乡市",
              "id": "430381"
            },
            {
              "value": "韶山市",
              "id": "430382"
            }
          ]
        },
        {
          "value": "衡阳市",
          "id": "180060",
          "childs": [
            {
              "value": "珠晖区",
              "id": "430405"
            },
            {
              "value": "雁峰区",
              "id": "430406"
            },
            {
              "value": "石鼓区",
              "id": "430407"
            },
            {
              "value": "蒸湘区",
              "id": "430408"
            },
            {
              "value": "南岳区",
              "id": "430412"
            },
            {
              "value": "衡阳县",
              "id": "430421"
            },
            {
              "value": "衡南县",
              "id": "430422"
            },
            {
              "value": "衡山县",
              "id": "430423"
            },
            {
              "value": "衡东县",
              "id": "430424"
            },
            {
              "value": "祁东县",
              "id": "430426"
            },
            {
              "value": "耒阳市",
              "id": "430481"
            },
            {
              "value": "常宁市",
              "id": "430482"
            }
          ]
        },
        {
          "value": "邵阳市",
          "id": "180100",
          "childs": [
            {
              "value": "双清区",
              "id": "430502"
            },
            {
              "value": "大祥区",
              "id": "430503"
            },
            {
              "value": "北塔区",
              "id": "430511"
            },
            {
              "value": "邵东县",
              "id": "430521"
            },
            {
              "value": "新邵县",
              "id": "430522"
            },
            {
              "value": "邵阳县",
              "id": "430523"
            },
            {
              "value": "隆回县",
              "id": "430524"
            },
            {
              "value": "洞口县",
              "id": "430525"
            },
            {
              "value": "绥宁县",
              "id": "430527"
            },
            {
              "value": "新宁县",
              "id": "430528"
            },
            {
              "value": "城步苗族自治县",
              "id": "430529"
            },
            {
              "value": "武冈市",
              "id": "430581"
            }
          ]
        },
        {
          "value": "岳阳市",
          "id": "180090",
          "childs": [
            {
              "value": "岳阳楼区",
              "id": "430602"
            },
            {
              "value": "云溪区",
              "id": "430603"
            },
            {
              "value": "君山区",
              "id": "430611"
            },
            {
              "value": "岳阳县",
              "id": "430621"
            },
            {
              "value": "华容县",
              "id": "430623"
            },
            {
              "value": "湘阴县",
              "id": "430624"
            },
            {
              "value": "平江县",
              "id": "430626"
            },
            {
              "value": "汨罗市",
              "id": "430681"
            },
            {
              "value": "临湘市",
              "id": "430682"
            }
          ]
        },
        {
          "value": "常德市",
          "id": "180050",
          "childs": [
            {
              "value": "武陵区",
              "id": "430702"
            },
            {
              "value": "鼎城区",
              "id": "430703"
            },
            {
              "value": "安乡县",
              "id": "430721"
            },
            {
              "value": "汉寿县",
              "id": "430722"
            },
            {
              "value": "澧县",
              "id": "430723"
            },
            {
              "value": "临澧县",
              "id": "430724"
            },
            {
              "value": "桃源县",
              "id": "430725"
            },
            {
              "value": "石门县",
              "id": "430726"
            },
            {
              "value": "津市市",
              "id": "430781"
            }
          ]
        },
        {
          "value": "张家界市",
          "id": "180110",
          "childs": [
            {
              "value": "永定区",
              "id": "430802"
            },
            {
              "value": "武陵源区",
              "id": "430811"
            },
            {
              "value": "慈利县",
              "id": "430821"
            },
            {
              "value": "桑植县",
              "id": "430822"
            }
          ]
        },
        {
          "value": "益阳市",
          "id": "180070",
          "childs": [
            {
              "value": "资阳区",
              "id": "430902"
            },
            {
              "value": "赫山区",
              "id": "430903"
            },
            {
              "value": "南县",
              "id": "430921"
            },
            {
              "value": "桃江县",
              "id": "430922"
            },
            {
              "value": "安化县",
              "id": "430923"
            },
            {
              "value": "沅江市",
              "id": "430981"
            }
          ]
        },
        {
          "value": "郴州市",
          "id": "180080",
          "childs": [
            {
              "value": "北湖区",
              "id": "431002"
            },
            {
              "value": "苏仙区",
              "id": "431003"
            },
            {
              "value": "桂阳县",
              "id": "431021"
            },
            {
              "value": "宜章县",
              "id": "431022"
            },
            {
              "value": "永兴县",
              "id": "431023"
            },
            {
              "value": "嘉禾县",
              "id": "431024"
            },
            {
              "value": "临武县",
              "id": "431025"
            },
            {
              "value": "汝城县",
              "id": "431026"
            },
            {
              "value": "桂东县",
              "id": "431027"
            },
            {
              "value": "安仁县",
              "id": "431028"
            },
            {
              "value": "资兴市",
              "id": "431081"
            }
          ]
        },
        {
          "value": "永州市",
          "id": "180130",
          "childs": [
            {
              "value": "零陵区",
              "id": "431102"
            },
            {
              "value": "冷水滩区",
              "id": "431103"
            },
            {
              "value": "祁阳县",
              "id": "431121"
            },
            {
              "value": "东安县",
              "id": "431122"
            },
            {
              "value": "双牌县",
              "id": "431123"
            },
            {
              "value": "道县",
              "id": "431124"
            },
            {
              "value": "江永县",
              "id": "431125"
            },
            {
              "value": "宁远县",
              "id": "431126"
            },
            {
              "value": "蓝山县",
              "id": "431127"
            },
            {
              "value": "新田县",
              "id": "431128"
            },
            {
              "value": "江华瑶族自治县",
              "id": "431129"
            }
          ]
        },
        {
          "value": "怀化市",
          "id": "180140",
          "childs": [
            {
              "value": "鹤城区",
              "id": "431202"
            },
            {
              "value": "中方县",
              "id": "431221"
            },
            {
              "value": "沅陵县",
              "id": "431222"
            },
            {
              "value": "辰溪县",
              "id": "431223"
            },
            {
              "value": "溆浦县",
              "id": "431224"
            },
            {
              "value": "会同县",
              "id": "431225"
            },
            {
              "value": "麻阳苗族自治县",
              "id": "431226"
            },
            {
              "value": "新晃侗族自治县",
              "id": "431227"
            },
            {
              "value": "芷江侗族自治县",
              "id": "431228"
            },
            {
              "value": "靖州苗族侗族自治县",
              "id": "431229"
            },
            {
              "value": "通道侗族自治县",
              "id": "431230"
            },
            {
              "value": "洪江市",
              "id": "431281"
            }
          ]
        },
        {
          "value": "娄底市",
          "id": "180120",
          "childs": [
            {
              "value": "娄星区",
              "id": "431302"
            },
            {
              "value": "双峰县",
              "id": "431321"
            },
            {
              "value": "新化县",
              "id": "431322"
            },
            {
              "value": "冷水江市",
              "id": "431381"
            },
            {
              "value": "涟源市",
              "id": "431382"
            }
          ]
        },
        {
          "value": "湘西土家族苗族自治州",
          "id": "180150",
          "childs": [
            {
              "value": "吉首市",
              "id": "433101"
            },
            {
              "value": "泸溪县",
              "id": "433122"
            },
            {
              "value": "凤凰县",
              "id": "433123"
            },
            {
              "value": "花垣县",
              "id": "433124"
            },
            {
              "value": "保靖县",
              "id": "433125"
            },
            {
              "value": "古丈县",
              "id": "433126"
            },
            {
              "value": "永顺县",
              "id": "433127"
            },
            {
              "value": "龙山县",
              "id": "433130"
            }
          ]
        }
      ]
    },
    {
      "value": "广东省",
      "id": "050",
      "childs": [
        {
          "value": "广州市",
          "id": "050020",
          "childs": [
            {
              "value": "荔湾区",
              "id": "440103"
            },
            {
              "value": "越秀区",
              "id": "440104"
            },
            {
              "value": "海珠区",
              "id": "440105"
            },
            {
              "value": "天河区",
              "id": "440106"
            },
            {
              "value": "白云区",
              "id": "440111"
            },
            {
              "value": "黄埔区",
              "id": "440112"
            },
            {
              "value": "番禺区",
              "id": "440113"
            },
            {
              "value": "花都区",
              "id": "440114"
            },
            {
              "value": "南沙区",
              "id": "440115"
            },
            {
              "value": "从化区",
              "id": "440117"
            },
            {
              "value": "增城区",
              "id": "440118"
            }
          ]
        },
        {
          "value": "韶关市",
          "id": "050170",
          "childs": [
            {
              "value": "武江区",
              "id": "440203"
            },
            {
              "value": "浈江区",
              "id": "440204"
            },
            {
              "value": "曲江区",
              "id": "440205"
            },
            {
              "value": "始兴县",
              "id": "440222"
            },
            {
              "value": "仁化县",
              "id": "440224"
            },
            {
              "value": "翁源县",
              "id": "440229"
            },
            {
              "value": "乳源瑶族自治县",
              "id": "440232"
            },
            {
              "value": "新丰县",
              "id": "440233"
            },
            {
              "value": "乐昌市",
              "id": "440281"
            },
            {
              "value": "南雄市",
              "id": "440282"
            }
          ]
        },
        {
          "value": "深圳市",
          "id": "050090",
          "childs": [
            {
              "value": "罗湖区",
              "id": "440303"
            },
            {
              "value": "福田区",
              "id": "440304"
            },
            {
              "value": "南山区",
              "id": "440305"
            },
            {
              "value": "宝安区",
              "id": "440306"
            },
            {
              "value": "龙岗区",
              "id": "440307"
            },
            {
              "value": "盐田区",
              "id": "440308"
            }
          ]
        },
        {
          "value": "珠海市",
          "id": "050140",
          "childs": [
            {
              "value": "香洲区",
              "id": "440402"
            },
            {
              "value": "斗门区",
              "id": "440403"
            },
            {
              "value": "金湾区",
              "id": "440404"
            }
          ]
        },
        {
          "value": "汕头市",
          "id": "050080",
          "childs": [
            {
              "value": "龙湖区",
              "id": "440507"
            },
            {
              "value": "金平区",
              "id": "440511"
            },
            {
              "value": "濠江区",
              "id": "440512"
            },
            {
              "value": "潮阳区",
              "id": "440513"
            },
            {
              "value": "潮南区",
              "id": "440514"
            },
            {
              "value": "澄海区",
              "id": "440515"
            },
            {
              "value": "南澳县",
              "id": "440523"
            }
          ]
        },
        {
          "value": "佛山市",
          "id": "050050",
          "childs": [
            {
              "value": "禅城区",
              "id": "440604"
            },
            {
              "value": "南海区",
              "id": "440605"
            },
            {
              "value": "顺德区",
              "id": "440606"
            },
            {
              "value": "三水区",
              "id": "440607"
            },
            {
              "value": "高明区",
              "id": "440608"
            }
          ]
        },
        {
          "value": "江门市",
          "id": "050150",
          "childs": [
            {
              "value": "蓬江区",
              "id": "440703"
            },
            {
              "value": "江海区",
              "id": "440704"
            },
            {
              "value": "新会区",
              "id": "440705"
            },
            {
              "value": "台山市",
              "id": "440781"
            },
            {
              "value": "开平市",
              "id": "440783"
            },
            {
              "value": "鹤山市",
              "id": "440784"
            },
            {
              "value": "恩平市",
              "id": "440785"
            }
          ]
        },
        {
          "value": "湛江市",
          "id": "050110",
          "childs": [
            {
              "value": "赤坎区",
              "id": "440802"
            },
            {
              "value": "霞山区",
              "id": "440803"
            },
            {
              "value": "坡头区",
              "id": "440804"
            },
            {
              "value": "麻章区",
              "id": "440811"
            },
            {
              "value": "遂溪县",
              "id": "440823"
            },
            {
              "value": "徐闻县",
              "id": "440825"
            },
            {
              "value": "廉江市",
              "id": "440881"
            },
            {
              "value": "雷州市",
              "id": "440882"
            },
            {
              "value": "吴川市",
              "id": "440883"
            }
          ]
        },
        {
          "value": "茂名市",
          "id": "050180",
          "childs": [
            {
              "value": "茂南区",
              "id": "440902"
            },
            {
              "value": "电白区",
              "id": "440904"
            },
            {
              "value": "高州市",
              "id": "440981"
            },
            {
              "value": "化州市",
              "id": "440982"
            },
            {
              "value": "信宜市",
              "id": "440983"
            }
          ]
        },
        {
          "value": "肇庆市",
          "id": "050120",
          "childs": [
            {
              "value": "端州区",
              "id": "441202"
            },
            {
              "value": "鼎湖区",
              "id": "441203"
            },
            {
              "value": "高要区",
              "id": "441204"
            },
            {
              "value": "广宁县",
              "id": "441223"
            },
            {
              "value": "怀集县",
              "id": "441224"
            },
            {
              "value": "封开县",
              "id": "441225"
            },
            {
              "value": "德庆县",
              "id": "441226"
            },
            {
              "value": "四会市",
              "id": "441284"
            }
          ]
        },
        {
          "value": "惠州市",
          "id": "050060",
          "childs": [
            {
              "value": "惠城区",
              "id": "441302"
            },
            {
              "value": "惠阳区",
              "id": "441303"
            },
            {
              "value": "博罗县",
              "id": "441322"
            },
            {
              "value": "惠东县",
              "id": "441323"
            },
            {
              "value": "龙门县",
              "id": "441324"
            }
          ]
        },
        {
          "value": "梅州市",
          "id": "050190",
          "childs": [
            {
              "value": "梅江区",
              "id": "441402"
            },
            {
              "value": "梅县区",
              "id": "441403"
            },
            {
              "value": "大埔县",
              "id": "441422"
            },
            {
              "value": "丰顺县",
              "id": "441423"
            },
            {
              "value": "五华县",
              "id": "441424"
            },
            {
              "value": "平远县",
              "id": "441426"
            },
            {
              "value": "蕉岭县",
              "id": "441427"
            },
            {
              "value": "兴宁市",
              "id": "441481"
            }
          ]
        },
        {
          "value": "汕尾市",
          "id": "050200",
          "childs": [
            {
              "value": "城区",
              "id": "441502"
            },
            {
              "value": "海丰县",
              "id": "441521"
            },
            {
              "value": "陆河县",
              "id": "441523"
            },
            {
              "value": "陆丰市",
              "id": "441581"
            }
          ]
        },
        {
          "value": "河源市",
          "id": "050210",
          "childs": [
            {
              "value": "源城区",
              "id": "441602"
            },
            {
              "value": "紫金县",
              "id": "441621"
            },
            {
              "value": "龙川县",
              "id": "441622"
            },
            {
              "value": "连平县",
              "id": "441623"
            },
            {
              "value": "和平县",
              "id": "441624"
            },
            {
              "value": "东源县",
              "id": "441625"
            }
          ]
        },
        {
          "value": "阳江市",
          "id": "050160",
          "childs": [
            {
              "value": "江城区",
              "id": "441702"
            },
            {
              "value": "阳东区",
              "id": "441704"
            },
            {
              "value": "阳西县",
              "id": "441721"
            },
            {
              "value": "阳春市",
              "id": "441781"
            }
          ]
        },
        {
          "value": "清远市",
          "id": "050070",
          "childs": [
            {
              "value": "清城区",
              "id": "441802"
            },
            {
              "value": "清新区",
              "id": "441803"
            },
            {
              "value": "佛冈县",
              "id": "441821"
            },
            {
              "value": "阳山县",
              "id": "441823"
            },
            {
              "value": "连山壮族瑶族自治县",
              "id": "441825"
            },
            {
              "value": "连南瑶族自治县",
              "id": "441826"
            },
            {
              "value": "英德市",
              "id": "441881"
            },
            {
              "value": "连州市",
              "id": "441882"
            }
          ]
        },
        {
          "value": "东莞市",
          "id": "050040",
          "childs": []
        },
        {
          "value": "中山市",
          "id": "050130",
          "childs": []
        },
        {
          "value": "潮州市",
          "id": "050030",
          "childs": [
            {
              "value": "湘桥区",
              "id": "445102"
            },
            {
              "value": "潮安区",
              "id": "445103"
            },
            {
              "value": "饶平县",
              "id": "445122"
            }
          ]
        },
        {
          "value": "揭阳市",
          "id": "050220",
          "childs": [
            {
              "value": "榕城区",
              "id": "445202"
            },
            {
              "value": "揭东区",
              "id": "445203"
            },
            {
              "value": "揭西县",
              "id": "445222"
            },
            {
              "value": "惠来县",
              "id": "445224"
            },
            {
              "value": "普宁市",
              "id": "445281"
            }
          ]
        },
        {
          "value": "云浮市",
          "id": "050230",
          "childs": [
            {
              "value": "云城区",
              "id": "445302"
            },
            {
              "value": "云安区",
              "id": "445303"
            },
            {
              "value": "新兴县",
              "id": "445321"
            },
            {
              "value": "郁南县",
              "id": "445322"
            },
            {
              "value": "罗定市",
              "id": "445381"
            }
          ]
        }
      ]
    },
    {
      "value": "广西壮族自治区",
      "id": "110",
      "childs": [
        {
          "value": "南宁市",
          "id": "110020",
          "childs": [
            {
              "value": "兴宁区",
              "id": "450102"
            },
            {
              "value": "青秀区",
              "id": "450103"
            },
            {
              "value": "江南区",
              "id": "450105"
            },
            {
              "value": "西乡塘区",
              "id": "450107"
            },
            {
              "value": "良庆区",
              "id": "450108"
            },
            {
              "value": "邕宁区",
              "id": "450109"
            },
            {
              "value": "武鸣区",
              "id": "450110"
            },
            {
              "value": "隆安县",
              "id": "450123"
            },
            {
              "value": "马山县",
              "id": "450124"
            },
            {
              "value": "上林县",
              "id": "450125"
            },
            {
              "value": "宾阳县",
              "id": "450126"
            },
            {
              "value": "横县",
              "id": "450127"
            }
          ]
        },
        {
          "value": "柳州市",
          "id": "110050",
          "childs": [
            {
              "value": "城中区",
              "id": "450202"
            },
            {
              "value": "鱼峰区",
              "id": "450203"
            },
            {
              "value": "柳南区",
              "id": "450204"
            },
            {
              "value": "柳北区",
              "id": "450205"
            },
            {
              "value": "柳江区",
              "id": "450206"
            },
            {
              "value": "柳城县",
              "id": "450222"
            },
            {
              "value": "鹿寨县",
              "id": "450223"
            },
            {
              "value": "融安县",
              "id": "450224"
            },
            {
              "value": "融水苗族自治县",
              "id": "450225"
            },
            {
              "value": "三江侗族自治县",
              "id": "450226"
            }
          ]
        },
        {
          "value": "桂林市",
          "id": "110040",
          "childs": [
            {
              "value": "秀峰区",
              "id": "450302"
            },
            {
              "value": "叠彩区",
              "id": "450303"
            },
            {
              "value": "象山区",
              "id": "450304"
            },
            {
              "value": "七星区",
              "id": "450305"
            },
            {
              "value": "雁山区",
              "id": "450311"
            },
            {
              "value": "临桂区",
              "id": "450312"
            },
            {
              "value": "阳朔县",
              "id": "450321"
            },
            {
              "value": "灵川县",
              "id": "450323"
            },
            {
              "value": "全州县",
              "id": "450324"
            },
            {
              "value": "兴安县",
              "id": "450325"
            },
            {
              "value": "永福县",
              "id": "450326"
            },
            {
              "value": "灌阳县",
              "id": "450327"
            },
            {
              "value": "龙胜各族自治县",
              "id": "450328"
            },
            {
              "value": "资源县",
              "id": "450329"
            },
            {
              "value": "平乐县",
              "id": "450330"
            },
            {
              "value": "荔浦县",
              "id": "450331"
            },
            {
              "value": "恭城瑶族自治县",
              "id": "450332"
            }
          ]
        },
        {
          "value": "梧州市",
          "id": "110070",
          "childs": [
            {
              "value": "万秀区",
              "id": "450403"
            },
            {
              "value": "长洲区",
              "id": "450405"
            },
            {
              "value": "龙圩区",
              "id": "450406"
            },
            {
              "value": "苍梧县",
              "id": "450421"
            },
            {
              "value": "藤县",
              "id": "450422"
            },
            {
              "value": "蒙山县",
              "id": "450423"
            },
            {
              "value": "岑溪市",
              "id": "450481"
            }
          ]
        },
        {
          "value": "北海市",
          "id": "110030",
          "childs": [
            {
              "value": "海城区",
              "id": "450502"
            },
            {
              "value": "银海区",
              "id": "450503"
            },
            {
              "value": "铁山港区",
              "id": "450512"
            },
            {
              "value": "合浦县",
              "id": "450521"
            }
          ]
        },
        {
          "value": "防城港市",
          "id": "110100",
          "childs": [
            {
              "value": "港口区",
              "id": "450602"
            },
            {
              "value": "防城区",
              "id": "450603"
            },
            {
              "value": "上思县",
              "id": "450621"
            },
            {
              "value": "东兴市",
              "id": "450681"
            }
          ]
        },
        {
          "value": "钦州市",
          "id": "110120",
          "childs": [
            {
              "value": "钦南区",
              "id": "450702"
            },
            {
              "value": "钦北区",
              "id": "450703"
            },
            {
              "value": "灵山县",
              "id": "450721"
            },
            {
              "value": "浦北县",
              "id": "450722"
            }
          ]
        },
        {
          "value": "贵港市",
          "id": "110150",
          "childs": [
            {
              "value": "港北区",
              "id": "450802"
            },
            {
              "value": "港南区",
              "id": "450803"
            },
            {
              "value": "覃塘区",
              "id": "450804"
            },
            {
              "value": "平南县",
              "id": "450821"
            },
            {
              "value": "桂平市",
              "id": "450881"
            }
          ]
        },
        {
          "value": "玉林市",
          "id": "110060110110",
          "childs": [
            {
              "value": "玉州区",
              "id": "450902"
            },
            {
              "value": "福绵区",
              "id": "450903"
            },
            {
              "value": "容县",
              "id": "450921"
            },
            {
              "value": "陆川县",
              "id": "450922"
            },
            {
              "value": "博白县",
              "id": "450923"
            },
            {
              "value": "兴业县",
              "id": "450924"
            },
            {
              "value": "北流市",
              "id": "450981"
            }
          ]
        },
        {
          "value": "百色市",
          "id": "110110",
          "childs": [
            {
              "value": "右江区",
              "id": "451002"
            },
            {
              "value": "田阳县",
              "id": "451021"
            },
            {
              "value": "田东县",
              "id": "451022"
            },
            {
              "value": "平果县",
              "id": "451023"
            },
            {
              "value": "德保县",
              "id": "451024"
            },
            {
              "value": "那坡县",
              "id": "451026"
            },
            {
              "value": "凌云县",
              "id": "451027"
            },
            {
              "value": "乐业县",
              "id": "451028"
            },
            {
              "value": "田林县",
              "id": "451029"
            },
            {
              "value": "西林县",
              "id": "451030"
            },
            {
              "value": "隆林各族自治县",
              "id": "451031"
            },
            {
              "value": "靖西市",
              "id": "451081"
            }
          ]
        },
        {
          "value": "贺州市",
          "id": "110130",
          "childs": [
            {
              "value": "八步区",
              "id": "451102"
            },
            {
              "value": "平桂区",
              "id": "451103"
            },
            {
              "value": "昭平县",
              "id": "451121"
            },
            {
              "value": "钟山县",
              "id": "451122"
            },
            {
              "value": "富川瑶族自治县",
              "id": "451123"
            }
          ]
        },
        {
          "value": "河池市",
          "id": "110140",
          "childs": [
            {
              "value": "金城江区",
              "id": "451202"
            },
            {
              "value": "南丹县",
              "id": "451221"
            },
            {
              "value": "天峨县",
              "id": "451222"
            },
            {
              "value": "凤山县",
              "id": "451223"
            },
            {
              "value": "东兰县",
              "id": "451224"
            },
            {
              "value": "罗城仫佬族自治县",
              "id": "451225"
            },
            {
              "value": "环江毛南族自治县",
              "id": "451226"
            },
            {
              "value": "巴马瑶族自治县",
              "id": "451227"
            },
            {
              "value": "都安瑶族自治县",
              "id": "451228"
            },
            {
              "value": "大化瑶族自治县",
              "id": "451229"
            },
            {
              "value": "宜州市",
              "id": "451281"
            }
          ]
        },
        {
          "value": "来宾市",
          "id": "110090",
          "childs": [
            {
              "value": "兴宾区",
              "id": "451302"
            },
            {
              "value": "忻城县",
              "id": "451321"
            },
            {
              "value": "象州县",
              "id": "451322"
            },
            {
              "value": "武宣县",
              "id": "451323"
            },
            {
              "value": "金秀瑶族自治县",
              "id": "451324"
            },
            {
              "value": "合山市",
              "id": "451381"
            }
          ]
        },
        {
          "value": "崇左市",
          "id": "110080",
          "childs": [
            {
              "value": "江州区",
              "id": "451402"
            },
            {
              "value": "扶绥县",
              "id": "451421"
            },
            {
              "value": "宁明县",
              "id": "451422"
            },
            {
              "value": "龙州县",
              "id": "451423"
            },
            {
              "value": "大新县",
              "id": "451424"
            },
            {
              "value": "天等县",
              "id": "451425"
            },
            {
              "value": "凭祥市",
              "id": "451481"
            }
          ]
        }
      ]
    },
    {
      "value": "海南省",
      "id": "130",
      "childs": [
        {
          "value": "海口市",
          "id": "130020",
          "childs": [
            {
              "value": "秀英区",
              "id": "460105"
            },
            {
              "value": "龙华区",
              "id": "460106"
            },
            {
              "value": "琼山区",
              "id": "460107"
            },
            {
              "value": "美兰区",
              "id": "460108"
            }
          ]
        },
        {
          "value": "三亚市",
          "id": "130030",
          "childs": [
            {
              "value": "海棠区",
              "id": "460202"
            },
            {
              "value": "吉阳区",
              "id": "460203"
            },
            {
              "value": "天涯区",
              "id": "460204"
            },
            {
              "value": "崖州区",
              "id": "460205"
            }
          ]
        },
        {
          "value": "三沙市",
          "id": "130040",
          "childs": []
        },
        {
          "value": "儋州市",
          "id": "130090",
          "childs": []
        },
        {
          "value": "省直辖县级行政区划",
          "id": "469000",
          "childs": [
            {
              "value": "五指山市",
              "id": "130110"
            },
            {
              "value": "琼海市",
              "id": "130070"
            },
            {
              "value": "文昌市",
              "id": "130060"
            },
            {
              "value": "万宁市",
              "id": "130080"
            },
            {
              "value": "东方市",
              "id": "130100"
            },
            {
              "value": "定安县",
              "id": "130120"
            },
            {
              "value": "屯昌县",
              "id": "130130"
            },
            {
              "value": "澄迈县",
              "id": "130140"
            },
            {
              "value": "临高县",
              "id": "130150"
            },
            {
              "value": "白沙黎族自治县",
              "id": "130180"
            },
            {
              "value": "昌江黎族自治县",
              "id": "130190"
            },
            {
              "value": "乐东黎族自治县",
              "id": "130200"
            },
            {
              "value": "陵水黎族自治县",
              "id": "130210"
            },
            {
              "value": "保亭黎族苗族自治县",
              "id": "130170"
            },
            {
              "value": "琼中黎族苗族自治县",
              "id": "130160"
            }
          ]
        }
      ]
    },
    {
      "value": "重庆市",
      "id": "040",
      "childs": [
        {
          "value": "重庆市",
          "id": "040",
          "childs": [
            {
              "value": "万州区",
              "id": "500101"
            },
            {
              "value": "涪陵区",
              "id": "500102"
            },
            {
              "value": "渝中区",
              "id": "500103"
            },
            {
              "value": "大渡口区",
              "id": "500104"
            },
            {
              "value": "江北区",
              "id": "500105"
            },
            {
              "value": "沙坪坝区",
              "id": "500106"
            },
            {
              "value": "九龙坡区",
              "id": "500107"
            },
            {
              "value": "南岸区",
              "id": "500108"
            },
            {
              "value": "北碚区",
              "id": "500109"
            },
            {
              "value": "綦江区",
              "id": "500110"
            },
            {
              "value": "大足区",
              "id": "500111"
            },
            {
              "value": "渝北区",
              "id": "500112"
            },
            {
              "value": "巴南区",
              "id": "500113"
            },
            {
              "value": "黔江区",
              "id": "500114"
            },
            {
              "value": "长寿区",
              "id": "500115"
            },
            {
              "value": "江津区",
              "id": "500116"
            },
            {
              "value": "合川区",
              "id": "500117"
            },
            {
              "value": "永川区",
              "id": "500118"
            },
            {
              "value": "南川区",
              "id": "500119"
            },
            {
              "value": "璧山区",
              "id": "500120"
            },
            {
              "value": "铜梁区",
              "id": "500151"
            },
            {
              "value": "潼南区",
              "id": "500152"
            },
            {
              "value": "荣昌区",
              "id": "500153"
            },
            {
              "value": "开州区",
              "id": "500154"
            }
          ]
        }
      ]
    },
    {
      "value": "四川省",
      "id": "280",
      "childs": [
        {
          "value": "成都市",
          "id": "280020",
          "childs": [
            {
              "value": "锦江区",
              "id": "510104"
            },
            {
              "value": "青羊区",
              "id": "510105"
            },
            {
              "value": "金牛区",
              "id": "510106"
            },
            {
              "value": "武侯区",
              "id": "510107"
            },
            {
              "value": "成华区",
              "id": "510108"
            },
            {
              "value": "龙泉驿区",
              "id": "510112"
            },
            {
              "value": "青白江区",
              "id": "510113"
            },
            {
              "value": "新都区",
              "id": "510114"
            },
            {
              "value": "温江区",
              "id": "510115"
            },
            {
              "value": "双流区",
              "id": "510116"
            },
            {
              "value": "金堂县",
              "id": "510121"
            },
            {
              "value": "郫县",
              "id": "510124"
            },
            {
              "value": "大邑县",
              "id": "510129"
            },
            {
              "value": "蒲江县",
              "id": "510131"
            },
            {
              "value": "新津县",
              "id": "510132"
            },
            {
              "value": "都江堰市",
              "id": "510181"
            },
            {
              "value": "彭州市",
              "id": "510182"
            },
            {
              "value": "邛崃市",
              "id": "510183"
            },
            {
              "value": "崇州市",
              "id": "510184"
            },
            {
              "value": "简阳市",
              "id": "510185"
            }
          ]
        },
        {
          "value": "自贡市",
          "id": "280080",
          "childs": [
            {
              "value": "自流井区",
              "id": "510302"
            },
            {
              "value": "贡井区",
              "id": "510303"
            },
            {
              "value": "大安区",
              "id": "510304"
            },
            {
              "value": "沿滩区",
              "id": "510311"
            },
            {
              "value": "荣县",
              "id": "510321"
            },
            {
              "value": "富顺县",
              "id": "510322"
            }
          ]
        },
        {
          "value": "攀枝花市",
          "id": "280090",
          "childs": [
            {
              "value": "东区",
              "id": "510402"
            },
            {
              "value": "西区",
              "id": "510403"
            },
            {
              "value": "仁和区",
              "id": "510411"
            },
            {
              "value": "米易县",
              "id": "510421"
            },
            {
              "value": "盐边县",
              "id": "510422"
            }
          ]
        },
        {
          "value": "泸州市",
          "id": "280040",
          "childs": [
            {
              "value": "江阳区",
              "id": "510502"
            },
            {
              "value": "纳溪区",
              "id": "510503"
            },
            {
              "value": "龙马潭区",
              "id": "510504"
            },
            {
              "value": "泸县",
              "id": "510521"
            },
            {
              "value": "合江县",
              "id": "510522"
            },
            {
              "value": "叙永县",
              "id": "510524"
            },
            {
              "value": "古蔺县",
              "id": "510525"
            }
          ]
        },
        {
          "value": "德阳市",
          "id": "280100",
          "childs": [
            {
              "value": "旌阳区",
              "id": "510603"
            },
            {
              "value": "中江县",
              "id": "510623"
            },
            {
              "value": "罗江县",
              "id": "510626"
            },
            {
              "value": "广汉市",
              "id": "510681"
            },
            {
              "value": "什邡市",
              "id": "510682"
            },
            {
              "value": "绵竹市",
              "id": "510683"
            }
          ]
        },
        {
          "value": "绵阳市",
          "id": "280050",
          "childs": [
            {
              "value": "涪城区",
              "id": "510703"
            },
            {
              "value": "游仙区",
              "id": "510704"
            },
            {
              "value": "安州区",
              "id": "510705"
            },
            {
              "value": "三台县",
              "id": "510722"
            },
            {
              "value": "盐亭县",
              "id": "510723"
            },
            {
              "value": "梓潼县",
              "id": "510725"
            },
            {
              "value": "北川羌族自治县",
              "id": "510726"
            },
            {
              "value": "平武县",
              "id": "510727"
            },
            {
              "value": "江油市",
              "id": "510781"
            }
          ]
        },
        {
          "value": "广元市",
          "id": "280110",
          "childs": [
            {
              "value": "利州区",
              "id": "510802"
            },
            {
              "value": "昭化区",
              "id": "510811"
            },
            {
              "value": "朝天区",
              "id": "510812"
            },
            {
              "value": "旺苍县",
              "id": "510821"
            },
            {
              "value": "青川县",
              "id": "510822"
            },
            {
              "value": "剑阁县",
              "id": "510823"
            },
            {
              "value": "苍溪县",
              "id": "510824"
            }
          ]
        },
        {
          "value": "遂宁市",
          "id": "280120",
          "childs": [
            {
              "value": "船山区",
              "id": "510903"
            },
            {
              "value": "安居区",
              "id": "510904"
            },
            {
              "value": "蓬溪县",
              "id": "510921"
            },
            {
              "value": "射洪县",
              "id": "510922"
            },
            {
              "value": "大英县",
              "id": "510923"
            }
          ]
        },
        {
          "value": "内江市",
          "id": "280060",
          "childs": [
            {
              "value": "市中区",
              "id": "511002"
            },
            {
              "value": "东兴区",
              "id": "511011"
            },
            {
              "value": "威远县",
              "id": "511024"
            },
            {
              "value": "资中县",
              "id": "511025"
            },
            {
              "value": "隆昌县",
              "id": "511028"
            }
          ]
        },
        {
          "value": "乐山市",
          "id": "280030",
          "childs": [
            {
              "value": "市中区",
              "id": "511102"
            },
            {
              "value": "沙湾区",
              "id": "511111"
            },
            {
              "value": "五通桥区",
              "id": "511112"
            },
            {
              "value": "金口河区",
              "id": "511113"
            },
            {
              "value": "犍为县",
              "id": "511123"
            },
            {
              "value": "井研县",
              "id": "511124"
            },
            {
              "value": "夹江县",
              "id": "511126"
            },
            {
              "value": "沐川县",
              "id": "511129"
            },
            {
              "value": "峨边彝族自治县",
              "id": "511132"
            },
            {
              "value": "马边彝族自治县",
              "id": "511133"
            },
            {
              "value": "峨眉山市",
              "id": "511181"
            }
          ]
        },
        {
          "value": "南充市",
          "id": "280130",
          "childs": [
            {
              "value": "顺庆区",
              "id": "511302"
            },
            {
              "value": "高坪区",
              "id": "511303"
            },
            {
              "value": "嘉陵区",
              "id": "511304"
            },
            {
              "value": "南部县",
              "id": "511321"
            },
            {
              "value": "营山县",
              "id": "511322"
            },
            {
              "value": "蓬安县",
              "id": "511323"
            },
            {
              "value": "仪陇县",
              "id": "511324"
            },
            {
              "value": "西充县",
              "id": "511325"
            },
            {
              "value": "阆中市",
              "id": "511381"
            }
          ]
        },
        {
          "value": "眉山市",
          "id": "280140",
          "childs": [
            {
              "value": "东坡区",
              "id": "511402"
            },
            {
              "value": "彭山区",
              "id": "511403"
            },
            {
              "value": "仁寿县",
              "id": "511421"
            },
            {
              "value": "洪雅县",
              "id": "511423"
            },
            {
              "value": "丹棱县",
              "id": "511424"
            },
            {
              "value": "青神县",
              "id": "511425"
            }
          ]
        },
        {
          "value": "宜宾市",
          "id": "280070",
          "childs": [
            {
              "value": "翠屏区",
              "id": "511502"
            },
            {
              "value": "南溪区",
              "id": "511503"
            },
            {
              "value": "宜宾县",
              "id": "511521"
            },
            {
              "value": "江安县",
              "id": "511523"
            },
            {
              "value": "长宁县",
              "id": "511524"
            },
            {
              "value": "高县",
              "id": "511525"
            },
            {
              "value": "珙县",
              "id": "511526"
            },
            {
              "value": "筠连县",
              "id": "511527"
            },
            {
              "value": "兴文县",
              "id": "511528"
            },
            {
              "value": "屏山县",
              "id": "511529"
            }
          ]
        },
        {
          "value": "广安市",
          "id": "280150",
          "childs": [
            {
              "value": "广安区",
              "id": "511602"
            },
            {
              "value": "前锋区",
              "id": "511603"
            },
            {
              "value": "岳池县",
              "id": "511621"
            },
            {
              "value": "武胜县",
              "id": "511622"
            },
            {
              "value": "邻水县",
              "id": "511623"
            },
            {
              "value": "华蓥市",
              "id": "511681"
            }
          ]
        },
        {
          "value": "达州市",
          "id": "280160",
          "childs": [
            {
              "value": "通川区",
              "id": "511702"
            },
            {
              "value": "达川区",
              "id": "511703"
            },
            {
              "value": "宣汉县",
              "id": "511722"
            },
            {
              "value": "开江县",
              "id": "511723"
            },
            {
              "value": "大竹县",
              "id": "511724"
            },
            {
              "value": "渠县",
              "id": "511725"
            },
            {
              "value": "万源市",
              "id": "511781"
            }
          ]
        },
        {
          "value": "雅安市",
          "id": "280170",
          "childs": [
            {
              "value": "雨城区",
              "id": "511802"
            },
            {
              "value": "名山区",
              "id": "511803"
            },
            {
              "value": "荥经县",
              "id": "511822"
            },
            {
              "value": "汉源县",
              "id": "511823"
            },
            {
              "value": "石棉县",
              "id": "511824"
            },
            {
              "value": "天全县",
              "id": "511825"
            },
            {
              "value": "芦山县",
              "id": "511826"
            },
            {
              "value": "宝兴县",
              "id": "511827"
            }
          ]
        },
        {
          "value": "巴中市",
          "id": "280180",
          "childs": [
            {
              "value": "巴州区",
              "id": "511902"
            },
            {
              "value": "恩阳区",
              "id": "511903"
            },
            {
              "value": "通江县",
              "id": "511921"
            },
            {
              "value": "南江县",
              "id": "511922"
            },
            {
              "value": "平昌县",
              "id": "511923"
            }
          ]
        },
        {
          "value": "资阳市",
          "id": "280190",
          "childs": [
            {
              "value": "雁江区",
              "id": "512002"
            },
            {
              "value": "安岳县",
              "id": "512021"
            },
            {
              "value": "乐至县",
              "id": "512022"
            }
          ]
        },
        {
          "value": "阿坝藏族羌族自治州",
          "id": "280220",
          "childs": [
            {
              "value": "马尔康市",
              "id": "513201"
            },
            {
              "value": "汶川县",
              "id": "513221"
            },
            {
              "value": "理县",
              "id": "513222"
            },
            {
              "value": "茂县",
              "id": "513223"
            },
            {
              "value": "松潘县",
              "id": "513224"
            },
            {
              "value": "九寨沟县",
              "id": "513225"
            },
            {
              "value": "金川县",
              "id": "513226"
            },
            {
              "value": "小金县",
              "id": "513227"
            },
            {
              "value": "黑水县",
              "id": "513228"
            },
            {
              "value": "壤塘县",
              "id": "513230"
            },
            {
              "value": "阿坝县",
              "id": "513231"
            },
            {
              "value": "若尔盖县",
              "id": "513232"
            },
            {
              "value": "红原县",
              "id": "513233"
            }
          ]
        },
        {
          "value": "甘孜藏族自治州",
          "id": "280210",
          "childs": [
            {
              "value": "康定市",
              "id": "513301"
            },
            {
              "value": "泸定县",
              "id": "513322"
            },
            {
              "value": "丹巴县",
              "id": "513323"
            },
            {
              "value": "九龙县",
              "id": "513324"
            },
            {
              "value": "雅江县",
              "id": "513325"
            },
            {
              "value": "道孚县",
              "id": "513326"
            },
            {
              "value": "炉霍县",
              "id": "513327"
            },
            {
              "value": "甘孜县",
              "id": "513328"
            },
            {
              "value": "新龙县",
              "id": "513329"
            },
            {
              "value": "德格县",
              "id": "513330"
            },
            {
              "value": "白玉县",
              "id": "513331"
            },
            {
              "value": "石渠县",
              "id": "513332"
            },
            {
              "value": "色达县",
              "id": "513333"
            },
            {
              "value": "理塘县",
              "id": "513334"
            },
            {
              "value": "巴塘县",
              "id": "513335"
            },
            {
              "value": "乡城县",
              "id": "513336"
            },
            {
              "value": "稻城县",
              "id": "513337"
            },
            {
              "value": "得荣县",
              "id": "513338"
            }
          ]
        },
        {
          "value": "凉山彝族自治州",
          "id": "280230",
          "childs": [
            {
              "value": "西昌市",
              "id": "513401"
            },
            {
              "value": "木里藏族自治县",
              "id": "513422"
            },
            {
              "value": "盐源县",
              "id": "513423"
            },
            {
              "value": "德昌县",
              "id": "513424"
            },
            {
              "value": "会理县",
              "id": "513425"
            },
            {
              "value": "会东县",
              "id": "513426"
            },
            {
              "value": "宁南县",
              "id": "513427"
            },
            {
              "value": "普格县",
              "id": "513428"
            },
            {
              "value": "布拖县",
              "id": "513429"
            },
            {
              "value": "金阳县",
              "id": "513430"
            },
            {
              "value": "昭觉县",
              "id": "513431"
            },
            {
              "value": "喜德县",
              "id": "513432"
            },
            {
              "value": "冕宁县",
              "id": "513433"
            },
            {
              "value": "越西县",
              "id": "513434"
            },
            {
              "value": "甘洛县",
              "id": "513435"
            },
            {
              "value": "美姑县",
              "id": "513436"
            },
            {
              "value": "雷波县",
              "id": "513437"
            }
          ]
        }
      ]
    },
    {
      "value": "贵州省",
      "id": "120",
      "childs": [
        {
          "value": "贵阳市",
          "id": "120020",
          "childs": [
            {
              "value": "南明区",
              "id": "520102"
            },
            {
              "value": "云岩区",
              "id": "520103"
            },
            {
              "value": "花溪区",
              "id": "520111"
            },
            {
              "value": "乌当区",
              "id": "520112"
            },
            {
              "value": "白云区",
              "id": "520113"
            },
            {
              "value": "观山湖区",
              "id": "520115"
            },
            {
              "value": "开阳县",
              "id": "520121"
            },
            {
              "value": "息烽县",
              "id": "520122"
            },
            {
              "value": "修文县",
              "id": "520123"
            },
            {
              "value": "清镇市",
              "id": "520181"
            }
          ]
        },
        {
          "value": "六盘水市",
          "id": "120040",
          "childs": [
            {
              "value": "钟山区",
              "id": "520201"
            },
            {
              "value": "六枝特区",
              "id": "520203"
            },
            {
              "value": "水城县",
              "id": "520221"
            },
            {
              "value": "盘县",
              "id": "520222"
            }
          ]
        },
        {
          "value": "遵义市",
          "id": "120030",
          "childs": [
            {
              "value": "红花岗区",
              "id": "520302"
            },
            {
              "value": "汇川区",
              "id": "520303"
            },
            {
              "value": "播州区",
              "id": "520304"
            },
            {
              "value": "桐梓县",
              "id": "520322"
            },
            {
              "value": "绥阳县",
              "id": "520323"
            },
            {
              "value": "正安县",
              "id": "520324"
            },
            {
              "value": "道真仡佬族苗族自治县",
              "id": "520325"
            },
            {
              "value": "务川仡佬族苗族自治县",
              "id": "520326"
            },
            {
              "value": "凤冈县",
              "id": "520327"
            },
            {
              "value": "湄潭县",
              "id": "520328"
            },
            {
              "value": "余庆县",
              "id": "520329"
            },
            {
              "value": "习水县",
              "id": "520330"
            },
            {
              "value": "赤水市",
              "id": "520381"
            },
            {
              "value": "仁怀市",
              "id": "520382"
            }
          ]
        },
        {
          "value": "安顺市",
          "id": "120050",
          "childs": [
            {
              "value": "西秀区",
              "id": "520402"
            },
            {
              "value": "平坝区",
              "id": "520403"
            },
            {
              "value": "普定县",
              "id": "520422"
            },
            {
              "value": "镇宁布依族苗族自治县",
              "id": "520423"
            },
            {
              "value": "关岭布依族苗族自治县",
              "id": "520424"
            },
            {
              "value": "紫云苗族布依族自治县",
              "id": "520425"
            }
          ]
        },
        {
          "value": "毕节市",
          "id": "120060",
          "childs": [
            {
              "value": "七星关区",
              "id": "520502"
            },
            {
              "value": "大方县",
              "id": "520521"
            },
            {
              "value": "黔西县",
              "id": "520522"
            },
            {
              "value": "金沙县",
              "id": "520523"
            },
            {
              "value": "织金县",
              "id": "520524"
            },
            {
              "value": "纳雍县",
              "id": "520525"
            },
            {
              "value": "威宁彝族回族苗族自治县",
              "id": "520526"
            },
            {
              "value": "赫章县",
              "id": "520527"
            }
          ]
        },
        {
          "value": "铜仁市",
          "id": "120070",
          "childs": [
            {
              "value": "碧江区",
              "id": "520602"
            },
            {
              "value": "万山区",
              "id": "520603"
            },
            {
              "value": "江口县",
              "id": "520621"
            },
            {
              "value": "玉屏侗族自治县",
              "id": "520622"
            },
            {
              "value": "石阡县",
              "id": "520623"
            },
            {
              "value": "思南县",
              "id": "520624"
            },
            {
              "value": "印江土家族苗族自治县",
              "id": "520625"
            },
            {
              "value": "德江县",
              "id": "520626"
            },
            {
              "value": "沿河土家族自治县",
              "id": "520627"
            },
            {
              "value": "松桃苗族自治县",
              "id": "520628"
            }
          ]
        },
        {
          "value": "黔西南布依族苗族自治州",
          "id": "120080",
          "childs": [
            {
              "value": "兴义市",
              "id": "522301"
            },
            {
              "value": "兴仁县",
              "id": "522322"
            },
            {
              "value": "普安县",
              "id": "522323"
            },
            {
              "value": "晴隆县",
              "id": "522324"
            },
            {
              "value": "贞丰县",
              "id": "522325"
            },
            {
              "value": "望谟县",
              "id": "522326"
            },
            {
              "value": "册亨县",
              "id": "522327"
            },
            {
              "value": "安龙县",
              "id": "522328"
            }
          ]
        },
        {
          "value": "黔东南苗族侗族自治州",
          "id": "120090",
          "childs": [
            {
              "value": "凯里市",
              "id": "522601"
            },
            {
              "value": "黄平县",
              "id": "522622"
            },
            {
              "value": "施秉县",
              "id": "522623"
            },
            {
              "value": "三穗县",
              "id": "522624"
            },
            {
              "value": "镇远县",
              "id": "522625"
            },
            {
              "value": "岑巩县",
              "id": "522626"
            },
            {
              "value": "天柱县",
              "id": "522627"
            },
            {
              "value": "锦屏县",
              "id": "522628"
            },
            {
              "value": "剑河县",
              "id": "522629"
            },
            {
              "value": "台江县",
              "id": "522630"
            },
            {
              "value": "黎平县",
              "id": "522631"
            },
            {
              "value": "榕江县",
              "id": "522632"
            },
            {
              "value": "从江县",
              "id": "522633"
            },
            {
              "value": "雷山县",
              "id": "522634"
            },
            {
              "value": "麻江县",
              "id": "522635"
            },
            {
              "value": "丹寨县",
              "id": "522636"
            }
          ]
        },
        {
          "value": "黔南布依族苗族自治州",
          "id": "120100",
          "childs": [
            {
              "value": "都匀市",
              "id": "522701"
            },
            {
              "value": "福泉市",
              "id": "522702"
            },
            {
              "value": "荔波县",
              "id": "522722"
            },
            {
              "value": "贵定县",
              "id": "522723"
            },
            {
              "value": "瓮安县",
              "id": "522725"
            },
            {
              "value": "独山县",
              "id": "522726"
            },
            {
              "value": "平塘县",
              "id": "522727"
            },
            {
              "value": "罗甸县",
              "id": "522728"
            },
            {
              "value": "长顺县",
              "id": "522729"
            },
            {
              "value": "龙里县",
              "id": "522730"
            },
            {
              "value": "惠水县",
              "id": "522731"
            },
            {
              "value": "三都水族自治县",
              "id": "522732"
            }
          ]
        }
      ]
    },
    {
      "value": "云南省",
      "id": "310",
      "childs": [
        {
          "value": "昆明市",
          "id": "310020",
          "childs": [
            {
              "value": "五华区",
              "id": "530102"
            },
            {
              "value": "盘龙区",
              "id": "530103"
            },
            {
              "value": "官渡区",
              "id": "530111"
            },
            {
              "value": "西山区",
              "id": "530112"
            },
            {
              "value": "东川区",
              "id": "530113"
            },
            {
              "value": "呈贡区",
              "id": "530114"
            },
            {
              "value": "晋宁县",
              "id": "530122"
            },
            {
              "value": "富民县",
              "id": "530124"
            },
            {
              "value": "宜良县",
              "id": "530125"
            },
            {
              "value": "石林彝族自治县",
              "id": "530126"
            },
            {
              "value": "嵩明县",
              "id": "530127"
            },
            {
              "value": "禄劝彝族苗族自治县",
              "id": "530128"
            },
            {
              "value": "寻甸回族彝族自治县",
              "id": "530129"
            },
            {
              "value": "安宁市",
              "id": "530181"
            }
          ]
        },
        {
          "value": "曲靖市",
          "id": "310060",
          "childs": [
            {
              "value": "麒麟区",
              "id": "530302"
            },
            {
              "value": "沾益区",
              "id": "530303"
            },
            {
              "value": "马龙县",
              "id": "530321"
            },
            {
              "value": "陆良县",
              "id": "530322"
            },
            {
              "value": "师宗县",
              "id": "530323"
            },
            {
              "value": "罗平县",
              "id": "530324"
            },
            {
              "value": "富源县",
              "id": "530325"
            },
            {
              "value": "会泽县",
              "id": "530326"
            },
            {
              "value": "宣威市",
              "id": "530381"
            }
          ]
        },
        {
          "value": "玉溪市",
          "id": "310050",
          "childs": [
            {
              "value": "红塔区",
              "id": "530402"
            },
            {
              "value": "江川区",
              "id": "530403"
            },
            {
              "value": "澄江县",
              "id": "530422"
            },
            {
              "value": "通海县",
              "id": "530423"
            },
            {
              "value": "华宁县",
              "id": "530424"
            },
            {
              "value": "易门县",
              "id": "530425"
            },
            {
              "value": "峨山彝族自治县",
              "id": "530426"
            },
            {
              "value": "新平彝族傣族自治县",
              "id": "530427"
            },
            {
              "value": "元江哈尼族彝族傣族自治县",
              "id": "530428"
            }
          ]
        },
        {
          "value": "保山市",
          "id": "310070",
          "childs": [
            {
              "value": "隆阳区",
              "id": "530502"
            },
            {
              "value": "施甸县",
              "id": "530521"
            },
            {
              "value": "龙陵县",
              "id": "530523"
            },
            {
              "value": "昌宁县",
              "id": "530524"
            },
            {
              "value": "腾冲市",
              "id": "530581"
            }
          ]
        },
        {
          "value": "昭通市",
          "id": "310080",
          "childs": [
            {
              "value": "昭阳区",
              "id": "530602"
            },
            {
              "value": "鲁甸县",
              "id": "530621"
            },
            {
              "value": "巧家县",
              "id": "530622"
            },
            {
              "value": "盐津县",
              "id": "530623"
            },
            {
              "value": "大关县",
              "id": "530624"
            },
            {
              "value": "永善县",
              "id": "530625"
            },
            {
              "value": "绥江县",
              "id": "530626"
            },
            {
              "value": "镇雄县",
              "id": "530627"
            },
            {
              "value": "彝良县",
              "id": "530628"
            },
            {
              "value": "威信县",
              "id": "530629"
            },
            {
              "value": "水富县",
              "id": "530630"
            }
          ]
        },
        {
          "value": "丽江市",
          "id": "310040",
          "childs": [
            {
              "value": "古城区",
              "id": "530702"
            },
            {
              "value": "玉龙纳西族自治县",
              "id": "530721"
            },
            {
              "value": "永胜县",
              "id": "530722"
            },
            {
              "value": "华坪县",
              "id": "530723"
            },
            {
              "value": "宁蒗彝族自治县",
              "id": "530724"
            }
          ]
        },
        {
          "value": "普洱市",
          "id": "310090",
          "childs": [
            {
              "value": "思茅区",
              "id": "530802"
            },
            {
              "value": "宁洱哈尼族彝族自治县",
              "id": "530821"
            },
            {
              "value": "墨江哈尼族自治县",
              "id": "530822"
            },
            {
              "value": "景东彝族自治县",
              "id": "530823"
            },
            {
              "value": "景谷傣族彝族自治县",
              "id": "530824"
            },
            {
              "value": "镇沅彝族哈尼族拉祜族自治县",
              "id": "530825"
            },
            {
              "value": "江城哈尼族彝族自治县",
              "id": "530826"
            },
            {
              "value": "孟连傣族拉祜族佤族自治县",
              "id": "530827"
            },
            {
              "value": "澜沧拉祜族自治县",
              "id": "530828"
            },
            {
              "value": "西盟佤族自治县",
              "id": "530829"
            }
          ]
        },
        {
          "value": "临沧市",
          "id": "310100",
          "childs": [
            {
              "value": "临翔区",
              "id": "530902"
            },
            {
              "value": "凤庆县",
              "id": "530921"
            },
            {
              "value": "云县",
              "id": "530922"
            },
            {
              "value": "永德县",
              "id": "530923"
            },
            {
              "value": "镇康县",
              "id": "530924"
            },
            {
              "value": "双江拉祜族佤族布朗族傣族自治县",
              "id": "530925"
            },
            {
              "value": "耿马傣族佤族自治县",
              "id": "530926"
            },
            {
              "value": "沧源佤族自治县",
              "id": "530927"
            }
          ]
        },
        {
          "value": "楚雄彝族自治州",
          "id": "310150",
          "childs": [
            {
              "value": "楚雄市",
              "id": "310150"
            },
            {
              "value": "双柏县",
              "id": "532322"
            },
            {
              "value": "牟定县",
              "id": "532323"
            },
            {
              "value": "南华县",
              "id": "532324"
            },
            {
              "value": "姚安县",
              "id": "532325"
            },
            {
              "value": "大姚县",
              "id": "532326"
            },
            {
              "value": "永仁县",
              "id": "532327"
            },
            {
              "value": "元谋县",
              "id": "532328"
            },
            {
              "value": "武定县",
              "id": "532329"
            },
            {
              "value": "禄丰县",
              "id": "532331"
            }
          ]
        },
        {
          "value": "红河哈尼族彝族自治州",
          "id": "310110",
          "childs": [
            {
              "value": "个旧市",
              "id": "532501"
            },
            {
              "value": "开远市",
              "id": "532502"
            },
            {
              "value": "蒙自市",
              "id": "532503"
            },
            {
              "value": "弥勒市",
              "id": "532504"
            },
            {
              "value": "屏边苗族自治县",
              "id": "532523"
            },
            {
              "value": "建水县",
              "id": "532524"
            },
            {
              "value": "石屏县",
              "id": "532525"
            },
            {
              "value": "泸西县",
              "id": "532527"
            },
            {
              "value": "元阳县",
              "id": "532528"
            },
            {
              "value": "红河县",
              "id": "532529"
            },
            {
              "value": "金平苗族瑶族傣族自治县",
              "id": "532530"
            },
            {
              "value": "绿春县",
              "id": "532531"
            },
            {
              "value": "河口瑶族自治县",
              "id": "532532"
            }
          ]
        },
        {
          "value": "文山壮族苗族自治州",
          "id": "310120",
          "childs": [
            {
              "value": "文山市",
              "id": "532601"
            },
            {
              "value": "砚山县",
              "id": "532622"
            },
            {
              "value": "西畴县",
              "id": "532623"
            },
            {
              "value": "麻栗坡县",
              "id": "532624"
            },
            {
              "value": "马关县",
              "id": "532625"
            },
            {
              "value": "丘北县",
              "id": "532626"
            },
            {
              "value": "广南县",
              "id": "532627"
            },
            {
              "value": "富宁县",
              "id": "532628"
            }
          ]
        },
        {
          "value": "西双版纳傣族自治州",
          "id": "310130",
          "childs": [
            {
              "value": "景洪市",
              "id": "532801"
            },
            {
              "value": "勐海县",
              "id": "532822"
            },
            {
              "value": "勐腊县",
              "id": "532823"
            }
          ]
        },
        {
          "value": "大理白族自治州",
          "id": "310030",
          "childs": [
            {
              "value": "大理市",
              "id": "532901"
            },
            {
              "value": "漾濞彝族自治县",
              "id": "532922"
            },
            {
              "value": "祥云县",
              "id": "532923"
            },
            {
              "value": "宾川县",
              "id": "532924"
            },
            {
              "value": "弥渡县",
              "id": "532925"
            },
            {
              "value": "南涧彝族自治县",
              "id": "532926"
            },
            {
              "value": "巍山彝族回族自治县",
              "id": "532927"
            },
            {
              "value": "永平县",
              "id": "532928"
            },
            {
              "value": "云龙县",
              "id": "532929"
            },
            {
              "value": "洱源县",
              "id": "532930"
            },
            {
              "value": "剑川县",
              "id": "532931"
            },
            {
              "value": "鹤庆县",
              "id": "532932"
            }
          ]
        },
        {
          "value": "德宏傣族景颇族自治州",
          "id": "310140",
          "childs": [
            {
              "value": "瑞丽市",
              "id": "533102"
            },
            {
              "value": "芒市",
              "id": "533103"
            },
            {
              "value": "梁河县",
              "id": "533122"
            },
            {
              "value": "盈江县",
              "id": "533123"
            },
            {
              "value": "陇川县",
              "id": "533124"
            }
          ]
        },
        {
          "value": "怒江傈僳族自治州",
          "id": "310160",
          "childs": [
            {
              "value": "泸水市",
              "id": "533301"
            },
            {
              "value": "福贡县",
              "id": "533323"
            },
            {
              "value": "贡山独龙族怒族自治县",
              "id": "533324"
            },
            {
              "value": "兰坪白族普米族自治县",
              "id": "533325"
            }
          ]
        },
        {
          "value": "迪庆藏族自治州",
          "id": "310170",
          "childs": [
            {
              "value": "香格里拉市",
              "id": "533401"
            },
            {
              "value": "德钦县",
              "id": "533422"
            },
            {
              "value": "维西傈僳族自治县",
              "id": "533423"
            }
          ]
        }
      ]
    },
    {
      "value": "西藏自治区",
      "id": "290",
      "childs": [
        {
          "value": "拉萨市",
          "id": "290020",
          "childs": [
            {
              "value": "城关区",
              "id": "540102"
            },
            {
              "value": "堆龙德庆区",
              "id": "540103"
            },
            {
              "value": "林周县",
              "id": "540121"
            },
            {
              "value": "当雄县",
              "id": "540122"
            },
            {
              "value": "尼木县",
              "id": "540123"
            },
            {
              "value": "曲水县",
              "id": "540124"
            },
            {
              "value": "达孜县",
              "id": "540126"
            },
            {
              "value": "墨竹工卡县",
              "id": "540127"
            }
          ]
        },
        {
          "value": "日喀则市",
          "id": "290030",
          "childs": [
            {
              "value": "桑珠孜区",
              "id": "540202"
            },
            {
              "value": "南木林县",
              "id": "540221"
            },
            {
              "value": "江孜县",
              "id": "540222"
            },
            {
              "value": "定日县",
              "id": "540223"
            },
            {
              "value": "萨迦县",
              "id": "540224"
            },
            {
              "value": "拉孜县",
              "id": "540225"
            },
            {
              "value": "昂仁县",
              "id": "540226"
            },
            {
              "value": "谢通门县",
              "id": "540227"
            },
            {
              "value": "白朗县",
              "id": "540228"
            },
            {
              "value": "仁布县",
              "id": "540229"
            },
            {
              "value": "康马县",
              "id": "540230"
            },
            {
              "value": "定结县",
              "id": "540231"
            },
            {
              "value": "仲巴县",
              "id": "540232"
            },
            {
              "value": "亚东县",
              "id": "540233"
            },
            {
              "value": "吉隆县",
              "id": "540234"
            },
            {
              "value": "聂拉木县",
              "id": "540235"
            },
            {
              "value": "萨嘎县",
              "id": "540236"
            },
            {
              "value": "岗巴县",
              "id": "540237"
            }
          ]
        },
        {
          "value": "昌都市",
          "id": "290060",
          "childs": [
            {
              "value": "卡若区",
              "id": "540302"
            },
            {
              "value": "江达县",
              "id": "540321"
            },
            {
              "value": "贡觉县",
              "id": "540322"
            },
            {
              "value": "类乌齐县",
              "id": "540323"
            },
            {
              "value": "丁青县",
              "id": "540324"
            },
            {
              "value": "察雅县",
              "id": "540325"
            },
            {
              "value": "八宿县",
              "id": "540326"
            },
            {
              "value": "左贡县",
              "id": "540327"
            },
            {
              "value": "芒康县",
              "id": "540328"
            },
            {
              "value": "洛隆县",
              "id": "540329"
            },
            {
              "value": "边坝县",
              "id": "540330"
            }
          ]
        },
        {
          "value": "林芝市",
          "id": "290040",
          "childs": [
            {
              "value": "巴宜区",
              "id": "540402"
            },
            {
              "value": "工布江达县",
              "id": "540421"
            },
            {
              "value": "米林县",
              "id": "540422"
            },
            {
              "value": "墨脱县",
              "id": "540423"
            },
            {
              "value": "波密县",
              "id": "540424"
            },
            {
              "value": "察隅县",
              "id": "540425"
            },
            {
              "value": "朗县",
              "id": "540426"
            }
          ]
        },
        {
          "value": "山南市",
          "id": "290050",
          "childs": [
            {
              "value": "乃东区",
              "id": "540502"
            },
            {
              "value": "扎囊县",
              "id": "540521"
            },
            {
              "value": "贡嘎县",
              "id": "540522"
            },
            {
              "value": "桑日县",
              "id": "540523"
            },
            {
              "value": "琼结县",
              "id": "540524"
            },
            {
              "value": "曲松县",
              "id": "540525"
            },
            {
              "value": "措美县",
              "id": "540526"
            },
            {
              "value": "洛扎县",
              "id": "540527"
            },
            {
              "value": "加查县",
              "id": "540528"
            },
            {
              "value": "隆子县",
              "id": "540529"
            },
            {
              "value": "错那县",
              "id": "540530"
            },
            {
              "value": "浪卡子县",
              "id": "540531"
            }
          ]
        },
        {
          "value": "那曲地区",
          "id": "290070",
          "childs": [
            {
              "value": "那曲县",
              "id": "542421"
            },
            {
              "value": "嘉黎县",
              "id": "542422"
            },
            {
              "value": "比如县",
              "id": "542423"
            },
            {
              "value": "聂荣县",
              "id": "542424"
            },
            {
              "value": "安多县",
              "id": "542425"
            },
            {
              "value": "申扎县",
              "id": "542426"
            },
            {
              "value": "索县",
              "id": "542427"
            },
            {
              "value": "班戈县",
              "id": "542428"
            },
            {
              "value": "巴青县",
              "id": "542429"
            },
            {
              "value": "尼玛县",
              "id": "542430"
            },
            {
              "value": "双湖县",
              "id": "542431"
            }
          ]
        },
        {
          "value": "阿里地区",
          "id": "290080",
          "childs": [
            {
              "value": "普兰县",
              "id": "542521"
            },
            {
              "value": "札达县",
              "id": "542522"
            },
            {
              "value": "噶尔县",
              "id": "542523"
            },
            {
              "value": "日土县",
              "id": "542524"
            },
            {
              "value": "革吉县",
              "id": "542525"
            },
            {
              "value": "改则县",
              "id": "542526"
            },
            {
              "value": "措勤县",
              "id": "542527"
            }
          ]
        }
      ]
    },
    {
      "value": "陕西省",
      "id": "270",
      "childs": [
        {
          "value": "西安市",
          "id": "270020",
          "childs": [
            {
              "value": "新城区",
              "id": "610102"
            },
            {
              "value": "碑林区",
              "id": "610103"
            },
            {
              "value": "莲湖区",
              "id": "610104"
            },
            {
              "value": "灞桥区",
              "id": "610111"
            },
            {
              "value": "未央区",
              "id": "610112"
            },
            {
              "value": "雁塔区",
              "id": "610113"
            },
            {
              "value": "阎良区",
              "id": "610114"
            },
            {
              "value": "临潼区",
              "id": "610115"
            },
            {
              "value": "长安区",
              "id": "610116"
            },
            {
              "value": "高陵区",
              "id": "610117"
            },
            {
              "value": "蓝田县",
              "id": "610122"
            },
            {
              "value": "周至县",
              "id": "610124"
            },
            {
              "value": "户县",
              "id": "610125"
            }
          ]
        },
        {
          "value": "铜川市",
          "id": "270050",
          "childs": [
            {
              "value": "王益区",
              "id": "610202"
            },
            {
              "value": "印台区",
              "id": "610203"
            },
            {
              "value": "耀州区",
              "id": "610204"
            },
            {
              "value": "宜君县",
              "id": "610222"
            }
          ]
        },
        {
          "value": "宝鸡市",
          "id": "270030",
          "childs": [
            {
              "value": "渭滨区",
              "id": "610302"
            },
            {
              "value": "金台区",
              "id": "610303"
            },
            {
              "value": "陈仓区",
              "id": "610304"
            },
            {
              "value": "凤翔县",
              "id": "610322"
            },
            {
              "value": "岐山县",
              "id": "610323"
            },
            {
              "value": "扶风县",
              "id": "610324"
            },
            {
              "value": "眉县",
              "id": "610326"
            },
            {
              "value": "陇县",
              "id": "610327"
            },
            {
              "value": "千阳县",
              "id": "610328"
            },
            {
              "value": "麟游县",
              "id": "610329"
            },
            {
              "value": "凤县",
              "id": "610330"
            },
            {
              "value": "太白县",
              "id": "610331"
            }
          ]
        },
        {
          "value": "咸阳市",
          "id": "270040",
          "childs": [
            {
              "value": "秦都区",
              "id": "610402"
            },
            {
              "value": "杨陵区",
              "id": "610403"
            },
            {
              "value": "渭城区",
              "id": "610404"
            },
            {
              "value": "三原县",
              "id": "610422"
            },
            {
              "value": "泾阳县",
              "id": "610423"
            },
            {
              "value": "乾县",
              "id": "610424"
            },
            {
              "value": "礼泉县",
              "id": "610425"
            },
            {
              "value": "永寿县",
              "id": "610426"
            },
            {
              "value": "彬县",
              "id": "610427"
            },
            {
              "value": "长武县",
              "id": "610428"
            },
            {
              "value": "旬邑县",
              "id": "610429"
            },
            {
              "value": "淳化县",
              "id": "610430"
            },
            {
              "value": "武功县",
              "id": "610431"
            },
            {
              "value": "兴平市",
              "id": "610481"
            }
          ]
        },
        {
          "value": "渭南市",
          "id": "270060",
          "childs": [
            {
              "value": "临渭区",
              "id": "610502"
            },
            {
              "value": "华州区",
              "id": "610503"
            },
            {
              "value": "潼关县",
              "id": "610522"
            },
            {
              "value": "大荔县",
              "id": "610523"
            },
            {
              "value": "合阳县",
              "id": "610524"
            },
            {
              "value": "澄城县",
              "id": "610525"
            },
            {
              "value": "蒲城县",
              "id": "610526"
            },
            {
              "value": "白水县",
              "id": "610527"
            },
            {
              "value": "富平县",
              "id": "610528"
            },
            {
              "value": "韩城市",
              "id": "610581"
            },
            {
              "value": "华阴市",
              "id": "610582"
            }
          ]
        },
        {
          "value": "延安市",
          "id": "270100",
          "childs": [
            {
              "value": "宝塔区",
              "id": "610602"
            },
            {
              "value": "安塞区",
              "id": "610603"
            },
            {
              "value": "延长县",
              "id": "610621"
            },
            {
              "value": "延川县",
              "id": "610622"
            },
            {
              "value": "子长县",
              "id": "610623"
            },
            {
              "value": "志丹县",
              "id": "610625"
            },
            {
              "value": "吴起县",
              "id": "610626"
            },
            {
              "value": "甘泉县",
              "id": "610627"
            },
            {
              "value": "富县",
              "id": "610628"
            },
            {
              "value": "洛川县",
              "id": "610629"
            },
            {
              "value": "宜川县",
              "id": "610630"
            },
            {
              "value": "黄龙县",
              "id": "610631"
            },
            {
              "value": "黄陵县",
              "id": "610632"
            }
          ]
        },
        {
          "value": "汉中市",
          "id": "270070",
          "childs": [
            {
              "value": "汉台区",
              "id": "610702"
            },
            {
              "value": "南郑县",
              "id": "610721"
            },
            {
              "value": "城固县",
              "id": "610722"
            },
            {
              "value": "洋县",
              "id": "610723"
            },
            {
              "value": "西乡县",
              "id": "610724"
            },
            {
              "value": "勉县",
              "id": "610725"
            },
            {
              "value": "宁强县",
              "id": "610726"
            },
            {
              "value": "略阳县",
              "id": "610727"
            },
            {
              "value": "镇巴县",
              "id": "610728"
            },
            {
              "value": "留坝县",
              "id": "610729"
            },
            {
              "value": "佛坪县",
              "id": "610730"
            }
          ]
        },
        {
          "value": "榆林市",
          "id": "270110",
          "childs": [
            {
              "value": "榆阳区",
              "id": "610802"
            },
            {
              "value": "横山区",
              "id": "610803"
            },
            {
              "value": "神木县",
              "id": "610821"
            },
            {
              "value": "府谷县",
              "id": "610822"
            },
            {
              "value": "靖边县",
              "id": "610824"
            },
            {
              "value": "定边县",
              "id": "610825"
            },
            {
              "value": "绥德县",
              "id": "610826"
            },
            {
              "value": "米脂县",
              "id": "610827"
            },
            {
              "value": "佳县",
              "id": "610828"
            },
            {
              "value": "吴堡县",
              "id": "610829"
            },
            {
              "value": "清涧县",
              "id": "610830"
            },
            {
              "value": "子洲县",
              "id": "610831"
            }
          ]
        },
        {
          "value": "安康市",
          "id": "270080",
          "childs": [
            {
              "value": "汉滨区",
              "id": "610902"
            },
            {
              "value": "汉阴县",
              "id": "610921"
            },
            {
              "value": "石泉县",
              "id": "610922"
            },
            {
              "value": "宁陕县",
              "id": "610923"
            },
            {
              "value": "紫阳县",
              "id": "610924"
            },
            {
              "value": "岚皋县",
              "id": "610925"
            },
            {
              "value": "平利县",
              "id": "610926"
            },
            {
              "value": "镇坪县",
              "id": "610927"
            },
            {
              "value": "旬阳县",
              "id": "610928"
            },
            {
              "value": "白河县",
              "id": "610929"
            }
          ]
        },
        {
          "value": "商洛市",
          "id": "270090",
          "childs": [
            {
              "value": "商州区",
              "id": "611002"
            },
            {
              "value": "洛南县",
              "id": "611021"
            },
            {
              "value": "丹凤县",
              "id": "611022"
            },
            {
              "value": "商南县",
              "id": "611023"
            },
            {
              "value": "山阳县",
              "id": "611024"
            },
            {
              "value": "镇安县",
              "id": "611025"
            },
            {
              "value": "柞水县",
              "id": "611026"
            }
          ]
        }
      ]
    },
    {
      "value": "甘肃省",
      "id": "100",
      "childs": [
        {
          "value": "兰州市",
          "id": "100020",
          "childs": [
            {
              "value": "城关区",
              "id": "620102"
            },
            {
              "value": "七里河区",
              "id": "620103"
            },
            {
              "value": "西固区",
              "id": "620104"
            },
            {
              "value": "安宁区",
              "id": "620105"
            },
            {
              "value": "红古区",
              "id": "620111"
            },
            {
              "value": "永登县",
              "id": "620121"
            },
            {
              "value": "皋兰县",
              "id": "620122"
            },
            {
              "value": "榆中县",
              "id": "620123"
            }
          ]
        },
        {
          "value": "嘉峪关市",
          "id": "100030",
          "childs": [
            {
              "value": "雄关区",
              "id": "620201"
            },
            {
              "value": "镜铁区",
              "id": "620122"
            },
            {
              "value": "长城区",
              "id": "620122"
            }
          ]
        },
        {
          "value": "金昌市",
          "id": "100050",
          "childs": [
            {
              "value": "金川区",
              "id": "620302"
            },
            {
              "value": "永昌县",
              "id": "620321"
            }
          ]
        },
        {
          "value": "白银市",
          "id": "100060",
          "childs": [
            {
              "value": "白银区",
              "id": "620402"
            },
            {
              "value": "平川区",
              "id": "620403"
            },
            {
              "value": "靖远县",
              "id": "620421"
            },
            {
              "value": "会宁县",
              "id": "620422"
            },
            {
              "value": "景泰县",
              "id": "620423"
            }
          ]
        },
        {
          "value": "天水市",
          "id": "100070",
          "childs": [
            {
              "value": "秦州区",
              "id": "620502"
            },
            {
              "value": "麦积区",
              "id": "620503"
            },
            {
              "value": "清水县",
              "id": "620521"
            },
            {
              "value": "秦安县",
              "id": "620522"
            },
            {
              "value": "甘谷县",
              "id": "620523"
            },
            {
              "value": "武山县",
              "id": "620524"
            },
            {
              "value": "张家川回族自治县",
              "id": "620525"
            }
          ]
        },
        {
          "value": "武威市",
          "id": "100090",
          "childs": [
            {
              "value": "凉州区",
              "id": "620602"
            },
            {
              "value": "民勤县",
              "id": "620621"
            },
            {
              "value": "古浪县",
              "id": "620622"
            },
            {
              "value": "天祝藏族自治县",
              "id": "620623"
            }
          ]
        },
        {
          "value": "张掖市",
          "id": "100080",
          "childs": [
            {
              "value": "甘州区",
              "id": "620702"
            },
            {
              "value": "肃南裕固族自治县",
              "id": "620721"
            },
            {
              "value": "民乐县",
              "id": "620722"
            },
            {
              "value": "临泽县",
              "id": "620723"
            },
            {
              "value": "高台县",
              "id": "620724"
            },
            {
              "value": "山丹县",
              "id": "620725"
            }
          ]
        },
        {
          "value": "平凉市",
          "id": "100120",
          "childs": [
            {
              "value": "崆峒区",
              "id": "620802"
            },
            {
              "value": "泾川县",
              "id": "620821"
            },
            {
              "value": "灵台县",
              "id": "620822"
            },
            {
              "value": "崇信县",
              "id": "620823"
            },
            {
              "value": "华亭县",
              "id": "620824"
            },
            {
              "value": "庄浪县",
              "id": "620825"
            },
            {
              "value": "静宁县",
              "id": "620826"
            }
          ]
        },
        {
          "value": "酒泉市",
          "id": "100040",
          "childs": [
            {
              "value": "肃州区",
              "id": "620902"
            },
            {
              "value": "金塔县",
              "id": "620921"
            },
            {
              "value": "瓜州县",
              "id": "620922"
            },
            {
              "value": "肃北蒙古族自治县",
              "id": "620923"
            },
            {
              "value": "阿克塞哈萨克族自治县",
              "id": "620924"
            },
            {
              "value": "玉门市",
              "id": "620981"
            },
            {
              "value": "敦煌市",
              "id": "620982"
            }
          ]
        },
        {
          "value": "庆阳市",
          "id": "100130",
          "childs": [
            {
              "value": "西峰区",
              "id": "621002"
            },
            {
              "value": "庆城县",
              "id": "621021"
            },
            {
              "value": "环县",
              "id": "621022"
            },
            {
              "value": "华池县",
              "id": "621023"
            },
            {
              "value": "合水县",
              "id": "621024"
            },
            {
              "value": "正宁县",
              "id": "621025"
            },
            {
              "value": "宁县",
              "id": "621026"
            },
            {
              "value": "镇原县",
              "id": "621027"
            }
          ]
        },
        {
          "value": "定西市",
          "id": "100100",
          "childs": [
            {
              "value": "安定区",
              "id": "621102"
            },
            {
              "value": "通渭县",
              "id": "621121"
            },
            {
              "value": "陇西县",
              "id": "621122"
            },
            {
              "value": "渭源县",
              "id": "621123"
            },
            {
              "value": "临洮县",
              "id": "621124"
            },
            {
              "value": "漳县",
              "id": "621125"
            },
            {
              "value": "岷县",
              "id": "621126"
            }
          ]
        },
        {
          "value": "陇南市",
          "id": "100110",
          "childs": [
            {
              "value": "武都区",
              "id": "621202"
            },
            {
              "value": "成县",
              "id": "621221"
            },
            {
              "value": "文县",
              "id": "621222"
            },
            {
              "value": "宕昌县",
              "id": "621223"
            },
            {
              "value": "康县",
              "id": "621224"
            },
            {
              "value": "西和县",
              "id": "621225"
            },
            {
              "value": "礼县",
              "id": "621226"
            },
            {
              "value": "徽县",
              "id": "621227"
            },
            {
              "value": "两当县",
              "id": "621228"
            }
          ]
        },
        {
          "value": "临夏回族自治州",
          "id": "100140",
          "childs": [
            {
              "value": "临夏市",
              "id": "622901"
            },
            {
              "value": "临夏县",
              "id": "622921"
            },
            {
              "value": "康乐县",
              "id": "622922"
            },
            {
              "value": "永靖县",
              "id": "622923"
            },
            {
              "value": "广河县",
              "id": "622924"
            },
            {
              "value": "和政县",
              "id": "622925"
            },
            {
              "value": "东乡族自治县",
              "id": "622926"
            },
            {
              "value": "积石山保安族东乡族撒拉族自治县",
              "id": "622927"
            }
          ]
        },
        {
          "value": "甘南藏族自治州",
          "id": "100150",
          "childs": [
            {
              "value": "合作市",
              "id": "623001"
            },
            {
              "value": "临潭县",
              "id": "623021"
            },
            {
              "value": "卓尼县",
              "id": "623022"
            },
            {
              "value": "舟曲县",
              "id": "623023"
            },
            {
              "value": "迭部县",
              "id": "623024"
            },
            {
              "value": "玛曲县",
              "id": "623025"
            },
            {
              "value": "碌曲县",
              "id": "623026"
            },
            {
              "value": "夏河县",
              "id": "623027"
            }
          ]
        }
      ]
    },
    {
      "value": "青海省",
      "id": "240",
      "childs": [
        {
          "value": "西宁市",
          "id": "240020",
          "childs": [
            {
              "value": "城东区",
              "id": "630102"
            },
            {
              "value": "城中区",
              "id": "630103"
            },
            {
              "value": "城西区",
              "id": "630104"
            },
            {
              "value": "城北区",
              "id": "630105"
            },
            {
              "value": "大通回族土族自治县",
              "id": "630121"
            },
            {
              "value": "湟中县",
              "id": "630122"
            },
            {
              "value": "湟源县",
              "id": "630123"
            }
          ]
        },
        {
          "value": "海东市",
          "id": "240030",
          "childs": [
            {
              "value": "乐都区",
              "id": "630202"
            },
            {
              "value": "平安区",
              "id": "630203"
            },
            {
              "value": "民和回族土族自治县",
              "id": "630222"
            },
            {
              "value": "互助土族自治县",
              "id": "630223"
            },
            {
              "value": "化隆回族自治县",
              "id": "630224"
            },
            {
              "value": "循化撒拉族自治县",
              "id": "630225"
            }
          ]
        },
        {
          "value": "海北藏族自治州",
          "id": "240050",
          "childs": [
            {
              "value": "门源回族自治县",
              "id": "632221"
            },
            {
              "value": "祁连县",
              "id": "632222"
            },
            {
              "value": "海晏县",
              "id": "632223"
            },
            {
              "value": "刚察县",
              "id": "632224"
            }
          ]
        },
        {
          "value": "黄南藏族自治州",
          "id": "240060",
          "childs": [
            {
              "value": "同仁县",
              "id": "632321"
            },
            {
              "value": "尖扎县",
              "id": "632322"
            },
            {
              "value": "泽库县",
              "id": "632323"
            },
            {
              "value": "河南蒙古族自治县",
              "id": "632324"
            }
          ]
        },
        {
          "value": "海南藏族自治州",
          "id": "240070",
          "childs": [
            {
              "value": "共和县",
              "id": "632521"
            },
            {
              "value": "同德县",
              "id": "632522"
            },
            {
              "value": "贵德县",
              "id": "632523"
            },
            {
              "value": "兴海县",
              "id": "632524"
            },
            {
              "value": "贵南县",
              "id": "632525"
            }
          ]
        },
        {
          "value": "果洛藏族自治州",
          "id": "240080",
          "childs": [
            {
              "value": "玛沁县",
              "id": "632621"
            },
            {
              "value": "班玛县",
              "id": "632622"
            },
            {
              "value": "甘德县",
              "id": "632623"
            },
            {
              "value": "达日县",
              "id": "632624"
            },
            {
              "value": "久治县",
              "id": "632625"
            },
            {
              "value": "玛多县",
              "id": "632626"
            }
          ]
        },
        {
          "value": "玉树藏族自治州",
          "id": "240090",
          "childs": [
            {
              "value": "玉树市",
              "id": "632701"
            },
            {
              "value": "杂多县",
              "id": "632722"
            },
            {
              "value": "称多县",
              "id": "632723"
            },
            {
              "value": "治多县",
              "id": "632724"
            },
            {
              "value": "囊谦县",
              "id": "632725"
            },
            {
              "value": "曲麻莱县",
              "id": "632726"
            }
          ]
        },
        {
          "value": "海西蒙古族藏族自治州",
          "id": "240040",
          "childs": [
            {
              "value": "格尔木市",
              "id": "632801"
            },
            {
              "value": "德令哈市",
              "id": "632802"
            },
            {
              "value": "乌兰县",
              "id": "632821"
            },
            {
              "value": "都兰县",
              "id": "632822"
            },
            {
              "value": "天峻县",
              "id": "632823"
            }
          ]
        }
      ]
    },
    {
      "value": "宁夏回族自治区",
      "id": "230",
      "childs": [
        {
          "value": "银川市",
          "id": "230020",
          "childs": [
            {
              "value": "兴庆区",
              "id": "640104"
            },
            {
              "value": "西夏区",
              "id": "640105"
            },
            {
              "value": "金凤区",
              "id": "640106"
            },
            {
              "value": "永宁县",
              "id": "640121"
            },
            {
              "value": "贺兰县",
              "id": "640122"
            },
            {
              "value": "灵武市",
              "id": "640181"
            }
          ]
        },
        {
          "value": "石嘴山市",
          "id": "230030",
          "childs": [
            {
              "value": "大武口区",
              "id": "640202"
            },
            {
              "value": "惠农区",
              "id": "640205"
            },
            {
              "value": "平罗县",
              "id": "640221"
            }
          ]
        },
        {
          "value": "吴忠市",
          "id": "230040",
          "childs": [
            {
              "value": "利通区",
              "id": "640302"
            },
            {
              "value": "红寺堡区",
              "id": "640303"
            },
            {
              "value": "盐池县",
              "id": "640323"
            },
            {
              "value": "同心县",
              "id": "640324"
            },
            {
              "value": "青铜峡市",
              "id": "640381"
            }
          ]
        },
        {
          "value": "固原市",
          "id": "230050",
          "childs": [
            {
              "value": "原州区",
              "id": "640402"
            },
            {
              "value": "西吉县",
              "id": "640422"
            },
            {
              "value": "隆德县",
              "id": "640423"
            },
            {
              "value": "泾源县",
              "id": "640424"
            },
            {
              "value": "彭阳县",
              "id": "640425"
            }
          ]
        },
        {
          "value": "中卫市",
          "id": "230060",
          "childs": [
            {
              "value": "沙坡头区",
              "id": "640502"
            },
            {
              "value": "中宁县",
              "id": "640521"
            },
            {
              "value": "海原县",
              "id": "640522"
            }
          ]
        }
      ]
    },
    {
      "value": "新疆维吾尔自治区",
      "id": "300",
      "childs": [
        {
          "value": "乌鲁木齐市",
          "id": "300020",
          "childs": [
            {
              "value": "天山区",
              "id": "650102"
            },
            {
              "value": "沙依巴克区",
              "id": "650103"
            },
            {
              "value": "新市区",
              "id": "650104"
            },
            {
              "value": "水磨沟区",
              "id": "650105"
            },
            {
              "value": "头屯河区",
              "id": "650106"
            },
            {
              "value": "达坂城区",
              "id": "650107"
            },
            {
              "value": "米东区",
              "id": "650109"
            },
            {
              "value": "乌鲁木齐县",
              "id": "650121"
            }
          ]
        },
        {
          "value": "克拉玛依市",
          "id": "300040",
          "childs": [
            {
              "value": "独山子区",
              "id": "650202"
            },
            {
              "value": "克拉玛依区",
              "id": "650203"
            },
            {
              "value": "白碱滩区",
              "id": "650204"
            },
            {
              "value": "乌尔禾区",
              "id": "650205"
            }
          ]
        },
        {
          "value": "吐鲁番市",
          "id": "300140",
          "childs": [
            {
              "value": "高昌区",
              "id": "650402"
            },
            {
              "value": "鄯善县",
              "id": "650421"
            },
            {
              "value": "托克逊县",
              "id": "650422"
            }
          ]
        },
        {
          "value": "哈密市",
          "id": "300070",
          "childs": [
            {
              "value": "伊州区",
              "id": "650502"
            },
            {
              "value": "巴里坤哈萨克自治县",
              "id": "650521"
            },
            {
              "value": "伊吾县",
              "id": "650522"
            }
          ]
        },
        {
          "value": "昌吉回族自治州",
          "id": "300120",
          "childs": [
            {
              "value": "昌吉市",
              "id": "652301"
            },
            {
              "value": "阜康市",
              "id": "652302"
            },
            {
              "value": "呼图壁县",
              "id": "652323"
            },
            {
              "value": "玛纳斯县",
              "id": "652324"
            },
            {
              "value": "奇台县",
              "id": "652325"
            },
            {
              "value": "吉木萨尔县",
              "id": "652327"
            },
            {
              "value": "木垒哈萨克自治县",
              "id": "652328"
            }
          ]
        },
        {
          "value": "博尔塔拉蒙古自治州",
          "id": "300190",
          "childs": [
            {
              "value": "博乐市",
              "id": "652701"
            },
            {
              "value": "阿拉山口市",
              "id": "652702"
            },
            {
              "value": "精河县",
              "id": "652722"
            },
            {
              "value": "温泉县",
              "id": "652723"
            }
          ]
        },
        {
          "value": "巴音郭楞蒙古自治州",
          "id": "300180",
          "childs": [
            {
              "value": "库尔勒市",
              "id": "652801"
            },
            {
              "value": "轮台县",
              "id": "652822"
            },
            {
              "value": "尉犁县",
              "id": "652823"
            },
            {
              "value": "若羌县",
              "id": "652824"
            },
            {
              "value": "且末县",
              "id": "652825"
            },
            {
              "value": "焉耆回族自治县",
              "id": "652826"
            },
            {
              "value": "和静县",
              "id": "652827"
            },
            {
              "value": "和硕县",
              "id": "652828"
            },
            {
              "value": "博湖县",
              "id": "652829"
            }
          ]
        },
        {
          "value": "阿克苏地区",
          "id": "300060",
          "childs": [
            {
              "value": "阿克苏市",
              "id": "652901"
            },
            {
              "value": "温宿县",
              "id": "652922"
            },
            {
              "value": "库车县",
              "id": "652923"
            },
            {
              "value": "沙雅县",
              "id": "652924"
            },
            {
              "value": "新和县",
              "id": "652925"
            },
            {
              "value": "拜城县",
              "id": "652926"
            },
            {
              "value": "乌什县",
              "id": "652927"
            },
            {
              "value": "阿瓦提县",
              "id": "652928"
            },
            {
              "value": "柯坪县",
              "id": "652929"
            }
          ]
        },
        {
          "value": "喀什地区",
          "id": "300030",
          "childs": [
            {
              "value": "喀什市",
              "id": "653101"
            },
            {
              "value": "疏附县",
              "id": "653121"
            },
            {
              "value": "疏勒县",
              "id": "653122"
            },
            {
              "value": "英吉沙县",
              "id": "653123"
            },
            {
              "value": "泽普县",
              "id": "653124"
            },
            {
              "value": "莎车县",
              "id": "653125"
            },
            {
              "value": "叶城县",
              "id": "653126"
            },
            {
              "value": "麦盖提县",
              "id": "653127"
            },
            {
              "value": "岳普湖县",
              "id": "653128"
            },
            {
              "value": "伽师县",
              "id": "653129"
            },
            {
              "value": "巴楚县",
              "id": "653130"
            },
            {
              "value": "塔什库尔干塔吉克自治县",
              "id": "653131"
            }
          ]
        },
        {
          "value": "和田地区",
          "id": "300160",
          "childs": [
            {
              "value": "和田市",
              "id": "653201"
            },
            {
              "value": "和田县",
              "id": "653221"
            },
            {
              "value": "墨玉县",
              "id": "653222"
            },
            {
              "value": "皮山县",
              "id": "653223"
            },
            {
              "value": "洛浦县",
              "id": "653224"
            },
            {
              "value": "策勒县",
              "id": "653225"
            },
            {
              "value": "于田县",
              "id": "653226"
            },
            {
              "value": "民丰县",
              "id": "653227"
            }
          ]
        },
        {
          "value": "伊犁哈萨克自治州",
          "id": "300050",
          "childs": [
            {
              "value": "伊宁市",
              "id": "654002"
            },
            {
              "value": "奎屯市",
              "id": "654003"
            },
            {
              "value": "霍尔果斯市",
              "id": "654004"
            },
            {
              "value": "伊宁县",
              "id": "654021"
            },
            {
              "value": "察布查尔锡伯自治县",
              "id": "654022"
            },
            {
              "value": "霍城县",
              "id": "654023"
            },
            {
              "value": "巩留县",
              "id": "654024"
            },
            {
              "value": "新源县",
              "id": "654025"
            },
            {
              "value": "昭苏县",
              "id": "654026"
            },
            {
              "value": "特克斯县",
              "id": "654027"
            },
            {
              "value": "尼勒克县",
              "id": "654028"
            }
          ]
        },
        {
          "value": "塔城地区",
          "id": "300150",
          "childs": [
            {
              "value": "塔城市",
              "id": "654201"
            },
            {
              "value": "乌苏市",
              "id": "654202"
            },
            {
              "value": "额敏县",
              "id": "654221"
            },
            {
              "value": "沙湾县",
              "id": "654223"
            },
            {
              "value": "托里县",
              "id": "654224"
            },
            {
              "value": "裕民县",
              "id": "654225"
            },
            {
              "value": "和布克赛尔蒙古自治县",
              "id": "654226"
            }
          ]
        },
        {
          "value": "阿勒泰地区",
          "id": "300130",
          "childs": [
            {
              "value": "阿勒泰市",
              "id": "654301"
            },
            {
              "value": "布尔津县",
              "id": "654321"
            },
            {
              "value": "富蕴县",
              "id": "654322"
            },
            {
              "value": "福海县",
              "id": "654323"
            },
            {
              "value": "哈巴河县",
              "id": "654324"
            },
            {
              "value": "青河县",
              "id": "654325"
            },
            {
              "value": "吉木乃县",
              "id": "654326"
            }
          ]
        },
        {
          "value": "自治区直辖县级行政区划",
          "id": "659000",
          "childs": [
            {
              "value": "石河子市",
              "id": "300080"
            },
            {
              "value": "阿拉尔市",
              "id": "300090"
            },
            {
              "value": "图木舒克市",
              "id": "300110"
            },
            {
              "value": "五家渠市",
              "id": "300100"
            }
          ]
        }
      ]
    }
  ];
  function getProvinces() {
    var provinces2 = [];
    for (var i = 0; i < AreaJson.length; i++) {
      provinces2.push(AreaJson[i].value);
    }
    return provinces2;
  }
  function getProvincesid() {
    var provincesid2 = [];
    for (var i = 0; i < AreaJson.length; i++) {
      provincesid2.push(AreaJson[i].id);
    }
    return provincesid2;
  }
  function getMyCity(provinceIndex) {
    var citys = [];
    for (var i = 0; i < AreaJson[provinceIndex].childs.length; i++) {
      citys.push(AreaJson[provinceIndex].childs[i].value);
    }
    return citys;
  }
  function getMyCityid(provinceIndex) {
    var citysid = [];
    for (var i = 0; i < AreaJson[provinceIndex].childs.length; i++) {
      citysid.push(AreaJson[provinceIndex].childs[i].id);
    }
    return citysid;
  }
  let index = [0, 0, 0];
  let provinces = getProvinces();
  getMyCity(index[0]);
  let provincesid = getProvincesid();
  getMyCityid(index[0]);
  const _sfc_main$h = {
    mixins: [{
      methods: {
        setData: function(obj, callback) {
          let that = this;
          const handleData = (tepData, tepKey, afterKey) => {
            tepKey = tepKey.split(".");
            tepKey.forEach((item) => {
              if (tepData[item] === null || tepData[item] === void 0) {
                let reg = /^[0-9]+$/;
                tepData[item] = reg.test(afterKey) ? [] : {};
                tepData = tepData[item];
              } else {
                tepData = tepData[item];
              }
            });
            return tepData;
          };
          const isFn = function(value) {
            return typeof value == "function" || false;
          };
          Object.keys(obj).forEach(function(key) {
            let val = obj[key];
            key = key.replace(/\]/g, "").replace(/\[/g, ".");
            let front, after;
            let index_after = key.lastIndexOf(".");
            if (index_after != -1) {
              after = key.slice(index_after + 1);
              front = handleData(that, key.slice(0, index_after), after);
            } else {
              after = key;
              front = that;
            }
            if (front.$data && front.$data[after] === void 0) {
              Object.defineProperty(front, after, {
                get() {
                  return front.$data[after];
                },
                set(newValue) {
                  front.$data[after] = newValue;
                  that.$forceUpdate();
                },
                enumerable: true,
                configurable: true
              });
              Reflect.set(front, after, val);
            } else {
              Reflect.set(front, after, val);
            }
          });
          isFn(callback) && this.$nextTick(callback);
        }
      }
    }],
    data() {
      return {
        provinces: getProvinces(),
        provincesid: getProvincesid(),
        citys: getMyCity(index[0]),
        citysid: getMyCityid(index[0]),
        value: [0, 0, 0]
      };
    },
    components: {},
    props: {
      // 省
      province: {
        //控制area_select显示隐藏
        type: String,
        default: ""
      },
      // 市
      city: {
        //控制area_select显示隐藏
        type: String,
        default: ""
      },
      // 省id
      provinceid: {
        //控制area_select显示隐藏
        type: String,
        default: ""
      },
      // 市id
      cityid: {
        //控制area_select显示隐藏
        type: String,
        default: ""
      },
      show: {
        //控制area_select显示隐藏
        type: Boolean,
        default: false
      },
      maskShow: {
        //是否显示蒙层
        type: Boolean,
        default: true
      }
    },
    mounted() {
      let provinceIndex = this.provinces.indexOf(this.province);
      this.citys = getMyCity(provinceIndex);
      let cityIndex = this.citys.indexOf(this.city);
      this.value = [provinceIndex, cityIndex];
      formatAppLog("log", "at uni_modules/cc-selectDity/components/cc-selectDity/cc-selectDity.vue:164", "this.value = " + JSON.stringify(this.value));
    },
    methods: {
      handleNYZAreaChange: function(e) {
        var that = this;
        formatAppLog("log", "at uni_modules/cc-selectDity/components/cc-selectDity/cc-selectDity.vue:171", "e:" + JSON.stringify(e));
        var value = e.detail.value;
        if (index[0] != value[0]) {
          index = [value[0], 0, 0];
          let selectCitys = getMyCity(index[0]);
          let selectCitysid = getMyCityid(index[0]);
          that.setData({
            citys: selectCitys,
            value: [index[0], 0, 0]
          });
          that.$emit("changeClick", provinces[index[0]], provincesid[index[0]], selectCitys[index[1]], selectCitysid[index[1]]);
        } else if (index[1] != value[1]) {
          index = [value[0], value[1], 0];
          let selectCitys = getMyCity(index[0]);
          let selectCitysid = getMyCityid(index[0]);
          that.setData({
            citys: selectCitys,
            value: [index[0], index[1], 0]
          });
          that.$emit("changeClick", provinces[index[0]], provincesid[index[0]], selectCitys[index[1]], selectCitysid[index[1]]);
        } else if (index[2] != value[2]) {
          index = [value[0], value[1], value[2]];
          let selectCitys = getMyCity(index[0]);
          let selectCitysid = getMyCityid(index[0]);
          that.setData({
            citys: selectCitys,
            value: [index[0], index[1], index[2]]
          });
          that.$emit("changeClick", provinces[index[0]], provincesid[index[0]], selectCitys[index[1]], selectCitysid[index[1]]);
        }
      },
      /**
       * 确定按钮的点击事件
       */
      handleNYZAreaSelect: function(e) {
        formatAppLog("log", "at uni_modules/cc-selectDity/components/cc-selectDity/cc-selectDity.vue:225", e);
        var myEventDetail = e;
        var myEventOption = {};
        this.$emit("sureSelectArea", {
          detail: myEventDetail
        }, myEventOption);
        index = [0, 0, 0];
      },
      /**
       * 取消按钮的点击事件
       */
      handleNYZAreaCancle: function(e) {
        formatAppLog("log", "at uni_modules/cc-selectDity/components/cc-selectDity/cc-selectDity.vue:240", "e:" + JSON.stringify(e));
        this.$emit("hideShow", {
          detail: false
        });
        index = [0, 0, 0];
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode("自定义地址选择器"),
      vue.withDirectives(vue.createElementVNode(
        "view",
        { class: "cc_area_mask" },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vShow, $props.show == true]
      ]),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass("cc_area_view " + ($props.show ? "show" : "hide"))
        },
        [
          vue.createElementVNode("view", { class: "cc_area_view_btns" }, [
            vue.createElementVNode("text", {
              class: "cc_area_view_btn_cancle",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.handleNYZAreaCancle && $options.handleNYZAreaCancle(...args))
            }, "取消"),
            vue.createElementVNode("text", {
              class: "cc_area_view_btn_sure",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.handleNYZAreaSelect && $options.handleNYZAreaSelect(...args)),
              "data-province": $props.province,
              "data-city": $props.city,
              "data-provinceid": $props.provinceid,
              "data-cityid": $props.cityid
            }, "确定", 8, ["data-province", "data-city", "data-provinceid", "data-cityid"])
          ]),
          vue.createElementVNode("picker-view", {
            class: "cc_area_pick_view",
            "indicator-style": "height: 35px;",
            onChange: _cache[2] || (_cache[2] = (...args) => $options.handleNYZAreaChange && $options.handleNYZAreaChange(...args)),
            value: $data.value
          }, [
            vue.createElementVNode("picker-view-column", null, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.provinces, (item, index2) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: index2,
                      class: "cc_area_colum_view"
                    },
                    vue.toDisplayString(item),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createElementVNode("picker-view-column", null, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.citys, (item, index2) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: index2,
                      class: "cc_area_colum_view"
                    },
                    vue.toDisplayString(item),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ], 40, ["value"])
        ],
        2
        /* CLASS */
      )
    ]);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-b37c5dc6"], ["__file", "D:/lj/haoxingj/haoxingj/uni_modules/cc-selectDity/components/cc-selectDity/cc-selectDity.vue"]]);
  const graceChecker = {
    error: "",
    check: function(data, rule) {
      for (var i = 0; i < rule.length; i++) {
        if (!rule[i].checkType) {
          return true;
        }
        if (!rule[i].name) {
          return true;
        }
        if (!rule[i].errorMsg) {
          return true;
        }
        if (!data[rule[i].name]) {
          this.error = rule[i].errorMsg;
          return false;
        }
        switch (rule[i].checkType) {
          case "string":
            var reg = new RegExp("^.{" + rule[i].checkRule + "}$");
            if (!reg.test(data[rule[i].name])) {
              this.error = rule[i].errorMsg;
              return false;
            }
            break;
          case "int":
            var reg = new RegExp("^(-[1-9]|[1-9])[0-9]{" + rule[i].checkRule + "}$");
            if (!reg.test(data[rule[i].name])) {
              this.error = rule[i].errorMsg;
              return false;
            }
            break;
          case "between":
            if (!this.isNumber(data[rule[i].name])) {
              this.error = rule[i].errorMsg;
              return false;
            }
            var minMax = rule[i].checkRule.split(",");
            minMax[0] = Number(minMax[0]);
            minMax[1] = Number(minMax[1]);
            if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
              this.error = rule[i].errorMsg;
              return false;
            }
            break;
          case "betweenD":
            var reg = /^-?[1-9][0-9]?$/;
            if (!reg.test(data[rule[i].name])) {
              this.error = rule[i].errorMsg;
              return false;
            }
            var minMax = rule[i].checkRule.split(",");
            minMax[0] = Number(minMax[0]);
            minMax[1] = Number(minMax[1]);
            if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
              this.error = rule[i].errorMsg;
              return false;
            }
            break;
          case "betweenF":
            var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
            if (!reg.test(data[rule[i].name])) {
              this.error = rule[i].errorMsg;
              return false;
            }
            var minMax = rule[i].checkRule.split(",");
            minMax[0] = Number(minMax[0]);
            minMax[1] = Number(minMax[1]);
            if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
              this.error = rule[i].errorMsg;
              return false;
            }
            break;
          case "same":
            if (data[rule[i].name] != rule[i].checkRule) {
              this.error = rule[i].errorMsg;
              return false;
            }
            break;
          case "notsame":
            if (data[rule[i].name] == rule[i].checkRule) {
              this.error = rule[i].errorMsg;
              return false;
            }
            break;
          case "email":
            var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (!reg.test(data[rule[i].name])) {
              this.error = rule[i].errorMsg;
              return false;
            }
            break;
          case "phoneno":
            var reg = /^1[0-9]{10,10}$/;
            if (!reg.test(data[rule[i].name])) {
              this.error = rule[i].errorMsg;
              return false;
            }
            break;
          case "zipcode":
            var reg = /^[0-9]{6}$/;
            if (!reg.test(data[rule[i].name])) {
              this.error = rule[i].errorMsg;
              return false;
            }
            break;
          case "reg":
            var reg = new RegExp(rule[i].checkRule);
            if (!reg.test(data[rule[i].name])) {
              this.error = rule[i].errorMsg;
              return false;
            }
            break;
          case "in":
            if (rule[i].checkRule.indexOf(data[rule[i].name]) == -1) {
              this.error = rule[i].errorMsg;
              return false;
            }
            break;
          case "notnull":
            if (data[rule[i].name] == null || data[rule[i].name].length < 1) {
              this.error = rule[i].errorMsg;
              return false;
            }
            break;
        }
      }
      return true;
    },
    isNumber: function(checkVal) {
      var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
      return reg.test(checkVal);
    }
  };
  const _sfc_main$g = {
    components: {
      agree: __easycom_0
    },
    data() {
      return {
        checkboxList1: [
          {
            value: "1",
            title: "5万以内"
          },
          {
            value: "2",
            title: "5-10万元"
          },
          {
            value: "3",
            title: "10-50万元"
          },
          {
            value: "4",
            title: "50-100万元"
          },
          {
            value: "5",
            title: "100万元以上"
          }
        ],
        checkboxList2: [
          {
            value: "1",
            title: "1年以内"
          },
          {
            value: "2",
            title: "1-3年"
          },
          {
            value: "3",
            title: "3-5年"
          },
          {
            value: "4",
            title: "5-10年"
          },
          {
            value: "5",
            title: "10年以上"
          }
        ],
        checkboxList3: [
          {
            value: "1",
            title: "国有企业"
          },
          {
            value: "2",
            title: "国有控股"
          },
          {
            value: "3",
            title: "外资"
          },
          {
            value: "4",
            title: "合资"
          },
          {
            value: "5",
            title: "民营"
          },
          {
            value: "6",
            title: "事业单位"
          },
          {
            value: "7",
            title: "政府机关"
          },
          {
            value: "8",
            title: "个体户"
          },
          {
            value: "9",
            title: "自由职业"
          }
        ],
        checkboxList4: [
          {
            value: "1",
            title: "50万以内"
          },
          {
            value: "2",
            title: "50-100万"
          },
          {
            value: "3",
            title: "100-500万"
          },
          {
            value: "4",
            title: "500万-1000万"
          },
          {
            value: "5",
            title: "1000万以上"
          }
        ],
        treaty: false,
        value: "",
        backData: "",
        company_name: "",
        name: "",
        phone: "",
        we_chat: "",
        backData: "",
        backData: "",
        money: "",
        money_val: "",
        experience_years: "",
        experience_years_val: "",
        company_nature: "",
        company_nature_val: "",
        registered_capital: "",
        registered_capital_val: "",
        isAgree: false,
        // 地区
        province: "北京市",
        cityData: "北京市",
        provinceid: "",
        cityid: "",
        city_code: "010",
        cityCode: "",
        address: "",
        show: false,
        pageShow: false
      };
    },
    onShow() {
      let token = uni.getStorageSync("token");
      uni.request({
        url: "https://api.maimangbox.cn/corporateloan",
        header: {
          "content-type": "application/json",
          "api-token": token
        },
        method: "POST",
        success: (res) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
          if (res.data.resultCode == 1e4) {
            this.pageShow = true;
            this.backData = res.data.data.userInfo;
            this.company_name = (_a = res.data.data.userInfo) == null ? void 0 : _a.company_name;
            this.name = (_b = res.data.data.userInfo) == null ? void 0 : _b.name;
            this.phone = (_c = res.data.data.userInfo) == null ? void 0 : _c.phone;
            this.city = (_d = res.data.data.userInfo) == null ? void 0 : _d.city;
            this.city_code = (_e = res.data.data.userInfo) == null ? void 0 : _e.city_code;
            this.we_chat = (_f = res.data.data.userInfo) == null ? void 0 : _f.we_chat;
            this.money = (_g = res.data.data.userInfo) == null ? void 0 : _g.money;
            this.money_val = (_h = res.data.data.userInfo) == null ? void 0 : _h.money_val;
            this.experience_years = (_i = res.data.data.userInfo) == null ? void 0 : _i.experience_years;
            this.experience_years_val = (_j = res.data.data.userInfo) == null ? void 0 : _j.experience_years_val;
            this.company_nature = (_k = res.data.data.userInfo) == null ? void 0 : _k.company_nature;
            this.company_nature_val = (_l = res.data.data.userInfo) == null ? void 0 : _l.company_nature_val;
            this.registered_capital = (_m = res.data.data.userInfo) == null ? void 0 : _m.registered_capital;
            this.registered_capital_val = (_n = res.data.data.userInfo) == null ? void 0 : _n.registered_capital_val;
          } else {
            uni.navigateTo({
              url: "/pages/login" + res.data.applyUrl || "?next=" + nextParam
            });
          }
        }
      });
    },
    methods: {
      formSubmit: function(e) {
        formatAppLog("log", "at pages/corporateloan/corporateloan.vue:296", "form发生了submit事件，携带数据为：" + JSON.stringify(e.detail.value));
        var rule = [
          { name: "company_name", checkType: "notnull", checkRule: "", errorMsg: "企业名称不能为空" },
          { name: "name", checkType: "notnull", checkRule: "", errorMsg: "姓名不能为空" },
          { name: "phone", checkType: "phoneno", checkRule: "", errorMsg: "手机号不能为空" },
          { name: "we_chat", checkType: "notnull", checkRule: "", errorMsg: "微信不能为空" },
          { name: "money", checkType: "in", checkRule: "1,2,3,4,5", errorMsg: "请选择所需资金" },
          { name: "experience_years", checkType: "in", checkRule: "1,2,3,4,5", errorMsg: "请选择经营年限" },
          { name: "company_nature", checkType: "in", checkRule: "1,2,3,4,5,6,7,8,9", errorMsg: "请选择企业性质" },
          { name: "registered_capital", checkType: "in", checkRule: "1,2,3,4,5", errorMsg: "请选择注册资金" }
        ];
        var formData = e.detail.value;
        if (this.city_code == void 0) {
          formData.city_code = "010";
        }
        formatAppLog("log", "at pages/corporateloan/corporateloan.vue:313", formData);
        formData = Object.assign({}, this.backData, formData);
        var checkRes = graceChecker.check(formData, rule);
        if (this.isAgree != true) {
          uni.showToast({ title: "请勾选用户协议和隐私协议", icon: "none" });
          return;
        }
        if (checkRes) {
          uni.request({
            url: "https://api.maimangbox.cn/form",
            data: {
              formData
            },
            header: {
              "api-token": uni.getStorageSync("token")
            },
            method: "POST",
            success: (res) => {
              if (res.data.resultCode == 1e4) {
                uni.showToast({ title: "提交成功", icon: "none" });
                setTimeout(function() {
                  uni.navigateTo({
                    url: "/pages/mate/mate?next=mate"
                  });
                }, 3e3);
              } else {
                uni.showToast({ title: res.data.resultMsg, icon: "none" });
              }
            }
          });
        } else {
          uni.showToast({ title: graceChecker.error, icon: "none" });
        }
      },
      formReset: function(e) {
        formatAppLog("log", "at pages/corporateloan/corporateloan.vue:348", "清空数据");
      },
      checkboxChange(e, checkboxList, type) {
        var items = checkboxList, values = e.detail.value;
        e.currentTarget.dataset.name;
        for (var i = 0, lenI = items.length; i < lenI; ++i) {
          const item = items[i];
          if (values.includes(item.value)) {
            this.$set(item, "checked", true);
            if (type == 1) {
              this.money = values;
              this.money_val = item.title;
            }
            if (type == 2) {
              this.experience_years = values;
              this.experience_years_val = item.title;
            }
            if (type == 3) {
              this.company_nature = values;
              this.company_nature_val = item.title;
            }
            if (type == 4) {
              this.registered_capital = values;
              this.registered_capital_val = item.title;
            }
          } else {
            this.$set(item, "checked", false);
          }
        }
      },
      handleChange(e) {
        this.backData.car = "";
        this.value = e.detail.value;
        formatAppLog("log", "at pages/corporateloan/corporateloan.vue:382", this.value);
        if (this.value.length == 0) {
          uni.showToast({ title: "请勾选已同意用户协议和隐私协议!", icon: "none" });
        } else {
          this.agree = true;
          formatAppLog("log", "at pages/corporateloan/corporateloan.vue:387", "勾选成功");
        }
      },
      agreeChange(e) {
        this.isAgree = e;
      },
      openPicker() {
        formatAppLog("log", "at pages/corporateloan/corporateloan.vue:395", "执行打开地址选择器");
        this.show = true;
      },
      changeClick(value, value2, value3, value4) {
        formatAppLog("log", "at pages/corporateloan/corporateloan.vue:401", "地址选择器 = " + value + value2 + value3 + value4);
        this.province = value;
        this.cityData = value3;
        this.provinceid = value2;
        this.cityid = value4;
        this.cityCode = value4;
        this.city_code = value4;
      },
      onhideShow() {
        this.show = false;
        formatAppLog("log", "at pages/corporateloan/corporateloan.vue:414", "执行了关闭地址选择器");
      },
      //选中省市区
      onsetCity(e) {
        formatAppLog("log", "at pages/corporateloan/corporateloan.vue:417", e);
        let data = e.detail.target.dataset;
        let address = data.province + data.city;
        this.show = false;
        this.city = address;
      },
      // 
      switchChange(e) {
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_agree = resolveEasycom(vue.resolveDynamicComponent("agree"), __easycom_0);
    const _component_cc_selectDity = resolveEasycom(vue.resolveDynamicComponent("cc-selectDity"), __easycom_1);
    return $data.pageShow ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "container"
    }, [
      vue.createElementVNode("view", { class: "banner_box" }, [
        vue.createElementVNode("image", {
          class: "banner",
          src: "/static/qydk_bg.png",
          mode: "widthFix"
        })
      ]),
      vue.createElementVNode("view", { class: "box" }, [
        vue.createElementVNode("view", { class: "notics" }, [
          vue.createElementVNode("image", {
            src: "/static/notic_write_icon.png",
            class: "notics_icon"
          }),
          vue.createElementVNode("text", { class: "notics_text" }, "为了更好的为您进行融资咨询服务，请认真填写本业信息")
        ]),
        vue.createElementVNode("view", { class: "form_box" }, [
          vue.createElementVNode(
            "form",
            {
              onSubmit: _cache[11] || (_cache[11] = (...args) => $options.formSubmit && $options.formSubmit(...args)),
              onReset: _cache[12] || (_cache[12] = (...args) => $options.formReset && $options.formReset(...args))
            },
            [
              vue.createElementVNode("view", { class: "form_shadow" }, [
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "企业名称"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      name: "company_name",
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.company_name = $event),
                      placeholder: "请输入企业名称"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.company_name]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "姓名"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      name: "name",
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.name = $event),
                      placeholder: "请输入您的姓名"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.name]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "手机号"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      name: "phone",
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.phone = $event),
                      placeholder: "请输入您的手机号"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.phone]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "所在城市"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      placeholder: "请选择省市区",
                      name: "city",
                      readonly: true,
                      onClick: _cache[3] || (_cache[3] = (...args) => $options.openPicker && $options.openPicker(...args)),
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.city = $event)
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, _ctx.city]
                  ]),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      hidden: "",
                      name: "city_code",
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.city_code = $event)
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.city_code]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "微信"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      name: "we_chat",
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.we_chat = $event),
                      placeholder: "请输入您的微信号"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.we_chat]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item noflex" }, [
                  vue.createElementVNode("view", { class: "title" }, "所需资金"),
                  vue.createElementVNode("view", { class: "checkbox-group" }, [
                    vue.createElementVNode(
                      "radio-group",
                      {
                        onChange: _cache[7] || (_cache[7] = ($event) => $options.checkboxChange($event, $data.checkboxList1, 1)),
                        class: "radio-group-list",
                        name: "money"
                      },
                      [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($data.checkboxList1, (item, index2) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "label",
                              {
                                key: item.value,
                                class: vue.normalizeClass($data.money == item.value ? "option_default checkCss" : "option_default")
                              },
                              [
                                vue.createElementVNode("view", { class: "checkboxHidden" }, [
                                  vue.createElementVNode("radio", {
                                    value: item.value,
                                    checked: $data.money == item.value
                                  }, null, 8, ["value", "checked"]),
                                  vue.createElementVNode("input", {
                                    name: "money_val",
                                    value: $data.money_val
                                  }, null, 8, ["value"])
                                ]),
                                vue.createElementVNode(
                                  "view",
                                  { class: "checkTxt" },
                                  vue.toDisplayString(item.title),
                                  1
                                  /* TEXT */
                                )
                              ],
                              2
                              /* CLASS */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      32
                      /* HYDRATE_EVENTS */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item noflex" }, [
                  vue.createElementVNode("view", { class: "title" }, "经营年限"),
                  vue.createElementVNode("view", { class: "checkbox-group" }, [
                    vue.createElementVNode(
                      "radio-group",
                      {
                        onChange: _cache[8] || (_cache[8] = ($event) => $options.checkboxChange($event, $data.checkboxList2, 2)),
                        class: "radio-group-list",
                        name: "experience_years"
                      },
                      [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($data.checkboxList2, (item, index2) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "label",
                              {
                                key: item.value,
                                class: vue.normalizeClass($data.experience_years == item.value ? "option_default checkCss" : "option_default")
                              },
                              [
                                vue.createElementVNode("view", { class: "checkboxHidden" }, [
                                  vue.createElementVNode("radio", {
                                    value: item.value,
                                    checked: $data.experience_years == item.value
                                  }, null, 8, ["value", "checked"]),
                                  vue.createElementVNode("input", {
                                    name: "experience_years_val",
                                    value: $data.experience_years_val
                                  }, null, 8, ["value"])
                                ]),
                                vue.createElementVNode(
                                  "view",
                                  { class: "checkTxt" },
                                  vue.toDisplayString(item.title),
                                  1
                                  /* TEXT */
                                )
                              ],
                              2
                              /* CLASS */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      32
                      /* HYDRATE_EVENTS */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item noflex" }, [
                  vue.createElementVNode("view", { class: "title" }, "企业性质"),
                  vue.createElementVNode("view", { class: "checkbox-group" }, [
                    vue.createElementVNode(
                      "radio-group",
                      {
                        onChange: _cache[9] || (_cache[9] = ($event) => $options.checkboxChange($event, $data.checkboxList3, 3)),
                        class: "radio-group-list",
                        name: "company_nature"
                      },
                      [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($data.checkboxList3, (item, index2) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "label",
                              {
                                key: item.value,
                                class: vue.normalizeClass($data.company_nature == item.value ? "option_default checkCss" : "option_default")
                              },
                              [
                                vue.createElementVNode("view", { class: "checkboxHidden" }, [
                                  vue.createElementVNode("radio", {
                                    value: item.value,
                                    checked: $data.company_nature == item.value
                                  }, null, 8, ["value", "checked"]),
                                  vue.createElementVNode("input", {
                                    name: "company_nature_val",
                                    value: $data.company_nature_val
                                  }, null, 8, ["value"])
                                ]),
                                vue.createElementVNode(
                                  "view",
                                  { class: "checkTxt" },
                                  vue.toDisplayString(item.title),
                                  1
                                  /* TEXT */
                                )
                              ],
                              2
                              /* CLASS */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      32
                      /* HYDRATE_EVENTS */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item noflex" }, [
                  vue.createElementVNode("view", { class: "title" }, "注册资金"),
                  vue.createElementVNode("view", { class: "checkbox-group" }, [
                    vue.createElementVNode(
                      "radio-group",
                      {
                        onChange: _cache[10] || (_cache[10] = ($event) => $options.checkboxChange($event, $data.checkboxList4, 4)),
                        class: "radio-group-list",
                        name: "registered_capital"
                      },
                      [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($data.checkboxList4, (item, index2) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "label",
                              {
                                key: item.value,
                                class: vue.normalizeClass($data.registered_capital == item.value ? "option_default checkCss" : "option_default")
                              },
                              [
                                vue.createElementVNode("view", { class: "checkboxHidden" }, [
                                  vue.createElementVNode("radio", {
                                    value: item.value,
                                    checked: $data.registered_capital == item.value
                                  }, null, 8, ["value", "checked"]),
                                  vue.createElementVNode("input", {
                                    name: "registered_capital_val",
                                    value: $data.registered_capital_val
                                  }, null, 8, ["value"])
                                ]),
                                vue.createElementVNode(
                                  "view",
                                  { class: "checkTxt" },
                                  vue.toDisplayString(item.title),
                                  1
                                  /* TEXT */
                                )
                              ],
                              2
                              /* CLASS */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      32
                      /* HYDRATE_EVENTS */
                    )
                  ])
                ])
              ]),
              vue.createVNode(_component_agree, { onIsAgree: $options.agreeChange }, null, 8, ["onIsAgree"]),
              vue.createElementVNode("view", { class: "uni-btn-v" }, [
                vue.createElementVNode("button", {
                  "form-type": "submit",
                  class: "next_btn"
                }, "下一步")
              ])
            ],
            32
            /* HYDRATE_EVENTS */
          )
        ])
      ]),
      vue.createCommentVNode(" 省市区选择 province city area初始省市区设置 show:是否显示  @sureSelectArea：确认事件 @hideShow：隐藏事件"),
      vue.createVNode(_component_cc_selectDity, {
        province: $data.province,
        city: $data.cityData,
        provinceid: _ctx.provinceidData,
        cityid: _ctx.cityidData,
        show: $data.show,
        onChangeClick: $options.changeClick,
        onSureSelectArea: $options.onsetCity,
        onHideShow: $options.onhideShow
      }, null, 8, ["province", "city", "provinceid", "cityid", "show", "onChangeClick", "onSureSelectArea", "onHideShow"])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const PagesCorporateloanCorporateloan = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__file", "D:/lj/haoxingj/haoxingj/pages/corporateloan/corporateloan.vue"]]);
  const _sfc_main$f = {
    components: {
      agree: __easycom_0
    },
    data() {
      return {
        checkboxList1: [
          {
            value: "1",
            title: "5万以内"
          },
          {
            value: "2",
            title: "5-10万元"
          },
          {
            value: "3",
            title: "10-50万元"
          },
          {
            value: "4",
            title: "50-100万元"
          },
          {
            value: "5",
            title: "100万元以上"
          }
        ],
        checkboxList2: [
          {
            value: "1",
            title: "有房产全款"
          },
          {
            value: "2",
            title: "有房产贷款"
          },
          {
            value: "3",
            title: "无房产"
          }
        ],
        treaty: false,
        backData: "",
        name: "",
        phone: "",
        city: "",
        city_code: "",
        we_chat: "",
        money: "",
        money_val: "",
        house: "",
        house_val: "",
        isAgree: false,
        // 地区
        province: "北京市",
        provinceid: "",
        cityid: "",
        address: "",
        cityCode: "",
        show: false,
        pageShow: false
      };
    },
    onShow() {
      let token = uni.getStorageSync("token");
      uni.request({
        url: "https://api.maimangbox.cn/housingloan",
        header: {
          "content-type": "application/json",
          "api-token": token
        },
        method: "POST",
        success: (res) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i;
          if (res.data.resultCode == 1e4) {
            this.pageShow = true;
            this.backData = res.data.data.userInfo;
            this.name = (_a = res.data.data.userInfo) == null ? void 0 : _a.name;
            this.phone = (_b = res.data.data.userInfo) == null ? void 0 : _b.phone;
            this.city = (_c = res.data.data.userInfo) == null ? void 0 : _c.city;
            this.city_code = (_d = res.data.data.userInfo) == null ? void 0 : _d.city_code;
            this.we_chat = (_e = res.data.data.userInfo) == null ? void 0 : _e.we_chat;
            this.money = (_f = res.data.data.userInfo) == null ? void 0 : _f.money;
            this.money_val = (_g = res.data.data.userInfo) == null ? void 0 : _g.money_val;
            this.house = (_h = res.data.data.userInfo) == null ? void 0 : _h.house;
            this.house_val = (_i = res.data.data.userInfo) == null ? void 0 : _i.house_val;
          } else {
            uni.navigateTo({
              url: "/pages/login" + res.data.applyUrl
            });
          }
        }
      });
    },
    methods: {
      formSubmit: function(e) {
        let token = uni.getStorageSync("token");
        formatAppLog("log", "at pages/housingloan/housingloan.vue:186", "form发生了submit事件，携带数据为：" + JSON.stringify(e.detail.value));
        var rule = [
          { name: "name", checkType: "notnull", checkRule: "", errorMsg: "姓名不能为空" },
          { name: "phone", checkType: "phoneno", checkRule: "", errorMsg: "手机号不能为空" },
          { name: "city", checkType: "notnull", checkRule: "", errorMsg: "所在城市不能为空" },
          { name: "we_chat", checkType: "notnull", checkRule: "", errorMsg: "微信不能为空" },
          { name: "money", checkType: "in", checkRule: "1,2,3,4,5", errorMsg: "请选择所需资金" },
          { name: "house", checkType: "in", checkRule: "1,2,3", errorMsg: "请选择房产类型" }
        ];
        var formData = e.detail.value;
        if (this.city_code == void 0) {
          formData.city_code = "010";
        }
        formData = Object.assign({}, this.backData, formData);
        var checkRes = graceChecker.check(formData, rule);
        if (this.isAgree != true) {
          uni.showToast({ title: "请勾选用户协议和隐私协议", icon: "none" });
          return;
        }
        if (checkRes) {
          uni.request({
            url: "https://api.maimangbox.cn/form",
            data: {
              formData
            },
            header: {
              "content-type": "application/json",
              "api-token": token
            },
            method: "POST",
            success: (res) => {
              if (res.data.resultCode == 1e4) {
                uni.showToast({ title: "提交成功", icon: "none" });
                setTimeout(function() {
                  uni.navigateTo({
                    url: "/pages/mate/mate?next=mate"
                  });
                }, 3e3);
              } else {
                uni.showToast({ title: res.data.resultMsg, icon: "none" });
              }
            }
          });
        } else {
          uni.showToast({ title: graceChecker.error, icon: "none" });
        }
      },
      formReset: function(e) {
        formatAppLog("log", "at pages/housingloan/housingloan.vue:236", "清空数据");
      },
      checkboxChange(e, checkboxList, type) {
        var items = checkboxList, values = e.detail.value;
        e.currentTarget.dataset.name;
        for (var i = 0, lenI = items.length; i < lenI; ++i) {
          const item = items[i];
          if (values.includes(item.value)) {
            this.$set(item, "checked", true);
            if (type == 1) {
              this.money = values;
              this.money_val = item.title;
            }
            if (type == 2) {
              this.house = values;
              this.house_val = item.title;
            }
          } else {
            this.$set(item, "checked", false);
          }
        }
      },
      handleChange(e) {
        this.backData.car = "";
        this.value = e.detail.value;
        formatAppLog("log", "at pages/housingloan/housingloan.vue:262", this.value);
        if (this.value.length == 0) {
          uni.showToast({ title: "请勾选已同意用户协议和隐私协议!", icon: "none" });
        } else {
          this.agree = true;
          formatAppLog("log", "at pages/housingloan/housingloan.vue:267", "勾选成功");
        }
      },
      agreeChange(e) {
        this.isAgree = e;
      },
      openPicker() {
        formatAppLog("log", "at pages/housingloan/housingloan.vue:276", "执行打开地址选择器");
        this.show = true;
      },
      changeClick(value, value2, value3, value4) {
        formatAppLog("log", "at pages/housingloan/housingloan.vue:282", "地址选择器 = " + value + value2 + value3 + value4);
        this.province = value;
        this.cityData = value3;
        this.provinceid = value2;
        this.cityid = value4;
        this.cityCode = value4;
        this.city_code = value4;
      },
      onhideShow() {
        this.show = false;
        formatAppLog("log", "at pages/housingloan/housingloan.vue:295", "执行了关闭地址选择器");
      },
      //选中省市区
      onsetCity(e) {
        formatAppLog("log", "at pages/housingloan/housingloan.vue:298", e);
        let data = e.detail.target.dataset;
        let address = data.province + data.city;
        this.show = false;
        this.city = address;
      },
      // 
      switchChange(e) {
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_agree = resolveEasycom(vue.resolveDynamicComponent("agree"), __easycom_0);
    const _component_cc_selectDity = resolveEasycom(vue.resolveDynamicComponent("cc-selectDity"), __easycom_1);
    return $data.pageShow ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "container"
    }, [
      vue.createElementVNode("view", { class: "banner_box" }, [
        vue.createElementVNode("image", {
          class: "banner",
          src: "/static/fwdy_bg.png",
          mode: "widthFix"
        })
      ]),
      vue.createElementVNode("view", { class: "box" }, [
        vue.createElementVNode("view", { class: "dk_info" }, [
          vue.createElementVNode("view", { class: "item rightborder" }, [
            vue.createElementVNode("view", { class: "title" }, "最高可贷"),
            vue.createElementVNode("view", { class: "text" }, "房产估值9成")
          ]),
          vue.createElementVNode("view", { class: "item rightborder" }, [
            vue.createElementVNode("view", { class: "title" }, "最长可贷"),
            vue.createElementVNode("view", { class: "text" }, "30年")
          ]),
          vue.createElementVNode("view", { class: "item" }, [
            vue.createElementVNode("view", { class: "title" }, "办理周期"),
            vue.createElementVNode("view", { class: "text" }, "最快三个工作日")
          ])
        ]),
        vue.createElementVNode("view", { class: "notics" }, [
          vue.createElementVNode("image", {
            src: "/static/notic_write_icon.png",
            class: "notics_icon"
          }),
          vue.createElementVNode("text", { class: "notics_text" }, "为了更好的为您进行融资咨询服务，请认真填写本页信息")
        ]),
        vue.createElementVNode("view", { class: "form_box" }, [
          vue.createElementVNode(
            "form",
            {
              onSubmit: _cache[8] || (_cache[8] = (...args) => $options.formSubmit && $options.formSubmit(...args)),
              onReset: _cache[9] || (_cache[9] = (...args) => $options.formReset && $options.formReset(...args))
            },
            [
              vue.createElementVNode("view", { class: "form_shadow" }, [
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "姓名"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      name: "name",
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.name = $event),
                      placeholder: "请输入您的姓名"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.name]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "手机号"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      name: "phone",
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.phone = $event),
                      placeholder: "请输入您的手机号"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.phone]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "所在城市"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      placeholder: "请选择省市区",
                      name: "city",
                      readonly: true,
                      onClick: _cache[2] || (_cache[2] = (...args) => $options.openPicker && $options.openPicker(...args)),
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.city = $event)
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.city]
                  ]),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      hidden: "",
                      name: "city_code",
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.city_code = $event)
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.city_code]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "微信"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      name: "we_chat",
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.we_chat = $event),
                      placeholder: "请输入您的微信号"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.we_chat]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item noflex" }, [
                  vue.createElementVNode("view", { class: "title" }, "所需资金"),
                  vue.createElementVNode("view", { class: "checkbox-group" }, [
                    vue.createElementVNode(
                      "radio-group",
                      {
                        onChange: _cache[6] || (_cache[6] = ($event) => $options.checkboxChange($event, $data.checkboxList1, 1)),
                        class: "radio-group-list",
                        name: "money"
                      },
                      [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($data.checkboxList1, (item, index2) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "label",
                              {
                                key: item.value,
                                class: vue.normalizeClass($data.money == item.value ? "option_default checkCss" : "option_default")
                              },
                              [
                                vue.createElementVNode("view", { class: "checkboxHidden" }, [
                                  vue.createElementVNode("radio", {
                                    value: item.value,
                                    checked: $data.money == item.value
                                  }, null, 8, ["value", "checked"]),
                                  vue.createElementVNode("input", {
                                    name: "money_val",
                                    value: $data.money_val
                                  }, null, 8, ["value"])
                                ]),
                                vue.createElementVNode(
                                  "view",
                                  { class: "checkTxt" },
                                  vue.toDisplayString(item.title),
                                  1
                                  /* TEXT */
                                )
                              ],
                              2
                              /* CLASS */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      32
                      /* HYDRATE_EVENTS */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item noflex" }, [
                  vue.createElementVNode("view", { class: "title" }, "房屋类型"),
                  vue.createElementVNode("view", { class: "checkbox-group" }, [
                    vue.createElementVNode(
                      "radio-group",
                      {
                        onChange: _cache[7] || (_cache[7] = ($event) => $options.checkboxChange($event, $data.checkboxList2, 2)),
                        class: "radio-group-list",
                        name: "house"
                      },
                      [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($data.checkboxList2, (item, index2) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "label",
                              {
                                key: item.value,
                                class: vue.normalizeClass($data.house == item.value ? "option_default checkCss" : "option_default")
                              },
                              [
                                vue.createElementVNode("view", { class: "checkboxHidden" }, [
                                  vue.createElementVNode("radio", {
                                    value: item.value,
                                    checked: $data.house == item.value
                                  }, null, 8, ["value", "checked"]),
                                  vue.createElementVNode("input", {
                                    name: "house_val",
                                    value: $data.house_val
                                  }, null, 8, ["value"])
                                ]),
                                vue.createElementVNode(
                                  "view",
                                  { class: "checkTxt" },
                                  vue.toDisplayString(item.title),
                                  1
                                  /* TEXT */
                                )
                              ],
                              2
                              /* CLASS */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      32
                      /* HYDRATE_EVENTS */
                    )
                  ])
                ])
              ]),
              vue.createVNode(_component_agree, { onIsAgree: $options.agreeChange }, null, 8, ["onIsAgree"]),
              vue.createElementVNode("view", { class: "uni-btn-v" }, [
                vue.createElementVNode("button", {
                  "form-type": "submit",
                  class: "next_btn"
                }, "下一步")
              ])
            ],
            32
            /* HYDRATE_EVENTS */
          )
        ])
      ]),
      vue.createCommentVNode(" 省市区选择 province city area初始省市区设置 show:是否显示  @sureSelectArea：确认事件 @hideShow：隐藏事件"),
      vue.createVNode(_component_cc_selectDity, {
        province: $data.province,
        city: _ctx.cityData,
        provinceid: _ctx.provinceidData,
        cityid: _ctx.cityidData,
        show: $data.show,
        onChangeClick: $options.changeClick,
        onSureSelectArea: $options.onsetCity,
        onHideShow: $options.onhideShow
      }, null, 8, ["province", "city", "provinceid", "cityid", "show", "onChangeClick", "onSureSelectArea", "onHideShow"])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const PagesHousingloanHousingloan = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__file", "D:/lj/haoxingj/haoxingj/pages/housingloan/housingloan.vue"]]);
  const _sfc_main$e = {
    components: {
      agree: __easycom_0
    },
    data() {
      return {
        checkboxList1: [
          {
            value: "1",
            title: "轿车"
          },
          {
            value: "2",
            title: "suv"
          },
          {
            value: "3",
            title: "商务车"
          },
          {
            value: "4",
            title: "其他"
          }
        ],
        value: "",
        agree: false,
        backData: "",
        name: "",
        phone: "",
        we_chat: "",
        car_brand: "",
        car: "",
        car_val: "",
        isAgree: false,
        // 地区
        province: "北京市",
        cityData: "北京市",
        provinceid: "",
        cityid: "",
        city: "",
        city_code: "",
        cityCode: "",
        address: "",
        show: false,
        pageShow: false
      };
    },
    onShow() {
      let token = uni.getStorageSync("token");
      uni.request({
        url: "https://api.maimangbox.cn/autoloan",
        header: {
          "content-type": "application/json",
          "api-token": token
        },
        method: "POST",
        success: (res) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (res.data.resultCode == 1e4) {
            this.pageShow = true;
            this.backData = res.data.data.userInfo;
            this.name = (_a = res.data.data.userInfo) == null ? void 0 : _a.name;
            this.phone = (_b = res.data.data.userInfo) == null ? void 0 : _b.phone;
            this.we_chat = (_c = res.data.data.userInfo) == null ? void 0 : _c.we_chat;
            this.car_brand = (_d = res.data.data.userInfo) == null ? void 0 : _d.car_brand;
            this.city = (_e = res.data.data.userInfo) == null ? void 0 : _e.city;
            this.city_code = (_f = res.data.data.userInfo) == null ? void 0 : _f.city_code;
            this.car = (_g = res.data.data.userInfo) == null ? void 0 : _g.car;
            this.car_val = (_h = res.data.data.userInfo) == null ? void 0 : _h.car_val;
          } else {
            uni.navigateTo({
              url: "/pages/login/login"
            });
          }
        }
      });
    },
    methods: {
      formSubmit: function(e) {
        let token = uni.getStorageSync("token");
        var rule = [
          { name: "name", checkType: "notnull", checkRule: "", errorMsg: "姓名不能为空" },
          { name: "phone", checkType: "phoneno", checkRule: "", errorMsg: "手机号不能为空" },
          { name: "we_chat", checkType: "notnull", checkRule: "", errorMsg: "微信不能为空" },
          { name: "car_brand", checkType: "notnull", checkRule: "", errorMsg: "品牌和型号不能为空" },
          { name: "city", checkType: "notnull", checkRule: "", errorMsg: "所在城市不能为空" },
          { name: "car", checkType: "in", checkRule: "1,2,3,4", errorMsg: "请选择车辆类型" }
        ];
        var formData = e.detail.value;
        if (this.city_code == void 0) {
          formData.city_code = "010";
        }
        formData = Object.assign({}, this.backData, formData);
        var checkRes = graceChecker.check(formData, rule);
        if (this.isAgree != true) {
          uni.showToast({ title: "请勾选用户协议和隐私协议", icon: "none" });
          return;
        }
        if (checkRes) {
          uni.request({
            url: "https://api.maimangbox.cn/form",
            data: {
              formData
            },
            header: {
              "api-token": token
            },
            method: "POST",
            success: (res) => {
              if (res.data.resultCode == 1e4) {
                uni.showToast({ title: "提交成功", icon: "none" });
                setTimeout(function() {
                  uni.navigateTo({
                    url: "/pages/mate/mate?next=mate"
                  });
                }, 3e3);
              } else {
                uni.showToast({ title: res.data.resultMsg, icon: "none" });
              }
            }
          });
        } else {
          uni.showToast({ title: graceChecker.error, icon: "none" });
        }
      },
      formReset: function(e) {
        formatAppLog("log", "at pages/autoloan/autoloan.vue:207", "清空数据");
      },
      checkboxChange(e, checkboxList, type) {
        var items = checkboxList, values = e.detail.value;
        e.currentTarget.dataset.name;
        for (var i = 0, lenI = items.length; i < lenI; ++i) {
          const item = items[i];
          if (values.includes(item.value)) {
            this.car = values;
            this.$set(item, "checked", true);
            this.car_val = item.title;
          } else {
            this.$set(item, "checked", false);
          }
        }
      },
      handleChange(e) {
        this.backData.car = "";
        this.value = e.detail.value;
        formatAppLog("log", "at pages/autoloan/autoloan.vue:227", this.value);
        if (this.value.length == 0) {
          uni.showToast({ title: "请勾选已同意用户协议和隐私协议!", icon: "none" });
        } else {
          this.agree = true;
          formatAppLog("log", "at pages/autoloan/autoloan.vue:232", "勾选成功");
        }
      },
      agreeChange(e) {
        this.isAgree = e;
      },
      openPicker() {
        formatAppLog("log", "at pages/autoloan/autoloan.vue:239", "执行打开地址选择器");
        this.show = true;
      },
      changeClick(value, value2, value3, value4) {
        formatAppLog("log", "at pages/autoloan/autoloan.vue:245", "地址选择器 = " + value + value2 + value3 + value4);
        this.province = value;
        this.cityData = value3;
        this.provinceid = value2;
        this.cityid = value4;
        this.cityCode = value4;
        this.city_code = value4;
      },
      onhideShow() {
        this.show = false;
        formatAppLog("log", "at pages/autoloan/autoloan.vue:258", "执行了关闭地址选择器");
      },
      //选中省市区
      onsetCity(e) {
        formatAppLog("log", "at pages/autoloan/autoloan.vue:261", e);
        let data = e.detail.target.dataset;
        let address = data.province + data.city;
        this.show = false;
        this.city = address;
      },
      // 
      switchChange(e) {
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_agree = resolveEasycom(vue.resolveDynamicComponent("agree"), __easycom_0);
    const _component_cc_selectDity = resolveEasycom(vue.resolveDynamicComponent("cc-selectDity"), __easycom_1);
    return $data.pageShow ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "container"
    }, [
      vue.createElementVNode("view", { class: "banner_box" }, [
        vue.createElementVNode("image", {
          class: "banner",
          src: "/static/qcdk_bg.png",
          mode: "widthFix"
        })
      ]),
      vue.createElementVNode("view", { class: "box" }, [
        vue.createElementVNode("view", { class: "dk_info" }, [
          vue.createElementVNode("view", { class: "item rightborder" }, [
            vue.createElementVNode("view", { class: "title" }, "最长可分"),
            vue.createElementVNode("view", { class: "text" }, "96期")
          ]),
          vue.createElementVNode("view", { class: "item rightborder" }, [
            vue.createElementVNode("view", { class: "title" }, "最高可贷"),
            vue.createElementVNode("view", { class: "text" }, "估值9成")
          ]),
          vue.createElementVNode("view", { class: "item" }, [
            vue.createElementVNode("view", { class: "title" }, "最快放款"),
            vue.createElementVNode("view", { class: "text" }, "1小时")
          ])
        ]),
        vue.createElementVNode("view", { class: "notics" }, [
          vue.createElementVNode("image", {
            src: "/static/notic_write_icon.png",
            class: "notics_icon"
          }),
          vue.createElementVNode("text", { class: "notics_text" }, "为了更好的为您进行融资咨询服务，请认真填写本业信息")
        ]),
        vue.createElementVNode("view", { class: "form_box" }, [
          vue.createElementVNode(
            "form",
            {
              onSubmit: _cache[8] || (_cache[8] = (...args) => $options.formSubmit && $options.formSubmit(...args)),
              onReset: _cache[9] || (_cache[9] = (...args) => $options.formReset && $options.formReset(...args))
            },
            [
              vue.createElementVNode("view", { class: "form_shadow" }, [
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "姓名"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      name: "name",
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.name = $event),
                      placeholder: "请输入您的姓名"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.name]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "手机号"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      name: "phone",
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.phone = $event),
                      placeholder: "请输入您的手机号"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.phone]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "微信"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      name: "we_chat",
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.we_chat = $event),
                      placeholder: "请输入您的微信号"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.we_chat]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "品牌和型号"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      name: "car_brand",
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.car_brand = $event),
                      placeholder: "请填项您的车辆品牌和型号"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.car_brand]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "所在城市"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      placeholder: "请选择省市区",
                      name: "city",
                      readonly: "readonly",
                      onClick: _cache[4] || (_cache[4] = (...args) => $options.openPicker && $options.openPicker(...args)),
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.city = $event)
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.city]
                  ]),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      hidden: "",
                      name: "city_code",
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.city_code = $event)
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.city_code]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item noflex" }, [
                  vue.createElementVNode("view", { class: "title" }, "车辆类型"),
                  vue.createElementVNode("view", { class: "checkbox-group" }, [
                    vue.createElementVNode(
                      "radio-group",
                      {
                        onChange: _cache[7] || (_cache[7] = ($event) => $options.checkboxChange($event, $data.checkboxList1, 1)),
                        class: "radio-group-list",
                        name: "car"
                      },
                      [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($data.checkboxList1, (item, index2) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "label",
                              {
                                class: vue.normalizeClass($data.car == item.value ? "option_default checkCss" : "option_default")
                              },
                              [
                                vue.createElementVNode("view", { class: "checkboxHidden" }, [
                                  vue.createElementVNode("radio", {
                                    value: item.value,
                                    checked: $data.car == item.value
                                  }, null, 8, ["value", "checked"]),
                                  vue.createElementVNode("input", {
                                    name: "car_val",
                                    value: $data.car_val
                                  }, null, 8, ["value"])
                                ]),
                                vue.createElementVNode(
                                  "view",
                                  { class: "checkTxt" },
                                  vue.toDisplayString(item.title),
                                  1
                                  /* TEXT */
                                )
                              ],
                              2
                              /* CLASS */
                            );
                          }),
                          256
                          /* UNKEYED_FRAGMENT */
                        ))
                      ],
                      32
                      /* HYDRATE_EVENTS */
                    )
                  ])
                ])
              ]),
              vue.createVNode(_component_agree, { onIsAgree: $options.agreeChange }, null, 8, ["onIsAgree"]),
              vue.createElementVNode("view", { class: "uni-btn-v" }, [
                vue.createElementVNode("button", {
                  "form-type": "submit",
                  class: "next_btn"
                }, "下一步")
              ])
            ],
            32
            /* HYDRATE_EVENTS */
          )
        ])
      ]),
      vue.createCommentVNode(" 省市区选择 province city area初始省市区设置 show:是否显示  @sureSelectArea：确认事件 @hideShow：隐藏事件"),
      vue.createVNode(_component_cc_selectDity, {
        province: $data.province,
        city: $data.cityData,
        provinceid: $data.provinceid,
        cityid: $data.cityid,
        show: $data.show,
        onChangeClick: $options.changeClick,
        onSureSelectArea: $options.onsetCity,
        onHideShow: $options.onhideShow,
        readonly: true
      }, null, 8, ["province", "city", "provinceid", "cityid", "show", "onChangeClick", "onSureSelectArea", "onHideShow"])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const PagesAutoloanAutoloan = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__file", "D:/lj/haoxingj/haoxingj/pages/autoloan/autoloan.vue"]]);
  const _sfc_main$d = {
    components: {
      agree: __easycom_0
    },
    data() {
      return {
        checkboxList1: [
          {
            value: "1",
            title: "信用卡逾期"
          },
          {
            value: "2",
            title: "网贷逾期"
          },
          {
            value: "3",
            title: "信用卡+网贷逾期"
          },
          {
            value: "4",
            title: "银行信用贷逾期"
          }
        ],
        checkboxList2: [
          {
            value: "0",
            title: "无"
          },
          {
            value: "1",
            title: "1个月以内"
          },
          {
            value: "2",
            title: "1-3个月"
          },
          {
            value: "3",
            title: "3-6个月"
          },
          {
            value: "4",
            title: "6-12个月"
          },
          {
            value: "5",
            title: "12个月以上"
          }
        ],
        treaty: false,
        backData: "",
        name: "",
        phone: "",
        we_chat: "",
        overdue_val: "",
        overdue: "",
        overdue_time: "",
        overdue_time_val: "",
        isAgree: false,
        // 地区
        province: "北京市",
        cityData: "北京市",
        provinceid: "",
        cityid: "",
        city_code: "",
        cityCode: "",
        address: "",
        show: false,
        pageShow: false
      };
    },
    onShow() {
      let token = uni.getStorageSync("token");
      uni.request({
        url: "https://api.maimangbox.cn/overdue",
        header: {
          "content-type": "application/json",
          "api-token": token
        },
        method: "POST",
        success: (res) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i;
          formatAppLog("log", "at pages/overdue/overdue.vue:156", res);
          if (res.data.resultCode == 1e4) {
            this.pageShow = true;
            this.backData = res.data.data.userInfo;
            this.name = (_a = res.data.data.userInfo) == null ? void 0 : _a.name;
            this.phone = (_b = res.data.data.userInfo) == null ? void 0 : _b.phone;
            this.we_chat = (_c = res.data.data.userInfo) == null ? void 0 : _c.we_chat;
            this.city = (_d = res.data.data.userInfo) == null ? void 0 : _d.city;
            this.city_code = (_e = res.data.data.userInfo) == null ? void 0 : _e.city_code;
            this.overdue = (_f = res.data.data.userInfo) == null ? void 0 : _f.overdue;
            this.overdue_val = (_g = res.data.data.userInfo) == null ? void 0 : _g.overdue_val;
            this.overdue_time = (_h = res.data.data.userInfo) == null ? void 0 : _h.overdue_time;
            this.overdue_time_val = (_i = res.data.data.userInfo) == null ? void 0 : _i.overdue_time_val;
          } else {
            uni.navigateTo({
              url: "/pages/login/login?next=overdue"
            });
          }
        }
      });
    },
    methods: {
      formSubmit: function(e) {
        var rule = [
          { name: "name", checkType: "notnull", checkRule: "", errorMsg: "姓名不能为空" },
          { name: "phone", checkType: "phoneno", checkRule: "", errorMsg: "手机号不能为空" },
          { name: "we_chat", checkType: "notnull", checkRule: "", errorMsg: "微信不能为空" },
          { name: "city", checkType: "notnull", checkRule: "", errorMsg: "所在城市不能为空" },
          { name: "overdue", checkType: "in", checkRule: "1,2,3,4", errorMsg: "请选择逾期类型" },
          { name: "overdue_time", checkType: "in", checkRule: "0,1,2,3,4,5", errorMsg: "请选择逾期时长" }
        ];
        var formData = e.detail.value;
        if (this.city_code == void 0) {
          formData.city_code = "010";
        }
        formData = Object.assign({}, this.backData, formData);
        formatAppLog("log", "at pages/overdue/overdue.vue:194", formData);
        var checkRes = graceChecker.check(formData, rule);
        if (this.isAgree != true) {
          uni.showToast({ title: "请勾选用户协议和隐私协议", icon: "none" });
          return;
        }
        if (checkRes) {
          uni.request({
            url: "https://api.maimangbox.cn/form",
            data: {
              formData
            },
            header: {
              "content-type": "application/json",
              "api-token": uni.getStorageSync("token")
            },
            method: "POST",
            success: (res) => {
              if (res.data.resultCode == 1e4) {
                uni.showToast({ title: "提交成功", icon: "none" });
                setTimeout(function() {
                  uni.navigateTo({
                    url: "/pages/mate/mate?next=mate"
                  });
                }, 3e3);
              } else {
                uni.showToast({ title: res.data.resultMsg, icon: "none" });
              }
            }
          });
        } else {
          uni.showToast({ title: graceChecker.error, icon: "none" });
        }
      },
      formReset: function(e) {
        formatAppLog("log", "at pages/overdue/overdue.vue:229", "清空数据");
      },
      checkboxChange(e, checkboxList, type) {
        var items = checkboxList, values = e.detail.value;
        e.currentTarget.dataset.name;
        for (var i = 0, lenI = items.length; i < lenI; ++i) {
          const item = items[i];
          if (values.includes(item.value)) {
            this.$set(item, "checked", true);
            if (type == 1) {
              this.overdue = values;
              this.overdue_val = item.title;
            }
            if (type == 2) {
              this.overdue_time = values;
              this.overdue_time_val = item.title;
            }
          } else {
            this.$set(item, "checked", false);
          }
        }
      },
      agreeChange(e) {
        this.isAgree = e;
      },
      openPicker() {
        formatAppLog("log", "at pages/overdue/overdue.vue:256", "执行打开地址选择器");
        this.show = true;
      },
      changeClick(value, value2, value3, value4) {
        formatAppLog("log", "at pages/overdue/overdue.vue:262", "地址选择器 = " + value + value2 + value3 + value4);
        this.province = value;
        this.cityData = value3;
        this.provinceid = value2;
        this.cityid = value4;
        this.cityCode = value4;
        this.city_code = value4;
      },
      onhideShow() {
        this.show = false;
        formatAppLog("log", "at pages/overdue/overdue.vue:275", "执行了关闭地址选择器");
      },
      //选中省市区
      onsetCity(e) {
        formatAppLog("log", "at pages/overdue/overdue.vue:278", e);
        let data = e.detail.target.dataset;
        let address = data.province + data.city;
        this.show = false;
        this.city = address;
      },
      // 
      switchChange(e) {
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_agree = resolveEasycom(vue.resolveDynamicComponent("agree"), __easycom_0);
    const _component_cc_selectDity = resolveEasycom(vue.resolveDynamicComponent("cc-selectDity"), __easycom_1);
    return $data.pageShow ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "container"
    }, [
      vue.createElementVNode("view", { class: "banner_box" }, [
        vue.createElementVNode("image", {
          class: "banner",
          src: "/static/yqsa_bg.png",
          mode: "widthFix"
        })
      ]),
      vue.createElementVNode("view", { class: "box" }, [
        vue.createElementVNode("view", { class: "notics" }, [
          vue.createElementVNode("image", {
            src: "/static/notic_write_icon.png",
            class: "notics_icon"
          }),
          vue.createElementVNode("text", { class: "notics_text" }, "为了更好的为您进行融资咨询服务，请认真填写本业信息")
        ]),
        vue.createElementVNode("view", { class: "form_box" }, [
          vue.createElementVNode(
            "form",
            {
              onSubmit: _cache[8] || (_cache[8] = (...args) => $options.formSubmit && $options.formSubmit(...args)),
              onReset: _cache[9] || (_cache[9] = (...args) => $options.formReset && $options.formReset(...args))
            },
            [
              vue.createElementVNode("view", { class: "form_shadow" }, [
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "姓名"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      name: "name",
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.name = $event),
                      placeholder: "请输入您的姓名"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.name]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "手机号"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      name: "phone",
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.phone = $event),
                      placeholder: "请输入您的手机号"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.phone]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "微信"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      name: "we_chat",
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.we_chat = $event),
                      placeholder: "请输入您的微信号"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.we_chat]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item" }, [
                  vue.createElementVNode("view", { class: "title" }, "所在城市"),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.city = $event),
                      placeholder: "请选择省市区",
                      name: "city",
                      readonly: true,
                      onClick: _cache[4] || (_cache[4] = (...args) => $options.openPicker && $options.openPicker(...args))
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, _ctx.city]
                  ]),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "uni-input form_input",
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.city_code = $event),
                      hidden: "",
                      name: "city_code"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.city_code]
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item noflex" }, [
                  vue.createElementVNode("view", { class: "title" }, "逾期类型"),
                  vue.createElementVNode("view", { class: "checkbox-group" }, [
                    vue.createElementVNode(
                      "radio-group",
                      {
                        onChange: _cache[6] || (_cache[6] = ($event) => $options.checkboxChange($event, $data.checkboxList1, 1)),
                        class: "radio-group-list",
                        name: "overdue"
                      },
                      [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($data.checkboxList1, (item, index2) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "label",
                              {
                                key: item.value,
                                class: vue.normalizeClass($data.overdue == item.value ? "option_default checkCss" : "option_default")
                              },
                              [
                                vue.createElementVNode("view", { class: "checkboxHidden" }, [
                                  vue.createElementVNode("radio", {
                                    value: item.value,
                                    checked: $data.overdue == item.value
                                  }, null, 8, ["value", "checked"]),
                                  vue.createElementVNode("input", {
                                    name: "overdue_val",
                                    value: $data.overdue_val
                                  }, null, 8, ["value"])
                                ]),
                                vue.createElementVNode(
                                  "view",
                                  { class: "checkTxt" },
                                  vue.toDisplayString(item.title),
                                  1
                                  /* TEXT */
                                )
                              ],
                              2
                              /* CLASS */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      32
                      /* HYDRATE_EVENTS */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { class: "form_item noflex" }, [
                  vue.createElementVNode("view", { class: "title" }, "逾期时长"),
                  vue.createElementVNode("view", { class: "checkbox-group" }, [
                    vue.createElementVNode(
                      "radio-group",
                      {
                        onChange: _cache[7] || (_cache[7] = ($event) => $options.checkboxChange($event, $data.checkboxList2, 2)),
                        class: "radio-group-list",
                        name: "overdue_time"
                      },
                      [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList($data.checkboxList2, (item, index2) => {
                            return vue.openBlock(), vue.createElementBlock(
                              "label",
                              {
                                key: item.value,
                                class: vue.normalizeClass($data.overdue_time == item.value ? "option_default checkCss" : "option_default")
                              },
                              [
                                vue.createElementVNode("view", { class: "checkboxHidden" }, [
                                  vue.createElementVNode("radio", {
                                    value: item.value,
                                    checked: $data.overdue_time == item.value
                                  }, null, 8, ["value", "checked"]),
                                  vue.createElementVNode("input", {
                                    name: "overdue_time_val",
                                    value: $data.overdue_time_val
                                  }, null, 8, ["value"])
                                ]),
                                vue.createElementVNode(
                                  "view",
                                  { class: "checkTxt" },
                                  vue.toDisplayString(item.title),
                                  1
                                  /* TEXT */
                                )
                              ],
                              2
                              /* CLASS */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      32
                      /* HYDRATE_EVENTS */
                    )
                  ])
                ])
              ]),
              vue.createVNode(_component_agree, { onIsAgree: $options.agreeChange }, null, 8, ["onIsAgree"]),
              vue.createElementVNode("view", { class: "uni-btn-v" }, [
                vue.createElementVNode("button", {
                  "form-type": "submit",
                  class: "next_btn"
                }, "下一步")
              ])
            ],
            32
            /* HYDRATE_EVENTS */
          )
        ])
      ]),
      vue.createCommentVNode(" 省市区选择 province city area初始省市区设置 show:是否显示  @sureSelectArea：确认事件 @hideShow：隐藏事件"),
      vue.createVNode(_component_cc_selectDity, {
        province: $data.province,
        city: $data.cityData,
        provinceid: $data.provinceid,
        cityid: $data.cityid,
        show: $data.show,
        onChangeClick: $options.changeClick,
        onSureSelectArea: $options.onsetCity,
        onHideShow: $options.onhideShow,
        readonly: true
      }, null, 8, ["province", "city", "provinceid", "cityid", "show", "onChangeClick", "onSureSelectArea", "onHideShow"])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const PagesOverdueOverdue = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__file", "D:/lj/haoxingj/haoxingj/pages/overdue/overdue.vue"]]);
  const _sfc_main$c = {
    components: {
      agree: __easycom_0
    },
    data() {
      return {
        expectMoney: [
          {
            value: "1",
            title: "5万以内"
          },
          {
            value: "2",
            title: "5-10万元"
          },
          {
            value: "3",
            title: "5-10万元"
          },
          {
            value: "4",
            title: "5-10万元"
          },
          {
            value: "5",
            title: "100万元以上"
          }
        ],
        zhimaList: [
          {
            value: "1",
            title: "0-350元"
          },
          {
            value: "2",
            title: "350-550"
          },
          {
            value: "3",
            title: "550-600"
          },
          {
            value: "4",
            title: "600-650"
          },
          {
            value: "5",
            title: "650-700"
          },
          {
            value: "6",
            title: "700-950"
          }
        ],
        creditLst: [
          {
            value: "1",
            title: "优秀"
          },
          {
            value: "2",
            title: "良好"
          },
          {
            value: "3",
            title: "一般"
          },
          {
            value: "4",
            title: "较差"
          }
        ],
        overdueTimeList: [
          {
            value: "0",
            title: "无"
          },
          {
            value: "1",
            title: "1个月以内"
          },
          {
            value: "2",
            title: "1-3个月"
          },
          {
            value: "3",
            title: "3-6个月"
          },
          {
            value: "4",
            title: "6-12个月"
          },
          {
            value: "5",
            title: "12个月以上"
          },
          {
            value: "5",
            title: "12个月以上"
          }
        ],
        overdueMoneyList: [
          {
            value: "0",
            title: "无"
          },
          {
            value: "1",
            title: "1000-5000元"
          },
          {
            value: "2",
            title: "5000-10000元"
          },
          {
            value: "3",
            title: "10000-50000元"
          },
          {
            value: "4",
            title: "50000-100000元"
          },
          {
            value: "5",
            title: "10万元以上"
          }
        ],
        mutiList: [
          {
            value: "1",
            title: "有房"
          },
          {
            value: "2",
            title: "有车"
          },
          {
            value: "3",
            title: "有公积金"
          },
          {
            value: "4",
            title: "有社保"
          },
          {
            value: "5",
            title: "有公司"
          },
          {
            value: "6",
            title: "有保金"
          }
        ],
        backData: "",
        name: "",
        phone: "",
        id_card: "",
        city: "",
        we_chat: "",
        money: "",
        money_val: "",
        sesame: "",
        sesame_val: "",
        credit: "",
        credit_val: "",
        overdue_time: "",
        overdue_time_val: "",
        overdue_money: "",
        overdue_money_val: "",
        msInstance: null,
        selectedVal: "",
        selectedText: "",
        isAgree: false,
        // 地区
        province: "北京市",
        cityData: "北京市",
        provinceid: "",
        cityid: "",
        city_code: "",
        cityCode: "",
        address: "",
        show: false,
        pageShow: false
      };
    },
    onShow() {
      let token = uni.getStorageSync("token");
      uni.request({
        url: "https://api.maimangbox.cn/largeloan",
        header: {
          "content-type": "application/json",
          "api-token": token
        },
        method: "POST",
        success: (res) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
          if (res.data.resultCode == 1e4) {
            this.pageShow = true;
            this.backData = res.data.data.userInfo;
            this.name = (_a = res.data.data.userInfo) == null ? void 0 : _a.name;
            this.phone = (_b = res.data.data.userInfo) == null ? void 0 : _b.phone;
            this.id_card = (_c = res.data.data.userInfo) == null ? void 0 : _c.id_card;
            this.city = (_d = res.data.data.userInfo) == null ? void 0 : _d.city;
            this.city_code = (_e = res.data.data.userInfo) == null ? void 0 : _e.city_code;
            this.we_chat = (_f = res.data.data.userInfo) == null ? void 0 : _f.we_chat;
            this.money = (_g = res.data.data.userInfo) == null ? void 0 : _g.money;
            this.money_val = (_h = res.data.data.userInfo) == null ? void 0 : _h.money_val;
            this.sesame = (_i = res.data.data.userInfo) == null ? void 0 : _i.sesame;
            this.sesame_val = (_j = res.data.data.userInfo) == null ? void 0 : _j.sesame_val;
            this.credit = (_k = res.data.data.userInfo) == null ? void 0 : _k.credit;
            this.credit_val = (_l = res.data.data.userInfo) == null ? void 0 : _l.credit_val;
            this.overdue_time = (_m = res.data.data.userInfo) == null ? void 0 : _m.overdue_time;
            this.overdue_time_val = (_n = res.data.data.userInfo) == null ? void 0 : _n.overdue_time_val;
            this.overdue_money = (_o = res.data.data.userInfo) == null ? void 0 : _o.overdue_money;
            this.overdue_money_val = (_p = res.data.data.userInfo) == null ? void 0 : _p.overdue_money_val;
          } else {
            formatAppLog("log", "at pages/largeloan/largeloan.vue:349", "wdl");
            uni.navigateTo({
              url: "/pages/login/login"
            });
          }
        }
      });
    },
    methods: {
      formSubmit: function(e) {
        formatAppLog("log", "at pages/largeloan/largeloan.vue:358", e);
        var rule = [
          { name: "name", checkType: "notnull", checkRule: "", errorMsg: "姓名不能为空" },
          { name: "phone", checkType: "phoneno", checkRule: "", errorMsg: "手机号不能为空" },
          { name: "id_card", checkType: "notnull", checkRule: "", errorMsg: "请输入您的身份证号" },
          { name: "city", checkType: "notnull", checkRule: "", errorMsg: "所在城市不能为空" },
          { name: "we_chat", checkType: "notnull", checkRule: "", errorMsg: "微信不能为空" },
          { name: "money", checkType: "in", checkRule: "1,2,3,4,5", errorMsg: "请选择期望金额" },
          { name: "sesame", checkType: "in", checkRule: "1,2,3,4,5,6", errorMsg: "请选择芝麻分" },
          { name: "credit", checkType: "in", checkRule: "1,2,3,4", errorMsg: "请选择信用情况" },
          { name: "overdue_time", checkType: "in", checkRule: "0,1,2,3,4,5", errorMsg: "请选择逾期时长" },
          { name: "overdue_money", checkType: "in", checkRule: "0,1,2,3,4,5", errorMsg: "请选择逾期金额" }
        ];
        var formData = e.detail.value;
        if (this.city_code == void 0) {
          formData.city_code = "010";
        }
        formData = Object.assign({}, this.backData, formData);
        formData.is_house = 0;
        formData.is_car = 0;
        formData.accumulation = 0;
        formData.social = 0;
        formData.company_name = 0;
        formData.insurance = 0;
        this.mutiList.find((item) => {
          formatAppLog("log", "at pages/largeloan/largeloan.vue:384", item);
          if (item.value == 1 && item.checked == true) {
            formData.is_house = 2;
          }
          if (item.value == 2 && item.checked == true) {
            formData.is_car = 2;
          }
          if (item.value == 3 && item.checked == true) {
            formData.accumulation = 2;
          }
          if (item.value == 4 && item.checked == true) {
            formData.social = 2;
          }
          if (item.value == 5 && item.checked == true) {
            formData.company_name = 2;
          }
          if (item.value == 6 && item.checked == true) {
            formData.insurance = 2;
          }
        });
        var checkRes = graceChecker.check(formData, rule);
        if (this.isAgree != true) {
          uni.showToast({ title: "请勾选用户协议和隐私协议", icon: "none" });
          return;
        }
        formatAppLog("log", "at pages/largeloan/largeloan.vue:404", formData);
        if (checkRes) {
          uni.request({
            url: "https://api.maimangbox.cn/form",
            data: {
              formData
            },
            header: {
              "api-token": uni.getStorageSync("token")
            },
            method: "POST",
            success: (res) => {
              if (res.data.resultCode == 1e4) {
                uni.showToast({ title: "提交成功", icon: "none" });
                setTimeout(function() {
                  uni.navigateTo({
                    url: "/pages/mate/mate?next=mate"
                  });
                }, 3e3);
              } else {
                uni.showToast({ title: res.data.resultMsg, icon: "none" });
              }
            }
          });
        } else {
          uni.showToast({ title: graceChecker.error, icon: "none" });
        }
      },
      formReset: function(e) {
        formatAppLog("log", "at pages/largeloan/largeloan.vue:433", "清空数据");
      },
      checkboxChange(e, checkboxList, type) {
        var items = checkboxList, values = e.detail.value;
        e.currentTarget.dataset.name;
        for (var i = 0, lenI = items.length; i < lenI; ++i) {
          const item = items[i];
          if (values.includes(item.value)) {
            this.$set(item, "checked", true);
            if (type == 1) {
              this.money = values;
              this.money_val = item.title;
            }
            if (type == 2) {
              this.sesame = values;
              this.sesame_val = item.title;
            }
            if (type == 3) {
              this.credit = values;
              this.credit_val = item.title;
            }
            if (type == 4) {
              this.overdue_time = values;
              this.overdue_time_val = item.title;
            }
            if (type == 5) {
              this.overdue_money = values;
              this.overdue_money_val = item.title;
            }
          } else {
            this.$set(item, "checked", false);
          }
        }
      },
      handleChange(e) {
        this.backData.car = "";
        this.value = e.detail.value;
        formatAppLog("log", "at pages/largeloan/largeloan.vue:473", this.value);
        if (this.value.length == 0) {
          uni.showToast({ title: "请勾选已同意用户协议和隐私协议!", icon: "none" });
        } else {
          this.agree = true;
          formatAppLog("log", "at pages/largeloan/largeloan.vue:478", "勾选成功");
        }
      },
      agreeChange(e) {
        this.isAgree = e;
      },
      openPicker() {
        formatAppLog("log", "at pages/largeloan/largeloan.vue:486", "执行打开地址选择器");
        this.show = true;
      },
      changeClick(value, value2, value3, value4) {
        formatAppLog("log", "at pages/largeloan/largeloan.vue:492", "地址选择器 = " + value + value2 + value3 + value4);
        this.province = value;
        this.cityData = value3;
        this.provinceid = value2;
        this.cityid = value4;
        this.cityCode = value4;
        this.city_code = value4;
      },
      onhideShow() {
        this.show = false;
        formatAppLog("log", "at pages/largeloan/largeloan.vue:505", "执行了关闭地址选择器");
      },
      //选中省市区
      onsetCity(e) {
        formatAppLog("log", "at pages/largeloan/largeloan.vue:508", e);
        let data = e.detail.target.dataset;
        let address = data.province + data.city;
        this.show = false;
        this.city = address;
      },
      // 
      switchChange(e) {
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_agree = resolveEasycom(vue.resolveDynamicComponent("agree"), __easycom_0);
    const _component_cc_selectDity = resolveEasycom(vue.resolveDynamicComponent("cc-selectDity"), __easycom_1);
    return $data.pageShow ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "container"
    }, [
      vue.createElementVNode(
        "form",
        {
          onSubmit: _cache[13] || (_cache[13] = (...args) => $options.formSubmit && $options.formSubmit(...args)),
          onReset: _cache[14] || (_cache[14] = (...args) => $options.formReset && $options.formReset(...args))
        },
        [
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("view", { class: "comon_title" }, [
              vue.createElementVNode("image", {
                src: "/static/info_title_icon.png",
                class: "comon_icon"
              }),
              vue.createTextVNode("基本信息")
            ]),
            vue.createElementVNode("view", { class: "box" }, [
              vue.createElementVNode("view", { class: "form_item" }, [
                vue.createElementVNode("view", { class: "title" }, "姓名"),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "uni-input form_input",
                    name: "name",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.name = $event),
                    placeholder: "请输入您的姓名"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.name]
                ])
              ]),
              vue.createElementVNode("view", { class: "form_item" }, [
                vue.createElementVNode("view", { class: "title" }, "手机号"),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "uni-input form_input",
                    name: "phone",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.phone = $event),
                    placeholder: "请输入您的手机号"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.phone]
                ])
              ]),
              vue.createElementVNode("view", { class: "form_item" }, [
                vue.createElementVNode("view", { class: "title" }, "身份证号"),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "uni-input form_input",
                    name: "id_card",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.id_card = $event),
                    phoneplaceholder: "请输入您的身份证号"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.id_card]
                ])
              ]),
              vue.createElementVNode("view", { class: "form_item" }, [
                vue.createElementVNode("view", { class: "title" }, "所在城市"),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "uni-input form_input",
                    placeholder: "请选择省市区",
                    name: "city",
                    readonly: true,
                    onClick: _cache[3] || (_cache[3] = (...args) => $options.openPicker && $options.openPicker(...args)),
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.city = $event)
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.city]
                ]),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "uni-input form_input",
                    hidden: "",
                    name: "city_code",
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.city_code = $event)
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.city_code]
                ])
              ]),
              vue.createElementVNode("view", { class: "form_item" }, [
                vue.createElementVNode("view", { class: "title" }, "微信"),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    class: "uni-input form_input",
                    name: "we_chat",
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.we_chat = $event),
                    placeholder: "请输入您的微信号"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.we_chat]
                ])
              ]),
              vue.createElementVNode("view", { class: "form_item noflex" }, [
                vue.createElementVNode("view", { class: "title" }, "期望金额"),
                vue.createElementVNode("view", { class: "checkbox-group" }, [
                  vue.createElementVNode(
                    "radio-group",
                    {
                      onChange: _cache[7] || (_cache[7] = ($event) => $options.checkboxChange($event, $data.expectMoney, 1)),
                      class: "radio-group-list",
                      name: "money"
                    },
                    [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList($data.expectMoney, (item, index2) => {
                          return vue.openBlock(), vue.createElementBlock(
                            "label",
                            {
                              key: item.value,
                              class: vue.normalizeClass($data.money == item.value ? "option_default checkCss" : "option_default")
                            },
                            [
                              vue.createElementVNode("view", { class: "checkboxHidden" }, [
                                vue.createElementVNode("radio", {
                                  value: item.value,
                                  checked: $data.money == item.value
                                }, null, 8, ["value", "checked"]),
                                vue.createElementVNode("input", {
                                  name: "money_val",
                                  value: $data.money_val
                                }, null, 8, ["value"])
                              ]),
                              vue.createElementVNode(
                                "view",
                                { class: "checkTxt" },
                                vue.toDisplayString(item.title),
                                1
                                /* TEXT */
                              )
                            ],
                            2
                            /* CLASS */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    32
                    /* HYDRATE_EVENTS */
                  )
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("view", { class: "comon_title" }, [
              vue.createElementVNode("image", {
                src: "/static/info_title_icon.png",
                class: "comon_icon"
              }),
              vue.createTextVNode("贷款信息")
            ]),
            vue.createElementVNode("view", { class: "box" }, [
              vue.createElementVNode("view", { class: "form_item noflex" }, [
                vue.createElementVNode("view", { class: "title" }, "芝麻分"),
                vue.createElementVNode("view", { class: "checkbox-group" }, [
                  vue.createElementVNode(
                    "radio-group",
                    {
                      onChange: _cache[8] || (_cache[8] = ($event) => $options.checkboxChange($event, $data.zhimaList, 2)),
                      class: "radio-group-list",
                      name: "sesame"
                    },
                    [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList($data.zhimaList, (item, index2) => {
                          return vue.openBlock(), vue.createElementBlock(
                            "label",
                            {
                              key: item.value,
                              class: vue.normalizeClass($data.sesame == item.value ? "option_default checkCss" : "option_default")
                            },
                            [
                              vue.createElementVNode("view", { class: "checkboxHidden" }, [
                                vue.createElementVNode("radio", {
                                  value: item.value,
                                  checked: $data.sesame == item.value
                                }, null, 8, ["value", "checked"]),
                                vue.createElementVNode("input", {
                                  name: "sesame_val",
                                  value: $data.sesame_val
                                }, null, 8, ["value"])
                              ]),
                              vue.createElementVNode(
                                "view",
                                { class: "checkTxt" },
                                vue.toDisplayString(item.title),
                                1
                                /* TEXT */
                              )
                            ],
                            2
                            /* CLASS */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    32
                    /* HYDRATE_EVENTS */
                  )
                ])
              ]),
              vue.createElementVNode("view", { class: "form_item noflex" }, [
                vue.createElementVNode("view", { class: "title" }, "信用情况"),
                vue.createElementVNode("view", { class: "checkbox-group" }, [
                  vue.createElementVNode(
                    "radio-group",
                    {
                      onChange: _cache[9] || (_cache[9] = ($event) => $options.checkboxChange($event, $data.creditLst, 3)),
                      class: "radio-group-list",
                      name: "credit"
                    },
                    [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList($data.creditLst, (item, index2) => {
                          return vue.openBlock(), vue.createElementBlock(
                            "label",
                            {
                              key: item.value,
                              class: vue.normalizeClass($data.credit == item.value ? "option_default checkCss" : "option_default")
                            },
                            [
                              vue.createElementVNode("view", { class: "checkboxHidden" }, [
                                vue.createElementVNode("radio", {
                                  value: item.value,
                                  checked: $data.credit == item.value
                                }, null, 8, ["value", "checked"]),
                                vue.createElementVNode("input", {
                                  name: "credit_val",
                                  value: $data.credit_val
                                }, null, 8, ["value"])
                              ]),
                              vue.createElementVNode(
                                "view",
                                { class: "checkTxt" },
                                vue.toDisplayString(item.title),
                                1
                                /* TEXT */
                              )
                            ],
                            2
                            /* CLASS */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    32
                    /* HYDRATE_EVENTS */
                  )
                ])
              ]),
              vue.createElementVNode("view", { class: "form_item noflex" }, [
                vue.createElementVNode("view", { class: "title" }, "逾期时长"),
                vue.createElementVNode("view", { class: "checkbox-group" }, [
                  vue.createElementVNode(
                    "radio-group",
                    {
                      onChange: _cache[10] || (_cache[10] = ($event) => $options.checkboxChange($event, $data.overdueTimeList, 4)),
                      class: "radio-group-list",
                      name: "overdue_time"
                    },
                    [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList($data.overdueTimeList, (item, index2) => {
                          return vue.openBlock(), vue.createElementBlock(
                            "label",
                            {
                              class: vue.normalizeClass($data.overdue_time == item.value ? "option_default checkCss" : "option_default")
                            },
                            [
                              vue.createElementVNode("view", { class: "checkboxHidden" }, [
                                vue.createElementVNode("radio", {
                                  value: item.value,
                                  checked: $data.overdue_time == item.value
                                }, null, 8, ["value", "checked"]),
                                vue.createElementVNode("input", {
                                  name: "overdue_time_val",
                                  value: $data.overdue_time_val
                                }, null, 8, ["value"])
                              ]),
                              vue.createElementVNode(
                                "view",
                                { class: "checkTxt" },
                                vue.toDisplayString(item.title),
                                1
                                /* TEXT */
                              )
                            ],
                            2
                            /* CLASS */
                          );
                        }),
                        256
                        /* UNKEYED_FRAGMENT */
                      ))
                    ],
                    32
                    /* HYDRATE_EVENTS */
                  )
                ])
              ]),
              vue.createElementVNode("view", { class: "form_item noflex" }, [
                vue.createElementVNode("view", { class: "title" }, "逾期金额"),
                vue.createElementVNode("view", { class: "checkbox-group" }, [
                  vue.createElementVNode(
                    "radio-group",
                    {
                      onChange: _cache[11] || (_cache[11] = ($event) => $options.checkboxChange($event, $data.overdueMoneyList, 5)),
                      class: "radio-group-list",
                      name: "overdue_money"
                    },
                    [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList($data.overdueMoneyList, (item, index2) => {
                          return vue.openBlock(), vue.createElementBlock(
                            "label",
                            {
                              class: vue.normalizeClass($data.overdue_money == item.value ? "option_default checkCss" : "option_default")
                            },
                            [
                              vue.createElementVNode("view", { class: "checkboxHidden" }, [
                                vue.createElementVNode("radio", {
                                  value: item.value,
                                  checked: $data.overdue_money == item.value
                                }, null, 8, ["value", "checked"]),
                                vue.createElementVNode("input", {
                                  name: "overdue_money_val",
                                  value: $data.overdue_money_val
                                }, null, 8, ["value"])
                              ]),
                              vue.createElementVNode(
                                "view",
                                { class: "checkTxt" },
                                vue.toDisplayString(item.title),
                                1
                                /* TEXT */
                              )
                            ],
                            2
                            /* CLASS */
                          );
                        }),
                        256
                        /* UNKEYED_FRAGMENT */
                      ))
                    ],
                    32
                    /* HYDRATE_EVENTS */
                  )
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "muti" }, [
            vue.createElementVNode("view", { class: "title" }, "完成下列选项有助于提升通过率（多选,选填）"),
            vue.createElementVNode("view", { class: "checkbox-group" }, [
              vue.createElementVNode(
                "checkbox-group",
                {
                  onChange: _cache[12] || (_cache[12] = ($event) => $options.checkboxChange($event, $data.mutiList, 6)),
                  class: "radio-group-list"
                },
                [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($data.mutiList, (item, index2) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "label",
                        {
                          key: item.value,
                          class: vue.normalizeClass(item.checked ? "option_default checkCss" : "option_default")
                        },
                        [
                          vue.createElementVNode("view", { class: "checkboxHidden" }, [
                            vue.createElementVNode("checkbox", {
                              value: item.value,
                              checked: _ctx.checked
                            }, null, 8, ["value", "checked"])
                          ]),
                          vue.createElementVNode(
                            "view",
                            { class: "checkTxt" },
                            vue.toDisplayString(item.title),
                            1
                            /* TEXT */
                          )
                        ],
                        2
                        /* CLASS */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                32
                /* HYDRATE_EVENTS */
              )
            ])
          ]),
          vue.createVNode(_component_agree, { onIsAgree: $options.agreeChange }, null, 8, ["onIsAgree"]),
          vue.createElementVNode("view", { class: "uni-btn-v" }, [
            vue.createElementVNode("button", {
              "form-type": "submit",
              class: "next_btn"
            }, "下一步")
          ])
        ],
        32
        /* HYDRATE_EVENTS */
      ),
      vue.createCommentVNode(" 省市区选择 province city area初始省市区设置 show:是否显示  @sureSelectArea：确认事件 @hideShow：隐藏事件"),
      vue.createVNode(_component_cc_selectDity, {
        province: $data.province,
        city: $data.cityData,
        provinceid: $data.provinceid,
        cityid: $data.cityid,
        show: $data.show,
        onChangeClick: $options.changeClick,
        onSureSelectArea: $options.onsetCity,
        onHideShow: $options.onhideShow,
        readonly: true
      }, null, 8, ["province", "city", "provinceid", "cityid", "show", "onChangeClick", "onSureSelectArea", "onHideShow"])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const PagesLargeloanLargeloan = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__file", "D:/lj/haoxingj/haoxingj/pages/largeloan/largeloan.vue"]]);
  const _sfc_main$b = {
    data() {
      return {
        productList: []
      };
    },
    onShow() {
      let token = uni.getStorageSync("token");
      uni.request({
        url: "https://api.maimangbox.cn/list",
        header: {
          "content-type": "application/json",
          "api-token": token
        },
        method: "POST",
        success: (res) => {
          if (res.data.resultCode == 1e4) {
            this.productList = res.data.data.productList;
            formatAppLog("log", "at pages/institutionlist/institutionlist.vue:60", this.productList);
          } else {
            uni.navigateTo({
              url: "/pages/login" + res.data.applyUrl
            });
          }
        }
      });
    },
    methods: {
      goToLoanPage(url) {
        uni.navigateTo({
          url
        });
      },
      goToKnowledgeDetail(id) {
        uni.navigateTo({
          url: "/pages/knowledgedetail/knowledgedetail?id=" + id
        });
      },
      handleApply(url) {
        uni.navigateTo({
          url: "/pages/webview/webview?url=" + url
        });
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    var _a, _b, _c, _d;
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "radius_bg" }),
      vue.createElementVNode("view", { class: "pages" }, [
        vue.createElementVNode("view", { class: "info" }, [
          vue.createElementVNode("view", { class: "top" }, [
            vue.createElementVNode("view", { class: "edu" }, "最高可获得额度(元)"),
            vue.createElementVNode("view", { class: "jg_box" }, [
              vue.createTextVNode(
                vue.toDisplayString((_a = $data.productList[0]) == null ? void 0 : _a.title),
                1
                /* TEXT */
              ),
              vue.createElementVNode("image", {
                src: (_b = $data.productList[0]) == null ? void 0 : _b.icon,
                class: "jg_logo"
              }, null, 8, ["src"])
            ])
          ]),
          vue.createElementVNode(
            "view",
            { class: "money" },
            vue.toDisplayString((_c = $data.productList[0]) == null ? void 0 : _c.max_price) + "00,000",
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "lirunl" }, [
            vue.createElementVNode(
              "view",
              { class: "yearlr" },
              "年化利润率：" + vue.toDisplayString(((_d = $data.productList[0]) == null ? void 0 : _d.day_rate) * 365) + "%",
              1
              /* TEXT */
            ),
            vue.createElementVNode("button", {
              class: "applyNow",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.handleApply($data.productList[0].url))
            }, "立即申请")
          ])
        ]),
        vue.createElementVNode("view", { class: "list" }, [
          vue.createElementVNode("view", { class: "title" }, "优选机构"),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.productList.slice(1), (item, indx) => {
              return vue.openBlock(), vue.createElementBlock("view", { class: "item" }, [
                vue.createElementVNode("image", {
                  src: "/static/kangkk.png",
                  class: "tag_bg"
                }),
                vue.createElementVNode("view", { class: "jig_name" }, [
                  vue.createElementVNode("image", {
                    src: item.icon,
                    class: "img"
                  }, null, 8, ["src"]),
                  vue.createTextVNode(
                    " " + vue.toDisplayString(item.title),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "jig_info" }, [
                  vue.createElementVNode("view", { class: "money_box" }, [
                    vue.createElementVNode("view", { class: "money" }, [
                      vue.createElementVNode("text", { class: "currency" }, "￥"),
                      vue.createTextVNode(
                        vue.toDisplayString(item.max_price) + "0,000",
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "bottom_title" }, "最高可借(元)")
                  ]),
                  vue.createElementVNode("view", { class: "rate_box" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "rate" },
                      vue.toDisplayString(item.day_rate * 365) + "%",
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "bottom_title" }, "年利率")
                  ]),
                  vue.createElementVNode("button", {
                    class: "jig_applyNow",
                    onClick: ($event) => $options.handleApply(item.url)
                  }, "立即申请", 8, ["onClick"])
                ])
              ]);
            }),
            256
            /* UNKEYED_FRAGMENT */
          ))
        ])
      ])
    ]);
  }
  const PagesInstitutionlistInstitutionlist = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__file", "D:/lj/haoxingj/haoxingj/pages/institutionlist/institutionlist.vue"]]);
  const _sfc_main$a = {
    data() {
      return {
        name: "",
        channel: ""
      };
    },
    onShow() {
      formatAppLog("log", "at pages/my/my.vue:46", "my");
      let token = uni.getStorageSync("token");
      formatAppLog("log", "at pages/my/my.vue:48", uni.getStorageSync("token"));
      uni.request({
        url: "https://api.maimangbox.cn/userinfo",
        header: {
          "content-type": "application/json",
          "api-token": token
        },
        method: "POST",
        success: (res) => {
          if (res.data.resultCode == 1e4) {
            this.name = res.data.data.userInfo.name;
            this.channel = res.data.data.channel;
          } else {
            uni.navigateTo({
              url: "/pages/login/login"
            });
          }
        }
      });
    },
    methods: {
      goToPage(url) {
        uni.navigateTo({
          url
        });
      },
      logout(url) {
        uni.setStorageSync("token", ""), uni.reLaunch({
          url: "/pages/index/index?channel=" + this.channel
        });
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", {
        class: "info",
        onClick: _cache[0] || (_cache[0] = ($event) => $options.goToPage("/pages/personalinfo/personalinfo?next=userInfo"))
      }, [
        vue.createElementVNode("view", { class: "my_info" }, [
          vue.createElementVNode("image", {
            src: "/static/car.png",
            class: "avatar"
          }),
          vue.createElementVNode("view", { class: "info_r" }, [
            vue.createElementVNode(
              "view",
              { class: "name" },
              vue.toDisplayString($data.name) + "，来了",
              1
              /* TEXT */
            ),
            vue.createElementVNode("image", {
              src: "/static/renz.png",
              class: "renz",
              mode: "heightFix"
            })
          ])
        ]),
        vue.createElementVNode("image", {
          src: "/static/info_r_arrow.png",
          class: "arrow"
        })
      ]),
      vue.createElementVNode("view", { class: "list" }, [
        vue.createElementVNode("view", {
          class: "item",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.goToPage("/pages/application/application?next=myApply"))
        }, [
          vue.createElementVNode("view", { class: "item_l" }, [
            vue.createElementVNode("image", {
              src: "/static/wdsq_icon.png",
              class: "icons",
              mode: "widthFix"
            }),
            vue.createTextVNode("我的申请 ")
          ]),
          vue.createElementVNode("image", {
            src: "/static/info_r_arrow.png",
            class: "arrow"
          })
        ]),
        vue.createElementVNode("view", {
          class: "item",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.goToPage("/pages/feedback/feedback"))
        }, [
          vue.createElementVNode("view", { class: "item_l" }, [
            vue.createElementVNode("image", {
              src: "/static/yjfk_icon.png",
              class: "icons",
              mode: "widthFix"
            }),
            vue.createTextVNode("意见与反馈 ")
          ]),
          vue.createElementVNode("image", {
            src: "/static/info_r_arrow.png",
            class: "arrow"
          })
        ]),
        vue.createElementVNode("view", {
          class: "item",
          onClick: _cache[3] || (_cache[3] = ($event) => $options.goToPage("/pages/setting/setting"))
        }, [
          vue.createElementVNode("view", { class: "item_l" }, [
            vue.createElementVNode("image", {
              src: "/static/set_icon.png",
              class: "icons",
              mode: "widthFix"
            }),
            vue.createTextVNode("设置 ")
          ]),
          vue.createElementVNode("image", {
            src: "/static/info_r_arrow.png",
            class: "arrow"
          })
        ])
      ]),
      vue.createElementVNode("view", {
        class: "logout",
        onClick: _cache[4] || (_cache[4] = (...args) => $options.logout && $options.logout(...args))
      }, "退出登录")
    ]);
  }
  const PagesMyMy = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "D:/lj/haoxingj/haoxingj/pages/my/my.vue"]]);
  const _sfc_main$9 = {
    data() {
      return {};
    },
    methods: {
      goToPage(url) {
        uni.navigateTo({
          url
        });
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode("view", { class: "name" }, "账号设置"),
        vue.createElementVNode("view", { class: "desc" }, "您的APP设置")
      ]),
      vue.createElementVNode("view", { class: "list" }, [
        vue.createElementVNode("view", {
          class: "item",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.goToPage("/pages/agreement/agreement"))
        }, [
          vue.createElementVNode("view", { class: "item_l" }, "平台协议"),
          vue.createElementVNode("image", {
            src: "/static/dingw_arrow.png",
            class: "arrow"
          })
        ]),
        vue.createElementVNode("view", {
          class: "item",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.goToPage("/pages/privacysettings/privacysettings"))
        }, [
          vue.createElementVNode("view", { class: "item_l" }, "隐私设置"),
          vue.createElementVNode("image", {
            src: "/static/dingw_arrow.png",
            class: "arrow"
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "list" }, [
        vue.createElementVNode("view", {
          class: "item",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.goToPage("/pages/about/about"))
        }, [
          vue.createElementVNode("view", { class: "item_l" }, "关于我们"),
          vue.createElementVNode("image", {
            src: "/static/dingw_arrow.png",
            class: "arrow"
          })
        ]),
        vue.createElementVNode("view", {
          class: "item",
          onClick: _cache[3] || (_cache[3] = ($event) => $options.goToPage("/pages/logoff/logoff"))
        }, [
          vue.createElementVNode("view", { class: "item_l" }, "注销账户"),
          vue.createElementVNode("image", {
            src: "/static/dingw_arrow.png",
            class: "arrow"
          })
        ])
      ])
    ]);
  }
  const PagesSettingSetting = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "D:/lj/haoxingj/haoxingj/pages/setting/setting.vue"]]);
  const _sfc_main$8 = {
    data() {
      return {};
    },
    methods: {
      goToKnowledgeDetail(key) {
        uni.navigateTo({
          url: "/pages/knowledgedetail/knowledgedetail?key=" + key
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode("view", { class: "name" }, "平台协议"),
        vue.createElementVNode("view", { class: "desc" }, "查看您的协议")
      ]),
      vue.createElementVNode("view", { class: "list" }, [
        vue.createElementVNode("view", {
          class: "item",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.goToKnowledgeDetail("3"))
        }, [
          vue.createElementVNode("view", { class: "item_l" }, "注册协议"),
          vue.createElementVNode("image", {
            src: "/static/dingw_arrow.png",
            class: "arrow"
          })
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("view", {
            class: "item_l",
            onClick: _cache[1] || (_cache[1] = ($event) => $options.goToKnowledgeDetail("4"))
          }, "隐私协议"),
          vue.createElementVNode("image", {
            src: "/static/dingw_arrow.png",
            class: "arrow"
          })
        ]),
        vue.createElementVNode("view", {
          class: "item",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.goToKnowledgeDetail("5"))
        }, [
          vue.createElementVNode("view", { class: "item_l" }, "咨询服务授权协议"),
          vue.createElementVNode("image", {
            src: "/static/dingw_arrow.png",
            class: "arrow"
          })
        ]),
        vue.createElementVNode("view", {
          class: "item",
          onClick: _cache[3] || (_cache[3] = ($event) => $options.goToKnowledgeDetail("6"))
        }, [
          vue.createElementVNode("view", { class: "item_l" }, "个人信息推送服务授权协议"),
          vue.createElementVNode("image", {
            src: "/static/dingw_arrow.png",
            class: "arrow"
          })
        ])
      ])
    ]);
  }
  const PagesAgreementAgreement = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "D:/lj/haoxingj/haoxingj/pages/agreement/agreement.vue"]]);
  const _sfc_main$7 = {
    data() {
      return {
        userInfo: "",
        channel: ""
      };
    },
    onShow() {
      let token = uni.getStorageSync("token");
      uni.request({
        url: "https://api.maimangbox.cn/userinfo",
        header: {
          "content-type": "application/json",
          "api-token": token
        },
        method: "POST",
        success: (res) => {
          if (res.data.resultCode == 1e4) {
            this.userInfo = res.data.data.userInfo;
            this.channel = res.data.data.channel;
          } else {
            uni.navigateTo({
              url: "/pages/my/my/" + this.channel
            });
          }
        }
      });
    },
    methods: {}
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode("view", { class: "name" }, "个人信息"),
        vue.createElementVNode("view", { class: "desc" }, "您的个人信息")
      ]),
      vue.createElementVNode("view", { class: "list" }, [
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("view", { class: "item_l" }, "实名认证"),
          vue.createElementVNode(
            "view",
            { class: "item_r" },
            vue.toDisplayString($data.userInfo.name),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("view", { class: "item_l" }, "身份证号"),
          vue.createElementVNode(
            "view",
            { class: "item_r" },
            vue.toDisplayString($data.userInfo.id_card),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("view", { class: "item_l" }, "登录手机号"),
          vue.createElementVNode(
            "view",
            { class: "item_r" },
            vue.toDisplayString($data.userInfo.phone),
            1
            /* TEXT */
          )
        ])
      ])
    ]);
  }
  const PagesPersonalinfoPersonalinfo = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__file", "D:/lj/haoxingj/haoxingj/pages/personalinfo/personalinfo.vue"]]);
  const _sfc_main$6 = {
    data() {
      return {
        inputText: "",
        num: 0,
        success: false
      };
    },
    methods: {
      writeComments() {
        this.num = this.inputText.length;
        if (this.num >= 200) {
          return;
        }
      },
      handleClick() {
        let token = uni.getStorageSync("token");
        uni.request({
          url: "https://api.maimangbox.cn/problem",
          data: {
            desc: this.inputText
          },
          header: {
            "content-type": "application/json",
            "api-token": token
          },
          method: "POST",
          success: (res) => {
            if (res.data.resultCode == 1e4) {
              uni.showToast({ title: res.data.resultMsg, icon: "none" });
              this.success = true;
            }
          }
        });
      },
      back() {
        uni.switchTab({
          url: "/pages/my/my"
        });
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      !$data.success ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "submitBefor"
      }, [
        vue.createElementVNode("view", { class: "info" }, [
          vue.createElementVNode("view", { class: "name" }, "意见反馈"),
          vue.createElementVNode("view", { class: "desc" }, "获得您的意见反馈并改进")
        ]),
        vue.createElementVNode("view", { class: "box" }, [
          vue.createElementVNode("view", { class: "title" }, "问题与建议"),
          vue.withDirectives(vue.createElementVNode(
            "textarea",
            {
              class: "text",
              maxlength: "200",
              onInput: _cache[0] || (_cache[0] = (...args) => $options.writeComments && $options.writeComments(...args)),
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.inputText = $event)
            },
            null,
            544
            /* HYDRATE_EVENTS, NEED_PATCH */
          ), [
            [vue.vModelText, $data.inputText]
          ]),
          vue.createElementVNode(
            "view",
            { class: "num" },
            vue.toDisplayString($data.num) + "/200",
            1
            /* TEXT */
          )
        ]),
        vue.createCommentVNode(' <image src="../../static/add_coments.png" class="add"></image> '),
        vue.createElementVNode("button", {
          class: "btn",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.handleClick())
        }, "提交")
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "success_box"
      }, [
        vue.createElementVNode("image", {
          src: "/static/feedback_success.png",
          class: "success_icon"
        }),
        vue.createElementVNode("view", { class: "success_text" }, [
          vue.createTextVNode("我们会认真评估您的建议，如您有问题，可联系官方客服处理，客服电话："),
          vue.createElementVNode("text", { class: "phone" }, "400 0000 8888")
        ]),
        vue.createElementVNode("button", {
          class: "btn",
          onClick: _cache[3] || (_cache[3] = ($event) => $options.back())
        }, "返回")
      ]))
    ]);
  }
  const PagesFeedbackFeedback = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "D:/lj/haoxingj/haoxingj/pages/feedback/feedback.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {
        url: ""
      };
    },
    onLoad(item) {
      this.url = decodeURIComponent(item.url);
    },
    methods: {}
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("web-view", { src: $data.url }, null, 8, ["src"])
    ]);
  }
  const PagesWebviewWebview = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__file", "D:/lj/haoxingj/haoxingj/pages/webview/webview.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {
        myApplyList: [],
        productList: [],
        mate: false,
        clickNum: 0,
        tjLayer: false
      };
    },
    onShow() {
      let token = uni.getStorageSync("token");
      uni.request({
        url: "https://api.maimangbox.cn/mate",
        header: {
          "content-type": "application/json",
          "api-token": token
        },
        method: "POST",
        success: (res) => {
          if (res.data.resultCode == 1e4) {
            formatAppLog("log", "at pages/mate/mate.vue:88", res.data.resultMsg);
            this.myApplyList = res.data.resultMsg.myApplyList;
            this.productList = res.data.resultMsg.productList;
            if (res.data.resultMsg.myApplyList.length >= 1) {
              this.mate = true;
            }
          } else {
            uni.navigateTo({
              url: "/pages/login/login?next=mate"
            });
          }
        }
      });
    },
    methods: {
      goToHome(url) {
        if (this.clickNum == 0) {
          this.tjLayer = true;
        } else {
          uni.switchTab({
            url
          });
        }
      },
      goToKnowledgeDetail(id) {
        uni.navigateTo({
          url: "/pages/knowledgedetail/knowledgedetail?id=" + id
        });
      },
      listApplyBtn(url, id) {
        uni.request({
          url: "https://api.maimangbox.cn/click",
          data: {
            productId: id
          },
          header: {
            "content-type": "application/json",
            "api-token": uni.getStorageSync("token")
          },
          method: "POST",
          success: (res) => {
            formatAppLog("log", "at pages/mate/mate.vue:128", url);
            uni.setStorageSync("clickUrl", url);
            if (res.data.resultCode == 1e4) {
              this.clickNum = 1;
              uni.navigateTo({
                url: "/pages/webview/webview?url=" + res.data.applyUrl
              });
            } else {
              uni.navigateTo({
                url: "/pages/login" + res.data.applyUrl
              });
            }
          }
        });
      },
      closeLayer() {
        this.tjLayer = false;
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "pages" }, [
        $data.mate ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "mate_success"
        }, [
          vue.createElementVNode("view", { class: "scroll_box" }, [
            vue.createElementVNode("image", {
              src: "/static/luck_bg.png",
              class: "scroll_bg"
            }),
            vue.createElementVNode("view", { class: "scroll_text" }, [
              vue.createElementVNode("text", null, "已匹配以下服务机构稍后将与您联系，"),
              vue.createElementVNode("text", { class: "tips" }, "请注意接听电话")
            ])
          ]),
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("view", {
              class: "top",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.listApplyBtn($data.myApplyList[0].name.url, $data.myApplyList[0].name.id))
            }, [
              vue.createElementVNode("view", { class: "info_l" }, [
                vue.createElementVNode(
                  "view",
                  { class: "name" },
                  vue.toDisplayString($data.myApplyList[0].name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "xiey" }, "《信息推送授权协议》")
              ]),
              vue.createElementVNode("view", { class: "jg_box" }, [
                vue.createElementVNode("image", {
                  src: $data.myApplyList[0].business_license,
                  class: "jg_logo"
                }, null, 8, ["src"])
              ])
            ])
          ])
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "mate_error"
        }, [
          vue.createElementVNode("image", {
            src: "/static/pip_fail.png",
            class: "icon"
          }),
          vue.createElementVNode("view", { class: "tips" }, "匹配失败，您所在地区暂无相关服务"),
          vue.createElementVNode("button", {
            class: "gotohome",
            onClick: _cache[1] || (_cache[1] = ($event) => $options.goToHome("/pages/index/index"))
          }, "去首页")
        ])),
        vue.createElementVNode("view", { class: "list" }, [
          vue.createElementVNode("view", { class: "title" }, "优选机构"),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.productList, (item, indx) => {
              return vue.openBlock(), vue.createElementBlock("view", { class: "item" }, [
                vue.createElementVNode("image", {
                  src: "/static/kangkk.png",
                  class: "tag_bg"
                }),
                vue.createElementVNode("view", { class: "jig_name" }, [
                  vue.createElementVNode("image", {
                    src: item.icon,
                    class: "img"
                  }, null, 8, ["src"]),
                  vue.createTextVNode(
                    " " + vue.toDisplayString(item.title),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "jig_info" }, [
                  vue.createElementVNode("view", { class: "money_box" }, [
                    vue.createElementVNode("view", { class: "money" }, [
                      vue.createElementVNode("text", { class: "currency" }, "￥"),
                      vue.createTextVNode(
                        vue.toDisplayString(item.max_price) + "0,000",
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "bottom_title" }, "最高可借(元)")
                  ]),
                  vue.createElementVNode("view", { class: "rate_box" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "rate" },
                      vue.toDisplayString(item.day_rate * 365) + "%",
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "bottom_title" }, "年利率")
                  ]),
                  vue.createElementVNode("button", {
                    class: "jig_applyNow",
                    onClick: ($event) => $options.listApplyBtn(item.url, item.id)
                  }, "立即申请", 8, ["onClick"])
                ])
              ]);
            }),
            256
            /* UNKEYED_FRAGMENT */
          ))
        ]),
        vue.createCommentVNode(" layer "),
        $data.tjLayer ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "alert_box"
        }, [
          vue.createElementVNode("view", { class: "small_win" }, [
            vue.createElementVNode("view", { class: "alert_box_title" }, [
              vue.createElementVNode("image", {
                src: "/static/close.svg",
                class: "close",
                onClick: _cache[2] || (_cache[2] = (...args) => $options.closeLayer && $options.closeLayer(...args))
              })
            ]),
            vue.createElementVNode("view", { class: "tip" }, [
              vue.createElementVNode("image", {
                src: "/static/tip_ico.png",
                class: "icon"
              }),
              vue.createTextVNode("没有合适的产品，试试这款123")
            ]),
            vue.createElementVNode("view", { class: "alert_box_content" }, [
              vue.createElementVNode("image", {
                src: $data.myApplyList[0].business_license,
                class: "img"
              }, null, 8, ["src"]),
              vue.createElementVNode("view", { class: "info" }, [
                vue.createElementVNode(
                  "view",
                  { class: "title" },
                  vue.toDisplayString($data.myApplyList[0].name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("image", {
                  src: "/static/zstj_ico.png",
                  class: "icon"
                })
              ])
            ]),
            vue.createElementVNode("button", {
              class: "tosee",
              onClick: _cache[3] || (_cache[3] = ($event) => $options.listApplyBtn($data.myApplyList[0].url, $data.myApplyList[0].id))
            }, "去看看")
          ])
        ])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" layer ")
      ])
    ]);
  }
  const PagesMateMate = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "D:/lj/haoxingj/haoxingj/pages/mate/mate.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {
        noData: false,
        myApplyList: [],
        isShow: false,
        imgUrl: ""
      };
    },
    onShow() {
      let token = uni.getStorageSync("token");
      uni.request({
        url: "https://api.maimangbox.cn/myApply",
        header: {
          "content-type": "application/json",
          "api-token": token
        },
        method: "POST",
        success: (res) => {
          if (res.data.resultCode == 1e4) {
            this.myApplyList = res.data.data.myApplyList;
            if (this.myApplyList.length == 0) {
              this.noData = true;
            }
          } else {
            formatAppLog("log", "at pages/application/application.vue:76", res);
            uni.navigateTo({
              url: "/pages/login/login?next=myApply"
            });
          }
        }
      });
    },
    methods: {
      goToPage(url) {
        uni.navigateTo({
          url
        });
      },
      openLayer(url) {
        this.isShow = true;
        this.imgUrl = url;
      },
      closeLayer(url) {
        this.isShow = false;
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode("view", { class: "name" }, "我的申请"),
        vue.createElementVNode("view", { class: "desc" }, "查看您的申请情况")
      ]),
      $data.noData ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "noData_tips"
      }, "暂无数据")) : (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        { key: 1 },
        vue.renderList($data.myApplyList, (item, index2) => {
          return vue.openBlock(), vue.createElementBlock("view", { class: "list" }, [
            vue.createElementVNode("view", { class: "gsinfo" }, [
              vue.createElementVNode("image", {
                src: item.business_license,
                class: "logo"
              }, null, 8, ["src"]),
              vue.createElementVNode("view", { class: "gs_text" }, [
                vue.createElementVNode(
                  "view",
                  { class: "name" },
                  vue.toDisplayString(item.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "time" },
                  "申请时间：" + vue.toDisplayString(item.date),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", {
              class: "item",
              onClick: ($event) => $options.openLayer(item.business_license)
            }, [
              vue.createElementVNode("view", { class: "item_l" }, "营业执照"),
              vue.createElementVNode("view", { class: "viewBtn" }, [
                vue.createElementVNode("text", null, "查看"),
                vue.createElementVNode("image", {
                  src: "/static/dingw_arrow.png",
                  class: "arrow"
                })
              ])
            ], 8, ["onClick"]),
            vue.createElementVNode("view", {
              class: "item",
              onClick: ($event) => $options.openLayer(item.compliance_commitment)
            }, [
              vue.createElementVNode("view", { class: "item_l" }, "业务合规承诺"),
              vue.createElementVNode("view", { class: "viewBtn" }, [
                vue.createElementVNode("text", null, "查看"),
                vue.createElementVNode("image", {
                  src: "/static/dingw_arrow.png",
                  class: "arrow"
                })
              ])
            ], 8, ["onClick"]),
            vue.createElementVNode("view", {
              class: "item",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.goToPage("/pages/knowledgedetail/knowledgedetail?key=6"))
            }, [
              vue.createElementVNode("view", { class: "item_l" }, "个人信息推送服务授权协议"),
              vue.createElementVNode("view", { class: "viewBtn" }, [
                vue.createElementVNode("text", null, "查看"),
                vue.createElementVNode("image", {
                  src: "/static/dingw_arrow.png",
                  class: "arrow"
                })
              ])
            ])
          ]);
        }),
        256
        /* UNKEYED_FRAGMENT */
      )),
      vue.createCommentVNode(" layer "),
      $data.isShow ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "alert_box"
      }, [
        vue.createElementVNode("view", { class: "small_win" }, [
          vue.createElementVNode("view", { class: "alert_box_title" }, [
            vue.createElementVNode("image", {
              src: "/static/close.svg",
              class: "close",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.closeLayer && $options.closeLayer(...args))
            })
          ]),
          vue.createElementVNode("view", { class: "alert_box_content" }, [
            vue.createElementVNode("image", {
              src: $data.imgUrl,
              class: "alert_img"
            }, null, 8, ["src"])
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" layer ")
    ]);
  }
  const PagesApplicationApplication = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/lj/haoxingj/haoxingj/pages/application/application.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        isShow: false
      };
    },
    methods: {
      goToSetting(key) {
        this.isShow = true;
      },
      closeFn() {
        this.isShow = false;
      },
      nextFn() {
        this.isShow = false;
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode("view", { class: "name" }, "隐私设置"),
        vue.createElementVNode("view", { class: "desc" }, "访问您的位置并提供服务")
      ]),
      vue.createElementVNode("view", { class: "list" }, [
        vue.createElementVNode("view", {
          class: "item",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.goToSetting())
        }, [
          vue.createElementVNode("view", { class: "item_l" }, "定位服务"),
          vue.createElementVNode("view", { class: "viewBtn" }, [
            vue.createElementVNode("text", null, "去设置"),
            vue.createElementVNode("image", {
              src: "/static/dingw_arrow.png",
              class: "arrow"
            })
          ])
        ])
      ]),
      vue.createCommentVNode(" layer "),
      $data.isShow ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "alert_box"
      }, [
        vue.createElementVNode("view", { class: "small_win" }, [
          vue.createElementVNode("view", { class: "alert_box_content" }, [
            vue.createElementVNode("image", {
              src: "/static/dingw_layer_bg.png",
              class: "alert_img"
            }),
            vue.createElementVNode("view", { class: "text-tit" }, "开启定位服务"),
            vue.createElementVNode("view", { class: "text-p" }, "为判断您的地区是否可提供相关服务，“麦芒”需要访问您的位置，点击“去设置”开启")
          ]),
          vue.createElementVNode("view", { class: "alert_box_btn" }, [
            vue.createElementVNode("button", {
              class: "cancel",
              onClick: _cache[1] || (_cache[1] = ($event) => $options.closeFn())
            }, "取消"),
            vue.createElementVNode("button", {
              class: "confim",
              onClick: _cache[2] || (_cache[2] = ($event) => $options.nextFn())
            }, "下一步")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" layer ")
    ]);
  }
  const PagesPrivacysettingsPrivacysettings = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/lj/haoxingj/haoxingj/pages/privacysettings/privacysettings.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        inputText: "",
        num: 0
      };
    },
    methods: {
      confim() {
        uni.setStorageSync("token", "");
        setTimeout(function() {
          uni.switchTab({
            url: "/pages/index/index"
          });
        }, 3e3);
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "tips" }, [
        vue.createElementVNode("image", {
          src: "/static/jingao.png",
          class: "icon"
        }),
        vue.createTextVNode("请确认注销的账号及影响")
      ]),
      vue.createElementVNode("view", { class: "list" }, [
        vue.createElementVNode("view", { class: "title" }, "即将注销的账号"),
        vue.createElementVNode("view", { class: "box" }, [
          vue.createElementVNode("view", { class: "user" }, [
            vue.createElementVNode("image", {
              src: "/static/car.png",
              class: "avatar"
            }),
            vue.createTextVNode("名称 ")
          ]),
          vue.createElementVNode("image", {
            src: "/static/zx_bg1.png",
            class: "bg1"
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "list" }, [
        vue.createElementVNode("view", { class: "title" }, "请注意，注销后你将"),
        vue.createElementVNode("view", { class: "box" }, [
          vue.createElementVNode("view", { class: "tips_list" }, [
            vue.createElementVNode("view", { class: "items" }, [
              vue.createElementVNode("image", {
                src: "/static/jingao.png",
                class: "icon"
              }),
              vue.createTextVNode("永久不可登录和使用账号 ")
            ]),
            vue.createElementVNode("view", { class: "items" }, [
              vue.createElementVNode("image", {
                src: "/static/jingao.png",
                class: "icon"
              }),
              vue.createTextVNode("身份、账号和申请信息将被清空 ")
            ]),
            vue.createElementVNode("view", { class: "items" }, [
              vue.createElementVNode("image", {
                src: "/static/jingao.png",
                class: "icon"
              }),
              vue.createTextVNode("不可享受app提供的相关服务 ")
            ])
          ]),
          vue.createElementVNode("image", {
            src: "/static/zx_bg2.png",
            class: "bg2"
          })
        ])
      ]),
      vue.createElementVNode("button", {
        class: "next_btn",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.confim && $options.confim(...args))
      }, "确定")
    ]);
  }
  const PagesLogoffLogoff = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/lj/haoxingj/haoxingj/pages/logoff/logoff.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/about/about", PagesAboutAbout);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/knowledgedetail/knowledgedetail", PagesKnowledgedetailKnowledgedetail);
  __definePage("pages/corporateloan/corporateloan", PagesCorporateloanCorporateloan);
  __definePage("pages/housingloan/housingloan", PagesHousingloanHousingloan);
  __definePage("pages/autoloan/autoloan", PagesAutoloanAutoloan);
  __definePage("pages/overdue/overdue", PagesOverdueOverdue);
  __definePage("pages/largeloan/largeloan", PagesLargeloanLargeloan);
  __definePage("pages/institutionlist/institutionlist", PagesInstitutionlistInstitutionlist);
  __definePage("pages/my/my", PagesMyMy);
  __definePage("pages/setting/setting", PagesSettingSetting);
  __definePage("pages/agreement/agreement", PagesAgreementAgreement);
  __definePage("pages/personalinfo/personalinfo", PagesPersonalinfoPersonalinfo);
  __definePage("pages/feedback/feedback", PagesFeedbackFeedback);
  __definePage("pages/webview/webview", PagesWebviewWebview);
  __definePage("pages/mate/mate", PagesMateMate);
  __definePage("pages/application/application", PagesApplicationApplication);
  __definePage("pages/privacysettings/privacysettings", PagesPrivacysettingsPrivacysettings);
  __definePage("pages/logoff/logoff", PagesLogoffLogoff);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/lj/haoxingj/haoxingj/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
