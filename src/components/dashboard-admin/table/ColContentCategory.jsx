"use client"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpDown, ClipboardEdit, Trash2 } from "lucide-react";
import Deletion from "../modals/other/Deletion";
import AddConTypeCategory from "../modals/questionaries/AddConTypeCategory";

const ColContentCategory = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => <div className="textNormal textPrimaryColor">ID</div>,
    cell: ({ row }) => {
      const rowId = parseInt(row.id) + 1;
      return <p className="textSecondaryColor textNormal h-fit">{rowId} </p>;
    },
  },
  {
    id: "id_content_type_category",
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal text-center w-full"
        >
          Content Type Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className=" textNormal textSecondaryColor text-center h-fit">
        {row.getValue("id_content_type_category")}
      </p>
    ),
  },
  {
    id: "actions",
    header: () => (
      <div className="textNormal textPrimaryColor text-center">Actions</div>
    ),
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 justify-center textSecondaryColor textSemiHeader ">
          <Dialog className="">
            <DialogTrigger asChild>
              <Button className="hover:text-[--uDText] h-fit py-0.5 ">
                <Trash2 className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <Deletion rowData={row.original} what="content-type-category" />
            </DialogContent>
          </Dialog>
          <Dialog className="">
            <DialogTrigger asChild>
              <Button className="hover:text-[--uDText] h-fit py-0.5">
                <ClipboardEdit className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <AddConTypeCategory useForEdit={true} rowData={row.original} />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

export default ColContentCategory;