// components/create-user-dialog.tsx
"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CreateUserForm } from "@/components/forms/createuser-form";

export function CreateUserDialog() {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-2 px-6 py-3 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 transform hover:scale-105">
          <UserPlus className="w-5 h-5" />
          Add User
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add User</AlertDialogTitle>
          <AlertDialogDescription className="mb-4">
            Add new User to the database
          </AlertDialogDescription>
          <CreateUserForm onSuccess={() => setOpen(false)} />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
