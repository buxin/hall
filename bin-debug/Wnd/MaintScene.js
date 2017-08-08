var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MaintScene = (function (_super) {
    __extends(MaintScene, _super);
    function MaintScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/MaintWnd.exml";
        return _this;
    }
    MaintScene.prototype.onComplete = function () {
        this.bindElement();
    };
    MaintScene.prototype.bindElement = function () {
        this.maintBg = this["maintBg"];
        this.TimeLable.text = WndManager.root.main.dataManager.SystemData.maintendtime + "开放，敬请稍候";
    };
    return MaintScene;
}(WinBase));
__reflect(MaintScene.prototype, "MaintScene");
//# sourceMappingURL=MaintScene.js.map