module.exports = {

  uuidv4: () => {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  GetDateTimeNow: () => {
    var dNow = new Date();
    var localdate = dNow.getDate().toString().padStart(2, '0') + '/' 
                  + (dNow.getMonth()+1).toString().padStart(2, '0') + '/' 
                  + (dNow.getFullYear()).toString().padStart(2, '0') + ' ' 
                  + (dNow.getHours()).toString().padStart(2, '0') + ':' 
                  + (dNow.getMinutes()).toString().padStart(2, '0') + ':' 
                  + (dNow.getSeconds()).toString().padStart(2, '0');
    return localdate;
  },

  GetTimeNow: () => {
    var dNow = new Date();
    var localdate = (dNow.getHours()).toString().padStart(2, '0') + ':' 
                  + (dNow.getMinutes()).toString().padStart(2, '0') + ':' 
                  + (dNow.getSeconds()).toString().padStart(2, '0');
    return localdate;
  }
}