import * as tf from '@tensorflow/tfjs';

async function loadModel(){
    const model = await tf.loadLayersModel("../model/model1.json");
    return model;
}

function preprocess(imgData)
{
return tf.tidy(()=>{
    //convert the image data to a tensor 
    let tensor = tf.browser.fromPixels(imgData, numChannels= 1)
    //resize to 28 x 28 
    const resized = tf.image.resizeBilinear(tensor, [28, 28]).toFloat()
    // Normalize the image 
    const offset = tf.scalar(255.0);
    const normalized = tf.scalar(1.0).sub(resized.div(offset));
    //We add a dimension to get a batch shape 
    const batched = normalized.expandDims(0)
    return batched
})
}
function hello(){
    console.log("fjjj")
}
function predictImg(item, imgData){
    const res = model.predic(imgData)
}

const model = loadModel();