$(document).ready(function() {
  var soundCloud = SC.Widget("episode-soundcloud");

  calculateSkipTime();
  bindSkipLinks(soundCloud);
  skipWhenQueryParamIsAvailable();

  // It is not always fired.
  soundCloud.bind(SC.Widget.Events.READY, function() {
    skipWhenQueryParamIsAvailable();
  });

  window.onpopstate = function(event) {
    skipWhenQueryParamIsAvailable();
  };
});

var calculateSkipTime = function() {
  skipLinks().each(function() {
    var instant = $(this).data("instant");

    if (instant == undefined) {
      alert("Link without instant attribute: " + $(this).text());

      return;
    }

    var instantParts = instant.split(":").reverse();

    if (instantParts.length > 3 || instantParts.length == 0) {
      alert("Link with invalid instant: " + $(this).text());

      return;
    }

    var hours = castToInteger(instantParts[2]);
    var minutes = castToInteger(instantParts[1]);
    var seconds = castToInteger(instantParts[0]);

    if (!isValidTimePeriod(minutes)) {
      alert("Link with invalid instant minutes: " + $(this).text());

      return;
    }

    if (!isValidTimePeriod(seconds)) {
      alert("Link with invalid instant seconds: " + $(this).text());

      return;
    }

    var seek = (
      (hours * 60 * 60) +
      (minutes * 60) +
      (seconds)
    );

    $(this).attr("data-seek", seek);
  });
};

var bindSkipLinks = function(soundCloud) {
  skipLinks().click(function(event) {
    event.preventDefault();

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
  return $(".episode-skip");
};

var skipLinkOfIndex = function(index) {
  return $(".episode-skip[data-index=" + index + "]");
};

var castToInteger = function(time) {
  if (time !== undefined) {
    return parseInt(time, 10);
  }

  return 0;
};

var isValidTimePeriod = function(timePeriod) {
  return timePeriod !== undefined && timePeriod >= 0 && timePeriod <= 59;
};
