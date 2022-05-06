import { keyboard} from './keyboard.js';

const body = document.querySelector('body')

// add container
const container = document.createElement('div')
container.classList.add('container')
body.prepend(container);

// add title
container.insertAdjacentHTML('afterbegin', '<h1>Virtual Keyboard</h1>')

//add textarea
const textarea = document.createElement('textarea')
textarea.setAttribute("autofocus", true)
container.append(textarea)
textarea.addEventListener("blur", function() {
    textarea.focus();
  });

textarea.addEventListener('click', cleanForm)  

// add keyboard
container.append(keyboard)

// eventMouse
keyboard.addEventListener('mousedown', (e) => addActive(e))
keyboard.addEventListener('mouseup', (e) => removeActive(e))
keyboard.addEventListener('mouseout', (e) => removeActive(e))
let caps = document.querySelector(`[data-code="CapsLock"]`)
let alphabet = document.querySelectorAll(`[data-letter="letter"]`)
const shftEn = document.querySelectorAll(`[data-shft-e="shftE"]`)
const shftRu = document.querySelectorAll(`[data-shft-r="shftR"]`)
let language = localStorage.getItem('language') ? localStorage.getItem('language'): 'en'

caps.addEventListener('click', (e) => toggleUP(e))

function toggleUP(e) {
    if (!(e.target.classList.contains('active'))) {
        e.target.classList.add('active'); 
        toUpperCaseLetter() 
    } else {
        e.target.classList.remove('active');  
        toLowerCaseLetter() 
    }    
}


function addActive(e) {
    let code = e.target.dataset.code
    if (e.target.classList.contains('keyboard__key') && !(code === 'CapsLock')) {
        if ((code  == 'ShiftLeft') || (code  == 'ShiftRight')) {
            pressShift()
        } else if ((code == 'ControlLeft') || (code== 'AltLeft') 
                || (code== 'AltRight') || (code == 'ControlRight') 
                || (code == 'MetaLeft')) {
        }  else {
           changeValue(e.target.innerHTML, e); 
        }
        e.target.classList.add('active');  
    } 
}

function removeActive(e) {
    let code = e.target.dataset.code
    if (e.target.classList.contains('keyboard__key') && !(code === 'CapsLock')) {
        e.target.classList.remove('active');
        if ((code  == 'ShiftLeft') || (code  == 'ShiftRight')) {
            shftEn.forEach(letter => letter.innerHTML = letter.dataset[language])
            toCaseFromCaps()
        }  
    }  
}


// eventKey
const buttons = document.querySelectorAll('.keyboard__key')

document.addEventListener('keydown', (e) => pressActiveKey(e))
document.addEventListener('keyup', (e) => removeActiveKey(e))


function pressActiveKey(e) {
    e.preventDefault()
    buttons.forEach(btn => {
        let code = btn.dataset.code
        if (code === e.code && !(code == 'CapsLock')) {
            let buttonActive = document.querySelector(`[data-code="${e.code}"]`)
            buttonActive.classList.add('active')

            if (((code== 'ControlLeft') && e.altKey) || ((code == 'AltLeft') && e.ctrlKey)) {
                changeLang(language)
                localStorage.setItem('language', language)
                alphabet.forEach(letter => letter.innerHTML = letter.dataset[language]) 
                toCaseFromCaps()
            }

            switch (code) {
                case 'Tab':
                    textarea.value = textarea.value + `\t`;
                    break;
                case 'Backspace':
                    pressBackspace ();
                    break; 
                case 'Space':
                    textarea.value = textarea.value + ' ';
                    break;
                case 'Enter':
                    textarea.value = textarea.value + `\n`
                    break;            
                case 'Delete':
                    pressDelete()
                    break;            
                case 'ShiftLeft':
                case 'ShiftRight':
                    pressShift ()
                    break;            
                case 'ControlLeft':
                case 'ControlRight':
                case 'AltLeft':
                case 'AltRight':
                case 'MetaLeft':
                    break; 
                default: 
                    textarea.value = textarea.value + buttonActive.innerHTML;
                    break;
            }
    
        } else if (code === e.code && code == 'CapsLock') {
            if (!(caps.classList.contains('active'))){
                caps.classList.add('active')
                toUpperCaseLetter()
            }  else {
                caps.classList.remove('active')
                toLowerCaseLetter()
            }
        }
    })

}

function removeActiveKey(e) {
    e.preventDefault()
    buttons.forEach(btn => {
        let code = btn.dataset.code
        if (code === e.code && !(code == 'CapsLock')) {
            let buttonActive = document.querySelector(`[data-code="${e.code}"]`)
            buttonActive.classList.remove('active')
            if ((code == 'ShiftLeft') || (code == 'ShiftRight')) {
                shftEn.forEach(letter => letter.innerHTML = letter.dataset[language])
                toCaseFromCaps()
            }
        }
    })
}

function changeValue(value, e) {
    let target = e.target.dataset.code

    switch (target) {
        case 'Tab':
            textarea.value = textarea.value + `\t`;
            break;
        case 'Backspace':
            pressBackspace ();
            break; 
        case 'Space':
            textarea.value = textarea.value + ' ';
            break;
        case 'Enter':
            textarea.value = textarea.value + `\n`
            break;            
        case 'Delete':
            pressDelete()
            break;        
        case 'ControlLeft':
        case 'ControlRight':
        case 'AltLeft':
        case 'AltRight':
        case 'ShiftLeft':
        case 'ShiftRight':
            break;
        default: 
            textarea.value = textarea.value +  value
        break;
    }
}


function getCaretPos(obj) {
    obj.focus();
    if(obj.selectionStart) return obj.selectionStart;
    else if (document.selection) {
         var sel = document.selection.createRange();
         var clone = sel.duplicate();
         sel.collapse(true);
         clone.moveToElementText(obj);
         clone.setEndPoint('EndToEnd', sel);
         return clone.text.length;
    }
    return 0;
}
function cleanForm() {
   let position = getCaretPos(document.querySelector('textarea'));
   return position;
}
    
function changeLang (lang) {
    language = lang === 'en'? 'ru': 'en'
}

function toUpperCaseLetter() {
    return alphabet.forEach(letter => letter.innerHTML = letter.innerHTML.toUpperCase())  
}

function toLowerCaseLetter() {
    return alphabet.forEach(letter => letter.innerHTML = letter.innerHTML.toLowerCase())  
}

function pressShift () {
    if (language == 'en') {
        shftEn.forEach(letter => letter.innerHTML = letter.dataset.shftEn)
    } else if (language == 'ru') {
        shftRu.forEach(letter => letter.innerHTML = letter.dataset.shftRu)
    }
    if (caps.classList.contains('active')){
        toLowerCaseLetter()
    } else {
        toUpperCaseLetter() 
    }
}

function toCaseFromCaps() {
    if (caps.classList.contains('active')){
        toUpperCaseLetter()  
    } else {
        toLowerCaseLetter()
    } 
}

function pressDelete () {
    let exp = textarea.value
    let position = cleanForm()
    textarea.value = exp.substring(0, position) + exp.substring(position+1, exp.length)
    textarea.setSelectionRange(position, position)
}

function pressBackspace () {
    let exp = textarea.value
    let position = cleanForm()
    textarea.value = exp.substring(0, position-1) + exp.substring(position, exp.length)
    textarea.setSelectionRange(position-1, position-1)
}

function startKeyboard () {
    alphabet.forEach(letter => letter.innerHTML = letter.dataset[language]) 
}

startKeyboard()

//  add text 
container.insertAdjacentHTML('beforeend', '<h3>Клавиатура создана в операционной системе Windows</h3>')
container.insertAdjacentHTML('beforeend', '<h3>Для переключения языка комбинация: левый ctrl + alt</h3>')