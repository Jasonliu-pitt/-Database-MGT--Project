var mysql = require("mysql");
var DBAcess = mysql.createConnection({
    host        :         "localhost",
    user        :         "root",
    password    :         "",
    database     :         "demo"
});
DBAcess.connect(function(error){
    if(error)    {
        console.log("Problem with MySQL"+error);
    } else {
        console.log("Connected with Database");
    }
});
module.exports = DBAcess;