interface AdviceResponse {
  slip: {
    id: number;
    advice: string;
  };
}

export const getRandomAdvice = async (): Promise<string> => {
  try {
    const responce = await fetch("https://api.adviceslip.com/advice");
    if (!responce.ok) {
      throw new Error("Ошибка сервера");
    }

    const data: AdviceResponse = await responce.json();
    return data.slip.advice;
  } catch (error) {
    console.error("Ошибка при получении совета:", error);
    throw error;
  }
};
