const video= document.querySelector('video');
const printText= document.querySelector('[data-text]');
 


async function setup(){
    // for video stream using camera laptop/other devices
   const stream= await navigator.mediaDevices.getUserMedia({video:true    })
    video.srcObject=stream;
    video.addEventListener('playing',async()=>{
        const worker=Tesseract.createWorker();
       await worker.load();
       await  worker.loadLanguage("eng");
       await  worker.initialize("eng");



const canvas=document.createElement('canvas')
canvas.width=video.width
canvas.height=video.width



// adding event listent Whenever spacebar is clicked
document.addEventListener('keypress',async e =>{
    try{
if (e.code!=='Space') return
    // canvas will take images from the video if SPACEBAR is pressed

    // drawing the canvas from (0,0) coordinated to (video.width,video.height)
    canvas.getContext('2d').drawImage(video,0,0,video.width,video.height)

    // running RECOGNIZE FUNCTION
// it will return an obj but we need only text from obj
// const obj= await worker.recognize(canvas);

const {data:{text}}= await worker.recognize(canvas);
    
   printText.textContent=text;
   console.log(text);
//    for speaking the text
   speechSynthesis.speak(new SpeechSynthesisUtterance(text.replace( /\s/g, " " )))
    }
    catch(err){
        printText.textContent=err;
    }
})

})
}
setup()