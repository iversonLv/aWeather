import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// shared module
import { SharedModule } from './shared/shared.module';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InfoToolTipComponent } from './components/info-tool-tip/info-tool-tip.component';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { SingleDayLineChartComponent } from './components/single-day-line-chart/single-day-line-chart.component';
import { MultipleDateStackLineChartComponent } from './components/multiple-date-stack-line-chart/multiple-date-stack-line-chart.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LightDarkModeComponent } from './components/light-dark-mode/light-dark-mode.component';
import { LanguageToggleComponent } from './components/language-toggle/language-toggle.component';

// echarts
import { NgxEchartsModule } from 'ngx-echarts';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MatDateFormats, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';

import 'moment/locale/zh-cn';


export const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'yyyy-MM-DD'
  },
  display: {
    dateInput: 'yyyy-MM-DD',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM YYYY'
  }
};


export const createTranslateLoader = (http: HttpClient): any => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, // input
    ReactiveFormsModule, // forgroup
    SharedModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts') // or import('./path-to-my-custom-echarts')
    }),
    TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
        }
    }),
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    InfoToolTipComponent,
    DateRangeComponent,
    SingleDayLineChartComponent,
    MultipleDateStackLineChartComponent,
    LoadingComponent,
    LightDarkModeComponent,
    LanguageToggleComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
