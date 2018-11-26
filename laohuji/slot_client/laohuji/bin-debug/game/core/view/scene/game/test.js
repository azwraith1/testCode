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
var game;
(function (game) {
    var test = (function (_super) {
        __extends(test, _super);
        function test() {
            var _this = _super.call(this) || this;
            _this.bet = 1;
            _this.freeTimes = 6;
            _this.atr_top = [];
            _this.atr_bottom = [[3, 3, 3, 3, 3], [2, 3, 3, 3, 3], [2, 3, 3, 2, 3]];
            _this.isWalt = false;
            _this.isScalt = false;
            _this.break = false;
            _this.skinName = new testSkin();
            return _this;
        }
        test.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        test.prototype.childrenCreated = function () {
            this.connectSuc();
            _super.prototype.childrenCreated.call(this);
            this.bet = 1;
            this.totoal_bet.text = "" + this.bet;
            this.run_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);
            this.add_bet_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addBet, this);
            this.reduce_bet_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reduceBet, this);
            this.mune_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTopMune, this);
            this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTopMune, this);
            this.tips_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTipsPanel, this);
        };
        //展示与中奖数据
        test.prototype.connectSuc = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = {
                                user_id: Global.playerProxy.playerData.user_id,
                            };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_roomHandler_c_queryRoomInfo, data)];
                        case 1:
                            resp = _a.sent();
                            if (resp) {
                                if (resp.error && resp.error.code != 0) {
                                    return [2 /*return*/];
                                }
                                this.atr_top = [3, 2, 1, 3, 4, 5, 2, 3, 5, 6, 5, 5, 6, 2, 1];
                                this.atr_bottom = [[3, 3, 3, 3, 3], [2, 3, 3, 3, 3], [2, 3, 3, 2, 3]];
                            }
                            this.atr_top = [3, 2, 1, 3, 4, 5, 2, 3, 5, 6, 5, 5, 6, 2, 1];
                            this.atr_bottom = [[3, 3, 3, 3, 3], [2, 3, 3, 3, 3], [2, 3, 3, 2, 3]];
                            this.createRoundGroup();
                            return [2 /*return*/];
                    }
                });
            });
        };
        //打开提示面板
        test.prototype.showTipsPanel = function () {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_TIPS);
        };
        // public onAdaptive() { }
        //按键处理
        test.prototype.touchHandle = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = {
                                bet: this.bet
                            };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, data)];
                        case 1:
                            resp = _a.sent();
                            if (resp) {
                                if (resp.error && resp.error.code != 0) {
                                    return [2 /*return*/];
                                }
                            }
                            // return new Promise((resolve,reject)=>{
                            //     if(resp.error){
                            //         console.log("startGame Error" + JSON.stringify(resp.error));
                            //         reject();
                            //     }else{
                            //         resolve();
                            //         this.atr_top = resp.str;
                            //     }
                            // })
                            this.break = true;
                            if (this.isWalt) {
                                this.uncommonRound();
                            }
                            else {
                                if (this.isScalt && this.freeTimes > 0) {
                                    this.peach_group.y = -720;
                                    this.peach_group.visible = true;
                                    this.bg_02.alpha = 1;
                                    this.tree_bg.alpha = 1;
                                    this.bottom_cloud.x = 0;
                                    this.mune_btn.visible = false;
                                    this.gold_group.visible = false;
                                    this.top_btn_group.visible = false;
                                    this.bang_0.visible = this.bang_6.visible = this.bang_7.visible = this.bang_8.visible = true;
                                    egret.Tween.get(this).to({ y: 720 }, 2100).call(function () {
                                        _this.freeRound();
                                        //  this.isScalt = false
                                    });
                                }
                                else {
                                    this.commonRound();
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        //创建免费游戏资源组
        test.prototype.freeRound = function () {
            var _this = this;
            egret.Tween.get(this.peach_1)
                .to({ x: 100 }, 200)
                .to({ x: 140 }, 200);
            egret.Tween.get(this.peach_2)
                .to({ x: 420 }, 200)
                .to({ x: 460 }, 200);
            egret.Tween.get(this.peach_3)
                .to({ x: 740 }, 200)
                .to({ x: 780 }, 200);
            egret.Tween.get(this.peach_4)
                .to({ x: 1060 }, 200)
                .to({ x: 1100 }, 200).call(function () {
                egret.Tween.get(_this.peach_group)
                    .to({ y: -300 }, 800, egret.Ease.sineIn)
                    .to({ y: -330 }, 150)
                    .to({ y: -300 }, 150)
                    .to({ y: -315 }, 100)
                    .to({ y: -300 }, 100);
                _this.peach_1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.peach_group.visible = false;
                    _this.createFreeRound();
                    _this.removeTreeGroup();
                    // this.playFreeRound();
                }, _this);
                _this.peach_2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.peach_group.visible = false;
                    _this.createFreeRound();
                    _this.removeTreeGroup();
                    // this.playFreeRound();
                }, _this);
                _this.peach_3.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.peach_group.visible = false;
                    _this.createFreeRound();
                    _this.removeTreeGroup();
                    // this.playFreeRound();
                }, _this);
                _this.peach_4.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.peach_group.visible = false;
                    _this.createFreeRound();
                    _this.removeTreeGroup();
                    // this.playFreeRound();
                }, _this);
            });
        };
        test.prototype.removeTreeGroup = function () {
            var _this = this;
            egret.Tween.get(this.bg_02).to({ alpha: 0 }, 800);
            egret.Tween.get(this.tree_bg).to({ alpha: 0 }, 800);
            egret.Tween.get(this.bottom_cloud).to({ x: -1280 }, 800, egret.Ease.sineIn).call(function () {
                egret.setTimeout(function () { _this.playFreeRound(); }, _this, 1000);
            });
        };
        //获取免费次数后开始免费游戏
        test.prototype.playFreeRound = function () {
            var _this = this;
            if (this.freeTimes > 0) {
                if (this.isWalt) {
                    this.freeUncommonRound();
                    this.freeTimes -= 1;
                }
                else {
                    this.freeCommonRound();
                    this.freeTimes -= 1;
                }
            }
            else {
                this.group0.removeChildren();
                this.group6.removeChildren();
                this.group7.removeChildren();
                this.group8.removeChildren();
                this.group9.removeChildren();
                this.bang_0.visible = this.bang_6.visible = this.bang_7.visible = this.bang_8.visible = false;
                egret.Tween.get(this).to({ y: 0 }, 4200, egret.Ease.sineInOut).call(function () {
                    _this.gold_group.visible = true;
                    _this.mune_btn.visible = true;
                });
            }
        };
        //特殊情况下的资源组
        test.prototype.uncommonRound = function () {
            var _this = this;
            var dragonbonesFactory1;
            var dragonbonesFactory2;
            var dragonbonesFactory3;
            var dragonbonesData1;
            var dragonbonesData2;
            var dragonbonesData3;
            var dragonbonesData = RES.getRes("test_ske_json");
            var textureData = RES.getRes("test_tex_json");
            var texture = RES.getRes("test_tex_png");
            var dragonbonesFactory = new dragonBones.EgretFactory();
            dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
            var armature = dragonbonesFactory.buildArmature("Sprite");
            var armature2 = dragonbonesFactory.buildArmature("Sprite");
            armature.display.scaleX = 1;
            armature.display.scaleY = 1;
            //特殊情况的正常转动
            if (this.run_btn.currentState == "up") {
                if (this.group1 || this.group2 || this.group3 || this.group4 || this.group5) {
                    this.group1.removeChildren();
                    this.group2.removeChildren();
                    this.group3.removeChildren();
                    this.group4.removeChildren();
                    this.group5.removeChildren();
                }
                this.connectSuc();
                this.run_btn.currentState = "down";
                var tw1 = egret.Tween.get(this.sprite1);
                tw1.to({ y: -1 * 172 }, 600)
                    .to({ y: -1 * 172 + 100 }, 200)
                    .to({ y: -1 * 172 }, 200);
                var tw2 = egret.Tween.get(this.sprite2);
                tw2.to({ y: -1 * 172 }, 900)
                    .to({ y: -1 * 172 + 100 }, 200)
                    .to({ y: -1 * 172 }, 200)
                    .call(function () {
                    dragonbonesData1 = RES.getRes("wild_ske_json");
                    var textureData = RES.getRes("wild_tex_json");
                    var texture = RES.getRes("wild_tex_png");
                    dragonbonesFactory1 = new dragonBones.EgretFactory();
                    dragonbonesFactory1.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData1));
                    dragonbonesFactory1.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
                    _this.armature_a = dragonbonesFactory1.buildArmature("wildanim");
                    _this.armature_a.display.scaleX = 1;
                    _this.armature_a.display.scaleY = 1;
                    _this.armature_a.display.x = 100;
                    _this.armature_a.display.y = 290;
                    _this.group3.addChild(_this.armature_a.display);
                    egret.Tween.removeTweens(_this.sprite3);
                    egret.Tween.get(_this.sprite3)
                        .to({ y: -1 * 172 }, 900)
                        .to({ y: -1 * 172 + 100 }, 100)
                        .to({ y: -1 * 172 }, 100)
                        .call(function () {
                        dragonbonesFactory1.dispose();
                        dragonbonesData1 = null;
                        _this.armature_a.display.parent.removeChild(_this.armature_a.display);
                        _this.armature_a = null;
                        dragonbonesData2 = RES.getRes("wild_ske_json");
                        var textureData = RES.getRes("wild_tex_json");
                        var texture = RES.getRes("wild_tex_png");
                        dragonbonesFactory2 = new dragonBones.EgretFactory();
                        dragonbonesFactory2.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData2));
                        dragonbonesFactory2.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
                        _this.armature_b = dragonbonesFactory2.buildArmature("wildanim");
                        _this.armature_b.display.scaleX = 1;
                        _this.armature_b.display.scaleY = 1;
                        _this.armature_b.display.x = 100;
                        _this.armature_b.display.y = 290;
                        _this.group4.addChild(_this.armature_b.display);
                        egret.Tween.removeTweens(_this.sprite4);
                        egret.Tween.get(_this.sprite4)
                            .to({ y: -1 * 172 }, 900)
                            .to({ y: -1 * 172 + 100 }, 100)
                            .to({ y: -1 * 172 }, 100)
                            .call(function () {
                            dragonbonesFactory2.dispose();
                            dragonbonesData2 = null;
                            _this.armature_b.display.parent.removeChild(_this.armature_b.display);
                            _this.armature_b = null;
                            dragonbonesData3 = RES.getRes("wild_ske_json");
                            var textureData = RES.getRes("wild_tex_json");
                            var texture = RES.getRes("wild_tex_png");
                            dragonbonesFactory3 = new dragonBones.EgretFactory();
                            dragonbonesFactory3.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData3));
                            dragonbonesFactory3.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
                            _this.armature_c = dragonbonesFactory3.buildArmature("wildanim");
                            _this.armature_c.display.scaleX = 1;
                            _this.armature_c.display.scaleY = 1;
                            _this.armature_c.display.x = 100;
                            _this.armature_c.display.y = 290;
                            dragonbonesFactory2.removeDragonBonesData(dragonbonesData2);
                            _this.group5.addChild(_this.armature_c.display);
                            egret.Tween.removeTweens(_this.sprite5);
                            egret.Tween.get(_this.sprite5)
                                .to({ y: -1 * 172 }, 900)
                                .to({ y: -1 * 172 + 100 }, 100)
                                .to({ y: -1 * 172 }, 100)
                                .call(function () {
                                dragonbonesFactory3.dispose();
                                dragonbonesData3 = null;
                                _this.armature_c.display.parent.removeChild(_this.armature_c.display);
                                _this.armature_c = null;
                                dragonbonesData3 = null;
                                _this.run_btn.currentState = "up";
                                _this.addBonusAnimation();
                                // armature.display.x = 50;
                                // armature.display.y = 50;
                                // armature2.display.x = 50;
                                // armature2.display.y = 260;
                                // this.group1.addChild(armature.display);
                                // this.group2.addChild(armature2.display);
                            });
                        });
                    });
                });
                var tw3 = egret.Tween.get(this.sprite3);
                tw3.to({ y: -1 * 172 }, 3200)
                    .to({ y: -1 * 172 + 100 }, 200)
                    .to({ y: -1 * 172 }, 200);
                var tw4 = egret.Tween.get(this.sprite4);
                tw4.to({ y: -1 * 172 }, 5500)
                    .to({ y: -1 * 172 + 100 }, 200)
                    .to({ y: -1 * 172 }, 200);
                var tw5 = egret.Tween.get(this.sprite5);
                tw5.to({ y: -1 * 172 }, 7800)
                    .to({ y: -1 * 172 + 100 }, 200)
                    .to({ y: -1 * 172 }, 200);
            }
            else {
                egret.Tween.removeTweens(this.sprite1);
                egret.Tween.get(this.sprite1).to({ y: -1 * 172 }, 100);
                egret.Tween.removeTweens(this.sprite2);
                egret.Tween.get(this.sprite2).to({ y: -172 }, 150).call(function () {
                    dragonbonesData1 = RES.getRes("wild_ske_json");
                    var textureData = RES.getRes("wild_tex_json");
                    var texture = RES.getRes("wild_tex_png");
                    dragonbonesFactory1 = new dragonBones.EgretFactory();
                    dragonbonesFactory1.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData1));
                    dragonbonesFactory1.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
                    _this.armature_a = dragonbonesFactory1.buildArmature("wildanim");
                    _this.armature_a.display.scaleX = 1;
                    _this.armature_a.display.scaleY = 1;
                    _this.armature_a.display.x = 100;
                    _this.armature_a.display.y = 290;
                    _this.group3.addChild(_this.armature_a.display);
                });
                egret.Tween.removeTweens(this.sprite3);
                egret.Tween.get(this.sprite3).to({ y: -172 }, 200).call(function () {
                    dragonbonesFactory1.dispose();
                    dragonbonesData1 = null;
                    _this.armature_a.display.parent.removeChild(_this.armature_a.display);
                    _this.armature_a = null;
                    dragonbonesData2 = RES.getRes("wild_ske_json");
                    var textureData = RES.getRes("wild_tex_json");
                    var texture = RES.getRes("wild_tex_png");
                    dragonbonesFactory2 = new dragonBones.EgretFactory();
                    dragonbonesFactory2.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData2));
                    dragonbonesFactory2.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
                    _this.armature_b = dragonbonesFactory2.buildArmature("wildanim");
                    _this.armature_b.display.scaleX = 1;
                    _this.armature_b.display.scaleY = 1;
                    _this.armature_b.display.x = 100;
                    _this.armature_b.display.y = 290;
                    _this.group4.addChild(_this.armature_b.display);
                });
                egret.Tween.removeTweens(this.sprite4);
                egret.Tween.get(this.sprite4).to({ y: -172 }, 250).call(function () {
                    dragonbonesFactory2.dispose();
                    // texture.dispose();
                    dragonbonesData2 = null;
                    _this.armature_b.display.parent.removeChild(_this.armature_b.display);
                    _this.armature_b = null;
                    dragonbonesData3 = RES.getRes("wild_ske_json");
                    var textureData = RES.getRes("wild_tex_json");
                    var texture = RES.getRes("wild_tex_png");
                    dragonbonesFactory3 = new dragonBones.EgretFactory();
                    dragonbonesFactory3.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData3));
                    dragonbonesFactory3.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
                    _this.armature_c = dragonbonesFactory3.buildArmature("wildanim");
                    _this.armature_c.display.scaleX = 1;
                    _this.armature_c.display.scaleY = 1;
                    _this.armature_c.display.x = 100;
                    _this.armature_c.display.y = 290;
                    _this.group5.addChild(_this.armature_c.display);
                });
                egret.Tween.removeTweens(this.sprite5);
                egret.Tween.get(this.sprite5).to({ y: -172 }, 300).call(function () {
                    dragonbonesFactory3.dispose();
                    dragonbonesData3 = null;
                    _this.armature_c.display.parent.removeChild(_this.armature_c.display);
                    _this.armature_c = null;
                    _this.addBonusAnimation();
                    // armature.display.x = 60;
                    // armature.display.y = 50;
                    // armature2.display.x = 60;
                    // armature2.display.y = 240;
                    // this.group1.addChild(armature.display);
                    // this.group2.addChild(armature2.display);
                    _this.checkBones();
                });
                this.run_btn.currentState = "up";
            }
        };
        //正常情况的转动
        test.prototype.commonRound = function () {
            var _this = this;
            // console.log(this.run_btn.currentState);
            var dragonbonesData = RES.getRes("test_ske_json");
            var textureData = RES.getRes("test_tex_json");
            var texture = RES.getRes("test_tex_png");
            var dragonbonesFactory = new dragonBones.EgretFactory();
            dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
            var armature = dragonbonesFactory.buildArmature("Sprite");
            var armature2 = dragonbonesFactory.buildArmature("Sprite");
            var data = RES.getRes("peach_tex.json");
            var txtr = RES.getRes("peach_tex.png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            armature.display.scaleX = 1;
            armature.display.scaleY = 1;
            //正常情况下的正常转动
            if (this.run_btn.currentState == "up") {
                if (this.group1 || this.group2 || this.group3 || this.group4 || this.group5) {
                    this.group1.removeChildren();
                    this.group2.removeChildren();
                    this.group3.removeChildren();
                    this.group4.removeChildren();
                    this.group5.removeChildren();
                }
                this.connectSuc();
                this.run_btn.currentState = "down";
                var tw1 = egret.Tween.get(this.sprite1);
                tw1.to({ y: -1 * 172 }, 600)
                    .to({ y: -1 * 172 + 100 }, 200)
                    .to({ y: -1 * 172 }, 200);
                var tw2 = egret.Tween.get(this.sprite2);
                tw2.to({ y: -1 * 172 }, 900)
                    .to({ y: -1 * 172 + 100 }, 200)
                    .to({ y: -1 * 172 }, 200);
                var tw3 = egret.Tween.get(this.sprite3);
                tw3.to({ y: -1 * 172 }, 1200)
                    .to({ y: -1 * 172 + 100 }, 200)
                    .to({ y: -1 * 172 }, 200);
                var tw4 = egret.Tween.get(this.sprite4);
                tw4.to({ y: -1 * 172 }, 1500)
                    .to({ y: -1 * 172 + 100 }, 200)
                    .to({ y: -1 * 172 }, 200);
                var tw5 = egret.Tween.get(this.sprite5);
                tw5.to({ y: -1 * 172 }, 1800)
                    .to({ y: -1 * 172 + 100 }, 200)
                    .to({ y: -1 * 172 }, 200)
                    .call(function () {
                    _this.run_btn.currentState = "up";
                    _this.break = false;
                    _this.addBonusAnimation();
                    _this.checkBones();
                });
            } //正常情况下的非正常转动 
            else if (this.run_btn.currentState == "down") {
                egret.Tween.removeTweens(this.sprite1);
                egret.Tween.get(this.sprite1).to({ y: -1 * 172 }, 100);
                egret.Tween.removeTweens(this.sprite2);
                egret.Tween.get(this.sprite2).to({ y: -172 }, 150);
                egret.Tween.removeTweens(this.sprite3);
                egret.Tween.get(this.sprite3).to({ y: -172 }, 200);
                egret.Tween.removeTweens(this.sprite4);
                egret.Tween.get(this.sprite4).to({ y: -172 }, 250);
                egret.Tween.removeTweens(this.sprite5);
                egret.Tween.get(this.sprite5).to({ y: -172 }, 300).call(function () {
                    _this.checkBones();
                });
                this.run_btn.currentState = "up";
            }
        };
        test.prototype.addBonusAnimation = function () {
            var _this = this;
            var dragonbonesData = RES.getRes("test_ske_json");
            var textureData = RES.getRes("test_tex_json");
            var texture = RES.getRes("test_tex_png");
            var dragonbonesFactory = new dragonBones.EgretFactory();
            dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
            var armature01 = dragonbonesFactory.buildArmature("Sprite");
            var armature02 = dragonbonesFactory.buildArmature("Sprite");
            var armature03 = dragonbonesFactory.buildArmature("Sprite");
            var armature04 = dragonbonesFactory.buildArmature("Sprite");
            var armature05 = dragonbonesFactory.buildArmature("Sprite");
            var count = 0;
            if (this.atr_bottom) {
                async.eachSeries(this.atr_bottom, function (index, callback) {
                    if (_this.break) {
                        return;
                    }
                    for (var j = 0; j < index.length; j++) {
                        switch (j) {
                            case 0:
                                // var armature01: dragonBones.Armature = dragonbonesFactory.buildArmature("Sprite");
                                armature01.display.x = 70;
                                armature01.display.y = 50 + (index[j] - 1) * 190;
                                _this.group1.addChild(armature01.display);
                                break;
                            case 1:
                                // var armature02: dragonBones.Armature = dragonbonesFactory.buildArmature("Sprite");
                                armature02.display.x = 70;
                                armature02.display.y = 50 + (index[j] - 1) * 190;
                                _this.group2.addChild(armature02.display);
                                break;
                            case 2:
                                // var armature03: dragonBones.Armature = dragonbonesFactory.buildArmature("Sprite");
                                armature03.display.x = 70;
                                armature03.display.y = 50 + (index[j] - 1) * 190;
                                _this.group3.addChild(armature03.display);
                                break;
                            case 3:
                                // var armature04: dragonBones.Armature = dragonbonesFactory.buildArmature("Sprite");
                                armature04.display.x = 70;
                                armature04.display.y = 50 + (index[j] - 1) * 190;
                                _this.group4.addChild(armature04.display);
                                break;
                            case 4:
                                // var armature05: dragonBones.Armature = dragonbonesFactory.buildArmature("Sprite");
                                armature05.display.x = 70;
                                armature05.display.y = 50 + (index[j] - 1) * 190;
                                _this.group5.addChild(armature05.display);
                                break;
                        }
                    }
                    count++;
                    egret.setTimeout(callback, _this, 2000);
                }, function () {
                    if (armature01.display.parent) {
                        armature01.display.parent.removeChild(armature01.display);
                        dragonbonesFactory.dispose();
                        armature01 = null;
                    }
                    if (armature02.display.parent) {
                        armature02.display.parent.removeChild(armature02.display);
                        dragonbonesFactory.dispose();
                        armature02 = null;
                    }
                    if (armature03.display.parent) {
                        armature03.display.parent.removeChild(armature03.display);
                        dragonbonesFactory.dispose();
                        armature03 = null;
                    }
                    if (armature04.display.parent) {
                        armature04.display.parent.removeChild(armature04.display);
                        dragonbonesFactory.dispose();
                        armature04 = null;
                    }
                    if (armature05.display.parent) {
                        armature05.display.parent.removeChild(armature05.display);
                        dragonbonesFactory.dispose();
                        armature05 = null;
                    }
                    if (count == _this.atr_bottom.length) {
                        return _this.addBonusAnimation();
                    }
                });
            }
        };
        test.prototype.createRoundGroup = function () {
            // this.atr_bottom = this.atr_top;
            // if(this.sprite1 || this.sprite2 || this.sprite3 ||this.sprite4 || this.sprite5){
            //         this.atr_bottom = this.atr_top;
            //     }
            if (this.isWalt) {
                //创建5个滚动资源组
                this.sprite1 = new egret.Sprite();
                this.sprite2 = new egret.Sprite();
                this.sprite3 = new egret.Sprite();
                this.sprite4 = new egret.Sprite();
                this.sprite5 = new egret.Sprite();
                var bitmap = void 0;
                for (var i = 1; i < 11; i++) {
                    bitmap = new egret.Bitmap();
                    bitmap.texture = RES.getRes("icon_3_json." + 1 + "");
                    switch (i) {
                        case 1:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[0] + "");
                            break;
                        case 2:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[1] + "");
                            break;
                        case 3:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[2] + "");
                            break;
                        case 8:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[0] + "");
                            break;
                        case 9:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[1] + "");
                            break;
                        case 10:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[2] + "");
                            break;
                    }
                    bitmap.x = 20;
                    bitmap.y = (i - 1) * 172 + 20;
                    this.sprite1.addChild(bitmap);
                    this.sprite1.x = 0;
                    this.sprite1.y = -7 * 172;
                    this.group1.addChild(this.sprite1);
                }
                for (var i = 1; i < 14; i++) {
                    bitmap = new egret.Bitmap();
                    bitmap.texture = RES.getRes("icon_3_json." + 2 + "");
                    switch (i) {
                        case 2:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[3] + "");
                            break;
                        case 3:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[4] + "");
                            break;
                        case 4:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[5] + "");
                            break;
                        case 11:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[3] + "");
                            break;
                        case 12:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[4] + "");
                            break;
                        case 13:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[5] + "");
                            break;
                    }
                    bitmap.x = 20;
                    bitmap.y = (i - 1) * 172 + 20;
                    this.sprite2.addChild(bitmap);
                    this.sprite2.x = 0;
                    this.sprite2.y = -10 * 172;
                    this.group2.addChild(this.sprite2);
                }
                for (var i = 1; i < 37; i++) {
                    bitmap = new egret.Bitmap();
                    bitmap.texture = RES.getRes("icon_3_json." + 3 + "");
                    switch (i) {
                        case 2:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[6] + "");
                            break;
                        case 3:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[7] + "");
                            break;
                        case 4:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[8] + "");
                            break;
                        case 34:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[6] + "");
                            break;
                        case 35:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[7] + "");
                            break;
                        case 36:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[8] + "");
                            break;
                    }
                    bitmap.x = 20;
                    bitmap.y = (i - 1) * 172 + 20;
                    this.sprite3.addChild(bitmap);
                    this.sprite3.x = 0;
                    this.sprite3.y = -33 * 172;
                    this.group3.addChild(this.sprite3);
                }
                for (var i = 1; i < 60; i++) {
                    bitmap = new egret.Bitmap();
                    bitmap.texture = RES.getRes("icon_3_json." + 4 + "");
                    switch (i) {
                        case 2:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[9] + "");
                            break;
                        case 3:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[10] + "");
                            break;
                        case 4:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[11] + "");
                            break;
                        case 57:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[9] + "");
                            break;
                        case 58:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[10] + "");
                            break;
                        case 59:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[11] + "");
                            break;
                    }
                    bitmap.x = 20;
                    bitmap.y = (i - 1) * 172 + 20;
                    this.sprite4.addChild(bitmap);
                    this.sprite4.x = 0;
                    this.sprite4.y = -56 * 172;
                    this.group4.addChild(this.sprite4);
                }
                for (var i = 1; i < 83; i++) {
                    bitmap = new egret.Bitmap();
                    bitmap.texture = RES.getRes("icon_3_json." + 5 + "");
                    switch (i) {
                        case 2:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[12] + "");
                            break;
                        case 3:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[13] + "");
                            break;
                        case 4:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[14] + "");
                            break;
                        case 11:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[12] + "");
                            break;
                        case 12:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[13] + "");
                            break;
                        case 13:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[14] + "");
                            break;
                    }
                    bitmap.x = 20;
                    bitmap.y = (i - 1) * 172 + 20;
                    this.sprite5.addChild(bitmap);
                    this.sprite5.x = 0;
                    this.sprite5.y = -79 * 172;
                    this.group5.addChild(this.sprite5);
                }
            }
            else {
                //创建5个滚动资源组
                this.sprite1 = new egret.Sprite();
                this.sprite2 = new egret.Sprite();
                this.sprite3 = new egret.Sprite();
                this.sprite4 = new egret.Sprite();
                this.sprite5 = new egret.Sprite();
                var bitmap = void 0;
                for (var i = 1; i < 11; i++) {
                    bitmap = new egret.Bitmap();
                    bitmap.texture = RES.getRes("icon_3_json." + 1 + "");
                    switch (i) {
                        case 1:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[0] + "");
                            break;
                        case 2:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[1] + "");
                            break;
                        case 3:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[2] + "");
                            break;
                        case 8:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[0] + "");
                            break;
                        case 9:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[1] + "");
                            break;
                        case 10:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[2] + "");
                            break;
                    }
                    bitmap.x = 20;
                    bitmap.y = (i - 1) * 172 + 20;
                    this.sprite1.addChild(bitmap);
                    this.sprite1.x = 0;
                    this.sprite1.y = -7 * 172;
                    this.group1.addChild(this.sprite1);
                }
                for (var i = 1; i < 14; i++) {
                    bitmap = new egret.Bitmap();
                    bitmap.texture = RES.getRes("icon_3_json." + 2 + "");
                    switch (i) {
                        case 2:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[3] + "");
                            break;
                        case 3:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[4] + "");
                            break;
                        case 4:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[5] + "");
                            break;
                        case 11:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[3] + "");
                            break;
                        case 12:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[4] + "");
                            break;
                        case 13:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[5] + "");
                            break;
                    }
                    bitmap.x = 20;
                    bitmap.y = (i - 1) * 172 + 20;
                    this.sprite2.addChild(bitmap);
                    this.sprite2.x = 0;
                    this.sprite2.y = -10 * 172;
                    this.group2.addChild(this.sprite2);
                }
                for (var i = 1; i < 17; i++) {
                    bitmap = new egret.Bitmap();
                    bitmap.texture = RES.getRes("icon_3_json." + 3 + "");
                    switch (i) {
                        case 2:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[6] + "");
                            break;
                        case 3:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[7] + "");
                            break;
                        case 4:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[8] + "");
                            break;
                        case 14:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[6] + "");
                            break;
                        case 15:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[7] + "");
                            break;
                        case 16:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[8] + "");
                            break;
                    }
                    bitmap.x = 20;
                    bitmap.y = (i - 1) * 172 + 20;
                    this.sprite3.addChild(bitmap);
                    this.sprite3.x = 0;
                    this.sprite3.y = -13 * 172;
                    this.group3.addChild(this.sprite3);
                }
                for (var i = 1; i < 20; i++) {
                    bitmap = new egret.Bitmap();
                    bitmap.texture = RES.getRes("icon_3_json." + 4 + "");
                    switch (i) {
                        case 2:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[9] + "");
                            break;
                        case 3:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[10] + "");
                            break;
                        case 4:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[11] + "");
                            break;
                        case 17:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[9] + "");
                            break;
                        case 18:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[10] + "");
                            break;
                        case 19:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[11] + "");
                            break;
                    }
                    bitmap.x = 20;
                    bitmap.y = (i - 1) * 172 + 20;
                    this.sprite4.addChild(bitmap);
                    this.sprite4.x = 0;
                    this.sprite4.y = -16 * 172;
                    this.group4.addChild(this.sprite4);
                }
                for (var i = 1; i < 23; i++) {
                    bitmap = new egret.Bitmap();
                    bitmap.texture = RES.getRes("icon_3_json." + 5 + "");
                    switch (i) {
                        case 2:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[12] + "");
                            break;
                        case 3:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[13] + "");
                            break;
                        case 4:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[14] + "");
                            break;
                        case 20:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[12] + "");
                            break;
                        case 21:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[13] + "");
                            break;
                        case 22:
                            bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[14] + "");
                            break;
                    }
                    bitmap.x = 20;
                    bitmap.y = (i - 1) * 172 + 20;
                    this.sprite5.addChild(bitmap);
                    this.sprite5.x = 0;
                    this.sprite5.y = -19 * 172;
                    this.group5.addChild(this.sprite5);
                }
            }
        };
        //创建免费游戏资源组
        test.prototype.createFreeRound = function () {
            // this.atr_bottom = this.atr_top;
            //创建5个免费滚动资源组
            this.sprite1 = new egret.Sprite();
            this.sprite2 = new egret.Sprite();
            this.sprite3 = new egret.Sprite();
            this.sprite4 = new egret.Sprite();
            this.sprite5 = new egret.Sprite();
            var bitmap;
            for (var i = 1; i < 11; i++) {
                bitmap = new egret.Bitmap();
                bitmap.texture = RES.getRes("icon_3_json." + 1 + "");
                switch (i) {
                    case 1:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[0] + "");
                        break;
                    case 2:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[1] + "");
                        break;
                    case 3:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[2] + "");
                        break;
                    case 8:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[0] + "");
                        break;
                    case 9:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[1] + "");
                        break;
                    case 10:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[2] + "");
                        break;
                }
                bitmap.x = 20;
                bitmap.y = (i - 1) * 172 + 20;
                this.sprite1.addChild(bitmap);
                this.sprite1.x = 0;
                this.sprite1.y = -7 * 172;
                this.group0.addChild(this.sprite1);
            }
            for (var i = 1; i < 14; i++) {
                bitmap = new egret.Bitmap();
                bitmap.texture = RES.getRes("icon_3_json." + 2 + "");
                switch (i) {
                    case 2:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[3] + "");
                        break;
                    case 3:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[4] + "");
                        break;
                    case 4:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[5] + "");
                        break;
                    case 11:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[3] + "");
                        break;
                    case 12:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[4] + "");
                        break;
                    case 13:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[5] + "");
                        break;
                }
                bitmap.x = 20;
                bitmap.y = (i - 1) * 172 + 20;
                this.sprite2.addChild(bitmap);
                this.sprite2.x = 0;
                this.sprite2.y = -10 * 172;
                this.group6.addChild(this.sprite2);
            }
            for (var i = 1; i < 37; i++) {
                bitmap = new egret.Bitmap();
                bitmap.texture = RES.getRes("icon_3_json." + 3 + "");
                switch (i) {
                    case 2:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[6] + "");
                        break;
                    case 3:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[7] + "");
                        break;
                    case 4:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[8] + "");
                        break;
                    case 34:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[6] + "");
                        break;
                    case 35:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[7] + "");
                        break;
                    case 36:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[8] + "");
                        break;
                }
                bitmap.x = 20;
                bitmap.y = (i - 1) * 172 + 20;
                this.sprite3.addChild(bitmap);
                this.sprite3.x = 0;
                this.sprite3.y = -33 * 172;
                this.group7.addChild(this.sprite3);
            }
            for (var i = 1; i < 60; i++) {
                bitmap = new egret.Bitmap();
                bitmap.texture = RES.getRes("icon_3_json." + 4 + "");
                switch (i) {
                    case 2:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[9] + "");
                        break;
                    case 3:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[10] + "");
                        break;
                    case 4:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[11] + "");
                        break;
                    case 57:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[9] + "");
                        break;
                    case 58:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[10] + "");
                        break;
                    case 59:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[11] + "");
                        break;
                }
                bitmap.x = 20;
                bitmap.y = (i - 1) * 172 + 20;
                this.sprite4.addChild(bitmap);
                this.sprite4.x = 0;
                this.sprite4.y = -56 * 172;
                this.group8.addChild(this.sprite4);
            }
            for (var i = 1; i < 83; i++) {
                bitmap = new egret.Bitmap();
                bitmap.texture = RES.getRes("icon_3_json." + 5 + "");
                switch (i) {
                    case 2:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[12] + "");
                        break;
                    case 3:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[13] + "");
                        break;
                    case 4:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[14] + "");
                        break;
                    case 11:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[12] + "");
                        break;
                    case 12:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[13] + "");
                        break;
                    case 13:
                        bitmap.texture = RES.getRes("icon_3_json." + this.atr_top[14] + "");
                        break;
                }
                bitmap.x = 20;
                bitmap.y = (i - 1) * 172 + 20;
                this.sprite5.addChild(bitmap);
                this.sprite5.x = 0;
                this.sprite5.y = -79 * 172;
                this.group9.addChild(this.sprite5);
            }
        };
        //正常转动的免费资源组
        test.prototype.freeCommonRound = function () {
            var _this = this;
            var dragonbonesData = RES.getRes("test_ske_json");
            var textureData = RES.getRes("test_tex_json");
            var texture = RES.getRes("test_tex_png");
            var dragonbonesFactory = new dragonBones.EgretFactory();
            dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
            var armature = dragonbonesFactory.buildArmature("Sprite");
            var armature2 = dragonbonesFactory.buildArmature("Sprite");
            armature.display.scaleX = 1;
            armature.display.scaleY = 1;
            //正常情况下的正常转动
            if (this.group0 || this.group6 || this.group7 || this.group8 || this.group9) {
                this.group0.removeChildren();
                this.group6.removeChildren();
                this.group7.removeChildren();
                this.group8.removeChildren();
                this.group9.removeChildren();
            }
            this.createFreeRound();
            var tw1 = egret.Tween.get(this.sprite1);
            tw1.to({ y: -1 * 172 }, 600)
                .to({ y: -1 * 172 + 100 }, 200)
                .to({ y: -1 * 172 }, 200);
            var tw2 = egret.Tween.get(this.sprite2);
            tw2.to({ y: -1 * 172 }, 900)
                .to({ y: -1 * 172 + 100 }, 200)
                .to({ y: -1 * 172 }, 200);
            var tw3 = egret.Tween.get(this.sprite3);
            tw3.to({ y: -1 * 172 }, 1200)
                .to({ y: -1 * 172 + 100 }, 200)
                .to({ y: -1 * 172 }, 200);
            var tw4 = egret.Tween.get(this.sprite4);
            tw4.to({ y: -1 * 172 }, 1500)
                .to({ y: -1 * 172 + 100 }, 200)
                .to({ y: -1 * 172 }, 200);
            var tw5 = egret.Tween.get(this.sprite5);
            tw5.to({ y: -1 * 172 }, 1800)
                .to({ y: -1 * 172 + 100 }, 200)
                .to({ y: -1 * 172 }, 200)
                .call(function () {
                egret.setTimeout(function () { _this.playFreeRound(); }, _this, 1000);
                // armature.display.x = 60;
                // armature.display.y = 50;
                // armature2.display.x = 60;
                // armature2.display.y = 240;
                // this.group1.addChild(armature.display);
                // this.group2.addChild(armature2.display);
            }).call(function () {
                // let line = new egret.Shape();
                // line.graphics.lineStyle(2, 0x00ff00);
                // let point1: egret.Point = armature.display.globalToLocal(0, 0);
                // let point2: egret.Point = armature2.display.globalToLocal(0, 0);
                // line.graphics.moveTo(point1.x + armature.display.width, point1.y + armature.display.height);
                // line.graphics.lineTo(point2.x, point2.y);
                // this.addChild(line);
            });
        };
        //特殊情况的免费资源组转动
        test.prototype.freeUncommonRound = function () {
            var _this = this;
            var dragonbonesFactory1;
            var dragonbonesFactory2;
            var dragonbonesFactory3;
            var dragonbonesData1;
            var dragonbonesData2;
            var dragonbonesData3;
            var dragonbonesData = RES.getRes("test_ske_json");
            var textureData = RES.getRes("test_tex_json");
            var texture = RES.getRes("test_tex_png");
            var dragonbonesFactory = new dragonBones.EgretFactory();
            dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
            var armature = dragonbonesFactory.buildArmature("Sprite");
            var armature2 = dragonbonesFactory.buildArmature("Sprite");
            armature.display.scaleX = 1;
            armature.display.scaleY = 1;
            //特殊情况的正常转动
            if (this.group0 || this.group6 || this.group7 || this.group8 || this.group9) {
                this.group0.removeChildren();
                this.group6.removeChildren();
                this.group7.removeChildren();
                this.group8.removeChildren();
                this.group9.removeChildren();
            }
            this.createFreeRound();
            var tw1 = egret.Tween.get(this.sprite1);
            tw1.to({ y: -1 * 172 }, 600)
                .to({ y: -1 * 172 + 100 }, 200)
                .to({ y: -1 * 172 }, 200);
            var tw2 = egret.Tween.get(this.sprite2);
            tw2.to({ y: -1 * 172 }, 900)
                .to({ y: -1 * 172 + 100 }, 200)
                .to({ y: -1 * 172 }, 200)
                .call(function () {
                dragonbonesData1 = RES.getRes("wild_ske_json");
                var textureData = RES.getRes("wild_tex_json");
                var texture = RES.getRes("wild_tex_png");
                dragonbonesFactory1 = new dragonBones.EgretFactory();
                dragonbonesFactory1.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData1));
                dragonbonesFactory1.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
                _this.armature_a = dragonbonesFactory1.buildArmature("wildanim");
                _this.armature_a.display.scaleX = 1;
                _this.armature_a.display.scaleY = 1;
                _this.armature_a.display.x = 100;
                _this.armature_a.display.y = 290;
                _this.group7.addChild(_this.armature_a.display);
                egret.Tween.removeTweens(_this.sprite3);
                egret.Tween.get(_this.sprite3)
                    .to({ y: -1 * 172 }, 900)
                    .to({ y: -1 * 172 + 100 }, 100)
                    .to({ y: -1 * 172 }, 100)
                    .call(function () {
                    dragonbonesFactory1.dispose();
                    dragonbonesData1 = null;
                    _this.armature_a.display.parent.removeChild(_this.armature_a.display);
                    _this.armature_a = null;
                    dragonbonesData2 = RES.getRes("wild_ske_json");
                    var textureData = RES.getRes("wild_tex_json");
                    var texture = RES.getRes("wild_tex_png");
                    dragonbonesFactory2 = new dragonBones.EgretFactory();
                    dragonbonesFactory2.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData2));
                    dragonbonesFactory2.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
                    _this.armature_b = dragonbonesFactory2.buildArmature("wildanim");
                    _this.armature_b.display.scaleX = 1;
                    _this.armature_b.display.scaleY = 1;
                    _this.armature_b.display.x = 100;
                    _this.armature_b.display.y = 290;
                    _this.group8.addChild(_this.armature_b.display);
                    egret.Tween.removeTweens(_this.sprite4);
                    egret.Tween.get(_this.sprite4)
                        .to({ y: -1 * 172 }, 900)
                        .to({ y: -1 * 172 + 100 }, 100)
                        .to({ y: -1 * 172 }, 100)
                        .call(function () {
                        dragonbonesFactory2.dispose();
                        dragonbonesData2 = null;
                        _this.armature_b.display.parent.removeChild(_this.armature_b.display);
                        _this.armature_b = null;
                        dragonbonesData3 = RES.getRes("wild_ske_json");
                        var textureData = RES.getRes("wild_tex_json");
                        var texture = RES.getRes("wild_tex_png");
                        dragonbonesFactory3 = new dragonBones.EgretFactory();
                        dragonbonesFactory3.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData3));
                        dragonbonesFactory3.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
                        _this.armature_c = dragonbonesFactory3.buildArmature("wildanim");
                        _this.armature_c.display.scaleX = 1;
                        _this.armature_c.display.scaleY = 1;
                        _this.armature_c.display.x = 100;
                        _this.armature_c.display.y = 290;
                        dragonbonesFactory2.removeDragonBonesData(dragonbonesData2);
                        _this.group9.addChild(_this.armature_c.display);
                        egret.Tween.removeTweens(_this.sprite5);
                        egret.Tween.get(_this.sprite5)
                            .to({ y: -1 * 172 }, 900)
                            .to({ y: -1 * 172 + 100 }, 100)
                            .to({ y: -1 * 172 }, 100)
                            .call(function () {
                            dragonbonesFactory3.dispose();
                            dragonbonesData3 = null;
                            _this.armature_c.display.parent.removeChild(_this.armature_c.display);
                            _this.armature_c = null;
                            dragonbonesData3 = null;
                            // armature.display.x = 50;
                            // armature.display.y = 50;
                            // armature2.display.x = 50;
                            // armature2.display.y = 260;
                            // this.group1.addChild(armature.display);
                            // this.group2.addChild(armature2.display);
                        });
                    });
                });
            });
            var tw3 = egret.Tween.get(this.sprite3);
            tw3.to({ y: -1 * 172 }, 3200)
                .to({ y: -1 * 172 + 100 }, 200)
                .to({ y: -1 * 172 }, 200);
            var tw4 = egret.Tween.get(this.sprite4);
            tw4.to({ y: -1 * 172 }, 5500)
                .to({ y: -1 * 172 + 100 }, 200)
                .to({ y: -1 * 172 }, 200);
            var tw5 = egret.Tween.get(this.sprite5);
            tw5.to({ y: -1 * 172 }, 7800)
                .to({ y: -1 * 172 + 100 }, 200)
                .to({ y: -1 * 172 }, 200);
        };
        //加注
        test.prototype.addBet = function () {
            this.bet += 1;
            this.totoal_bet.font = "shuzi_fnt";
            this.totoal_bet.text = this.bet + "";
        };
        //减注
        test.prototype.reduceBet = function () {
            if (this.bet <= 1) {
                console.log("倍率不能再小了！");
                return;
            }
            else {
                this.bet -= 1;
                this.totoal_bet.font = "shuzi_fnt";
                this.totoal_bet.text = this.bet + "";
            }
        };
        //显示坐上菜单栏
        test.prototype.showTopMune = function () {
            this.top_btn_group.visible = true;
            this.mune_btn.visible = false;
            egret.Tween.get(this.top_btn_group).to({ x: 13.84 }, 500, egret.Ease.cubicOut);
        };
        //关闭坐上菜单栏
        test.prototype.closeTopMune = function () {
            egret.Tween.get(this.top_btn_group).to({ x: -285 }, 500, egret.Ease.cubicOut);
            this.top_btn_group.visible = false;
            this.mune_btn.visible = true;
        };
        //打开中奖窗口
        test.prototype.checkBones = function () {
            // game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BONUS);
        };
        return test;
    }(eui.Component));
    game.test = test;
    __reflect(test.prototype, "game.test", ["eui.UIComponent", "egret.DisplayObject"]);
})(game || (game = {}));
//# sourceMappingURL=test.js.map