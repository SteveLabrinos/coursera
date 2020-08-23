// // Older approach
// document.addEventListener('DOMContentLoaded', function (evt) {
//     document.querySelector('button').addEventListener('click', function () {
//         $ajaxUtils.sendGetRequest('data/bio.json', function (response) {
//             let message = createMessage(response);
//             document.querySelector('#content').textContent = 
//             message;
//         });
//     })
// })

// Creating message using JSON string
function createMessage(str) {
    let message = `${str.firstName} ${str.lastName}`;
    message += (str.likesChiniseFood) ? ' likes' : 'don\'t like';
    message += ' Chinise food';
    message += ` and has ${str.numberOfKids} kids!!!`;
    return message;
}

// // Newer approach using fetch for txt file name
// document.addEventListener('DOMContentLoaded', function () {
//     document.querySelector('button').addEventListener('click', function () {
//         getRequestedData ('data/name.txt');
//     });
// });

// function getRequestedData (url) {
//     fetch(url).then(function (response) {
//         return response.text();
//     }).then(function (text) {
//         document.querySelector('#content').textContent = `Hello ${text}`;
//     });
// }

// Newer approach using fetch for json file
// Event Listener for DOMContentLoaded is not needed 
// as the script load on defer property
// Also, the script ajax-utils is not needed with this approach
document.querySelector('button').addEventListener('click', function () {
    getRequestedData('data/bio.json');
});

function getRequestedData(url) {
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (text) {
        const message = createMessage(text);
        document.querySelector('#content').textContent = message;
    });
}