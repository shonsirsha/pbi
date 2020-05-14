$(document).ready(function () {
  var menuOpened = false;
  $(".menu-btn").on("click", () => {
    toggleMenu();
  });

  function toggleMenu() {
    menuOpened = !menuOpened;
    $(".main-menu").toggleClass("show");
    setTimeout(() => {
      $(".main-menu").toggleClass("opacity1");
    }, 300);
  }

  $(document).on("click", function (event) {
    if (!$(event.target).closest(".menu-btn").length) {
      if (menuOpened) {
        toggleMenu();
      }
    }
  });
});
