// const availableModules = 
//   { name: "life-support", size: 10, enabled : false, essential: true },
//   { name: "propulsion", size: 20, enabled : false, essential: true },
//   { name: "navigation", size: 30, enabled : false, essential: true },
//   { name: "communication", size: 40, enabled : true , essential: true },
//   { name: "Module 5", size: 50, enabled : false, essential: true },
// ];
// Challenge #1: write a function called powerOn() which will change the
// 'powerOn' property of the 'ship' object
const powerOn = () => (ship.powerOn = true);

// Challenge #2: finding out how many modules there are
const countModules = () => availableModules.length;

// Challenge #3: write a function called countEssential() which will count
// how many modules from the availableModules array have the essential flag set.
const countEssential = () => {
  let count = 0;

  for (let essentialModule of availableModules) {
    if (essentialModule.essential) {
      count++;
    }
  }
  return count;
};

// Challenge #5: modularize your code
const findModuleIndex = (find, index) => {
  index = availableModules.findIndex(module => module.essential && module.name === find);
  return index;
};

// Challenge #4: When loadModule gets the index number of a module, it should
// load it into the ship's modules property (which is already an array). Before
// you load it in, set the enabled property to true
function loadModule(index) {
  availableModules[index].enabled = true;
  ship.modules.push(availableModules[index]);
}

loadModule(findModuleIndex("life-support"));
loadModule(findModuleIndex("propulsion"));
// Challenge #6: Load navigation module
loadModule(findModuleIndex("navigation"));

//Challenge #7: call a function called resetLARRY() which will prompt LARRY to quack ten times so he breaks out of his loop.
const resetLarry = () => {
  let i = 0;
  while (i < 10) {
    i++;
    LARRY.quack();
  }
};

resetLarry();

// Challenge #8: Load communications module
loadModule(findModuleIndex("communication"));

// Challenge #9: JSON version of navigation 
const setMessage = status => radio.message = JSON.stringify(status);
setMessage(navigation);

// Challenge #10: Activate beacon
const activateBeacon = () => radio.beacon = true;

// Challenge #11: Calculate radio frequency
const setFrequency = () => radio.frequency = (radio.range.low + radio.range.high) / 2;

// Challenge #12: Initialize navigation to zero
const initialize = () => {
  navigation.x = 0;
  navigation.y = 0;
  navigation.z = 0;
};

initialize();


/*  nav system's documentation shows that each axis (x, y, and z) needs to be
 *  calibrated
 */
const calibrateX = () => {
  let signal;
  for (i = 1; i <= 12; i++) {
    signal = checkSignal(i);
    if (signal !== undefined) {
      navigation.x = signal;
      break;
    }
  }
};

// Let's write calibrateY() and calibrateZ().
const calibrateY = () => {
  let signal;
  for (i=1; i <= 60; i++) {
    signal = checkSignal(i);
    if (signal !== undefined) {
      navigation.y = signal;
      break;
    }
  }
};

const calibrateZ = () => {
  let signal;
  for (i = 1; i <= 60; i++) {
    signal = checkSignal(i);
    if (signal !== undefined) {
      navigation.z = signal;
      break;
    }
  }
};

 /* Write a function called calibrate() which the nav system can call anytime 
  * it wants, which will calibrate your X, Y, and Z axes.
  */
const calibrate = () => {
 calibrateX();
 calibrateY();
 calibrateZ();
};

/* Write a function called setSpeed(speed) which will take in a string as a 
 * parameter, and set the speed in the navigation object (see globals above) 
 * to an integer.
 */
 const setSpeed = speed => {
   if (speed >= 0) navigation.speed = parseInt(speed);
 };
 
 const activateAntenna = () => ship.antenna.active = true;
 
// activateAntenna();
 
 const sendBroadcast = () => {
   for (let i = 0; i < 100; i++) {
     broadcast(i);
   }
 };
 
// sendBroadcast();

/* Challenge #19: Write and call a function called configureBroadcast() which 
*  will get the broadcast to Earth.
*/
const configureBroadcast = () => {
  setFrequency();
  activateAntenna();
  sendBroadcast();
};

configureBroadcast();

/* Challenge #20: This function takes in a coded message and changes all the 
*  numbers back to their respective vowels before returning the newly decoded 
*  message.
*/
const decodeMessage = message => { 
  let vowels = [
    ["a", "4"],
    ["e", "3"],
    ["i", "1"],
    ["o", "0"],
    ["u", "2"],
    ["y", "5"]
  ]; 
  
  vowels.forEach(vowel => message = message.replace(new RegExp(vowel[1], "g"), vowel[0]));
  return message;
};
