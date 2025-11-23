import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { getUsers } from "@/server/users";
import DeleteUserButton from "./delete-user-button";
import { Button } from "./ui/button";
import { CreateUserForm } from "./forms/createuser-form";

export async function UsersTable() {
  const users = await getUsers();
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-indigo-500/10 border border-gray-200/50 overflow-hidden">
      <Table>
        <TableCaption className="text-base font-medium text-gray-600 py-4">
          A list of your recent invoices.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 hover:from-indigo-50 hover:via-purple-50 hover:to-pink-50 border-b-2 border-indigo-100">
            <TableHead className="w-[100px] font-bold text-gray-700 uppercase tracking-wider text-xs py-4">
              Username
            </TableHead>
            <TableHead className="font-bold text-gray-700 uppercase tracking-wider text-xs py-4">
              Email
            </TableHead>
            <TableHead className="font-bold text-gray-700 uppercase tracking-wider text-xs py-4">
              Created At
            </TableHead>
            <TableHead className="text-right font-bold text-gray-700 uppercase tracking-wider text-xs py-4">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-gradient-to-r hover:from-indigo-50/30 hover:via-purple-50/30 hover:to-pink-50/30 transition-all duration-200 border-b border-gray-100"
            >
              <TableCell className="font-medium text-gray-900 py-4">
                {user?.email}
              </TableCell>
              <TableCell className="text-gray-700 py-4">
                {user?.username}
              </TableCell>
              <TableCell className="text-gray-600 py-4">
                {user?.createdAt?.toLocaleString()}
              </TableCell>
              <TableCell className="text-right text-gray-600 py-4">
                <div className="flex gap-2 justify-end">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={"ghost"}>Edit</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          {user ? " update" : "delete"} your account and remove
                          your data from our servers.
                        </AlertDialogDescription>

                        <CreateUserForm user={user} />
                      </AlertDialogHeader>
                    </AlertDialogContent>
                  </AlertDialog>

                  <DeleteUserButton userId={user.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
