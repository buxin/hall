var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ContinueFIxedMove = (function () {
    function ContinueFIxedMove(img, points, timeArr, visilbeEnd) {
        this.points = [];
        this.timeArr = [];
        this.moveTimes = 0;
        this.visibleEnd = true;
        this.img = img;
        this.points = points;
        this.timeArr = timeArr;
        this.moveTimes = 0;
        this.visibleEnd = visilbeEnd;
    }
    ContinueFIxedMove.prototype.move = function () {
        if (null != this.img && null != this.points && this.points.length > 0 && null != this.timeArr && this.timeArr.length > 0) {
            var len = this.points.length;
            if (len % 2 == 0) {
                this.startMove();
            }
        }
    };
    ContinueFIxedMove.prototype.startMove = function () {
        if (this.points.length >= (this.moveTimes * 2) + 4) {
            this.img.x = this.points[this.moveTimes * 2 + 0];
            this.img.y = this.points[this.moveTimes * 2 + 1];
            var targetX = this.points[this.moveTimes * 2 + 2];
            var targetY = this.points[this.moveTimes * 2 + 3];
            egret.Tween.get(this.img).to({ x: targetX, y: targetY }, this.timeArr[this.moveTimes]).call(this.startMove, this);
            this.moveTimes++;
        }
        else {
            this.img.visible = this.visibleEnd;
        }
    };
    return ContinueFIxedMove;
}());
__reflect(ContinueFIxedMove.prototype, "ContinueFIxedMove");
//# sourceMappingURL=ContinueFIxedMove.js.map