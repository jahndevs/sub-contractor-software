import { Chart, useChart } from '@chakra-ui/charts';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis } from 'recharts';

const data = [
  { month: 'Apr', revenue: 980000, cost: 810000 },
  { month: 'May', revenue: 1050000, cost: 870000 },
  { month: 'Jun', revenue: 1120000, cost: 920000 },
  { month: 'Jul', revenue: 1080000, cost: 895000 },
  { month: 'Aug', revenue: 1200000, cost: 980000 },
  { month: 'Sep', revenue: 1150000, cost: 950000 },
  { month: 'Oct', revenue: 1300000, cost: 1060000 },
  { month: 'Nov', revenue: 1250000, cost: 1020000 },
  { month: 'Dec', revenue: 1400000, cost: 1140000 },
  { month: 'Jan', revenue: 1180000, cost: 970000 },
  { month: 'Feb', revenue: 1220000, cost: 1000000 },
  { month: 'Mar', revenue: 1240000, cost: 1015000 },
];

export function RevenueVsCostChart() {
  const chart = useChart({
    data,
    series: [
      { name: 'revenue', color: 'teal.solid' },
      { name: 'cost', color: 'red.solid' },
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
