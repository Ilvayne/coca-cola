(function () {

  var COUNT = 120;
  var masthead = document.querySelector('.sky');
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var width = masthead.clientWidth;
  var height = masthead.clientHeight;
  var i = 0;
  var active = false;

  function onResize() {
    width = masthead.clientWidth;
    height = masthead.clientHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = '#FFF';

    var wasActive = active;
    active = width > 320;

    if (!wasActive && active)
      requestAnimFrame(update);
  }

  var Snowflake = function () {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
    this.r = 0;

    this.reset();
  }

  Snowflake.prototype.reset = function() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.vy = 1 + Math.random() * 3;
    this.vx = 0.5 - Math.random();
    this.r = 1 + Math.random() * 2;
    this.o = 0.5 + Math.random() * 0.5;
  }

  canvas.style.position = 'absolute';
  canvas.style.left = canvas.style.top = '0';

  var snowflakes = [], snowflake;
  for (i = 0; i < COUNT; i++) {
    snowflake = new Snowflake();
    snowflake.reset();
    snowflakes.push(snowflake);
  }

  function update() {

    ctx.clearRect(0, 0, width, height);

    if (!active)
      return;

    for (i = 0; i < COUNT; i++) {
      snowflake = snowflakes[i];
      snowflake.y += snowflake.vy;
      snowflake.x += snowflake.vx;

      ctx.globalAlpha = snowflake.o;
      ctx.beginPath();
      ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();

      if (snowflake.y > height) {
        snowflake.reset();
      }
    }

    requestAnimFrame(update);
  }

  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  onResize();
  window.addEventListener('resize', onResize, false);

  masthead.appendChild(canvas);
})();

window.addEventListener('load', function() {
  setTimeout(function() {
    var element = document.querySelector('.hero__cloud');
    element.classList.add('show-cloud');
  }, 3000);
});


window.addEventListener('load', function() {
  setTimeout(function() {
    var snowflake = document.querySelector('.hero__snowflake');
   
    snowflake.classList.add('show-cloud');
  }, 1);
});


const display = document.querySelector('.present__detail.display');
const image = display.querySelector('.image');
const text = display.querySelector('.text');
const heading = display.querySelector('h4');

const elements = document.querySelectorAll('.present__item.element');
elements.forEach(element => {
  element.addEventListener('click', () => {

    elements.forEach(el => el.classList.remove('highlighted'));

    element.classList.add('highlighted');

    const clickedImage = element.querySelector('img');
    const clickedHeading = element.querySelector('h4');
    const clickedText = element.querySelector('.text');

    image.src = clickedImage.src;
    heading.textContent = clickedHeading.textContent;
    text.textContent = clickedText.textContent;
  });
});



let mm = gsap.matchMedia();

gsap.utils.toArray("section").forEach(function(section) {
  let images = section.querySelectorAll('.snowflake-wrapper');

  gsap.fromTo(images, {
    y: "-45vh",
  },{
    y: "45vh",
    scrollTrigger: {
      trigger: section,
      scrub: true,
      start: "top bottom",
      snap: {
        snapTo: 0.5,
        duration: 1,
        ease: 'power4.inOut'
      }
    },
    ease: 'none'
  });

});



mm.add("(min-width: 1023px)", () => {

  const sections = document.querySelectorAll("section");

  const scrolling = {
      enabled: true,
      events: "scroll,wheel,touchmove,pointermove".split(","),
      prevent: e => e.preventDefault(),
      disable() {
        if (scrolling.enabled) {
          scrolling.enabled = false;
          window.addEventListener("scroll", gsap.ticker.tick, {passive: true});
          scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, {passive: false}));
        }
      },
      enable() {
        if (!scrolling.enabled) {
          scrolling.enabled = true;
          window.removeEventListener("scroll", gsap.ticker.tick);
          scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
        }
      }
    };


  function goToSection(section, anim, i) {
    if (scrolling.enabled) { 
      scrolling.disable();
      gsap.to(window, {
        scrollTo: {y: section, autoKill: false},
        onComplete: scrolling.enable,
        duration: 1
      });

      anim && anim.restart();
    }
  }

  sections.forEach((section, i) => {

    
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom-=1",
      end: "bottom top+=1",
      onEnter: () => goToSection(section),
      onEnterBack: () => goToSection(section)
    });
  
  })
});





let timesCalled = 1.1;
let time = maxNum=> {
  timesCalled += 10;
  return   Math.floor(Math.random() * timesCalled)%15;
}

let stars = document.querySelectorAll('.star');
stars.forEach(star=>{
  star.style.setProperty('--animation-time', time() +'s')
});


jQuery(document).ready(function($) {  
  $('.menu__burger, .menu__items').on('click', function() {
    $('.menu__bg, .menu__items, .menu__burger').toggleClass('fs');
  });

  $(".js-select").select2({
    placeholder: 'Select an option',
    minimumResultsForSearch: -1
  });

});