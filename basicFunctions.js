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

function notify(to, message, type, priority) {
    toSend = {
        'to': to,
        'message': message,
        'type': type,
        'priority': priority 
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

async function getNotifications(user) {
    const url = `https://pffm.azurewebsites.net/notices`
    const header = {
        "Access-Control-Allow-Origin": "*"
    }
    let uri = url+"?"+user
    
    fetch(uri, {
        method: "GET",
        headers: header
    })
        .then(result => result.json())
        .then((data) => {
            return sort(notices)
        })
        .catch(console.error)
    
}

async function sort(notices) {
    let urgent = [];
    let family = [];
    let client = [];
    let staff = [];
    let admin = [];
    notices.forEach((notice) => {
        if (notice.priority == 'high') { urgent.push(notice) }
        if (notice.type == 'family') { family.push(notice) }
        if (notice.type == 'client') { client.push(notice) }
        if (notice.type == 'staff') { staff.push(notice) }
        else {admin.push(notice)}
    })
    let sortedNotices = {
        'urgent': urgent,
        'family': family,
        'client': client,
        'staff': staff,
        'admin' : admin
    }
    return sortedNotices
}





