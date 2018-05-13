function launchFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
function isFullscreen(){
  return document.fullscreenElement||
    document.msFullscreenElement||
    document.mozFullScreenElement||
    document.webkitFullscreenElement||false;
}
function merge(target,obj){
  for(let k in target){
    if(obj[k]!== undefined){
      if(!isNaN(obj[k])){
        obj[k] = parseInt(obj[k]);
      }
      target[k] = obj[k];
    }
  }
}
function clone(target,obj){
  for(let k in target){
    if(obj[k]!== undefined){
      target[k] = obj[k];
    }
  }
}
function clear(target){
	if(Array.isArray(target)){
		target.forEach(e=>{
				e = clear(e);
		})
	}else if(Object.prototype.toString.call(target) === '[object Object]'){
		for(let k in target){
			if(target[k] === ''){
				delete target[k];
			}else if(typeof target[k] === 'object'){
				target[k] = clear(target[k]);
			}
		}
	}
	return target;
}
function jsonFormat(target){
	if(Array.isArray(target)){
		target.forEach(e=>{
				e = jsonFormat(e);
		})
	}else if(Object.prototype.toString.call(target) === '[object Object]'){
		for(let k in target){
			if(!isNaN(target[k])){
				target[k] = parseInt(target[k]);
			}else if(typeof target[k] === 'object'){
				target[k] = jsonFormat(target[k]);
			}
		}
	}
	return target;
}
function useBMap(){
  let loadScript = ()=>{
		let script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://api.map.baidu.com/api?v=2.0&ak=WMnfBIDW6utGy6s6G3CiKswyMAmGCgsO&callback=init";
		document.body.appendChild(script);    
  }
  return new Promise((resolve,reject)=>{
    if(window.isInitBMap){
      resolve();
    }else{
      window.init = ()=>{
        window.isInitBMap = true;
        resolve();
      }
      loadScript();      
    }
    setTimeout(()=>{
      reject();
    },10000);
  })
}
function useEchart(){
  let load = ()=>{
    return new Promise((resolve,reject)=>{
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://cdn.bootcss.com/echarts/3.7.2/echarts.min.js";
      script.async='async';
      document.body.appendChild(script); 
      if(script.readyState){
　　　　　script.onreadystatechange = ()=>{
　　　　　　　　if(script.readyState == 'complete'||script.readyState=='loaded'){
　　　　　　　　　　script.onreadystatechange=null;
　　　　　　　　　　resolve();
　　　　　　　　}
　　　　　}
      }else{
        script.onload = ()=>{
          resolve();
        }
      }     
      setTimeout(()=>{
        reject();
      },10000);
    })
  }
  if(!window.echarts){
    return load();
  }
}
export  default {
  launchFullscreen,
  exitFullscreen,
  isFullscreen,
  useBMap,
  useEchart,
  merge,
  clone,
  clear,
  jsonFormat
}
