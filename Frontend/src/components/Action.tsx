import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import Update from "./Update";
import { FetchProduct } from "@/pages/ProductDetails";

interface ActionProps {
  isOpen: boolean;
  onClose: () => void;
  product: FetchProduct;
}
const Action = ({ isOpen, onClose, product }: ActionProps) => {
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const handleUpdateDialogOpen = () => {
    setUpdateDialogOpen(true);
  };
  const handleUpdateDialogClose = () => {
    setUpdateDialogOpen(false);
    onClose();
  };
  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={onClose}>
        <DropdownMenuTrigger>
          <GoKebabHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={handleUpdateDialogOpen}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Update isOpen={isUpdateDialogOpen} onClose={handleUpdateDialogClose} product={product}/>
    </>
  );
};

export default Action;
