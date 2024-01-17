import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ totaltime, totalTimeUsed }) => {
  const [bar, setBar] = useState([]);
  const data = [
    {
      Title: "Total Minutes Sold",
      "Time(min)": totaltime,
      "Amount($)": totaltime * 1.67,
    },
    {
      Title: "Total Minutes Used",
      "Time(min)": totalTimeUsed,
      "Amount($)": totalTimeUsed * 1.67,
    },
  ];
  useEffect(() => {
    setBar(data);
  }, []);
  const axisLineStyle = {
    stroke: "transparent",
  };

  const tickLineStyle = {
    stroke: "transparent",
  };

  return (
    <div className="bg-lblue shadow-md rounded-lg overflow-hidden mb-5">
      <div>
        {bar.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} barGap={0} barSize={20}>
              <CartesianGrid
                strokeDasharray="0"
                horizontal={false}
                vertical={false}
              />
              <XAxis
                axisLine={axisLineStyle}
                tickLine={tickLineStyle}
                dataKey="Title"
                hide
              />
              <YAxis axisLine={axisLineStyle} tickLine={tickLineStyle} hide />
              <Tooltip />

              <Bar
                dataKey="Time(min)"
                fill="#8884d8"
                isAnimationActive={false}
              />
              <Bar
                dataKey="Amount($)"
                fill="#85ca9d"
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>Loading bar...</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 bg-white rounded-lg p-5">
        <div>
          <h4 className="text-h3">Total minutes Sold</h4>
          <h4 className="text-h4">{totaltime}</h4>
        </div>
        <div>
          <h5>Total Minutes Amount generated</h5>
          <h6 className="text-h4">${totaltime * 1.67}</h6>
        </div>
        <div>
          <h5>Total Minutes used</h5>
          <h6 className="text-h4">{totalTimeUsed}</h6>
        </div>
        <div>
          <h5>Total minutes used Amount generated</h5>
          <h6 className="text-h4">${totalTimeUsed * 1.67}</h6>
        </div>
      </div>
    </div>
  );
};

export default BarChartComponent;
