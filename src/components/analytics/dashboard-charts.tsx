"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#8d734e", "#312620"];

export function TrafficChart({ data }: { data: { fecha: string; vistas: number }[] }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#8d734e" />
          <XAxis 
            dataKey="fecha" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#312620', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#312620', fontSize: 12 }}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #8d734e', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Line 
            type="linear" 
            dataKey="vistas" 
            stroke="#8d734e" 
            strokeWidth={3}
            dot={{ r: 4, fill: "#312620", strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ConversionPieChart({ 
  vistasTotales, 
  clics, 
  labelClic, 
  labelVista 
}: { 
  vistasTotales: number; 
  clics: number; 
  labelClic: string; 
  labelVista: string; 
}) {
  const data = [
    { name: labelClic, value: clics },
    { name: labelVista, value: Math.max(0, vistasTotales - clics) },
  ];

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={1}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}