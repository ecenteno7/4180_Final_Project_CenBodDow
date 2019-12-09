# RPi3 IoT Alarm Clock
### ECE 4180 A
Brett Bodamer, Erik Centeno, Dallas Downing

## Overview
The goal of this project is to merge components from two major products in order to design a more practical, consumer-oriented experience. Many Internet of Things devices can tend to be somewhat gimmicky, as all new technologies are, in order to show off the newest features that can be exploited to create the next revolution. From internet connected kitchen devices, to more practical devices such as an Amazon Echo, to industrial applications which are fueling the growth of the manufacturing industry, these IoT devices have a lot of potential to start to merge into holistic products with a lot of practical value.

![Final Product](URL)

With the advent of smartphones, smart assistants, and smart watches, the alarm clock has seemingly faded into the technology graveyard. However, our group believed that alarm clocks still have the potential to make a resurgence built around practical features. What if your alarm clock acted like your mom when you were younger, forcing you to get out of bed and not leaving you alone until you were **_really_** awake? This smart alarm clock allows you to set an alarm along with a code the night before. The next morning, you have to remember the code that you entered the night before in order to turn the alarm off. Otherwise, the clock will increase the stimulus by turning up the volume and increasing the LED blinking intensity. This keeps the user on his/her toes and is built around the core functionality of actually making sure they start their day right. Additionally, the clock is paired with a high resolution touchscreen display that shows at-a-glance current weather and world news. The alarm consists of an LED ring stimulus and music, which are detailed later on this page.

## Components
### AWS IoT Core
Being an Internet of Things device, Amazon Web Services IoT Core is the backbone of how this alarm clock runs. IoT Core runs off of using MQTT as a communication protocol between devices. This project uses three “devices” which are communicating with one another: a JavaScript controlled GUI which displays to the user, a C script which controls the speakers and LED ring, and the user’s cell phone which is used to set the alarms.

### MQTT
MQTT is a lightweight communication protocol which is commonly used in IoT devices. It is based off of the premise that many devices exist and do not communicate directly with one another. Instead, all communication is routed through a “broker.” Devices can subscribe to various “topics” which are used to differentiate what information they see/can send information to. Likewise, the devices can publish to various topics. Any device that is subscribed to a topic which has a message published to it will be able to see these messages. The broker in this case manages what devices are subscribed to which topics. When a device publishes a message to a specific topic, the broker handles this message and sends it to all other devices subscribed to the same topic. This protocol is fantastic for vast, complicated sensor networks with various functionalities and workgroups.

### Our Device Topology
In our case, the layout is much simpler. The JavaScript GUI is served in an HTML file from a Node.JS server. This Node.JS server is built inside of a script which connects to AWS IoT Core. The script subscribes to the “sdkTest/sub” topic and also publishes to the same topic. This script is detailed later in this document. The C Script which controls the speakers and LED ring also is written inside of a larger script which connects to AWS IoT Core (and subscribes/publishes to “sdkTest/sub”). Lastly, the user’s cell phone connects to the system by using a node-red built user interface. More information on node-red setup can be found here (add hyperlink, don’t need to go into more detail since it’s covered in lab). The UI is built using nodes that are installed from node-red-dashboard. This webpage takes in information inputted by the user to set their alarm, including the date/time and code to turn it off. A JavaScript function converts this user input into a single string which can be interpreted by the C Script and GUI and sends it to the AWS IoT Core broker on the topic “sdkTest/sub.” This lays the foundation for communication between the three major functions in our embedded device.


### Included Files
Information and a detailed tutorial for AWS IoT Core setup can be found [here](https://aws.amazon.com/iot-core/). The GitHub repository in this project omits the entirety of the AWS provided directories, as to avoid publishing any private information to a public location. AWS requires a full account setup and includes various API keys and certificates inside of its directories, so only the main scripts that were edited are included in this repository (with sensitive information excluded). The files “device-example.js” and “subscribe-publish-sample.c” are included to show how the embedded device is setup and runs. If you would like to recreate this project, simply replace these files in the AWS provided sample project directories and include your own user-generated certificates and keys from your account.






