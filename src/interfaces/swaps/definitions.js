"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Copyright 2017-2021 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0
// order important in structs... :)

/* eslint-disable sort-keys */
/**  API/INIT: RPC methods not decorated: publish_token
 *    METADATA: Unknown types found, no types for Id, Swap, TokenBalance, TokenDossier
 *   REGISTRY: Unable to resolve type TokenBalance, it will fail on construction
 */
var _default = {
  rpc: {},
  types: {
    setIndex:'u32',
    Swap:{
      tokenId: 'AssetId',
	   // The "swap token" id.
	    swapToken: 'AssetId',
	  // This swap account.
	    account: 'AccountId',
    },
    TokenBalance:'balance',
    TokenDossier:'Bytes'
  }
};
exports.default = _default;