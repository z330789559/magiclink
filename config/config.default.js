/* eslint valid-jsdoc: "off" */

'use strict';

require('dotenv').config('../.env');

// kusama configuration
// const ksm = {
//   // The '127.0.0.1' or 'localhost' direct to container host, you must change it when you run in docker.
//   ws: 'ws://' + (process.env.SUBSTRATE_WS_HOST || '127.0.0.1') + ':' + (process.env.SUBSTRATE_WS_PORT || '9944'),
//   unit: process.env.SUBSTRATE_UNIT || 'KSM',
// };
const supply_address="5DDhRLJr2CYU5RCsXcJeoJ5eR7PFFx1CRw3tgbTze5qZUcE6"
const fromAcc="0xac8209b366b72b5644d0718004d9edc24add4047a42ef3e3301607bd5c7c43aa"
// logger
const logger = {
  level: 'DEBUG',
};

const logrotator = {
  maxFileSize: 10 * 1024 * 1024,
  maxFiles: 10,
  rotateDuration: 30000,
};
console.log('-------------------%s', process.env.MYSQL_HOST)

// database configuration
// const mysql = {
//    // load into app, default is open
//    app: true,
//    // load into agent, default is close
//    agent: false,
//   client: {
//     // The '127.0.0.1' or 'localhost' direct to container host, you must change it when you run in docker.
//     host: process.env.MYSQL_HOST || '127.0.0.1',
//     port: process.env.MYSQL_PORT || '3306',
//     user: process.env.MYSQL_USERNAME || 'root',
//     password: process.env.MYSQL_PASSWORD || 'test',
//     database: process.env.MYSQL_DATABASE || 'parami',
//     charset: 'utf8mb4',
//   },
// };

// const email = {
//   client: {
//      host: 'smtp.qq.com',
//      secureConnection: true,
//      port: 465,
//      auth: {
//          user: 'test_user',
//          pass: 'test_pass'
//      }
//   }
// }
console.log('Development enviroment is starting =============');
const io = {
  init: {}, // passed to engine.io
  namespace: {
    '/': {
      connectionMiddleware: [],
      packetMiddleware: [],
    },
  },
};

const security = {
  csrf: {
    queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
    bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
  },
  csp: {
    enable: false,
    policy: {
      'default-src': 'none',
      'script-src': 'self',
      'connect-src': 'self',
      'img-src': 'self',
      'style-src': 'self',
    },
  },
};

const cors = {
  origin: '*',
  allowHeaders: '*',
  allowMethods: 'GET,PUT,POST,OPTIONS',
  credentials: true,
};


// egg-swagger-doc 配置信息。
const swaggerdoc = {
  dirScanner: './app/controller', // 配置自动扫描的控制器路径。
  // 接口文档的标题，描述或其它。
  apiInfo: {
    title: 'NAPI',  // 接口文档的标题。
    description: 'swagger-ui for NAPI document.',   // 接口文档描述。
    version: '1.0.0',   // 接口文档版本。
  },
  schemes: ['http', 'https'], // 配置支持的协议。
  consumes: ['application/json'], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html。
  produces: ['application/json'], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。
  securityDefinitions: {  // 配置接口安全授权方式。
    // apikey: {
    //   type: 'apiKey',
    //   name: 'clientkey',
    //   in: 'header',
    // },
    // oauth2: {
    //   type: 'oauth2',
    //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
    //   flow: 'password',
    //   scopes: {
    //     'write:access_token': 'write access_token',
    //     'read:access_token': 'read access_token',
    //   },
    // },
  },
  enableSecurity: false,  // 是否启用授权，默认 false（不启用）。
  // enableValidate: true,    // 是否启用参数校验，默认 true（启用）。
  routerMap: true,    // 是否启用自动生成路由，默认 true (启用)。
  enable: true,   // 默认 true (启用)。
};

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
  const config = exports = {};
  config.cluster = {
    listen: {
      path: '',
      port: 8011,
      hostname: '0.0.0.0',
    }
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1573638285088_5858';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];
  config.errorHandler = {
    match: '/api',
  };

  // add your user config h
  // ere
  const userConfig = {
    swaggerdoc,
    // ksm,
    logger,
    logrotator,
    // mysql,
    // email,
    io,
    security,
    cors,
    // supply_address,
    // fromAcc
  };

  return {
    ...config,
    ...userConfig,
  };
};
