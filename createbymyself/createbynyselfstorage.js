function isJSON(obj) {
	return typeof(obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() && !obj.length;
}
function stringify(val) {
	return val === undefined || typeof val === "function" ? val + '' : JSON.stringify(val);
}
function isFunction(value) {
	return({}).toString.call(value) === "[object Function]";
}
function deserialize(value) {
	switch(typeof(value)) {
		case "number":
			{
				if((value.toString()).indexOf(".")) {
					return "float";
				} else {
					return "int";
				}
			}
			break;
		case "object":
			return "object";
			break;
		case "string":
			return "string";
			break;
		default:
			return "string";
			break;
	}

}
var objabouttype = new Object();

function savetyoeof(ckey, ctype) {
	objabouttype[ckey] = ctype;
	localStorage.setItem("typeodkey", stringify(objabouttype));
}

function changetyoe(ckey, cdata) {
	var objgetdtatype=JSON.parse(localStorage.getItem("typeodkey"));
	switch(objgetdtatype[ckey]) {
		case "float":
			return parseFloat(cdata);
			break;
		case "int":
			return parseInt(cdata);
			break;
		case "object":
			return JSON.parse(cdata);
			break;
		case "string":
			return cdata;
			break;
		default:
		return cdata;
			break;
	}
}

var storageUtil = {
	setStorage: function(key, val, storagetType) {
		if(key && !isJSON(key)) {
			if(storagetType=="localStorage"){
				localStorage.setItem(key, stringify(val));
			}else{
				sessionStorage.setItem(key, stringify(val));
			}
			
		} else if(key && isJSON(key)) {
			for(var a in key) this.setStorage(a, key[a], arguments[1]);
		}
		var typeget = deserialize(val);
		savetyoeof(key, typeget);
		return this;
	},
	getStorage: function(key, storagetType) {
		if(!key) {
			var ret = {};
			this.forEach(function(key, val) {
				ret[key] = val;
			});
			return ret;
		}else{
			var getdata;
		if(storagetType=="localStorage"){
				getdata = localStorage.getItem(key);
		}else{
			getdata = sessionStorage.getItem(key);
		}
		
		var changetypedata=changetyoe(key, getdata);
		return changetypedata;
		}
		
	},
	deleteStorage: function(key, flag, storagetType) {
		if(arguments.length==3 && arguments[1]) {
			if(key) {
				if(!isJSON(key) && !isJSON(key[0]) && typeof(key) != "string") {
					for(var k = 0; k < key.length; k++) {
						for(var j = 0; j < storagetType.length; j++) {
							if(key[k] == storagetType.key(j)) {
								if(storagetType=="localStorage"){
				                    localStorage.removeItem(key[k]);
		                        } else{
			                       sessionStorage.removeItem(key[k]);
		                        }
							}
						}
					}

				} else {
					if(storagetType=="localStorage"){
				        localStorage.removeItem(key);
		            } else{
			            sessionStorage.removeItem(key);
		            }
				}

			}
		}else{
			if(storagetType=="localStorage"){
				 localStorage.clear();
		     } else{
			     sessionStorage.clear();
		     }
		
		}
	}

}

