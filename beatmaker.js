class drumkit {
  constructor() {
    this.pad = document.querySelectorAll(".pad");
    this.playbtn = document.querySelector(".play");
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.select = document.querySelectorAll("select");
    this.mute = document.querySelectorAll(".mute");
    this.tempo=document.querySelector(".tempo-slider");
    this.index = 0;
    this.isplaying = null;
    this.bpm = 200;
  }

  // wave and play track after active

  repeat() {
    const val = this.index % 8;
    const controlpad = document.querySelectorAll(`.b${val}`);
    controlpad.forEach((cp) => {
      cp.style.animation = `wave 0.3s alternate ease-in-out 2`;
      // check activation
      if (cp.classList.contains("active")) {
        // check which pad is active
        if (cp.classList.contains("kick-pad")) {
          this.kickSound.currentTime = 0;
          this.kickSound.play();
        }
        if (cp.classList.contains("snare-pad")) {
          this.snareSound.currentTime = 0;
          this.snareSound.play();
        }
        if (cp.classList.contains("hihat-pad")) {
          this.hihatSound.currentTime = 0;
          this.hihatSound.play();
        }
      }
    });
    this.index++;
  }

  // start  and stop after clicking start button
  start() {
    // set bpm
    const interval = (60 / this.bpm) * 1000;
    // if it is not playing then play it
    if (!this.isplaying) {
      this.isplaying = setInterval(() => {
        this.repeat();
      }, interval);
    }

    //    if it is playing stop it
    else {
      clearInterval(this.isplaying);
      this.isplaying = null;
    }
  }

  // stop text appear while clcking on that button
  updatebtn() {
    if (this.isplaying) {
      this.playbtn.innerHTML = "Stop";
    } else {
      this.playbtn.innerHTML = "Play";
    }
  }
  // change sound
  changesound(e) {
    const selectname = e.target.name;
    const selectvalue = e.target.value;
    console.log(selectname);
    console.log(selectvalue);
    switch (selectname) {
      case "kick-select":
        this.kickSound.src = selectvalue;
        break;
      case "snare-select":
        this.snareSound.src = selectvalue;
        break;
      case "hihat-select":
        this.hihatSound.src = selectvalue;
        break;
    }
  }
  // mute sound
  mutesound(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("activemute");
    if (e.target.classList.contains("activemute")) {
      console.log(e.target)
      switch (muteIndex) {
        case "0":
          this.kickSound.volume = 0;
        case "1":
          this.snareSound.volume = 0;
        case "2":
          this.hihatSound.volume = 0;
      }
    }
      else{
        switch (muteIndex) {
          case "0":
            this.kickSound.volume = 1;
          case "1":
            this.snareSound.volume = 1;
          case "2":
            this.hihatSound.volume = 1;
        }
      }
    }
    changetempo(e){
      this.tempoNr=document.querySelector(".tempo-nr");
      this.tempoNr.innerHTML=e.target.value;
}
updatetempo(e){
  this.bpm=e.target.value;
 clearInterval(this.isplaying);
 this.isplaying=null;
 this.playbtn = document.querySelector(".play");
 if(this.playbtn.innerHTML="play"){
  this.start();
}
  }
}

const dk = new drumkit();

// start button
dk.playbtn.addEventListener("click", () => {
  dk.updatebtn();
  dk.start();
});

// activation of pad
function activatepad(p) {
  p.classList.toggle("active");
}
dk.pad.forEach((pads) => {
  pads.addEventListener("click", () => {
    activatepad(pads);
  });
  pads.addEventListener("animationend", () => {
    pads.style.animation = "";
  });
});
// select audio
dk.select.forEach((selections) => {
  selections.addEventListener("change", function (e) {
    dk.changesound(e);
  });
});
// mute function
dk.mute.forEach((mutes) => {
  mutes.addEventListener("click", function (e) {
    // note:e.target == mutes.     but i work with e.target bcz it is good.
    dk.mutesound(e);
    
  });
});

// tempo control
dk.tempo.addEventListener("input",function(e){
  dk.changetempo(e);
})
dk.tempo.addEventListener("change",function(e){
  dk.updatetempo(e);
})