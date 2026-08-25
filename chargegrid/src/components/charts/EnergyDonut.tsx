import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const colorMap: Record<string, string> = {
  '--color-warning': '#f0a83c',
  '--color-blue': '#3f6fd6',
  '--color-magenta': '#e6297f',
};

export function EnergyDonut({ data }: { data: { name: string; value: number; colorVar: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={52} outerRadius={78} paddingAngle={3} stroke="none">
          {data.map((entry) => (
            <Cell key={entry.name} fill={colorMap[entry.colorVar]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${Number(value).toFixed(1)} kWh`, name]}
          contentStyle={{ background: '#191c28', border: '1px solid #262a3a', borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: '#f3f4f7' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
