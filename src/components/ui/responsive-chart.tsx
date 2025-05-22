
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
import { useIsMobile } from "@/hooks/use-mobile";

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

interface ResponsiveLineChartProps {
  data: ChartData;
  className?: string;
  height?: number;
}

interface ResponsiveBarChartProps {
  data: ChartData;
  className?: string;
  height?: number;
}

interface ResponsivePieChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
  className?: string;
  height?: number;
}

export const ResponsiveLineChart: React.FC<ResponsiveLineChartProps> = ({ 
  data, 
  className,
  height = 300
}) => {
  const isMobile = useIsMobile();
  
  // Transform the data for recharts
  const transformedData = data.labels.map((label, i) => {
    const dataPoint: { [key: string]: any } = { 
      name: isMobile && label.length > 3 ? label.substring(0, 3) : label 
    };
    
    data.datasets.forEach((dataset, j) => {
      dataPoint[dataset.label] = dataset.data[i];
    });
    
    return dataPoint;
  });

  return (
    <div className={className} style={{ height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={transformedData}
          margin={isMobile ? 
            { top: 5, right: 10, left: 0, bottom: 5 } : 
            { top: 5, right: 30, left: 20, bottom: 5 }
          }
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="name" 
            stroke="#888888" 
            fontSize={isMobile ? 10 : 12} 
            tickLine={false} 
            axisLine={false}
            tick={{ dy: 5 }}
          />
          <YAxis 
            stroke="#888888" 
            fontSize={isMobile ? 10 : 12}
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            width={isMobile ? 25 : 40}
          />
          <Tooltip 
            contentStyle={isMobile ? { fontSize: '12px', padding: '5px' } : {}}
            labelStyle={isMobile ? { fontSize: '12px' } : {}}
          />
          {!isMobile && <Legend />}
          {data.datasets.map((dataset, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={dataset.label}
              stroke={dataset.borderColor || `#${Math.floor(Math.random()*16777215).toString(16)}`}
              fill={dataset.backgroundColor || "transparent"}
              strokeWidth={2}
              dot={{ r: isMobile ? 2 : 4 }}
              activeDot={{ r: isMobile ? 4 : 6 }}
              connectNulls={true}
              strokeDasharray={dataset.borderDash ? `${dataset.borderDash[0]} ${dataset.borderDash[1]}` : undefined}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ResponsiveBarChart: React.FC<ResponsiveBarChartProps> = ({ 
  data, 
  className,
  height = 300
}) => {
  const isMobile = useIsMobile();
  
  // Transform the data for recharts
  const transformedData = data.labels.map((label, i) => {
    const dataPoint: { [key: string]: any } = { 
      name: isMobile && label.length > 4 ? label.substring(0, 4) : label 
    };
    
    data.datasets.forEach((dataset, j) => {
      dataPoint[dataset.label] = dataset.data[i];
    });
    
    return dataPoint;
  });

  return (
    <div className={className} style={{ height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={transformedData}
          margin={isMobile ? 
            { top: 5, right: 10, left: 0, bottom: 5 } : 
            { top: 5, right: 30, left: 20, bottom: 5 }
          }
          barSize={isMobile ? 15 : 30}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="name" 
            stroke="#888888" 
            fontSize={isMobile ? 10 : 12} 
            tickLine={false} 
            axisLine={false}
            tick={{ dy: 5 }}
          />
          <YAxis 
            stroke="#888888" 
            fontSize={isMobile ? 10 : 12}
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            width={isMobile ? 25 : 40}
          />
          <Tooltip 
            contentStyle={isMobile ? { fontSize: '12px', padding: '5px' } : {}}
            labelStyle={isMobile ? { fontSize: '12px' } : {}}
          />
          {!isMobile && <Legend />}
          {data.datasets.map((dataset, index) => (
            <Bar
              key={index}
              dataKey={dataset.label}
              fill={dataset.backgroundColor || `#${Math.floor(Math.random()*16777215).toString(16)}`}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ResponsivePieChart: React.FC<ResponsivePieChartProps> = ({ 
  data, 
  className,
  height = 200
}) => {
  const isMobile = useIsMobile();
  
  // Transform the data for recharts
  const transformedData = data.labels.map((label, index) => ({
    name: label,
    value: data.datasets[0].data[index]
  }));

  return (
    <div className={className} style={{ height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={transformedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={isMobile ? 60 : 80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => 
              isMobile ? 
                `${(percent * 100).toFixed(0)}%` : 
                `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {transformedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={data.datasets[0].backgroundColor[index]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={isMobile ? { fontSize: '12px', padding: '5px' } : {}}
            labelStyle={isMobile ? { fontSize: '12px' } : {}}
          />
          {!isMobile && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};
