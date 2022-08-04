//Finding a MongoDb record with a query string pass
function createSearchQuery(form) {
    const params = new URLSearchParams(window.location.search)
    let id = params.id
     console.log(id, form)
    //Show animation
    document.getElementById('reportBody').style.display = "none";

    //fetch data
    const url = `https://pffm.azurewebsites.net/getForms/?form=${form}&id=${id}`
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