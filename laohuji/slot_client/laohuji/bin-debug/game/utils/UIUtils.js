var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var UIUtils = (function () {
        function UIUtils() {
        }
        UIUtils.removeFromParent = function (child) {
            if (child && child.parent) {
                child.parent.removeChild(child);
            }
        };
        /**
    * 设置锚点居中
    * @param compt 组件
    * @param allChild 是否全部child设置锚点居中
    */
        UIUtils.setAnchorCenter = function (compt, allChild) {
            if (allChild) {
                for (var i = 0; i < compt.parent.numChildren; i++) {
                    if (compt.parent.getChildAt(i).anchorOffsetX == 0) {
                        compt.parent.getChildAt(i).anchorOffsetX = compt.parent.getChildAt(i).width / 2;
                        compt.parent.getChildAt(i).anchorOffsetY = compt.parent.getChildAt(i).height / 2;
                        compt.parent.getChildAt(i).x += compt.parent.getChildAt(i).width / 2;
                        compt.parent.getChildAt(i).y += compt.parent.getChildAt(i).height / 2;
                    }
                }
            }
            else {
                if (compt.anchorOffsetX == 0) {
                    compt.anchorOffsetX = compt.width / 2;
                    compt.anchorOffsetY = compt.height / 2;
                    compt.x += compt.width / 2;
                    compt.y += compt.height / 2;
                }
            }
        };
        UIUtils.resetAnchorPoint = function (p) {
            p.x -= p.anchorOffsetX;
            p.y -= p.anchorOffsetY;
            p.anchorOffsetX = 0;
            p.anchorOffsetY = 0;
        };
        UIUtils.updatePosistion = function (p) {
            if (p.width === GameConfig.WINSIZE_WIDTH) {
                p.width = GameConfig.curWidth();
            }
            if (p.height === GameConfig.WINSIZE_HEIGHT) {
                p.height = GameConfig.curHeight();
            }
        };
        UIUtils.addButtonScaleEffects = function (p) {
            if (!p)
                return;
            if (egret.is(p, egret.getQualifiedClassName(eui.Button))) {
                p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils.onButtonTouchBegan, p);
                UIUtils.setAnchorPot(p);
            }
            else {
                // if (!egret.is(p.parent, egret.getQualifiedClassName(eui.Group))) {
                var len = p.numChildren;
                for (var i = 0; i < len; i++) {
                    var ch = p.getChildAt(i);
                    UIUtils.addButtonScaleEffects(ch);
                }
                // }
            }
        };
        UIUtils.onButtonTouchBegan = function (e) {
            var btn = e.target;
            var scaleX = btn.scaleX;
            var scaleY = btn.scaleY;
            egret.Tween.get(btn).to({ scaleX: scaleX - 0.1, scaleY: scaleY - 0.1 }, 50).to({ scaleX: scaleX, scaleY: scaleY }, 50);
        };
        UIUtils.removeButtonScaleEffects = function (p) {
            if (!p)
                return;
            if (egret.is(p, egret.getQualifiedClassName(eui.Button))) {
                p.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils.onButtonTouchBegan, p);
            }
            else {
                var len = p.numChildren;
                for (var i = 0; i < len; i++) {
                    var ch = p.getChildAt(i);
                    UIUtils.removeButtonScaleEffects(ch);
                }
            }
        };
        UIUtils.setAnchorPot = function (p) {
            p.anchorOffsetX = p.width / 2; // * p.scaleX;
            p.anchorOffsetY = p.height / 2; // * p.scaleY;
            p.x += p.width / 2; //* p.scaleX;
            p.y += p.height / 2; // * p.scaleY;
        };
        UIUtils.removeSelf = function (p) {
            UIUtils.removeFromParent(p);
        };
        UIUtils.removeSelfByAmi = function (p, time) {
            return new Promise(function (resolve, reject) {
                egret.Tween.get(p).to({
                    alpha: 0
                }, time).call(function () {
                    UIUtils.removeFromParent(p);
                    resolve('success');
                }, p);
            });
        };
        UIUtils.getParentByClass = function (p, classType) {
            var parent = p.parent;
            if (parent) {
                if (parent instanceof classType) {
                    return parent;
                }
                else {
                    return UIUtils.getParentByClass(parent, classType);
                }
            }
            else {
                return null;
            }
        };
        UIUtils.getChildByClass = function (p, classType) {
            var len = p.numChildren;
            for (var i = 0; i < len; i++) {
                var ch = p.getChildAt(i);
                if (ch instanceof classType) {
                    return ch;
                }
            }
            return null;
        };
        UIUtils.fullscreen = function (p) {
            p.width = GameConfig.curWidth();
            p.height = GameConfig.curHeight();
        };
        UIUtils.getRealWidth = function (p) {
            return p.width * p.scaleX;
        };
        UIUtils.getRealHeight = function (p) {
            return p.height * p.scaleY;
        };
        return UIUtils;
    }());
    game.UIUtils = UIUtils;
    __reflect(UIUtils.prototype, "game.UIUtils");
})(game || (game = {}));
//# sourceMappingURL=UIUtils.js.map