import { split } from "./src/resources";

exports.handler = async (event: { sentence: string; dividend: number }) => {
  return split(event);
};
