const letterNumber = new Map ([
        ['А', 1], ['Б', 2], ['В', 3], ['Г', 4], ['Д', 5],
['Е', 6], ['Ё', 7], ['Ж', 8], ['З', 9], ['И', 10],
['Й', 11], ['К', 12], ['Л', 13], ['М', 14], ['Н', 15],
['О', 16], ['П', 17], ['Р', 18], ['С', 19], ['Т', 20],
['У', 21], ['Ф', 22], ['Х', 23], ['Ц', 24], ['Ч', 25],
['Ш', 26], ['Щ', 27], ['Ъ', 28], ['Ы', 29], ['Ь', 30],
['Э', 31], ['Ю', 32], ['Я', 33]
]);

const numberLetter = new Map();
letterNumber.forEach((value, key) => {
    numberLetter.set(value, key);
});

//! добавить уведомление на ключ и пустые строки
function EncryptTextByVigenere(text, keyWord){
    if (!text) {
        console.error("text is undefined!");
        return "Ошибка: текст не определён";
    }

    let result = [];
    let keyIndex = 0;
    const upperKeyWord = keyWord.toUpperCase();

    for(let i = 0; i < text.length; i++){
        let currentChar = text[i];
        console.log(`Символ ${i}: '${currentChar}'`); 

        if(letterNumber.has(currentChar.toUpperCase())){
            const isLower = currentChar === currentChar.toLowerCase();
            const upperChar = currentChar.toUpperCase();

            const textNumber = letterNumber.get(upperChar);

            const keyChar = upperKeyWord[keyIndex % upperKeyWord.length];
            const keyNumber = letterNumber.get(keyChar);

            let EncryptedNumber = (textNumber + keyNumber - 1) % 33 + 1;
            console.log(`textNumber: ${textNumber}, keyNumber: ${keyNumber}, EncryptedNumber: ${EncryptedNumber}`);

            let EncryptedChar = numberLetter.get(EncryptedNumber);
            console.log(`EncryptedChar: '${EncryptedChar}'`); 
            result.push(isLower ? EncryptedChar.toLowerCase() : EncryptedChar)
            keyIndex++;
        }
        else{
            result.push(currentChar);
        }
    }

    return result.join('');
}

//! Добавить интерфейс для шифрования цезаря
function EncryptTextByCaesar(text, keyNum){
    if (!text) {
        console.error("text is undefined!");
        return "Ошибка: текст не определён";
    }
    
    let result = [];
    keyNum = Number(keyNum);

    for(let i = 0; i < text.length; i++){
        let currentChar = text[i];

        if(letterNumber.has(currentChar.toUpperCase())){
            const isLower = currentChar === currentChar.toLowerCase();
            const upperChar = currentChar.toUpperCase();
            const textNumber = letterNumber.get(upperChar);

            
            let EncryptedNumber = (textNumber + keyNum - 1 + 33) % 33 + 1;
            let EncryptedChar = numberLetter.get(EncryptedNumber);
            
            if (!EncryptedChar) {
                console.error(`Не найдена буква для числа ${EncryptedNumber}`);
            } else {
                result.push(isLower ? EncryptedChar.toLowerCase() : EncryptedChar);
            }

        } else {
            result.push(currentChar);
        }
    }

    return result.join('');
}
let textUser = '';
let keyUser = '';

//событие ввод текста
const inputText = document.getElementById('inputText');

inputText.addEventListener('input', function()
{
    textUser = inputText.value;
    inputText.classList.remove('input-error');
});

//выбор виженеры ил цезаря в списке
const cipherSelect = document.getElementById('cipherType');

cipherSelect.addEventListener('change', function() {
    console.log("Выбран метод:", this.value);
});

//событие ввод ключа
const keyInput = document.getElementById('key');

key.addEventListener('input', function(){
    keyUser = key.value;
});

cipherSelect.addEventListener('change', function() {
    console.log("Событие change! Выбрано:", this.value); 
    
    if (this.value === 'caesar') {
        keyInput.placeholder = 'Введите число...';
    } else {
        keyInput.placeholder = 'Введите ключевое слово...';
    }
});

//событие нажатие кнопки
const button = document.getElementById('cipherButton');

button.addEventListener('click', function(){
    //проверка на пустые поля
    if(!inputText.value || !key.value){
        console.log("Пустые поля");
        if (!inputText.value) { 
            inputText.classList.add('input-error');
        }
        
        if (!key.value) {
            key.classList.add('input-error');
        }

        return;
        
    }

    const selectedMethod = cipherSelect.value;
    let result;
    
    if(selectedMethod === 'caesar'){
        result = EncryptTextByCaesar(textUser, keyUser);
    } else{
        result = EncryptTextByVigenere(textUser, keyUser);
    }
    
    const outputText = document.getElementById('outputText');
    outputText.value = result;
});


