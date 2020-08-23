// STEP 6: Wrap the entire contents of SpeakGoodBye.js inside of an IIFE
(function (window) {
    // DO NOT attach the speakWord variable to the 'byeSpeaker' object.
    const speakWord = "Good Bye";
    // STEP 7: Create an object, called 'byeSpeaker' to which you will attach
    // the "speak" method and which you will expose to the global context
    const byeSpeaker = {
        // STEP 8: Rewrite the 'speak' function such that it is attached to the
        // byeSpeaker object instead of being a standalone function.
        speak: function (name) {
            console.log(`${speakWord} ${name}`);
        }
    };
    // STEP 9: Expose the 'byeSpeaker' object to the global scope. Name it
    // 'byeSpeaker' on the global scope as well.
    window.byeSpeaker = byeSpeaker;
})(window);


