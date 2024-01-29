"use client";
import { useEffect } from "react";
import DataTable from "../../table/DataTable";
import { useLoadingState, useQueType } from "../../../../store/useAdminStore";
import columnQueType from "../../table/ColQueType";
import { getHandler } from "@/lib/requestHandler";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { renderableQueType } from "@/lib/fetchFunctions";

const QueType = () => {
  const queTypeData = useQueType((state) => state.data);
  const setQueTypes = useQueType((state) => state.setQueTypes);

  const loading = useLoadingState((state) => state.loading);
  const toggleLoading = useLoadingState((state) => state.toggleLoading);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("question-type");
      console.log(response.data);
      if (response.status === 200) {
        setQueTypes(renderableQueType(response.data.data));
        toggleLoading(false);
      }
    };
    if (
      loading == false &&
      Array.isArray(queTypeData) &&
      queTypeData.length === 0
    ) {
      toggleLoading(true);
      fetch();
    }
  }, []);

  return (
    <div className="w-full h-full bg-white  rounded-xl">
      {loading ? (
        <CustomSkeleton />
      ) : (
        <DataTable
          data={queTypeData}
          columns={columnQueType}
          view={"question-type"}
        />
      )}
    </div>
  );
};

export default QueType;
