"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, ClipboardEdit, Info, Trash2 } from "lucide-react";
import Deletion from "../modals/other/Deletion";
import AddStartingPoint from "../modals/journey/AddStartPoint";

const ColQuestion = [
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
      return <div className="textSecondaryColor textNormal">{rowId}</div>;
    },
  },
  {
    id: "id_question_title",
    accessorKey: "question",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase textNormal textSecondaryColor">
          {row.getValue("id_question_title")}
        </div>
      );
    },
  },
  // que type title
  // {
  //   id: "id_question_type",
  //   accessorKey: "question_type.title",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         className="textPrimaryColor textNormal"
  //       >
  //         Type
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <div className=" textNormal textSecondaryColor">
  //         {row.getValue("id_question_type")}
  //       </div>
  //     );
  //   },
  // },
  {
    id: "id_question_audio",
    accessorKey: "audio",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Audio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className=" textNormal textSecondaryColor">
          {row.getValue("id_question_audio")
            ? row.getValue("id_question_audio")
            : "Not attached"}
        </div>
      );
    },
  },
  // lesson title
  {
    id: "id_lesson",
    accessorKey: "lesson.title",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Lesson
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase textNormal textSecondaryColor">
          {row.getValue("id_lesson")}
        </div>
      );
    },
  },
  // task unit
  {
    id: "id_task_unit",
    accessorKey: "task_unit.title",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Task Unit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase textNormal textSecondaryColor">
          {row.getValue("id_task_unit")}
        </div>
      );
    },
  },
  // task unit
  {
    id: "id_task_title",
    accessorKey: "task.title",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Task
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase textNormal textSecondaryColor">
          {row.getValue("id_task_title")}
        </div>
      );
    },
  },
  // levekl
  {
    id: "id_level_title",
    accessorKey: "level.title",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Learning Level
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase textNormal textSecondaryColor">
          {row.getValue("id_level_title")}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <div className="textNormal textPrimaryColor text-center">Actions</div>
    ),
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex gap-1 justify-center items-center textSecondaryColor textSemiHeader">
          <Dialog className="">
            <DialogTrigger asChild>
              <Button className="hover:text-[--uDText]">
                <Info className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] min-w-20. flex justify-center items-center">
              <span className="font-semibold text-base">To Be Done </span>
              <span>Whole Detail of the Particular question</span>
            </DialogContent>
          </Dialog>
          <Dialog className="">
            <DialogTrigger asChild>
              <Button className="hover:text-[--uDText]">
                <Trash2 className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <Deletion rowData={row.original} what="question" />
            </DialogContent>
          </Dialog>
          <Dialog className="">
            <DialogTrigger asChild>
              <Button className="hover:text-[--uDText]">
                <ClipboardEdit className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              {/* <AddQuestion
                title="question"
                useForEdit={true}
                rowData={row.original}
              /> */}
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

export default ColQuestion;
