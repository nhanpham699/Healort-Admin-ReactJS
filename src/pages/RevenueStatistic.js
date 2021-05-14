import React from 'react';
import StatisticByMonth from '../components/StatisticByMonth'
import StatisticByDay from '../components/StatisticByDay'

const Statistic = () => {
    return (
        <div style={{ width: '60%', marginTop : 30, paddingBottom: 50, marginLeft: 70}}>
            <StatisticByMonth />
            <StatisticByDay />
        </div>
    )
}

  

export default Statistic;