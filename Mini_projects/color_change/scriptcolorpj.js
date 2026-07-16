const randomcolor = function () {
    const hx = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
        color += hx[Math.floor(Math.random() * 16)]
    }
    return color;
}
let interval;
function changebgcolor() {
    document.body.style.backgroundColor = randomcolor();
}
const startcolorchange = function () {
    if (!interval) {
        interval = setInterval(changebgcolor, 1000);
    }
}
const stopcolorchange = function () {
    clearInterval(interval)
    interval = null
}

document.querySelector("#start").addEventListener('click', startcolorchange)
document.querySelector("#stop").addEventListener('click', stopcolorchange)