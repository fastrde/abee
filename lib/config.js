var h   = require('./helper.js').helper;
var fsh = require('./fshelper.js').fshelper;

exports.config = {
  
  /**
   * holds the configuration-Object 
   */
  _config : null,
  
  /**
   * the name of the configFile (without .js) or .local for local config
   */
  _configName : null,

  /**
   * Tries to load local config file, then fallback to baseconfig 'name' 
   * @param {String} name the name of the baseconfig.
   */
  load: function(name){
  	try {
  	  this._config = require(h.appDir() + "/.abee/config.js").config;
  	  this._configName = ".local";
    }catch(e){
      this.loadBaseConfig(name);
	  }
  },
 
  /**
   * loads a baseconfig 'name'. Baseconfigs are shiped with Abee 
   * @param {String} name the name of the baseconfig.
   */
  loadBaseConfig: function(name){
    try {
      this._config = require("../configs/" + name + ".js").config;
      this._configName = name;
    } catch(e) {
      h.print("config " + name + " not found.\n", "error");
    }
  },

  /**
   * if no parameter name is given it prints the local config, else it prints the baseconfig name.
   * @param {String} name the name of the baseconfig.
   */
  print: function (name){
    if (name){
      this.loadBaseConfig(name);
    }else{
      this.load();
    }
  	console.log(this._config);
  },

  store: function (name){
    
  },
  export: function (name){
  	
  },
  dir: function (name){
  	
  },

  /**
   * returns the configItem named item
   * @param {String} item the name of the Item to return
   */
  get: function(item){
  	if (this._config && this._config[name]){
  		return this._config[item];
  	}else{
  		h.print("configItem " + item + " in config " + this._configName + " not found.\n", "error");
  	}
  },
 
  /**
   * Inits the .abee directory by abeetizing or creating an app. stores the chosen config in it. 
   * @param {Object} appName the name of the app created
   * @param {Object} configName the name of the chosen baseconfig
   */
  init: function(appName, configName){  
    try{
      fsh.mkdir(appName + "/.abee");
      fsh.cpfile(__dirname + "/../configs/"+ configName + ".js", appName + "/.abee/config.js");
    }catch(e){
      console.log(e);
    }
  }
};
