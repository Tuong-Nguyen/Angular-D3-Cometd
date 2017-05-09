import {AutoOffsetResetEnum} from './auto-offset-reset-enum.enum';

export class KafkaProxyConfiguration {
  public AutoOffsetReset: AutoOffsetResetEnum;
  public AutoCommitEnable: boolean;
}
