import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { DemandSample } from '../../mock/types';

export function DemandAreaChart({ data }: { data: DemandSample[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -14, bottom: 0 }}>
        <defs>
          <linearGradient id="demandFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e6297f" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#e6297f" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="solarFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0a83c" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#f0a83c" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#262a3a" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="time" tick={{ fill: '#9296a8', fontSize: 11 }} axisLine={{ stroke: '#262a3a' }} tickLine={false} />
        <YAxis tick={{ fill: '#9296a8', fontSize: 11 }} axisLine={false} tickLine={false} width={34} />
        <Tooltip
          contentStyle={{ background: '#191c28', border: '1px solid #262a3a', borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: '#f3f4f7' }}
        />
        <ReferenceLine y={data[0]?.limitKw} stroke="#e8362f" strokeDasharray="4 4" label={{ value: 'Limite', fill: '#e8362f', fontSize: 11, position: 'insideTopRight' }} />
        <Area type="monotone" dataKey="demandKw" name="Demanda (kW)" stroke="#e6297f" fill="url(#demandFill)" strokeWidth={2} />
        <Area type="monotone" dataKey="solarKw" name="Solar (kW)" stroke="#f0a83c" fill="url(#solarFill)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
