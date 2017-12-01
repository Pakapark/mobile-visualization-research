<script>
var radios = document.getElementsByClassName("options");
var firstTime = document.getElementById("firstTime");
var lastTime = document.getElementById("lastTime");
var reluctance = document.getElementById("reluctance");
var result = document.getElementById("result");
for (var i = 0; i < radios.length; i++) {
  radios[i].onchange = (e) => {
    if (parseFloat(firstTime.value) < 1) firstTime.value = e.timeStamp;
    lastTime.value = e.timeStamp;
    reluctance.value = parseInt(reluctance.value) + 1;
    if(parseInt(e.target.value) == <%- JSON.stringify(correctAnswer) %>){
      result.value = 1;
    } else {
      result.value = 0;
    }
  }
}
</script>
