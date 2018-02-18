$(document).ready(function() {
  var navigationToggleElement = $(".navigation-toggle");
  var navigationMenuElement = $(".navigation-menu");

  navigationToggleElement.on("click", function(event) {
    event.preventDefault();

    if (! navigationMenuElement.hasClass("active")) {
      navigationMenuElement.addClass("active");
      navigationToggleElement.attr("aria-expanded", "true");
    }
  });

  navigationMenuElement.find("a").on("click", function(event) {
    if ($(this).hasClass("navigation-closure")) {
      event.preventDefault();
    }

    navigationMenuElement.removeClass("active");
    navigationToggleElement.attr("aria-expanded", "false");
  });

  if (! $("body").hasClass("home")) {
    return;
  }

  var visibleMenuDistance = {
    regular: 620,
    small: 410
  };

  var brandDistance = {
    regular: 100,
    small: 40
  };

  // xlarge breakpoint.
  //
  // The styles of the site are scaled down based on this breakpoint ("small screens").
  var smallScreenWidth = 1599;

  $(document).on("scroll", function() {
    var isOnSmallScreen = ($("html").width() > smallScreenWidth);

    var maximumVisibleMenuDistance = isOnSmallScreen ? visibleMenuDistance.regular : visibleMenuDistance.small;
    var maximumVisibleBrandDistance = isOnSmallScreen ? brandDistance.regular : brandDistance.small;

    var distanceFromTop = $("html").scrollTop();
    var brandElement = $(".brand").eq(0);
    var navigationElement = $(".navigation");

    // Smooth transition for the logo.
    if (distanceFromTop >= maximumVisibleBrandDistance) {
      brandElement.addClass("scrolling");
    } else {
      brandElement.removeClass("scrolling");
    }

    // Show the menu.
    if (distanceFromTop >= maximumVisibleMenuDistance) {
      navigationElement.removeClass("hide-menu");
      brandElement.addClass("hide");
    } else {
      navigationElement.addClass("hide-menu");
      brandElement.removeClass("hide");
    }
  });
});
