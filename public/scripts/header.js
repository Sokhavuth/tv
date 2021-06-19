function toKhNum(number) {
    var khNum = {'0':'០', '1':'១', '2':'២', '3':'៣', '4':'៤', '5':'៥', '6':'៦', '7':'៧', '8':'៨', '9':'៩'};
    var stringNum = number.toString();
    var khString = '';

    for(var i in stringNum){
        var char = stringNum.charAt(i);
        khString += khNum[char];
    }

    return khString;
}

function clock(){
    var period = 'ព្រឹក'
    var today = new Date()
    var h = today.getHours()

    if(h>12){
        h = h-12
        period = 'ល្ងាច'
    }

    var m = today.getMinutes()
    var s = today.getSeconds()
    m = toKhNum(checkTime(m))
    s = toKhNum(checkTime(s))
    h = toKhNum(h)

    document.getElementById('kh-clock').innerHTML = 'ម៉ោង '+(h) + " : " + (m) + " : " + (s) +' ' + period
    var t = setTimeout(clock, 500)
}

function checkTime(i) {
    if (i < 10){i = "0" + i}  
    return i
}

clock()