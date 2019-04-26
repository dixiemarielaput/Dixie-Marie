class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
  
    type() {
      // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];
  
      // Check if deleting
      if(this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      // Insert txt into element
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      // Initial Type Speed
      let typeSpeed = 300;
  
      if(this.isDeleting) {
        typeSpeed /= 2;
      }
  
      // If word is complete
      if(!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
      } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  
  // Init On DOM Load
  document.addEventListener('DOMContentLoaded', init);
  
  // Init App
  function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }

  $(document).ready(function (){

    // every 2400 ms -> a new star is falling down
      setInterval(function(){
        makeAStarFall();
      },2400);
});

    function makeAStarFall(){
      // left: random start- und stop-position position
      var min = -200; 
      var max = 1800;

      var startPosLeft = Math.floor((Math.random() * max) + min);
      var stopPosLeft = Math.floor((Math.random() * max) + min);

      $('<div>').addClass("star falling-star").insertAfter('.stars');

      $('.falling-star').css("left", startPosLeft);

      setTimeout(function(){
        $(".falling-star").addClass("go-falling");
        $('.go-falling').css("left", stopPosLeft);
      },400);

      setTimeout(function(){
         $(".falling-star").remove();
      },1800);
    }
    s