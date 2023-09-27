const DASHBOARD_TIME_PER_DOCUMENT_DISPLAYTIME_MS = 20_000; // 3 docs per Minute
const RELOAD_TIME_FOR_NEW_DATA = 600_000; // 10 minutes = 600_000; 1 min = 60_000
var URL_STATIC_SERVER = '';

var index = -1;
var maxIndex = -1;
setInterval(changeCurrentPdf, DASHBOARD_TIME_PER_DOCUMENT_DISPLAYTIME_MS)

function changeCurrentPdf() {
    if (index < data.length-1) {
        index++;
        if(maxIndex < data.length){
            // should be used to know if every pdf was at least be shown once!
            maxIndex++;
        }

    } else {
        index = 0;
    }
    //console.log(index);
    //console.log(data);
    pdfjsLib.getDocument(data[index]).then((pdf) => {
        myState.pdf = pdf;
        render();
    });
    document.getElementById("qrcode").innerHTML="";
    //console.log(data[index])
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: data[index],
        width: 150,
        height: 150,
        colorDark : "#000000",
        colorLight : "#ffffff00", //full transparent
        correctLevel : QRCode.CorrectLevel.H
    });
    document.getElementById('qrcode').getElementsByTagName('img')[0].style.margin = "auto";
    document.getElementById('qrcode').getElementsByTagName('img')[0].style.height = "20vh";
}

setInterval(getNewPdfList, RELOAD_TIME_FOR_NEW_DATA) // 10 minutes = 600_000; 1 min = 60_000
function getNewPdfList(){
    if(maxIndex == data.length){
        location.reload();
    }
}

let data = []
//updateData(); // set current data from server
setTimeout(updateData, 500)

let myState = {
    pdf: null,
    currentPage: 1,
    zoom: 1
}
setTimeout(changeCurrentPdf, 600)


function render() {
    myState.pdf.getPage(myState.currentPage).then((page) => {
    
        var canvas = document.getElementById("pdf_renderer");
        var ctx = canvas.getContext('2d');

        var viewport = page.getViewport(myState.zoom);

        canvas.width = viewport.width;
        canvas.height = viewport.height;
    
        page.render({
            canvasContext: ctx,
            viewport: viewport
        });
    });
}

function getPdfPath(element){
    return URL_STATIC_SERVER + element.pdf_src;
}

function updateData(){
    //todo run update to get real data every ... time
    URL_STATIC_SERVER = localStorage.getItem("pdfPath");
    const text = localStorage.getItem("allPDFdata")
    const obj = JSON.parse(text);
    //console.log(obj)
    const newArr = obj.map(getPdfPath);
    index = -1
    maxIndex = -1
    data = newArr
}
