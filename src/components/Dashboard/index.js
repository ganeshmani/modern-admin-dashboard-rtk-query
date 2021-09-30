import React, { Fragment, useState } from 'react';
import SidebarLayout from '../../shared/layouts/Sidebar'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,ReferenceLine } from 'recharts';
import { css } from "@emotion/react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { ClockIcon, HomeIcon, MenuAlt1Icon, ViewListIcon, XIcon } from '@heroicons/react/outline'
import RecentOrdersTable, { AvatarCell, SelectColumnFilter, StatusPill } from './recentOrdersTable'  // new
import { useFetchRecentOrdersQuery, useFetchMonthlyOrdersQuery } from '../../app/services/dashboard';
import moment from 'moment';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const dump = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];


const Dashboard = () => {

    const { data, isLoading, isSuccess, isError } = useFetchRecentOrdersQuery(localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null)

    const monthlyReports = useFetchMonthlyOrdersQuery()
    const columns = React.useMemo(() => [
        {
            Header: "Name",
            accessor: 'productName',
        },
        {
            Header: "Status",
            accessor: 'status',
            Cell: StatusPill,
            Filter: SelectColumnFilter,  // new
            filter: 'includes',
        },
        {
            Header: "User",
            accessor: 'userId',
        },
        {
            Header: "Ordered Date",
            accessor: 'createdAt',
            Cell: ({ cell }) => {
                console.log("cell", cell)
                return <div>{moment(cell.row.original.createdAt).format("Do MMM YYYY")}</div>
            }
        },
    ], [])
    return (<SidebarLayout><div className="min-h-screen w-full p-4">
        <div class="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
            <div class="w-full lg:w-1/4">
                <div class="widget w-full p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                    <div class="flex flex-row items-center justify-between">
                        <div class="flex flex-col">
                            <div class="text-xs uppercase font-light text-gray-500">Users
                            </div>
                            <div class="text-xl font-bold">588
                            </div>
                        </div>
                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-gray-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div></div></div><div class="w-full lg:w-1/4">
                <div class="widget w-full p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                    <div class="flex flex-row items-center justify-between">
                        <div class="flex flex-col">
                            <div class="text-xs uppercase font-light text-gray-500">Sessions</div>
                            <div class="text-xl font-bold">435</div>
                        </div>
                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-gray-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div></div></div><div class="w-full lg:w-1/4"><div class="widget w-full p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800"><div class="flex flex-row items-center justify-between"><div class="flex flex-col"><div class="text-xs uppercase font-light text-gray-500">Bounce rate</div><div class="text-xl font-bold">40.5%</div></div><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-gray-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></div></div></div><div class="w-full lg:w-1/4"><div class="widget w-full p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800"><div class="flex flex-row items-center justify-between"><div class="flex flex-col"><div class="text-xs uppercase font-light text-gray-500">Session duration</div><div class="text-xl font-bold">1m 24s</div></div><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-gray-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div></div></div></div>
                        <h2 className="my-3 text-xl font-extrabold text-gray-900">Monthly Orders</h2>
        {monthlyReports.isLoading || isLoading ? (<ClimbingBoxLoader color={"#4045B4"} loading={isLoading} css={override} size={15} />) : (<Fragment>
            <div className="flex flex-col lg:flex-row lg:space-x-2 h-72 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
            {monthlyReports.data ? (
        <ResponsiveContainer>
        <AreaChart
          width={500}
          height={400}
          data={monthlyReports.data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <ReferenceLine x={0} label="L1"/>
          <ReferenceLine x={monthlyReports.data.length-1} label="L2"/>
          <XAxis label="Months" dataKey={"x"} />
          <YAxis label="Total Orders"/>
          <Tooltip />
          <Area type="monotone" dataKey={"y"} stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
        </ResponsiveContainer>
      ) : null}
            

            </div>
            <div className="w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
                <h2 className="my-3 text-xl font-extrabold text-gray-900">Recent Orders</h2>
                {data ?
                    <RecentOrdersTable columns={columns} data={data.slice(0, 6)} />
                    : null}
            </div>
        </Fragment>)}

    </div>
    </SidebarLayout>)
}

export default Dashboard