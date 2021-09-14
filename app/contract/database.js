const transferFromRequest = {
  fromAddress: { type: "string", required: true, description: "出资金账户" },
  toAddress: { type: "string", required: true, description: "入资金账户" },
  fromMemo: { type: "string", required: true, description: "操作账户seed 0xce065bb58495d09b0e0ec46eeba81a8e97ad28f512555483327a5ec4628e485f " },
  balances: { type: "number", required: true, description: "转移资金" },

};

const approveRequest={
  address: { type: "string", required: true, description: "接受权限账户" },
  fromMemo: { type: "string", required: true, description: "操作账户seed 0xce065bb58495d09b0e0ec46eeba81a8e97ad28f512555483327a5ec4628e485f " },
  balances: { type: "number", required: true, description: "授权资金" },
}
const addTotalSupplyRequest={
  fromMemo: { type: "string", required: true, description: "操作账户seed 0xce065bb58495d09b0e0ec46eeba81a8e97ad28f512555483327a5ec4628e485f " },
  balances: { type: "number", required: true, description: "增加金额" },
}
const allowanceRequest={
  owerAddress:{ type: "string", required: true, description: "资金所属账户" },
  fromMemo: { type: "string", required: true, description: "操作账户seed 0xce065bb58495d09b0e0ec46eeba81a8e97ad28f512555483327a5ec4628e485f " },
  spenderAddress:{ type: "string", required: true, description: "被授予权限账户" },
}
const AccountList={

  adresslist:{ type: "array", required: true, description: "账户地址" ,itemType: 'string'},
}
const TokenRequest={
  id:{ type: "number", required: true, description: "资产序列" },
  ...approveRequest
}
const approveTokenRequest={
  id:{ type: "number", required: true, description: "资产序列" },
  ...approveRequest
}
const allowanceTokenRequest={
  id:{ type: "number", required: true, description: "资产序列" },
  ...allowanceRequest

}

const transferTokenFromRequest={
  id:{ type: "number", required: true, description: "资产序列" },
  ...transferFromRequest
}
const createTokenFromRequest={
  fromMemo: { type: "string", required: true, description: "操作账户seed 0xce065bb58495d09b0e0ec46eeba81a8e97ad28f512555483327a5ec4628e485f " },
  totalSupply:{ type: "number", required: true, description: "总供应量" },
  symbol:{type: "string", required: true, description:"token 标示 例如ETH"},
}
const createSwapRequest={
  fromMemo: { type: "string", required: true, description: "操作账户seed 0xce065bb58495d09b0e0ec46eeba81a8e97ad28f512555483327a5ec4628e485f " },
  tokenId:{ type: "number", required: true, description: "资产序列" },

  currencyAmount: { type: "number", required: true, description: "创建交易池初步抵押" },
}
const addLiquidityRequest= {
  swapId:{ type: "number", required: true, description: "交易池" },
  currencyAmount:{ type: "number", required: true, description: "基本资产" },
  minLiquidity:{ type: "number", required: true, description: "最低流动性" },
  maxTokens:{ type: "number", required: true, description: "最高token" },
  fromMemo: { type: "string", required: true, description: "操作账户seed 0xce065bb58495d09b0e0ec46eeba81a8e97ad28f512555483327a5ec4628e485f " },
}
const removeLiquidityRequest={
  fromMemo: { type: "string", required: true, description: "操作账户seed 0xce065bb58495d09b0e0ec46eeba81a8e97ad28f512555483327a5ec4628e485f " },
  swapId:{ type: "number", required: true, description: "交易池" },
  minCurrency:{ type: "number", required: true, description: "取款的最小货币" },
  minTokens:{ type: "number", required: true, description: "取款的最小token" },
  sharesToBurn: { type: "number", required: true, description: "销毁的token" },

}
const CurrencyToTokensInputRequest={
  swapId:{ type: "number", required: true, description: "交易池" },
  currency:{ type: "number", required: true, description: "交易的金额" },
  minTokens:{ type: "number", required: true, description: "购买的最小token" },
  fromMemo: { type: "string", required: true, description: "操作账户seed 0xce065bb58495d09b0e0ec46eeba81a8e97ad28f512555483327a5ec4628e485f " },
   recipient:{ type: "string", required: true, description: "接受账户" },
}
const CurrencyToTokensOutputRequest={
  swapId:{ type: "number", required: true, description: "交易池" },
  tokensBought:{ type: "number", required: true, description: "购买的金额" },
  minTokens:{ type: "number", required: true, description: "购买的最小token" },
  fromMemo: { type: "string", required: true, description: "操作账户seed 0xce065bb58495d09b0e0ec46eeba81a8e97ad28f512555483327a5ec4628e485f " },
   recipient:{ type: "string", required: true, description: "接受账户" },
}

const TokensToCurrencyInputRequest={
  swapId:{ type: "number", required: true, description: "交易池" },
  tokensSold:{ type: "number", required: true, description: "购买的金额" },
  minCrrency:{ type: "number", required: true, description: "最小的金额" },
  fromMemo:{ type: "string", required: true, description: "操作账户seed 0xce065bb58495d09b0e0ec46eeba81a8e97ad28f512555483327a5ec4628e485f " },
  recipient:{ type: "string", required: true, description: "接受账户" },
}

const tokensToCurrencyOutRequest={
  swapId:{ type: "number", required: true, description: "交易池" },
  currencyBought:{ type: "number", required: true, description: "购买的金额" },
  maxMokens:{ type: "number", required: true, description: "最大token限制" },
  recipient:{ type: "string", required: true, description: "接受账户" },
}
const createFundSwapRequest={
  name:{ type: "string", required: true, description: "交易池名称，最好简写字母例如 UUU,UHG" },
  swapToken: { type: "string", required: true, description: "计息token地址" },
  tokenId: { type: "string", required: true, description: "抵押token地址" },
  fromMemo:{ type: "string", required: true, description: "操作账户seed 0xce065bb58495d09b0e0ec46eeba81a8e97ad28f512555483327a5ec4628e485f " },
}
//nterval,rewards,interest
const updateSwapRequest={
  name:{ type: "string", required: true, description: "交易池名称，最好简写字母例如 UUU,UHG" },
  fromMemo:{ type: "string", required: true, description: "操作账户seed 0xce065bb58495d09b0e0ec46eeba81a8e97ad28f512555483327a5ec4628e485f " },
  interval:{ type: "number", required: true, description: "交易1个单位是3秒，比如要一分钟就是20" },
  rewards:{ type: "number", required: true, description: "利息总额度" },
  interest:{ type: "number", required: true, description: "利率，1就是万分之一，10就是 万分之10" }, 
}


//nterval,rewards,interest
const publishNewFundRequest={
  name:{ type: "string", required: true, description: "交易池名称，最好简写字母例如 UUU,UHG" },
  fromMemo:{ type: "string", required: true, description: "操作账户seed 0xce065bb58495d09b0e0ec46eeba81a8e97ad28f512555483327a5ec4628e485f " },
  to:{ type: "string", required: true, description: "接受账户" },
  amount: { type: "number", required: true, description: "交易的金额" },
}

const addSwapTokenRequest={
  name:{ type: "string", required: true, description: "交易池名称，最好简写字母例如 UUU,UHG" },
  fromMemo:{ type: "string", required: true, description: "操作账户seed 0xce065bb58495d09b0e0ec46eeba81a8e97ad28f512555483327a5ec4628e485f " },
  amount: { type: "number", required: true, description: "交易的金额" },
}
const sendInterestRequest={
  name:{ type: "string", required: true, description: "交易池名称，最好简写字母例如 UUU,UHG" },
  fromMemo:{ type: "string", required: true, description: "操作账户seed 0xce065bb58495d09b0e0ec46eeba81a8e97ad28f512555483327a5ec4628e485f " },
}
const changeTaskStatusRequest={
  name:{ type: "string", required: true, description: "交易池名称，最好简写字母例如 UUU,UHG" },
  status:{ type: "number", required: true, description: "0,1" },
}
const queryPublishTokenRequest={
  name:{ type: "string", required: true, description: "交易池名称，最好简写字母例如 UUU,UHG" },
  amount: { type: "number", required: true, description: "交易的金额" },
  address: { type: "string", required: true, description: "查询账号" },
}
const AccountInfo={
  address: { type: "string", required: true, description: "magic 地址" },
  userId:{ type: "string", required: true, description: "telegram id" },
  url:{ type: "string", required: true, description: "recover account url" },
}
module.exports = {
  transferFromRequest: transferFromRequest,
  approveRequest,
  addTotalSupplyRequest,
  contractTransforRequest:{...approveRequest},
  TokenRequest,
  allowanceRequest,
  AccountList,
  approveTokenRequest,
  allowanceTokenRequest,
  transferTokenFromRequest,
  createTokenFromRequest,
  createSwapRequest,
  addLiquidityRequest,
  removeLiquidityRequest,
  CurrencyToTokensOutputRequest,
  CurrencyToTokensInputRequest,
  TokensToCurrencyInputRequest,
  tokensToCurrencyOutRequest,
  createFundSwapRequest,
  updateSwapRequest,
  publishNewFundRequest,
  addSwapTokenRequest,
  sendInterestRequest,
  changeTaskStatusRequest,
  queryPublishTokenRequest,
  AccountInfo
};


