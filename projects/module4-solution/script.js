// *******************************
// START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
// *******************************
//
// Module 4 Assignment Instructions.
//
// STEP 1:
// Wrap the entire contents of script.js inside of an IIFE
(function () {
    var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
    // STEP 10:
    // Loop over the names array and say either 'Hello' or "Good Bye"
    names.forEach(function (name) {
        let firstLetter = name.charAt(0).toLowerCase();
        (firstLetter == 'j') ? byeSpeaker.speak(name) : helloSpeaker.speak(name);
    })
})();

