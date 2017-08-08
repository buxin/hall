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
var control_type = (function () {
    function control_type() {
    }
    return control_type;
}());
control_type.control_image = "ImageViewObjectData";
control_type.control_textfield = "TextObjectData";
__reflect(control_type.prototype, "control_type");
var WinBase = (function (_super) {
    __extends(WinBase, _super);
    function WinBase() {
        var _this = _super.call(this) || this;
        _this.data = null;
        _this.touchEnabled = true;
        return _this;
    }
    WinBase.prototype.create = function (gName) {
        this.groupName = gName;
        if (!RES.isGroupLoaded(this.groupName)) {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup(this.groupName);
        }
        else {
            this.creating();
        }
    };
    WinBase.prototype.creating = function () {
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
    };
    /**子类重写此方法*/
    WinBase.prototype.createOk = function () {
    };
    WinBase.prototype.Destroy = function () {
        this.release();
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    WinBase.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    WinBase.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == this.groupName) {
            //WndManager.root.loading.visible = false;
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            // WndManager.root.loading.update();
            this.creating();
        }
    };
    WinBase.prototype.onResourceLoadError = function (event) {
        //TODO
        if (event.groupName == this.groupName) {
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //Ignore the loading failed projects
            this.onResourceLoadComplete(event);
        }
    };
    WinBase.prototype.onResourceProgress = function (event) {
        if (event.groupName == this.groupName) {
        }
    };
    WinBase.prototype.setData = function (data) {
        this.data = data;
    };
    WinBase.prototype.getData = function () {
        return this.data;
    };
    WinBase.prototype.screenAdapt = function () {
    };
    WinBase.prototype.setVisible = function (value) {
        this.visible = value;
    };
    WinBase.prototype.release = function () {
    };
    return WinBase;
}(eui.Component));
__reflect(WinBase.prototype, "WinBase");
//# sourceMappingURL=WinBase.js.map