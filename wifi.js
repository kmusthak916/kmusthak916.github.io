const btn = $('.trigger')
const submit = $('#send')

let focused

function Modal(Title, Type) {
    $('.modal-title').html(Title)
    $('#modalDisplay').prop("type", Type)
}

$('#modalDisplay').change(()=>{
    $('#okay').prop('disabled', false)
})

$('#okay').click(function(){
    Info(ongoingClass, 'Processing...', 'Uploading data to the device')
    $('#okay').prop('disabled', true)
    $('#close').prop('disabled', true)
    Connection(focused, $('#modalDisplay').val())
    .done(()=>{
        updateMemory(focused, $('#modalDisplay').val())
        $('#close').click()
    })
    .fail(()=>{
        $('#okay').prop('disabled', false)
        $('#close').prop('disabled', false)
    })
    //console.log(typeof focused)
})

$('.trigger').click(function(event){
    $('#modal').modal('show')
    focused = event.target.id
    switch (focused) {
        case 'hijri':
            Modal('Hijiri', 'text')
            break;
        case 'date':
            Modal('Date', 'date')
            break;
        default:
            Modal('Time', 'time')
            break;
        
    }
})

//Connection
function Connection(type, value){
    let deferred = $.Deferred()
    const ip = "http://192.168.4.1/update?"
    const url = ip + type + "=" + value
    fetch(url, {'mode':'no-cors'})
    .then(()=>{
        Info(successClass, 'Uploaded', 'Upload Success')
        deferred.resolve()
    })
    .catch(()=>{
        Info(errorClass, 'Fail', 'Check the Connection')
        deferred.reject()
    })
    return deferred.promise()
}
