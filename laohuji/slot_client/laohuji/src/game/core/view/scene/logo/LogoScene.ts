/*
 * @Author: Li MengChan 
 * @Date: 2018-07-02 15:04:51 
 * @Last Modified by: Li MengChan
 * @Last Modified time: 2018-11-23 17:10:21
 * @Description: 加载界面
 */
module game {
    export class LogoScene extends BaseComponent {
        private tipLabel: eui.Label;
        private progressBar: eui.Image;
        private maxX: number = 167;
        private websocket: egret.WebSocket;
        private test_btn: eui.Button;
        public constructor() {
            super();
            this.skinName = new LoginSceneSkin();
        }

        public createChildren() {
            super.createChildren();

            //连接服务器
            console.log("开始连接");
            //是否是pc
            this.resGroup = "proto_core";
            this.beganLoadResGroup()
        }

        /**
         * 开始加载资源
         */
        private beganLoadResGroup() {
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.loadGroup(this.resGroup);
        }

        private onResourceLoadComplete(e: RES.ResourceEvent): void {
            if (e.groupName == this.resGroup) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                this.onResourceLoadOver();
            }
        }

        /**
         * preload资源组加载进度
         * loading process of preload resource
         */
        private onResourceProgress(e: RES.ResourceEvent): void {
            if (e.groupName == this.resGroup) {
                var rate = Math.floor(e.itemsLoaded / e.itemsTotal * 100);
                this.progressBar.scaleX = rate / 100;
            }
        }


        public onAdded() {
            super.onAdded();
        }

        public onRemoved() {
            super.onRemoved();
        }

        /**
         * 用户登录成功
         */
        public userLoginSuc() {
            // AppFacade.getInstance().sendNotification(SceneNotify.OPEN_GAME);
            // AppFacade.getInstance().sendNotification(SceneNotify.CLOSE_LOADING);
        }


        /**
       * 初始化
       */
        public loginByToken() {

        }

        public onResourceLoadOver() {
            
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
        }

        private sendmessage(){
            let proto = RES.getRes("temp2_proto");
            console.log("proto" + proto, );
            var message = dcodeIO.ProtoBuf.loadProto(proto);
            // console.log("message=" + message, "ProtocolMessage = " + message.build("game_protocol.ProtocolMessage"));
            // var user_login_class = message.build("game_protocol.ProtocolMessage");
            var user_login_class = message.build("game_protocol.EnterGame");
            console.log("user_login_class = " + user_login_class);
            // var user_login = new user_login_class({ nterGame: { user_id:119925, user_name: "2asdasdsd%##", theme_id: 1001, theme_name: "4jsjdh(())", language_type: 1 } });
            var user_login = new user_login_class({ user_id:119925, user_name: "2asdasdsd%##", theme_id: 1001, theme_name: "4jsjdh(())", language_type: 1  });
            let buf = user_login.toArrayBuffer();
            console.log("buf = " + buf);
            var bytes = new egret.ByteArray(buf);
            console.log("bytes" + bytes);
            let len = bytes.length +2;
            console.log(len);
            var byte: egret.ByteArray = new egret.ByteArray();
            // byte.writeInt(len);
            // byte.writeInt(1951);
            byte.writeUTF(user_login);
            let bt  = byte.bytes;
            console.log("bt = " + bt);
            var byte2: egret.ByteArray = new egret.ByteArray();
           for(let j = 0;j<bt.length;j++){
               switch(j){
                   case 8:
                   break;
                   case 9:
                   break;
                   default:
                   byte2.writeByte(bt[j]);
                   break;
               }
            }
            let bt2  = byte2.bytes;
            console.log("but = " + bt2);
            console.log("byte = " + byte2);
            // SocketManager.instance.send2Server(byte);
            // this.websocket.writeBytes(byte, 2, byte.bytesAvailable);
            this.websocket.writeUTF(user_login);
            this.websocket.flush();
        }

        public onSocketOpen() {
            console.log("打开连接")
            this.test_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.sendmessage,this);
        }

        public onSocketClose() {
            console.log("onSocketClose")
        }

        public onSocketError() {
            console.log("onSocketError")
        }

        public onReceiveMessage(e) {

            var byte:egret.ByteArray = new egret.ByteArray();
        //读取数据
            let data = this.websocket.readBytes(byte);
            let str = byte.readUTF();
            var jsonData;
            console.log("data=" + str);
            console.log("data=" + data);
            if (str) {
                // jsonData = JSON.parse(data);
            }
            if (!jsonData) {
                return;
            }
        }


        /**
         * 服务器获取授权
         * @param  {} data
         */
        // public async auth(data) {
        //     let resp: any = await Global.netProxy.sendRequestAsync(ServerConfig.PATH_CONFIG.http_header + ServerConfig.PATH_CONFIG.http_server + ":" + ServerConfig.PATH_CONFIG.http_port + "/gate/clientApi/auth", data);
        //     return new Promise((resolve, reject) => {
        //         if (resp.error) {
        //             console.log('auth err=' + JSON.stringify(resp.error));
        //             console.log(resp.error);
        //             reject();
        //         } else {
        //             console.log("auth1");
        //             console.log(resp.data);
        //             Global.playerProxy.playerData = resp.data;
        //             resolve();
        //         }
        //     })
        // }


        /**
         * 获取socket服务器地址列表
         */
        // public async queryEntry() {
        //     var req = { token: Global.playerProxy.playerData.token }
        //     console.log(req);
        //     let resp: any = await Global.netProxy.sendRequestAsync(ServerConfig.PATH_CONFIG.http_header + ServerConfig.PATH_CONFIG.http_server + ":" + ServerConfig.PATH_CONFIG.http_port + "/gate/clientApi/queryEntry", req);
        //     return new Promise((resolve, reject) => {
        //         if (resp.error) {
        //             console.log('queryEntry err=' + JSON.stringify(resp.error));
        //             reject();
        //         } else {
        //             Global.gameProxy.connectorInfo = resp.data;
        //             resolve();
        //         }
        //     })
        // }



        /**
         * 使用token登陆
         */
        // public async connect() {
        //     try {
        //         //先握手
        //         await PomeloManager.instance.initServer(Global.gameProxy.connectorInfo.host, Global.gameProxy.connectorInfo.port);
        //         let resp: any = await PomeloManager.instance.request('connector.entryHandler.c_connect', {
        //             token: Global.playerProxy.playerData.token,
        //         });
        //         //登陆成功
        //         if (resp.error.code == 0) {
        //             // PomeloManager.instance.state = true;
        //             this.userLoginSuc();
        //         }
        //     } catch (err) {
        //         // PomeloManager.instance.state = false;
        //         egret.setTimeout(this.connect, this, 10000);
        //     }
        // }

        // }
    }

}
