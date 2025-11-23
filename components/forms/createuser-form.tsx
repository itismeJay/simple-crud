"use client";
import { email, set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { createUser, updateUser } from "@/server/users";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { User } from "@/db/schema";
import { AlertDialogCancel } from "../ui/alert-dialog";

interface CreateorUpdateUserFormProps {
  user?: User;
  onSuccess?: () => void;
}

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
});

export function CreateUserForm({
  onSuccess,
  user,
}: CreateorUpdateUserFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const newUser = { ...values, password: "defaultpassword123" };

      if (user) {
        await updateUser({
          ...newUser,
          id: user.id,
        });
      } else {
        await createUser(newUser);
      }

      form.reset();
      toast.success(`User ${user ? "updated" : "created"} successfully!`);
      router.refresh();
      // Close the dialog
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${user ? "update" : "created"} user.`);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="bruce" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="bruce@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2">
            <AlertDialogCancel asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </AlertDialogCancel>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                `${user ? "Update" : "Create"} User`
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
