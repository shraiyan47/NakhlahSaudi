"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import InputField from "../../ui-custom/InputField";
import CustomButton from "../../ui-custom/CustomButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdminAuth } from "@/store/useAdminStore";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  password: z.string().min(2, {
    message: "Fill up the password field",
  }),
  resetPasswordToken: z.string().min(2, {
    message: "Automatic fill",
  }),
});
const AdminResetPasswordForm = () => {
  const resetPasswordCall = useAdminAuth((state) => state.resetPassword);
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      resetPasswordToken: "" || code,
    },
  });

  // submit
  const onSubmit = async (values) => {
    try {
      const response = await resetPasswordCall(values);
      handleSubmit(response, toast, "Admin Reset Password", router, "admin");
    } catch (error) {
      toast({
        title: `reset password failed`,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          form={form}
          name={"password"}
          placeholder={"Password"}
          type={"password"}
          style={"admin-input"}
          level={"Password"}
          levelStyle={"text-[16px]"}
        />
        <InputField
          form={form}
          name={"resetPasswordToken"}
          placeholder={"Reset Password Token"}
          type={"password"}
          style={"admin-input"}
          level={"Reset Password Token"}
          levelStyle={"text-[16px]"}
        />
        <CustomButton txt={"Reset Password"} type="submit" style="admin-btn" />
      </form>
    </Form>
  );
};

export default AdminResetPasswordForm;
