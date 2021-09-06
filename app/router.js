'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.post('/transfor', controller.home.transfor);
  // router.post('/setAccountAmount', controller.home.setAccountAmount);
  router.get('/createAccount', controller.home.createAccount);
  router.post('/addAccount', controller.home.addAccount);
  router.get('/sendTelegram',controller.home.sendTelegram)
  //getRewards
};

