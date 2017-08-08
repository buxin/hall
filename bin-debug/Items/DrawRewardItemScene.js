var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DrawRewardItemScene = (function (_super) {
    __extends(DrawRewardItemScene, _super);
    function DrawRewardItemScene(diamondNum) {
        var _this = _super.call(this) || this;
        _this.diamondNum = 0;
        _this.diamondNum = diamondNum;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/items/DrawRewardItem.exml";
        return _this;
    }
    DrawRewardItemScene.prototype.onComplete = function () {
        this.init();
    };
    DrawRewardItemScene.prototype.init = function () {
        this.gReward.visible = (this.diamondNum > 0);
        this.gNoReward.visible = (this.diamondNum <= 0);
        this.lDiamondNum.text = this.diamondNum + "钻";
        this.rectSelect.visible = false;
    };
    DrawRewardItemScene.prototype.setRectSelectVisible = function (value) {
        this.rectSelect.visible = value;
    };
    return DrawRewardItemScene;
}(eui.Component));
__reflect(DrawRewardItemScene.prototype, "DrawRewardItemScene");
//# sourceMappingURL=DrawRewardItemScene.js.map