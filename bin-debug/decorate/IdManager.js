var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var IdManager = (function () {
    function IdManager() {
        this.resetId();
    }
    IdManager.prototype.resetId = function () {
        this.id = IdManager.START_ID;
    };
    IdManager.prototype.getNewId = function () {
        var retId = this.id;
        this.id++;
        return retId;
    };
    return IdManager;
}());
IdManager.START_ID = 0;
__reflect(IdManager.prototype, "IdManager");
//# sourceMappingURL=IdManager.js.map