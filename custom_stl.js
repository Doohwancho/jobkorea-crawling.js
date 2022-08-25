HashMap = function() {
    this.map = new Array();
};

HashMap.prototype = {
    put : function(key, value){
        this.map[key] = value;
    },
    get : function(key){
        return this.map[key];
    },
    getAll : function(){
        return this.map;
    },
    clear : function(){
        this.map = new Array();
    },
    getKeys : function(){
        let keys = new Array();

        for(i in this.map){
            keys.push(i);
        }
        return keys;
    },
    length : function(){
        let count = 0;

        for(let i in this.map){
            count++;
        } 
        return count;
    },
    customFilter : function(fn){
        let filtered = new HashMap();

        for (let i in this.map) {
          if (fn(this.map[i])) {
            filtered.put(i, this.map[i]);
          }
        }
    
        return filtered;
    }
}

module.exports = HashMap;