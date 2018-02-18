# 10deploys-theme

This is the Jekyll theme of the [10deploys podcast's website](https://10deploys.com).


## Installation

To use this theme in your Jekyll's website, add this line to your Jekyll site's `Gemfile`:

```ruby
gem "10deploys-theme"
```

Copy the [`_config.yml`](_config.yml) to your Jekyll's site root directory. And then execute:

    $ bundle

Or install it yourself as:

    $ gem install 10deploys-theme


## Usage

To experiment with this code, add some sample content and run `bundle exec jekyll serve` – this directory is setup just
like a Jekyll site. Then open your browser at `http://localhost:4000`.

Alternatively, you can use the Jekyll Docker container to experiment with this code. It requires
[Docker Compose](https://docs.docker.com/compose/) installed:

    $ docker-compose run --service-ports site jekyll serve

Then open your browser at `http://localhost`.


## Layout texts

Copy the files available at the `_data` directory into your Jekyll's website `_data` directory and change the layout
texts as needed.


## Content collections

The default configuration exposes two collections: episodes and pages.

The theme has conventions both episodes and pages image assets names. See
[`_episodes/000-example.md`](_episodes/000-example.md) and [`_pages/example.md`](_pages/example.md) for full reference
on how to create these kinds of pages. 


## Credits

The following libraries, code and assets are used in this project:

- [Foundation 6.4.2](https://foundation.zurb.com/)
- [H5BP Image Replacement 2 technique](https://css-tricks.com/the-image-replacement-museum/)
- [jQuery 3.3.1](https://jquery.com/)
- [Abstract picture](https://www.pexels.com/photo/abstract-art-blur-bokeh-544917/), by
  [Zhu Hehuai](https://www.pexels.com/u/zhuhehuai/), under
  [public domain](https://creativecommons.org/share-your-work/public-domain/cc0/)
- [Picture of Paul McCartney](https://commons.wikimedia.org/wiki/File:Linda_McCartney_and_husband_Paul_1976.jpg),
  by Jim Summaria, licensed under a [Creative Commons license](https://creativecommons.org/licenses/by/3.0/deed.en)
- [Picture of George Harrison](https://commons.wikimedia.org/wiki/File:GeorgeHarrison_1970s.jpg), by
  [Enigma Magazine](https://www.enigma-mag.com/remembering-george-harrison/), licensed under a
  [Creative Commons license](https://creativecommons.org/licenses/by-sa/4.0/deed.en)

The following fonts are incorporated in this project, all licensed under the
[SIL license](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL_web):

- [Entypo](http://www.entypo.com/)
- [Font Awesome](http://fortawesome.github.com/Font-Awesome/)
- [Heebo](https://github.com/OdedEzer/heebo)
- [Modern Pictograms](http://thedesignoffice.org/project/modern-pictograms/)
- [Typicons](http://typicons.com/)


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/10deploys/theme. This project is intended to
be a safe, welcoming space for collaboration, and contributors are expected to adhere to the
[Contributor Covenant](http://contributor-covenant.org) code of conduct.

For the commit messages, follow the Tim Pope's
[notes for commit messages](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html). Overview:

- The commit's title limit is 50 characters starting with a verb in the present tense
- The body is optional and must not exceed 72 characters per line


## License

The theme is available as open source under the terms of the
[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/).

10deploys is a trademark of Fernando Ike and Eriksen Costa. All rights reserved.

The logo is published under the terms of the copyright license.
