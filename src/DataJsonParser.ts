class DataJsonParser {


	private protocol:Protocol;

	public constructor(protocol:Protocol) {		
		this.protocol = protocol
	}

	public parser():void
	{
		var obj: {} = RES.getRes("allprovinces_json");
		var provinceArr: Array<any> = obj["provincesList"];

		for(var i=0;i<provinceArr.length;i++)
		{
			this.protocol.provinceArr.push(provinceArr[i].Name);

			var citys:Array<string> = [];

			var cityArr:Array<any> = provinceArr[i].Citys;

			var dealerDimen:Array<Array<string>> = [];

			for(var j=0;j<cityArr.length;j++)
			{
				if(cityArr[j].Open == "yes")
				{
					citys.push(cityArr[j].Name);

					var dealers:Array<string> = [];

					var dealerArr:Array<any> = cityArr[j].Dealers;

					for(var k=0;k<dealerArr.length;k++)
					{
						dealers.push(dealerArr[k].Name);		
					}

					dealerDimen.push(dealers);
				}
			}

			this.protocol.dealerArr.push(dealerDimen);
			this.protocol.cityArr.push(citys);
		}
	}
}