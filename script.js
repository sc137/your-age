// setup constants for the elements
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const help = document.getElementById('help');
const result = document.getElementById('result');
const icon = document.getElementById('help_icon');

// show step 1
step1.style.visibility = 'visible';

// hide sections
step2.style.display = 'none';
help.style.display = 'none';

// hide error messages
let error_age = document.getElementById('ageError');
let error_fav = document.getElementById('favError');
error_age.style.display = 'none';
error_fav.style.display = 'none';


function ageError() {
    error_age.style.display = 'block';
    error_age.innerHTML = 'Please enter a valid age 10 or older.';
}

function favError() {
    error_fav.style.display = 'block';
    error_fav.innerHTML = 'Please enter a number between 1 and 9';
}


function guessAge() {
    // get the age and favorite number
    const age = document.getElementById('age');
    const fav = document.getElementById('fav');

    // clear prior errors
    error_age.style.display = 'none';
    error_fav.style.display = 'none';

    // validate the age and favorite number
    if (age.value == '') {
        ageError();
        return;
    }

    let x = parseInt(age.value);

    if (x < 10) {
        ageError();
        return
    }

    if (fav.value == '') {
        favError();
        return;
    }

    let y = parseInt(fav.value);

    if (y < 1 || y > 9) {
        favError();
        return
    }
    
    // compute the magic number
    let magicnum = ((x - y) * 9) + x;
    result.innerHTML = magicnum;
    step1.style.display = 'none';       // hide step 1
    step2.style.display = 'block';      // show the magicnum
}

function clearAll() {
    // clears the input fields for another round
    age.value = ''
    fav.value = ''
    result.innerHTML = ''
    step1.style.display = 'block'
}

function showHideHelp(e) {
    // shows the help dialog when the ? is pressed
    if (e.keyCode == 191) {
        if (help.style.display == 'none') {
            help.style.display = 'block';
        } else {
            help.style.display = 'none';
        }
    }
}

function help_icon() {
    // show and hide help when the icon is clicked
    if (help.style.display == 'none') {
        help.style.display = 'block';
    } else {
        help.style.display = 'none';
    }
}

// Since the help screen is over over the help icon
// it is blocking the icon on small screens.
// We are going to add an event handler to capture clicks
// and close the help screen when you click anywhere
function closeHelp() {
    help.style.display = 'none';
}

// event handlers
document.onkeydown = showHideHelp;
document.body.onload = clearAll();

// this event handler listens for clicks outside of the help
// modal and closes it 
document.addEventListener(
    'click', 
    function(event) {
        if (!event.target.matches('.help_icon') &&
            !event.target.closest('.help')) {
            closeHelp();
        }
    },
    false
)