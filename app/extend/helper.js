'use strict';

const { cryptoWaitReady, mnemonicGenerate,mnemonicToMiniSecret, randomAsHex }=require('@polkadot/util-crypto');
const { formatNumber, formatBalance,u8aToHex } = require('@polkadot/util');
const BN = require('bn.js');

const util = {addressList:{}};
util.addAddress=function(address,memo){
  util.addressList[address]=memo;
}
util.getMemo=function(address){
  console.log(util.addressList)
  return util.addressList[address]
}
util.remove=function(address){
 delete util.addressList[address]
}
util.formatBalance = function(balance) {
  const unit = '点';
  formatBalance.setDefaults({ decimals: 12, unit });
  const format = formatBalance(balance, { forceUnit: '-' });
  return format === '0' ? ('0 ' + unit) : format;
};

util.UnitToHj=function(num){
    return num + '000000000'
}

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
util.isNumType = type => util.paramConversion.num.some(el => type.indexOf(el) >= 0);
util.transformParams = (paramFields, inputParams, opts = { emptyAsNull: true }) => {

  // if `opts.emptyAsNull` is true, empty param value will be added to res as `null`.
  //   Otherwise, it will not be added
  const paramVal = inputParams.map(inputParam => {
    // To cater the js quirk that `null` is a type of `object`.
    if (typeof inputParam === 'object' && inputParam !== null && typeof inputParam.value === 'string') {
      return inputParam.value.trim();
    } else if (typeof inputParam === 'string') {
      return inputParam.trim();
    }
    return inputParam;
  });
  const params = paramFields.map((field, ind) => ({ ...field, value: paramVal[ind] || null }));

  return params.reduce((memo, { type = 'string', value }) => {
    if (value == null || value === '') return (opts.emptyAsNull ? [...memo, null] : memo);

    let converted = value;

    // Deal with a vector
    if (type.indexOf('Vec<') >= 0) {
      converted = converted.split(',').map(e => e.trim());
      converted = converted.map(single => util.isNumType(type)
        ? (single.indexOf('.') >= 0 ? Number.parseFloat(single) : Number.parseInt(single))
        : single
      );
      return [...memo, converted];
    }

    // Deal with a single value
    if (utils.isNumType(type)) {
      converted = converted.indexOf('.') >= 0 ? Number.parseFloat(converted) : Number.parseInt(converted);
    }
    return [...memo, converted];
  }, []);
};
util.paramConversion={
  num: [
    'Compact<Balance>',
    'BalanceOf',
    'u8', 'u16', 'u32', 'u64', 'u128',
    'i8', 'i16', 'i32', 'i64', 'i128'
  ]
}
util.generatorAddress=async function(keyring){
  // 等待类库完全加载
  await cryptoWaitReady();


// 生成助记词
  const mnemonic = mnemonicGenerate();



  const mnemonicMini = u8aToHex(mnemonicToMiniSecret(mnemonic));

// 获取密码对
  const pair = keyring.addFromUri(mnemonic);


// 获取Substrate地址，这是默认的Substrate框架网络地址格式
  const ss58Address = pair.address;


// 获取其它网络地址，设定不同的网络地址前缀即可
// 获取波卡地址
//   keyring.setSS58Format(2);
 util.addAddress(ss58Address,mnemonic)

  return {
    mnemonic,
    mnemonicMini,
    pair
  }
}


function stringToArray2(str){
  let a=[]
  for(let i=0;i< str.length;i=i+2){
    a.push(str[i]+str[i+1])
  }
  return a;
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


module.exports = util;
