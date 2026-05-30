import aiResponses from "./aiResponses";

export const getAIResponse = (question) => {

  const lower = question.toLowerCase();

  if (
    lower.includes("who are you")
  ) {
    return aiResponses.who;
  }

  if (
    lower.includes("portfolio")
  ) {
    return aiResponses.portfolio;
  }

  if (
    lower.includes("technology") ||
    lower.includes("tech")
  ) {
    return aiResponses.technologies;
  }

  if (
    lower.includes("creator") ||
    lower.includes("khizer")
  ) {
    return aiResponses.creator;
  }

  return `
AI could not understand the query.

Try:
ask who are you
ask explain portfolio
ask technologies
  `;
};