const MIN_RATING = 1;
const MAX_RATING = 5;
const MOVIES = ["The Cooking Wizard", "The Light Horse", "Galaxy Battle", "Merriam: The King of Cat", "Curry Potter"];
const NUM_TIME_FRAME = 9;

function initData(){
  var timeframeData = {}
  for (var i = 0; i < MOVIES.length; i++){
    timeframeData[MOVIES[i]] = {
      "rating A": 0,
      "rating B": 0
    }
  }
  return timeframeData;
}

function getRandomNumber(min, max) {
  return Math.round(100*(Math.random()*(max - min) + min))/100;
}

// DATA TYPE 1: A > B monotonically increasing
function dataType1(){
  var data = [];
  var baseRandom, timeFrameData;
  const randomRange = (MAX_RATING - MIN_RATING)/(NUM_TIME_FRAME + 1);
  var randomADivider = getRandomNumber(1, 1.2);
  var randomBDivider = getRandomNumber(1.2, 2);
  for (var i = 0; i < NUM_TIME_FRAME; i++) {
    baseRandomA = MIN_RATING + i*randomRange/randomADivider;
    baseRandomB = MIN_RATING + i*randomRange/randomBDivider;
    timeFrameData = [];
    for (var j = 0; j < MOVIES.length; j++){
      timeFrameData.push([getRandomNumber(baseRandomA, baseRandomA + randomRange), getRandomNumber(baseRandomB, baseRandomB + randomRange)]);
    }
    data.push(timeFrameData)
  }
  return data;
}

// DATA TYPE 2: A < B monotonically increasing
function dataType2(){
  var data = [];
  var baseRandom, timeFrameDatam;
  const randomRange = (MAX_RATING - MIN_RATING)/(NUM_TIME_FRAME + 1);
  var randomADivider = getRandomNumber(1.2, 2);
  var randomBDivider = getRandomNumber(1, 1.2);
  for (var i = 0; i < NUM_TIME_FRAME; i++) {
    baseRandomA = MIN_RATING + i*randomRange/randomADivider;
    baseRandomB = MIN_RATING + i*randomRange/randomBDivider;
    timeFrameData = [];
    for (var j = 0; j < MOVIES.length; j++){
      timeFrameData.push([getRandomNumber(baseRandomA, baseRandomA + randomRange), getRandomNumber(baseRandomB, baseRandomB + randomRange)]);
    }
    data.push(timeFrameData)
  }
  return data;
}

// DATA TYPE 3: A ~ B monotonically increasing
function dataType3(){
  var data = [];
  var baseRandom, timeFrameDatam;
  const randomRange = (MAX_RATING - MIN_RATING)/(NUM_TIME_FRAME + 1);
  var randomDivider = getRandomNumber(1, 2);
  for (var i = 0; i < NUM_TIME_FRAME; i++) {
    baseRandom = MIN_RATING + i*randomRange/randomDivider;
    timeFrameData = [];
    for (var j = 0; j < MOVIES.length; j++){
      timeFrameData.push([getRandomNumber(baseRandom, baseRandom + randomRange), getRandomNumber(baseRandom, baseRandom + randomRange)]);
    }
    data.push(timeFrameData)
  }
  return data;
}

// DATA TYPE4: A > B decreasing
function dataType4(){
  var data = [];
  var baseRandom, timeFrameDatam;
  const randomRange = (MAX_RATING - MIN_RATING)/(NUM_TIME_FRAME + 1);
  var randomADivider = getRandomNumber(1, 1.2);
  var randomBDivider = getRandomNumber(1.2, 2);
  for (var i = NUM_TIME_FRAME -1; i >= 0; i--) {
    baseRandomA = MIN_RATING + i*randomRange/randomADivider;
    baseRandomB = MIN_RATING + i*randomRange/randomBDivider;
    timeFrameData = [];
    for (var j = 0; j < MOVIES.length; j++){
      timeFrameData.push([getRandomNumber(baseRandomA, baseRandomA + randomRange), getRandomNumber(baseRandomB, baseRandomB + randomRange)]);
    }
    data.push(timeFrameData)
  }
  return data;
}


// DATA TYPE 5: A < B decreasing
function dataType5(){
  var data = [];
  var baseRandom, timeFrameDatam;
  const randomRange = (MAX_RATING - MIN_RATING)/(NUM_TIME_FRAME + 1);
  var randomADivider = getRandomNumber(1.2, 1);
  var randomBDivider = getRandomNumber(1, 1.2);
  for (var i = NUM_TIME_FRAME -1; i >= 0; i--) {
    baseRandomA = MIN_RATING + i*randomRange/randomADivider;
    baseRandomB = MIN_RATING + i*randomRange/randomBDivider;
    timeFrameData = [];
    for (var j = 0; j < MOVIES.length; j++){
      timeFrameData.push([getRandomNumber(baseRandomA, baseRandomA + randomRange), getRandomNumber(baseRandomB, baseRandomB + randomRange)]);
    }
    data.push(timeFrameData)
  }
  return data;
}

function dataType6(){
  var data = [];
  var baseRandom, timeFrameDatam;
  const randomRange = (MAX_RATING - MIN_RATING)/(NUM_TIME_FRAME + 1);
  var randomDivider = getRandomNumber(1, 2);
  for (var i = NUM_TIME_FRAME - 1; i >= 0; i--) {
    baseRandom = MIN_RATING + i*randomRange/randomDivider;
    timeFrameData = [];
    for (var j = 0; j < MOVIES.length; j++){
      timeFrameData.push([getRandomNumber(baseRandom, baseRandom + randomRange), getRandomNumber(baseRandom, baseRandom + randomRange)]);
    }
    data.push(timeFrameData)
  }
  return data;
}

// DATA TYPE 7: A increasing and B decreasing
function dataType7(){
  var data = [];
  var baseIncreaseRandom, baseDecreaseRandom, timeFrameData;
  const randomRange = (MAX_RATING - MIN_RATING)/(NUM_TIME_FRAME + 1);
  var randomADivider = getRandomNumber(1,2);
  var randomBDivider = getRandomNumber(1,2);
  for (var i = 0; i < NUM_TIME_FRAME; i++) {
    baseIncreaseRandom = MIN_RATING + i*randomRange/randomADivider;
    baseDecreaseRandom = MAX_RATING - i*randomRange/randomBDivider - randomRange;
    timeFrameData = [];
    for (var j = 0; j < MOVIES.length; j++){
      timeFrameData.push([getRandomNumber(baseIncreaseRandom, baseIncreaseRandom + randomRange), Math.min(5.0, getRandomNumber(baseDecreaseRandom, baseDecreaseRandom + randomRange))])
    }
    data.push(timeFrameData)
  }
  return data;
}

// DATA TYPE 8: A increasing and B decreasing
function dataType8(){
  var data = [];
  var baseIncreaseRandom, baseDecreaseRandom, timeFrameData;
  const randomRange = (MAX_RATING - MIN_RATING)/(NUM_TIME_FRAME + 1);
  var randomADivider = getRandomNumber(1,2);
  var randomBDivider = getRandomNumber(1,2);
  for (var i = 0; i < NUM_TIME_FRAME; i++) {
    baseIncreaseRandom = MIN_RATING + i*randomRange/randomADivider;
    baseDecreaseRandom = MAX_RATING - i*randomRange/randomBDivider - randomRange;
    timeFrameData = [];
    for (var j = 0; j < MOVIES.length; j++){
      timeFrameData.push([Math.min(5.0, getRandomNumber(baseDecreaseRandom, baseDecreaseRandom + randomRange)), getRandomNumber(baseIncreaseRandom, baseIncreaseRandom + randomRange)])
    }
    data.push(timeFrameData)
  }
  return data;
}



module.exports = (option) => {
  switch (option) {
    case 1: return dataType1();
    case 2: return dataType2();
    case 3: return dataType3();
    case 4: return dataType4();
    case 5: return dataType5();
    case 6: return dataType6();
    case 7: return dataType7();
    case 8: return dataType8();
    default: return null; // Testing
  }
  return dataType1();
}
