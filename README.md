# AWeather

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Deploy
This project I deployed on github page, as follow some info for it:  

https://angular.cn/guide/deployment  

`ng build --prod --output-path docs --base-href /aWeather/`
run `npm run predeploy`
After it copy index.html of docs folder and rename the copied file as 404.html
then run `git add .`
run `git commit -am "Deploy base on {latest commit}"`
run `git push https://github.com/iversonLv/aWeather.git`


https://docs.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site  

environment.ts
environment.pro.ts
| Key       | Value     | Description     |
| :------------- | :----------: | :----------: |
|  API_URL | https://weatherapi-com.p.rapidapi.com/  | Main Api could open the [rapid api page](https://rapidapi.com/weatherapi/api/weatherapi-com/) |
| API_KEY   | Please use your own one | na |
| API_HOST   | weatherapi-com.p.rapidapi.com | na |

## Todo list  

* [x] Setup the project  
[x] Clear the project  
  [x] Test support scss  
  [x] Setup google font in style.css  
    https://fonts.google.com/specimen/Roboto  
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');  
  [x] Setup Angular Material  
    [x] Add `@angular/cdk @angular/material dependency`  
    [x] Create SharedModule which for all shared module  
    [x] Create material module, remember, in shared module, need add MaterialModule in the export array or can't be used in other places  
    [x] material icon, need add <link href="https://fonts.googleapis.com/icon?family=Material+Icons&display=block" rel="stylesheet"> to index.html  
    or import to style.css  
    [x] material theme need add @import '~@angular/material/prebuilt-themes/indigo-pink.css'; to style.css  
* [x] Header    
  [x] logo  
    https://fonts.google.com/icons?icon.query=cloud  
  [x] Add some basic css style  
* [x] API call  
  [x] Place  
  [x] Date range 
  [x] Lang  
* [x] Search  
  [x] Place input  underscore for debounce
  [x] tooltip  
  [x] date range  
  [x] today button  
    [x] angular materil button today need check today disabled or not. 
* [x] Chart  
  [x] Install the dependency and setup basic for Test (echarts, ngx-echarts)
  https://www.npmjs.com/package/ngx-echarts  
  [x] Single line chart    
  moved the common cal data function to utils  
  [x] Multiple lines chart  
* [x] Loading
* [x] light/dark theme  
  [x] create the light/dark mode component and test
  https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=FAFAFA
  P.S. poper for angular material theme need apply theme class to the body tag
  [x] Header  
  [x] Searh card  
  [x] tooltip  
  [x] date range  
  [x] charts  
  Need use onChanges to detect the mode changes
* [x] i18N  
  https://www.npmjs.com/package/@ngx-translate/core  
  [x] setup i18n and test 
  [x] create language toggle component and bind the lang  
  [button-toggle](https://material.angular.io/components/button-toggle/examples)  
  [x] update compnent to support i18n   
    [x] Dark mode switch component  
    [x] Header no need  
    [x] language toolge no need  
    [x] search  
    [x] tooltip  
    [x] chart  
  [x] intergate API lang call  
    
* [x] Deploy  
  https://iversonlv.github.io/aWeather/  
  https://github.com/iversonLv/aWeather