var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DataJsonParser = (function () {
    function DataJsonParser(protocol) {
        this.protocol = protocol;
    }
    DataJsonParser.prototype.parser = function () {
        var obj = RES.getRes("allprovinces_json");
        var provinceArr = obj["provincesList"];
        for (var i = 0; i < provinceArr.length; i++) {
            this.protocol.provinceArr.push(provinceArr[i].Name);
            var citys = [];
            var cityArr = provinceArr[i].Citys;
            var dealerDimen = [];
            for (var j = 0; j < cityArr.length; j++) {
                if (cityArr[j].Open == "yes") {
                    citys.push(cityArr[j].Name);
                    var dealers = [];
                    var dealerArr = cityArr[j].Dealers;
                    for (var k = 0; k < dealerArr.length; k++) {
                        dealers.push(dealerArr[k].Name);
                    }
                    dealerDimen.push(dealers);
                }
            }
            this.protocol.dealerArr.push(dealerDimen);
            this.protocol.cityArr.push(citys);
        }
    };
    return DataJsonParser;
}());
__reflect(DataJsonParser.prototype, "DataJsonParser");
//# sourceMappingURL=DataJsonParser.js.map