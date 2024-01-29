"use client";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTablePagination from "./DataTablePagination";
import DataTableHeader from "./DataTableHeader";
import { useLearningState } from "../../../store/useAdminStore";
import { handleGetItem } from "../../../lib/handleGetData";
import { useEffect, useState } from "react";

export default function DataTable({ data, columns, view, filter }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onPaginationChange: setPagination,
  });
  return (
    <div className="w-[98%] mx-auto flex flex-col ">
      <div className="">
        <DataTableHeader table={table} view={view} filter={data?.length > 0} />
      </div>
      {data?.length == 0 ? (
        <p className="text-lg text-center w-full py-0.5 ">No Data</p>
      ) : (
        <div className=" flex-grow min-h-[45vh] rounded-md border overflow-y-scroll  ">
          <Table className="">
            <TableHeader className="bg-slate-100 py-0 h-fit ">
              {table?.getHeaderGroups()?.map((headerGroup) => (
                <TableRow key={headerGroup.id} className="h-fit  py-0">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-slate-800 font-bold h-fit  py-0"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="overflow-x-scroll">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="h-fit py-0 "
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="h-fit py-0 ">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-fit py-0 border text-center  "
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      {/* pagination section */}
      {data?.length > 0 ? <DataTablePagination table={table} /> : ""}
    </div>
  );
}
