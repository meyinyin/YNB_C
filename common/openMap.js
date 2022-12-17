/*
**打开外部地图
曲一鸣
参数 ：
infoObject：{
	Location://经纬度信息，是一个字符串，
	//Location  lon在前 lat之后
	StoreName:'店铺的名字'//
	StoreAddress:'店铺的文字地址'
}	
*/


export function openMap(infoObject){  
			var Location=infoObject.Location.split(',').reverse().join()
			
			console.log(Location)
			
			//latitude 纬度
			//longitude 经度
			
			
			//Location （经纬度）（经纬度）
			//北纬33东经107
			//百度地图拾取器 搜出来是经纬度
			//腾讯地图拾取器 搜出来是纬经度
			
			//汉中市北纬33东经107
			var lat =infoObject.Location.split(',')[1]
			
			
			var lon =infoObject.Location.split(',')[0]
			console.log(`lat(纬度)：${lat}`,`lon(经度)：${lon}`)
			
			// #ifdef APP-PLUS
			var url = "";  
            if (plus.os.name=="Android") {  
                var hasBaiduMap = plus.runtime.isApplicationExist({pname:'com.baidu.BaiduMap',action:'baidumap://'});  
                var hasAmap = plus.runtime.isApplicationExist({pname:'com.autonavi.minimap',action:'androidamap://'}); 
				 
                var urlBaiduMap = `baidumap://map/marker?location=${Location}&title=${infoObject.StoreName}`;  
				
                var urlAmap = `androidamap://viewMap?poiname=${infoObject.StoreName}&lat=${lat}&lon=${lon}&dev=0`  
				
                if (hasAmap && hasBaiduMap) {  
					console.log(11111)
                    plus.nativeUI.actionSheet({title:"选择地图应用",cancel:"取消",buttons:[{title:"高德地图"}]}, function(e){  
                        switch (e.index){  
                            case 1:  
                                plus.runtime.openURL(urlBaiduMap);  
                                break;  
                            case 2:  
                                plus.runtime.openURL(urlAmap);  
                                break;  
                        }  
                    })  
                }  
                else if (hasAmap) {  
					//打开高德地图
                    plus.runtime.openURL(urlAmap);  
                }  
                else if (hasBaiduMap) { 
					//打开百度地图
                    plus.runtime.openURL(urlBaiduMap);  
                }else{
					//打开高德地图的网页
					plus.runtime.openURL(`https://m.amap.com/search/mapview/keywords=${encodeURIComponent(infoObject.StoreAddress)}&city=610702&poiid=${encodeURIComponent(infoObject.StoreName)}`,(res=>{
					}))
					// uni.showToast({
					// 	duration:2000,
					// 	title:'请安装高德地图或百度地图'
					// })
				}
            } else{   
                // iOS上获取本机是否安装了百度高德地图，需要在manifest里配置，在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加（如urlschemewhitelist:["iosamap","baidumap"]）  
                plus.nativeUI.actionSheet({title:"选择地图应用",cancel:"取消",buttons:[{title:"高德地图"}]}, function(e){  
                    console.log("e.index: " + e.index);  
                    console.log(Location,infoObject.StoreName,infoObject.StoreAddress,lat,lon)
                    switch (e.index){  
                        // case 1:  
                        //     url = `http://maps.apple.com/?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82&ll=${Location}&spn=0.008766,0.019441`;  
                        //     break;  
                        // case 2:  
                        //     url = `baidumap://map/marker?location=${Location}&title=${encodeURIComponent(infoObject.StoreAddress)}`;  
                        //     break;  
                        case 1:  
                            url = `iosamap://viewMap?sourceApplication=${encodeURIComponent(infoObject.StoreAddress)}&lat=${lat}&lon=${lon}&dev=0`;  
                            break;  
                        default:  
                            break;  
                    } 
                    if (url!="") {  
                        plus.runtime.openURL( url, function( e ) {  
                            console.log(e)
                            plus.nativeUI.alert("本机未安装指定的地图应用");  
                        });  
                    }  
                })  
            }  
			// #endif 
			
			// #ifdef MP-WEIXIN || H5 || MP-ALIPAY
			//latitude 维度
			//longitude 精度
			
			//汉中市北纬33东经107
			console.log(lat,lon)
			uni.openLocation({
				latitude:lat*1,
				longitude:lon*1,
				address:infoObject.StoreAddress,
				name:infoObject.StoreName,
				success:(res)=>{
					console.log(res)
				},
				fail:(err)=>{
					
				}
			})
			
			// #endif
        }