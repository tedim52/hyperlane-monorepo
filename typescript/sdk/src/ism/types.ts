import {
  IAggregationIsm,
  IMultisigIsm,
  IRoutingIsm,
  OPStackIsm,
  TestIsm,
} from '@hyperlane-xyz/core';
import type { Address, ValueOf } from '@hyperlane-xyz/utils';

import { ChainMap } from '../types';

// this enum should match the IInterchainSecurityModule.sol enum
// meant for the relayer
export enum ModuleType {
  UNUSED,
  ROUTING,
  AGGREGATION,
  LEGACY_MULTISIG, // DEPRECATED
  MERKLE_ROOT_MULTISIG,
  MESSAGE_ID_MULTISIG,
  NULL,
}

// this enum can be adjusted as per deployments necessary
// meant for the deployer and checker
export enum IsmType {
  OP_STACK = 'opStackIsm',
  ROUTING = 'domainRoutingIsm',
  AGGREGATION = 'staticAggregationIsm',
  MERKLE_ROOT_MULTISIG = 'merkleRootMultisigIsm',
  MESSAGE_ID_MULTISIG = 'messageIdMultisigIsm',
  TEST_ISM = 'testIsm',
}

// mapping betweent the two enums
export function ismTypeToModuleType(ismType: IsmType): ModuleType {
  switch (ismType) {
    case IsmType.OP_STACK:
      return ModuleType.NULL;
    case IsmType.ROUTING:
      return ModuleType.ROUTING;
    case IsmType.AGGREGATION:
      return ModuleType.AGGREGATION;
    case IsmType.MERKLE_ROOT_MULTISIG:
      return ModuleType.MERKLE_ROOT_MULTISIG;
    case IsmType.MESSAGE_ID_MULTISIG:
      return ModuleType.MESSAGE_ID_MULTISIG;
    case IsmType.TEST_ISM:
      return ModuleType.NULL;
  }
}

export type MultisigConfig = {
  validators: Array<Address>;
  threshold: number;
};

export type MultisigIsmConfig = MultisigConfig & {
  type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG;
};

export type TestIsmConfig = {
  type: IsmType.TEST_ISM;
};

export type RoutingIsmConfig = {
  type: IsmType.ROUTING;
  owner: Address;
  domains: ChainMap<IsmConfig>;
  // TODO: https://github.com/hyperlane-xyz/hyperlane-monorepo/issues/2895
  // defaultFallback?: boolean;
};

export type AggregationIsmConfig = {
  type: IsmType.AGGREGATION;
  modules: Array<IsmConfig>;
  threshold: number;
};

export type OpStackIsmConfig = {
  type: IsmType.OP_STACK;
  origin: Address;
  nativeBridge: Address;
};

export type IsmConfig =
  | Address
  | RoutingIsmConfig
  | MultisigIsmConfig
  | AggregationIsmConfig
  | OpStackIsmConfig
  | TestIsmConfig;

export type DeployedIsmType = {
  [IsmType.ROUTING]: IRoutingIsm;
  [IsmType.AGGREGATION]: IAggregationIsm;
  [IsmType.MERKLE_ROOT_MULTISIG]: IMultisigIsm;
  [IsmType.MESSAGE_ID_MULTISIG]: IMultisigIsm;
  [IsmType.OP_STACK]: OPStackIsm;
  [IsmType.TEST_ISM]: TestIsm;
};

export type DeployedIsm = ValueOf<DeployedIsmType>;
