import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect } from "react";

export function InfoTest() {
  const isOpend = localStorage.getItem("seeInfo");

  useEffect(() => {
    !isOpend && localStorage.setItem("seeInfo", "open");
  }, []);

  return (
    <div className="fixed bottom-[15%] right-5 z-10">
      <Dialog defaultOpen={isOpend ? false : true}>
        <form>
          <DialogTrigger asChild>
            <Button
              className="rounded-full text-red-700 bg-slate-200 font-bold"
              variant="outline"
            >
              Tài khoản để test
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]" aria-describedby="">
            <DialogHeader>
              <DialogTitle className="text-red-700 font-bold">
                Tài khoản để test
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="my-4">
                <h3 className="text-xl">Role: User</h3>
                <p>Email: clienttest1@gmail.com</p>
                <p>Password: clienttest1</p>
              </div>
              <div className="my-4">
                <h3 className="text-xl">Role: Admin</h3>
                <p>Email: clienttest2@gmail.com</p>
                <p>Password: clienttest2</p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
