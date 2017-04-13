// pages/main/main.js
var app = getApp();
Page({
  data: {
    list: [],
    kind: 'jobhot',
    keyword: '',
  },
  getInfo: function(urltext, pastData = {}) {
    var _this = this;
    wx.showToast({
      title: 'loading',
      icon: 'loading',
      duration: 10000
    });
    app.getAjaxData({
      url: urltext,
      data: pastData,
      success: function(res) {
        // success
        var list = res.data.info;
          // select unique corperation
          var hash = {};
          var filted = [];
          var temp = {
            'company': '',
            'number': 0,
            'positions': []
          };
          var ii = 0;
          list.forEach((v, i) => {
            if (hash.hasOwnProperty(v.company)) {
              hash[v.company].number += v.number;
              hash[v.company].positions.push(v.position.slice(0,5));

            } else {
              hash[v.company] = {
                'company': v.company,
                'number': v.number,
                'positions': [v.position.slice(0,5)]
              }
            }
          });
          filted = Object.keys(hash).map(key => hash[key]);

          filted.sort((a, b)=>{
            return b.number - a.number;
          });
          _this.setData({
            list: filted,
            corpMode: true
          });
      },
      fail: function(res) {
        // fail
        wx.showToast({
          title: 'failed',
          icon: 'success',
          duration: 10000
        });
      },
      complete: function(res) {
        // complete
        wx.hideToast();
      }
    });
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getInfo([app.globalData.domain, 'webapi', this.data.kind, ''].join('/'));
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  tapAbout: function() {
    wx.navigateTo({
      url: '../about/about'
    });
  }
});
