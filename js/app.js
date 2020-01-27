angular.module('tutorial', ['ngSanitize', 'ui.ace'])
  .controller('TutorialController', ['$http', function ($http) {
    var _this = this;
    var writer = new commonmark.HtmlRenderer();
    var reader = new commonmark.Parser();

    _this.chapters = [];

    for (var i = 0; i < 13; i++) {
      var s = "" + i;
      if (s.length == 1) {
        s = "0" + s;
      }
      _this.chapters.push(s);
    }

    _this.availableLanguages = {
      en: {
        name: 'English',
        img: 'gb.gif'
      },
      it: {
        name: 'Italian',
        img: 'it.png'
      },
      ptbr: {
        name: 'Português',
        img: 'br.png'
      }
    };

    _this.otherLanguages = function () {
      var r = {};
      for (var code in _this.availableLanguages) {
        if (code != _this.lang) {
          r[code] = _this.availableLanguages[code];
        }
      }
      return r;
    }

    _this.setLang = function (lang) {

      console.log(lang);

      _this.lang = lang || window.navigator.userLanguage || window.navigator.language;

      if (!_this.availableLanguages[_this.lang]) {
        _this.lang = 'en';
      }

      _this.titles = [];
      angular.forEach(_this.chapters, function (chapter) {
        $http.get('md/' + _this.lang + '/' + chapter + '.md').success(function (data) {
          _this[chapter] = data;
          _this.titles.push(data.split('\n')[0]);
        });
      });

    }

    _this.setLang();

    _this.onAceLoad = function (editor) {
      editor.$blockScrolling = Infinity;
      editor.setOptions({
        wrap: 'free',
        maxLines: Infinity,
        showGutter: false,
        theme: 'ace/theme/twilight',
        mode: 'ace/mode/markdown'
      });
      editor.setHighlightActiveLine(false);
      editor.setFontSize(14);
    }

    _this.md = function (md) {
      if (md) {
        return writer.render(reader.parse(md));
      }
    }

}]);