import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EChartsOption } from 'echarts';

import { calDaysGreatest, calDaysData, calLegends} from '../../shared/utils';

// color
import { modeColor, modeTooltipColor } from '../../shared/utils';

@Component({
  selector: 'app-multiple-date-stack-line-chart',
  templateUrl: './multiple-date-stack-line-chart.component.html',
  styleUrls: ['./multiple-date-stack-line-chart.component.css'],
  providers: [TranslateService]
})
export class MultipleDateStackLineChartComponent implements OnChanges {
  @Input() darkMode;
  @Input() days;
  chartOption: EChartsOption;
  constructor(private translate: TranslateService) {}

  ngOnChanges(changes: SimpleChanges): any {
    this.chartOption = this.generateOption(changes.darkMode.currentValue);
  }
  generateOption = (mode): EChartsOption => {
    return {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      legend: {
        type: 'scroll',
        itemWidth: 35,
        itemHeight: 35,
        data: calLegends(this.days),
        textStyle: {
          color: modeColor(mode),
        },
        pageTextStyle: {
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
        min: calDaysGreatest(this.days, 'min') - 1,
        max: calDaysGreatest(this.days, 'max') + 1,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        borderColor: modeTooltipColor(mode),
        backgroundColor: modeTooltipColor(mode),
        formatter(params): any {
          // console.log(params);
          let str = '';
          params.forEach((param) => {
            str += `<div style='color: ${param?.color}'>${param?.data?.content?.time} - ${param?.value}℃ <br/>
						${param?.data?.content?.conditionText}</div>
						<hr/>`;
          });
          return str;
        },
      },
      dataZoom: [{}],
      series: calDaysData(this.days),
    };
  }
}
