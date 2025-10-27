


gsap.registerPlugin(ScrollTrigger);



// ------------------------------------------------
// 01. 부드러운 스크롤 (Lenis)
// ------------------------------------------------
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);





// ------------------------------------------------
// 02. ABOUT(01번) 헤드라인 한 글자씩 타이핑처럼 등장
// ------------------------------------------------
(function(){
    const headline = document.querySelector('#about .display-1');
    if (!headline) return;
    
    try {
      const split = new SplitText(headline, { type: 'chars' });
      gsap.set(split.chars, { opacity: 1 });
      gsap.from(split.chars, {
        opacity: 0,
        y: 8,
        duration: 0.5,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headline,
          scrub: 0.5,
          start: 'top 80%',
          end: '70% center',
          toggleActions: 'play none none reverse'
        }
      });
    } catch(e) {
      gsap.from(headline, {
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: headline,
          start: 'top 80%'
        }
      });
    }
    })();



// ------------------------------------------------
// 02. SERVICES(02번) 헤드라인 한 글자씩 타이핑처럼 등장
// ------------------------------------------------
(function(){
    const headline = document.querySelector('#services .display-1');
    if (!headline) return;

    try {
      const split = new SplitText(headline, { type: 'chars' });
      gsap.set(split.chars, { opacity: 1 });
      gsap.from(split.chars, {
        opacity: 0,
        y: 8,
        duration: 0.5,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headline,
          scrub: 0.5,
          start: 'top 80%',
          end: '70% center',
          toggleActions: 'play none none reverse'
        }
      });
    } catch(e) {
      gsap.from(headline, {
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: headline,
          start: 'top 80%'
        }
      });
    }
})();

    //03
gsap.timeline({
    scrollTrigger: {
      trigger: '#portfolio',
      start: 'top top',
      end: '+=800',
      scrub: 0.5,
      anticipatePin: 1
    }
  })
  .from('.s-portfolio__list .column:nth-child(odd)',
    {xPercent: -20, 
    yPercent: 20,
        stagger:0.2
    },'port')
  .from('.s-portfolio__list .column:nth-child(even)',
    {xPercent: 20, 
    yPercent: 20,
        stagger:0.2
    },'port');


 //04
 gsap.timeline({
    scrollTrigger: {
      trigger: '#clients',
      start: 'top top',
      end: '+=800',
      scrub: 0.5,
      pin:true,
      anticipatePin: 1
    }
  })
  .fromTo('.video-container',
    {scale: 4,},
    {scale: 1, }
)


 //04
    
gsap.timeline({
    scrollTrigger: {
      trigger: '.testimonial-slider',
      start: 'top 30%',
      end: '+=2000',
      scrub: 0.5,
      anticipatePin: 1,
    }
  })
  .from('.testimonial-slider__slide:nth-child(odd)',
    {xPercent: -20, 
        stagger:0.2
    },'slider')
  .from('.testimonial-slider__slide:nth-child(even)',
    {xPercent: 20, 
        stagger:0.2
    },'slider');


// ------------------------------------------------
// 05. Hero video modal open/close
// ------------------------------------------------
(function(){
  const videoLink = document.querySelector('.s-hero__video-link');
  const modal = document.getElementById('heroVideoModal');
  const dialog = modal ? modal.querySelector('.hero-video-dialog') : null;
  const closeTargets = modal ? modal.querySelectorAll('[data-close-video]') : [];
  const video = modal ? modal.querySelector('video.hero-video') : null;
  const source = video ? video.querySelector('source') : null;

  if (!videoLink || !modal || !dialog || !video || !source) return;

  function openModal(src){
    source.src = src;
    video.load();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    // autoplay after open
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function(){ /* ignore autoplay block */ });
    }
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    video.pause();
    video.currentTime = 0;
    source.src = '';
    video.load();
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  videoLink.addEventListener('click', function(e){
    e.preventDefault();
    const href = videoLink.getAttribute('href');
    if (href) openModal(href);
  });

  closeTargets.forEach(function(el){
    el.addEventListener('click', function(){
      closeModal();
    });
  });

  // close on Esc
  document.addEventListener('keydown', function(e){
    if (modal.classList.contains('is-open') && (e.key === 'Escape' || e.key === 'Esc')) {
      closeModal();
    }
  });
})();