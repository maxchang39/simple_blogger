util = {
  getCurrentDate : function() {
    let dateObj = new Date();
    return (dateObj.getMonth()+1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear()
  }
}
