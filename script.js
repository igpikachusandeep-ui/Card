/* =========================================
   ELEMENTS
========================================= */

const openBtn =
  document.getElementById("openBtn");

const surpriseBtn =
  document.getElementById("surpriseBtn");

const replayBtn =
  document.getElementById("replayBtn");

const soundBtn =
  document.getElementById("soundBtn");

const bgMusic =
  document.getElementById("bgMusic");

const finalScreen =
  document.getElementById("finalScreen");

const floatingHearts =
  document.getElementById("floatingHearts");

const confetti =
  document.getElementById("confetti");


/* =========================================
   MUSIC SETTINGS
========================================= */

let musicPlaying = false;

bgMusic.volume = 0.45;


/* =========================================
   OPEN CARD
========================================= */

openBtn.addEventListener("click", () => {

  const story =
    document.getElementById("story");

  story.scrollIntoView({
    behavior: "smooth"
  });

  revealAll();

  createHeartBurst(20);

  startMusic();

});


/* =========================================
   START MUSIC
========================================= */

function startMusic() {

  bgMusic.volume = 0.45;

  const playPromise =
    bgMusic.play();

  if (playPromise !== undefined) {

    playPromise
      .then(() => {

        musicPlaying = true;

        soundBtn.textContent = "♫";

        soundBtn.classList.add(
          "playing"
        );

      })
      .catch(error => {

        console.log(
          "Music autoplay blocked:",
          error
        );

      });

  }

}


/* =========================================
   MUSIC ON / OFF BUTTON
========================================= */

soundBtn.addEventListener(
  "click",
  () => {

    if (!musicPlaying) {

      startMusic();

    } else {

      bgMusic.pause();

      musicPlaying = false;

      soundBtn.textContent = "♪";

      soundBtn.classList.remove(
        "playing"
      );

    }

  }
);


/* =========================================
   REVEAL ALL SECTIONS
========================================= */

function revealAll() {

  const sections =
    document.querySelectorAll(
      ".reveal-section"
    );

  sections.forEach(
    (section, index) => {

      setTimeout(
        () => {

          section.classList.add(
            "visible"
          );

        },
        index * 120
      );

    }
  );

}


/* =========================================
   SCROLL REVEAL
========================================= */

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );

          }

        }
      );

    },
    {
      threshold: 0.12
    }
  );


document
  .querySelectorAll(
    ".reveal-section"
  )
  .forEach(
    section => {

      observer.observe(section);

    }
  );


/* =========================================
   FLOATING HEARTS
========================================= */

const heartChoices = [
  "💖",
  "💕",
  "💗",
  "💓",
  "💞",
  "✨",
  "🌸"
];


function createHeart() {

  const heart =
    document.createElement("span");

  heart.className =
    "floating-heart";

  heart.textContent =
    heartChoices[
      Math.floor(
        Math.random() *
        heartChoices.length
      )
    ];

  heart.style.left =
    `${Math.random() * 100}vw`;

  heart.style.fontSize =
    `${14 + Math.random() * 17}px`;

  heart.style.setProperty(
    "--drift",
    `${-80 + Math.random() * 160}px`
  );

  heart.style.animationDuration =
    `${5 + Math.random() * 5}s`;

  floatingHearts.appendChild(
    heart
  );

  setTimeout(
    () => heart.remove(),
    11000
  );

}


function createHeartBurst(
  count
) {

  for (
    let i = 0;
    i < count;
    i++
  ) {

    setTimeout(
      createHeart,
      i * 100
    );

  }

}


/* Continuous hearts */

setInterval(
  createHeart,
  1400
);


/* =========================================
   FINAL SURPRISE
========================================= */

surpriseBtn.addEventListener(
  "click",
  () => {

    createConfetti(180);

    createHeartBurst(50);

    setTimeout(
      () => {

        finalScreen.classList.add(
          "active"
        );

        finalScreen.scrollIntoView({
          behavior: "smooth"
        });

      },
      700
    );

  }
);


/* =========================================
   CONFETTI
========================================= */

function createConfetti(
  amount
) {

  const symbols = [
    "💖",
    "✨",
    "💕",
    "🌸",
    "🎀"
  ];

  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const piece =
      document.createElement(
        "span"
      );

    piece.className =
      "confetti-piece";

    piece.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];

    piece.style.left =
      `${Math.random() * 100}vw`;

    piece.style.fontSize =
      `${10 + Math.random() * 13}px`;

    piece.style.animationDuration =
      `${2.2 + Math.random() * 2.5}s`;

    piece.style.animationDelay =
      `${Math.random() * .8}s`;

    confetti.appendChild(
      piece
    );

    setTimeout(
      () => piece.remove(),
      5500
    );

  }

}


/* =========================================
   REPLAY
========================================= */

replayBtn.addEventListener(
  "click",
  () => {

    finalScreen.classList.remove(
      "active"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    document
      .querySelectorAll(
        ".reveal-section"
      )
      .forEach(
        section => {

          section.classList.remove(
            "visible"
          );

        }
      );

    setTimeout(
      () => {

        createHeartBurst(12);

      },
      700
    );

  }
);


/* =========================================
   BROKEN IMAGE FALLBACK
========================================= */

document
  .querySelectorAll("img")
  .forEach(
    img => {

      img.addEventListener(
        "error",
        () => {

          img.style.display =
            "none";

          img.parentElement.style.minHeight =
            "220px";

          img.parentElement.style.background =
            "linear-gradient(135deg, rgba(255,105,190,.25), rgba(130,90,255,.25))";

        }
      );

    }
  );


/* =========================================
   START A FEW HEARTS
========================================= */

setTimeout(
  () => {
    createHeartBurst(8);
  },
  1000
);