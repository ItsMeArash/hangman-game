const dictionary = ['apple', 'samsung', 'xiaomi', 'nokia'];
let theWord = "";
let clicked = [];
let result = '';
let mistakes = 0;
function setWord()
{
    theWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    document.querySelectorAll('#letters div').forEach(function(element) {
        element.addEventListener('click', buttonHandler)
    })
    document.addEventListener('keydown', keyHandler)
}
function buttonHandler(event)
{
    event.target.classList.add('used');
    event.target.removeEventListener('click', buttonHandler);
    letterHandler(event.target.innerText);

}
function letterHandler(letter)
{
    letter = letter.toLowerCase();
    clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
    if (theWord.indexOf(letter) != -1)
    {
        setUnderscore();
        checkIfWon();
    } else {
        mistakes++;
        picChanger();
        checkIfLost();
    }
}
function picChanger()
{
    document.getElementById('image').querySelector('img').src = `assets/hangman${mistakes}.png`;
}
function checkIfWon()
{
    if(theWord === result)
    {
        document.getElementById('gameover').querySelector('p').style.display = 'block';
        document.getElementById('image').querySelector('img').src = 'assets/winner.png'
    }
}
function checkIfLost()
{
    if(mistakes === 6)
    {
        document.getElementById('gameover').querySelector('p').style.display = 'block';
        document.querySelector('#clue p').innerHTML = `Correct word is: ${theWord}`;
    }
}

function setUnderscore()
{
    let splittedWord = theWord.split("");
    let mappedWord = splittedWord.map(letter => (clicked.indexOf(letter) != -1 ? letter : '_'))
    result = mappedWord.join("");
    document.querySelector('#clue').innerHTML = `<P>${result}</P>`
}

function keyHandler(event)
{
    letterHandler(event.key);
}

setWord();
setUnderscore();

