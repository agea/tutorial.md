angular.module('tutorial', ['ngSanitize'])
  .controller('TutorialController', ['$http', function ($http) {
    var _this = this;
    var writer = new commonmark.HtmlRenderer();
    var reader = new commonmark.Parser();

    _this.chapters = [
      '00-intro',
      '01-what',
      '02-basics',
      '03-links',
      '04-lists',
      '05-headers',
      '98-entities',
      '99-escapes'];
        
    angular.forEach(_this.chapters, function(chapter){
       $http.get('md/'+chapter+'.md').success(function(data){
          _this[chapter] = data;
       });
    });
    
    _this.md = function (md) {
      if (md){
        return writer.render(reader.parse(md));
      }
    }

}]);