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

// Creating an array of matched emotions by matching emotions from radio inputs and emotionTags
function getMatchingEmotionArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isGif = gifsOnlyOption.checked;

    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingCatsArray;
  }
}

// Getting a random object from matched emotions array to render
function getRandomObj() {
  let matchedEmotions = getMatchingEmotionArray();
  console.log(matchedEmotions);

  if (matchedEmotions.length === 1) {
    return matchedEmotions[0];
  } else {
    const randomNumber = Math.floor(Math.random() * matchedEmotions.length);
    return matchedEmotions[randomNumber];
  }
}

// Rendering the random object from getRandomObj
function render() {
  const obj = getRandomObj();
  console.log(obj);

  memeModalInner.innerHTML = `
    <img
    class="img"
    src="./images/${obj.image}"
    alt="${obj.alt}"
    >`;
  memeModal.style.display = "flex";
}

// Event Listeners

getImageBtn.addEventListener("click", render);
