import React from 'react'
import { Category, ChartComponent, ColumnSeries, Inject, LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip } from '@syncfusion/ej2-react-charts'

export let data = [
  { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
  { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
  { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
  { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
  { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
];
const primaryxAxis = { valueType: 'Category', title:'Month', titleStyle: {color:'white', fontFamily:'Arial'}, majorGridLines: {width:0} };
const primaryYAxis = { lineStyle: {width:0}, majorTickLines: {width:0}, minorTickLines: {width:0}, title:'Units', titleStyle: {color:'white', fontFamily:'Arial'}, labelFormat: "{value}"};

function ColorMapping() {
  return (
    <ChartComponent
    width='full'
    title='All Time Orders'
    titleStyle={{
      color:'white',
      size:'20px',
      fontFamily:'Arial'
    }}
    tooltip={{enable:true}}
    chartArea={{border:{width:0}}}
    legendSettings={{mode:'Range', background:'white'}}
    primaryXAxis={primaryxAxis}
    primaryYAxis={primaryYAxis}
    >
    <Inject services={[ColumnSeries, Tooltip, LineSeries, Category]}/>
    <SeriesCollectionDirective>
      <SeriesDirective 
      dataSource={data} 
      xName='month' 
      yName='sales' 
      name='Orders'
      type='Column'
      cornerRadius={{
        topLeft:10,
        topRight:10
      }}
      
      />
    </SeriesCollectionDirective>


    </ChartComponent>
  )
}

export default ColorMapping