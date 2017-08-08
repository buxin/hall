var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShareScene = (function (_super) {
    __extends(ShareScene, _super);
    function ShareScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/ShareWnd.exml";
        return _this;
    }
    ShareScene.prototype.onComplete = function () {
        this.bindElement();
    };
    ShareScene.prototype.bindElement = function () {
        this.shareBg = this["shareBg"];
        this.shareBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnReturnClick, this);
    };
    ShareScene.prototype.btnReturnClick = function (e) {
        this.visible = false;
    };
    return ShareScene;
}(WinBase));
__reflect(ShareScene.prototype, "ShareScene");
//# sourceMappingURL=ShareScene.js.map