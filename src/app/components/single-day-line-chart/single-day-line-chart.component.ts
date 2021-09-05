import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';

import { calData, calGreatest} from '../../shared/utils';
// i18n
import { TranslateService } from '@ngx-translate/core';

// color
import { modeColor, modeTooltipColor } from '../../shared/utils';

@Component({
  selector: 'app-single-day-line-chart',
  templateUrl: './single-day-line-chart.component.html',
  styleUrls: ['./single-day-line-chart.component.css'],
  providers: [TranslateService]
})
export class SingleDayLineChartComponent implements OnChanges {
  @Input() darkMode;
  @Input() day;
  chartOption: EChartsOption;
  constructor(private translate: TranslateService) {}


  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
    this.chartOption = this.generateOption(changes.darkMode.currentValue);
  }

  generateOption = (mode): EChartsOption => {
    return {
      backgroundColor: 'rgb(255, 255, 255, 0)',
      title: {
        text: this.day?.date,
        left: 'center',
        top: '0%',
        textStyle: {
          fontSize: 13,
          fontWeight: 300,
          color: modeColor(mode),
        },
      },
      xAxis: {
        type: 'category',
        data: [...Array(24).keys()].map((i) => i + ':00'),
        boundaryGap: false,
        name: this.translate.instant('chart.Hour'),
      },
      yAxis: {
        type: 'value',
        name: '℃',
        min: calGreatest(this.day?.hour, 'min') - 1,
        max: calGreatest(this.day?.hour, 'max') + 1,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        textStyle: {
          color: modeColor(mode),
        },
        borderColor: modeTooltipColor(mode),
        backgroundColor: modeTooltipColor(mode),
        formatter(params): any {
          // console.log(params[0])
          return `${params[0].data.content.time} - ${params[0].value}℃ <br/>
          ${params[0].data.content.conditionText}`;
        },
      },
      dataZoom: [{}],
      series: [
        {
          data: calData(this.day?.hour),
          animation: false,
          lineStyle: {
            color: modeColor(mode),
          },
          markArea: {
            silent: true,
            itemStyle: {},
            label: {
              color: modeColor(mode),
              show: true,
              position: [0, -30],
            },
            data: [
              [
                {
                  name: `${this.translate.instant('chart.DayFrom')} ${this.day?.astro?.sunrise} - ${
                    this.day?.astro?.sunset
                  }`,
                  xAxis: +this.day?.astro?.sunrise?.slice(1, 2),
                },
                {
                  xAxis: +this.day?.astro?.sunset?.slice(1, 2) + 12,
                },
              ],
            ],
          },
          type: 'line',
          smooth: true,
          symbolSize: 35,
          label: {
            color: modeColor(mode),
            show: true,
            fontSize: 12,
            fontWeight: 300,
            formatter: '{c} ℃',
          },
        },
      ],
    };
  }
}



