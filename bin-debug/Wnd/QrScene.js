var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var QrScene = (function (_super) {
    __extends(QrScene, _super);
    function QrScene() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    QrScene.prototype.init = function () {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x0, 0.5);
        shape.graphics.drawRect(0, 0, MainScene.screen_width, MainScene.screen_height);
        shape.graphics.endFill();
        this.addChild(shape);
        // this.poster = new eui.Image(WndManager.root.main.protocol.photoPath);
        // this.poster.x = 78;
        // this.poster.y = 107;
        // this.addChild(this.poster);
        this.btnClose = new eui.Image(RES.getRes("btnClose_png"));
        this.btnClose.x = 570;
        this.btnClose.y = 60;
        this.addChild(this.btnClose);
        this.lTip = new eui.Label();
        this.lTip.x = 20;
        this.lTip.y = 700;
        this.lTip.size = 40;
        this.lTip.textColor = 0xffffff;
        this.lTip.text = "长按保存分享您的专属推广二维码";
        this.addChild(this.lTip);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
    };
    QrScene.prototype.btnCloseClick = function (e) {
        this.setVisible(false);
    };
    QrScene.prototype.setVisible = function (value) {
        this.visible = value;
        if (value) {
            var _x = "";
            var _y = "";
            var _w = "";
            var _h = "";
            _x = (78 / 640 * 100) + "%";
            _y = (107 / 1036 * 100) + "%";
            _w = (482 / 640 * 100) + "%";
            _h = (482 / 1036 * 100) + "%";
            this.myImg = document.createElement("img");
            this.myImg.src = WndManager.root.main.protocol.qrPathPrefix + WndManager.root.main.protocol.dataManager.MyPlayer.qrPath;
            this.myImg.style.width = _w;
            this.myImg.style.height = _h;
            this.myImg.style.position = "absolute";
            this.myImg.style.left = _x;
            this.myImg.style.top = _y;
            var divMain = document.getElementById("gameID");
            divMain.innerHTML = "";
            divMain.appendChild(this.myImg);
        }
        else {
            var divMain = document.getElementById("gameID");
            divMain.innerHTML = "";
        }
    };
    return QrScene;
}(eui.Component));
__reflect(QrScene.prototype, "QrScene");
//# sourceMappingURL=QrScene.js.map