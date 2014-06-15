// Copyright 2012-2014 (c) Peter Širka <petersirka@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var events=require("events");var SUGAR="XY1";var USERAGENT=11;var stats_read=0;var stats_write=0;var VERSION="2.0";function Session(){this.options={cookie:"__ssid",secret:"N84",timeout:5};this.onRead=function(id,fnCallback){fnCallback(framework.cache.read(id))};this.onWrite=function(id,value){var self=this;framework.cache.add(id,value,(new Date).add("minute",self.options.timeout));return self}}Session.prototype=new events.EventEmitter;Session.prototype._read=function(res,req,next,controller){var self=this;var id=req.cookie(self.options.cookie)||"";if(id.length===0){self._create(res,req,next,controller);return self}var obj=self.framework.decrypt(id,self.options.secret);if(obj===null){self._create(res,req,next,controller);return self}if("ssid_"+obj.sign!==self._signature(obj.id,req)){self._create(res,req,next,controller);return self}req._sessionId=obj.id;req._session=self;stats_read++;self.onRead(obj.id,function(session){self.emit("read",req._sessionId,session);req.session=session||{};controller.session=req.session;next()});return self};Session.prototype._signature=function(id,req){return id+"|"+req.ip.replace(/\./g,"")+"|"+req.headers["user-agent"].substring(0,USERAGENT).replace(/\s|\./g,"")};Session.prototype._create=function(res,req,next){var self=this;var id=utils.GUID(10);var obj={id:"ssid_"+id,sign:self._signature(id,req)};var json=self.framework.encrypt(obj,self.options.secret);req._sessionId=obj.id;req._session=self;req.session={};res.cookie(self.options.cookie,json);next();return self};Session.prototype._write=function(id,obj){var self=this;stats_write++;self.emit("write",id,obj);if(self.onWrite!==null)self.onWrite(id,obj);return self};module.exports=new Session;module.exports.version=VERSION;module.exports.usage=function(){return{read:stats_read,write:stats_write}};module.exports.install=function(framework){var self=this;SUGAR=(framework.config.name+framework.config.version+SUGAR).replace(/\s/g,"");self.framework=framework;self.framework.on("request",function(req,res){res.once("finish",function(){self.framework.module("session")._write(req._sessionId,req.session)})});self.framework.middleware(function(next){var self=this;self.framework.module("session")._read(self.res,self.req,next,self)})};