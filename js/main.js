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

  $(".box").click(function () {
    location.href = $(this).attr("to");
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
