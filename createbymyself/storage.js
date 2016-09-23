var EventUtil = {
	setstoragedata: function(key, value, storagetype) {
		if(key && !isJSON(key)) {
			if(getStorage(key)) {
				var r = confirm("已存在该数据，是否覆盖");
				if(r == true) {
					setstorage1(key, value);
				}
			} else {
				//alert("调用保存函数");
				setstorage1(key, value, storagetype);
			}
		} else if(key && isJSON(key)) {
			for(var a in key) this.setstoragedata(a, key[a], storagetype);
		}
		return this;
	},

	getStoragedata: function(key, storagetype) {
		var getdataobj = getStorage(key, storagetype);
		return getdataobj;
	},

	detelocalStoragedata: function(key, flag, storagetype) {
		if(arguments.length == 3 && arguments[1]) {
			removestorage(arguments[0], arguments[2])
		} else {
			clearstorage(arguments[0]);
		}
	},
	getallstoragedata: function(storagetype) {
		var getalldataarray = getallstorage(storagetype);
		return
	}

}
var typeobj=new Object();
function setstorage1(ckey, cvalue, xtype) {

	if(typeof(cvalue) == "string" || cvalue === undefined || typeof cvalue === "function") {
		//alert(typeof(cvalue));
		//alert(xtype);
		if(xtype == "localStorage") {
			//alert("调用localStorage.setItem");
			localStorage.setItem(ckey, cvalue);
		} else {
			sessionStorage.setItem(ckey, cvalue);
		}
	  

	} else {
		var strvalue = JSON.stringify(cvalue);
		if(xtype == "localStorage") {
			localStorage.setItem(ckey, strvalue);
		} else {
			sessionStorage.setItem(ckey, strvalue);
		}

	}
	typeobj.ckey=typeof(cvalue);
}

function getStorage(ckey, cstoragetype) {
	var returndata;
	if(cstoragetype == "localStorage") {
		returndata = localStorage.getItem(ckey);
	} else {
		returndata = sessionStorage.getItem(ckey);
	}
	
	
	
    if(typeobj.ckey=="object"){
    	var objreturndata = JSON.parse(returndata);
    }
	else if(typeobj.ckey=="number"){
		var numberreturndata;
		if(returndata.indexOf(".")) {
			numberreturndata = JSON.parseFloat(returndata);
			return objreturndata;
			
		} else {
			numberreturndata = JSON.parseInt(returndata);
			
		}
		return numberreturndata;
	}else{
		return returndata;
	}
	

}

function removestorage(ckey, cstoragetype) {
	if(key) {
		if(cstoragetype == "localStorage") {
		
			if(!isJSON(ckey) && !isJSON(ckey[0]) && typeof(ckey) != "string") {

				for(var k = 0; k < ckey.length; k++) {
					for(var j = 0; j < localStorage.length; j++) {
						if(ckey[k] == localStorage.ckey(j)) {
							localStorage.removeItem(ckey[k]);
						}
					}
				}

			} else {
				localStorage.removeItem(ckey);
			}
		} else {
			if(!isJSON(ckey) && !isJSON(ckey[0]) && typeof(ckey) != "string") {

				for(var k = 0; k < ckey.length; k++) {
					for(var j = 0; j < sessionStorage.length; j++) {
						if(ckey[k] == sessionStorage.ckey(j)) {
							sessionStorage.removeItem(ckey[k]);
						}
					}
				}

			} else {
				sessionStorage.removeItem(ckey);
			}
		}
	}

}

function clearstorage(storagetype) {
	if(storagetype == "localStorage") {
		localStorage.clear();
	} else {
		sessionStorage.clear();
	}

}

function getallstorage(cstoragetype) {
	var Arrayall = [];
	if(storagetype == "localStorage") {
		for(var i = 0; i < sessionStorage.length; i++) {
			var name = sessionStorage.key(i);
			var value = sessionStorage.getItem(name);
			var createobj = {
				name: value
			}
			Arrayall.push(createobj);
		}

	} else {
		for(var i = 0; i < localStorage.length; i++) {
			var name = localStorage.key(i);
			var value = localStorage.getItem(name);
			var createobj = {
				name: value
			}
			Arrayall.push(createobj);
		}
	}
	return Arrayall;
}

function isJSON(obj) {
	return typeof(obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() && !obj.length;
}