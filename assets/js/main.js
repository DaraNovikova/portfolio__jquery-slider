const $container = $('.carousel');
const $slides = $('.slides__item');
const $indicatorsContainer = $('.indicators');
const $indicators = $('.indicators__item');
const $pauseBtn = $('.indicators__pause');
const $prevBtn = $('.controls__prev');
const $nextBtn = $('.controls__next');

let interval = 3000;
let currentSlide = 0;
let slidesCount = $slides.length;
let isPlaying = true;
let intervalID = null;
let swipeStartX = null;
let swipeEndX = null;

const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const SPACE = 'Space'
const FA_PAUSE = '<i class="far fa-pause-circle">';
const FA_PLAY = '<i class="far fa-play-circle">';

$($indicators[0]).html(currentSlide + 1);


function gotoSlide (n){
    $($slides[currentSlide]).toggleClass('active');
    $($indicators[currentSlide]).toggleClass('active');
    currentSlide = (n + slidesCount) % slidesCount;
    $($slides[currentSlide]).toggleClass('active');
    $($indicators[currentSlide]).toggleClass('active').html(currentSlide + 1);
}

function gotoNext (){
    gotoSlide(currentSlide + 1);
}

function gotoPrev (){
    gotoSlide(currentSlide - 1);
}

function next() {
    gotoNext();
    pause();
}
    
function prev() {
    gotoPrev();
    pause();
}

function play () {
    intervalID = setInterval(gotoNext, interval);
    $($pauseBtn).html(FA_PAUSE);
    isPlaying = true;

}

function pause () {
    if (isPlaying){
        clearInterval(intervalID);
        $($pauseBtn).html(FA_PLAY);
        isPlaying = false; 
    }

}

const pausePlay = () => isPlaying ? pause() : play();


function indicate (e){
    pause();
    gotoSlide(+$(e.target).attr('data-slide-to')); 
}

function pressKey(e) {
    if (e.code === LEFT_ARROW) prev();
    if (e.code === RIGHT_ARROW) next();
    if (e.code === SPACE) pausePlay();
}
    
function swipeStart (e) {
    swipeStartX = e.changedTouches[0].pageX;
}
    
function swipeEnd (e) {
    swipeEndX = e.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX > 100) next();
    if (swipeStartX - swipeEndX < -100) prev();
}

$pauseBtn.on('click', pausePlay);
$prevBtn.on('click', prev);
$nextBtn.on('click', next);
$indicatorsContainer.on('click', '.indicators__item', indicate);
$(document).on('keydown', pressKey);
$container.on('touchstart', swipeStart);
$container.on('touchend', swipeEnd);


intervalID = setInterval(gotoNext, interval);

