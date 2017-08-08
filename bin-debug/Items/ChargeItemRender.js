var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChargeItemRender = (function (_super) {
    __extends(ChargeItemRender, _super);
    function ChargeItemRender() {
        var _this = _super.call(this) || this;
        _this.id = -1;
        _this.name = "chargeitemrender";
        _this.touchChildren = true;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/items/ChargeItem.exml";
        return _this;
    }
    ChargeItemRender.prototype.onComplete = function () {
        this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleItemClick, this);
    };
    ChargeItemRender.prototype.dataChanged = function () {
        // 将数据对应到组件上
        this.lDiamondNum.text = this.data.jewel;
        this.lMoney.text = this.data.money + "元";
        this.id = this.data.id;
    };
    ChargeItemRender.prototype.handleItemClick = function (e) {
        //充值
        WndManager.root.main.protocol.addEventListener("Onpay", this.Onpay, this);
        WndManager.root.main.protocol.getPay(this.id);
        this.rectTouch.touchEnabled = false;
    };
    ChargeItemRender.prototype.Onpay = function () {
        this.rectTouch.touchEnabled = true;
        payment({ appId: WndManager.root.main.protocol.dataManager.MyPlayer.AppId,
            timeStamp: WndManager.root.main.protocol.dataManager.MyPlayer.TimeStamp,
            nonceStr: WndManager.root.main.protocol.dataManager.MyPlayer.NonceStr,
            prepay_id: WndManager.root.main.protocol.dataManager.MyPlayer.Prepay_id,
            signType: WndManager.root.main.protocol.dataManager.MyPlayer.SignType,
            paySign: WndManager.root.main.protocol.dataManager.MyPlayer.PaySign });
    };
    ChargeItemRender.prototype.fundcz = function (str) {
        egret.log(str);
        WndManager.root.main.protocol.addEventListener("onzuanshiNum", this.onzuanshiNum, this);
        WndManager.root.main.protocol.zuanshiNum();
    };
    ChargeItemRender.prototype.onzuanshiNum = function () {
    };
    return ChargeItemRender;
}(eui.ItemRenderer));
__reflect(ChargeItemRender.prototype, "ChargeItemRender");
//# sourceMappingURL=ChargeItemRender.js.map