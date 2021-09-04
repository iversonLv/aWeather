import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EChartsOption } from 'echarts';

import { calDaysGreatest, calDaysData, calLegends} from '../../shared/utils';

@Component({
  selector: 'app-multiple-date-stack-line-chart',
  templateUrl: './multiple-date-stack-line-chart.component.html',
  styleUrls: ['./multiple-date-stack-line-chart.component.css'],
  providers: [TranslateService]
})
export class MultipleDateStackLineChartComponent implements OnInit {
  @Input() days;
  chartOption: EChartsOption;
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.chartOption = {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      legend: {
        type: 'scroll',
        itemWidth: 35,
        itemHeight: 35,
        data: calLegends(this.days),
        textStyle: {
          color: 'rgb(0, 0, 0)',
        },
        pageTextStyle: {
          color: 'rgb(0, 0, 0)',
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
        // borderColor: modeTooltipColor,
        // backgroundColor: modeTooltipColor,
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
