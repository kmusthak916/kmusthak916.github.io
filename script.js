let today = new Date($.now())
let json
const successClass = "bg-success"
const ongoingClass = "bg-primary"
const errorClass = "bg-danger"

$(document).ready(()=>{
    $('#modal').modal({backdrop: 'static', keyboard: false})
    console.log('Loading...')
    // $('#modal').modal('show')
    readJSON().done(()=>{
        setInterval(()=>{
            today = new Date($.now())
            runDateTime(today, today, today)
        }, 1000)

        displayMemory('fajr-azan')
        displayMemory('fajr-jamat')
        displayMemory('zuhar-azan')
        displayMemory('zuhar-jamat')
        displayMemory('asr-azan')
        displayMemory('asr-jamat')
        displayMemory('maghrib-azan')
        displayMemory('maghrib-jamat')
        displayMemory('isha-azan')
        displayMemory('isha-jamat')
        displayMemory('jumah-azan')
        displayMemory('jumah-jamat')

        displayMemory('sahr')
        displayMemory('iftar')
        displayMemory('fajr-aaqri-waqt')
        displayMemory('subah-sadiq')
        displayMemory('ishraq')
        displayMemory('chasth')
    }) 
})


function readJSON(key){
    deferred = $.Deferred()
    $.getJSON("./read.json", function(result){
        json = result
        deferred.resolve()
    })
    return deferred.promise()
}

function displayMemory(id){
    list = ['sahr', 'iftar', 'fajr-aaqri-waqt', 'subah-sadiq', 'ishraq', 'chasth']
    if(list.includes(id)){
        ch = "#" + id
        $(ch).val(json.others[id])
    }
    else{
        ch = "#" + id
        id = id.split("-")
        $(ch).val( json[id[0]][id[1]] )
    }
}

function getToday(todate){
    const month = todate.getMonth() + 1
    const day = todate.getDate()
    const today = day + "/" + month + "/" + todate.getFullYear()
    //console.log(today)
    return today
}

function getTemperature(){
    navigator.geolocation.getCurrentPosition(
        function (position) {
            alert('processing')
            document.getElementById("txtLat").value = position.coords.latitude;
            document.getElementById("txtLon").value = position.coords.longitude;
        },
        function (error) {
            alert(error.code + ": " + error.message);
        }
    );
}

function getHijri(todate){
    let myFormat = 'en-u-ca-islamic-umalqura-nu-latn'
    let year = new Intl.DateTimeFormat(myFormat,{year:'numeric'}).format(todate);
    let month = new Intl.DateTimeFormat(myFormat,{month:'2-digit'}).format(todate);
    let date = new Intl.DateTimeFormat(myFormat,{day:'2-digit'}).format(todate);
    let today = date + "/" + month + "/" + year.slice(0, -3)
    return today
}

function getTime(time){
    hours = time.getHours() % 12;
    hours = hours ? hours : 12
    mintes = time.getMinutes().toString()
    return hours + ":" + mintes.padStart(2,'0')
}

function runDateTime(today, hijri, time){
    let colon = 1
    $('#date').val(getToday(today))
    $('#hijri').val(getHijri(hijri))
    $('#time').val(getTime(time))
}

function updateMemory(type, time){
    let myData = {type: type, time: time}
    console.log(myData)
    $.ajax({
        url: "./update.php",
        data: myData,
        type: "POST",
        success: ()=>{
            console.log("Stored in Website")
        },
        error: ()=>{console.log("error")}
    })
}

//Toast Messages
function Info(Class, Title, Body){
    var deferred = $.Deferred()
    const toast = $(".toast")
    toast.addClass(Class)
    $(".toast-header").addClass(Class)
    $("#infoTitle").html(Title)
    $("#infoBody").html(Body)
    toast.show()
    toast.animate({bottom:'0px'})
    toast.delay(3000)
    toast.fadeOut(1000)
    toast.promise().done(()=>{
        toast.removeClass(Class)
        deferred.resolve()
    })
    return deferred.promise()
    
}
