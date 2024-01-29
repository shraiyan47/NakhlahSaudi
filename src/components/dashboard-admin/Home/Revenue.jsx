'use client'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import Chart from "react-apexcharts"

function Revenue() {
  const [state, setState] = useState({
    series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    },
  })
  return (
    <Card className='w-[70%] textPrimaryColor bg-white border-none rounded-xl'>
      <CardHeader>
        <CardTitle className='textSemiHeader font-bold'>Revenue</CardTitle>
      </CardHeader>
      <div className='py-3 w-[90%] mx-auto'>
        <Chart
          options={state.options}
          series={state.series}
          type="area"
          height={300}
          
        />
      </div>
    </Card>
  )
}

export default Revenue