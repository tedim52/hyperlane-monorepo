import { chainMetadata } from '@hyperlane-xyz/sdk';

import { ValidatorBaseChainConfigMap } from '../../../src/config/agent';
import { Contexts } from '../../contexts';
import { validatorBaseConfigsFn } from '../utils';

import { environment } from './chains';

export const validatorChainConfig = (
  context: Contexts,
): ValidatorBaseChainConfigMap => {
  const validatorsConfig = validatorBaseConfigsFn(environment, context);
  return {
    celo: {
      interval: 5,
      reorgPeriod: 0,
      validators: validatorsConfig(
        {
          [Contexts.Hyperlane]: [
            '0x63478422679303c3e4fc611b771fa4a707ef7f4a',
            '0x2f4e808744df049d8acc050628f7bdd8265807f9',
            '0x7bf30afcb6a7d92146d5a910ea4c154fba38d25e',
          ],
          [Contexts.ReleaseCandidate]: [],
        },
        'celo',
      ),
    },
    ethereum: {
      interval: 5,
      reorgPeriod: 20,
      validators: validatorsConfig(
        {
          [Contexts.Hyperlane]: [
            '0x03c842db86a6a3e524d4a6615390c1ea8e2b9541',
            '0x4346776b10f5e0d9995d884b7a1dbaee4e24c016',
            '0x749d6e7ad949e522c92181dc77f7bbc1c5d71506',
          ],
          [Contexts.ReleaseCandidate]: [],
        },
        'ethereum',
      ),
    },
    avalanche: {
      interval: 5,
      reorgPeriod: 3,
      validators: validatorsConfig(
        {
          [Contexts.Hyperlane]: [
            '0x3fb8263859843bffb02950c492d492cae169f4cf',
            '0xe58c63ad669b946e7c8211299f22679deecc9c83',
            '0x6c754f1e9cd8287088b46a7c807303d55d728b49',
          ],
          [Contexts.ReleaseCandidate]: [
            '0x706976391e23dea28152e0207936bd942aba01ce',
          ],
        },
        'avalanche',
      ),
    },
    polygon: {
      interval: 5,
      reorgPeriod: 256,
      validators: validatorsConfig(
        {
          [Contexts.Hyperlane]: [
            '0x12ecb319c7f4e8ac5eb5226662aeb8528c5cefac',
            '0x8dd8f8d34b5ecaa5f66de24b01acd7b8461c3916',
            '0xdbf3666de031bea43ec35822e8c33b9a9c610322',
          ],
          [Contexts.ReleaseCandidate]: [],
        },
        'polygon',
      ),
    },
    bsc: {
      interval: 5,
      reorgPeriod: 15,
      validators: validatorsConfig(
        {
          [Contexts.Hyperlane]: [
            '0x570af9b7b36568c8877eebba6c6727aa9dab7268',
            '0x7bf928d5d262365d31d64eaa24755d48c3cae313',
            '0x03047213365800f065356b4a2fe97c3c3a52296a',
          ],
          [Contexts.ReleaseCandidate]: [],
        },
        'bsc',
      ),
    },
    arbitrum: {
      interval: 5,
      reorgPeriod: 0,
      validators: validatorsConfig(
        {
          [Contexts.Hyperlane]: [
            '0x4d966438fe9e2b1e7124c87bbb90cb4f0f6c59a1',
            '0x6333e110b8a261cab28acb43030bcde59f26978a',
            '0x3369e12edd52570806f126eb50be269ba5e65843',
          ],
          [Contexts.ReleaseCandidate]: [],
        },
        'arbitrum',
      ),
    },
    optimism: {
      interval: 5,
      reorgPeriod: 0,
      validators: validatorsConfig(
        {
          [Contexts.Hyperlane]: [
            '0x20349eadc6c72e94ce38268b96692b1a5c20de4f',
            '0x04d040cee072272789e2d1f29aef73b3ad098db5',
            '0x779a17e035018396724a6dec8a59bda1b5adf738',
          ],
          [Contexts.ReleaseCandidate]: [
            '0x60e938bf280bbc21bacfd8bf435459d9003a8f98',
          ],
        },
        'optimism',
      ),
    },
    moonbeam: {
      interval: 5,
      reorgPeriod: 2,
      validators: validatorsConfig(
        {
          [Contexts.Hyperlane]: [
            '0x2225e2f4e9221049456da93b71d2de41f3b6b2a8',
            '0x4fe067bb455358e295bfcfb92519a6f9de94b98e',
            '0xcc4a78aa162482bea43313cd836ba7b560b44fc4',
          ],
          [Contexts.ReleaseCandidate]: [],
        },
        'moonbeam',
      ),
    },
    gnosis: {
      interval: 5,
      reorgPeriod: 14,
      validators: validatorsConfig(
        {
          [Contexts.Hyperlane]: [
            '0xd4df66a859585678f2ea8357161d896be19cc1ca',
            '0x06a833508579f8b59d756b3a1e72451fc70840c3',
            '0xb93a72cee19402553c9dd7fed2461aebd04e2454',
          ],
          [Contexts.ReleaseCandidate]: [],
        },
        'gnosis',
      ),
    },
    base: {
      interval: 5,
      reorgPeriod: 0,
      validators: validatorsConfig(
        {
          [Contexts.Hyperlane]: [
            '0xb9453d675e0fa3c178a17b4ce1ad5b1a279b3af9',
            '0x4512985a574cb127b2af2d4bb676876ce804e3f8',
            '0xb144bb2f599a5af095bc30367856f27ea8a8adc7',
          ],
          [Contexts.ReleaseCandidate]: [],
        },
        'base',
      ),
    },
    scroll: {
      interval: 5,
      reorgPeriod: 0,
      validators: validatorsConfig(
        {
          [Contexts.Hyperlane]: [
            '0xad557170a9f2f21c35e03de07cb30dcbcc3dff63',
            '0xb37fe43a9f47b7024c2d5ae22526cc66b5261533',
            '0x7210fa0a6be39a75cb14d682ebfb37e2b53ecbe5',
          ],
          [Contexts.ReleaseCandidate]: [],
        },
        'scroll',
      ),
    },
    polygonzkevm: {
      interval: 5,
      reorgPeriod: 0,
      validators: validatorsConfig(
        {
          [Contexts.Hyperlane]: [
            '0x86f2a44592bb98da766e880cfd70d3bbb295e61a',
            '0xc84076030bdabaabb9e61161d833dd84b700afda',
            '0x6a1da2e0b7ae26aaece1377c0a4dbe25b85fa3ca',
          ],
          [Contexts.ReleaseCandidate]: [],
        },
        'polygonzkevm',
      ),
    },
  };
};
