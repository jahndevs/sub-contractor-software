import { Chart, useChart } from '@chakra-ui/charts';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis } from 'recharts';

const data = [
  { month: 'Apr', budget: 3800, actual: 3650 },
  { month: 'May', budget: 4000, actual: 4100 },
  { month: 'Jun', budget: 4200, actual: 4350 },
  { month: 'Jul', budget: 4100, actual: 3980 },
  { month: 'Aug', budget: 4500, actual: 4620 },
  { month: 'Sep', budget: 4300, actual: 4280 },
  { month: 'Oct', budget: 4800, actual: 5050 },
  { month: 'Nov', budget: 4600, actual: 4700 },
  { month: 'Dec', budget: 5000, actual: 4850 },
  { month: 'Jan', budget: 4400, actual: 4550 },
  { month: 'Feb', budget: 4600, actual: 4480 },
  { month: 'Mar', budget: 4800, actual: 4800 },
];

export function ManHoursChart() {
  const chart = useChart({
    data,
    series: [
      { name: 'budget', color: 'blue.solid' },
      { name: 'actual', color: 'orange.solid' },
    ],
  });

  return (
    <Chart.Root h="260px" maxW="100%" overflow="hidden" chart={chart}>
      <BarChart data={chart.data} responsive margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid stroke={chart.color('border.muted')} vertical={false} />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={chart.key('month')}
          tick={{ fontSize: 11 }}
        />
        <Tooltip
          cursor={{ fill: chart.color('bg.muted') }}
          animationDuration={100}
          content={<Chart.Tooltip />}
        />
        <Legend content={<Chart.Legend />} />
        {chart.series.map((item) => (
          <Bar
            isAnimationActive={false}
            key={item.name}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
            stroke={chart.color(item.color)}
          />
        ))}
      </BarChart>
    </Chart.Root>
  );
}
