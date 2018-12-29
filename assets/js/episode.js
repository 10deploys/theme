$(document).ready(function() {
  var audioPlayer = createPlayer();
  var skipTimes = {};

  calculateSkipTime(skipTimes);
  bindSkipLinks(audioPlayer);
  skipWhenQueryParamIsAvailable();

  function skipWhenAudioPlayProgress(currentPosition) {
    skipWhenAudioPlayProgressBetweenParts(skipTimes, currentPosition);
  }

  audioPlayer.bindEvents(
    skipWhenQueryParamIsAvailable,
    skipWhenAudioPlayProgress
  );

  window.onpopstate = function(event) {
    skipWhenQueryParamIsAvailable();
  };
});

var SoundCloudPlayer = {
  soundCloud: undefined,

  initialize: function(elementId) {
    this.soundCloud = SC.Widget(elementId);
  },

  skip: function(seekTime) {
    this.soundCloud.seekTo(seekTime * 1000);
    this.soundCloud.play();
  },

  bindEvents: function(skipWhenQueryParamIsAvailable, skipWhenAudioPlayProgress) {
    this.soundCloud.bind(SC.Widget.Events.READY, function() {
      skipWhenQueryParamIsAvailable();
    });

    this.soundCloud.bind(SC.Widget.Events.PLAY_PROGRESS, function(event) {
      var currentPosition = Math.round(event.currentPosition / 1000);

      skipWhenAudioPlayProgress(currentPosition);
    });
  }
};

var HTMLAudioPlayer = {
  player: undefined,

  initialize: function(elementId) {
    this.player = document.getElementById(elementId);
  },

  skip: function(seekTime) {
    this.player.currentTime = seekTime;
    this.player.play();
  },

  bindEvents: function(skipWhenQueryParamIsAvailable, skipWhenAudioPlayProgress) {
    var thePlayer = this.player;

    this.player.oncanplay = function() {
      // Implementation ommited.
    };

    window.setInterval(function() {
      var currentTime = castToInteger(thePlayer.currentTime);

      skipWhenAudioPlayProgress(currentTime);
    }, 1000);
  }
}

var createPlayer = function() {
  if ($("#episode-audio").length > 0) {
    var audioPlayer = Object.create(HTMLAudioPlayer);
    audioPlayer.initialize("episode-audio");
  } else {
    var audioPlayer = Object.create(SoundCloudPlayer);
    audioPlayer.initialize("episode-soundcloud");
  }

  return audioPlayer;
};

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

var bindSkipLinks = function(skippablePlayer) {
  skipLinks().click(function(event) {
    event.preventDefault();

    addActiveClassToSkipLink($(this));

    var seek = $(this).attr("data-seek");

    skippablePlayer.skip(seek);

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

var skipWhenAudioPlayProgressBetweenParts = function(skipTimes, currentPosition) {
  var skipLink = skipLinkWithSeekTimeGreaterThan(skipTimes, currentPosition);

  if (skipLink !== undefined) {
    addActiveClassToSkipLink(skipLink);
  }
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
