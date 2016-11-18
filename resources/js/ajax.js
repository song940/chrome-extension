/**
 * [Ajax description]
 * @param {[type]} options [description]
 */
function Ajax(options){
  if(!(this instanceof Ajax))
    return new Ajax(options);
  this.xhr = new XMLHttpRequest();
  return this;
};

/**
 * [READY_STATE description]
 * @type {Object}
 */
Ajax.READY_STATE = {
  UNSENT            : 0,
  OPENED            : 1,
  HEADERS_RECEIVED  : 2,
  LOADING           : 3,
  DONE              : 4
};

/**
 * [STATUS_CODE description]
 * @type {Object}
 */
Ajax.STATUS_CODE = {
  OK            : 200,
  REDIRECT      : 300,
  NOT_MODIFIED  : 304
};

Ajax.parse = function(xhr){
  var contentType = xhr.getResponseHeader('Content-Type').split('; ');
  var body;
  switch(xhr.responseType || contentType[0]){
    case 'application/json':
      body = JSON.parse(xhr.response);
      break;
    case 'text':
      body = xhr.responseText;
      break;
    case 'xml':
      body = xhr.responseXML;
      break;
    case 'html':
      body = document
        .createElement('iframe')
        .innerHTML = xhr.response;
      break;
    default:
      body = xhr.response;
      break;
  }
  return body;
};

/**
 * [function description]
 * @param  {[type]} name  [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
 Ajax.prototype.header = function(name, value){
   if(typeof value === 'undefined') {
    this.xhr.getResponseHeader(name);
  }else{
    this.xhr.setRequestHeader(name, value);
  }
  return this;
 };

 /**
  * [function description]
  * @param  {[type]} data [description]
  * @return {[type]}      [description]
  */
 Ajax.prototype.send = function(data){
   this.data = data;
   return this;
 };

/**
 * [function description]
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
Ajax.prototype.get = function(url){
  this.url = url;
  this.method = 'get';
  return this;
};

/**
 * [function description]
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
Ajax.prototype.post = function(url){
  this.url = url;
  this.method = 'post';
  return this;
};

/**
 * [function description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Ajax.prototype.end = function(callback){
  this.xhr.open(this.method, this.url, this.async);
  this.xhr.onreadystatechange = function () {
    if(this.readyState == Ajax.READY_STATE.DONE) {
      if(this.status   >= Ajax.STATUS_CODE.OK &&
        this.status    <  Ajax.STATUS_CODE.REDIRECT ||
        this.status    == Ajax.STATUS_CODE.NOT_MODIFIED) {
        return callback(null, Ajax.parse(this));
      }
      callback(this);
    }
  };
  this.xhr.send(this.data);
  return this;
};