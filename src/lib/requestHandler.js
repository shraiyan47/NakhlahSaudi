import axios from "axios";

export const BASE_URL = "https://api.nakhlah.xyz";
export const API_URL = `${BASE_URL}/api/auth/local`;
export const Forget_Reset_URL = `${BASE_URL}/api/auth`;
export const Admin_URL = `${BASE_URL}/admin`;

export const token =
  "a040ca42e35c1c761a32f3166e19953056bf7163576137e47c01966247a3d630e5af4ca1c9f58256511a8a91079b1db1e794ca5527bd1cc6cfb04655ebfc1e0ad4ceedea704a2b68b30d14e15b7f44c4f680f73a50cc051981f0e390697d5181ae3a6ada78b3ccc4e6a721fb5e8dd28b34aaa73f01238d4250a09f9360519b0e";

export const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const fetchHeader = {
  Authorization:
    "Bearer " +
    "a040ca42e35c1c761a32f3166e19953056bf7163576137e47c01966247a3d630e5af4ca1c9f58256511a8a91079b1db1e794ca5527bd1cc6cfb04655ebfc1e0ad4ceedea704a2b68b30d14e15b7f44c4f680f73a50cc051981f0e390697d5181ae3a6ada78b3ccc4e6a721fb5e8dd28b34aaa73f01238d4250a09f9360519b0e",
};

export const getMap = {
  "learner-purpose": `${BASE_URL}/api/learning-purposes?populate=icon`,
  "learner-goal": `${BASE_URL}/api/learning-goals`,
  "learner-start-point": `${BASE_URL}/api/learner-starting-points?populate=icon`,
  "learner-level": `${BASE_URL}/api/learner-levels?populate=icon`,
  "learning-journey": `${BASE_URL}/api/learning-journeys`,
  "learning-unit": `${BASE_URL}/api/learning-journey-units?populate=learning_journey`,
  "learning-level": `${BASE_URL}/api/learning-journey-levels?populate[learning_journey_unit][populate][0]=learning_journey`,
  "learning-lesson": `${BASE_URL}/api/learning-journey-lessons?populate[learning_journey_level][populate][learning_journey_unit][populate][0]=learning_journey`,
  "question-type": `${BASE_URL}/api/question-types`,
  "content-type": `${BASE_URL}/api/content-types`,
  "content-type-category": `${BASE_URL}/api/content-type-categories`,
  "content-all": `${BASE_URL}/api/contents?populate=*`,
  "content-pm": `${BASE_URL}/api/contents?filters[content_type][title][$eq]=Pair_Matching`,
  "content-sm": `${BASE_URL}/api/contents?filters[content_type][title][$eq]=Sentence_Making`,
  "content-fitb": `${BASE_URL}/api/contents?filters[content_type][title][$eq]=Fill_In_The_Blank`,
  "content-tof": `${BASE_URL}/api/contents?filters[content_type][title][$eq]=Boolean`,
  "content-mcq": `${BASE_URL}/api/contents?filters[content_type][title][$eq]=MCQ`,

  "content-boolean": `${BASE_URL}/api/contents?populate=*&filters[content_type][title][$eq]=Boolean`,
  "content-fib": `${BASE_URL}/api/contents?populate=*&filters[content_type][title][$eq]=Fill_In_The_Blank`,
  "content-mcq": `${BASE_URL}/api/contents?populate=*&filters[content_type][title][$eq]=MCQ`,
  "content-sm": `${BASE_URL}/api/contents?populate=*&filters[content_type][title][$eq]=Sentence_Making`,
  "content-pm": `${BASE_URL}/api/contents?populate=*&filters[content_type][title][$eq]=Pair_Matching`,
  // question: `${BASE_URL}/api/questions?populate=*`,
  MCQ: "{{URL}}/api/question-contents?populate[question][populate]=*&filters[question_type][title][$eq]=MCQ",
  "Pair Matching": "",
  "Sentence Making": "",
  "True Or False": "",
  "Fill In The Blank": "",
  question: `${BASE_URL}/api/journey-map-question-contents?populate[question_content][populate]=*&populate=image&populate[learning_journey_lesson][populate][learning_journey_level][populate][learning_journey_unit][populate][0]=learning_journey`,
  "question-content": `${BASE_URL}/api/question-contents?populate=*`,
  "question-content-option": `${BASE_URL}/api/question-content-options?populate[question_content][populate][0]=id`,
};
export const postMap = {
  "learner-purpose": `${BASE_URL}/api/learning-purposes?populate=icon`,
  "learner-goal": `${BASE_URL}/api/learning-goals`,
  "learner-start-point": `${BASE_URL}/api/learner-starting-points?populate=icon`,
  "learner-level": `${BASE_URL}/api/learner-levels`,
  "learning-journey": `${BASE_URL}/api/learning-journeys`,
  "learning-unit": `${BASE_URL}/api/learning-journey-units`,
  "learning-level": `${BASE_URL}/api/learning-journey-levels`,
  "learning-lesson": `${BASE_URL}/api/learning-journey-lessons`,
  "question-type": `${BASE_URL}/api/question-types`,
  question: `${BASE_URL}/api/questions`,
  "content-type": `${BASE_URL}/api/content-types`,
  content: `${BASE_URL}/api/contents`,
  "content-type-category": `${BASE_URL}/api/content-type-categories`,
  "question-content": `${BASE_URL}/api/question-contents`,
  "question-content-option": `${BASE_URL}/api/question-content-options`,
  "journey-map-question": `${BASE_URL}/api/journey-map-question-contents`,
};
export const putMap = {
  "learner-purpose": `${BASE_URL}/api/learning-purposes`,
  "learner-goal": `${BASE_URL}/api/learning-goals`,
  "learner-start-point": `${BASE_URL}/api/learner-starting-points`,
  "learner-level": `${BASE_URL}/api/learner-levels`,
  "learning-journey": `${BASE_URL}/api/learning-journeys`,
  "learning-unit": `${BASE_URL}/api/learning-journey-units`,
  "learning-level": `${BASE_URL}/api/learning-journey-levels`,
  "learning-lesson": `${BASE_URL}/api/learning-journey-lessons`,
  "question-type": `${BASE_URL}/api/question-types`,
  content: `${BASE_URL}/api/contents`,
  "content-type": `${BASE_URL}/api/content-types`,
  "content-type-category": `${BASE_URL}/api/content-type-categories`,
  question: `${BASE_URL}/api/questions`,
  "question-content": `${BASE_URL}/api/question-contents`,
  "question-content-option": `${BASE_URL}/api/question-content-options`,
};
export const deleteMap = {
  "learner-purpose": `${BASE_URL}/api/learning-purposes`,
  "learner-goal": `${BASE_URL}/api/learning-goals`,
  "learner-start-point": `${BASE_URL}/api/learner-starting-points`,
  "learner-level": `${BASE_URL}/api/learner-levels`,
  "learning-journey": `${BASE_URL}/api/learning-journeys`,
  "learning-unit": `${BASE_URL}/api/learning-journey-units`,
  "learning-level": `${BASE_URL}/api/learning-journey-levels`,
  "learning-lesson": `${BASE_URL}/api/learning-journey-lessons`,
  "question-type": `${BASE_URL}/api/question-types`,
  content: `${BASE_URL}/api/contents`,
  "content-type": `${BASE_URL}/api/content-types`,
  "content-type-category": `${BASE_URL}/api/content-type-categories`,
  question: `${BASE_URL}/api/questions`,
  "question-content": `${BASE_URL}/api/question-contents`,
  "question-content-option": `${BASE_URL}/api/question-content-options`,
};

export const getWithUrl = async (url) => {
  try {
    const response = await axios.get(BASE_URL + "/" + url, config);
    return response;
  } catch (err) {
    return err;
  }
};

export const getHandler = async (key) => {
  try {
    const response = await axios.get(getMap[key], config);
    return response;
  } catch (err) {
    return err;
  }
};

export const postHandler = async (key, body) => {
  try {
    const response = await axios.post(postMap[key], body, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const putHandler = async (key, id, data) => {
  try {
    const response = await axios.put(putMap[key] + `/${id}`, data, config);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const deleteHandler = async ({ key, id }) => {
  try {
    const response = await axios.delete(deleteMap[key] + `/${id}`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const postFormData = async (key, formData) => {
  try {
    const response = await fetch(postMap[key], {
      method: "POST",
      body: formData,
      // headers: {
      //   Authorization:
      //     "Bearer " +
      //     "a040ca42e35c1c761a32f3166e19953056bf7163576137e47c01966247a3d630e5af4ca1c9f58256511a8a91079b1db1e794ca5527bd1cc6cfb04655ebfc1e0ad4ceedea704a2b68b30d14e15b7f44c4f680f73a50cc051981f0e390697d5181ae3a6ada78b3ccc4e6a721fb5e8dd28b34aaa73f01238d4250a09f9360519b0e",
      // },
      // headers:config.headers,
      config,
      redirect: "follow",
    }).then((response) => {
      return response;
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const getOne = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`, config);
    return response;
  } catch (err) {
    return err;
  }
};
