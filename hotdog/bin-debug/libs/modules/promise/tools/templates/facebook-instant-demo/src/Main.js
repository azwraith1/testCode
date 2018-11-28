//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        var _this = this;
        //初始化Facebook SDK，在回调方法里获取相关信息
        egretfb.EgretFBInstant.initializeAsync().then(function () {
            egret.log("player.getID", egretfb.EgretFBInstant.player.getID());
            try {
                egretfb.EgretFBInstant.player.getSignedPlayerInfoAsync('egret').then(function (result) {
                    try {
                        egret.log('result.playerID', result.getPlayerID());
                        egret.log('result.getSignature.length', result.getSignature().length);
                    }
                    catch (err) {
                        egret.log('SignedPlayerInfoAsync.err2', err);
                    }
                });
            }
            catch (err) {
                egret.log('SignedPlayerInfoAsync.err1', err);
            }
            egret.log("player.getID", egretfb.EgretFBInstant.player.getID());
            egret.log("player.getName", egretfb.EgretFBInstant.player.getName());
            egret.log("player.getPhoto.length", egretfb.EgretFBInstant.player.getPhoto().length);
            egret.log("getLocale:", egretfb.EgretFBInstant.getLocale());
            egret.log("getPlatform:", egretfb.EgretFBInstant.getPlatform());
            egret.log("getSDKVersion", egretfb.EgretFBInstant.getSDKVersion());
            egret.log("num getSupportedAPIs", egretfb.EgretFBInstant.getSupportedAPIs().length);
            egret.log('getEntryPointData', egretfb.EgretFBInstant.getEntryPointData());
        });
        this.createScence();
        setTimeout(function () {
            egretfb.EgretFBInstant.setLoadingProgress(100);
            egretfb.EgretFBInstant.startGameAsync().then(function () {
                _this.showScence();
            });
        }, 1000);
    };
    Main.prototype.createScence = function () {
        Main._that = this;
        Context.init(this.stage);
        Main.menu = new Menu("Egret Facebook SDK Test");
        this.addChild(Main.menu);
        Main.menu.addTestFunc("context", this.contextInfo, this);
        Main.menu.addTestFunc("setDataAsync", this.setDataAsync, this);
        Main.menu.addTestFunc("getDataAsync", this.getDataAsync, this);
        Main.menu.addTestFunc("flushDataAsync", this.flushDataAsync, this);
        Main.menu.addTestFunc("setStatsAsync", this.setStatsAsync, this);
        Main.menu.addTestFunc("getStatsAsync", this.getStatsAsync, this);
        Main.menu.addTestFunc("incrementStatsAsync", this.incrementStatsAsync, this);
        Main.menu.addTestFunc("getInterstitialAdAsync", this.getInterstitialAdAsync, this);
        Main.menu.addTestFunc("显示视频广告", this.playRewardedVideo, this);
        Main.menu.addTestFunc("getConnectedPlayersAsync", this.getConnectedPlayersAsync, this);
        Main.menu.addTestFunc("switchAsync", this.switchAsync, this);
        Main.menu.addTestFunc("chooseAsync", this.chooseAsync, this);
        Main.menu.addTestFunc("createAsync", this.createAsync, this);
        Main.menu.addTestFunc("getPlayersAsync", this.getPlayersAsync, this);
        Main.menu.addTestFunc("setSessionData", this.setSessionData, this);
        Main.menu.addTestFunc("shareAsync", this.shareAsync, this);
        Main.menu.addTestFunc("updateAsync", this.updateAsync, this);
        Main.menu.addTestFunc("logEvent", this.logEvent, this);
        Main.menu.addTestFunc("quit", this.quit, this);
    };
    Main.backMenu = function () {
        Main._that.removeChildren();
        Main._that.addChild(Main.menu);
    };
    Main.prototype.showScence = function () {
        egret.log('showScence');
        this.loadRewardedVideo();
        egretfb.EgretFBInstant.onPause(function () {
            egret.log('onPause');
        });
    };
    Main.prototype.loadRewardedVideo = function () {
        var _this = this;
        egretfb.EgretFBInstant.getRewardedVideoAsync('380072779038584_503394323373095')
            .then(function (rewardedVideo) {
            _this.rewardedVideo = rewardedVideo;
            egret.log('开始加载视频广告，翻墙网络慢,请稍等..', JSON.stringify(rewardedVideo));
            return _this.rewardedVideo.loadAsync();
        }).then(function () {
            egret.log('视频广告加载结束,可以播放 ');
        }, function (err) {
            egret.log('视频广告加载错误', JSON.stringify(err));
        });
    };
    Main.prototype.playRewardedVideo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rewardedVideo.showAsync()];
                    case 1:
                        _a.sent();
                        this.loadRewardedVideo();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.contextInfo = function () {
        egret.log('context.getID', egretfb.EgretFBInstant.context.getID());
        egret.log('context.getType', egretfb.EgretFBInstant.context.getType());
        egret.log('context.isSizeBetween0-10', JSON.stringify(egretfb.EgretFBInstant.context.isSizeBetween(0, 10)));
    };
    Main.prototype.setDataAsync = function () {
        var saveData = { score: 123, value: Math.floor(Math.random() * 100) };
        egretfb.EgretFBInstant.player.setDataAsync(saveData).then(function () {
            egret.log('data is set');
        });
        egret.log('setDataAsync', JSON.stringify(saveData));
    };
    Main.prototype.getDataAsync = function () {
        egretfb.EgretFBInstant.player.getDataAsync(['score', 'value']).then(function (data) {
            egret.log('getDataAsync', data['score'], data['value']);
        });
    };
    Main.prototype.flushDataAsync = function () {
        var saveData = { score: 778, value: Math.floor(Math.random() * 100) };
        egret.log('flushDataAsync', JSON.stringify(saveData));
        egretfb.EgretFBInstant.player.setDataAsync(saveData)
            .then(egretfb.EgretFBInstant.player.flushDataAsync)
            .then(function () {
            egret.log('flushDataAsync succ');
        });
    };
    Main.prototype.setStatsAsync = function () {
        var saveState = { level: 68, money: Math.floor(Math.random() * 100) };
        egretfb.EgretFBInstant.player
            .setStatsAsync(saveState)
            .then(function () {
            egret.log('data is set');
        });
    };
    Main.prototype.getStatsAsync = function () {
        egretfb.EgretFBInstant.player
            .getStatsAsync(['level', 'money'])
            .then(function (stats) {
            egret.log('getStatsAsync', JSON.stringify(stats));
        });
    };
    Main.prototype.incrementStatsAsync = function () {
        var saveState = { level: 15, money: 1276, life: 9 };
        egretfb.EgretFBInstant.player
            .incrementStatsAsync(saveState)
            .then(function (stats) {
            egret.log('incrementStatsAsync', JSON.stringify(stats));
        });
    };
    Main.prototype.getInterstitialAdAsync = function () {
        var ad = null;
        egretfb.EgretFBInstant.getInterstitialAdAsync('380072779038584_502979883414539')
            .then(function (interstitial) {
            ad = interstitial;
            egret.log('interstitial', JSON.stringify(interstitial));
            egret.log('getPlacementID', ad.getPlacementID());
            return ad.loadAsync();
        }).then(function () {
            egret.log('ad loaded');
            // return ad.showAsync();
        }, function (err) {
            egret.log('err', JSON.stringify(err));
        }).then(function () {
            egret.log('watch ad');
        });
    };
    Main.prototype.getConnectedPlayersAsync = function () {
        egretfb.EgretFBInstant.player.getConnectedPlayersAsync().then(function (players) {
            egret.log('getConnectedPlayersAsync.length', players.length);
            players.map(function (player) {
                egret.log('id', player.getID());
                egret.log('name', player.getName());
            });
        });
    };
    Main.prototype.switchAsync = function () {
        egret.log('context.id now:', egretfb.EgretFBInstant.context.getID());
        egretfb.EgretFBInstant.context.switchAsync('12345678').then(function () {
            egret.log('context.id switch:', egretfb.EgretFBInstant.context.getID());
        }, function (err) {
            egret.log('switchAsync error', JSON.stringify(err));
        });
    };
    Main.prototype.chooseAsync = function () {
        egret.log('context.id now:', egretfb.EgretFBInstant.context.getID());
        egretfb.EgretFBInstant.context.chooseAsync().then(function () {
            egret.log('context.id chooseAsync:', egretfb.EgretFBInstant.context.getID());
        }, function (err) {
            egret.log('chooseAsync error', JSON.stringify(err));
        });
    };
    Main.prototype.createAsync = function () {
        egretfb.EgretFBInstant.context.createAsync('123456').then(function () {
            egret.log('context.id chooseAsync:', egretfb.EgretFBInstant.context.getID());
        }, function (err) {
            egret.log('chooseAsync error', JSON.stringify(err));
        });
    };
    Main.prototype.getPlayersAsync = function () {
        egretfb.EgretFBInstant.context.getPlayersAsync().then(function (players) {
            egret.log('getPlayersAsync:', JSON.stringify(players));
        }, function (err) {
            egret.log('getPlayersAsync error', JSON.stringify(err));
        });
    };
    Main.prototype.setSessionData = function () {
        egretfb.EgretFBInstant.setSessionData({ coinsEarned: 10, eventsSeen: ['start', 'zhangyu'] });
    };
    Main.prototype.shareAsync = function () {
        var shareObj = { intent: 'REQUEST', image: '', text: 'zhangyu is asking for your help!', data: { myReplayData: '...' } };
        egretfb.EgretFBInstant.shareAsync(shareObj).then(function () {
            egret.log('share end! continue game');
        });
    };
    Main.prototype.updateAsync = function () {
        egretfb.EgretFBInstant.updateAsync({
            action: 'CUSTOM',
            cta: 'Join The Fight',
            template: 'join_fight',
            image: '',
            text: 'zhangyu just invaded Y\'s village!',
            data: { myReplayData: 'good' },
            strategy: 'IMMEDIATE',
            notification: 'NO_PUSH',
        }).then(function () {
            //当消息发送后，关闭游戏
            egretfb.EgretFBInstant.quit();
        });
    };
    Main.prototype.logEvent = function () {
        var logged = egretfb.EgretFBInstant.logEvent('my_custom_event', 42, { custom_property: 'custom_value' });
        egret.log('logEvent', logged);
    };
    Main.prototype.quit = function () {
        egretfb.EgretFBInstant.quit();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map