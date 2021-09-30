import React, { Fragment, useEffect, useState } from 'react';
import { css } from "@emotion/react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from './usersTable'  // new
import SidebarLayout from '../../shared/layouts/Sidebar'
import CreateUser from './createUser'
import UpdateUser from './updateUser'
import { useFetchAllUsersQuery } from '../../app/services/user';


// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Users = () => {

    const [showCreateUserModal, setShowCreateUserModal] = useState(false)
    const [showUpdateUserModal,setShowUpdateUserModal] = useState(false)
    const [selectedUser,setSelectedUser] = useState(null)
    const { data, isLoading, isSuccess, error } = useFetchAllUsersQuery()

    useEffect(() => {
        if (error) {
            console.log("error", error)
        }
    }, [])

    const _handleCreateUserClick = () => {
        setShowCreateUserModal(!showCreateUserModal)
    }

    const _handleUpdateModalClick = () => {
        setShowUpdateUserModal(!showUpdateUserModal)
    }

    const handleUpdateClick = ({e,data}) => {
        e.preventDefault();
        setSelectedUser(data)
        setShowUpdateUserModal(!showUpdateUserModal)
    }


    const columns = React.useMemo(() => [
        {
            Header: "Name",
            accessor: 'name',
            Cell: AvatarCell,
            imgAccessor: "imgUrl",
            emailAccessor: "email",
        },
        {
            Header: "Location",
            accessor: 'location',
        },
        {
            Header: "Status",
            accessor: 'status',
            Cell: StatusPill,
        },
        {
            Header: "Role",
            accessor: 'role',
            Filter: SelectColumnFilter,  // new
            filter: 'includes',
        },
        {
            Header : 'Action',
            Cell:  ({ value, column, row }) => {
                return (
                <a href="" onClick={(e) => handleUpdateClick({e,data : row.original})} className="text-indigo-600 hover:text-indigo-900">
                  Edit
                </a>
              )
            }
        }
    ], [])

    return (<SidebarLayout>
        {isLoading ?
            (<ClimbingBoxLoader color={"#4045B4"} loading={isLoading} css={override} size={15} />)
            : data ?
                <Table columns={columns} data={data} handleCreateUserClick={_handleCreateUserClick} />
                : null}
            <CreateUser isOpen={showCreateUserModal} handleModalClick={_handleCreateUserClick}/>
            <UpdateUser isOpen={showUpdateUserModal} selectedUser={selectedUser} handleModalClick={_handleUpdateModalClick}/>
    </SidebarLayout>)

}

export default Users