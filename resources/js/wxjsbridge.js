;(function(){
  
  function WeixinJSBridge(){
    this.events = {};
    this.permissions_verify = {};
    this.permissions = {
      'menu:share:timeline'  : [ 'shareTimeline'  ],
      'menu:share:appmessage': [ 'sendAppMessage' ]
    };
  };

  
  WeixinJSBridge.prototype.init = function () {
    var event = document.createEvent('Event');
    event.initEvent('WeixinJSBridgeReady', true, true);
    document.dispatchEvent(event);
    return this;
  };
  /**
   * [verify description]
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   * https://mp.weixin.qq.com/debug/cgi-bin/webdebugger/preverify?newticket=Psn9lysBy6nEIhHByX2A1Rt7mYPWz1wCw56bn2QpILE
   https://open.weixin.qq.com/connect/qrconnect?appid=wxde40e023744664cb&redirect_uri=https%3a%2f%2fmp.weixin.qq.com%2fdebug%2fcgi-bin%2fwebdebugger%2fqrcode&scope=snsapi_login&state=login#wechat_redirect
   */
  WeixinJSBridge.prototype.preVerifyJSAPI = function (params, callback) {
    var self = this;
    // params.verifyJsApiList.push('pay');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(this.readyState == 4){
        var res = JSON.parse(this.response);
        if(res.verify_info_list){
          self.permissions_verify = {};
          res.verify_info_list.map(function(api){
            self.permissions_verify[ api.jsapi_name ] = !!api.state;
          });
          console.debug('[WeixinJSBridge] preVerifyJSAPI', self.permissions_verify);
          
          callback(self.permissions_verify);
        }else{
          console.error('[WeixinJSBridge] preVerifyJSAPI', res.baseresponse);
          callback(res.baseresponse);
        }
      }
    };
    xhr.open('post', 'https://mp.weixin.qq.com/debug/cgi-bin/webdebugger/preverify?newticket=BiIgQIAnE5urRANhbuHz33h2Z1hhjbxR7uohxmwo3fM');
    xhr.send(JSON.stringify({
      appid: params.verifyAppId,
      url: location.href,
      timestamp: params.verifyTimestamp,
      signature: params.verifySignature + 'x',
      signature_method: params.verifySignType || "sha1",
      jsapi_list: params.verifyJsApiList,
      noncestr: params.verifyNonceStr
    }));
    return !false;
  };
  
  WeixinJSBridge.prototype.invoke = function (method, params, callback) {
    var self = this;
    var permission = Object.keys(this.permissions).filter(function(key){
      return !!~self.permissions[ key ].indexOf(method);
    })[0];
    if(permission && !this.permissions_verify[permission]){
      return console.error('[WeixinJSBridge] invoke `%s` permission denied', method);
    }
    var fn = this[ method ];
    if(typeof fn === 'function'){
      try{
        return fn.call(this, params, callback);
      }catch(e){
        console.error('[WeixinJSBridge] invoke method: %s, error',method, e);
      }
    }else{
      console.error('[WeixinJSBridge] invoke method `%s` not found', method);
    }
  };
  
  WeixinJSBridge.prototype.on = function(ev, handler){
    console.debug('[WeixinJSBridge] registry event: %s', ev);
    (this.events[ ev ] = this.events[ ev ] || [] ).push(handler);
  };
  
  WeixinJSBridge.prototype.trigger = function(ev, params){
    this.events[ ev ].forEach(function(handler){
      handler.apply(handler, [].slice(arguments, 1));
    });
  };
  
  WeixinJSBridge.prototype.sendAppMessage = function(params){
    console.debug('[WeixinJSBridge] sendAppMessage', params);
  };
  
  WeixinJSBridge.prototype.shareTimeline = function(params){
    console.debug('[WeixinJSBridge] shareTimeline', params);
  };
  
  WeixinJSBridge.prototype.getNetworkType = function(){
    return 'wifi';
  };

  window.WeixinJSBridge = new WeixinJSBridge();
  window.WeixinJSBridge.init();
  
})(window);
