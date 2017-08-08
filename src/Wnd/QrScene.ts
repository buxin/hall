class QrScene extends eui.Component{

	private btnClose:eui.Image;

	private myImg;

	private lTip:eui.Label;

	public constructor() {
		super();
		this.init();
	}

	private init():void
	{
		var shape:egret.Shape = new egret.Shape();
		shape.graphics.beginFill(0x0,0.5);
		shape.graphics.drawRect(0,0,MainScene.screen_width,MainScene.screen_height);
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
		this.lTip.x= 20;
		this.lTip.y = 700;
		this.lTip.size = 40;
		this.lTip.textColor = 0xffffff;
		this.lTip.text = "长按保存分享您的专属推广二维码";
		this.addChild(this.lTip);

		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnCloseClick,this);
	}

	public btnCloseClick(e:egret.TouchEvent):void
	{
		this.setVisible(false);
	}

	public setVisible(value:boolean):void
    {
        this.visible = value;
		
		if(value)
		{
			var _x:string="";
			var _y:string="";
			var _w:string="";
			var _h:string="";
			_x=(78/640*100)+"%";
			_y=(107/1036*100)+"%";
			_w=(482/640*100)+"%";
			_h=(482/1036*100)+"%";
			this.myImg = document.createElement("img");
			this.myImg.src = WndManager.root.main.protocol.qrPathPrefix + WndManager.root.main.protocol.dataManager.MyPlayer.qrPath;
			this.myImg.style.width = _w;
			this.myImg.style.height = _h;
			this.myImg.style.position = "absolute";
			this. myImg.style.left = _x;
			this. myImg.style.top = _y;
			var divMain = document.getElementById("gameID");
			divMain.innerHTML = "";
			divMain.appendChild(this.myImg); 
		}
		else
		{
			var divMain = document.getElementById("gameID");
        	divMain.innerHTML = "";
		}
    }
}