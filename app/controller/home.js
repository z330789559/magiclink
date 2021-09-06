'use strict';

const BN=require('bn.js');
const fs=require('fs');
let path = require('path');

const Controller = require('egg').Controller;
const gloabl_api=require('@polkadot/api')
const types= require("@polkadot/types")
const { Post, IgnoreJwtAll, TagsAll, Get }=require('egg-shell-decorators');
const {u8aToHex } = require('@polkadot/util');
const { ContractPromise,CodePromise } = require('@polkadot/api-contract');

const telegramUrl=""
const transformParams = (paramFields, inputParams, opts = { emptyAsNull: true },utils) => {

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
      converted = converted.map(single => utils.isNumType(type)
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

/**
 * @Controller  HomeController
 */
class HomeController extends Controller {



  /**
   * @summary transfor
   * @description body example：
   * @router post /transfor
   * * @request body contractTransforRequest *body
   */
  async transfor(){
    const {balances,fromMemo,address}=this.ctx.request.body;
    const { ctx,service, app} = this;
    const {api,keyring,utils}=app
    // const fromMemo=utils.getMemo(fromAddress);
    const fromAcc=keyring.createFromUri(fromMemo)

    // const BOB = keyring.addFromMnemonic(memo);
    // construct a transaction
    const txParams=transformParams([true,true],[address,utils.UnitToHj(balances)],{},utils);

    const txExecute = api.tx['balances']['transfer'](...txParams)

    const result = await txExecute.signAndSend(fromAcc)

    ctx.body={
      result:'true',
      msg:'',
      content:result
    }
  }



  /**
   * @description 创建账户 案例
   * @router get /createAccount
   */
  async createAccount(){
    const { ctx,service, app} = this;
    const utils =app.utils;
    const keyring=app.keyring;
    ctx.body =await utils.generatorAddress(keyring);
  }


  /**
   * @description create account 
   * @router get /sendTelegram
   * @request query string address 
   * @response   string
   */
   async sendTelegram(){
    const { ctx,service, app} = this;
    const address=this.ctx.query.address;
    const utils =app.utils;
    const mnemonic=utils.getMemo(address);
    utils.remove(address);
    ctx.body =telegramUrl+"&mnemonic="+encodeURIComponent(mnemonic);
  }


  async addAccount(){
  const { ctx,service, app} = this;
  const {address,mnemonic}=this.ctx.request.body;
  const utils =app.utils;
  utils.addAddress(address,mnemonic)
    ctx.body={
      result:'true',
      msg:'',
      content:''
    }



}

}




module.exports = HomeController;
