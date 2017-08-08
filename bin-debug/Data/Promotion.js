var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Promotion = (function () {
    function Promotion(jsObj) {
        this.id = Number(jsObj.promotion.id);
        this.nick = jsObj.promotion.nick;
        this.name = jsObj.promotion.name;
        this.contact = jsObj.promotion.contact;
        this.gName = jsObj.promotion.gName;
        this.wechatNo = jsObj.promotion.wechatNo;
        this.sTime = jsObj.promotion.sTime;
        this.status = Number(jsObj.promotion.status);
        this.viewresult = Number(jsObj.promotion.viewresult);
        this.denyreason = jsObj.promotion.denyreason;
    }
    return Promotion;
}());
__reflect(Promotion.prototype, "Promotion");
//# sourceMappingURL=Promotion.js.map