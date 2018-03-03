$(document).ready(function() {
  var soundCloud = SC.Widget("episode-soundcloud");
  var skipTimes = {};

  calculateSkipTime(skipTimes);
  bindSkipLinks(soundCloud);
  skipWhenQueryParamIsAvailable();

  // It is not always fired.
  soundCloud.bind(SC.Widget.Events.READY, function() {
    skipWhenQueryParamIsAvailable();
  });

  soundCloud.bind(SC.Widget.Events.PLAY_PROGRESS, function(event) {
    var currentPosition = Math.round(event.currentPosition / 1000);
    var skipLink = skipLinkWithSeekTimeGreaterThan(skipTimes, currentPosition);

    if (skipLink !== undefined) {
      addActiveClassToSkipLink(skipLink);
    }
  });

  window.onpopstate = function(event) {
    skipWhenQueryParamIsAvailable();
  };
});

var calculateSkipTime = function(skipTimes) {
  skipLinks().each(function() {
    var index = $(this).data("index");
    var instant = $(this).data("instant");
    var linkText = $(this).text().trim();

    if (instant == undefined) {
      alert("Link without instant attribute: " + linkText);

      return;
    }

    var instantParts = instant.split(":").reverse();

    if (instantParts.length > 3 || instantParts.length == 0) {
      alert("Link with invalid instant: " + linkText);

      return;
    }

    var hours = castToInteger(instantParts[2]);
    var minutes = castToInteger(instantParts[1]);
    var seconds = castToInteger(instantParts[0]);

    if (!isValidTimePeriod(minutes)) {
      alert("Link with invalid instant minutes: " + linkText);

      return;
    }

    if (!isValidTimePeriod(seconds)) {
      alert("Link with invalid instant seconds: " + linkText);

      return;
    }

    var seek = (
      (hours * 60 * 60) +
      (minutes * 60) +
      (seconds)
    );

    $(this).attr("data-seek", seek);
    skipTimes[seek] = index;
  });
};

var bindSkipLinks = function(soundCloud) {
  skipLinks().click(function(event) {
    event.preventDefault();

    addActiveClassToSkipLink($(this));

    var seek = $(this).attr("data-seek") * 1000;

    soundCloud.seekTo(seek);
    soundCloud.play();

    var index = $(this).attr("data-index");
    var path = window.location.pathname;
    var historyPath = path + "?" + skipQueryParamName() + "=" + index;

    if (index != skipQueryParam()) {
      history.pushState({}, "", historyPath);
    }
  });
};

var addActiveClassToSkipLink = function(skipLink) {
  skipLinkWithActiveClass().removeClass("active");
  skipLink.addClass("active");
};

var skipWhenQueryParamIsAvailable = function() {
  skipLinkOfIndex(skipQueryParam()).click();
};

var skipQueryParam = function() {
  var urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has(skipQueryParamName())) {
    return urlParams.get(skipQueryParamName());
  }

  return 0;
};

var skipQueryParamName = function() {
  if (window.episodeSkipQueryParamName !== undefined) {
    return window.episodeSkipQueryParamName;
  }

  return "skip";
};

var skipLinks = function() {
  return $(skipLinkClass());
};

var skipLinkOfIndex = function(index) {
  return $(skipLinkClass() + "[data-index=" + index + "]");
};

var skipLinkWithSeekTimeGreaterThan = function(skipTimes, milliseconds) {
  var matchedSkipTimes = [];

  $.each(skipTimes, function(seek, index) {
    if (milliseconds >= castToInteger(seek)) {
      matchedSkipTimes.push(index);
    }
  });

  return skipLinkOfIndex(matchedSkipTimes.pop());
};

var skipLinkWithActiveClass = function() {
  return $(skipLinkClass() + ".active");
}

var skipLinkClass = function() {
  return ".episode-toc-list-skip";
}

var castToInteger = function(time) {
  if (time !== undefined) {
    return parseInt(time, 10);
  }

  return 0;
};

var isValidTimePeriod = function(timePeriod) {
  return timePeriod !== undefined && timePeriod >= 0 && timePeriod <= 59;
};
