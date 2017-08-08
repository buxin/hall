class BannerScene extends WinBase{
	private imgBan:eui.Image;
	private b1:eui.Image;
	private b2:eui.Image;
	private h1:eui.Image;
	private h2:eui.Image;
	private bt1:eui.Rect;
	private bt2:eui.Rect;
	private t:number=0;
	private i:number=1;
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/BannerWnd.exml";
	}

	private onComplete():void{
			this.addEventListener(egret.TouchEvent.ENTER_FRAME,this.lunbo,this)
			// this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gotoNo2, this);
			// this.addEventListener(egret.TouchEvent.TOUCH_END, this.gotoNo2, this);
			// this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.gotoNo2, this);
			this.imgBan.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gototuiguan, this);
			this.bt1.addEventListener(egret.TouchEvent.TOUCH_TAP,this._bts, this);
			this.bt2.addEventListener(egret.TouchEvent.TOUCH_TAP,this._bts, this);

			
    }


	private _bts(){
		if(this.i==1){
					this.i=2
					this.h2.visible=true;
					this.b1.visible=true;
					this.h1.visible=false;
					this.b2.visible=false;
					}
				else{
					this.i=1
					this.h1.visible=true;
					this.b2.visible=true;
					this.h2.visible=false;
					this.b1.visible=false;
					}
		this.imgBan.source=RES.getRes("imgBanner"+this.i+"_png")
	}
	private lunbo(){
		this.t+=1;
		if(this.t>=100){
		//egret.log("i +" +this.i)
			
			this.t=0;
		
			if(this.i==1){
				this.i=2
				this.h2.visible=true;
					this.b1.visible=true;
					this.h1.visible=false;
					this.b2.visible=false;
			}
			else{
				this.i=1
				this.h1.visible=true;
					this.b2.visible=true;
					this.h2.visible=false;
					this.b1.visible=false;
			}

			this.imgBan.source=RES.getRes("imgBanner"+this.i+"_png")
		}
	}

	private gototuiguan(){
		if(this.i==2){
				var event = new egret.Event("openMyInfoSubScene",true,false,3);
      			this.dispatchEvent(event);
		}
	}

	private this_X:number;
	private hua:boolean=true;
	private gotoNo2(event: egret.TouchEvent){
		if(event.type == egret.TouchEvent.TOUCH_BEGIN) {
            this.this_X = event.stageX;
						this.hua=true;
        } else if(event.type == egret.TouchEvent.TOUCH_END) {

        } else if(event.type == egret.TouchEvent.TOUCH_MOVE) {
				
					if (event.stageX-this.this_X<-50&&this.hua) { //上一页
						if(this.i==1){
								this.i=2
							}
							else{
								this.i=1
							}
					this.imgBan.source=RES.getRes("imgBanner"+this.i+"_png")
					                 this.hua=false;

		return;				
			}	
		}

			if(event.type == egret.TouchEvent.TOUCH_BEGIN) {
            this.this_X = event.stageX;
						this.hua=true;

        } else if(event.type == egret.TouchEvent.TOUCH_END) {

        } else if(event.type == egret.TouchEvent.TOUCH_MOVE) {
				
					if (event.stageX-this.this_X>50&&this.hua) { //上一页
						if(this.i==1){
								this.i=2
							}
							else{
								this.i=1
							}
					this.imgBan.source=RES.getRes("imgBanner"+this.i+"_png")
					                 this.hua=false;

		return;				
			}	
		}
	}
}