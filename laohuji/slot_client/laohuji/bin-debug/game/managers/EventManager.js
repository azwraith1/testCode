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
var EventAutoRelease = (function () {
    function EventAutoRelease(type, callback, targetObj) {
        this.type = type;
        this.callback = callback;
        this.thisObj = targetObj;
    }
    return EventAutoRelease;
}());
__reflect(EventAutoRelease.prototype, "EventAutoRelease");
var EventManager = (function (_super) {
    __extends(EventManager, _super);
    function EventManager(target) {
        var _this = _super.call(this, target) || this;
        _this.autoReleaseArr = [];
        if (EventManager._instance) {
            throw new Error("EventManager使用单例 ");
        }
        _this.init();
        return _this;
    }
    Object.defineProperty(EventManager, "instance", {
        get: function () {
            if (!EventManager._instance) {
                EventManager._instance = new EventManager();
            }
            return EventManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    EventManager.prototype.init = function () {
        var timer = new egret.Timer(2000);
        timer.addEventListener(egret.TimerEvent.TIMER, this.autoReleaseTick, this);
        timer.start();
    };
    EventManager.prototype.addEvent = function (type, callback, targetObj, autoRelease) {
        if (autoRelease === void 0) { autoRelease = false; }
        this.addEventListener(type, callback, targetObj);
        if (autoRelease && targetObj instanceof egret.DisplayObject) {
            this.autoReleaseArr.push(new EventAutoRelease(type, callback, targetObj));
        }
    };
    EventManager.prototype.removeEvent = function (type, callback, targetObj) {
        this.removeEventListener(type, callback, targetObj);
    };
    EventManager.prototype.dispatch = function (type, data) {
        if (data === void 0) { data = null; }
        this.dispatchEventWith(type, false, data);
    };
    /**
     * 自动释放
     */
    EventManager.prototype.autoReleaseTick = function () {
        for (var i = this.autoReleaseArr.length - 1; i >= 0; i--) {
            var vo = this.autoReleaseArr[i];
            if (!vo.thisObj.stage) {
                this.removeEvent(vo.type, vo.callback, vo.thisObj);
                this.autoReleaseArr.splice(i, 1);
            }
        }
    };
    return EventManager;
}(egret.EventDispatcher));
__reflect(EventManager.prototype, "EventManager");
//# sourceMappingURL=EventManager.js.map