// scoreMessages.js

export const getScoreMessage = (correctAnswers) => {
  if (correctAnswers === 0) {
    return "Ay naku, walang tama! Balik aral muna tayo!";
  } else if (correctAnswers < 5) {
    return "Good job! Konti pa, kaya mo 'yan!";
  } else if (correctAnswers < 10) {
    return "Great work! Malapit na sa perfect!";
  } else {
    return "Astig! Perfect score ka! Idol!";
  }
};
