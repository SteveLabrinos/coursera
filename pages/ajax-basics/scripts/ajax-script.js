document.addEventListener('DOMContentLoaded', function (evt) {
    document.querySelector('button').addEventListener('click', function () {
        $ajaxUtils.sendGetRequest('data/name.txt', function (request) {
            let name = request.responseText;
            document.querySelector('#content').textContent = `Hello ${name}`;
        });
    })
})