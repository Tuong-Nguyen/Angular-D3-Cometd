//Receive data
onmessage = function(e){
  if ( e.data === "start" ) {
    var array = [];

    //Initial
    for (var i = 50000000; i >= 0; i--) {
      array.push(i);
    };
    //Bubble sort the array
    function bubbleSort(array)
    {
      var swapped;
      do {
        swapped = false;
        for (var i=0; i < array.length-1; i++) {
          if (array[i] > array[i+1]) {
            var temp = array[i];
            array[i] = array[i+1];
            array[i+1] = temp;
            swapped = true;
          }
        }
      } while (swapped);
    }
    //Calculate time
    var start = new Date().getTime();
    bubbleSort(array);
    var end = new Date().getTime();
    var time = end - start;

    //Send data
    postMessage(time);
  }
};