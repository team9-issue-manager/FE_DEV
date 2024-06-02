const StatisticsPage=()=>{
    return('')
}
export default StatisticsPage;
// import React, { useState, useEffect } from 'react';
// import Chart from 'react-apexcharts';
// import { ApexOptions } from 'apexcharts';

// interface Statistics {
//     totalIssues: number;
//     issuesByStatus: { [key: string]: number };
//     issuesByDeveloper: { [key: string]: number };
//     issuesByDay: { [key: string]: number };
//     issuesByMonth: { [key: string]: number };
// }

// const StatisticsPage: React.FC = () => {
//     const [statistics, setStatistics] = useState<Statistics | null>(null);

//     useEffect(() => {
//         fetch('http://localhost:8080/issue/statistics')
//             .then(response => response.json())
//             .then(data => setStatistics(data))
//             .catch(error => console.error('Error fetching statistics:', error));
//     }, []);

//     if (!statistics) {
//         return <div>Loading...</div>;
//     }

//     const { totalIssues, issuesByStatus = {}, issuesByDeveloper = {}, issuesByDay = {}, issuesByMonth = {} } = statistics;

//     const statusSeries = Object.values(issuesByStatus);
//     const statusCategories = Object.keys(issuesByStatus);

//     const developerSeries = Object.values(issuesByDeveloper);
//     const developerCategories = Object.keys(issuesByDeveloper);

//     const daySeries = Object.values(issuesByDay);
//     const dayCategories = Object.keys(issuesByDay);

//     const monthSeries = Object.values(issuesByMonth);
//     const monthCategories = Object.keys(issuesByMonth);

//     const chartOptions = (categories: string[]): ApexOptions => ({
//         chart: {
//             type: 'bar',
//         },
//         xaxis: {
//             categories,
//         }
//     });

//     return (
//         <div>
//             <h1>Statistics</h1>
//             <h2>Total Issues: {totalIssues}</h2>

//             <div>
//                 <h3>Issues by Status</h3>
//                 <Chart
//                     options={chartOptions(statusCategories)}
//                     series={[{ name: 'Issues', data: statusSeries }]}
//                     type="bar"
//                     height="350"
//                 />
//             </div>

//             <div>
//                 <h3>Issues by Developer</h3>
//                 <Chart
//                     options={chartOptions(developerCategories)}
//                     series={[{ name: 'Issues', data: developerSeries }]}
//                     type="bar"
//                     height="350"
//                 />
//             </div>

//             <div>
//                 <h3>Issues by Day</h3>
//                 <Chart
//                     options={chartOptions(dayCategories)}
//                     series={[{ name: 'Issues', data: daySeries }]}
//                     type="bar"
//                     height="350"
//                 />
//             </div>

//             <div>
//                 <h3>Issues by Month</h3>
//                 <Chart
//                     options={chartOptions(monthCategories)}
//                     series={[{ name: 'Issues', data: monthSeries }]}
//                     type="bar"
//                     height="350"
//                 />
//             </div>
//         </div>
//     );
// };

// export default StatisticsPage;
