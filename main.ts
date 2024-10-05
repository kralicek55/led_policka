function svit_fialovou () {
    rezim = 5
    svit_barvou(neopixel.colors(NeoPixelColors.Violet))
}
function svit_bile () {
    rezim = 3
    svit_barvou(neopixel.colors(NeoPixelColors.White))
}
input.onButtonPressed(Button.A, function () {
    // 1
    svit_tyrkysove()
})
function litej_kometo () {
    rezim = 2
}
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
function svit_tyrkysove () {
    rezim = 1
    svit_barvou(neopixel.rgb(19, 84, 78))
}
function svit_zlute () {
    rezim = 4
    svit_barvou(neopixel.colors(NeoPixelColors.Yellow))
}
function svit_barvou (barva: number) {
    horni_pasek.showColor(barva)
    dolni_pasek.showColor(barva)
}
makerbit.onIrDatagram(function () {
    if (makerbit.irDatagram() == "0x00FFA25D") {
        // 1
        svit_tyrkysove()
    } else if (makerbit.irDatagram() == "0x00FF629D") {
        // 2
        litej_kometo()
    } else if (makerbit.irDatagram() == "0x00FFE21D") {
        svit_bile()
    } else if (makerbit.irDatagram() == "0x00FF22DD") {
        svit_zlute()
    } else if (makerbit.irDatagram() == "0x00FF02FD") {
        svit_fialovou()
    }
})
/**
 * Rezim
 * 
 * 1 - svit tyrkysove
 * 
 * 2 - litej kometo
 * 
 * 3 - svit bile
 * 
 * 4 - svit zlute
 */
let ledka: neopixel.Strip = null
let cislo_ledky = 0
let rezim = 0
let komety: neopixel.Strip[] = []
let dolni_pasek: neopixel.Strip = null
let horni_pasek: neopixel.Strip = null
basic.showIcon(IconNames.Ghost)
makerbit.connectIrReceiver(DigitalPin.P2, IrProtocol.NEC)
let delka_komety = 10
horni_pasek = neopixel.create(DigitalPin.P1, 71, NeoPixelMode.RGB)
dolni_pasek = neopixel.create(DigitalPin.P0, 71, NeoPixelMode.RGB)
let horni_pasek_komety = neopixel.create(DigitalPin.P1, 142, NeoPixelMode.RGB)
let horni_kometa = horni_pasek_komety.range(0, delka_komety)
let dolni_pasek_komety = neopixel.create(DigitalPin.P0, 142, NeoPixelMode.RGB)
let dolni_kometa = dolni_pasek_komety.range(132, delka_komety)
komety = [horni_kometa, dolni_kometa]
vytvor_kometu(0, delka_komety, false)
vytvor_kometu(1, delka_komety, true)
svit_tyrkysove()
basic.forever(function () {
    if (rezim == 2) {
        horni_pasek_komety.rotate(1)
        horni_pasek_komety.show()
        dolni_pasek_komety.rotate(-1)
        dolni_pasek_komety.show()
    }
})
