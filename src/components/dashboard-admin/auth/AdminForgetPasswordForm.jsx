'use client'
import { Form } from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import InputField from '../../ui-custom/InputField';
import CustomButton from '../../ui-custom/CustomButton';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/store/useAdminStore';
import { toast } from "@/components/ui/use-toast";
const formSchema = z.object({
    email: z.string().min(2, {
        message: "Fill up the email field",
    }),
})

const AdminForgetPasswordForm = () => {
    const forgetPasswordCall = useAdminAuth((state) => state.forgetPassword)
    const router = useRouter()

    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    // submit
    const onSubmit = async (values) => {
        // console.log(values)
        try {
            const response = await forgetPasswordCall(values)
            if (response.status === 204) {
                handleSubmit(response, toast, 'Admin Forget Password', router, 'admin/reset-password')
            }
        } catch (error) {
            toast({
                title: `forget password failed`
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <InputField form={form} name={'email'} placeholder={"Email Address"} type={'email'} style={'admin-input'} level={'Email'} levelStyle={'text-[16px]'} />
                <CustomButton
                    txt={'Send'}
                    type="submit"
                    style="admin-btn"
                />
            </form>
        </Form>
    );
};

export default AdminForgetPasswordForm;