import { Category, ChartComponent, ColumnSeries, Inject, LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip } from '@syncfusion/ej2-react-charts'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from 'react';

const url = `${import.meta.env.VITE_URL_BACKEND}/orders/managers/all`;

export let Orderers = [
  { month: 'Jan', sales: 0 }, { month: 'Feb', sales: 0 },
  { month: 'Mar', sales: 0 }, { month: 'Apr', sales: 0 },
  { month: 'May', sales: 0 }, { month: 'Jun', sales: 0 },
  { month: 'Jul', sales: 0 }, { month: 'Aug', sales: 0 },
  { month: 'Sep', sales: 0 }, { month: 'Oct', sales: 0 },
  { month: 'Nov', sales: 0 }, { month: 'Dec', sales: 0 }
];

const primaryxAxis = { valueType: 'Category', title:'Month', titleStyle: {color:'white', fontFamily:'Arial'}, majorGridLines: {width:0} };
const primaryYAxis = { lineStyle: {width:0}, majorTickLines: {width:0}, minorTickLines: {width:0}, title:'Units', titleStyle: {color:'white', fontFamily:'Arial'}, labelFormat: "{value}"};

function ColorMapping() {

  const [orderData, setOrderData] = useState(Orderers);

     //request for get all Orders
    const { isError, isLoading, data, error } = useQuery({
      queryKey: ["get_orders"],
      queryFn: async () => await axios.get(url),
      select: (res) => res.data.orders,
      staleTime: 1000 * 60,
    });

    useEffect(() => {
      if (data) {
        // Create a map to count the occurrences of orders in each month
        const monthCounts = data.reduce((acc, order) => {
          const month = new Date(order.created_at).toLocaleString('default', { month: 'short' });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});
  
        // Update the Orderdata array based on monthCounts
        const updatedOrderData = Orderers.map(item => ({
          ...item,
          sales: monthCounts[item.month] || 0
        }));
  
        setOrderData(updatedOrderData);
      }
    }, [data]);

        
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
      dataSource={orderData}  
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
