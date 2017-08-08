/**
 *
 * @author 
 *
 */

enum WIN_OPERATOR {
    WIN_OPEN_NEW,
    WIN_CLOSE_DELETE,
    WIN_CLOSE_HIDE,
    WIN_OPEN_SHOW,
    WIN_OPEN_SHOW_OR_HIDE,
    WIN_OPEN_SHOW_AND_HIDE_OTHER
}

enum WIN_EFFECT{
    EFFECT_WIN_CLOSE_BEGIN=0,
    EFFECT_WIN_CLOSE_MOVE_LEFT,
    EFFECT_WIN_CLOSE_MOVE_RIGHT,
    EFFECT_WIN_CLOSE_MOVE_UP,
    EFFECT_WIN_CLOSE_MOVE_DOWN,
    EFFECT_WIN_CLOSE_SCALE,
    EFFECT_WIN_CLOSE_ALPHA,
    EFFECT_WIN_CLOSE_END,
    EFFECT_WIN_OPEN_MOVE_LEFT,
    EFFECT_WIN_OPEN_MOVE_RIGHT,
    EFFECT_WIN_OPEN_MOVE_UP,
    EFFECT_WIN_OPEN_MOVE_DOWN,
    EFFECT_WIN_OPEN_SCALE,
    EFFECT_WIN_OPEN_ALPHA,
    EFFECT_WIN_OPEN_END
}
class WndManager extends egret.Sprite {
    public constructor() {
        super();
    }

    public static root: MainScene;
    
    private wins: WinBase[] = [];
    /***
     * 窗口打开 
     * @param wnd 窗口类型
     * @openType 打开方式
     * @efect 打开特效
     */
    public switchWnd(wndClazz: any,openType: number,efect?: number, data:any = null): WinBase {

        var wnd:WinBase = null;
        switch(openType) {
            case WIN_OPERATOR.WIN_OPEN_SHOW_AND_HIDE_OTHER:
                 for(var i: number = 0;i < this.wins.length;i++) {
                    if(this.wins[i] instanceof wndClazz) {
                        wnd = this.wins[i];
                    }
                    else
                         this.wins[i].visible = false;
                }
                if(wnd == null) {
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
                for(var i: number = 0;i < this.wins.length;i++) {
                    if(this.wins[i] instanceof wndClazz) {
                        wnd = this.wins[i];
                        break;
                    }
                }
                if(wnd == null) {
                    wnd = new wndClazz;
                    this.wins.push(wnd);
                }
                this.addChild(wnd);
                wnd.visible = true;
                break;
            case WIN_OPERATOR.WIN_CLOSE_DELETE:
                for(var i: number = 0;i < this.wins.length;i++){
                    if (this.wins[i] instanceof wndClazz){
                        wnd = this.wins[i];
                        this.wins.splice(i,1);
                        break;
                    }
                }
                break;
            
            case WIN_OPERATOR.WIN_CLOSE_HIDE:
                for(var i: number = 0;i < this.wins.length;i++) {
                    if(this.wins[i] instanceof wndClazz) {
                        wnd = this.wins[i];
                        break;
                    }
                }
                
                if( wnd == null) {
                    wnd = new wndClazz;
                    this.wins.push(wnd);
                }
                this.addChild(wnd);
                
                break;
            case WIN_OPERATOR.WIN_OPEN_SHOW_OR_HIDE:
                for(var i: number = 0;i < this.wins.length;i++) {
                    if(this.wins[i] instanceof wndClazz) {
                        wnd = this.wins[i];
                        break;
                    }
                }

                if(wnd == null) {
                    wnd = new wndClazz;
                    this.wins.push(wnd);
                }
                this.addChild(wnd);
                wnd.visible = false;
                
                break;
        }

        if(wnd != null && data != null)
        {
            wnd.setData(data);
        }
        
        if ( wnd == null){
            console.error("wnd can't null !!!!!!!!'");
            return wnd;
        }
        
        var easeVal = null;
        if ( efect == null || efect == 0){
            //窗口没有特效
            if (openType == WIN_OPERATOR.WIN_CLOSE_HIDE){
                wnd.visible = false;    
            }
            else if ( openType == WIN_OPERATOR.WIN_CLOSE_DELETE){
                wnd.Destroy();
            }else if ( openType == WIN_OPERATOR.WIN_OPEN_SHOW_OR_HIDE){
                wnd.visible = !wnd.visible;
            }
        }
        else if ( efect>WIN_EFFECT.EFFECT_WIN_CLOSE_END && efect<WIN_EFFECT.EFFECT_WIN_OPEN_END){
            //窗口打开特效
            switch(efect){
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
                    wnd.x = WndManager.root.stage.stageWidth>>1;
                    wnd.y = WndManager.root.stage.stageHeight>>1;
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
        else if ( efect>WIN_EFFECT.EFFECT_WIN_CLOSE_BEGIN && efect<WIN_EFFECT.EFFECT_WIN_CLOSE_END){
            //窗口关闭特效
            var nX          ;
            var nY          ;
            var nScaleX     ;
            var nScaleY     ;
            var nAlpha      ;
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
            
            if ( openType == WIN_OPERATOR.WIN_CLOSE_DELETE){
                this.addChild(wnd);    
            }
            
            egret.Tween.get(wnd).to({ x: nX, y: nY, scaleX: nScaleX, scaleY: nScaleY, alpha: nAlpha },1000).call(() => { 
                    if (openType == WIN_OPERATOR.WIN_CLOSE_HIDE){
                        wnd.visible = false;    
                    }
                    else if ( openType == WIN_OPERATOR.WIN_CLOSE_DELETE){
                        wnd.Destroy();
                    }
                
                },this);
        }
        
        return wnd;
        
    }

   
    public static switchWnd(wndClazz: any,operatorType: number,efect?: number,data:any = null): WinBase {
        return WndManager.root.wndmanager.switchWnd(wndClazz,operatorType,efect,data);
    }
    
    private getWnd(wndType:any):any{
        for(var i: number = 0;i < this.wins.length;i++){
            if (this.wins[i] instanceof wndType){
                return this.wins[i];
            }
        }
        
        return null;
    }
    
    public static getWnd(wndType:any):any{
        return WndManager.root.wndmanager.getWnd(wndType);
    }

    public static setinfo(str: string,desc: string): void {
        //        WndManager.root.jssdk.setLink(str,desc);
    }

    public clear(): void {

        //for (var i = 0; i < this.wins.length; i++) {
        //    var wnd = this.wins[i];
        //    wnd.Destroy();
        //}
        this.wins = [];
        this.removeChildren();
    }

    public static clear(): void {
        WndManager.root.wndmanager.clear();
    }

    public getTopWnd():WinBase
    {
        if(this.numChildren>0)
            return this.getChildAt(this.numChildren-1) as WinBase;
    }
    
}
