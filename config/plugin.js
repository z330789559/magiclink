'use strict';

/** @type Egg.EggPlugin */


module.exports = {
  swaggerdoc: {
    enable: true, // 是否启用。
    package: "egg-swagger-doc", // 指定包名称。
  },
  io: {
    enable: true,
    package: 'egg-socket.io',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
//  mysql = {
//     enable: true,
//     package: 'egg-mysql',
//   },
  // email = {
  //   enable: true,
  //   package: 'egg-email',
  // }
};
