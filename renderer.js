const ipc = require('electron').ipcRenderer

const closeBtn = document.getElementById('close');
const updateBtn = document.getElementById('update');
const startSim = document.getElementById('simStart');

const updateCloseBtn = document.getElementById('updateClose');

const submitSimBtn = document.getElementById('submitSim');
const closeSimBtn = document.getElementById('closeSim');


//let replyDiv = document.getElementById('reply');
if(closeBtn != null || updateBtn != null || startSim != null){
    closeBtn.addEventListener('click', () => {
        ipc.send('aSynMessage','close')
    });

    updateBtn.addEventListener('click', () => {
        ipc.send('aSynMessage','update')
    });

    startSim.addEventListener('click', () => {
        ipc.send('aSynMessage','startSim')
    });

}

if(updateCloseBtn != null){
    updateCloseBtn.addEventListener('click', () => {
        ipc.send('aSynMessage','updateClose')
    });
}

if(submitSimBtn != null || closeSimBtn != null){
    submitSimBtn.addEventListener('click', () => {
        ipc.send('aSynMessage','submitSim')
    });

    closeSimBtn.addEventListener('click', () => {
        ipc.send('aSynMessage','closeSim')
    });

}

// ipc.on('asynReply', (event, args) => {
//   replyDiv.innerHTML = args;
// });