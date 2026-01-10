import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

// Getting emotions from emotionTags arrays of each object
function getEmotionsArray(data) {
  const emotionsArray = [];

  for (let obj of data) {
    for (let emotion of obj.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

// Rendering each emotions from emotionsArray
function renderEmotions(emotionArr) {
  const emotions = getEmotionsArray(emotionArr);
  let radioItems = "";

  for (let emotion of emotions) {
    radioItems += `
        <div class='radio'>
            <label for='${emotion}'>${emotion}</label>
            <input
                type='radio'
                id='${emotion}'
                value='${emotion}'
                name='emotions'
                >
        </div> 
        `;
  }
  emotionRadios.innerHTML = radioItems;
}
renderEmotions(catsData);
