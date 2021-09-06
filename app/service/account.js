const Service = require('egg').Service;
const BN = require('bn.js');
const ZERO = new BN(0);

class AccountService extends Service{
  async demo(){
    return 2
  }
}
module.exports =AccountService;
