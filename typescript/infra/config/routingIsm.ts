import {
  AggregationIsmConfig,
  ChainMap,
  ChainName,
  IsmConfig,
  IsmType,
  ModuleType,
  RoutingIsmConfig,
  TestChains,
} from '@hyperlane-xyz/sdk';

import { DeployEnvironment } from '../src/config';

import { Contexts } from './contexts';
import { supportedChainNames as mainnet3Chains } from './environments/mainnet3/chains';
import { owners as mainnet3Owners } from './environments/mainnet3/owners';
import { owners as testOwners } from './environments/test/owners';
import { supportedChainNames as testnet4Chains } from './environments/testnet4/chains';
import { owners as testnet4Owners } from './environments/testnet4/owners';
import { multisigIsm } from './multisigIsm';

const owners = {
  test: testOwners,
  testnet4: testnet4Owners,
  mainnet3: mainnet3Owners,
};

const chains = {
  test: TestChains,
  testnet4: testnet4Chains,
  mainnet3: mainnet3Chains,
};

// Intended to be the "entrypoint" ISM.
// Routing ISM => Aggregation (1/2)
//                 |              |
//                 |              |
//                 v              v
//            Merkle Root    Message ID
export const routingIsm = (
  environment: DeployEnvironment,
  local: ChainName,
  context: Contexts,
): RoutingIsmConfig | string => {
  const aggregationIsms: ChainMap<AggregationIsmConfig> = chains[environment]
    .filter((_) => _ !== local)
    .reduce(
      (acc, chain) => ({
        ...acc,
        [chain]: aggregationIsm(chain, context),
      }),
      {},
    );

  return {
    type: IsmType.ROUTING,
    domains: aggregationIsms,
    owner: owners[environment][local],
  };
};

// Aggregation (1/2)
// |              |
// |              |
// v              v
// Merkle Root    Message ID
export const aggregationIsm = (
  remote: ChainName,
  context: Contexts,
): AggregationIsmConfig => {
  return {
    type: IsmType.AGGREGATION,
    modules: [
      // Ordering matters to preserve determinism
      multisigIsm(remote, IsmType.MERKLE_ROOT_MULTISIG, context),
      multisigIsm(remote, IsmType.MESSAGE_ID_MULTISIG, context),
    ],
    threshold: 1,
  };
};

const replacerEnum = (key: string, value: any) => {
  if (key === 'type') {
    switch (value) {
      case ModuleType.AGGREGATION:
        return 'AGGREGATION';
      case ModuleType.ROUTING:
        return 'ROUTING';
      case ModuleType.MERKLE_ROOT_MULTISIG:
        return 'MERKLE_ROOT_MULTISIG';
      case ModuleType.LEGACY_MULTISIG:
        return 'LEGACY_MULTISIG';
      case ModuleType.MESSAGE_ID_MULTISIG:
        return 'MESSAGE_ID_MULTISIG';
      default:
        return value;
    }
  }
  return value;
};

export const printIsmConfig = (ism: IsmConfig): string => {
  return JSON.stringify(ism, replacerEnum, 2);
};
