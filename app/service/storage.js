
const Service = require('egg').Service;
let version=0;
const updateTaskVersion=function (){
    version++;
}
const getTaskVersion=function (){
    return version;
}


const store={
    updateTaskVersion,
    getTaskVersion
}



module.exports =store;