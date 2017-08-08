var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var MyUtils = (function () {
    function MyUtils() {
    }
    //影片对象
    MyUtils.createMovieClipByName = function (namse, _texture) {
        if (_texture === void 0) { _texture = ""; }
        var spr1 = new egret.MovieClip();
        var data = RES.getRes(namse + "_json");
        if (_texture == "") {
            var texture = RES.getRes(namse + "_png");
        }
        else {
            var texture = RES.getRes(_texture + "_png");
        }
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        spr1 = new egret.MovieClip(mcDataFactory.generateMovieClipData(namse));
        return spr1;
    };
    MyUtils.GetBtn = function (cx, cy, img) {
        var btn = new egret.Bitmap;
        btn.x = cx;
        btn.y = cy;
        btn.touchEnabled = true;
        btn.texture = RES.getRes(img);
        return btn;
    };
    MyUtils.GetBtn1 = function (w, h, cx, cy) {
        var spr1 = new egret.Sprite();
        spr1.graphics.beginFill(0x00ff00, 0);
        spr1.graphics.drawRect(0, 0, w, h);
        spr1.graphics.endFill();
        spr1.width = w;
        spr1.height = h;
        spr1.x = cx;
        spr1.y = cy;
        spr1.touchEnabled = true;
        return spr1;
    };
    MyUtils.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    MyUtils.getMovieClip = function (mcName) {
        var resJs = RES.getRes(mcName + "_json");
        var resPng = RES.getRes(mcName + "_png");
        var mcFactory = new egret.MovieClipDataFactory(resJs, resPng);
        var movieclipData = mcFactory.generateMovieClipData(mcName);
        var mc1 = new egret.MovieClip(movieclipData);
        return mc1;
    };
    MyUtils.GetRequest = function () {
        var url = document.location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };
    MyUtils.getMyParamer = function (param) {
        var oRequest = new Object();
        oRequest = MyUtils.GetRequest();
        return oRequest[param];
    };
    MyUtils.calcStringByte = function (str) {
        MyUtils.by.writeUTFBytes(str);
        var len = MyUtils.by.length;
        MyUtils.by.clear();
        return len;
    };
    MyUtils.hitTest = function (p1, p2) {
        var r1 = p1.getBounds();
        r1.x = p1.x;
        r1.y = p1.y;
        var r2 = p2.getBounds();
        r2.x = p2.x;
        r2.y = p2.y;
        if (r1.intersects(r2)) {
            return true;
        }
        return false;
    };
    MyUtils.hitTest1 = function (p1, p2) {
        var r1 = p1.getBounds();
        r1.x = p1.x;
        r1.y = p1.y;
        var r2 = p2.getBounds();
        r2.x = p2.x;
        r2.y = p2.y;
        r2.width = 30;
        r2.height = 30;
        if (r1.intersects(r2)) {
            return true;
        }
        return false;
    };
    MyUtils.isPhoneNumber = function (s) {
        var rb = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (rb.test(s)) {
            return true;
        }
        return false;
    };
    MyUtils.setAorn = function (obj) {
        obj.anchorOffsetX = obj.width / 2;
        obj.anchorOffsetY = obj.height / 2;
    };
    MyUtils.getTextInput = function (x, y, w, h, nColor) {
        var t = new egret.TextField;
        t.type = "input";
        t.x = x;
        t.y = y;
        t.width = w;
        t.height = h;
        t.textColor = nColor;
        t.verticalAlign = egret.VerticalAlign.MIDDLE;
        return t;
    };
    MyUtils.getTextAlignCenter = function (x, y, w, h, nColor) {
        var t = new egret.TextField;
        t.x = x;
        t.y = y;
        t.width = w;
        t.height = h;
        t.textColor = nColor;
        t.textAlign = "center";
        t.verticalAlign = egret.VerticalAlign.MIDDLE;
        return t;
    };
    MyUtils.getTextAlignCenter1 = function (x, y, w, h, nColor) {
        var t = new eui.Label;
        t.x = x;
        t.y = y;
        t.width = w;
        t.height = h;
        t.textColor = nColor;
        t.textAlign = "center";
        t.size = 20;
        t.verticalAlign = egret.VerticalAlign.MIDDLE;
        return t;
    };
    MyUtils.getFaceImg = function (img, faceJson, showWidth, showHeight, showRotation) {
        //egret.log("解析图片1：x:" +faceJson.face[0].position.center.x+" y:" + faceJson.face[0].position.center.y + " w:"+faceJson.face[0].position.width+ " h:"+faceJson.face[0].position.height);
        var image_x = faceJson.img_width * (faceJson.face[0].position.center.x / 100);
        var image_y = faceJson.img_height * (faceJson.face[0].position.center.y / 100);
        var image_w = faceJson.img_width * (faceJson.face[0].position.width / 100);
        var image_h = faceJson.img_height * (faceJson.face[0].position.height / 100);
        image_w += image_w / 2;
        image_h += image_h / 2;
        image_x = image_x - image_w / 2;
        image_y = image_y - image_h / 2;
        var scaleX = showWidth / image_w;
        var scaleY = showHeight / image_h;
        if (scaleX > scaleY) {
            var explict_image_h = Math.floor(showHeight / scaleX);
            image_y = image_y + ((image_h - explict_image_h) >> 1);
            image_h = explict_image_h;
        }
        else if (scaleY > scaleX) {
            var explict_image_w = Math.floor(showWidth / scaleY);
            image_x = image_x + ((image_w - explict_image_w) >> 1);
            image_w = explict_image_w;
        }
        var screen1 = new egret.RenderTexture();
        screen1.drawToTexture(img, new egret.Rectangle(Math.ceil(image_x), Math.ceil(image_y), Math.ceil(image_w), Math.ceil(image_h)));
        img = new egret.Bitmap(screen1);
        var bim = new egret.Bitmap(screen1);
        var scale = Math.max(scaleX, scaleY);
        bim.scaleX = scale;
        bim.scaleY = scale;
        bim.rotation = showRotation;
        return bim;
    };
    MyUtils.getFaceParam = function (faceJson) {
        if (null != faceJson) {
            var image_x = faceJson.img_width * (faceJson.face[0].position.center.x / 100);
            var image_y = faceJson.img_height * (faceJson.face[0].position.center.y / 100);
            var image_w = faceJson.img_width * (faceJson.face[0].position.width / 100);
            var image_h = faceJson.img_height * (faceJson.face[0].position.height / 100);
            image_w += image_w / 2;
            image_h += image_h / 2;
            image_x = image_x - image_w / 2;
            image_y = image_y - image_h / 2;
            return "" + image_x + ":" + image_y + ":" + image_w + ":" + image_h;
        }
        return "";
    };
    //根据服务器发过来的人脸数据，获得图片
    MyUtils.getFaceImgByParam = function (img, param, showWidth, showHeight, showRotation) {
        if (null == param)
            return null;
        if (param == "")
            return null;
        var arr = param.split(":");
        if (arr != null && arr.length == 4) {
            var image_x = Number(arr[0]);
            var image_y = Number(arr[1]);
            var image_w = Number(arr[2]);
            var image_h = Number(arr[3]);
            var scaleX = showWidth / image_w;
            var scaleY = showHeight / image_h;
            if (scaleX > scaleY) {
                var explict_image_h = Math.floor(showHeight / scaleX);
                image_y = image_y + ((image_h - explict_image_h) >> 1);
                image_h = explict_image_h;
            }
            else if (scaleY > scaleX) {
                var explict_image_w = Math.floor(showWidth / scaleY);
                image_x = image_x + ((image_w - explict_image_w) >> 1);
                image_w = explict_image_w;
            }
            var screen1 = new egret.RenderTexture();
            screen1.drawToTexture(img, new egret.Rectangle(Math.ceil(image_x), Math.ceil(image_y), Math.ceil(image_w), Math.ceil(image_h)));
            img = new egret.Bitmap(screen1);
            var bim = new egret.Bitmap(screen1);
            var scale = Math.max(scaleX, scaleY);
            bim.scaleX = scale;
            bim.scaleY = scale;
            bim.rotation = showRotation;
            return bim;
        }
        return null;
    };
    MyUtils.checkStringIsNotNulll = function (str) {
        if (null != str && str.trim() != "")
            return true;
        else
            return false;
    };
    //格式化时间
    MyUtils.formatTimeStr = function (timeStr) {
        var index = timeStr.lastIndexOf(":");
        return timeStr.substring(0, index);
    };
    return MyUtils;
}());
MyUtils.by = new egret.ByteArray;
__reflect(MyUtils.prototype, "MyUtils");
//# sourceMappingURL=MyUtils.js.map