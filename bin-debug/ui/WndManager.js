/**
 *
 * @author
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WIN_OPERATOR;
(function (WIN_OPERATOR) {
    WIN_OPERATOR[WIN_OPERATOR["WIN_OPEN_NEW"] = 0] = "WIN_OPEN_NEW";
    WIN_OPERATOR[WIN_OPERATOR["WIN_CLOSE_DELETE"] = 1] = "WIN_CLOSE_DELETE";
    WIN_OPERATOR[WIN_OPERATOR["WIN_CLOSE_HIDE"] = 2] = "WIN_CLOSE_HIDE";
    WIN_OPERATOR[WIN_OPERATOR["WIN_OPEN_SHOW"] = 3] = "WIN_OPEN_SHOW";
    WIN_OPERATOR[WIN_OPERATOR["WIN_OPEN_SHOW_OR_HIDE"] = 4] = "WIN_OPEN_SHOW_OR_HIDE";
    WIN_OPERATOR[WIN_OPERATOR["WIN_OPEN_SHOW_AND_HIDE_OTHER"] = 5] = "WIN_OPEN_SHOW_AND_HIDE_OTHER";
})(WIN_OPERATOR || (WIN_OPERATOR = {}));
var WIN_EFFECT;
(function (WIN_EFFECT) {
    WIN_EFFECT[WIN_EFFECT["EFFECT_WIN_CLOSE_BEGIN"] = 0] = "EFFECT_WIN_CLOSE_BEGIN";
    WIN_EFFECT[WIN_EFFECT["EFFECT_WIN_CLOSE_MOVE_LEFT"] = 1] = "EFFECT_WIN_CLOSE_MOVE_LEFT";
    WIN_EFFECT[WIN_EFFECT["EFFECT_WIN_CLOSE_MOVE_RIGHT"] = 2] = "EFFECT_WIN_CLOSE_MOVE_RIGHT";
    WIN_EFFECT[WIN_EFFECT["EFFECT_WIN_CLOSE_MOVE_UP"] = 3] = "EFFECT_WIN_CLOSE_MOVE_UP";
    WIN_EFFECT[WIN_EFFECT["EFFECT_WIN_CLOSE_MOVE_DOWN"] = 4] = "EFFECT_WIN_CLOSE_MOVE_DOWN";
    WIN_EFFECT[WIN_EFFECT["EFFECT_WIN_CLOSE_SCALE"] = 5] = "EFFECT_WIN_CLOSE_SCALE";
    WIN_EFFECT[WIN_EFFECT["EFFECT_WIN_CLOSE_ALPHA"] = 6] = "EFFECT_WIN_CLOSE_ALPHA";
    WIN_EFFECT[WIN_EFFECT["EFFECT_WIN_CLOSE_END"] = 7] = "EFFECT_WIN_CLOSE_END";
    WIN_EFFECT[WIN_EFFECT["EFFECT_WIN_OPEN_MOVE_LEFT"] = 8] = "EFFECT_WIN_OPEN_MOVE_LEFT";
    WIN_EFFECT[WIN_EFFECT["EFFECT_WIN_OPEN_MOVE_RIGHT"] = 9] = "EFFECT_WIN_OPEN_MOVE_RIGHT";
    WIN_EFFECT[WIN_EFFECT["EFFECT_WIN_OPEN_MOVE_UP"] = 10] = "EFFECT_WIN_OPEN_MOVE_UP";
    WIN_EFFECT[WIN_EFFECT["EFFECT_WIN_OPEN_MOVE_DOWN"] = 11] = "EFFECT_WIN_OPEN_MOVE_DOWN";
    WIN_EFFECT[WIN_EFFECT["EFFECT_WIN_OPEN_SCALE"] = 12] = "EFFECT_WIN_OPEN_SCALE";
    WIN_EFFECT[WIN_EFFECT["EFFECT_WIN_OPEN_ALPHA"] = 13] = "EFFECT_WIN_OPEN_ALPHA";
    WIN_EFFECT[WIN_EFFECT["EFFECT_WIN_OPEN_END"] = 14] = "EFFECT_WIN_OPEN_END";
})(WIN_EFFECT || (WIN_EFFECT = {}));
var WndManager = (function (_super) {
    __extends(WndManager, _super);
    function WndManager() {
        var _this = _super.call(this) || this;
        _this.wins = [];
        return _this;
    }
    /***
     * 窗口打开
     * @param wnd 窗口类型
     * @openType 打开方式
     * @efect 打开特效
     */
    WndManager.prototype.switchWnd = function (wndClazz, openType, efect, data) {
        if (data === void 0) { data = null; }
        var wnd = null;
        switch (openType) {
            case WIN_OPERATOR.WIN_OPEN_SHOW_AND_HIDE_OTHER:
                for (var i = 0; i < this.wins.length; i++) {
                    if (this.wins[i] instanceof wndClazz) {
                        wnd = this.wins[i];
                    }
                    else
                        this.wins[i].visible = false;
                }
                if (wnd == null) {
                    wnd = new wndClazz;
                    this.wins.push(wnd);
                }
                this.addChild(wnd);
                wnd.visible = true;
                break;
            case WIN_OPERATOR.WIN_OPEN_NEW:
                wnd = new wndClazz;
                this.addChild(wnd);
                this.wins.push(wnd);
                break;
            case WIN_OPERATOR.WIN_OPEN_SHOW:
                for (var i = 0; i < this.wins.length; i++) {
                    if (this.wins[i] instanceof wndClazz) {
                        wnd = this.wins[i];
                        break;
                    }
                }
                if (wnd == null) {
                    wnd = new wndClazz;
                    this.wins.push(wnd);
                }
                this.addChild(wnd);
                wnd.visible = true;
                break;
            case WIN_OPERATOR.WIN_CLOSE_DELETE:
                for (var i = 0; i < this.wins.length; i++) {
                    if (this.wins[i] instanceof wndClazz) {
                        wnd = this.wins[i];
                        this.wins.splice(i, 1);
                        break;
                    }
                }
                break;
            case WIN_OPERATOR.WIN_CLOSE_HIDE:
                for (var i = 0; i < this.wins.length; i++) {
                    if (this.wins[i] instanceof wndClazz) {
                        wnd = this.wins[i];
                        break;
                    }
                }
                if (wnd == null) {
                    wnd = new wndClazz;
                    this.wins.push(wnd);
                }
                this.addChild(wnd);
                break;
            case WIN_OPERATOR.WIN_OPEN_SHOW_OR_HIDE:
                for (var i = 0; i < this.wins.length; i++) {
                    if (this.wins[i] instanceof wndClazz) {
                        wnd = this.wins[i];
                        break;
                    }
                }
                if (wnd == null) {
                    wnd = new wndClazz;
                    this.wins.push(wnd);
                }
                this.addChild(wnd);
                wnd.visible = false;
                break;
        }
        if (wnd != null && data != null) {
            wnd.setData(data);
        }
        if (wnd == null) {
            console.error("wnd can't null !!!!!!!!'");
            return wnd;
        }
        var easeVal = null;
        if (efect == null || efect == 0) {
            //窗口没有特效
            if (openType == WIN_OPERATOR.WIN_CLOSE_HIDE) {
                wnd.visible = false;
            }
            else if (openType == WIN_OPERATOR.WIN_CLOSE_DELETE) {
                wnd.Destroy();
            }
            else if (openType == WIN_OPERATOR.WIN_OPEN_SHOW_OR_HIDE) {
                wnd.visible = !wnd.visible;
            }
        }
        else if (efect > WIN_EFFECT.EFFECT_WIN_CLOSE_END && efect < WIN_EFFECT.EFFECT_WIN_OPEN_END) {
            //窗口打开特效
            switch (efect) {
                case WIN_EFFECT.EFFECT_WIN_OPEN_MOVE_LEFT:
                    wnd.x = -WndManager.root.stage.stageWidth;
                    wnd.y = 0;
                    wnd.scaleX = 1;
                    wnd.scaleY = 1;
                    easeVal = egret.Ease.bounceOut;
                    break;
                case WIN_EFFECT.EFFECT_WIN_OPEN_MOVE_RIGHT:
                    wnd.x = WndManager.root.stage.stageWidth;
                    wnd.y = 0;
                    wnd.scaleX = 1;
                    wnd.scaleY = 1;
                    easeVal = egret.Ease.bounceOut;
                    break;
                case WIN_EFFECT.EFFECT_WIN_OPEN_MOVE_UP:
                    wnd.x = 0;
                    wnd.y = -WndManager.root.stage.stageHeight;
                    wnd.scaleX = 1;
                    wnd.scaleY = 1;
                    easeVal = egret.Ease.bounceOut;
                    break;
                case WIN_EFFECT.EFFECT_WIN_OPEN_MOVE_DOWN:
                    wnd.x = 0;
                    wnd.y = WndManager.root.stage.stageHeight;
                    wnd.scaleX = 1;
                    wnd.scaleY = 1;
                    easeVal = egret.Ease.bounceOut;
                    break;
                case WIN_EFFECT.EFFECT_WIN_OPEN_SCALE:
                    wnd.x = WndManager.root.stage.stageWidth >> 1;
                    wnd.y = WndManager.root.stage.stageHeight >> 1;
                    wnd.scaleX = 0;
                    wnd.scaleY = 0;
                    easeVal = egret.Ease.backOut;
                    break;
                case WIN_EFFECT.EFFECT_WIN_OPEN_ALPHA:
                    wnd.alpha = 0.3;
                    break;
            }
            egret.Tween.get(wnd).to({ x: 0, y: 0, scaleX: 1, scaleY: 1, alpha: 1 }, 1000, easeVal);
        }
        else if (efect > WIN_EFFECT.EFFECT_WIN_CLOSE_BEGIN && efect < WIN_EFFECT.EFFECT_WIN_CLOSE_END) {
            //窗口关闭特效
            var nX;
            var nY;
            var nScaleX;
            var nScaleY;
            var nAlpha;
            switch (efect) {
                case WIN_EFFECT.EFFECT_WIN_CLOSE_MOVE_LEFT:
                    nX = -WndManager.root.stage.stageWidth;
                    nY = 0;
                    nScaleX = 1;
                    nScaleY = 1;
                    nAlpha = 1;
                    easeVal = egret.Ease.bounceIn;
                    break;
                case WIN_EFFECT.EFFECT_WIN_CLOSE_MOVE_RIGHT:
                    nX = WndManager.root.stage.stageWidth;
                    nY = 0;
                    nScaleX = 1;
                    nScaleY = 1;
                    nAlpha = 1;
                    easeVal = egret.Ease.bounceIn;
                    break;
                case WIN_EFFECT.EFFECT_WIN_CLOSE_MOVE_UP:
                    nX = 0;
                    nY = -WndManager.root.stage.stageHeight;
                    nScaleX = 1;
                    nScaleY = 1;
                    nAlpha = 1;
                    easeVal = egret.Ease.bounceIn;
                    break;
                case WIN_EFFECT.EFFECT_WIN_CLOSE_MOVE_DOWN:
                    nX = 0;
                    nY = WndManager.root.stage.stageHeight;
                    nScaleX = 1;
                    nScaleY = 1;
                    nAlpha = 1;
                    easeVal = egret.Ease.bounceIn;
                    break;
                case WIN_EFFECT.EFFECT_WIN_CLOSE_SCALE:
                    nScaleX = 0;
                    nScaleY = 0;
                    nAlpha = 1;
                    break;
                case WIN_EFFECT.EFFECT_WIN_CLOSE_ALPHA:
                    nScaleX = 1;
                    nScaleY = 1;
                    nAlpha = 0;
                    break;
            }
            if (openType == WIN_OPERATOR.WIN_CLOSE_DELETE) {
                this.addChild(wnd);
            }
            egret.Tween.get(wnd).to({ x: nX, y: nY, scaleX: nScaleX, scaleY: nScaleY, alpha: nAlpha }, 1000).call(function () {
                if (openType == WIN_OPERATOR.WIN_CLOSE_HIDE) {
                    wnd.visible = false;
                }
                else if (openType == WIN_OPERATOR.WIN_CLOSE_DELETE) {
                    wnd.Destroy();
                }
            }, this);
        }
        return wnd;
    };
    WndManager.switchWnd = function (wndClazz, operatorType, efect, data) {
        if (data === void 0) { data = null; }
        return WndManager.root.wndmanager.switchWnd(wndClazz, operatorType, efect, data);
    };
    WndManager.prototype.getWnd = function (wndType) {
        for (var i = 0; i < this.wins.length; i++) {
            if (this.wins[i] instanceof wndType) {
                return this.wins[i];
            }
        }
        return null;
    };
    WndManager.getWnd = function (wndType) {
        return WndManager.root.wndmanager.getWnd(wndType);
    };
    WndManager.setinfo = function (str, desc) {
        //        WndManager.root.jssdk.setLink(str,desc);
    };
    WndManager.prototype.clear = function () {
        //for (var i = 0; i < this.wins.length; i++) {
        //    var wnd = this.wins[i];
        //    wnd.Destroy();
        //}
        this.wins = [];
        this.removeChildren();
    };
    WndManager.clear = function () {
        WndManager.root.wndmanager.clear();
    };
    WndManager.prototype.getTopWnd = function () {
        if (this.numChildren > 0)
            return this.getChildAt(this.numChildren - 1);
    };
    return WndManager;
}(egret.Sprite));
__reflect(WndManager.prototype, "WndManager");
//# sourceMappingURL=WndManager.js.map