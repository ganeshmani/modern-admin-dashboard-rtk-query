import React,{ useState } from 'react';
import { css } from "@emotion/react";
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from './ordersTable'  // new
import SidebarLayout from '../../shared/layouts/Sidebar'
import { useFetchAllOrdersQuery } from '../../app/services/orders';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import moment from 'moment';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


const Orders = () => {

    const {data,isError,isLoading,isSuccess} = useFetchAllOrdersQuery(localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null)

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
          Cell :({cell}) => {
              console.log("cell",cell)
              return <div>{moment(cell.row.original.createdAt).format("Do MMM YYYY")}</div>
          }
        },
      ], [])
        
    return (<SidebarLayout>
       {isLoading ?
            (<ClimbingBoxLoader color={"#4045B4"} loading={isLoading} css={override} size={15} />)
            : data ?
                <Table columns={columns} data={data}/>
                : null}
  </SidebarLayout>)
}

export default Orders