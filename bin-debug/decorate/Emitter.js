var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Emitter = (function (_super) {
    __extends(Emitter, _super);
    function Emitter(delay, repeatCount, particlesNumSameTime, maxSpeedY, minSpeedY, root) {
        var _this = _super.call(this) || this;
        _this.allParticlesZones = [1, 2, 3, 4, 5, 6];
        _this.particlesArr = {};
        _this.idManager = new IdManager();
        _this.emitTimes = 0;
        _this.repeatCount = 0;
        _this.isPass = false;
        if (particlesNumSameTime <= 0)
            return _this;
        _this.particlesNumSameTime = particlesNumSameTime;
        _this.maxSpeedY = maxSpeedY;
        _this.minSpeedY = minSpeedY;
        _this.repeatCount = repeatCount;
        _this.delay = delay;
        _this.root = root;
        _this.initTimer(_this.repeatCount);
        return _this;
    }
    Emitter.prototype.initTimer = function (repeat) {
        //创建一个计时器对象
        this.repeatCount = repeat;
        this.timer = null;
        this.timer = new egret.Timer(this.delay, repeat);
        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        //开始计时
        this.timer.start();
    };
    Emitter.prototype.timerFunc = function () {
        this.checkTouchBottom();
        this.moveParticles();
        if (this.timer.currentCount % 2 == 0)
            this.createParticles();
    };
    Emitter.prototype.timerComFunc = function () {
        if (this.timer != null) {
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            this.timer.stop();
            this.timer = null;
        }
        this.clean();
    };
    Emitter.prototype.createParticles = function () {
        var i = 0;
        var born_zone_width = Math.floor(MainScene.screen_width / this.particlesNumSameTime);
        for (i = 0; i < this.particlesNumSameTime; i++) {
            //random
            var imgSequence = Math.floor(Math.random() * this.allParticlesZones.length);
            var imgNo = this.allParticlesZones[imgSequence];
            var id = this.idManager.getNewId();
            var ran = Math.random();
            if (ran < 0.5)
                ran = 0.5;
            var scale = ran;
            var angle = 90 * Math.floor(Math.random() * 4);
            var indexMod = this.emitTimes % 2;
            var startX = i * born_zone_width + Math.floor(Math.random() * born_zone_width); //横向平均分布
            var speedY = this.minSpeedY + Math.floor(Math.random() * (this.maxSpeedY - this.minSpeedY));
            var par = new Particle(imgNo, id, startX, scale, angle, speedY);
            this.particlesArr[id] = par;
            this.root.addChild(par);
        }
        this.emitTimes++;
    };
    Emitter.prototype.moveParticles = function () {
        var twMove;
        for (var id in this.particlesArr) {
            twMove = egret.Tween.get(this.particlesArr[id]);
            var targetY = this.particlesArr[id].y + this.particlesArr[id].getSpeedY();
            twMove.to({ y: (targetY) }, 1000);
        }
    };
    Emitter.prototype.clean = function () {
        for (var id in this.particlesArr) {
            this.root.removeChild(this.particlesArr[id]);
            delete this.particlesArr[id];
        }
    };
    //检查触底
    Emitter.prototype.checkTouchBottom = function () {
        for (var id in this.particlesArr) {
            if (this.particlesArr[id].y >= MainScene.screen_height) {
                this.removeParById(id);
            }
        }
    };
    Emitter.prototype.removeParById = function (id) {
        if (null != this.particlesArr[id] && null != this.particlesArr[id].parent) {
            console.log("id:" + id);
            this.particlesArr[id].clean();
            this.root.removeChild(this.particlesArr[id]);
            this.particlesArr[id] = null;
            delete this.particlesArr[id];
        }
    };
    return Emitter;
}(egret.Sprite));
__reflect(Emitter.prototype, "Emitter");
//# sourceMappingURL=Emitter.js.map