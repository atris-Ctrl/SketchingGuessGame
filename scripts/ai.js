import * as tf from '@tensorflow/tfjs';
import {items} from "./timer.js";
async function loadModel(){
    let model = await tf.loadLayersModel("model.json");
    return model;
}


const model = loadModel();

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

function predictImg(imgData){
    model.then(function (res) {
        const prediction = res.predict(preprocess(imgData)).dataSync();
        const argMaxIndex = tf.argMax(prediction).dataSync()[0];
        console.log(argMaxIndex);
        // console.log(items[argMaxIndex]);
        console.log(prediction);
        
    }, function (err) {
        console.log(err);
    });
    // return items[argMaxIndex];
}

function getMaxValueIndex(arr) {
    if (arr.length === 0) {
        throw new Error("Array is empty");
    }

    let maxIndex = 0;
    let maxValue = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxValue) {
            maxValue = arr[i];
            maxIndex = i;
        }
    }

    return maxIndex;
}
export {model, predictImg};