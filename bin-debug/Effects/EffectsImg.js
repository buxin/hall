var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EffectsImg = (function (_super) {
    __extends(EffectsImg, _super);
    function EffectsImg(img) {
        var _this = _super.call(this) || this;
        _this.img = img;
        if (null != _this.img)
            _this.addChild(_this.img);
        return _this;
    }
    //横向遮罩显示
    EffectsImg.prototype.continueShowHorizontal = function (color, alpha, maskX, maskY, maskWidth, maskHeight, rot, targetScaleX, moveTime) {
        var maskRect = new egret.Shape();
        maskRect.graphics.beginFill(color, this.alpha);
        maskRect.graphics.drawRect(maskX, maskY, maskWidth, maskHeight);
        maskRect.graphics.endFill();
        maskRect.rotation = rot;
        this.addChild(maskRect);
        this.img.mask = maskRect;
        egret.Tween.get(maskRect).to({ scaleX: targetScaleX }, moveTime);
    };
    //竖向遮罩显示
    EffectsImg.prototype.continueShowVertical = function (color, alpha, maskX, maskY, maskWidth, maskHeight, rot, targetScaleY, moveTime) {
        var maskRect = new egret.Shape();
        maskRect.graphics.beginFill(color, this.alpha);
        maskRect.graphics.drawRect(maskX, maskY, maskWidth, maskHeight);
        maskRect.graphics.endFill();
        maskRect.rotation = rot;
        this.addChild(maskRect);
        this.img.mask = maskRect;
        egret.Tween.get(maskRect).to({ scaleY: targetScaleY }, moveTime);
    };
    //吊钟摇摆效果
    EffectsImg.prototype.tickShaking = function (maxAngle, stepAngle, shakeTime) {
        this.maxAngle = maxAngle;
        this.stepAngle = stepAngle;
        this.shakeTime = shakeTime;
        this.startShaking();
    };
    EffectsImg.prototype.startShaking = function () {
        if (this.maxAngle >= 0) {
            egret.Tween.get(this.img).to({ rotation: 0 - this.maxAngle }, this.shakeTime).to({ rotation: this.maxAngle }, this.shakeTime).call(this.startShaking, this);
            this.maxAngle -= this.stepAngle;
        }
    };
    /*
    **流星坠落
    */
    EffectsImg.prototype.starFalling = function (startTime, flyWidth, imgWidth, imgHeight, targetX, targetY) {
        this.imgWidth = imgWidth;
        this.startX = this.x + imgWidth;
        this.scaleX = 0;
        this.scaleY = 0;
        this.visible = true;
        // var targetX:number = this.x-flyWidth;
        // var targetY:number = this.y + flyWidth*(imgHeight/imgWidth);
        egret.Tween.get(this, { onChange: this.onTweenMoveChange, onChangeObj: this }).wait(startTime).to({ scaleX: 1, scaleY: 1 }, 800);
        egret.Tween.get(this).wait(startTime + 800).to({ x: targetX, y: targetY, alpha: 0 }, 800);
    };
    EffectsImg.prototype.onTweenMoveChange = function () {
        this.x = this.startX - this.imgWidth * this.scaleX;
    };
    return EffectsImg;
}(eui.Component));
__reflect(EffectsImg.prototype, "EffectsImg");
//# sourceMappingURL=EffectsImg.js.map