var radios = document.getElementsByClassName("options");
var firstTime = document.getElementById("firstTime");
var lastTime = document.getElementById("lastTime");
for (var i = 0; i < radios.length; i++) {
  radios[i].onchange = (e) => {
    if (parseFloat(firstTime.value) < 1) firstTime.value = e.timeStamp;
    lastTime.value = e.timeStamp;
    console.log(firstTime.value, lastTime.value);
  }
}
