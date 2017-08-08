var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Withdraw = (function () {
    function Withdraw(obj) {
        this.id = Number(obj.id);
        this.cnum = Number(obj.cnum);
        this.bankname = obj.bankname;
        this.accoutno = obj.accoutno;
        this.status = Number(obj.status);
        this.time1 = obj.time1;
        this.time2 = obj.time2;
        this.time3 = obj.time3;
        this.time4 = obj.time4;
    }
    return Withdraw;
}());
__reflect(Withdraw.prototype, "Withdraw");
//# sourceMappingURL=Withdraw.js.map