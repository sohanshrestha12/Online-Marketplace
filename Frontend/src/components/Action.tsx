import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FetchProduct } from "@/pages/ProductDetails";
import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import Update from "./Update";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface ActionProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  product: FetchProduct;
  handleDeleteRow: (item: FetchProduct) => void;
}
const Action = ({
  isOpen,
  onOpen,
  onClose,
  product,
  handleDeleteRow,
}: ActionProps) => {
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleUpdateDialogOpen = () => {
    setUpdateDialogOpen(true);
    onClose();
  };
  const handleUpdateDialogClose = () => {
    setUpdateDialogOpen(false);
  };
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
    onClose();
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };
  return (
    <>
      <DropdownMenu
        open={isOpen}
        onOpenChange={(open) => (open ? onOpen() : onClose())}
      >
        <DropdownMenuTrigger>
          <GoKebabHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={handleUpdateDialogOpen}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500 w-full hover:!text-red-500"
            onClick={handleDeleteDialogOpen}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDeleteDialogOpen} onOpenChange={handleDeleteDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              product and remove your data from our servers.
            </DialogDescription>
            <DialogFooter className="mt-3">
              <Button onClick={handleDeleteDialogClose}>Cancel</Button>
              <Button
                variant={"destructive"}
                onClick={() => {
                  handleDeleteRow(product);
                  handleDeleteDialogClose();
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Update
        isOpen={isUpdateDialogOpen}
        onClose={handleUpdateDialogClose}
        product={product}
      />
    </>
  );
};

export default Action;
