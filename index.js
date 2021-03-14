var audio_volume = 1.0;

var image_url;
const api_call = () => {
    const URL ="https://api.unsplash.com/photos/random?query=drums"
    fetch(URL,{
        headers :{
            'Authorization': 'Client-ID nxtW_ASvyOBULfsfbu5q7eVRyc93M8ry97F3V2YhfTc'
        }
    }).then(res=>res.json())
    .then(res=>{
        image_url = res.urls.small
        change_background(image_url)
    })
    .catch(error => console.log(error))
}

api_call()

const change_background = (image_src) => {
    let container_style = document.getElementsByClassName('container')[0].style
    let bg_color = getComputedStyle(document.documentElement).getPropertyValue('--background_low')
    container_style.background = `linear-gradient(300deg, ${bg_color},${bg_color}),url(${image_src})`
    container_style.backgroundSize ='cover'
    container_style.backgroundPosition ='center'
}

const bg_changer = document.getElementById("util__button-background")
bg_changer.addEventListener('click',()=>{
    api_call()
})

const animate = (key) => {
    const currentKey = document.querySelector(`.${key}`)
    currentKey.classList.add('pressed')
    setTimeout(() => {
        currentKey.classList.remove('pressed')
    }, 250)

}

const playMusic = (path) => {
    const audio = new Audio(path);
    audio.volume = audio_volume
    audio.play();

}

document.addEventListener("keypress", (event) => {
    const triggeredKey = event.key;
    makeSound(triggeredKey)
    animate(triggeredKey)
})


const slider = document.getElementById("volume__slider")
slider.oninput = (event) => {
    audio_volume = event.target.value / 100
}


//theme 1
const theme_1__background = "#091921";
const theme_1__background_low = "rgba(9,25,33,0.8)";
const theme_1__text = "#00fff1";

//theme 2
const theme_2__background = "#f7c340";
const theme_2__background_low = "rgba(247,195,64,0.85 )";
const theme_2__text = "#2d2d2d";

const change_theme = (theme) => {
    let root = document.documentElement
    if(theme === "theme_1") {
    root.style.setProperty("--background", theme_1__background)
    root.style.setProperty("--background_low", theme_1__background_low)
    root.style.setProperty("--text", theme_1__text)
    change_background()
    }
    else{
        root.style.setProperty("--background", theme_2__background)
        root.style.setProperty("--background_low", theme_2__background_low)
        root.style.setProperty("--text", theme_2__text)
    }
}

var current_theme = "theme_1"
const themeChanger = document.getElementById("util__button-theme")
themeChanger.addEventListener("click", (e)=>{
    themeChanger.classList.add("change_theme__pressed")
    setTimeout(()=>{
         themeChanger.classList.remove("change_theme__pressed")
    },200)
    if(current_theme=="theme_1"){
        change_theme("theme_2")
        current_theme = "theme_2"
    }else{
        change_theme("theme_1")
        current_theme="theme_1"
      }
    })

var auto_music_id;
var auto_music_on = false;
const start_auto_music = () => {
    const letters = ["w", "a", "s", "d", "j", "k", "l"]

    auto_music_id = setInterval(() => {
        const current_key = letters[Math.floor(Math.random() * letters.length)]
        makeSound(current_key)
        animate(current_key)

    }, 300)



}

const auto_music_button = document.getElementById("util__button-auto")
auto_music_button.addEventListener("click", () => {

    if (!auto_music_on) {
        start_auto_music()
        auto_music_on = true
        auto_music_button.classList.add("auto_music_on")
        auto_music_button.innerText = "Stop Auto Music"
    }
    else {
        clearInterval(auto_music_id)
        auto_music_on = false
        auto_music_button.classList.remove("auto_music_on")
        auto_music_button.innerText = "Start Auto Music"

    }
})


const makeSound = (key) => {

    switch (key) {
        case "w":
            playMusic("sounds/sound-1.mp3");
            break;
        case "a":
            playMusic("sounds/sound-2.mp3");
            break;
        case "s":
            playMusic("sounds/sound-3.mp3");
            break;
        case "d":
            playMusic("sounds/sound-4.mp3");
            break;
        case "j":
            playMusic("sounds/sound-5.mp3");
            break;
        case "k":
            playMusic("sounds/sound-6.mp3");
            break;
        case "l":
            playMusic("sounds/sound-7.mp3");
            break;
        default:
            console.log("hey wrong button!!");


    }


}

const handleDrumClick = (event) => {
    var innerHTML = event.target.innerHTML;
    animate(innerHTML)
    makeSound(innerHTML)
}

var drums = document.querySelectorAll(".drum")
for (let i = 0; i < drums.length; i++) {
    drums[i].addEventListener("click", handleDrumClick)
}
