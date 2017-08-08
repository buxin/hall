var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NotityWnd = (function (_super) {
    __extends(NotityWnd, _super);
    function NotityWnd() {
        var _this = _super.call(this) || this;
        _this.msgLabel = new eui.Label();
        _this.msgLabel.x = 0;
        _this.msgLabel.y = 0;
        _this.addChild(_this.msgLabel);
        return _this;
    }
    NotityWnd.prototype.show = function (msg, textColor, stroke, strokeColor, move, startX, startY, endX, endY, duration) {
        var sp = new egret.Sprite;
        this.addChild(sp);
        var txt = new egret.TextField;
        txt.text = msg;
        txt.size = 25;
        this.addChild(txt);
        txt.textColor = 0x666666;
        txt.x = 640;
        //   txt.stroke = 1;
        //   txt.strokeColor = 0x666666;
        txt.y = 200;
        var nX = (640 - txt.width) / 2;
        txt.bold = true;
        var self = this;
        sp.graphics.beginFill(0xffffff, 1);
        sp.graphics.drawRoundRect(0, 0, txt.width + 40, txt.height + 10, 10, 10);
        sp.graphics.endFill();
        sp.x = txt.x - 20;
        sp.y = txt.y - 5;
        //
        egret.Tween.get(txt).to({ x: nX }, 400).wait(1000).to({ x: -640 }, 400).call(function () {
            self.removeChild(txt);
        }, this);
        egret.Tween.get(sp).to({ x: nX - 20 }, 400).wait(1000).to({ x: -640 - 20 }, 400).call(function () {
            self.removeChild(sp);
        }, this);
    };
    NotityWnd.prototype.onTweenComplete = function () {
        this.visible = false;
    };
    return NotityWnd;
}(eui.Component));
NotityWnd.MOVE_HORIZONTAL = "MOVE_HORIZONTAL";
__reflect(NotityWnd.prototype, "NotityWnd");
//# sourceMappingURL=NotityWnd.js.map