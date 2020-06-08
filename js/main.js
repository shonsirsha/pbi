$(document).ready(function () {
  var menuOpened = false;
  $(".menu-btn").on("click", () => {
    toggleMenu();
  });

  function toggleMenu() {
    menuOpened = !menuOpened;
    $(".menu-overlay").toggleClass("show");
    $(".main-menu").toggleClass("show");
    setTimeout(() => {
      $(".main-menu").toggleClass("opacity1");
    }, 300);
  }

  $(document).on("click", function (event) {
    if (!$(event.target).closest(".menu-btn").length) {
      if (!$(event.target).closest(".main-menu").length) {
        if (menuOpened) {
          toggleMenu();
        }
      }
    }
  });

  $(".box1").on("click", () => {
    location.href = "./about-us.html";
  });

  $(".box2").on("click", () => {
    location.href = "./courses.html";
  });

  $(".box3").on("click", () => {
    location.href = "./activities.html";
  });

  $(".box4").on("click", () => {
    location.href = "./accommodations.html";
  });

  $(".box5").on("click", () => {
    location.href = "./yogyakarta.html";
  });

  $(".box6").on("click", () => {
    location.href = "./students-reviews.html";
  });
  $(".showAllSections").on("click", () => {
    $(".modal").fadeIn();
  });
  $(".close").on("click", () => {
    $(".modal").fadeOut();
  });
  $(".goToSection").on("click", () => {
    $(".modal").fadeOut();
  });
});
