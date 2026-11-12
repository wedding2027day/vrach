// БЛОК 1: стартовый экран + музыка

const startScreen = document.getElementById("startScreen");
const openSiteBtn = document.getElementById("openSiteBtn");
const siteContent = document.getElementById("siteContent");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

if (openSiteBtn && startScreen && siteContent) {
  openSiteBtn.addEventListener("click", function () {
    siteContent.classList.add("show");
    startScreen.classList.add("hide");
    window.scrollTo(0, 0);

    if (bgMusic) {
      bgMusic.play()
        .then(() => musicBtn && musicBtn.classList.add("show"))
        .catch(error => console.log("Музыка не запустилась:", error));
    }
  });
}

// кнопка вкл/выкл музыки
if (musicBtn && bgMusic) {
  musicBtn.addEventListener("click", function () {
    if (bgMusic.paused) {
      bgMusic.play();
      musicBtn.classList.remove("muted");
    } else {
      bgMusic.pause();
      musicBtn.classList.add("muted");
    }
  });
}

// БЛОКИ 4–11: анимация при появлении на экране
// (класс .show добавляется один раз, когда блок виден на 30%)

const animatedBlocks = document.querySelectorAll(
  ".block4, .block5, .block6, .block7, .block8, .block9, .block10, .block11"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  animatedBlocks.forEach(block => observer.observe(block));
} else {
  animatedBlocks.forEach(block => block.classList.add("show"));
}

// БЛОК 10: отправка анкеты (Web3Forms)

const block10Form = document.getElementById("block10Form");

if (block10Form) {
  const submitBtn = block10Form.querySelector(".block10-submit");
  const status = document.createElement("p");
  status.className = "block10-status";
  status.setAttribute("aria-live", "polite");
  block10Form.appendChild(status);

  block10Form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(block10Form);
    submitBtn.disabled = true;
    status.className = "block10-status";
    status.textContent = "Отправляем…";

    try {
      const response = await fetch(block10Form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        block10Form.reset();
        status.className = "block10-status ok";
        status.textContent = "Запись на приём подтверждена. Ждём вас!";
      } else {
        status.className = "block10-status err";
        status.textContent = "Ошибка отправки. Попробуйте ещё раз.";
      }
    } catch (error) {
      status.className = "block10-status err";
      status.textContent = "Нет соединения. Попробуйте ещё раз.";
    } finally {
      submitBtn.disabled = false;
    }
  });
}
