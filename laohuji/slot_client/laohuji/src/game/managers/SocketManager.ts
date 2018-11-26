/**
 * 网络公共类
 * by dily
 * (c) copyright 2014 - 2035
 * All Rights Reserved. 
 * 存放网络公共方法 
 * 注意：是同步请求，不是异步
 */
module game {
    export class SocketManager {
        private socket: egret.WebSocket;
        // "ws://192.168.2.18:6065";
        private socketPath: string = "ws://192.168.2.18:6065/ws";
        private isRunning: boolean = true;
        private callbackList: HashMap<number, Function> = new HashMap<number, Function>();
        private static _instance: SocketManager;
        private sequene: number = 1;
        public constructor() {
            if (SocketManager._instance) {
                throw new Error("DateTimer使用单例");
            }
            console.log(1);
            this.createSocket();
        }

        public static get instance(): SocketManager {
            if (!SocketManager._instance) {
                SocketManager._instance = new SocketManager();
            }
            return SocketManager._instance;
        }


        public createSocket() {
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
        }

      

        public send2Server(data){
            console.log("发送ws： " + JSON.stringify(data));
            this.socket.writeBytes(data);
        }

        public send2ServerAndCall(data, callback: Function){
            console.log("发送ws： " + JSON.stringify(data));
            if(callback){
                data.sequene = this.sequene;
                this.callbackList.set(this.sequene, callback);
                this.sequene ++;
                if(this.sequene > 100){
                    this.sequene = 0;
                }
            }
            this.socket.writeBytes(data);
        }

        // public sendMessage(data) {
        //     data.type = "sendMessage";
        //     this.socket.writeUTF(JSON.stringify(data));
        // }

        public onSocketOpen() {
            console.log("打开连接")

        }

        public onSocketClose() {
            console.log("onSocketClose")
        }

        public onSocketError() {
            console.log("onSocketError")
        }

        public onReceiveMessage(e) {
            var data = this.socket.readUTF();
            var jsonData;
            if (data) {
                jsonData = JSON.parse(data);
            }
            if (!jsonData) {
                return;
            }
            //服务器推送
            if(jsonData.type){
                console.log("收到推送; " + JSON.stringify(jsonData));
                AppFacade.getInstance().sendNotification(jsonData.type, jsonData.data);
                return;
            }
            console.log("收到回调; " + JSON.stringify(jsonData));
            if(jsonData.sequene){
                var callback: Function = this.callbackList.get(jsonData.sequene);
                if (callback) {
                    callback(jsonData);
                    this.callbackList.remove(jsonData.sequene);
                }
                return;
            }
        }
    }
}



