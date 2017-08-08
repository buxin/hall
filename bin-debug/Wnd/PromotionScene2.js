var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*推广申请界面 */
var PromotionScene2 = (function (_super) {
    __extends(PromotionScene2, _super);
    function PromotionScene2() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/PromotionWnd2.exml";
        return _this;
    }
    PromotionScene2.prototype.onComplete = function () {
        this.init();
        this.initListener();
    };
    PromotionScene2.prototype.init = function () {
        this.initData();
    };
    PromotionScene2.prototype.initListener = function () {
        this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
    };
    PromotionScene2.prototype.release = function () {
        this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
    };
    PromotionScene2.prototype.HandleBack = function () {
        this.visible = false;
    };
    PromotionScene2.prototype.initData = function () {
        this.imgStatus0.visible = false;
        this.imgStatus1.visible = false;
        this.imgStatus2.visible = false;
        if (null != WndManager.root.main.dataManager.MyPlayer.promotion) {
            switch (WndManager.root.main.dataManager.MyPlayer.promotion.status) {
                case GameConstant.PROMOTION_STATUS_SUBMIT:
                    this.imgStatus0.visible = true;
                    break;
                case GameConstant.PROMOTION_STATUS_CHECKING:
                    this.imgStatus1.visible = true;
                    break;
                case GameConstant.PROMOTION_STATUS_PASS:
                    this.imgStatus2.visible = true;
                    break;
            }
        }
    };
    PromotionScene2.prototype.setVisible = function (value) {
        this.visible = value;
        if (value) {
            this.initData();
        }
    };
    return PromotionScene2;
}(WinBase));
__reflect(PromotionScene2.prototype, "PromotionScene2");
//# sourceMappingURL=PromotionScene2.js.map