"use client";
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
import Image from "next/image";
import AddJourney from "../modals/lessons/AddJourney";
import AddLesson from "../modals/lessons/AddLesson";

export const purposeColumns = [
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
    accessorKey: "purpose",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Purpose
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase textNormal textSecondaryColor">
        {row.getValue("purpose")}
      </div>
    ),
  },
  {
    accessorKey: "formats",
    header: () => <div className="textPrimaryColor textNormal">Image</div>,
    cell: ({ row }) => {
      // console.log(row.getValue('formats').src)
      return (
        <div>
          {/* <Image src={`${Main_URL}${row.getValue('formats')?.small}`} alt="" width={40} height={40} className="rounded-full border-2 border-black" /> */}
          <Image
            src={`${row.getValue("formats").src}`}
            alt=""
            width={40}
            height={40}
            className="rounded-full border-2 border-black"
          />
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
      const idx = row.original.id;
      return (
        <div className="flex gap-2 justify-center textSecondaryColor textSemiHeader">
          <Button className="hover:text-[--uDText]">
            <Trash2 className="" />
          </Button>
          <Button className="hover:text-[--uDText]">
            <ClipboardEdit className="" />
          </Button>
        </div>
      );
    },
  },
];
//

export const startingPointColumns = [
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
    accessorKey: "title",
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
    cell: ({ row }) => (
      <div className="lowercase textNormal textSecondaryColor">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "subtitle",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Subtitle
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase textNormal textSecondaryColor pl-2">
        {row.getValue("subtitle")}
      </div>
    ),
  },
  {
    accessorKey: "formats",
    header: () => <div className="textPrimaryColor textNormal">Image</div>,
    cell: ({ row }) => {
      return (
        <div>
          {/* <Image src={`${Main_URL}${row.getValue('formats')?.small}`} alt="" width={40} height={40} className="rounded-full border-2 border-black" /> */}
          <Image
            src={`${row.getValue("formats").src}`}
            alt=""
            width={40}
            height={40}
            className="rounded-full border-2 border-black"
          />
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
      const payment = row.original;

      return (
        <div className="flex gap-2 justify-center textSecondaryColor textSemiHeader">
          <Button className="hover:text-[--uDText]">
            <Trash2 className="" />
          </Button>
          <Button className="hover:text-[--uDText]">
            <ClipboardEdit className="" />
          </Button>
        </div>
      );
    },
  },
];

export const levelColumns = [
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
    accessorKey: "level",
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
    cell: ({ row }) => {
      return (
        <div className="lowercase textNormal textSecondaryColor">
          {row.getValue("level")}
        </div>
      );
    },
  },
  {
    accessorKey: "formats",
    header: () => <div className="textPrimaryColor textNormal">Image</div>,
    cell: ({ row }) => {
      return (
        <div>
          {/* <Image src={`${Main_URL}${row.getValue('formats')?.small}`} alt="" width={40} height={40} className="rounded-full border-2 border-black" /> */}
          <Image
            src={`${row.getValue("formats").src}`}
            alt=""
            width={40}
            height={40}
            className="rounded-full border-2 border-black"
          />
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
      const payment = row.original;

      return (
        <div className="flex gap-2 justify-center textSecondaryColor textSemiHeader">
          <Button className="hover:text-[--uDText]">
            <Trash2 className="" />
          </Button>
          <Button className="hover:text-[--uDText]">
            <ClipboardEdit className="" />
          </Button>
        </div>
      );
    },
  },
];

export const goalColumns = [
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
    accessorKey: "goal",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Goal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase textNormal textSecondaryColor">
        {row.getValue("goal")}
      </div>
    ),
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase textNormal textSecondaryColor">
        {row.getValue("time")}
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
      const payment = row.original;

      return (
        <div className="flex gap-2 justify-center textSecondaryColor textSemiHeader">
          <Button className="hover:text-[--uDText]">
            <Trash2 className="" />
          </Button>
          <Button className="hover:text-[--uDText]">
            <ClipboardEdit className="" />
          </Button>
        </div>
      );
    },
  },
];
