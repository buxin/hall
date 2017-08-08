   /**
 *
 * @author 
 *
 */

class control_type {
    static control_image = "ImageViewObjectData";
    static control_textfield = "TextObjectData";


}

class WinBase extends eui.Component {
    public constructor() {
        super();
        this.touchEnabled = true;
    }

    public create(gName: string): void {
        this.groupName = gName;

        if (!RES.isGroupLoaded(this.groupName)) {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup(this.groupName);
            //WndManager.root.loading.visible = true;
        } else {
            this.creating();
        }
    }

    private creating(): void {

        //        var cfgData = RES.getRes(this.groupName+"_json");
        //
        //        if(cfgData == null) {
        //            console.error(" ui json is not exit!");
        //            return;
        //        }
        //
        //        var childrens = cfgData.Content.Content.ObjectData.Children;
        //        for(var i: number = 0;i < childrens.length;i++) {
        //            var data = childrens[i];
        //            var control: UIControl = null;
        //            switch(data.ctype) {
        //                case control_type.control_image:
        //                    control = new UIImage;
        //                    break;
        //                case control_type.control_textfield:
        //                    control = new UITextfield;
        //                    break;
        //            }
        //            
        //            if(control) {
        //                control.setUIData(data);
        //                this.addChild(control);
        //            }
        //        }
        //        

        this.createOk();
    }

    /**子类重写此方法*/
    public createOk(): void {

    }


    private groupName: string;
    public Destroy() {
        this.release();
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    protected createChildren(): void{
        super.createChildren();
    }

    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == this.groupName) {
            //WndManager.root.loading.visible = false;
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
           // WndManager.root.loading.update();
            this.creating();
        }
    }


    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        if (event.groupName == this.groupName) {
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //Ignore the loading failed projects
            this.onResourceLoadComplete(event);
        }
    }

    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == this.groupName) {
            //WndManager.root.loading.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private data:any = null;
    public setData(data:any):void
    {
        this.data = data;
    }

    public getData():any{
        return this.data;
    }

    public screenAdapt():void
    {
        
    }

    public setVisible(value:boolean):void
	{
        this.visible = value;
	}

    protected release():void
	{
	}

}
