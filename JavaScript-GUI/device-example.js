/*
 * Copyright 2010-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

//node.js deps

//npm deps

//app deps
const deviceModule = require('..').device;
const cmdLineProcess = require('./lib/cmdline');

// Start express
const express = require('express')
const app = express()
const port = 3000
var path = require('path')

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))
app.use(express.static(__dirname + '/img'));

var server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//begin module

function processTest(args) {
   //
   // The device module exports an MQTT instance, which will attempt
   // to connect to the AWS IoT endpoint configured in the arguments.
   // Once connected, it will emit events which our application can
   // handle.
   //
   const device = deviceModule({
      keyPath: args.privateKey,
      certPath: args.clientCert,
      caPath: args.caCert,
      clientId: args.clientId,
      region: args.region,
      baseReconnectTimeMs: args.baseReconnectTimeMs,
      keepalive: args.keepAlive,
      protocol: args.Protocol,
      port: args.Port,
      host: args.Host,
      debug: args.Debug
   });

   var timeout;
   var count = 0;
   const minimumDelay = 250;

   var testMsg = device.subscribe('sdkTest/sub');

   var socket = require('socket.io');
   var http = require("http");

   var io = socket(server);

   io.on('connect', function(socket){
      io.emit('connected',1);

      let Parser = require('rss-parser');
      let parser = new Parser();
      
      socket.on('feedUpdateREQ', function(){
         console.log("update feed req received");
         (async () => {
            let feed = await parser.parseURL('http://feeds.bbci.co.uk/news/world/rss.xml');
            socket.emit('next-item', feed);
         })();

         device
      .on('connect', function() {
         console.log('connect');
      });
   device
      .on('close', function() {
         console.log('close');
      });
   device
      .on('reconnect', function() {
         console.log('reconnect');
      });
   device
      .on('offline', function() {
         console.log('offline');
      });
   device
      .on('error', function(error) {
         console.log('error', error);
      });

      var numPadOn = '1_A';
      var numPadOff = '1_B';

   device
      .on('message', function(topic, payload) {
         console.log('testMsg: ', payload.toString());
         var msg = payload.toString();
         var code = msg[0];
         var subcode = msg[2];
         if (code.localeCompare(numPadOn[0])==0) {
            if (subcode.localeCompare(numPadOn[2])==0){
               console.log("enable num pad");
               var alarmCode = msg.substring(4);
               socket.emit('enableNumPad', alarmCode);
            }
            else if ((subcode.localeCompare(numPadOff[2])==0)){
               console.log("disable num pad");
               socket.emit('disableNumPad', 1);
            }
         }
      });

      })
      socket.on('alarmNotification', function(alarmNotification){
         if (alarmNotification){
            device.publish('sdkTest/sub', '3_0');
            socket.emit('disableNumPad', 1);
         }
         else if (!alarmNotification) {
            device.publish('sdkTest/sub', '3_1');
         }
      })
   })
   

   //device.publish('sdkTest/sub', "testMode = 1 from NodeJS");

   

}

module.exports = cmdLineProcess;

if (require.main === module) {
   cmdLineProcess('connect to the AWS IoT service and publish/subscribe to topics using MQTT, test modes 1-2',
      process.argv.slice(2), processTest);
}




