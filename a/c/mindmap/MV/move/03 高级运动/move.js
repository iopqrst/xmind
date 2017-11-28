/**
 * 这是我写的完美弹性运动框架，还不知道完不完美，待考证
 */
function startMove(obj, json, fn){
	clearInterval(obj.timer);
	
	var finishCount = 0;
	
	var aSpeed = {}; //存放每个属性的运动速度
	var aArrived = {};		 // 存放元素是否运动到目标点
	obj.timer = setInterval(function(){
		
		for(var attr in json) {
			
			var iCurr = parseInt(css(obj, attr));
			var iTarget = json[attr];

			var iSpeed = aSpeed[attr] ? aSpeed[attr] : 0 ;
			
			iSpeed += (iTarget - iCurr) / 6;
			iSpeed *= 0.75;
			
			aSpeed[attr] = iSpeed;
		
			if( Math.abs(aSpeed[attr])<=1 && Math.abs(iTarget - iCurr)<=1 ){
				aSpeed[attr] = 0;
				if('opacity' === attr) {
					obj.style[attr] = iTarget;
					obj.style.filter = 'alpha(opacity='+ (iTarget * 100) +')';
				} else {
					obj.style[attr] = iTarget + 'px';
				}
				aArrived[attr] = true;
			} else {
				aArrived[attr] = false;
				var H = iCurr + aSpeed[attr];
				
				if((attr === 'width' || 'height' === attr || 'opacity' === attr) && H < 0) {
					H = 0;
				}
				
				if('opacity' === attr) {
					obj.style[attr] = H;
					obj.style.filter = 'alpha(opacity='+ (H * 100) +')';
				} else {
					obj.style[attr] = H + 'px';
				}
			}
			//console.info(new Date().getTime());
		}
		
		if(isAllTrue(aArrived)) { 
			console.info(new Date().getTime());
			clearInterval(obj.timer);
			fn && fn.call(obj);
		}

	},30);
}

/**
 * 判断是否所有的元素都已经运动到目标点
 */
function isAllTrue(obj){
	for(var attr in obj) {
		if(!obj[attr]) {
			return false;
		}
	}
	return true;
}

function css(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}