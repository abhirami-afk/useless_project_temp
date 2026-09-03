// ============================================
// SORTING SOCK — ITERATION 0.1
// ============================================

// -----------------------------
// ELEMENTS
// -----------------------------

const sock = document.getElementById("sock");

const speechBubble = document.getElementById("speechBubble");
const speechText = document.getElementById("speechText");

const startCameraButton = document.getElementById("startCamera");
const analyzeButton = document.getElementById("analyzeButton");

const cameraSection = document.getElementById("cameraSection");
const camera = document.getElementById("camera");
const cameraStatus = document.getElementById("cameraStatus");

const countdown = document.getElementById("countdown");
const results = document.getElementById("results");

const shareButton = document.getElementById("shareButton");
const resetButton = document.getElementById("resetButton");

const footerStatus = document.getElementById("footerStatus");

const leftEye = document.getElementById("left-eye");
const rightEye = document.getElementById("right-eye");
const sockMouth = document.getElementById("sock-mouth");

const confettiContainer = document.getElementById("confetti");

// -----------------------------
// STATE
// -----------------------------

let currentEmotion = "neutral";
let cameraStream = null;
let analysisRunning = false;

let currentResult = {
  footSize: 9.5,
  fetishPercentage: 73,
  compatibleSize: 8.5
};

// -----------------------------
// DIALOGUE
// -----------------------------

const dialogue = {

  neutral: [
    "HELLO HUMAN.",
    "PLEASE PRESENT FACE.",
    "I AM READY TO SORT.",
    "ANALYZING HUMAN STRUCTURE...",
    "INTERESTING.",
    "THE SOCK IS THINKING.",
    "CALCULATING SOCK ENERGY..."
  ],

  happy: [
    "OH. YOU'RE HAPPY.",
    "SUSPICIOUSLY WHOLESOME.",
    "THE SOCK LIKES THIS.",
    "EXCELLENT FACIAL GEOMETRY.",
    "JOY DETECTED.",
    "THIS IS GOING WELL."
  ],

  sad: [
    "WHY ARE WE SAD.",
    "THE SOCK IS ALSO SAD NOW.",
    "PLEASE RETURN JOY TO THE SOCK.",
    "EMOTIONAL DAMAGE DETECTED.",
    "THIS IS A LITTLE CONCERNING.",
    "THE SOCK UNDERSTANDS."
  ],

  angry: [
    "PLEASE CALM DOWN.",
    "THE SOCK IS FRIGHTENED.",
    "ANGER DETECTED.",
    "DO NOT ANGER THE SOCK.",
    "THIS WILL AFFECT YOUR SCORE.",
    "THE SOCK HAS QUESTIONS."
  ]

};

// -----------------------------
// TYPEWRITER
// -----------------------------

function typeText(text, speed = 35) {

  return new Promise((resolve) => {

    speechText.textContent = "";

    let index = 0;

    const interval = setInterval(() => {

      speechText.textContent += text[index];

      index++;

      if (index >= text.length) {

        clearInterval(interval);

        resolve();

      }

    }, speed);

  });

}

// -----------------------------
// RANDOM DIALOGUE
// -----------------------------

function randomDialogue() {

  const pool = dialogue[currentEmotion];

  const randomIndex = Math.floor(Math.random() * pool.length);

  return pool[randomIndex];

}

// -----------------------------
// SOCK EMOTION
// -----------------------------

function setEmotion(emotion) {

  currentEmotion = emotion;

  sock.classList.remove(
    "happy",
    "sad",
    "angry"
  );

  if (emotion !== "neutral") {
    sock.classList.add(emotion);
  }

  switch (emotion) {

    case "happy":

      leftEye.textContent = "^";
      rightEye.textContent = "^";
      sockMouth.textContent = "◡";

      break;

    case "sad":

      leftEye.textContent = "•";
      rightEye.textContent = "•";
      sockMouth.textContent = "︵";

      break;

    case "angry":

      leftEye.textContent = ">";
      rightEye.textContent = "<";
      sockMouth.textContent = "︿";

      break;

    default:

      leftEye.textContent = "•";
      rightEye.textContent = "•";
      sockMouth.textContent = "ᴗ";

  }

}

// -----------------------------
// INITIAL MESSAGE
// -----------------------------

async function intro() {

  await typeText("HELLO HUMAN.");

  await new Promise(resolve => setTimeout(resolve, 600));

  await typeText("I AM THE SORTING SOCK.");

  await new Promise(resolve => setTimeout(resolve, 600));

  await typeText("SHOW ME YOUR FACE.");

}

intro();


// ============================================
// CAMERA
// ============================================

startCameraButton.addEventListener("click", async () => {

  try {

    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });

    camera.srcObject = cameraStream;

    cameraSection.classList.remove("hidden");

    startCameraButton.classList.add("hidden");

    analyzeButton.classList.remove("hidden");

    cameraStatus.textContent = "FACE SCANNER ONLINE";

    footerStatus.textContent = "CAMERA ACTIVE";

    await typeText("FACE ACQUIRED.");

  } catch (error) {

    console.error(error);

    await typeText(
      "I CANNOT SEE YOU. PLEASE CHECK CAMERA PERMISSIONS."
    );

    cameraStatus.textContent = "CAMERA ACCESS DENIED";

  }

});


// ============================================
// DEV EMOTION CONTROLS
// ============================================

document
  .querySelectorAll("[data-emotion]")
  .forEach(button => {

    button.addEventListener("click", () => {

      const emotion = button.dataset.emotion;

      setEmotion(emotion);

      typeText(randomDialogue());

    });

  });


// ============================================
// ANALYSIS
// ============================================

analyzeButton.addEventListener("click", async () => {

  if (analysisRunning) return;

  analysisRunning = true;

  analyzeButton.disabled = true;

  results.classList.remove("hidden");

setTimeout(() => {
  sock.classList.add("dance");
}, 250);

  footerStatus.textContent = "ANALYZING";

  const analysisBar = document.getElementById("analysisBar");
  const progress = document.getElementById("analysisProgress");
  const timer = document.getElementById("analysisTimer");

  analysisBar.classList.remove("hidden");

  // Reset bar
  progress.style.width = "0%";

  // Initial message
  await typeText("ANALYZING...");

  /*
    EXACTLY 3 SECONDS
  */

  const duration = 3000;
  const startTime = performance.now();

  function updateAnalysis(currentTime) {

    const elapsed = currentTime - startTime;

    const percentage = Math.min(
      elapsed / duration,
      1
    );

    progress.style.width =
      `${percentage * 100}%`;

    const remaining =
      Math.max(
        0,
        (duration - elapsed) / 1000
      );

    timer.textContent =
      remaining.toFixed(1) + "s";

    if (percentage < 1) {

      requestAnimationFrame(updateAnalysis);

    }

  }

  requestAnimationFrame(updateAnalysis);

  /*
    Sock dialogue happens DURING
    the 3-second analysis instead
    of extending it.
  */

  const messages = [
    "CALCULATING TOE ENERGY...",
    "CONSULTING THE SOCK ARCHIVES...",
    randomDialogue()
  ];

  let messageIndex = 0;

  const messageInterval = setInterval(() => {

    if (messageIndex < messages.length) {

      typeText(messages[messageIndex]);

      messageIndex++;

    }

  }, 900);


  // Wait exactly 3 seconds
  await new Promise(resolve =>
    setTimeout(resolve, duration)
  );

  clearInterval(messageInterval);

  progress.style.width = "100%";
  timer.textContent = "0.0s";

  await typeText("ANALYSIS COMPLETE.");

  await new Promise(resolve =>
    setTimeout(resolve, 250)
  );

  analysisBar.classList.add("hidden");

  // Countdown
  await runCountdown();

  // Generate result
  generateResults();

  launchConfetti();

  showResults();

  analysisRunning = false;

  analyzeButton.disabled = false;

});

// ============================================
// COUNTDOWN
// ============================================

async function runCountdown() {

  countdown.classList.remove("hidden");

  const numbers = ["3", "2", "1"];

  for (const number of numbers) {

    countdown.textContent = number;

    countdown.classList.remove("show");

    // Restart animation cleanly
    void countdown.offsetWidth;

    countdown.classList.add("show");

    await new Promise(resolve =>
      setTimeout(resolve, 1000)
    );

  }

  countdown.classList.add("hidden");

}

async function runCountdown() {

  countdown.classList.remove("hidden");

  const numbers = ["3", "2", "1"];

  for (const number of numbers) {

    countdown.textContent = number;

    countdown.classList.remove("show");

    // Restart animation cleanly
    void countdown.offsetWidth;

    countdown.classList.add("show");

    await new Promise(resolve =>
      setTimeout(resolve, 1000)
    );

  }

  countdown.classList.add("hidden");

}


// ============================================
// RANDOM RESULTS
// ============================================

function generateResults() {

  const possibleSizes = [
    7,
    7.5,
    8,
    8.5,
    9,
    9.5,
    10,
    10.5,
    11,
    11.5,
    12
  ];

  const randomSize =
    possibleSizes[
      Math.floor(Math.random() * possibleSizes.length)
    ];

  const randomCompatible =
    possibleSizes[
      Math.floor(Math.random() * possibleSizes.length)
    ];

  const randomPercentage =
    Math.floor(Math.random() * 101);

  currentResult = {

    footSize: randomSize,

    fetishPercentage: randomPercentage,

    compatibleSize: randomCompatible

  };

}


// ============================================
// SHOW RESULTS
// ============================================

function showResults() {

  document.getElementById("footSize").textContent =
    currentResult.footSize;

  document.getElementById("fetishPercentage").textContent =
    currentResult.fetishPercentage + "%";

  document.getElementById("compatibleSize").textContent =
    currentResult.compatibleSize;

  results.classList.remove("hidden");

  sock.classList.add("dance");

  footerStatus.textContent = "SORT COMPLETE";

  typeText("THE SOCK HAS SPOKEN.");

}


// ============================================
// CONFETTI
// ============================================

function launchConfetti() {

  const pieces = 100;

  const confettiColors = [
    "#FFE700",
    "#FF6B35",
    "#FF4F64",
    "#FFB26B",
    "#FFF1C1"
  ];

  for (let i = 0; i < pieces; i++) {

    const piece = document.createElement("div");

    piece.classList.add("confetti");

    piece.style.left =
      Math.random() * 100 + "vw";

    piece.style.top =
      Math.random() * 20 + "vh";

    piece.style.background =
      confettiColors[
        Math.floor(
          Math.random() * confettiColors.length
        )
      ];

    piece.style.setProperty(
      "--x",
      (Math.random() * 500 - 250) + "px"
    );

    piece.style.animationDelay =
      Math.random() * 0.4 + "s";

    confettiContainer.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 2000);

  }

}


// ============================================
// CANVAS SHARE CARD
// ============================================

shareButton.addEventListener("click", () => {

  const canvas = document.createElement("canvas");

  canvas.width = 800;
  canvas.height = 1000;

  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#24103D";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer border
  ctx.strokeStyle = "#FFB26B";
  ctx.lineWidth = 20;

  ctx.strokeRect(
    20,
    20,
    canvas.width - 40,
    canvas.height - 40
  );

  // Text
  ctx.fillStyle = "#FFE700";

  ctx.textAlign = "center";

  ctx.font = "bold 34px monospace";

  ctx.fillText(
    "SORTING SOCK™",
    400,
    100
  );

  ctx.fillStyle = "#FFF1C1";

  ctx.font = "bold 26px monospace";

  ctx.fillText(
    "HUMAN REPORT",
    400,
    160
  );

  // Sock emoji
  ctx.font = "100px serif";

  ctx.fillText(
    "🧦",
    400,
    300
  );

  // Results
  ctx.fillStyle = "#FFB26B";

  ctx.font = "bold 24px monospace";

  ctx.fillText(
    "EST. FOOT SIZE",
    400,
    420
  );

  ctx.fillStyle = "#FFE700";

  ctx.font = "bold 64px monospace";

  ctx.fillText(
    currentResult.footSize,
    400,
    485
  );

  ctx.fillStyle = "#FFB26B";

  ctx.font = "bold 24px monospace";

  ctx.fillText(
    "FOOT FETISH INDEX™",
    400,
    580
  );

  ctx.fillStyle = "#FFE700";

  ctx.font = "bold 64px monospace";

  ctx.fillText(
    currentResult.fetishPercentage + "%",
    400,
    645
  );

  ctx.fillStyle = "#FFB26B";

  ctx.font = "bold 24px monospace";

  ctx.fillText(
    "BEST MATCH",
    400,
    740
  );

  ctx.fillStyle = "#FFE700";

  ctx.font = "bold 64px monospace";

  ctx.fillText(
    currentResult.compatibleSize,
    400,
    805
  );

  ctx.fillStyle = "#FFF1C1";

  ctx.font = "bold 22px monospace";

  ctx.fillText(
    "THE SOCK HAS SPOKEN.",
    400,
    900
  );

  // Download/share
  canvas.toBlob(blob => {

    if (!blob) return;

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "sorting-sock-result.png";

    link.click();

    URL.revokeObjectURL(url);

  });

});


// ============================================
// RESET
// ============================================

resetButton.addEventListener("click", () => {

  results.classList.add("hidden");

  sock.classList.remove("dance");

  footerStatus.textContent = "READY";

  setEmotion("neutral");

  typeText("READY FOR ANOTHER HUMAN.");

});