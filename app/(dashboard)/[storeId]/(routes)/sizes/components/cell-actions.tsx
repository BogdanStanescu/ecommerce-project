"use client";

import { useState } from "react";
import { Copy, Edit, MoreVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import useClipboard from "@/hooks/use-clipboard";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import AlertModal from "@/components/modals/alert-modal";
import { SizeColumn } from "./columns";

interface ICellActionProps {
  data: SizeColumn;
}

const CellAction = ({ data }: ICellActionProps) => {
  const router = useRouter();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clipboard = useClipboard({ label: "Size ID", data: data.id });

  const handleUpdate = () => router.push(`/${params.storeId}/sizes/${data.id}`);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);
      router.refresh();

      toast.success("Size deleted successfully.");
    } catch (error: any) {
      toast.error("Make sure you removed all products using this size first.");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        label={data.name}
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 float-right">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Actions
            <Separator />
          </DropdownMenuLabel>

          <DropdownMenuItem className="cursor-pointer" onClick={clipboard}>
            <Copy className="h-4 w-4 mr-2" />
            <p>Copy ID</p>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer" onClick={handleUpdate}>
            <Edit className="h-4 w-4 mr-2" />
            <p>Update</p>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
            disabled={isLoading}
          >
            <Trash className="h-4 w-4 mr-2" />
            <p>Delete</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;