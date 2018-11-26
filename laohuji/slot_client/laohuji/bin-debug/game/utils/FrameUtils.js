var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FrameUtils = (function () {
    function FrameUtils() {
    }
    FrameUtils.postMessage = function (msg) {
        if (!window.parent) {
            return;
        }
        if (FrameUtils.isError) {
            return;
        }
        try {
            if (window.parent && window.parent['showTips']) {
                window.parent['showTips'](msg);
                return;
            }
        }
        catch (e) {
            FrameUtils.isError = true;
        }
    };
    FrameUtils.showTips = function (msg) {
        if (FrameUtils.isError) {
            return;
        }
        try {
            if (window.parent && window.parent['showTips']) {
                window.parent['showTips'](msg);
                return true;
            }
            return false;
        }
        catch (e) {
            FrameUtils.isError = true;
            return false;
        }
    };
    FrameUtils.iphoneXScreen = function (width, height) {
        if (width == 1280 && (height >= 735 && height <= 780)) {
            this.showTips(0);
        }
        else if (width == 1436 && height == 720) {
            this.showTips(1);
        }
        else if (width == 1468 && height == 720) {
            this.showTips(1);
        }
        else if (width == 1594 && height == 720) {
            this.showTips(0);
        }
        else if ((width >= 1570 && width <= 1630) && height == 720) {
            this.showTips(0);
        }
        else {
            this.showTips(1);
        }
    };
    FrameUtils.flushWindow = function () {
        // if (FrameUtils.isError) {
        // 	return;
        // }
        if (window.parent) {
            window.location.reload();
            // window.parent.location.href = window.parent.location.href;
        }
        else {
            window.location.reload();
        }
    };
    FrameUtils.isError = false;
    FrameUtils.topFrame = "http://192.168.2.5:9023";
    return FrameUtils;
}());
__reflect(FrameUtils.prototype, "FrameUtils");
//# sourceMappingURL=FrameUtils.js.map