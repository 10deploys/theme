---
title: Example episode
date: 2017-01-01 10:00:00
# permalink: /episodes/000

# Image attributes.
image:
  position: top center
  description: |
    Abstract image by Zhu Hehuai, public domain.

# The episode number must be a string and must contain three characters.
#
# The assets for an episode must be located at the directory:
#
#     <site-root-dir>assets/episodes/<number>/
#
# The following assets will be looked in the directory:
#
#     <episode-dir>/cover.jpg
#     <episode-dir>/cover-medium.jpg
#     <episode-dir>/cover-small.jpg
#     <episode-dir>/guest-<name>.jpg
#
# For the guest filename, the guest name is downcased and the characters are converted to ASCII.
number: "000"

# When the episode is recorded, the Soundcloud widget is embedded on the page. Otherwise, the broadcasting date and a
# link to the YouTube broadcast page is shown.
#
# The summary will be rendered in the home page, episodes pages and in the ATOM feed.
recording:
  recorded: yes
  date: 2017-02-02 20:00:00
  summary: |
    In this example episode, you'll see how to set-up an episode page.
  soundcloud_id: 113585294
  youtube_id: wxhH_7Uumbo

# Renders a table of contents for the SoundCloud player.
#
# Each entry must contain a title and the instant (instant format: [HH:]MM:SS).
toc:
  - title: "First part"
    instant: "1:00"
  - title: Second part
    instant: "2:00"
  - title: Third part
    instant: "3:00"

# Guests.
#
# The social media dictionary must be keyed with the natural case, as the key is used to label the link's title.
#
# Maximum of 4 social media per guest.
#
# Available keys:
#
# - BitBucket
# - Facebook
# - GitHub
# - Instagram
# - iTunes
# - LinkedIn
# - SoundCloud
# - Twitter
# - YouTube
# - Website
guests:
  - name: Ringo Starr
    biography: |
      Ringo Starr is an English musician, songwriter, singer, and actor who gained worldwide fame as the drummer for
      the Beatles.
    social_media:
      Twitter: https://twitter.com/ringostarrmusic
      Facebook: https://www.facebook.com/ringostarrmusic
      Instagram: https://www.instagram.com/ringostarrmusic/
      Website: http://www.ringostarr.com/

# The gender agreement for the Guests section title. "male" or "female". Defaults to "male".
guests_gender_agreement: male

# Types available for references and recommendations:
#
# Suited for references:
#
# - book
# - doc (paper, articles)
# - definition (Wikipedia page, word definition)
# - library (suited for software libraries, OSS projects)
# - movie (video content)
# - music
# - news
# - post (blog post)
# - picture
# - presentation
# - tool (resources like OS packages)
#
# Social media:
#
# - bitbucket
# - facebook
# - github
# - instagram
# - itunes
# - linkedin
# - soundcloud
# - twitter
# - youtube
# - website
#
# Other:
#
# - calendar
# - restaurant
# - trip
references:
  - title: Jekyll's website
    author: ~
    year: ~
    type: tool
    url: https://jekyllrb.com/

# The "who" key is not rendered.
recommendations:
  - title: Frankenstein
    author: Mary Shelley
    type: book
    year: 1818
    url: http://amzn.to/2BBx5N1
    who: Ringo Starr

# Types available:
#
# - picture
# - music
media_credits:
  - name: Abstract image
    description: ~
    type: picture
    page: "https://www.pexels.com/photo/abstract-art-blur-bokeh-544917/"
    author: Zhu Hehuai
    author_page: "https://www.pexels.com/u/zhuhehuai/"
    license: CC0
  - name: The Pianist
    description: ~
    type: music
    page: "http://freemusicarchive.org/music/Dee_Yan-Key/Summer_Nights/11--Dee_Yan-Key-The_Pianist"
    author: Dee Yan-Key
    author_page: "http://freemusicarchive.org/music/Dee_Yan-Key/"
    license: CC0

---

The content will be rendered as the episode's summary in the episode page.
