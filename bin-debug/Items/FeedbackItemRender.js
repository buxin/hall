var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FeedbackItemRender = (function (_super) {
    __extends(FeedbackItemRender, _super);
    function FeedbackItemRender() {
        var _this = _super.call(this) || this;
        _this.itemId = 0;
        _this.touchChildren = true;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/items/FeedbackItem.exml";
        return _this;
    }
    FeedbackItemRender.prototype.onComplete = function () {
        // this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleItemClick,this);
    };
    FeedbackItemRender.prototype.dataChanged = function () {
        // 将数据对应到组件上
        this.lTime.text = this.data.fbtime;
        this.lIssues.text = this.data.issues;
        this.lReply.text = this.data.reply;
    };
    return FeedbackItemRender;
}(eui.ItemRenderer));
__reflect(FeedbackItemRender.prototype, "FeedbackItemRender");
//# sourceMappingURL=FeedbackItemRender.js.map