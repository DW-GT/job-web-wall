
//var URL_STATIC_SERVER = 'http://jobwall.htl-leonding.ac.at:443';

var URL_STATIC_SERVER = '';//http://localhost:443'; // will be set below

var index = 0;
var maxIndex = 0;
setInterval(changeCurrentPdf, 10000)

function changeCurrentPdf() {
    if (index < data.length) {
        index++;
        if(maxIndex < data.length){
            // should be used to know if every pdf was at least be shown once!
            maxIndex++;
        }

    } else {
        index = 0;
    }
    pdfjsLib.getDocument(data[index]).then((pdf) => {
        myState.pdf = pdf;
        render();
    });
}

setInterval(getNewPdfList, 60_000) // 10 minutes = 600_000; 1 min = 60_000
function getNewPdfList(){
    if(maxIndex == data.length){
        location.reload();
    }
}

var data = [
    'http://jobwall.htl-leonding.ac.at:443/static/152_1663827363274.pdf',
    'http://jobwall.htl-leonding.ac.at:443/static/154_1663827449333.pdf'
]
updateData(); // set current data from server

var myState = {
    pdf: null,
    currentPage: 1,
    zoom: 1
}

//http://jobwall.htl-leonding.ac.at:443/static/154_1663827449333.pdf
//http://jobwall.htl-leonding.ac.at:443/static/152_1663827363274.pdf
//pdfjsLib.getDocument('./SaltmasterMonitor.pdf').then((pdf) => {
//pdfjsLib.getDocument('./my_document.pdf').then((pdf) => {
pdfjsLib.getDocument(data[index]).then((pdf) => {
//pdfjsLib.getDocument('http://jobwall.htl-leonding.ac.at:443/static/154_1663827449333.pdf').then((pdf) => {


    myState.pdf = pdf;
    render();

});

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


function updateData(){
    //todo run update to get real data every ... time
    URL_STATIC_SERVER = localStorage.getItem("pdfPath");
    const text = localStorage.getItem("allPDFdata")
    const obj = JSON.parse(text);
    console.log(obj)
    // todo check if obj is array!
    let newList = [];
    obj.forEach(function(value, index, array) {
        newList.push(URL_STATIC_SERVER + value.pdf_src); 
    });
    console.log(newList)
    index = 0
    data = newList
}
