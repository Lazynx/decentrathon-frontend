export const getDayLabel = (streak) => {
    if (streak === 1) {
      return "день";
    } else if (streak >= 2 && streak <= 4) {
      return "дня";
    } else {
      return "дней";
    }
  };