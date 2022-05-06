import {buttons} from "./lang.js"

export const keyboard = document.createElement('div')

keyboard.classList.add('keyboard')


    for (let i = 0; i < 5; i++){
        const keyboardRow = document.createElement('div')
        keyboardRow.classList.add('keyboard__row')
        
            for (let k = 0; k < buttons[i].length; k++){
                let key = document.createElement('div')
                key.classList.add('keyboard__key')

                key.dataset.code = buttons[i][k].code
                key.dataset.letter = buttons[i][k].letter
                key.dataset.shftE = buttons[i][k].shftE
                key.dataset.shftR = buttons[i][k].shftR
                key.dataset.shftEn = buttons[i][k].shftEn
                key.dataset.shftRu = buttons[i][k].shftRu
                key.dataset.en = buttons[i][k].en
                key.dataset.ru = buttons[i][k].ru
                
                key.innerHTML = buttons[i][k].en
                if (key.innerHTML === 'Backspace') {
                    key.classList.add('backspace')
                }
                if (key.innerHTML === 'Tab' || key.innerHTML === 'Del') {
                    key.classList.add('tab')
                }
                if (key.innerHTML === 'Caps Lock') {
                    key.classList.add('caps')
                }
                if (key.innerHTML === 'Enter') {
                    key.classList.add('enter')
                }
                if (key.innerHTML === 'Shift Left') {
                    key.classList.add('shift_left')
                    key.innerHTML = 'Shift'
                }
                if (key.innerHTML === 'Shift Right') {
                    key.classList.add('shift_right')
                    key.innerHTML = 'Shift'
                }
                if (key.innerHTML === 'Space') {
                    key.classList.add('space')
                    key.innerHTML = ''
                }
                if (key.innerHTML === 'Up') {
                    key.innerHTML = "&#8593;";
                }
                if (key.innerHTML === 'Left') {
                    key.innerHTML = "&#8592;";
                }
                if (key.innerHTML === 'Down') {
                    key.innerHTML = "&#8595;";
                }
                if (key.innerHTML === 'Right') {
                    key.innerHTML = "&#8594;";
                }
                keyboardRow.append(key)
            }
        
    
        keyboard.append(keyboardRow)
    }













