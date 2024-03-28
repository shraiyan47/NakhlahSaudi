"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, ClipboardEdit, Trash2 } from "lucide-react";
import Image from "next/image";
import Deletion from "../modals/other/Deletion"; 
import { BASE_URL } from "@/lib/requestHandler";


import AddLanguage from "../modals/questionaries/AddLanguage";

const ColLanguage = [
 

  {
    accessorKey: "id",
    header: () => <div className="textNormal textPrimaryColor">ID</div>,
    cell: ({ row }) => {
      const rowId = parseInt(row.id) + 1;
      return (
        <div className="textSecondaryColor textNormal">
          {rowId}
        </div>
      );
    },
  },
  {
    id: "id_language",
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
          Language
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="  textNormal textSecondaryColor">
        {row.getValue("id_language")
         ? row.getValue("id_language")
         : "Not attached"}
      </div>
    ),
  },
  {
    id: "id_country",
    accessorKey: "country",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="textPrimaryColor textNormal"
        >
        Country
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="  textNormal textSecondaryColor">
        {row.getValue("id_country")
         ? row.getValue("id_country")
         : "Not attached"}
      </div>
    ),
  },
 

//   {
//     accessorKey: "icon",
//     header: () => <div className="textPrimaryColor textNormal">Image </div>,
//     cell: ({ row }) => {
//       return (
//        <div>
//         { (row.getValue("icon") ) ?
//           <Image
//             src={`${BASE_URL}${row.getValue("icon")}`}
//             alt=""
//             width={40}
//             height={40}
//             className="rounded-full border-2 border-black"
//           />
//        :
//      <div> No Image</div>
//     }
//         </div> 
//       );
//     },
//   },

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
              <Deletion rowData={row.original} what="language" />
            </DialogContent>
          </Dialog>
          <Dialog className="">
            <DialogTrigger asChild>
              <Button className="hover:text-[--uDText]">
                <ClipboardEdit className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <AddLanguage
                title="language"
                useForEdit={true}
                rowData={row.original}
              />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

export default ColLanguage;
