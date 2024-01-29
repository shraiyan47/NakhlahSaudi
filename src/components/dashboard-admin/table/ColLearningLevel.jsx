"use client"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Main_URL } from "../../../lib/url";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpDown, ClipboardEdit, Trash2 } from "lucide-react";
import Deletion from "../modals/other/Deletion";
import AddLevel from "../modals/lessons/AddLevel";

const colLearningLevel = [
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
      return <div className="textSecondaryColor textNormal">{rowId} </div>;
    },
  },
  {
    id: "id_level_titel",
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Level
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className=" textNormal textSecondaryColor">
        {row.getValue("id_level_titel")}
      </div>
    ),
  },
  {
    id: "unitOfLevel",
    accessorKey: "learning_journey_unit.title",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Unit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="  textNormal textSecondaryColor">
        {row.getValue("unitOfLevel")}
      </div>
    ),
  },
  {
    id: "journeyOfLevel",
    accessorKey: "learning_journey_unit.learning_journey.title",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Journey
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="  textNormal textSecondaryColor">
        {row.getValue("journeyOfLevel")}
      </div>
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
        <div className="flex gap-2 justify-center textSecondaryColor textSemiHeader">
          <Dialog className="">
            <DialogTrigger asChild>
              <Button className="hover:text-[--uDText]">
                <Trash2 className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <Deletion rowData={row.original} what="learning-level" />
            </DialogContent>
          </Dialog>
          <Dialog className="">
            <DialogTrigger asChild>
              <Button className="hover:text-[--uDText]">
                <ClipboardEdit className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <AddLevel useForEdit={true} rowData={row.original} />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
export default colLearningLevel;
