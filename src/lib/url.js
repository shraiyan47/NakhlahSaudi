export const Main_URL = "https://api.nakhlah.xyz";
export const API_URL = `${Main_URL}/api/auth/local`;
export const Forget_Reset_URL = `${Main_URL}/api/auth`;

export const Admin_URL = `${Main_URL}/admin`;

// purpose api
export const LearningPurposeAddItem_URL = `${Main_URL}/api/learning-purposes`;
export const LearningPurposeGetAllItem_URL = `${Main_URL}/api/learning-purposes?populate=*`;

// level api
export const LearningLevelAddItem_URL = `${Main_URL}/api/learner-levels`;
export const LearningLevelGetAllItem_URL = `${Main_URL}/api/learner-levels?populate=*`;

// starting point
export const LearningStartingPointAddItem_URL = `${Main_URL}/api/learner-starting-points`;
export const LearningStartingPointGetAllItem_URL = `${Main_URL}/api/learner-starting-points?populate=*`;

// goal api
export const LearningGoalAddItem_URL = `${Main_URL}/api/learning-goals`;
export const LearningGoalGetAllItem_URL = `${Main_URL}/api/learning-goals?populate=*`;

// journey URL - masum
export const journey_add_url = `${Main_URL}/api/learning-journeys`;
export const journey_get_url = `${Main_URL}/api/learning-journeys`;
// task-unit URL - masum
export const unit_add_url = `${Main_URL}/api/learning-journeys`;
export const unit_get_url = `${Main_URL}/api/learning-journey-units?populate=learning_journey`;
export const unit_post_url = `${Main_URL}/api/learning-journey-units`;
// level URL - masum
export const level_add_url = `${Main_URL}/api/`;
export const level_get_url = `${Main_URL}/api/learning-journey-levels?populate[learning_journey_unit][populate][0]=learning_journey`;
export const level_by_journey_get_url = `${Main_URL}/api/learning-journey-levels?populate[learning_journey_unit][populate][0]=learning_journey`;
// lesson URL - masum
export const lesson_add_url = `${Main_URL}/api/`;
export const lesson_get_url = `${Main_URL}/api/learning-journey-lessons?populate[learning_journey_level][populate][learning_journey_unit][populate][0]=learning_journey`;
