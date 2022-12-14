const input = document.querySelector("#input");
const preview = document.querySelector("#preview");


if (!!window.SharedWorker) {
  const myWorker = new SharedWorker("./worker.js");
  input.oninput = function () {
    myWorker.port.postMessage(input.value);
    console.log("Message posted to worker", input.value);
  };

  myWorker.port.addEventListener("message", function (e) {
    preview.textContent = e.data;
    input.value =  e.data
    console.log("Message received from worker", e.data);
    console.log(e.lastEventId);
  });

  myWorker.port.start();
}