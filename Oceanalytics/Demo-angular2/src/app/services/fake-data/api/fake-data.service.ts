// import {Injectable, Optional} from '@angular/core';
// import {Observable} from 'rxjs/Rx';
//
//
// @Injectable()
// export class FakeDataService {
//   constructor() {}
//
//   var schemaStartDayAgentByAccount = {
//     type: 'object',
//     properties: {
//       user: {
//         type: 'object',
//         properties: {
//           Agent_ID: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Provider_ID: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Account_ID: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Supervisor_ID: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Offered: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Completed: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Abandoned: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Not_Answered: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Conferenced: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Answered: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Consults: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Transfers: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Logged_In_Time: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Hold_Time: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Alert_Time: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Active_Time: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Not_Ready_Time: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Disconnects_From_Hold: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Long_Holds: {
//             $ref: '#/definitions/positiveInt'
//           },
//           First_Name: {
//             type: 'string',
//             faker: 'name.firstName'
//           },
//           Last_Name: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           Display_Name: {
//             type: 'string',
//             faker: 'name.findName'
//           },
//           Supervisor_First_Name: {
//             type: 'string',
//             faker: 'name.firstName'
//           },
//           Ready: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Not_Ready: {
//             $ref: '#/definitions/positiveInt'
//           },
//           Channel: {
//             type: 'string',
//             faker: 'name.findName'
//           },
//           loginTimeStamp: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           logoutTimeStamp: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           lastStateChangeTimestamp: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           LastStateReasonTimestamp: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           agentbyAccountState: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           Long_Engagements: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           Short_Engagements: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           Long_Wrap_Ups: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           Short_Wrap_Ups: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           Holds: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           NR_Reason_Code: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           NR_Reason_Code_Name: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           Blended_Active_Time: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           ADHOC: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           ADHOC_DURATION: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           Long_Wrap_Ups: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           Long_Wrap_Ups: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           Long_Wrap_Ups: {
//             type: 'string',
//             faker: 'name.lastName'
//           },
//           email: {
//             type: 'string',
//             format: 'email',
//             faker: 'internet.email'
//           }
//         },
//         required: ['id', 'name', 'email']
//       }
//     },
//     required: ['user'],
//     definitions: {
//       positiveInt: {
//         type: 'integer',
//         minimum: 0,
//         exclusiveMinimum: true
//       }
//     }
//   };
//
//
// }
//
