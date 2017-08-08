var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DiscoveryItemRender = (function (_super) {
    __extends(DiscoveryItemRender, _super);
    function DiscoveryItemRender() {
        var _this = _super.call(this) || this;
        _this.itemId = 0;
        _this.touchChildren = true;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/items/DiscoveryItem.exml";
        return _this;
    }
    DiscoveryItemRender.prototype.onComplete = function () {
        this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleItemClick, this);
    };
    DiscoveryItemRender.prototype.dataChanged = function () {
        // 将数据对应到组件上
        this.itemId = Number(this.data.itemId);
        this.icon.source = RES.getRes(this.data.imgSource);
        this.lItemName.text = this.data.itemName;
        this.lItemDesc.text = this.data.itemDesc;
        this.lItemNews.textFlow = this.data.itemNews;
    };
    DiscoveryItemRender.prototype.handleItemClick = function (e) {
        var event = new egret.Event("discoveryJump", true, false, this.itemId);
        this.dispatchEvent(event);
    };
    return DiscoveryItemRender;
}(eui.ItemRenderer));
__reflect(DiscoveryItemRender.prototype, "DiscoveryItemRender");
//# sourceMappingURL=DiscoveryItemRender.js.map