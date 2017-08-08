var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*推广申请界面 */
var PromotionScene6 = (function (_super) {
    __extends(PromotionScene6, _super);
    function PromotionScene6() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/PromotionWnd6.exml";
        return _this;
    }
    PromotionScene6.prototype.onComplete = function () {
        this.init();
        this.initListener();
    };
    PromotionScene6.prototype.initListener = function () {
        this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
    };
    PromotionScene6.prototype.release = function () {
        this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
    };
    PromotionScene6.prototype.HandleBack = function () {
        this.visible = false;
    };
    PromotionScene6.prototype.init = function () {
        this.addEventListener("withdrawItemClick", this.withdrawItemClick, this);
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.dataList.itemRenderer = WithdrawItemRender;
        this.scroller.viewport = this.dataList;
        this.promotionScene7 = new PromotionScene7();
        this.promotionScene7.visible = false;
        this.addChild(this.promotionScene7);
    };
    //打开单个提现记录界面
    PromotionScene6.prototype.withdrawItemClick = function (e) {
        var itemId = Number(e.data);
        var wData = WndManager.root.main.dataManager.MyPlayer.getWithdrawDataById(itemId);
        if (null != wData) {
            this.promotionScene7.show(true, wData);
        }
    };
    PromotionScene6.prototype.initData = function () {
        this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.MyPlayer.withdrawArr);
    };
    PromotionScene6.prototype.setVisible = function (value) {
        this.visible = value;
        if (value) {
            this.initData();
        }
    };
    return PromotionScene6;
}(WinBase));
__reflect(PromotionScene6.prototype, "PromotionScene6");
//# sourceMappingURL=PromotionScene6.js.map