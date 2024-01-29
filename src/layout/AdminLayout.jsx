"use client";
import AdminLeftNavbar from "@/components/dashboard-admin/navbar/AdminLeftNavbar";
import AdminTopNavbar from "@/components/dashboard-admin/navbar/AdminTopNavbar";
import { useNavbarState } from "@/store/useAdminStore";
import { usePathname, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useSpring, animated } from "react-spring";

const AdminLayout = ({ child }) => {
  const path = usePathname();
  const route = useRouter();
  const isOpenCall = useNavbarState((state) => state.isOpen);
  const toggleNavbarCall = useNavbarState((state) => state.toggleNavbar);
  const delay = useSpring({
    width: isOpenCall ? "81%" : "100%",
    delay: 40,
  });

  return (
    <>
      {path === "/admin/auth" ||
        path === "/admin/auth/forgot-password" ||
        path === "/admin/auth/reset-password" ? (
        <div className="flex w-full min-h-screen max-h-screen items-center justify-center bg-[--uDBg]">
          <div className=" bg-white text-[--uDText] 1xl:w-[25%]  xl:w-[30%] text-[16px] py-10 rounded-xl xl:w[35%] lg:w-[40%] md:w-[40%] sm:w-[50%] w-full sm:h-auto h-screen flex flex-col  justify-center">
            <>
              <div className="text-center my-5">
                <h1 className="headerText font-bold  pt-1">Nakhlah</h1>
              </div>
              <div className="w-[85%] mx-auto 2xl:mb-16 mb-5">{child}</div>
            </>
          </div>
        </div>
      ) : (
        <div className="bg-[--uDBg] min-h-screen">
          <div className="w-[95%] h-full mx-auto ">
            <div className="py-3">
              <AdminTopNavbar open={isOpenCall} handleOpen={toggleNavbarCall} />
            </div>
            <div className="flex  relative h-full   ">
              <div className="w-[17%] fixed">
                <AdminLeftNavbar open={isOpenCall} />
              </div>
              <animated.div style={delay} className={`absolute right-0 h-full`}>
                <div className="h-[83vh] overflow-y-scroll rounded-xl">
                  {child}
                </div>
              </animated.div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLayout;
