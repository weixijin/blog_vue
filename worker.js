// Receive the message from the main thread
onmessage = function(event) {
    // Do something
    var info = event.data;
    var result = info + ' rise up!';
    console.log('result',result);
    postMessage(result);
  };