// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Struct, u32} from '@polkadot/types';
import type { AccountId, AssetId ,Balance} from '@polkadot/types/interfaces/runtime';

/** @name setIndex */
export interface setIndex extends u32 {}

/** @name Swap */
export interface Swap extends Struct {
  readonly tokenId: AssetId;
  readonly swapToken: AssetId;
  readonly account: AccountId;
}

/** @name TokenBalance */
export interface TokenBalance extends Balance {}

/** @name TokenDossier */
export interface TokenDossier extends Bytes {}

export type PHANTOM_SWAPS = 'swaps';
