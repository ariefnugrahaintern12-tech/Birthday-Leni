const first_loaded = document.querySelector(".first-loaded");
const content_container = document.querySelector(".container");
const first_page = document.querySelector(".first-page");
const fill = document.querySelector(".fill");
const click = document.querySelector("button");

const second_page = document.querySelector(".second-page");
const btn = document.querySelector(".letter");

const container = document.querySelector('.slider-container');
var slide = document.querySelectorAll('.slider-single');
var slideTotal = slide.length - 1;
var slideCurrent = -1;

const repeat = false;
const noArrows = false;
const noBullets = false;

const modal = document.querySelector(".modal");
const third_page = document.querySelector(".card");
const gift_btn = document.querySelector(".gift-btn");
const audio = new Audio("./music/Taylor-Swift-Timeless-(Taylors-Version).mp3");

const second_loaded = document.querySelector(".second-loaded");
click.addEventListener('click', ()=> {
    var a = 0;
    var run = setInterval(frames, 50);
    click.style.color = "#4EAF54";
    click.style.borderColor = "#4EAF54";
    click.style.boxShadow = "0 6px 12px 0 rgba(0, 0, 0, 0.6)";
    function frames() {
        a+=1;
        if(a == 101) {
            audio.play();
            clearInterval(run);
            first_page.style.display = "none";
            second_page.style.display = "block";
            click.style.color = null;
            click.style.borderColor = null;
            click.style.boxShadow = null;
        }
        else {
            var counter = document.querySelector(".counter");
            counter.textContent = a + "%";
            fill.style.width = a + "%";
        }
    }
})

btn.addEventListener('click', ()=> {
    modal.style.display = "block";
    third_page.style.display = "block";
})
window.onclick = function(event) {
    if (event.target == modal) {
        third_page.style.display = "none"
        modal.style.display = "none";
        second_page.style.display = "block"
        
    }
}

function initBullets() {
    if (noBullets) {
        return;
    }
    const bulletContainer = document.createElement('div');
    bulletContainer.classList.add('bullet-container')
    slide.forEach((elem, i) => {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet')
        bullet.id = `bullet-index-${i}`
        bullet.addEventListener('click', () => {
            goToIndexSlide(i);
        })
        bulletContainer.appendChild(bullet);
        elem.classList.add('proactivede');
    })
    container.appendChild(bulletContainer);
}
function initArrows() {
    if (noArrows) {
        return;
    }
    const leftArrow = document.createElement('a')
    const iLeft = document.createElement('i');
    iLeft.classList.add('fa')
    iLeft.classList.add('fa-arrow-left')
    leftArrow.classList.add('slider-left')
    leftArrow.appendChild(iLeft)
    leftArrow.addEventListener('click', () => {
        slideLeft();
    })
    const rightArrow = document.createElement('a')
    const iRight = document.createElement('i');
    iRight.classList.add('fa')
    iRight.classList.add('fa-arrow-right')
    rightArrow.classList.add('slider-right')
    rightArrow.appendChild(iRight)
    rightArrow.addEventListener('click', () => {
        slideRight();
    })
    container.appendChild(leftArrow);
    container.appendChild(rightArrow);
}
function slideInitial() {
    initBullets();
    initArrows();
    setTimeout(function () {
        slideRight();
    }, 500);
}
function updateBullet() {
    if (!noBullets) {
        document.querySelector('.bullet-container').querySelectorAll('.bullet').forEach((elem, i) => {
            elem.classList.remove('active');
            if (i === slideCurrent) {
                elem.classList.add('active');
            }
        })
    }
    checkRepeat();
}
function checkRepeat() {
    if (!repeat) {
        if (slideCurrent === slide.length - 1) {
            slide[0].classList.add('not-visible');
            slide[slide.length - 1].classList.remove('not-visible');
            if (!noArrows) {
                document.querySelector('.slider-right').classList.add('not-visible')
                document.querySelector('.slider-left').classList.remove('not-visible')
            }
        }
        else if (slideCurrent === 0) {
            slide[slide.length - 1].classList.add('not-visible');
            slide[0].classList.remove('not-visible');
            if (!noArrows) {
                document.querySelector('.slider-left').classList.add('not-visible')
                document.querySelector('.slider-right').classList.remove('not-visible')
            }
        } 
        else {
            slide[slide.length - 1].classList.remove('not-visible');
            slide[0].classList.remove('not-visible');
            if (!noArrows) {
                document.querySelector('.slider-left').classList.remove('not-visible')
                document.querySelector('.slider-right').classList.remove('not-visible')
            }
        }
    }
}
function slideRight() {
    if (slideCurrent < slideTotal) {
        slideCurrent++;
    } 
    else {
        slideCurrent = 0;
    }
    if (slideCurrent > 0) {
        var preactiveSlide = slide[slideCurrent - 1];
    } 
    else {
        var preactiveSlide = slide[slideTotal];
    }
    var activeSlide = slide[slideCurrent];
    if (slideCurrent < slideTotal) {
        var proactiveSlide = slide[slideCurrent + 1];
    } 
    else {
        var proactiveSlide = slide[0];
    }
    slide.forEach((elem) => {
        var thisSlide = elem;
        if (thisSlide.classList.contains('preactivede')) {
            thisSlide.classList.remove('preactivede');
            thisSlide.classList.remove('preactive');
            thisSlide.classList.remove('active');
            thisSlide.classList.remove('proactive');
            thisSlide.classList.add('proactivede');
        }
        if (thisSlide.classList.contains('preactive')) {
            thisSlide.classList.remove('preactive');
            thisSlide.classList.remove('active');
            thisSlide.classList.remove('proactive');
            thisSlide.classList.remove('proactivede');
            thisSlide.classList.add('preactivede');
        }
    });
    preactiveSlide.classList.remove('preactivede');
    preactiveSlide.classList.remove('active');
    preactiveSlide.classList.remove('proactive');
    preactiveSlide.classList.remove('proactivede');
    preactiveSlide.classList.add('preactive');

    activeSlide.classList.remove('preactivede');
    activeSlide.classList.remove('preactive');
    activeSlide.classList.remove('proactive');
    activeSlide.classList.remove('proactivede');
    activeSlide.classList.add('active');

    proactiveSlide.classList.remove('preactivede');
    proactiveSlide.classList.remove('preactive');
    proactiveSlide.classList.remove('active');
    proactiveSlide.classList.remove('proactivede');
    proactiveSlide.classList.add('proactive');

    updateBullet();
}
function slideLeft() {
    if (slideCurrent > 0) {
        slideCurrent--;
    } else {
        slideCurrent = slideTotal;
    }

    if (slideCurrent < slideTotal) {
        var proactiveSlide = slide[slideCurrent + 1];
    } else {
        var proactiveSlide = slide[0];
    }
    var activeSlide = slide[slideCurrent];
    if (slideCurrent > 0) {
        var preactiveSlide = slide[slideCurrent - 1];
    } else {
        var preactiveSlide = slide[slideTotal];
    }
    slide.forEach((elem) => {
        var thisSlide = elem;
        if (thisSlide.classList.contains('proactive')) {
            thisSlide.classList.remove('preactivede');
            thisSlide.classList.remove('preactive');
            thisSlide.classList.remove('active');
            thisSlide.classList.remove('proactive');
            thisSlide.classList.add('proactivede');
        }
        if (thisSlide.classList.contains('proactivede')) {
            thisSlide.classList.remove('preactive');
            thisSlide.classList.remove('active');
            thisSlide.classList.remove('proactive');
            thisSlide.classList.remove('proactivede');
            thisSlide.classList.add('preactivede');
        }
    });
    preactiveSlide.classList.remove('preactivede');
    preactiveSlide.classList.remove('active');
    preactiveSlide.classList.remove('proactive');
    preactiveSlide.classList.remove('proactivede');
    preactiveSlide.classList.add('preactive');

    activeSlide.classList.remove('preactivede');
    activeSlide.classList.remove('preactive');
    activeSlide.classList.remove('proactive');
    activeSlide.classList.remove('proactivede');
    activeSlide.classList.add('active');

    proactiveSlide.classList.remove('preactivede');
    proactiveSlide.classList.remove('preactive');
    proactiveSlide.classList.remove('active');
    proactiveSlide.classList.remove('proactivede');
    proactiveSlide.classList.add('proactive');

    updateBullet();
}
function goToIndexSlide(index) {
    const sliding = (slideCurrent > index) ? () => slideRight() : () => slideLeft();
    while (slideCurrent !== index) {
        sliding();
    }
}
slideInitial();

gift_btn.addEventListener('click', ()=> {
    var a = 0;
    var run = setInterval(frames, 50);
    function frames() {
        a+=20;
        if(a == 100) {
            clearInterval(run);
            first_loaded.style.display = "none"
            second_loaded.style.display = "block"
            
            onload = () => {
                const c = setTimeout(() => {
                document.body.classList.remove("not-loaded");
                clearTimeout(c);
                }, 1000);
            };
        }
    }
})