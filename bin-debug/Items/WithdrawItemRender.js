var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WithdrawItemRender = (function (_super) {
    __extends(WithdrawItemRender, _super);
    function WithdrawItemRender() {
        var _this = _super.call(this) || this;
        _this.itemId = 0;
        _this.touchChildren = true;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/items/WithdrawItem.exml";
        return _this;
    }
    WithdrawItemRender.prototype.onComplete = function () {
        this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleItemClick, this);
    };
    WithdrawItemRender.prototype.dataChanged = function () {
        // 将数据对应到组件上
        this.itemId = Number(this.data.id);
        var cNub = (Number(this.data.cnum) / 100);
        this.lInfo.text = "提现" + cNub + "元";
        this.lTime.text = this.data.time1;
        var status = Number(this.data.status);
        switch (status) {
            case 1:
                this.lStatus.text = "发起申请";
                break;
            case 2:
                this.lStatus.text = "提交银行";
                break;
            case 3:
                this.lStatus.text = "提现成功";
                break;
            case 4:
                this.lStatus.text = "提现失败";
                break;
        }
    };
    WithdrawItemRender.prototype.handleItemClick = function (e) {
        var event = new egret.Event("withdrawItemClick", true, false, this.itemId);
        this.dispatchEvent(event);
    };
    return WithdrawItemRender;
}(eui.ItemRenderer));
__reflect(WithdrawItemRender.prototype, "WithdrawItemRender");
//# sourceMappingURL=WithdrawItemRender.js.map