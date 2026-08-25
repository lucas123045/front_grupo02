import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function CostBarChart({ data }: { data: { day: string; costBrl: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -14, bottom: 0 }}>
        <CartesianGrid stroke="#262a3a" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" tick={{ fill: '#9296a8', fontSize: 11 }} axisLine={{ stroke: '#262a3a' }} tickLine={false} />
        <YAxis tick={{ fill: '#9296a8', fontSize: 11 }} axisLine={false} tickLine={false} width={34} />
        <Tooltip
          cursor={{ fill: '#ffffff08' }}
          formatter={(value) => [`R$ ${Number(value).toFixed(2)}`, 'Custo']}
          contentStyle={{ background: '#191c28', border: '1px solid #262a3a', borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: '#f3f4f7' }}
        />
        <Bar dataKey="costBrl" radius={[4, 4, 0, 0]} fill="#e8362f" maxBarSize={36} />
      </BarChart>
    </ResponsiveContainer>
  );
}
