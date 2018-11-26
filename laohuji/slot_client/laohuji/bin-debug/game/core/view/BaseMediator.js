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
/*
 * @Author: Li MengChan
 * @Date: 2018-06-25 14:30:16
 * @Last Modified by: Li MengChan
 * @Last Modified time: 2018-06-25 14:31:04
 * @Description: Mediator的基本类,默认是panel
 */
var BaseMediator = (function (_super) {
    __extends(BaseMediator, _super);
    function BaseMediator(mediatorName, viewComponent) {
        if (mediatorName === void 0) { mediatorName = ""; }
        if (viewComponent === void 0) { viewComponent = null; }
        var _this = _super.call(this, mediatorName, viewComponent) || this;
        _this.isInitialized = false; //是否初始化
        _this.isPopUp = false; //是否已经显示
        _this.ui = null; //UI容器
        // public viewComponent = null;
        _this.w = 0;
        _this.h = 0;
        _this.type = "panel";
        _this.w = GameConfig.curWidth();
        _this.h = GameConfig.curHeight();
        return _this;
    }
    /**
    * 添加面板方法
    * panel       		面板
    * dark        		背景是否变黑
    * popUpWidth      	指定弹窗宽度，定位使用
    * popUpHeight      	指定弹窗高度，定位使用
    * effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
    BaseMediator.prototype.showUI = function (ui, dark, popUpWidth, popUpHeight, effectType, isAlert) {
        if (dark === void 0) { dark = false; }
        if (popUpWidth === void 0) { popUpWidth = 0; }
        if (popUpHeight === void 0) { popUpHeight = 0; }
        if (effectType === void 0) { effectType = 0; }
        if (isAlert === void 0) { isAlert = false; }
        this.ui = ui;
        this.beforShow();
        this.initUI();
        this.initData();
        PopUpManager.addPopUp(ui, dark, popUpWidth, popUpHeight, effectType, isAlert);
    };
    /**
     * 面板弹出之前处理
     */
    BaseMediator.prototype.beforShow = function () {
    };
    /**
     * 初始化面板ui
     */
    BaseMediator.prototype.initUI = function () {
    };
    /**
     * 关闭
     */
    BaseMediator.prototype.closeViewComponent = function (effectType) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.type;
                        switch (_a) {
                            case "panel": return [3 /*break*/, 1];
                            case "scene": return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        if (!this.viewComponent) return [3 /*break*/, 3];
                        return [4 /*yield*/, PopUpManager.removePopUpAsync(this.viewComponent, effectType)];
                    case 2:
                        _b.sent();
                        this.viewComponent = null;
                        _b.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        if (this.viewComponent) {
                            game.UIUtils.removeSelf(this.viewComponent);
                            this.viewComponent = null;
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 初始化面板数据
     */
    BaseMediator.prototype.initData = function () {
    };
    /**
    * 移除面板方法
    * panel       		面板
    * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
    BaseMediator.prototype.closePanel = function (effectType, callFunc) {
        if (effectType === void 0) { effectType = 0; }
        PopUpManager.removePopUp(this.ui, effectType);
        this.destroy();
    };
    /**
     * 面板关闭后需要销毁的对象
     */
    BaseMediator.prototype.destroy = function () {
    };
    /**
     * 面板是否弹出状态
     */
    BaseMediator.prototype.getIsPopUp = function () {
        return this.isPopUp;
    };
    /**
     * 面板是否初始化完毕
     */
    BaseMediator.prototype.getIsInit = function () {
        return this.isInitialized;
    };
    // 获取面板宽度
    BaseMediator.prototype.getWidth = function () {
        return this.ui.width;
    };
    // 获取面板高度
    BaseMediator.prototype.getHeight = function () {
        return this.ui.height;
    };
    return BaseMediator;
}(puremvc.Mediator));
__reflect(BaseMediator.prototype, "BaseMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
//# sourceMappingURL=BaseMediator.js.map