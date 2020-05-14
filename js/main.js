$(document).ready(function () {
  $(".menu-btn").on("click", () => {
    $(".main-menu").toggleClass("show");
    setTimeout(() => {
      $(".main-menu").toggleClass("opacity1");
    }, 500);
  });
});
