
import React from "react";
import {
  Line,
  Bar,
  Pie,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from "recharts";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: (number | null)[];
    borderColor?: string;
    backgroundColor?: string;
    tension?: number;
    borderDash?: number[];
  }[];
}

interface LineChartProps {
  data: ChartData;
  className?: string;
}

interface BarChartProps {
  data: ChartData;
  className?: string;
}

interface PieChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({ data, className }) => {
  // Transform the data for recharts
  const transformedData = data.labels.map((label, i) => {
    const dataPoint: { [key: string]: any } = { name: label };
    
    data.datasets.forEach((dataset, j) => {
      dataPoint[dataset.label] = dataset.data[i];
    });
    
    return dataPoint;
  });

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={transformedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="name" 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip />
          <Legend />
          {data.datasets.map((dataset, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={dataset.label}
              stroke={dataset.borderColor || `#${Math.floor(Math.random()*16777215).toString(16)}`}
              fill={dataset.backgroundColor || "transparent"}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              connectNulls={true}
              strokeDasharray={dataset.borderDash ? `${dataset.borderDash[0]} ${dataset.borderDash[1]}` : undefined}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const BarChart: React.FC<BarChartProps> = ({ data, className }) => {
  // Transform the data for recharts
  const transformedData = data.labels.map((label, i) => {
    const dataPoint: { [key: string]: any } = { name: label };
    
    data.datasets.forEach((dataset, j) => {
      dataPoint[dataset.label] = dataset.data[i];
    });
    
    return dataPoint;
  });

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={transformedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="name" 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip />
          <Legend />
          {data.datasets.map((dataset, index) => (
            <Bar
              key={index}
              dataKey={dataset.label}
              fill={dataset.backgroundColor || `#${Math.floor(Math.random()*16777215).toString(16)}`}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PieChart: React.FC<PieChartProps> = ({ data, className }) => {
  // Transform the data for recharts
  const transformedData = data.labels.map((label, index) => ({
    name: label,
    value: data.datasets[0].data[index]
  }));

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={transformedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {transformedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={data.datasets[0].backgroundColor[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};
