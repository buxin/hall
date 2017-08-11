var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DiscoveryScene = (function (_super) {
    __extends(DiscoveryScene, _super);
    function DiscoveryScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/DiscoveryWnd.exml";
        return _this;
    }
    DiscoveryScene.prototype.onComplete = function () {
        this.init();
    };
    DiscoveryScene.prototype.init = function () {
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.SystemData.DiscoveryData);
        this.dataList.itemRenderer = DiscoveryItemRender;
        this.scroller.viewport = this.dataList;
        this.scroller1.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.dataList1.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.SystemData.PKData);
        this.dataList1.itemRenderer = PKItemRender;
        this.scroller1.viewport = this.dataList1;
        this.drawScene = new DrawScene(this);
        this.drawScene.visible = false;
        this.addChild(this.drawScene);
        this.signDetailScene = new SignDetailScene();
        this.signDetailScene.visible = false;
        this.addChild(this.signDetailScene);
    };
    DiscoveryScene.prototype.openDrawScene = function () {
        this.drawScene.setVisible(true);
    };
    DiscoveryScene.prototype.openSignDetailScene = function () {
        this.signDetailScene.setVisible(true);
    };
    DiscoveryScene.prototype.agindis = function () {
        this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.SystemData.DiscoveryData);
        this.dataList1.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.SystemData.PKData);
    };
    return DiscoveryScene;
}(WinBase));
__reflect(DiscoveryScene.prototype, "DiscoveryScene");
//# sourceMappingURL=DiscoveryScene.js.map