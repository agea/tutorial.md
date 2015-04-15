angular.module('tutorial', ['ngSanitize', 'ui.ace'])
  .controller('TutorialController', ['$http', function ($http) {
    var _this = this;
    var writer = new commonmark.HtmlRenderer();
    var reader = new commonmark.Parser();

    _this.chapters = [
      '00-intro',
      '01-basic-styles',
      '02-links',
      '03-images',
      '04-lists',
      '05-headers',
      '06-horizontal-rules',
      '07-code',
      '08-blockquotes',
      '09-html',
      '10-entities',
      '11-escapes',
      '12-about'
      ];

    angular.forEach(_this.chapters, function (chapter) {
      $http.get('md/' + chapter + '.md').success(function (data) {
        _this[chapter] = data;
      });
    });
    
    _this.aceOptions = {
      useWrapMode: true,
      showGutter: false,
      theme: 'terminal',
      mode: 'markdown'
    };


    _this.md = function (md) {
      if (md) {
        return writer.render(reader.parse(md));
      }
    }

}]);