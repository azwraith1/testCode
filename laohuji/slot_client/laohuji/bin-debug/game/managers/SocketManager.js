var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 网络公共类
 * by dily
 * (c) copyright 2014 - 2035
 * All Rights Reserved.
 * 存放网络公共方法
 * 注意：是同步请求，不是异步
 */
var game;
(function (game) {
    var SocketManager = (function () {
        function SocketManager() {
            // "ws://192.168.2.18:6065";
            this.socketPath = "ws://192.168.2.18:6065/ws";
            this.isRunning = true;
            this.callbackList = new HashMap();
            this.sequene = 1;
            if (SocketManager._instance) {
                throw new Error("DateTimer使用单例");
            }
            console.log(1);
            this.createSocket();
        }
        Object.defineProperty(SocketManager, "instance", {
            get: function () {
                if (!SocketManager._instance) {
                    SocketManager._instance = new SocketManager();
                }
                return SocketManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        SocketManager.prototype.createSocket = function () {
            this.socket = new egret.WebSocket();
            //设置数据格式为二进制，默认为字符串
            this.socket.type = egret.WebSocket.TYPE_BINARY;
            //添加收到数据侦听，收到数据会调用此方法
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            //添加链接打开侦听，连接成功会调用此方法
            this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
            this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            //添加异常侦听，出现异常会调用此方法
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            //连接服务器
            console.log("开始连接");
            this.socket.connectByUrl(this.socketPath);
        };
        SocketManager.prototype.send2Server = function (data) {
            console.log("发送ws： " + JSON.stringify(data));
            this.socket.writeBytes(data);
        };
        SocketManager.prototype.send2ServerAndCall = function (data, callback) {
            console.log("发送ws： " + JSON.stringify(data));
            if (callback) {
                data.sequene = this.sequene;
                this.callbackList.set(this.sequene, callback);
                this.sequene++;
                if (this.sequene > 100) {
                    this.sequene = 0;
                }
            }
            this.socket.writeBytes(data);
        };
        // public sendMessage(data) {
        //     data.type = "sendMessage";
        //     this.socket.writeUTF(JSON.stringify(data));
        // }
        SocketManager.prototype.onSocketOpen = function () {
            console.log("打开连接");
        };
        SocketManager.prototype.onSocketClose = function () {
            console.log("onSocketClose");
        };
        SocketManager.prototype.onSocketError = function () {
            console.log("onSocketError");
        };
        SocketManager.prototype.onReceiveMessage = function (e) {
            var data = this.socket.readUTF();
            var jsonData;
            if (data) {
                jsonData = JSON.parse(data);
            }
            if (!jsonData) {
                return;
            }
            //服务器推送
            if (jsonData.type) {
                console.log("收到推送; " + JSON.stringify(jsonData));
                game.AppFacade.getInstance().sendNotification(jsonData.type, jsonData.data);
                return;
            }
            console.log("收到回调; " + JSON.stringify(jsonData));
            if (jsonData.sequene) {
                var callback = this.callbackList.get(jsonData.sequene);
                if (callback) {
                    callback(jsonData);
                    this.callbackList.remove(jsonData.sequene);
                }
                return;
            }
        };
        return SocketManager;
    }());
    game.SocketManager = SocketManager;
    __reflect(SocketManager.prototype, "game.SocketManager");
})(game || (game = {}));
//# sourceMappingURL=SocketManager.js.map