'use strict';
const { ContractPromise,Abi } = require('@polkadot/api-contract');
const { ApiPromise, WsProvider } = require('@polkadot/api');
const utils=require('./app/extend/helper')
const metadata =require("./metadata")
const supply_metadata=require("./abi/metadata.json");
const _address='5GJqThzHx3j4QuWvhtW4t3nP92NJEkb5uqvEkW3cmdrpWZkx';
 // parent.js
 const child_process = require('child_process');
class AppBootHook {
  constructor(app) {
    this.app = app;
    this.app.utils=utils;
  }

  async didLoad() {

    // Load plugin service
    const gloabl_api=require('@polkadot/api')
    const Keyring = gloabl_api.Keyring;
    // Initialise the provider to connect to the local node

    // const provider = new WsProvider(this.app.config.ksm.ws);

    // Create the API and wait until ready
    // const api = await ApiPromise.create({ provider ,types:{
    //   Id:'u32',
    //   "token":{
    //     Id:'u32',
    //   },
    //   balance:'u64',
    //   setIndex:'u32',
    //   Swap:{
    //     tokenId: 'AssetId',
    //    // The "swap token" id.
    //     swapToken: 'AssetId',
    //   // This swap account.
    //     account: 'AccountId',
    //   },
    //   TokenBalance:'balance',
    //   Symbol:"[u8; 32]",
    //   TokenDossier:{
    //     symbol:"[u8; 32]",
    //     precision:"u128",
    //     id:'u32,'
    //   },
    //   "swap":{
    //     balance:'u64',
    //     setIndex:'u32',
    //     Swap:{
    //       tokenId: 'AssetId',
    //      // The "swap token" id.
    //       swapToken: 'AssetId',
    //     // This swap account.
    //       account: 'AccountId',
    //     },
    //     TokenBalance:'balance',
    //     Symbol:"[u8; 32]",
    //     TokenDossier:{
    //       symbol:"[u8; 32]",
    //       precision:"u128",
    //       id:'u32,'
    //     },
    //     "NftAddress":"H160",
    //   "RefCount": "u32",
    // "AccountId":"H160",
    // "AccountInfo":{
    //     "nonce":"u32",
    //     "consumers":"RefCount",
    //     "providers":"RefCount",
    //     "data":"AccountData"
    // },
    // "Keys": "(H256,H256,H256,H256)",
    // "AccountData":{
    //      "free": "Balance",
    //      "reserved": "Balance",
    //      "miscFrozen": "Balance",
    //      "feeFrozen": "Balance"
    // },
    //   }

    // }});
    // await api.isReady;
//     console.log(api.genesisHash.toHex());
//     // Create polkadot webservice
//     this.app.api = api;
//     const abi = new Abi(metadata);
//     const _supply_abi=new Abi(supply_metadata);
//     const contract = new ContractPromise(api, abi, _address);
//     const supply_refund=new ContractPromise(api, _supply_abi, this.app.config.supply_address); 
//     this.app.contract=contract;
//     this.app.supplyRefund=supply_refund;
// // The amount required to create a new account
//     console.log(api.consts.balances.existentialDeposit.toNumber());

// // The amount required per byte on an extrinsic
//     console.log(api.consts.transactionPayment.transactionByteFee.toNumber());
    this.app.keyring=new Keyring({
      type:"sr25519",

    });

    // this.app.io.origins((origin, callback) => {
    //   if (this.app.config.cors.origin !== '*' && origin !== this.app.config.cors.origin) {
    //     return callback('origin not allowed', false);
    //   }
    //   callback(null, true);
    // });


  //   this.app.childProcess = child_process.exec(
  //     'node app/task.js', // 执行的命令
  //     {},
  //     (err, stdout, stderr) => {
  //       if (err) {
  //         // err.code 是进程退出时的 exit code，非 0 都被认为错误
  //         // err.signal 是结束进程时发送给它的信号值
  //         console.log('err:', err, err.code, err.signal);
  //       }
  //       console.log('stdout:', stdout);
  //       console.log('stderr:', stderr);
  //     }
  //   );
  // console.log('child pid:',   this.app.childProcess.pid);
    // const mysqlConfig = await this.app.configCenter.fetch('mysql');
    //  this.app.database = app.mysql.createInstance(mysqlConfig);

  }

  // async serverDidReady() {

   


  //   // require('child_process').exec('nuhup node app/task.js >task.log  2>&1 &');
  //   // http / https server is loaded.
  //   await this.app.api.derive.chain.subscribeNewHeads(header => {
  //      // console.log( { height: header.number, validatorAddr: header.author })
  //     this.app.io.emit('headerChange', { height: header.number, validatorAddr: header.author });
  //   });
  //   await this.app.api.rpc.chain.subscribeFinalizedHeads(header => {
  //     this.app.io.emit('finalizedHeaderChange', { height: header.number });
  //   });
  // }
}

module.exports = AppBootHook;
