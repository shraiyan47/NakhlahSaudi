'use client'

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";


const DataTablePagination = ({ table }) => {
    return (
        <div className="flex items-center justify-between px-2 py-3">
            {/* show selected section */}
            <div className="flex-1 textSmall textPrimaryColor">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>

            <div className="flex items-center space-x-6 lg:space-x-8">

                <div className="flex   items-center justify-center text-sm font-medium border-[1px] textPrimaryColor">
                    <Button
                        className="h-8 w-8 p-0 border-r-[1px] rounded-none"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-6 w-6 " />
                    </Button>
                    <span className="textSmall pt-[1px] w-12 text-center">
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </span>
                    <Button
                        className="h-8 w-8 p-0 border-l-[1px] rounded-none"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-6 w-6 " />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DataTablePagination;

