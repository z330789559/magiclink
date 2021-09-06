
const { ApiPromise, WsProvider } = require('@polkadot/api');
const gloabl_api =require('@polkadot/api');
const Keyring = gloabl_api.Keyring;
const fs =require("fs")
const path= require("path");
const config =require("../config/config.default")
const configInstance=config({})
const fromMemo =configInstance.fromAcc;
const { ContractPromise,Abi } = require('@polkadot/api-contract');
const file_path="./task.txt"
const task ={};
const supply_metadata=require("../abi/metadata.json");
const file_road=path.resolve(__dirname,file_path)
console.log(file_road)

const readTask= async ()=>{
     if( !fs.existsSync(file_road)){
        throw new Error("文件不存在");
     }
   const buffer=    fs.readFileSync(file_road,{encoding:"utf-8"});
   var text = buffer.toString('utf-8');
   if(text ||text!=""){
      const task_list=   text.split(/[\n|\r|\n\r]/g)
      task_list.forEach(item=>{
      const  task_item= item.split("-");
      task[task_item[0]]=task_item[1]
      })
   }
   console.log(text)
   console.log(task)
}

const doTask= async (func)=>{
    let keys=Object.keys(task);
    let _items =[];

    while( _item = keys.shift(),_item!=null){
        if(task[_item]!="false"){
          console.log("查询到的任务",_item)
          _items.push(_item)
   
        }

    }
if(_items.length >0){
 let  curretTask=_items.pop()
 console.log(curretTask,_items)
  await func(curretTask,_items)
}

}
const startTask=async (api)=>{
    await api.derive.chain.subscribeNewHeads(header => {
        
      });
   
}
(async ()=>{
    const provider = new WsProvider(configInstance.ksm.ws);
   let currentVersion =0;
   let sendTime =0;

    // Create the API and wait until ready
    const api = await ApiPromise.create({ provider ,types:{
      "DidMethodSpecId": "[u8; 20]",
      "Public": "MultiSigner",
      "LookupSource": "MultiAddress",
      "Address": "MultiAddress",
      "ChainId": "u32",
      "ResourceId": "[u8; 32]",
      "DepositNonce": "u64",
      "ClassId": "()",
      "TokenId": "()",
      "TAssetBalance": "u128",
      "NativeBalance": "Balance",
      "SwapAssetBalance": "TAssetBalance",
      "SwapPair": {
          "account": "AccountId",
          "nativeReserve": "Balance",
          "assetReserve": "TAssetBalance"
      },
      "TagType": "u8",
      "TagScore": "i8",
      "TagCoefficient": "u8",
      "GlobalId": "u64",
      "AdvertiserId": "GlobalId",
      "AdId": "GlobalId",
      "Advertiser": {
          "createdTime": "Compact<Moment>",
          "advertiserId": "Compact<AdvertiserId>",
          "deposit": "Compact<Balance>",
          "depositAccount": "AccountId",
          "rewardPoolAccount": "AccountId"
      },
      "Advertisement": {
          "createdTime": "Compact<Moment>",
          "deposit": "Compact<Balance>",
          "tagCoefficients": "Vec<(TagType, TagCoefficient)>",
          "signer": "AccountId",
          "mediaRewardRate": "Compact<PerU16>"
      },
      "AdvertiserOf": "Advertiser",
      "AdvertisementOf": "Advertisement"
  }
  });

      await api.isReady; 

await readTask()
const _supply_abi=new Abi(supply_metadata);
const supply_refund=new ContractPromise(api, _supply_abi, configInstance.supply_address); 

const keyring=new Keyring({
    type:"sr25519",

  });
  const _fromAcc=keyring.createFromUri(fromMemo)
const callSend=async (name,names)=>{
    console.log("开始任务",name)

    // retrieve sender's next index/nonce, taking txs in the pool into account
  //  const nonce = await api.rpc.system.accountNextIndex(_fromAcc.address);

    try{
  // construct the batch and send the transactions
      const tx =await  supply_refund.tx.sendInterest(0, 0,name);
      tx.signAndSend(_fromAcc,  ({ events = [], status }) => {
        console.log('Transaction status:', status.type,name);
  
        if (status.isInBlock) {
          console.log('Included at block hash', status.asInBlock.toHex());
          console.log('Events:');
  
          events.forEach(({ event: { data, method, section }, phase }) => {
            console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
          });
        } else if (status.isFinalized) {
          console.log('Finalized block hash', status.asFinalized.toHex());
          if(names.length >0 ){
            let _name=names.pop();
              callSend(_name,names);
          }

        }
      })
      
        console.log("发送成功",name);
    }catch(e){
        
        console.log("发送失败:",name,e);
    }
}
console.log("任务开始")
await api.derive.chain.subscribeNewHeads( async (header )=>  {
    if(currentVersion==10){
      
      currentVersion=0;
      await  readTask()
    }
    currentVersion++;

    if(sendTime==10){
      sendTime=0
      await doTask(callSend)
    }
    sendTime++;
 
});

})()
