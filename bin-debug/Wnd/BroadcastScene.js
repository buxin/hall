var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BroadcastScene = (function (_super) {
    __extends(BroadcastScene, _super);
    function BroadcastScene() {
        var _this = _super.call(this) || this;
        _this.broadcastTimes = 0;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/BroadcastWnd.exml";
        return _this;
    }
    BroadcastScene.prototype.onComplete = function () {
        this.init();
    };
    BroadcastScene.prototype.init = function () {
        this.lSystemInfo.multiline = false;
        this.lSystemInfo.wordWrap = false;
    };
    BroadcastScene.prototype.updateText = function () {
        this.lSystemInfo.text = WndManager.root.main.dataManager.SystemData.Inform;
        this.lSystemInfo.width = this.lSystemInfo.textWidth + 5;
    };
    BroadcastScene.prototype.broadcast = function () {
        this.updateText();
        this.broadcastTimes = 0;
        this.playTweenAni();
    };
    BroadcastScene.prototype.playTweenAni = function () {
        //根据公告内容有没有，来确定是否要播放，或者停止播放
        if (null != this.lSystemInfo.text && this.lSystemInfo.text != "") {
            if (null == this.tweenMove) {
                this.tweenMove = egret.Tween.get(this.lSystemInfo, { loop: true });
                this.tweenMove.to({ x: -this.lSystemInfo.width }, WndManager.root.main.dataManager.SystemData.broadcastInterval);
            }
        }
        else {
            if (null != this.tweenMove) {
                egret.Tween.removeTweens(this.lSystemInfo);
                this.tweenMove = null;
            }
        }
    };
    return BroadcastScene;
}(WinBase));
__reflect(BroadcastScene.prototype, "BroadcastScene");
//# sourceMappingURL=BroadcastScene.js.map