export const extractIDs = (inputString) => {
    const courseMatch = inputString.match(/course-([^%&]+)/);
    const lessonMatch = inputString.match(/lesson-([^&]+)/);

    return {
        courseID: courseMatch ? courseMatch[1] : null,
        lessonID: lessonMatch ? lessonMatch[1] : null
    };
};
  