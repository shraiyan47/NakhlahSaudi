
import AdminForgetPasswordForm from '@/components/dashboard-admin/auth/AdminForgetPasswordForm';
import AdminFormTitle from '@/components/ui-custom/AdminFormTitle';

const AdminForgetPassword = () => {
    return (
        <>
            <AdminFormTitle title={'Forget Password'}/>
            <AdminForgetPasswordForm/>
        </>
    );
};

export default AdminForgetPassword;