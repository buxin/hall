/**
 *
 * @author 
 *
 */
class MyUtils {
	public constructor() {
	}

        //影片对象
    static createMovieClipByName(namse: string,_texture:string=""): egret.MovieClip {
        var spr1: egret.MovieClip = new egret.MovieClip();
        var data = RES.getRes(namse + "_json");
        if(_texture == "") {
            var texture = RES.getRes(namse + "_png");
            //var texture = RES.getRes(namse + "_png");
        } else { 
            var texture = RES.getRes(_texture + "_png");
        }
        var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        spr1 = new egret.MovieClip(mcDataFactory.generateMovieClipData(namse));
        return spr1;
    }

    static GetBtn(cx: number, cy: number, img: string): egret.Bitmap
    {
        var btn: egret.Bitmap = new egret.Bitmap;
        btn.x = cx;
        btn.y = cy;
        btn.touchEnabled = true;
        btn.texture = RES.getRes(img);
        return btn;
    }
    
    static GetBtn1(w:number,h:number,cx:number,cy:number):egret.Sprite
    {
        var spr1: egret.Sprite = new egret.Sprite();
        spr1.graphics.beginFill(0x00ff00,0);
        spr1.graphics.drawRect(0,0,w,h);
        spr1.graphics.endFill();
        spr1.width = w;
        spr1.height = h;
        spr1.x = cx;
        spr1.y = cy;
        spr1.touchEnabled = true;
        return spr1;
    }
    
    static createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public static getMovieClip(mcName:string):egret.MovieClip{
        var resJs = RES.getRes(mcName + "_json");
        var resPng = RES.getRes(mcName + "_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( resJs ,  resPng);
        var movieclipData = mcFactory.generateMovieClipData(mcName);
        var mc1:egret.MovieClip = new egret.MovieClip(movieclipData );
        return mc1;
    }
    
    static GetRequest() {

        var url = document.location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if(url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for(var i = 0;i < strs.length;i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

    static getMyParamer(param) {
        var oRequest = new Object();
        oRequest = MyUtils.GetRequest();
        return oRequest[param];
    }
    
    static by: egret.ByteArray = new egret.ByteArray;
    public static calcStringByte(str: string): number {
        MyUtils.by.writeUTFBytes(str);
        var len = MyUtils.by.length;
        MyUtils.by.clear();
        return len;
    }

    static hitTest(p1: egret.DisplayObject, p2: egret.DisplayObject): boolean {
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
    }

    static hitTest1(p1: egret.DisplayObject, p2: egret.DisplayObject): boolean {
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
    }

    static isPhoneNumber(s: string): boolean {
        var rb: RegExp = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (rb.test(s)) {
            return true;
        }

        return false;
    }

    static setAorn(obj: egret.DisplayObject): void {
        obj.anchorOffsetX = obj.width / 2;
        obj.anchorOffsetY = obj.height / 2;
    }

    static getTextInput(x, y, w, h, nColor): egret.TextField {
        var t = new egret.TextField;
        t.type = "input";
        t.x = x;
        t.y = y;
        t.width = w;
        t.height = h;
        t.textColor = nColor;
        t.verticalAlign = egret.VerticalAlign.MIDDLE;
        return t;
    }

    static getTextAlignCenter(x, y, w, h, nColor): egret.TextField {
        var t = new egret.TextField;
        t.x = x;
        t.y = y;
        t.width = w;
        t.height = h;
        t.textColor = nColor;
        t.textAlign = "center";
        t.verticalAlign = egret.VerticalAlign.MIDDLE;
        return t;
    }

    static getTextAlignCenter1(x, y, w, h, nColor): eui.Label {
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
    }

    public static getFaceImg(img:egret.Bitmap,faceJson:any,showWidth:number,showHeight:number,showRotation:number)
    {
        //egret.log("解析图片1：x:" +faceJson.face[0].position.center.x+" y:" + faceJson.face[0].position.center.y + " w:"+faceJson.face[0].position.width+ " h:"+faceJson.face[0].position.height);
        var image_x: number = faceJson.img_width * (faceJson.face[0].position.center.x / 100);
        var image_y: number = faceJson.img_height * (faceJson.face[0].position.center.y / 100);
        var image_w: number = faceJson.img_width * (faceJson.face[0].position.width / 100);
        var image_h: number = faceJson.img_height * (faceJson.face[0].position.height / 100);

		image_w += image_w / 2;
        image_h += image_h / 2;

        image_x = image_x - image_w / 2;
        image_y = image_y - image_h / 2;

        var scaleX:number = showWidth/image_w;
        var scaleY:number = showHeight/image_h;

        if(scaleX>scaleY)
        {
            var explict_image_h  = Math.floor(showHeight/scaleX);
            image_y = image_y + ((image_h-explict_image_h)>>1);
            image_h = explict_image_h;
        }
        else if(scaleY > scaleX)
        {
            var explict_image_w  = Math.floor(showWidth/scaleY);
            image_x = image_x + ((image_w-explict_image_w)>>1);
            image_w = explict_image_w;
        }

        var screen1 = new egret.RenderTexture();
        screen1.drawToTexture(img, new egret.Rectangle(Math.ceil(image_x), Math.ceil(image_y), Math.ceil(image_w), Math.ceil(image_h)));
		img =new egret.Bitmap(screen1);
		var bim:egret.Bitmap = new egret.Bitmap(screen1);

        var scale:number = Math.max(scaleX,scaleY);

        bim.scaleX = scale;
        bim.scaleY = scale;

        bim.rotation = showRotation;

        return bim;
    }

    public static getFaceParam(faceJson:any):string
    {
        if(null != faceJson)
        {
            var image_x: number = faceJson.img_width * (faceJson.face[0].position.center.x / 100);
            var image_y: number = faceJson.img_height * (faceJson.face[0].position.center.y / 100);
            var image_w: number = faceJson.img_width * (faceJson.face[0].position.width / 100);
            var image_h: number = faceJson.img_height * (faceJson.face[0].position.height / 100);

            image_w += image_w / 2;
            image_h += image_h / 2;

            image_x = image_x - image_w / 2;
            image_y = image_y - image_h / 2;

            return ""+image_x +":" + image_y + ":" + image_w + ":" + image_h
        }

        return "";
    }


    //根据服务器发过来的人脸数据，获得图片
     public static getFaceImgByParam(img:egret.Bitmap,param:string,showWidth:number,showHeight:number,showRotation:number)
    {
        if(null == param)
            return null;

        if(param == "")
            return null;

        var arr:Array<string> = param.split(":");
        if(arr!=null && arr.length == 4)
        {
            var image_x: number = Number(arr[0]);
            var image_y: number = Number(arr[1]);
            var image_w: number = Number(arr[2]);
            var image_h: number = Number(arr[3]);

            var scaleX:number = showWidth/image_w;
            var scaleY:number = showHeight/image_h;

            if(scaleX>scaleY)
            {
                var explict_image_h  = Math.floor(showHeight/scaleX);
                image_y = image_y + ((image_h-explict_image_h)>>1);
                image_h = explict_image_h;
            }
            else if(scaleY > scaleX)
            {
                var explict_image_w  = Math.floor(showWidth/scaleY);
                image_x = image_x + ((image_w-explict_image_w)>>1);
                image_w = explict_image_w;
            }

            var screen1 = new egret.RenderTexture();
            screen1.drawToTexture(img, new egret.Rectangle(Math.ceil(image_x), Math.ceil(image_y), Math.ceil(image_w), Math.ceil(image_h)));
            img =new egret.Bitmap(screen1);
            var bim:egret.Bitmap = new egret.Bitmap(screen1);

            var scale:number = Math.max(scaleX,scaleY);

            bim.scaleX = scale;
            bim.scaleY = scale;

            bim.rotation = showRotation;

            return bim;
        }

        return null;
    }

    public static checkStringIsNotNulll(str:string):boolean
	{
		if(null !=str && str.trim()!="")
			return true;
		else
			return false;
	}

    //格式化时间
    public static formatTimeStr(timeStr:string):string
    {
        var index:number = timeStr.lastIndexOf(":");
        return timeStr.substring(0,index);
    }

}
