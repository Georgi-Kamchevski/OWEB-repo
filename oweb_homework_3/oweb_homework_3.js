function init() {

    var start = document.getElementById("start");
    start.addEventListener("click", startGame, false);

    var newGame = document.getElementById("newgame");
    newGame.addEventListener("click", startGame, false);
    newGame.style.display = "none";

    var guessEl = document.getElementById("guess");

    var guessInput = document.getElementById("guess-input");
    guessInput.addEventListener("keypress", (KeyboardEvent) => {
        if (KeyboardEvent.key == "Enter") {

            checkLetter(guessInput.value);//Провери ја буквата
            guessInput.value = ""//Исчисти го внесеното
            checkWord();
        }
    })

    //Дефинирање на почетното множество, и избор на случаен збор од истото,мапирање на секој индекс во низата со точниот td cell од табелата во HTML
    var wordSet = ["GIGABYTE", "SOFTWARE", "DATABASE", "REGISTER", "PASSWORD", "METADATA", "INTERNET", "DOWNLOAD", "DOCUMENT", "PROGRAMS", "COMPILER", "CONSTANT", "ANALYSIS", "FUNCTION", "SEQUENCE", "VARIABLE", "OPERATOR", "LANGUAGE", "RESPONSE", "REQUESTS"];
    var cells = [];//Во општ случај би се пресметало како i<targetWord.length, наместо фиксно 8, за зборови со различни должини
    for (let i = 0; i < 8; i++) {
        cells[i] = document.getElementById("cell-" + i);
    }
    var letters;
    var targetWord;
    var triesEl = document.getElementById("tries-left");
    var tries = parseInt(triesEl.innerText);

    var firstHint;
    var secondHint;
    var thirdHint;

    //var time = document.getElementById("time");
    //var gameType;




    function checkLetter(letter) {
        /*Се повикува секој пат кога некоја буква треба да биде откриена*/
        letter = letter.toUpperCase();
        let flag = false;
        for (let i = 0; i < letters.length; i++) {

            if (letters[i] == letter) {
                cells[i].innerText = letter;
                flag = true;
            }
        }
        if (flag == false) {
            tries--;
            if (tries <= 0) {
                loseFunc();
            }
            triesEl.innerText = tries.toString();
        }
    }



    function checkWord() {
        var currentWordState = "";
        for (let i = 0; i < letters.length; i++) {
            currentWordState += cells[i].innerText;
        }
        if ((currentWordState == targetWord) && (tries > 0)) {
            winFunc();
        }
    }

    function winFunc() {
        start.disabled = false;
        for (let i = 0; i < targetWord.length; i++) {
            cells[i].bgColor = "green";
            cells[i].style.color = "white";
        }
        alert("ЧЕСТИТКИ!! Го погодивте зборот");
        guessEl.style.display = 'none';
        newGame.style.display = 'flex';

    }
    function loseFunc() {
        tries = 0;
        start.disabled = false;
        alert("ИЗГУБЕНА ИГРА: Немате повеќе обиди и не го погодивте зборот. ");
        triesEl.innerText = tries.toString();
        guessEl.style.display = 'none';
        newGame.style.display = 'flex';

    }

    function startGame() {
        /*Се повикува кога ќе се кликне Започни ја играта*/
        console.log("Start")
        start.disabled = true;
        guessEl.style.display = 'flex';
        newGame.style.display = 'none';
        tries = 5;
        var x = Math.floor(Math.random() * wordSet.length)
        targetWord = wordSet[x];
        letters = targetWord.split('');

        for (let i = 0; i < targetWord.length; i++) {
            cells[i].innerText = "_"
            cells[i].bgColor = "white";
            cells[i].style.color = "black";
        }
        selectHints();

        cells[firstHint].innerText = letters[firstHint];
        cells[secondHint].innerText = letters[secondHint];
        cells[thirdHint].innerText = letters[thirdHint];

        //if (gameType == "timed") {
        //setTimer();


    }
    function selectHints() {
        //Brute-force начин за генерирање на уникатни индекси за откриените 3 букви
        firstHint = Math.floor(Math.random() * targetWord.length);
        secondHint = Math.floor(Math.random() * targetWord.length);
        while (secondHint == firstHint) {
            secondHint = Math.floor(Math.random() * targetWord.length);
        }

        thirdHint = Math.floor(Math.random() * targetWord.length);
        while (thirdHint == secondHint || thirdHint == firstHint) {
            thirdHint = Math.floor(Math.random() * targetWord.length);
        }
    }


    /*
     function setGameType() {//Се менува типот на игра кога ќе се смени опцијата од radio input елементите }
     function setTimer() {// Функција за поставување на тајмерот и одбројување на времето, која би можело да се имплементира со promises }
     function printTime(secs) {time.innerText = secs;}
     */
    return 0;
}
