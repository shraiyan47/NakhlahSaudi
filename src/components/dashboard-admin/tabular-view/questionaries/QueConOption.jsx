// "use client";
// import DataTable from "../table/DataTable";
// import ColQueConOption from "../table/ColQueConOption";
// import { useQueContOption } from "@/store/useAdminStore";
// import { useEffect } from "react";
// import CustomSkeleton from "@/components/ui-custom/CustomSkeleton";
// import { getHandler, getOne } from "@/lib/requestHandler";

// export default function QueConOption() {
//   const queContOptions = useQueContOption((state) => state.data);
//   const setQueContOptions = useQueContOption(
//     (state) => state.setQueContOptions
//   );

//   useEffect(() => {
//     const fetch = async () => {
//       const response = await getHandler("question-content-option");

//       if (response.status === 200) {
//         let contentData = [];

//         response.data.data.forEach((item) => {
//           // alert(JSON.stringify(item));

//           let options=[];

//           const option_id = item.attributes?.content?.data?.id;
//           const option_title = item.attributes?.content?.data?.attributes.title;
//           //
//           getOne(
//             "api/question-contents/" +
//               item.attributes?.question_content?.data?.id +
//               "?populate=*"
//           )
//             .then((result) => {
//               const id = result.data.data.id;
//               const question = {
//                 id: result.data.data.attributes.question.data.id,
//                 question:
//                   result.data.data.attributes.question.data.attributes.question,
//               };
//               const content = {
//                 id: result.data.data.attributes.content.data.id,
//                 title:
//                   result.data.data.attributes.content.data.attributes.title,
//               };
//             })
//             .catch((err) => console.log(err));
//         });
//       }
//     };
//     if (Array.isArray(queContOptions) && queContOptions.length === 0) {
//       fetch();
//     }
//   }, [queContOptions]);

//   return (
//     <div className="w-full bg-white  rounded-xl">
//       {queContOptions.length != 0 ? (
//         <DataTable
//           data={queContOptions}
//           columns={ColQueConOption}
//           view="question-content-option"
//         />
//       ) : (
//         <CustomSkeleton />
//       )}
//     </div>
//   );
// }
