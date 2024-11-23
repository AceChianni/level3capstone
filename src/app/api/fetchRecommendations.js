export async function fetchRecommendations(selectedGenres) {
  const recommendations = document.getElementById("recommendationContainer");
  recommendations.innerHTML = "<p>Loading recommendations...</p>";

  const genreNames = selectedGenres.map((genre) => GENRE_IDS[genre]);
  const uniqueGenreNames = [...new Set(genreNames)];

  const query = `
    query ($genres: [String]) {
        Page(perPage: 5) {
            media(genre_in: $genres, type: ANIME, sort: POPULARITY_DESC) {
                title {
                    romaji
                }
                coverImage {
                    large
                }
                description
                siteUrl
            }
        }
    }
  `;
  const variables = {
    genres: uniqueGenreNames,
  };

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    });

    const data = await response.json();

    if (data.data.Page.media.length > 0) {
      return data.data.Page.media;
    } else {
      alert("No recommendations found based on your preferences.");
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    alert("Error fetching recommendations. Please try again later.");
  }
}
