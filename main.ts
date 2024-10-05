input.onButtonPressed(Button.A, function () {
    start = 1
})
function vytvor_kometu (cislo_komety: number, delka: number, obracene: boolean) {
    for (let krok = 0; krok <= delka - 1; krok++) {
        if (obracene) {
            cislo_ledky = 9 - krok
        } else {
            cislo_ledky = krok
        }
        ledka = komety[cislo_komety].range(cislo_ledky, 1)
        ledka.setBrightness(255 / (delka - krok))
        ledka.showColor(neopixel.hsl(275, 100, 10 + delka * krok))
    }
}
input.onButtonPressed(Button.B, function () {
    start = 0
})
let ledka: neopixel.Strip = null
let cislo_ledky = 0
let start = 0
let komety: neopixel.Strip[] = []
basic.showIcon(IconNames.Ghost)
let delka_komety = 10
let horni_pasek = neopixel.create(DigitalPin.P1, 142, NeoPixelMode.RGB)
let horni_kometa = horni_pasek.range(0, delka_komety)
let dolni_pasek = neopixel.create(DigitalPin.P0, 142, NeoPixelMode.RGB)
let dolni_kometa = dolni_pasek.range(132, delka_komety)
dolni_kometa.showColor(neopixel.colors(NeoPixelColors.Violet))
komety = [horni_kometa, dolni_kometa]
vytvor_kometu(0, delka_komety, false)
vytvor_kometu(1, delka_komety, true)
start = 0
basic.forever(function () {
    if (start == 1) {
        horni_pasek.rotate(1)
        horni_pasek.show()
        dolni_pasek.rotate(-1)
        dolni_pasek.show()
    }
})
