/**
 *
 * @author 
 *
 */
module game {
    export class UIUtils {
        public static removeFromParent(child: egret.DisplayObject) {
            if (child && child.parent) {
                child.parent.removeChild(child);
            }
        }

        /**
    * 设置锚点居中
    * @param compt 组件
    * @param allChild 是否全部child设置锚点居中
    */
        public static setAnchorCenter(compt: egret.DisplayObject, allChild?: boolean): void {
            if (allChild) {
                for (var i = 0; i < compt.parent.numChildren; i++) {
                    if (compt.parent.getChildAt(i).anchorOffsetX == 0) {
                        compt.parent.getChildAt(i).anchorOffsetX = compt.parent.getChildAt(i).width / 2;
                        compt.parent.getChildAt(i).anchorOffsetY = compt.parent.getChildAt(i).height / 2;
                        compt.parent.getChildAt(i).x += compt.parent.getChildAt(i).width / 2;
                        compt.parent.getChildAt(i).y += compt.parent.getChildAt(i).height / 2;
                    }
                }
            } else {
                if (compt.anchorOffsetX == 0) {
                    compt.anchorOffsetX = compt.width / 2;
                    compt.anchorOffsetY = compt.height / 2;
                    compt.x += compt.width / 2;
                    compt.y += compt.height / 2;
                }
            }
        }

        public static resetAnchorPoint(p) {
            p.x -= p.anchorOffsetX;
            p.y -= p.anchorOffsetY;
            p.anchorOffsetX = 0;
            p.anchorOffsetY = 0;
        }

        public static updatePosistion(p: egret.DisplayObjectContainer) {
            if (p.width === GameConfig.WINSIZE_WIDTH) {
                p.width = GameConfig.curWidth();
            }
            if (p.height === GameConfig.WINSIZE_HEIGHT) {
                p.height = GameConfig.curHeight();
            }
        }

        public static addButtonScaleEffects(p: egret.DisplayObjectContainer) {
            if (!p) return;
            if (egret.is(p, egret.getQualifiedClassName(eui.Button))) {
                p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils.onButtonTouchBegan, p);
                UIUtils.setAnchorPot(p);
            } else {
                // if (!egret.is(p.parent, egret.getQualifiedClassName(eui.Group))) {
                var len = p.numChildren;
                for (var i = 0; i < len; i++) {
                    var ch: egret.DisplayObjectContainer = <egret.DisplayObjectContainer>p.getChildAt(i);
                    UIUtils.addButtonScaleEffects(ch);
                }
                // }
            }
        }

        private static onButtonTouchBegan(e: egret.TouchEvent) {
            var btn = e.target;
            var scaleX = btn.scaleX;
            var scaleY = btn.scaleY;
            egret.Tween.get(btn).to({ scaleX: scaleX - 0.1, scaleY: scaleY - 0.1 }, 50).to({ scaleX: scaleX, scaleY: scaleY }, 50);
        }

        static removeButtonScaleEffects(p: egret.DisplayObjectContainer) {
            if (!p) return;

            if (egret.is(p, egret.getQualifiedClassName(eui.Button))) {
                p.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils.onButtonTouchBegan, p);
            } else {
                var len = p.numChildren;
                for (var i = 0; i < len; i++) {
                    var ch: egret.DisplayObjectContainer = <egret.DisplayObjectContainer>p.getChildAt(i);
                    UIUtils.removeButtonScaleEffects(ch);
                }
            }
        }

        static setAnchorPot(p: egret.DisplayObject) {
            p.anchorOffsetX = p.width / 2// * p.scaleX;
            p.anchorOffsetY = p.height / 2// * p.scaleY;
            p.x += p.width / 2 //* p.scaleX;
            p.y += p.height / 2// * p.scaleY;
        }

        static removeSelf(p: egret.DisplayObject) {
            UIUtils.removeFromParent(p);
        }

        static removeSelfByAmi(p: egret.DisplayObject, time: number) {
            return new Promise(function (resolve, reject) {
                egret.Tween.get(p).to({
                    alpha: 0
                }, time).call(function () {
                    UIUtils.removeFromParent(p);
                    resolve('success');
                }, p)
            })
        }

        public static getParentByClass(p: egret.DisplayObjectContainer, classType) {
            var parent = p.parent;
            if (parent) {
                if (parent instanceof classType) {
                    return parent;
                } else {
                    return UIUtils.getParentByClass(parent, classType);
                }
            } else {
                return null;
            }
        }


        public static getChildByClass(p: egret.DisplayObjectContainer, classType): any {
            var len = p.numChildren;
            for (var i = 0; i < len; i++) {
                var ch: egret.DisplayObjectContainer = <egret.DisplayObjectContainer>p.getChildAt(i);
                if (ch instanceof classType) {
                    return ch;
                }
            }
            return null;
        }


        public static fullscreen(p: egret.DisplayObject){
            p.width = GameConfig.curWidth();
            p.height = GameConfig.curHeight();
        }


        public static getRealWidth(p: egret.DisplayObject){
            return p.width * p.scaleX;
        }

        public static getRealHeight(p: egret.DisplayObject){
            return p.height * p.scaleY;
        }
    }
}