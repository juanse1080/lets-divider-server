const split = (event: { sentence: string; dividend: number }) => {
  const { sentence, dividend } = event;
  try {
    // Exception if phrase is empty
    if (!sentence)
      return {
        code: 422,
        type: "error",
        data: {
          sentence: "sentence is a required field",
        },
      };

    const splitSentence = sentence?.trim().split(" ") as string[];
    const min = splitSentence.reduce<number>((minLength, currentValue) => {
      if (minLength === 0) return currentValue.length;
      else if (minLength < currentValue.length) return currentValue.length;
      else return minLength;
    }, 0);

    // Exception if there is a word greater than the length of the split
    if (min > (dividend as number))
      return {
        code: 422,
        type: "error",
        data: {
          sentence: `lenght must be greater than or equal to ${min}`,
        },
      };

    const items = splitSentence.reduce<string[]>((acc, word) => {
      if (
        !acc.length ||
        `${acc[acc.length - 1]} ${word}`.length > (dividend as number)
      ) {
        acc.push(word);
        return acc;
      }

      acc[acc.length - 1] += ` ${word}`;
      return acc;
    }, []);

    return {
      code: 200,
      type: "success",
      data: {
        items,
      },
    };
  } catch (error) {
    return {
      code: 500,
      type: "error",
      data: { error: "Internal error" },
    };
  }
};

export default split;
