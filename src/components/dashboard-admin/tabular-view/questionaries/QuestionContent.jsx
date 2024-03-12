"use client";
import DataTable from "../../table/DataTable";
import ColQueContent from "../../table/ColQueContent";
import { useQueContent } from "@/store/useAdminStore";
import { useEffect } from "react";
import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
import { getHandler } from "@/lib/requestHandler";

export default function QueContent() {
  const queContents = useQueContent((state) => state.data);
  const setQueContents = useQueContent((state) => state.setQueContents);

  useEffect(() => {
    const fetch = async () => {
      const response = await getHandler("question-content");

      if (response.status === 200) {
        const contentData = response.data.data.map((item) => {
          return {
            id: item.id,
            question: {
              id: item.attributes?.question?.data?.id,
              question: item.attributes?.question?.data?.attributes?.question,
            },
            question_type: {
              id: item.attributes?.question_type?.data.id,
              title: item.attributes?.question_type?.data?.attributes?.title,
            },
            content: {
              id: item.attributes?.content?.data?.id,
              title: item.attributes?.content?.data?.attributes?.title,
            },
          };
        });
        setQueContents(contentData);
      }
    };
    if (Array.isArray(queContents) && queContents.length === 0) {
      fetch();
    }
  }, [queContents]);

  return (
    <div className="w-full bg-white  rounded-xl">
      {queContents.length != 0 ? (
        <DataTable
          data={queContents}
          columns={ColQueContent}
          view="question-content"
        />
      ) : (
        <CustomSkeleton />
      )}
    </div>
  );
}
