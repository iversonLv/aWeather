// as API call params for date format is strickly as 'yyyy-MM-dd'
const today = new Date();
const currentDateYear = today.getFullYear();
const currentDateMonth =
  today.getMonth() + 1 < 10
    ? '0' + (today.getMonth() + 1)
    : today.getMonth() + 1;
const currentDateDate =
  today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
export const currentDate = `${currentDateYear}-${currentDateMonth}-${currentDateDate}`;

// chart cal Dataconst calData = (data) => {
export const calData = data => {
  const arr = [];
  (data || []).forEach(h => {
    const { temp_c, condition, time } = h;
    arr.push({
      value: temp_c,
      symbol: `image://${condition.icon}`,
      content: { time, conditionText: condition.text }
    });
  });
  return arr;
};


// Cal the highest and lowest temp then the yAxis could be more focus for the temp
export const calGreatest = (data, minOrMax) => {
  data = (data || []).map(h => h.temp_c);
  if (minOrMax === 'min') {
    return Math.min(...data);
  } else {
    return Math.max(...data);
  }
};

// cal data for series
export const calDaysData = (data) => {
  const series = [];
  (data || []).forEach((d) => {
    const singleDateData = {
      data: [],
      animation: false,
      type: 'line',
      smooth: true,
      name: d.date,
      showSymbol: false,
    };
    (d?.hour || []).forEach((h) => {
      const { temp_c, condition, time } = h;
      singleDateData.data.push({
        value: temp_c,
        content: { time, conditionText: condition.text },
      });
    });
    series.push(singleDateData);
  });
  return series;
};

export const calDaysGreatest = (data, minOrMax) => {
  const arr = [];
  (data || []).forEach((d) => {
    const hTempCarr = d?.hour?.map((h) => h.temp_c);
    arr.push(...hTempCarr);
  });
  if (minOrMax === 'min') {
    return Math.min(...arr);
  } else {
    return Math.max(...arr);
  }
};

// cal legends
export const calLegends = (data) => {
  const arr = [];
  (data || []).forEach((d) => {
    arr.push({
      name: d.date,
      icon: `image://${d?.day?.condition?.icon}`,
    });
  });
  return arr;
};

import { DarkColor } from './color';

// cal chart theme color
export const modeColor = (mode, lightColor = 'rgba(255, 255,255, 1)') => {
  return mode ? lightColor : DarkColor.mainColor;
};

export const modeTooltipColor = (mode, lightColor = 'rgba(255, 255,255, 1)') => {
    return mode ? DarkColor.backgroundColor : lightColor;
  };
