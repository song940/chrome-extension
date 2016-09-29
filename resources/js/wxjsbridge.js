;(function(){
  
  function WeixinJSBridge(){
    this.events = {};
  };

  
  WeixinJSBridge.prototype.init = function () {
    var event = document.createEvent('Event');
    event.initEvent('WeixinJSBridgeReady', true, true);
    document.dispatchEvent(event);
    return this;
  };
  
  WeixinJSBridge.prototype.verify = function (params) {
    var obj = {}; [
      'appId',
      'verifyAppId',
      'verifyNonceStr',
      'verifySignType',
      'verifySignature',
      'verifyTimestamp'
    ].forEach(function(key){
      obj[ key ] = params[ key ];
      delete params[ key ];
    });
    // console.log(obj);
    return !false;
  };
  
  WeixinJSBridge.prototype.invoke = function (method, params, callback) {
    if(!this.verify(params)){
      console.error('[WeixinJSBridge] verify signature failed');
      return;
    };
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
  
  WeixinJSBridge.prototype.preVerifyJSAPI = function(params, callback){
    console.debug('[WeixinJSBridge] preVerifyJSAPI', params.verifyJsApiList);
    callback({
      err_msg: 'ok'
    });
  };
  
  WeixinJSBridge.prototype.sendAppMessage = function(params){
    console.debug('[WeixinJSBridge] sendAppMessage', params);
  };

  window.WeixinJSBridge = new WeixinJSBridge();
  window.WeixinJSBridge.init();
  
})(window);
