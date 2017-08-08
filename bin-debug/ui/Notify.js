var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var Notify = (function (_super) {
    __extends(Notify, _super);
    function Notify() {
        return _super.call(this) || this;
    }
    Notify.NotifyMsg = function (msg) {
        //Notify.root.notify.NotifyMsg(msg);
    };
    Notify.prototype.NotifyMsg = function (msg) {
        var sp = new egret.Sprite;
        this.addChild(sp);
        var txt = new egret.TextField;
        txt.text = msg;
        txt.size = 25;
        this.addChild(txt);
        txt.textColor = 0xff0000;
        txt.x = Notify.root.stage.stageWidth;
        txt.stroke = 1;
        txt.strokeColor = 0xfcc800;
        txt.y = 200;
        var nX = (Notify.root.stage.stageWidth - txt.width) / 2;
        txt.bold = true;
        var self = this;
        sp.graphics.beginFill(0xffffff, 1);
        sp.graphics.drawRoundRect(0, 0, txt.width + 40, txt.height + 10, 10, 10);
        sp.graphics.endFill();
        sp.x = txt.x - 20;
        sp.y = txt.y - 5;
        egret.Tween.get(txt).to({ x: nX }, 400).wait(1000).to({ x: -Notify.root.stage.stageWidth }, 400).call(function () {
            self.removeChild(txt);
        }, this);
        egret.Tween.get(sp).to({ x: nX - 20 }, 400).wait(1000).to({ x: -Notify.root.stage.stageWidth - 20 }, 400).call(function () {
            self.removeChild(sp);
        }, this);
    };
    return Notify;
}(WinBase));
__reflect(Notify.prototype, "Notify");
//# sourceMappingURL=Notify.js.map