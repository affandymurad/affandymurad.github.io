
/* Function */
function resetCtoF(){
    document.getElementsByName("celciusFahrenheit")[0].value = '';
    document.getElementsByName("celciusFahrenheitVal")[0].value = '';
    document.getElementsByName("celciusFahrenheitWay")[0].value = '';
 }

function calcCtoF(){
    var c = document.getElementsByName("celciusFahrenheit")[0].valueAsNumber;
    var f = 0;

    f = (c * (9 / 5)) + 32;
    if (!isNaN(c)) {
        document.getElementsByName("celciusFahrenheitVal")[0].value = f.toLocaleString();
        document.getElementsByName("celciusFahrenheitWay")[0].value = c.toLocaleString() +"°C x (9/5) + 32 = " + f.toLocaleString() +"°F";
    } else {
        document.getElementsByName("celciusFahrenheitVal")[0].value = '';
        document.getElementsByName("celciusFahrenheitWay")[0].value = '';
    }
 }

 function resetFtoC(){
    document.getElementsByName("celciusFahrenheit")[0].value = '';
    document.getElementsByName("celciusFahrenheitVal")[0].value = '';
    document.getElementsByName("celciusFahrenheitWay")[0].value = '';
 }

function calcFtoC(){
    var f = document.getElementsByName("fahrenheitCelcius")[0].valueAsNumber;
    var c = 0;

    c = (f - 32) * 5/9;
    if (!isNaN(f)) {
        document.getElementsByName("fahrenheitCelciusVal")[0].value = c.toLocaleString();
        document.getElementsByName("fahrenheitCelciusWay")[0].value = "(" + f.toLocaleString() +"°F - 32) x (5/9) = " + f.toLocaleString() +"°F";
    } else {
        document.getElementsByName("fahrenheitCelciusVal")[0].value = '';
        document.getElementsByName("fahrenheitCelciusWay")[0].value = '';
    }
 }

function switchFarCel() {
    document.getElementById("celfar").style.display = "none";
    document.getElementById("farcel").style.display = "block";
}

function switchCelFar() {
    document.getElementById("celfar").style.display = "block";
    document.getElementById("farcel").style.display = "none";
}