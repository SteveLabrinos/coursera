(function (global) {
    // Set up a namespace for our utility
    const ajaxUtils = {};

    // Returns an HTTP request object
    function getRequestObject() {
        if (window.XMLHttpRequest) {
            return (new XMLHttpRequest());
        } else {
            global.alert('Ajax is not supported');
            return null;
        }
    }

    // Makes an Ajax GET request to 'requestUrl'
    ajaxUtils.sendGetRequest = function (requestUrl, responseHandler) {
        const request = getRequestObject();
        request.onreadystatechange = function () {
            handleResponse(request, responseHandler);
        };
        request.open('GET', requestUrl, true);
        request.send(null); // for POST only
    }

    // Only calls user provided 'resposneHandler'
    // function if response is ready
    // and not an error
    function handleResponse(request, responseHandler) {
        if ((request.readyState == 4) && (request.status == 200)) {
            responseHandler(request);
        }
    }

    // Expose utility to the global object
    global.$ajaxUtils = ajaxUtils;
})(window);