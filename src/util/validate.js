function skuValidate(rule, value, callback) {
    if(isNaN(value)){
        callback(new Error('编号为数字'));
    }else if(String(value).length>6){
        callback(new Error('编号最多六位'));
    }else{
        callback();
    }
} 
function selectValidate(rule, value, callback) {
    if(!value.length){
        callback(new Error(rule.message));
    }else{
        callback();
    }
} 
function telValidate(rule, value, callback) {
    if(!value.match(/^1[34578]\d{9}$/)){
        callback(new Error(rule.message));
    }else{
        callback();
    }
}
export {skuValidate,selectValidate,telValidate};