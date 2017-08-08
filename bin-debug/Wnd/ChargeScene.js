var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChargeScene = (function (_super) {
    __extends(ChargeScene, _super);
    function ChargeScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/ChargeWnd.exml";
        return _this;
    }
    ChargeScene.prototype.onComplete = function () {
        this.init();
    };
    ChargeScene.prototype.init = function () {
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.SystemData.ChargeData);
        this.dataList.itemRenderer = ChargeItemRender;
        this.scroller.viewport = this.dataList;
    };
    return ChargeScene;
}(WinBase));
__reflect(ChargeScene.prototype, "ChargeScene");
//# sourceMappingURL=ChargeScene.js.map