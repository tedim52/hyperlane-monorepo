import { TestQuerySender__factory } from '@hyperlane-xyz/core';
import {
  ChainName,
  HyperlaneDeployer,
  MultiProvider,
} from '@hyperlane-xyz/sdk';

export const TEST_QUERY_SENDER_FACTORIES = {
  TestQuerySender: new TestQuerySender__factory(),
};

type TestQuerySenderConfig = { queryRouterAddress: string };

export class TestQuerySenderDeployer extends HyperlaneDeployer<
  TestQuerySenderConfig,
  typeof TEST_QUERY_SENDER_FACTORIES
> {
  constructor(multiProvider: MultiProvider) {
    super(multiProvider, TEST_QUERY_SENDER_FACTORIES);
  }

  async deployContracts(chain: ChainName, config: TestQuerySenderConfig) {
    const TestQuerySender = await this.deployContract(
      chain,
      'TestQuerySender',
      [],
      [config.queryRouterAddress],
    );
    return {
      TestQuerySender,
    };
  }
}
