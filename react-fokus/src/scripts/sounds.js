const toggle = document.querySelector('#toggle-music')

const audio = new Audio('/sounds/lofi.mp3')
audio.loop = true

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        audio.play()
    } else {
        audio.pause()
    }
})

const audio2 = new Audio('/sounds/ta-da-2.mp3')

export function acordaPorra(){
    audio2.play()
}