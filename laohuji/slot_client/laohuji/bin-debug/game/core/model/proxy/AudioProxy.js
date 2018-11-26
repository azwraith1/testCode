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
 * @Date: 2018-06-25 14:25:57
 * @Last Modified by:   Li MengChan
 * @Last Modified time: 2018-06-25 14:25:57
 * @Description: 音频管理模块
 */
var game;
(function (game) {
    var AudioProxy = (function (_super) {
        __extends(AudioProxy, _super);
        function AudioProxy() {
            return _super.call(this, AudioProxy.NAME) || this;
        }
        AudioProxy.prototype.initMusic = function () {
            if (this.backgroundSound) {
                this.backgroundSound.close();
                this.backgroundSound = null;
            }
            this.backgroundSound = RES.getRes("background_mp3");
            if (this.backgroundSound) {
                this.backgroundSound.play(0, -1);
            }
        };
        AudioProxy.prototype.init = function () {
            Global.audioProxy = this;
            // var number: string = egret.localStorage.getItem(GameConfig.GAME_ID + '.sound');
            // this.isOpen = number && number === '0' ? false : true;
        };
        AudioProxy.prototype.closeBgMusic = function () {
            if (!this.isOpen) {
                return;
            }
            if (this.channel) {
                this.channel.stop();
                this.backgroundSound = null;
                //                this.channel = null;
            }
        };
        AudioProxy.prototype.setVolice = function (vol) {
            if (this.moveChannel) {
                this.moveChannel.volume = vol;
            }
        };
        AudioProxy.prototype.startBgMusic = function () {
            if (!this.isOpen) {
                return;
            }
            if (!this.backgroundSound) {
                this.backgroundSound = RES.getRes("background_mp3");
                if (this.channel) {
                    this.channel.stop();
                    this.channel = null;
                }
                this.channel = this.backgroundSound.play(0, -1);
            }
        };
        AudioProxy.prototype.openSound = function (isOpen) {
            egret.localStorage.setItem("test" + '.sound', isOpen ? '1' : '0');
            if (isOpen) {
                window['audioAutoPlay']("background");
            }
            else {
                window['stopAudio']("background");
            }
        };
        /**
         * 播放音效
         * resourceName： 文件名称
         */
        AudioProxy.prototype.playSound = function (resourceName) {
            if (this.isOpen) {
                var sound = RES.getRes(resourceName);
                if (sound) {
                    sound.play(0, 1);
                }
            }
        };
        /**
         * 播放音效
         * resourceName： 文件名称
         */
        AudioProxy.prototype.playSoundCount = function (resourceName, count, voilce) {
            if (voilce === void 0) { voilce = 1; }
            if (this.isOpen) {
                var sound = RES.getRes(resourceName);
                //                this.moveChannel = sound.play(0, 0);
                this.moveChannel = sound.play(0, count);
                this.moveChannel.volume = voilce;
            }
        };
        AudioProxy.NAME = "AudioProxy";
        return AudioProxy;
    }(puremvc.Proxy));
    game.AudioProxy = AudioProxy;
    __reflect(AudioProxy.prototype, "game.AudioProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=AudioProxy.js.map