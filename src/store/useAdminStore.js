import axios from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";
import {
  Admin_URL,
  LearningStartingPointAddItem_URL,
  LearningLevelAddItem_URL,
  LearningLevelGetAllItem_URL,
  LearningPurposeAddItem_URL,
  LearningPurposeGetAllItem_URL,
} from "../lib/url";

//  static data
import {
  staticConType,
  staticConTypeCategory,
  staticJourneyData,
  staticLessonData,
  staticLevelData,
  staticQueType,
  staticUnitData,
} from "../static-data/data";
import {
  deleteHandler,
  getHandler,
  postHandler,
  putHandler,
} from "@/lib/requestHandler";

const token =
  "5cb5acf4b96532cdad0e30d900772f5c8b5532d2dbf06e04483a3705c725ffbbdba593340718423a5975e86aa47ca1749de402ec9f3127648dbcec37b190107ba975e669811b2a2f4c8b41c27472d6fdb70e7b0be4f8490c57a406e29aedf47dd05dadb7171788ba9fa2af106d93b4f92423b8e194131891e712857b52e8ceef";

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const initStateSelection = {
  id: null,
  title: "",
};

// const store_mode = "live";
const is_store_mode_static = true;

//  admin login or not check
const KEY = "isAdminLogin";

const getInitialLoggedIn = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(KEY) || false;
  } else {
    return null;
  }
};

// use left navbar
export const useNavbarState = create(
  immer((set) => ({
    isOpen: true,
    toggleNavbar: () => set((state) => ({ isOpen: !state.isOpen })),
  }))
);

export const useLoadingState = create(
  immer((set) => ({
    loading: false,
    toggleLoading: (bool) => set((state) => ({ loading: bool })),
  }))
);

// admin login , forget password, reset password
export const useAdminAuth = create(
  immer((set) => ({
    errorMessage: "",
    isAdminLogin: getInitialLoggedIn(),
    adminAuth: async (values) => {
      const response = await axios.post(`${Admin_URL}/login`, {
        ...values,
      });
      if (response.status === 200) {
        localStorage.setItem(KEY, true);
        set((state) => {
          state.isAdminLogin = true;
        });
      }
      return response;
    },
    forgetPassword: async (values) => {
      return await axios.post(`${Admin_URL}/forgot-password`, {
        ...values,
      });
    },
    resetPassword: async (values) => {
      const response = await axios.post(`${Admin_URL}/reset-password`, {
        ...values,
      });
      if (response.status === 200) {
        localStorage.setItem(KEY, false);
        set((state) => {
          state.isAdminLogin = false;
        });
      }
      return response;
    },
    adminLogout: async () =>
      set((state) => {
        localStorage.removeItem(KEY);
        state.isAdminLogin = false;
      }),
  }))
);

// ______________________________________  tabular view

export const useTabularView = create(
  immer((set) => ({
    data: {
      currentPage: "",
      currentView: "",
      currentSubView: "",
      currentAct: "",
    },
    setSubView: (data) => {
      set((state) => {
        state.data.currentSubView = data.currentSubView;
      });
    },
    setTabularView: (data) => {
      set((state) => {
        state.data = {
          ...state.data,
          ...data,
        };
      });
    },
  }))
);

// ______________________________________  learning journey

export const useLearnerPurpose = create(
  immer((set) => ({
    data: [],
    setPurposes: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("learner-purpose", id, {
            data,
          })
        : await postHandler("learner-purpose", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            purpose: data.attributes.purpose,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
         // console.log("item.id == data.id", item.id == data.id, item.id, data.id)
         // console.log("item", item)
          //console.log("data", data)
          if (item.id == data.id) {
            console.log("data", data)
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
export const useLearnerLevel = create(
  immer((set) => ({
    data: [],
    setLevels: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("learner-level", id, {
            data,
          })
        : await postHandler("learner-level", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          errors: {
            err0: errors[0].message,
            err1: errors[1] ? errors[1].message : "",
          },
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            level: data.attributes.level,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    removeGoal: async (id) => {
      const response = await deleteHandler("goal", id);

      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: "Deleted Successfully",
          id: data.id,
        };
      } else if (response.status == 400) {
        return response.data.error.message;
      }
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
export const useLearnerStartPoint = create(
  immer((set) => ({
    data: [],
    setStartPoints: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("learner-start-point", id, {
            data,
          })
        : await postHandler("learner-start-point", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          errors: {
            err0: errors[0].message,
            err1: errors[1] ? errors[1].message : "",
          },
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
            subtitle: data.attributes.subtitle,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },

    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
export const useLearnerGoal = create(
  immer((set) => ({
    data: [],
    setGoals: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("learner-goal", id, {
            data,
          })
        : await postHandler("learner-goal", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          errors: {
            err0: errors[0].message,
            err1: errors[1] ? errors[1].message : "",
          },
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            time: data.time,
            icon: data.icon
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          // console.log("item.id == data.id", item.id == data.id, item.id, data.id)
          // console.log("item", item)
          if (item.id == data.id) {
            console.log("data", data)
            
            return data;
          } else {
            return item;
          }
        });
      });
    },
    removeGoal: async (id) => {
      const response = await deleteHandler("goal", id);

      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: "Deleted Successfully",
          id: data.id,
        };
      } else if (response.status == 400) {
        return response.data.error.message;
      }
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);

// ______________________________________  learning content

export const useLearningJourney = create(
  immer((set) => ({
    data: [],
    setJournies: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("learning-journey", id, {
            data,
          })
        : await postHandler("learning-journey", {
            data,
          });
      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },

    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
export const useLearningUnit = create(
  immer((set) => ({
    data: [],

    setUnits: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {},
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
export const useLearningLevel = create(
  immer((set) => ({
    data: [],

    setLevels: (data) => {
      set((state) => {
        state.data = data;
      });
    },

    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);
export const useLearningLesson = create(
  immer((set) => ({
    data: [],

    setLessons: (data) => {
      set((state) => {
        state.data = data;
      });
    },

    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);

// ______________________________________  learning question

export const useQueType = create(
  immer((set) => ({
    data: [],
    setQueTypes: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("question-type", id, {
            data,
          })
        : await postHandler("question-type", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);

export const useQuestionTitle = create( //// For Question Title Add Only
  immer((set) => ({
    data: [],
    setQuestionTitle: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("questions", id, {
            data,
          })
        : await postHandler("questions", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          errors: {
            err0: errors[0].message,
            err1: errors[1] ? errors[1].message : "",
          },
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
            subtitle: data.attributes.subtitle,
          },
        };
      }
    },
    afterAdd: (data) => {
      console.log(" U A S => ", data)
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },

    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);

export const useQuestionContent = create( //// For Question Content Add Only
  immer((set) => ({
    data: [],
    setQuestionContent: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("questions", id, {
            data,
          })
        : await postHandler("questions", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          errors: {
            err0: errors[0].message,
            err1: errors[1] ? errors[1].message : "",
          },
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
            subtitle: data.attributes.subtitle,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },

    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);

export const useQuestion = create( ///// For Question Mapping
  immer((set) => ({
    data: [],
    selectedJourney: initStateSelection,
    selectedUnit: initStateSelection,
    selectedLevel: initStateSelection,
    selectedLesson: initStateSelection,
    resetSelection: (data) => {
      set((state) => {
        state.selectedJourney = initStateSelection;
        state.selectedUnit = initStateSelection;
        state.selectedLevel = initStateSelection;
        state.selectedLesson = initStateSelection;
      });
    },
    setSelectedJourney: (data) => {
      set((state) => {
        state.selectedJourney = data;
      });
    },
    setSelectedUnit: (data) => {
      set((state) => {
        state.selectedUnit = data;
      });
    },
    setSelectedLevel: (data) => {
      set((state) => {
        state.selectedLevel = data;
      });
    },
    setSelectedLesson: (data) => {
      set((state) => {
        state.selectedLesson = data;
      });
    },
    setQuestions: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("question", id, {
            data,
          })
        : await postHandler("question", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            question: data.attributes.question,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);

export const useConType = create(
  immer((set) => ({
    data: [],
    setConTypes: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("content-type", id, {
            data,
          })
        : await postHandler("content-type", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);

export const useConTypeCategory = create(
  immer((set) => ({
    data: [],
    setConTypeCategories: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("content-type-category", id, {
            data,
          })
        : await postHandler("content-type-category", {
            data,
          });
      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);

export const useContent = create(
  immer((set) => ({
    data: [],
    setContents: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("content-all", id, {
            data,
          })
        : await postHandler("content-all", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
            audio: data.attributes.audio,
            content_type: {
              id:  data.attributes?.content_type?.data?.id,
              title:data.attributes?.content_type?.attributes?.title,
            },
            content_type_category: {
              id: data.attributes?.content_type_category?.data?.id,
              title: data.attributes?.content_type_category?.data?.attributes?.title,
            },
            icon: data.attributes.image?.data?.attributes?.url,
          },
        };
      }
    },
    afterAdd: (data) => {
      console.log("daaaaaaaaaaataaaaaaaaaaaaa", data)
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      console.log("daaaaaaaaaaataaaaaaaaaaaaa", data)
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);

export const useContentDetails = create(
  immer((set) => ({
    data: [],
    setContents: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("content-details", id, {
            data,
          })
        : await postHandler("content-details", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        console.log("usestoreadmin", data)
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
            audio: data.attributes.audio,
            content: {
              id:  data.attributes?.content?.data?.id,
              title:data.attributes?.content?.data?.attributes?.title,
            },
            icon: data.attributes.image?.data?.attributes?.url,
          },
        };
      }
    },
    afterAdd: (data) => {
      console.log("bebo", data)
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      console.log("bebo", data)
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);

export const useLanguage = create(
  immer((set) => ({
    data: [],
    setLanguage: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("language", id, {
            data,
          })
        : await postHandler("language", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        console.log("usestoreadmin", data)
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.name,
            country: data.attributes.country,
          },
        };
      }
    },
    afterAdd: (data) => {
      console.log("bebo", data)
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      console.log("bebo", data)
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);

export const useContentDetailsByLanguage = create(
  immer((set) => ({
    data: [],
    setContentDetailsByLanguage: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("content-details-by-language", id, {
            data,
          })
        : await postHandler("content-details-by-language", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        console.log("usestoreadmin", data)
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
            content: {
              id: item.attributes?.content?.data?.id,
              title: item.attributes?.content?.data?.attributes?.title,
            },
            language: {
              id: item.attributes?.language?.data?.id,
              title: item.attributes?.language?.data?.attributes?.name,
            },
          },
        };
      }
    },
    afterAdd: (data) => {
      console.log("bebo", data)
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      console.log("bebo", data)
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);

export const useDetailsOfContentDetailsByLanguage = create(
  immer((set) => ({
    data: [],
    setDetailsOfContentDetailsByLanguage: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("details-of-content-details-by-language", id, {
            data,
          })
        : await postHandler("details-of-content-details-by-language", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        console.log("usestoreadmin", data)
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
            audio: item.attributes?.audio,
            content_details_by_language: {
              id:  data.data.attributes?.content_details_by_language?.data?.id,
              title: data.data.attributes?.content_details_by_language?.data?.attributes?.title,
            },
            icon: item.attributes.image?.data?.attributes?.url,
          },
        };
      }
    },
    afterAdd: (data) => {
      console.log("bebo", data)
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      console.log("bebo", data)
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);


export const useContentByClause= create(
  immer((set) => ({
    data: [],
    setContentByClause: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("content-by-clause", id, {
            data,
          })
        : await postHandler("content-by-clause", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        console.log("usestoreadmin", data)
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
            sequence:  item.attributes?.sequence,
            content: {
             id: item.attributes?.contents?.data[0]?.id,
             title: item.attributes?.contents?.data[0]?.attributes?.title,
           },
           language: {
             id: item.attributes?.language?.data?.id,
             title: item.attributes?.language?.data?.attributes?.name,
           },
           content_details_by_language: {
             id: item.attributes?.content_details_by_language?.data?.id,
             title: item.attributes?.content_details_by_language?.data?.attributes?.title,
           }
          },
        };
      }
    },
    afterAdd: (data) => {
      console.log("bebo", data)
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      console.log("bebo", data)
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);

export const useContentBySyllable= create(
  immer((set) => ({
    data: [],
    setContentBySyllable: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("content-by-syllable", id, {
            data,
          })
        : await postHandler("content-by-syllable", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        console.log("usestoreadmin", data)
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
            sequence:  item.attributes?.sequence,
            content: {
             id: item.attributes?.contents?.data[0]?.id,
             title: item.attributes?.contents?.data[0]?.attributes?.title,
           },
           language: {
             id: item.attributes?.language?.data?.id,
             title: item.attributes?.language?.data?.attributes?.name,
           },
           content_details_by_language: {
             id: item.attributes?.content_details_by_language?.data?.id,
             title: item.attributes?.content_details_by_language?.data?.attributes?.title,
           }
          },
        };
      }
    },
    afterAdd: (data) => {
      console.log("bebo", data)
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      console.log("bebo", data)
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);

export const useQueContent = create(
  immer((set) => ({
    data: [],
    setQueContents: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("question-content", id, {
            data,
          })
        : await postHandler("question-content", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);

export const useQueContOption = create(
  immer((set) => ({
    data: [],
    setQueContOptions: (data) => {
      set((state) => {
        state.data = data;
      });
    },
    addEdit: async ({ useForEdit, data, id }) => {
      const response = useForEdit
        ? await putHandler("question-content-option", id, {
            data,
          })
        : await postHandler("question-content-option", {
            data,
          });

      if (response.status == 400) {
        let errors = response.data.error.details.errors;
        return {
          status: response.status,
          error: errors[0].message,
        };
      }
      if (response.status == 200) {
        let data = response.data.data;
        return {
          status: response.status,
          message: useForEdit ? "Updated Successfully" : "Added Successfully",
          data: {
            id: data.id,
            title: data.attributes.title,
          },
        };
      }
    },
    afterAdd: (data) => {
      set((state) => {
        state.data = [data, ...state.data];
      });
    },
    afterUpdate: (data) => {
      set((state) => {
        state.data = state.data.map((item) => {
          if (item.id == data.id) {
            return data;
          } else {
            return item;
          }
        });
      });
    },
    afterDelete: (id) => {
      set((state) => {
        state.data = state.data.filter((item) => item.id != id);
      });
    },
  }))
);

export const useModal = create(
  immer((set) => ({
    data: { isModalForEdit: false, modaldata: {} },

    updateLesson: (id, data) => {
      set((state) => {
        state.data = [...state.data, data];
      });
    },
  }))
);

export const useLearningState = create(
  immer(
    subscribeWithSelector((set) => ({
      data: [],
      addNewItem: false,
      addItem: async (formData, url) => {
        const response = await axios.post(url, formData, config);
        set((state) => {
          state.addNewItem = true;
        });
        return response;
      },
      getAllItem: async (url) => {
        const response = await axios.get(url, config);
        if (response.status === 200) {
          set((state) => {
            state.data = response.data;
          });
          set((state) => {
            state.addNewItem = false;
          });
        }
      },
    }))
  )
);
