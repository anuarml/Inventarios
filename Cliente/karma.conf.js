module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-jwt/dist/angular-jwt.js',
      'app/bower_components/jquery/dist/jquery.min.js',
      'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
      'app/bower_components/angular-jwt/dist/angular-jwt.min.js',
      'app/bower_components/bootstrap-table/dist/bootstrap-table.min.js',
      'app/bower_components/bootstrap-table/dist/extensions/angular/bootstrap-table-angular.min.js',
      'app/bower_components/bootstrap-table/dist/extensions/filter-control/bootstrap-table-filter-control.min.js',
      'app/bower_components/bootstrap-table/dist/locale/bootstrap-table-es-MX.min.js',
      'app/bower_components/angular-auto-validate/dist/jcs-auto-validate.min.js',
      //'app/item/*.js',
      'app/auth/*.js',
      'app/bs-table/*.js',
      'app/inv/*.js',
      'app/user/*.js',
      'app/app.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
