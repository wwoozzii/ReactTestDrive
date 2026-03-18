interface CatImage {
  url: string;
  id: string;
  width: number;
  height: number;
}

type ImageResponse = CatImage[];

export const getRandomImage = async (): Promise<string> => {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    if (!response.ok) throw new Error("Ошибка сервера");

    const data: ImageResponse = await response.json();
    const [firstCat] = data;

    if (!firstCat) throw new Error("API вернуло пустой массив");

    return firstCat.url;
  } catch (error) {
    console.error("Ошибка при получении изображения:", error);
    throw error;
  }
};
