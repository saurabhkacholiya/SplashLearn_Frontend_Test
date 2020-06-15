// progressive-image.js
if (window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName) window.addEventListener('load', function() {

    // start
    let imageContainers = document.getElementsByClassName('progressive replace')
    let timer
  
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', scroller, false);
    inView();
  
  
    // throttled scroll/resize
    function scroller(e) {
  
      timer = timer || setTimeout(function() {
        timer = null;
        requestAnimationFrame(inView);
      }, 300);
  
    }
  
  
    // image in view?
    function inView() {
      let pageYOffsetStartIndex = window.pageYOffset;
      let pageYOffsetEndIndex = pageYOffsetStartIndex + window.innerHeight
      let imageBoxCoordinate
      let imageTopPixel 
      let imageBottomPixel 
      let imageIndex = 0;
      while (imageIndex < imageContainers.length) {
  
        imageBoxCoordinate = imageContainers[imageIndex].getBoundingClientRect();
        imageTopPixel = pageYOffsetStartIndex + imageBoxCoordinate.top;
        imageBottomPixel = imageTopPixel + imageBoxCoordinate.height;
  
        if (pageYOffsetStartIndex < imageBottomPixel && pageYOffsetEndIndex > imageTopPixel) {
          loadFullImage(imageContainers[imageIndex]);
          imageContainers[imageIndex].classList.remove('replace');
        }else{
          imageIndex++;
        }
      }
  
    }
  
  
    // replace with full image
    function loadFullImage(item) {
  
      if (!item || !item.href) return;
  
      // load image
      let img = new Image();
      if (item.dataset) {
        img.srcset = item.dataset.srcset || '';
        img.sizes = item.dataset.sizes || '';
      }
      img.src = item.href;
      img.className = 'reveal';
      if (img.complete) addImg();
      else img.onload = addImg;
  
      // replace image
      function addImg() {
  
        // disable click
        item.addEventListener('click', function(e) { e.preventDefault(); }, false);
  
        // add full image
        item.appendChild(img).addEventListener('animationend', function(e) {
  
          // remove preview image
          var pImg = item.querySelector && item.querySelector('img.preview');
          if (pImg) {
            e.target.alt = pImg.alt || '';
            item.removeChild(pImg);
            e.target.classList.remove('reveal');
          }
  
        });
  
      }
  
    }
  
  }, false);


function deleteImg(id){
  const divTag = document.getElementById(`${id}`)
  divTag.style.display = "none";
}

function shuffle() {
  const container = document.getElementById("main-container");

  const elementsArray = [...container.getElementsByClassName('shuffleMe')]
    elementsArray.forEach(function(element){
    container.removeChild(element);
  })

  elementsArray.sort(() => Math.floor(Math.random() * 3) - 1 )

  elementsArray.forEach(function(element){
    container.appendChild(element);
  })
}