import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Button from 'react-bootstrap/Button';
import { useAppSelector } from "../redux/hooks";
import "./Graph.css";
import { useCallback, useRef } from "react";
import html2canvas from "html2canvas";
import { Save } from "react-bootstrap-icons";

export interface pieSlice {
    name: string;
    value: number;
    color: string;
}

const RADIAN = Math.PI / 180;

function Graph() {
  const graphRef = useRef();
  const rawdata = useAppSelector((state) => state.food.categories);

  const handlerDownload = useCallback(async () => {
    const canvas = await html2canvas(graphRef.current);
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    const date = new Date();
    const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    a.download = `export-graph-${dateStr}.png`;
    a.click();
  }, [graphRef]);

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
    <div className='main'>
      <div className='button-save'>
        <Save size={20} onClick={handlerDownload} className="cursor-pointer"/>
      </div>
      <div className='graph' ref={graphRef}>
        <div className='graph-container'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie data={data} labelLine={false} label={renderCustomizedLabel} fill='#8884d8' dataKey='value'>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className='legend'>{legends}</div>
      </div>
    </div>
  );
}

export default Graph;