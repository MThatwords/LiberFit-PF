import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import { getLocations } from "../../../App/Action/Action";
import { useAppSelector, useAppDispatch } from "../../../App/Hooks/Hooks";
import Avatar from "react-avatar";

export default function LocationsTable({ link }: any) {
    const allData: any = useAppSelector((state) => state.data);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getLocations())
    }, []);

    const data = React.useMemo(
        (): any =>
            allData[link].map((e: any) => {

                return {
                    col1: e.id,
                    col2: (
                        <Avatar
                            className="mr-2"
                            name={e.name}
                            size="45"
                            round={true}
                        />
                    ),
                    col3: e.name,
                    col4: e.timeSlot,
                    col5: e.createdAt,
                    col6: "Actualizar",
                };
            }),
        []
    );

    const columns = React.useMemo(
        (): any => [
            {
                Header: "ID",
                accessor: "col1", // accessor is the "key" in the data
            },
            {
                Header: "Avatar",
                accessor: "col2",
            },
            {
                Header: "Nombre",
                accessor: "col3",
            },
            {
                Header: "Franja Horaria",
                accessor: "col4",
            },
            {
                Header: "Fecha Apertura",
                accessor: "col5",
            },
            {
                Header: "Actualizar",
                accessor: "col6",
            },
        ],
        []
    );

    const { 
      getTableProps, 
      getTableBodyProps, 
      headerGroups, 
      rows,
    //   page, 
    //   nextPage,
    //   previousPage,
    //   canNextPage,
    //   canPreviousPage,
      prepareRow,
    } = useTable({ columns, data },
      usePagination
  );

    return (
        <div className="flex flex-col">
            <div className="overflow-x-hidden ">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table {...getTableProps()} className="min-w-full">
                            <thead className="border border-black">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                                                {...column.getHeaderProps()}>
                                                {column.render("Header")}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row: any) => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 text-center"
                                            {...row.getRowProps()}
                                        >
                                            {row.cells.map((cell: any) => {
                                                return (
                                                    <td
                                                        className="py-2"
                                                        {...cell.getCellProps()}
                                                    >
                                                        {cell.render("Cell")}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div>
                          {/* <button onClick={() => previousPage()}>Anterior</button>
                          <button onClick={() => nextPage()}>Siguiente</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}