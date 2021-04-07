const 
ipc = require('electron').ipcRenderer,
// syncBtn  = document.getElementById('syncBtn'),
// asyncBtn = document.getElementById('asyncBtn');
closeBtn = document.getElementById('close');

let replyDiv = document.getElementById('reply');

closeBtn.addEventListener('click', () => {
    ipc.send('aSynMessage','close')
});

// syncBtn.addEventListener('click', () => {
//   let 
//   reply = ipc.sendSync('synMessage','A sync message to main');
//   replyDiv.innerHTML = reply;
// });

// asyncBtn.addEventListener('click', () => {
//   ipc.send('aSynMessage','A async message to main')
// });

ipc.on('asynReply', (event, args) => {
  replyDiv.innerHTML = args;
});