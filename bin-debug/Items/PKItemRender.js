var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PKItemRender = (function (_super) {
    __extends(PKItemRender, _super);
    function PKItemRender() {
        var _this = _super.call(this) || this;
        _this.pkId = 0;
        _this.touchChildren = true;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/items/PKItem.exml";
        return _this;
    }
    PKItemRender.prototype.onComplete = function () {
        this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleItemClick, this);
    };
    PKItemRender.prototype.dataChanged = function () {
        // 将数据对应到组件上
        this.pkId = Number(this.data.pkId);
        this.icon.source = RES.getRes(this.data.imgSource);
        this.lItemName.textFlow = this.data.itemName;
        this.lItemOnline.textFlow = this.data.itemOnlineNum;
        this.lItemDesc.textFlow = this.data.itemDesc;
        this.lItemCondition.textFlow = this.data.itemConditionNum;
    };
    PKItemRender.prototype.handleItemClick = function (e) {
        var event = new egret.Event("discoveryJump", true, false, this.pkId);
        this.dispatchEvent(event);
    };
    return PKItemRender;
}(eui.ItemRenderer));
__reflect(PKItemRender.prototype, "PKItemRender");
//# sourceMappingURL=PKItemRender.js.map