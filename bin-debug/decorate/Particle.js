var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Particle = (function (_super) {
    __extends(Particle, _super);
    function Particle(imgNo, id, startX, scale, angle, speedY) {
        var _this = _super.call(this) || this;
        _this.collideRect = [];
        _this.imgNo = imgNo;
        _this.id = id;
        _this.startX = startX;
        _this.scale = scale;
        _this.angle = angle;
        _this.speedY = speedY;
        _this.initImg();
        return _this;
    }
    Particle.prototype.initImg = function () {
        this.img = new eui.Image(RES.getRes("star" + this.imgNo + "_png"));
        this.img.scaleX = this.scale;
        this.img.scaleY = this.scale;
        this.img.rotation = this.angle;
        this.addChild(this.img);
        this.x = this.startX;
        this.y = 50;
    };
    Particle.prototype.getSpeedY = function () {
        return this.speedY;
    };
    Particle.prototype.clean = function () {
        if (null != this.img.parent)
            this.removeChild(this.img);
        this.img = null;
    };
    return Particle;
}(egret.Sprite));
__reflect(Particle.prototype, "Particle");
//# sourceMappingURL=Particle.js.map