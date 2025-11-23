import { CreateUserDialog } from "@/components/forms/create-user-dialog";
import { UsersTable } from "@/components/users-table";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-12">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                User Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your users and their information
              </p>
            </div>

            <CreateUserDialog />
          </div>
          <UsersTable />
        </div>
      </div>
    </div>
  );
}
