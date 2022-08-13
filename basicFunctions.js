const domtoimage = require('dom-to-image');

//creating a query string

function createSearchQuery(form, id) {
     console.log(id, form)
    //Show animation
    document.getElementById('reportBody').style.display = "none";

    //fetch data
    const url = `https://pffm.azurewebsites.net/getForms/?form=${form}&key=${id}`
    const header = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    fetch(url, {
        method: "GET",
        headers: header
    })
        .then(response => response.json())
        .then(data => populatePage(data))
        .catch(console.error)
}


//send notification

function notify(to, message, type) {
    toSend = {
        'to': to,
        'message': message,
        'type': type
    }

    const url = `https://pffm.azurewebsites.net/notices`
    const header = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    }

    fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(toSend)
    })
        .then(() => console.log(`message to ${to} was sent`))
        .catch(console.error)
    
}



