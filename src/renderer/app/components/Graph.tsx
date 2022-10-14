import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useAppSelector } from "../redux/hooks";
import "./Graph.css";

export interface pieSlice {
    name: string;
    value: number;
    color: string;
}

const RADIAN = Math.PI / 180;

function Graph() {
  const rawdata = useAppSelector((state) => state.food.categories);

  const data: pieSlice[] = []
  rawdata.forEach((el: pieSlice) => {
    if (el.value !== 0) {
      data.push(el);
    }
  });

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const legends = data.map(el => {
    return (
      <div key={el.name} className="legend-item">
        <div className="legend-color" style={{ backgroundColor: el.color }} />
        <div className="legend-text">{el.name}</div>
      </div>
    )
  })

  return (
    <div className="main">
      <div className="graph">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              labelLine={false}
              label={renderCustomizedLabel}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="legend">
        {legends}
      </div>
    </div>
  );
}

export default Graph;