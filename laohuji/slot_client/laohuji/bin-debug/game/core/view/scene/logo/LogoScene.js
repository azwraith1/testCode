var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
 * @Author: Li MengChan
 * @Date: 2018-07-02 15:04:51
 * @Last Modified by: Li MengChan
 * @Last Modified time: 2018-11-23 17:10:21
 * @Description: 加载界面
 */
var game;
(function (game) {
    var LogoScene = (function (_super) {
        __extends(LogoScene, _super);
        function LogoScene() {
            var _this = _super.call(this) || this;
            _this.maxX = 167;
            _this.skinName = new LoginSceneSkin();
            return _this;
        }
        LogoScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            //连接服务器
            console.log("开始连接");
            //是否是pc
            this.resGroup = "proto_core";
            this.beganLoadResGroup();
        };
        /**
         * 开始加载资源
         */
        LogoScene.prototype.beganLoadResGroup = function () {
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.loadGroup(this.resGroup);
        };
        LogoScene.prototype.onResourceLoadComplete = function (e) {
            if (e.groupName == this.resGroup) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                this.onResourceLoadOver();
            }
        };
        /**
         * preload资源组加载进度
         * loading process of preload resource
         */
        LogoScene.prototype.onResourceProgress = function (e) {
            if (e.groupName == this.resGroup) {
                var rate = Math.floor(e.itemsLoaded / e.itemsTotal * 100);
                this.progressBar.scaleX = rate / 100;
            }
        };
        LogoScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        LogoScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        /**
         * 用户登录成功
         */
        LogoScene.prototype.userLoginSuc = function () {
            // AppFacade.getInstance().sendNotification(SceneNotify.OPEN_GAME);
            // AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_LOADING);
        };
        /**
       * 初始化
       */
        LogoScene.prototype.loginByToken = function () {
        };
        LogoScene.prototype.onResourceLoadOver = function () {
            this.websocket = new egret.WebSocket();
            this.websocket.connectByUrl("ws://192.168.2.6:6065/ws");
            this.websocket.type = egret.WebSocket.TYPE_BINARY;
            //添加收到数据侦听，收到数据会调用此方法
            this.websocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            //添加链接打开侦听，连接成功会调用此方法
            this.websocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
            this.websocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            //添加异常侦听，出现异常会调用此方法
            this.websocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            this.userLoginSuc();
            // SocketManager.instance.createSocket;
            // ws.flush();
            // await this.queryEntry();
            // await this.connect();
        };
        LogoScene.prototype.sendmessage = function () {
            var proto = RES.getRes("temp2_proto");
            console.log("proto" + proto);
            var message = dcodeIO.ProtoBuf.loadProto(proto);
            // console.log("message=" + message, "ProtocolMessage = " + message.build("game_protocol.ProtocolMessage"));
            // var user_login_class = message.build("game_protocol.ProtocolMessage");
            var user_login_class = message.build("game_protocol.EnterGame");
            console.log("user_login_class = " + user_login_class);
            // var user_login = new user_login_class({ nterGame: { user_id:119925, user_name: "2asdasdsd%##", theme_id: 1001, theme_name: "4jsjdh(())", language_type: 1 } });
            var user_login = new user_login_class({ user_id: 119925, user_name: "2asdasdsd%##", theme_id: 1001, theme_name: "4jsjdh(())", language_type: 1 });
            var buf = user_login.toArrayBuffer();
            console.log("buf = " + buf);
            var bytes = new egret.ByteArray(buf);
            console.log("bytes" + bytes);
            var len = bytes.length + 2;
            console.log(len);
            var byte = new egret.ByteArray();
            // byte.writeInt(len);
            // byte.writeInt(1951);
            byte.writeUTF(user_login);
            var bt = byte.bytes;
            console.log("bt = " + bt);
            var byte2 = new egret.ByteArray();
            for (var j = 0; j < bt.length; j++) {
                switch (j) {
                    case 8:
                        break;
                    case 9:
                        break;
                    default:
                        byte2.writeByte(bt[j]);
                        break;
                }
            }
            var bt2 = byte2.bytes;
            console.log("but = " + bt2);
            console.log("byte = " + byte2);
            // SocketManager.instance.send2Server(byte);
            // this.websocket.writeBytes(byte, 2, byte.bytesAvailable);
            this.websocket.writeUTF(user_login);
            this.websocket.flush();
        };
        LogoScene.prototype.onSocketOpen = function () {
            console.log("打开连接");
            this.test_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendmessage, this);
        };
        LogoScene.prototype.onSocketClose = function () {
            console.log("onSocketClose");
        };
        LogoScene.prototype.onSocketError = function () {
            console.log("onSocketError");
        };
        LogoScene.prototype.onReceiveMessage = function (e) {
            var byte = new egret.ByteArray();
            //读取数据
            var data = this.websocket.readBytes(byte);
            var str = byte.readUTF();
            var jsonData;
            console.log("data=" + str);
            console.log("data=" + data);
            if (str) {
                // jsonData = JSON.parse(data);
            }
            if (!jsonData) {
                return;
            }
        };
        return LogoScene;
    }(game.BaseComponent));
    game.LogoScene = LogoScene;
    __reflect(LogoScene.prototype, "game.LogoScene");
})(game || (game = {}));
//# sourceMappingURL=LogoScene.js.map