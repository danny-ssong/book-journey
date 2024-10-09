"use server";

export default async function searchBooks(query, size) {
  //   const url = `${process.env.KAKAO_BASE_URL}/v3/search/book?target=title&query=${encodeURIComponent(query)}&size=10`;
  const url = `${process.env.KAKAO_BASE_URL}/v3/search/book?target=title&query=${encodeURIComponent(
    query
  )}&size=${size}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
