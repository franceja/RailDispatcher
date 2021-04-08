const ipc = require('electron').ipcRenderer
//MAIN PAGE ELEMENT
const closeBtn = document.getElementById('close');
const updateBtn = document.getElementById('update');
const startSim = document.getElementById('simStart');
//UPDATE LIST
const updateCloseBtn = document.getElementById('updateClose');
const updateStatusDiv = document.getElementById('updateStatus');
//SIMULATION PAGE
const submitSimBtn = document.getElementById('submitSim');
const closeSimBtn = document.getElementById('closeSim');
const bangkokStnBtn = document.getElementById('bangkokStn');
const bangsueGrandStnBtn = document.getElementById('bangsueGrandStn');
const nakhonPathomStnBtn = document.getElementById('nakhonPathomStn');

const closeMapBtn = document.getElementById('closeMap');

function httpGet(theUrl)
{
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            return xmlhttp.responseText;
        }
    }

    xmlhttp.open("GET", theUrl, false );
    xmlhttp.send();    
}

if(updateStatusDiv!= null){
    let replyDiv = document.querySelector('#updateStatus');
    ipc.send('aSynMessage','updateStatus');
    ipc.on('asynReply', (event, args) => {
        var currentVersion = '1.0.0';
        var replyMsg = '<table class="table table-sm table-borderless"><tr><td>Release Version</td> <td>'+currentVersion+'</td></tr> <tr><td>Program version</td><td>'+args+'</td></tr></table>';
        replyDiv.innerHTML = replyMsg;
    });
}

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

if(closeMapBtn!= null){
    closeMapBtn.addEventListener('click', () => {
        ipc.send('aSynMessage','closeMap')
    });
}

if(updateCloseBtn != null){
    updateCloseBtn.addEventListener('click', () => {
        ipc.send('aSynMessage','updateClose')
    });
}

if(submitSimBtn != null || closeSimBtn != null || bangkokStn != null || bangsueGrandStnBtn!= null || nakhonPathomStnBtn != null){

    bangkokStnBtn.addEventListener('click', () => {
        ipc.send('aSynMessage','bangkokStn')
        submitSimBtn.classList.remove('disabled');
        submitSimBtn.removeAttribute('disabled');
    });
    bangsueGrandStnBtn.addEventListener('click', () => {
        ipc.send('aSynMessage','bangsueGrandStn')
        submitSimBtn.classList.remove('disabled');
        submitSimBtn.removeAttribute('disabled');
    });
    nakhonPathomStnBtn.addEventListener('click', () => {
        ipc.send('aSynMessage','nakhonPathomStn')
        submitSimBtn.classList.remove('disabled');
        submitSimBtn.removeAttribute('disabled');
    });
    submitSimBtn.addEventListener('click', () => {
        ipc.send('aSynMessage','submitSim')
    });
    closeSimBtn.addEventListener('click', () => {
        ipc.send('aSynMessage','closeSim')
    });

    let replyDiv = document.querySelector('#dialog');

    ipc.on('asynReply', (event, args) => {
        replyDiv.innerHTML = args;
    });
}
