import {AutoOffsetResetEnum} from './auto-offset-reset-enum.enum';

export class KafkaProxyConfiguration {
  public PollingInterval: number;
  public AutoOffsetReset: AutoOffsetResetEnum;
  public AutoCommitEnable: boolean;
}
