var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*推广申请界面 */
var PromotionScene3 = (function (_super) {
    __extends(PromotionScene3, _super);
    function PromotionScene3() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/PromotionWnd3.exml";
        return _this;
    }
    PromotionScene3.prototype.onComplete = function () {
        this.init();
        this.initListener();
    };
    PromotionScene3.prototype.init = function () {
        this.initData();
    };
    PromotionScene3.prototype.initListener = function () {
        this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
    };
    PromotionScene3.prototype.release = function () {
        this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.HandleBack, this);
    };
    PromotionScene3.prototype.HandleBack = function () {
        this.visible = false;
    };
    PromotionScene3.prototype.initData = function () {
        this.lReason.text = "";
        if (null != WndManager.root.main.dataManager.MyPlayer.promotion) {
            this.lReason.text = WndManager.root.main.dataManager.MyPlayer.promotion.denyreason;
        }
    };
    PromotionScene3.prototype.setVisible = function (value) {
        this.visible = value;
        if (value) {
            this.initData();
        }
    };
    return PromotionScene3;
}(WinBase));
__reflect(PromotionScene3.prototype, "PromotionScene3");
//# sourceMappingURL=PromotionScene3.js.map