
const fs=require("fs")
const path= require("path");
const status=0;
const name="HFT";
const replacte_text=name+"-"+(status?'true':'false');
const file_path="./app/task.txt"


const buffer=    fs.readFileSync(file_path,{encoding:"utf-8"});
var text = buffer.toString('utf-8');
if(text && text!=""){
    if(text.indexOf(name)==-1){
        const newTxt=text+"\n"+name+"-true";
         fs.writeFileSync(file_path, newTxt)
    }else{
        var d = new RegExp(name+"-(true|false)","ig");
        const newTxt=  text.replace(d,replacte_text)
        console.log(newTxt)
    }

}