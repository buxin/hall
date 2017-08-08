var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FirstPageScene = (function (_super) {
    __extends(FirstPageScene, _super);
    function FirstPageScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/FirstPageWnd.exml";
        return _this;
    }
    FirstPageScene.prototype.onComplete = function () {
        this.init();
    };
    FirstPageScene.prototype.init = function () {
        this.initScene();
    };
    FirstPageScene.prototype.initScene = function () {
        this.topScene = new TopScene(GameConstant.TOPSCENE_LAYOUT_HALL);
        this.addChild(this.topScene);
        this.gameScene = new GameScene(this);
        this.gameScene.y = 88;
        this.addChild(this.gameScene);
        this.selectGameScene = new SelectGameScene();
        this.selectGameScene.visible = false;
        this.addChild(this.selectGameScene);
        this.signScene = new SignScene();
        this.signScene.visible = false;
        this.addChild(this.signScene);
        this.broadcastScene = new BroadcastScene();
        this.broadcastScene.y = 88;
        this.broadcastScene.visible = false;
        this.addChild(this.broadcastScene);
    };
    //打开广播
    FirstPageScene.prototype.broadcast = function (value) {
        this.broadcastScene.visible = value;
        if (value) {
            this.gameScene.y = 88 + 35;
            this.broadcastScene.broadcast();
        }
        else
            this.gameScene.y = 88;
    };
    FirstPageScene.prototype.screenAdapt = function () {
        for (var i = 0; i < this.numChildren; i++) {
            var dis = this.getChildAt(i);
            if (dis instanceof WinBase) {
                var win = dis;
                if (null != win)
                    win.screenAdapt();
            }
        }
    };
    FirstPageScene.prototype.selectGame = function (gameId) {
        if (gameId >= GameConstant.GAME_TYPE_MAJIANG && gameId <= GameConstant.GAME_TYPE_NIUNIU)
            this.selectGameScene.showSelectGameScene(true, gameId);
        // switch(gameId)
        // {
        // 	case GameConstant.GAME_TYPE_MAJIANG:
        // 		this.selectGameScene.setVisible(true)
        // 		break;
        // 	case GameConstant.GAME_TYPE_NIUNIU:
        // 		break;
        // 	default:
        // 		break;
        // }
    };
    FirstPageScene.prototype.openSignScene = function () {
        this.signScene.setVisible(true);
    };
    FirstPageScene.prototype.closeSignScene = function () {
        this.signScene.setVisible(false);
        this.topScene.initUI();
    };
    return FirstPageScene;
}(WinBase));
__reflect(FirstPageScene.prototype, "FirstPageScene");
//# sourceMappingURL=FirstPageScene.js.map