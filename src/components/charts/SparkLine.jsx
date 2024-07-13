import { useEffect, useState } from 'react';
import { SparklineComponent, Inject, SparklineTooltip } from '@syncfusion/ej2-react-charts'
import Spinner from '../../hooks/Spinner'; 



function SparkLine({ users }) {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state


  const staticData = [
    { x: 0, xval: '2014', yval: 0 },
    { x: 1, xval: '2015', yval: 0 },
    { x: 2, xval: '2016', yval: 0 },
    { x: 3, xval: '2017', yval: 0 },
    { x: 4, xval: '2018', yval: 0 },
    { x: 5, xval: '2019', yval: 0 },
    { x: 6, xval: '2020', yval: 0 },
    { x: 7, xval: '2021', yval: 0 },
    { x: 8, xval: '2022', yval: 0 },
    { x: 9, xval: '2023', yval: 0 },
  ];

  useEffect(() => {
    async function fetchAndProcessData() {
      setLoading(true); // Set loading to true when fetching starts
      const yearData = {};

      users.forEach(user => {
        const year = new Date(user.created_at).getFullYear();
        if (yearData[year]) {
          yearData[year] += 1;
        } else {
          yearData[year] = 1;
        }
      });

      const dynamicData = Object.keys(yearData).map((year, index) => ({
        x: index + staticData.length,
        xval: year,
        yval: yearData[year],
      }));

      setUserData([...staticData, ...dynamicData]);
      setLoading(false); // Set loading to false when fetching ends

    }

    fetchAndProcessData();
  }, [users]);

  if (loading) {
    return <Spinner/>; // Display spinner when loading
  }

  return (
    <SparklineComponent
      width='full'
      height='200px'
      lineWidth={1}
      type='Line'
      tooltipSettings={{
        visible: true, format: '${xval} : ${yval}',
      }}
      border={{ color: 'green', width: 2 }}
      dataSource={userData}
      xName='xval'
      yName='yval'>
      <Inject services={[SparklineTooltip]} />
    </SparklineComponent>
  );
}


export default SparkLine
