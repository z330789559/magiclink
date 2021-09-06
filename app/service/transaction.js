
const Service = require('egg').Service;
const BN = require('bn.js');
const gloabl_api=require('@polkadot/api')
const ZERO = new BN(0);


class TransactionService extends Service {

    constructor(prosp){
      super(prosp)
      this.api=prosp.app.api
      this.utils=prosp.app.utils
      this.unsub=null;
      this.setUnsub=(unsub)=>typeof unsub==='function'?this.unsub=unsub():unsub;
     this.sudoKey=null;
     this.setSudoKey=(sudokey)=>typeof sudokey==='function'?sudokey():this.sudoKey=sudokey;
    Object.defineProperty(this.app,'api',{
      configurable: true,
      set:(val)=>{
        (async function () {
          if (!val) { return; }
          const sudoKey = await api.query.sudo.key();
          console.log(sudoKey)
          sudoKey.isEmpty ?this. setSudoKey(null) : this.setSudoKey(sudoKey.toString());
        })();
      }
    })
      this.result=null;

    }

  // Hooks
  async transaction(attrs,accountPair,type){
    const { palletRpc, callable, inputParams, paramFields } = attrs;
    const api =this.api;

    const isQuery = () => type === 'QUERY';
    const isSudo = () => type === 'SUDO-TX';
    const isUncheckedSudo = () => type === 'UNCHECKED-SUDO-TX';
    const isUnsigned = () => type === 'UNSIGNED-TX';
    const isSigned = () => type === 'SIGNED-TX';
    const isRpc = () => type === 'RPC';
    const isConstant = () => type === 'CONSTANT';


    const getFromAcct = async () => {
      const {
        address,
        meta: { source, isInjected }
      } = accountPair;
      let fromAcct;

      // signer is from Polkadot-js browser extension
      if (isInjected) {
        const injected = await gloabl_api.web3FromSource(source);
        fromAcct = address;
        api.setSigner(injected.signer);
      } else {
        fromAcct = accountPair;
      }

      return fromAcct;
    };

    const txResHandler = ({ status }) =>
      status.isFinalized
        ? this.setStatus(`😉 Finalized. Block hash: ${status.asFinalized.toString()}`)
        : this.setStatus(`Current transaction status: ${status.type}`);

    const txErrHandler = err =>
     console.error(`😞 Transaction Failed: ${err.toString()}`);

    const sudoTx = async () => {
      const fromAcct = await getFromAcct();
      const transformed = transformParams(paramFields, inputParams);
      // transformed can be empty parameters
      const txExecute = transformed
        ? api.tx.sudo.sudo(api.tx[palletRpc][callable](...transformed))
        : api.tx.sudo.sudo(api.tx[palletRpc][callable]());

      const unsub = txExecute.signAndSend(fromAcct, txResHandler)
        .catch(txErrHandler);
      this.setUnsub(() => unsub);
    };

    const uncheckedSudoTx = async () => {
      const fromAcct = await getFromAcct();
      const txExecute =
        api.tx.sudo.sudoUncheckedWeight(api.tx[palletRpc][callable](...inputParams), 0);

      const unsub = txExecute.signAndSend(fromAcct, txResHandler)
        .catch(txErrHandler);
      this.setUnsub(() => unsub);
    };

    const signedTx = async () => {
      const fromAcct = await getFromAcct();
      const transformed = transformParams(paramFields, inputParams);
      // transformed can be empty parameters

      const txExecute = transformed
        ? api.tx[palletRpc][callable](...transformed)
        : api.tx[palletRpc][callable]();

      const unsub = await txExecute.signAndSend(fromAcct, txResHandler)
        .catch(txErrHandler);
      this.setUnsub(() => unsub);
    };

    const unsignedTx = async () => {
      const transformed = transformParams(paramFields, inputParams);
      // transformed can be empty parameters
      const txExecute = transformed
        ? api.tx[palletRpc][callable](...transformed)
        : api.tx[palletRpc][callable]();

      const unsub = await txExecute.send(txResHandler)
        .catch(txErrHandler);
      this.setUnsub(() => unsub);
    };

    const queryResHandler = result =>{
      this.result=result;
    }
    const query = async () => {
      const transformed = transformParams([], []);
      const result = await api.query[palletRpc][callable](...transformed);
      console.log(result)
      return   result.toString();
    };

    const rpc = async () => {
      const transformed = transformParams(paramFields, inputParams, { emptyAsNull: false });
      const unsub = await api.rpc[palletRpc][callable](...transformed, queryResHandler);
      console.log(unsub)
      this.setUnsub(() => unsub);
    };

    const constant = () => {
      const result = api.consts[palletRpc][callable];
      result.isNone ? this.setStatus('None') : this.setStatus(result.toString());
    };

    const transaction = async () => {
      if (this.unsub) {
        this.unsub();
        this.setUnsub(null);
      }

     return await (isSudo() && sudoTx()) ||
      (isUncheckedSudo() && uncheckedSudoTx()) ||
      (isSigned() && signedTx()) ||
      (isUnsigned() && unsignedTx()) ||
      (isQuery() && query()) ||
      (isRpc() && rpc()) ||
      (isConstant() && constant());
    };

    const transformParams = (paramFields, inputParams, opts = { emptyAsNull: true }) => {

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
          converted = converted.map(single => isNumType(type)
            ? (single.indexOf('.') >= 0 ? Number.parseFloat(single) : Number.parseInt(single))
            : single
          );
          return [...memo, converted];
        }

        // Deal with a single value
        if (isNumType(type)) {
          converted = converted.indexOf('.') >= 0 ? Number.parseFloat(converted) : Number.parseInt(converted);
        }
        return [...memo, converted];
      }, []);
    };

    const isNumType = type =>
      this.utils.paramConversion.num.some(el => type.indexOf(el) >= 0);

    const allParamsFilled = () => {
      if (paramFields.length === 0) { return true; }

      return paramFields.every((paramField, ind) => {
        const param = inputParams[ind];
        if (paramField.optional) { return true; }
        if (param == null) { return false; }

        const value = typeof param === 'object' ? param.value : param;
        return value !== null && value !== '';
      });
    };

    const isSudoer = acctPair => {
      if (!sudoKey || !acctPair) { return false; }
      return acctPair.address === sudoKey;
    };

    return transaction();
  }




}

module.exports=TransactionService
