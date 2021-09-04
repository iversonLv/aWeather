import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

import { currentDate } from './shared/utils';

// i18n
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WeatherService]
})
export class AppComponent implements OnInit {
  // init state
  darkMode = false;
  language = 'en';
  place = null ?? 'Guangzhou';
  weatherData;
  isLoading = true;
  pageXY = [0, 0];
  showTooltip = false;

  qP = {
    q: this.place,
    dt: currentDate,
    end_dt: currentDate,
    lang: this.language
  };

  constructor(private weatherService: WeatherService, private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    // swtich language will here
    translate.use(this.language);
  }

  ngOnInit(): void {
    this.getWeather(this.qP);
  }

  // set place
  setPlace(e): any {
    this.qP = { ...this.qP, q: e.target.value };
    this.getWeather(this.qP);
  }

  // api call
  getWeather(qP): any {
    this.isLoading = true;
    this.weatherService.getWeather(qP).subscribe(
      data => {
        console.log(data);
        this.weatherData = data;
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  // emit daterang date
  dateRangeChange = e => {
    console.log(e);
    this.qP = { ...this.qP, dt: e[0], end_dt: e[1] };
    this.getWeather(this.qP);
  }

  // set dangular
  setLanguage = (e: string): string => {
    this.qP = { ...this.qP, lang: e };
    this.getWeather(this.qP);
    this.translate.use(e);
    return this.language = e;
  }

  // setDarkMode
  setDarkMode = (e: boolean): boolean => {
    return (this.darkMode = e);
  }

  // show tooltiop
  showTooltipFn(e): any {
    this.pageXY = [e.pageX - 450, e.pageY - 80];
    this.showTooltip = true;
  }
}
