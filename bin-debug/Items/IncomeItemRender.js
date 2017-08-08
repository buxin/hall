var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IncomeItemRender = (function (_super) {
    __extends(IncomeItemRender, _super);
    function IncomeItemRender() {
        var _this = _super.call(this) || this;
        _this.itemId = 0;
        _this.touchChildren = true;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/items/IncomeItem.exml";
        return _this;
    }
    IncomeItemRender.prototype.onComplete = function () {
        // this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleItemClick,this);
    };
    IncomeItemRender.prototype.dataChanged = function () {
        // 将数据对应到组件上
        //      this.itemId = Number(this.data.id);
        // this.lInfo.text = this.data.chargenick+" 充值"+this.data.chargenum;
        var yuan1 = (Number(this.data.cnum) / 100) + "";
        var yuan = (Number(this.data.chargenum) / 100) + "";
        this.lInfo.textFlow = [{ text: this.data.chargenick + " 充值", style: { "textColor": 0x0, "size": 24 } },
            { text: yuan, style: { "textColor": 0xff0000, "size": 24 } },
            { text: "元", style: { "textColor": 0x0, "size": 24 } }];
        this.lTime.text = this.data.ctime;
        this.lMoneny.textFlow = [
            { text: yuan1, style: { "textColor": 0x11bf80, "size": 20 } },
            { text: "元", style: { "textColor": 0x0, "size": 20 } }
        ];
    };
    return IncomeItemRender;
}(eui.ItemRenderer));
__reflect(IncomeItemRender.prototype, "IncomeItemRender");
//# sourceMappingURL=IncomeItemRender.js.map