import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

interface CartDeleteDialog {
  onOpen: () => void;
  isOpen: boolean;
  handleDeleteCart:()=>void;
}

const CartDeleteDialog = ({
  onOpen,
  isOpen,
  handleDeleteCart,
}: CartDeleteDialog) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove your item from your Cart.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={onOpen} variant={"outline"}>
            Cancel
          </Button>
          <Button variant={"destructive"} onClick={handleDeleteCart}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CartDeleteDialog;
