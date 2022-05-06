import {buttons} from "./lang.js"

class Keyboard {
    constructor() {
        this.keyboard
        this.keyboardRow
        this.key
    }
    createKeyboard(buttons) {
        this.keyboard = document.createElement('div')
        this.keyboard.classList.add('keyboard')
        this.createKeyboardRow(buttons)
        return this.keyboard
    }
    createKeyboardRow(buttons) {
        for (let i = 0; i < buttons.length; i++){
            this.keyboardRow = document.createElement('div')
            this.keyboardRow.classList.add('keyboard__row')
            this.createKeyButton(buttons[i])     
            this.keyboard.append(this.keyboardRow)
        }
    }
    createKeyButton (keyboradRow) {
        for (let k = 0; k < keyboradRow.length; k++){
            this.key = document.createElement('div')
            this.key.classList.add('keyboard__key')

            this.key.dataset.code = keyboradRow[k].code
            this.key.dataset.letter = keyboradRow[k].letter
            this.key.dataset.shftE = keyboradRow[k].shftE
            this.key.dataset.shftR = keyboradRow[k].shftR
            this.key.dataset.shftEn = keyboradRow[k].shftEn
            this.key.dataset.shftRu = keyboradRow[k].shftRu
            this.key.dataset.en = keyboradRow[k].en
            this.key.dataset.ru = keyboradRow[k].ru
            
            this.key.innerHTML = keyboradRow[k].en
            if (this.key.innerHTML === 'Backspace') {
                this.key.classList.add('backspace')
            }
            if (this.key.innerHTML === 'Tab' || this.key.innerHTML === 'Del') {
                this.key.classList.add('tab')
            }
            if (this.key.innerHTML === 'Caps Lock') {
                this.key.classList.add('caps')
            }
            if (this.key.innerHTML === 'Enter') {
                this.key.classList.add('enter')
            }
            if (this.key.innerHTML === 'Shift Left') {
                this.key.classList.add('shift_left')
                this.key.innerHTML = 'Shift'
            }
            if (this.key.innerHTML === 'Shift Right') {
                this.key.classList.add('shift_right')
                this.key.innerHTML = 'Shift'
            }
            if (this.key.innerHTML === 'Space') {
                this.key.classList.add('space')
                this.key.innerHTML = ''
            }
            if (this.key.innerHTML === 'Up') {
                this.key.innerHTML = "&#8593;";
            }
            if (this.key.innerHTML === 'Left') {
                this.key.innerHTML = "&#8592;";
            }
            if (this.key.innerHTML === 'Down') {
                this.key.innerHTML = "&#8595;";
            }
            if (this.key.innerHTML === 'Right') {
                this.key.innerHTML = "&#8594;";
            }
            this.keyboardRow.append(this.key)
        }
    }
}

let board = new Keyboard() 
export const keyboard = board.createKeyboard(buttons)













