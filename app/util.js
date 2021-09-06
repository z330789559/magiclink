'use strict';

const { formatNumber, formatBalance } = require('@polkadot/util');
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';
const BN = require('bn.js');

const addressList={};

formatBalance.setDefaults({ decimals: 12, unit: 'KSM' });

const util = {};
util.addAddress=function(address,memo){
  addressList[address]=memo;
}
util.byteToString=function(_arr){
  if(!_arr) return _arr;
  let arr= _arr.join("").split("")
    if(typeof arr === 'string') {  
        return arr;  
    }  
    var str = '',  
        _arr = arr;  
    for(var i = 0; i < _arr.length; i++) {  
        var one = _arr[i].toString(2),  
            v = one.match(/^1+?(?=0)/);  
        if(v && one.length == 8) {  
            var bytesLength = v[0].length;  
            var store = _arr[i].toString(2).slice(7 - bytesLength);  
            for(var st = 1; st < bytesLength; st++) {  
                store += _arr[st + i].toString(2).slice(2);  
            }  
            str += String.fromCharCode(parseInt(store, 2));  
            i += bytesLength - 1;  
        } else {  
            str += String.fromCharCode(_arr[i]);  
        }  
    }  
    return str;  
}
utils.getMemo=function(address){
  return addressList[address]
}
util.formatBalance = function(balance) {
  const format = formatBalance(balance, { forceUnit: '-' });
  return format === '0' ? '0 KSM' : format;
};

util.formatNumber = function(num) {
  return formatNumber(num);
};
// percentage of the commission. e.g. 100000000 is converted to 10.00 percent
util.formatCommission = function(commission) {
  if (commission.unwrap().toNumber() === 0) {
    return 0;
  }
  const PERBILL = new BN(1000000000);
  return (commission.unwrap().muln(10000).div(PERBILL)
    .toNumber() / 100).toFixed(2);
};

util.paramConversion={
  num: [
    'Compact<Balance>',
    'BalanceOf',
    'u8', 'u16', 'u32', 'u64', 'u128',
    'i8', 'i16', 'i32', 'i64', 'i128'
  ]
}
util.generatorAddress=async function(){
  // 等待类库完全加载
  await cryptoWaitReady();


// 生成助记词
  const mnemonic = mnemonicGenerate();


// 实例化一个Keying
  const keyring = new Keyring({ type: 'sr25519' });


// 获取密码对
  const pair = keyring.addFromUri(mnemonic);


// 获取Substrate地址，这是默认的Substrate框架网络地址格式
  const ss58Address = pair.address;


// 获取其它网络地址，设定不同的网络地址前缀即可
// 获取波卡地址
  keyring.setSS58Format(0);
  console.log(mnemonic)

  util.addAddress(pair.address,mnemonic)
  return {
    mnemonic,
    pair
  }
}



module.exports = util;
