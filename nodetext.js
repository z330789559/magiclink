let token_reserve=110500.0000
let swap_balance=11050
let currency=100
let minTokens=10
let tokens_bought=get_input_price(currency,swap_balance,token_reserve)
function get_input_price(input_amount,input_reserve,output_reserve){
    let input_amount_with_fee = input_amount * 997;
    let numerator = input_amount_with_fee * output_reserve;
    let denominator = (input_reserve *1000) + input_amount_with_fee;
   return  numerator / denominator
}

console.log(tokens_bought,minTokens,tokens_bought >= minTokens);


/**
 * 
 */
let _swap_balance=1000
let currency_amount=1000  //输入金额
let total_liquidity= 1000   //交易池token供应量
let min_liquidity=700
let swapBalance =2000   //交易所金额
let _token_reserve =10000  //资产token
let token_amount=currency_amount * _token_reserve /_swap_balance
let liquidity_minted = currency_amount * total_liquidity /_swap_balance
let max_tokens=1000000
console.log(token_amount,liquidity_minted,max_tokens > token_amount,liquidity_minted > min_liquidity)