import React from 'react';
import "./ChartBarStyle.scss";

interface ChartBarProps {
    max: number,
    value: number,
}


const ChartBar: React.FC<ChartBarProps> = ({
    max,
    value
}) => {
    const getFullBarHeigth = () => {
        return (value / max) * 100
    }

    const getEmptyBarHeigth = () => {
        return 100 - getFullBarHeigth()
    }

    return (
        <div className='chart-bar'>
            <div className='chart-bar-empty' style={{ minHeight: `${getEmptyBarHeigth()}%` }} />
            <div className='chart-bar-full' style={{ minHeight: `${getFullBarHeigth()}%` }} />
        </div>
    );
};

export default ChartBar;
