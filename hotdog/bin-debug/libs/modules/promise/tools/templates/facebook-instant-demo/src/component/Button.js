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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(label) {
        var _this = _super.call(this) || this;
        _this.isUp = true;
        _this.drawText(label);
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touch_begin, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.touch_end, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.click, _this);
        _this.draw();
        _this.touchEnabled = true;
        return _this;
    }
    Button.prototype.touch_begin = function (evt) {
        this.isUp = false;
        this.draw();
    };
    Button.prototype.touch_end = function (evt) {
        this.isUp = true;
        this.draw();
    };
    Button.prototype.click = function (evt) {
        this.dispatchEvent(new egret.Event("CHAGE_STAGE"));
    };
    Button.prototype.draw = function () {
        this.graphics.clear();
        this.removeChildren();
        if (this.isUp) {
            this.drawUp();
        }
        else {
            this.drawDown();
        }
        this.addChild(this.textF);
    };
    Button.prototype.drawText = function (label) {
        if (this.textF == null) {
            var text = new egret.TextField();
            text.text = label;
            text.width = (Context.stageWidth - 30) / 2;
            text.height = 35;
            text.size = 22;
            text.verticalAlign = egret.VerticalAlign.MIDDLE;
            text.textAlign = egret.HorizontalAlign.CENTER;
            this.textF = text;
            this.textF.strokeColor = 0x292b2f;
        }
    };
    Button.prototype.drawUp = function () {
        this.graphics.beginFill(0x666666);
        this.graphics.lineStyle(2, 0x282828);
        this.graphics.drawRoundRect(0, 0, (Context.stageWidth - 30) / 2, 35, 15, 15);
        this.graphics.endFill();
        this.graphics.lineStyle(2, 0x909090, 0.5);
        this.graphics.moveTo(5, 2);
        this.graphics.lineTo((Context.stageWidth - 30) / 2 - 5, 2);
        this.graphics.endFill();
        this.graphics.lineStyle(2, 0x676767, 0.7);
        this.graphics.moveTo(5, 37);
        this.graphics.lineTo((Context.stageWidth - 30) / 2 - 5, 37);
        this.graphics.endFill();
        this.textF.stroke = 0;
    };
    Button.prototype.drawDown = function () {
        this.graphics.beginFill(0x3b3b3b);
        this.graphics.lineStyle(2, 0x282828);
        this.graphics.drawRoundRect(0, 0, (Context.stageWidth - 30) / 2, 35, 15, 15);
        this.graphics.endFill();
        this.graphics.lineStyle(2, 0x313131, 0.5);
        this.graphics.moveTo(5, 2);
        this.graphics.lineTo((Context.stageWidth - 30) / 2 - 5, 2);
        this.graphics.endFill();
        this.graphics.lineStyle(2, 0x676767, 0.7);
        this.graphics.moveTo(5, 37);
        this.graphics.lineTo((Context.stageWidth - 30) / 2 - 5, 37);
        this.graphics.endFill();
        this.textF.stroke = 1;
    };
    return Button;
}(egret.Sprite));
__reflect(Button.prototype, "Button");
//# sourceMappingURL=Button.js.map