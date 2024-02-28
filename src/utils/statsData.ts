import { TStatsState, TWeek, TDay } from "../shared/redux_store/stats_reducer";

export function statsData(): TStatsState {
  const getStartOfWeek = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const weekArr: TWeek[] = [];
  const currentDate = new Date();

  for (let week = 2; week >= 0; week--) {
    const startDate = getStartOfWeek(new Date());
    startDate.setDate(startDate.getDate() - 7 * (2 - week));

    const dayArr: TDay[] = [];

    for (let day = 0; day < 7; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + day);

      dayArr.push({
        dayIndex: (currentDate.getDay() + 6) % 7,
        parentWeekIndex: 2 - week,
        date: currentDate.toLocaleDateString('en-GB'),
        weightCount: 0,
        totalUse: 0,
        stopTime: 0,
        stopCount: 0
      });
    }

    weekArr.push({
      weekIndex: 2 - week,
      days: dayArr
    })
  }

  const displayDay = weekArr.flatMap(i => i.days).find(i => i.date === currentDate.toLocaleDateString('en-GB')) as TDay;

  return {
    weeks: weekArr,
    displayWeek: weekArr[0],
    displayDay: displayDay,
    animationFlag: false
  };
}
