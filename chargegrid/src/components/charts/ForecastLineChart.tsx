import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Point {
  time: string;
  previsto: number;
  real: number | null;
}

export function ForecastLineChart({ data }: { data: Point[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -14, bottom: 0 }}>
        <CartesianGrid stroke="#262a3a" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="time" tick={{ fill: '#9296a8', fontSize: 11 }} axisLine={{ stroke: '#262a3a' }} tickLine={false} />
        <YAxis tick={{ fill: '#9296a8', fontSize: 11 }} axisLine={false} tickLine={false} width={34} />
        <Tooltip
          contentStyle={{ background: '#191c28', border: '1px solid #262a3a', borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: '#f3f4f7' }}
        />
        <Legend wrapperStyle={{ fontSize: 12, color: '#9296a8' }} />
        <Line type="monotone" dataKey="previsto" name="Previsto (IA)" stroke="#e6297f" strokeDasharray="5 4" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="real" name="Real" stroke="#3f6fd6" strokeWidth={2} dot={{ r: 3 }} connectNulls={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
