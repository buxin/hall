var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SignInfoItemRender = (function (_super) {
    __extends(SignInfoItemRender, _super);
    function SignInfoItemRender() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/items/SignInfoItem.exml";
        return _this;
    }
    SignInfoItemRender.prototype.onComplete = function () {
    };
    SignInfoItemRender.prototype.dataChanged = function () {
        // 将数据对应到组件上
        this.lInfo.text = this.data.info;
    };
    return SignInfoItemRender;
}(eui.ItemRenderer));
__reflect(SignInfoItemRender.prototype, "SignInfoItemRender");
//# sourceMappingURL=SignInfoItemRender.js.map