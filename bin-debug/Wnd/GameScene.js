var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene(firstPageScene) {
        var _this = _super.call(this) || this;
        _this.firstPageScene = firstPageScene;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/GameWnd.exml";
        return _this;
    }
    GameScene.prototype.onComplete = function () {
        this.init();
    };
    GameScene.prototype.init = function () {
        //	this.hideImg2.visible = (WndManager.root.main.dataManager.MyPlayer.roles == 0);
        //	this.hideImg3.visible = (WndManager.root.main.dataManager.MyPlayer.roles == 0);
        this.initListener();
    };
    GameScene.prototype.initListener = function () {
        this.game1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleGame1Click, this);
        this.game2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleGame2Click, this);
        this.game3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleGame3Click, this);
    };
    //进入麻将游戏
    GameScene.prototype.handleGame1Click = function (e) {
        this.firstPageScene.selectGame(GameConstant.GAME_TYPE_MAJIANG);
    };
    //进入西周麻将
    GameScene.prototype.handleGame2Click = function (e) {
        this.firstPageScene.selectGame(GameConstant.GAME_TYPE_XIZHOU);
    };
    //进入牛牛
    GameScene.prototype.handleGame3Click = function (e) {
        this.firstPageScene.selectGame(GameConstant.GAME_TYPE_NIUNIU);
    };
    GameScene.prototype.release = function () {
        this.game1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleGame1Click, this);
        this.game2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleGame2Click, this);
        this.game3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleGame3Click, this);
    };
    return GameScene;
}(WinBase));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map