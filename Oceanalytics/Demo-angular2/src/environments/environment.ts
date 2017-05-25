// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  generalErr: 'Internal error',
  result: 'realtimesubscriptionresponse1',
  rsr: 'realtimesubscriptionrequest1',
  pump: 'realtimemeasurespumpuprequest1',
  kafka_rest_proxy: 'http://11.11.254.102:8082', // 192.168.104.18 - 11.11.254.102 - 10.134.44.202
  AGENTMEASURES: 'AGENTMEASURES4',
  AGENTBYACCOUNTMEASURES: 'AGENTBYACCOUNTMEASURES4',
  ROUTINGSERVICEMEASURES: 'ROUTINGSERVICEMEASURES4',
  AGENTBYROUTINGSERVICEMEASURES: 'AGENTBYROUTINGSERVICEMEASURES4',
  AGENTMEASURESMOVINGWINDOW: 'AGENTMEASURESMOVINGWINDOW4',
  AGENTBYACCOUNTMEASURSMOVINGWINDOW: 'AGENTBYACCOUNTMEASURESMOVINGWINDOW4',
  ROUTINGSERVICEMEASURESMOVINGWINDOW: 'ROUTINGSERVICEMEASURESMOVINGWINDOW4',
  AGENTBYROUTINGSERVICEMEASURESMOVINGWINDOW: 'AGENTBYROUTINGSERVICEMEASURESMOVINGWINDOW4',
  success: 'SUCCESS' // result string: FAILURE or SUCCESS
};
