import React from 'react';
import ChartBar from '../../atoms/chartBar/ChartBar';
import "./ChartStyle.scss";

interface ChartProps {
    monthlyDividends: number[],
}

const Chart: React.FC<ChartProps> = ({
    monthlyDividends,
}) => {
    const max = Math.max(...monthlyDividends);

    return (
        <div className='chart'>
            {monthlyDividends.map(dividend =>
                <div className='chart-element' title={`${dividend}`}>
                    <ChartBar max={max} value={dividend} />
                </div>
            )}
        </div>
    );
};

export default Chart;
