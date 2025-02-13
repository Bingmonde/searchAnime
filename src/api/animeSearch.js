

export const fetchAnimeCategories = async () => {
    const query = `
    query {
          GenreCollection
        }
`;

    const url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
            })
        };


    try {
        const res = await fetch(url, options)
        const data = await res.json();
        return data.data.GenreCollection;

    } catch (e) {
        console.log(e)
    }
}

export const fetchAnimeStatus = async () => {
    const query = `
    query {
    __type(name: "MediaStatus") {
    enumValues {
      name
    }
  }
}
`;

    const url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
            })
        };


    try {
        const res = await fetch(url, options)
        const data = await res.json();
        return data.data.__type.enumValues;

    } catch (e) {
        console.log(e)
    }
}


export const fetchAnimebyTitleCategoryStatusPagination = async (title, genre, status, page) => {
    const query = `
       query ($title: String, $genre: String, $status: MediaStatus, $page: Int) {
        Page (page: $page) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media(type: ANIME, search: $title, genre: $genre, status: $status) {
              id
              title {
                romaji
                english
                native
              }
               coverImage {
                large
               }
              description
              status
              genres
              episodes
              
            }
        }
    }`

    const variables = {
       ... (title && { title }),
        ...(genre && { genre }),
        ...(status && { status }),
        ...(page && { page })
    }

    const url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    // Search
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        return data.data;

    } catch (e) {
        console.log(e);
    }
}

export const fetchAnimebyId = async (id) => {
    var query = `
query ($id: Int) {
  Media (id: $id, type: ANIME) {
  id
  title {
    romaji
    english
    native
  }
   coverImage {
    large
   }
  description
  status
  genres
  season
  episodes
  streamingEpisodes {
  title
  thumbnail
  url
}
  characters {
    edges {
      node {
        id
        name {
          full
          native
        }
        image {
          large
        }
        description
      }
      role
    }
  }
  }
}
`;

    const variables = {
        id: id
    };

    const url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };


    try {
        const res = await fetch(url, options)
        const data = await res.json();
        const anime = data.data.Media;
        // console.log('raw data',anime)

        return {
            id: anime.id,
            title: anime.title.romaji,
            title_english: anime.title.english,
            title_japanese: anime.title.native,
            genre: anime.genres.join(', '),
            status: anime.status,
            description: anime.description,
            image_url: anime.coverImage.large,
            episodes: anime.episodes,
            episodes_info: anime.streamingEpisodes,
            season: anime.season,
            characters: anime.characters.edges.filter(character => character.role === 'MAIN').map((character) => {
                return {
                    id: character.node.id,
                    name: character.node.name.full,
                    name_native: character.node.name.native,
                    image_url: character.node.image.large,
                    description: character.node.description
                }
            })

        }

    } catch (e) {
        console.log(e)
    }

}

export const fetchAnimeEpisodes = async (id) => {
    const query = `
      query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
    season
    streamingEpisodes {
      title
      thumbnail
      url
    }
  }
}`;

    const variables = {
        id: id,
    };

    const url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };


    try {
        const res = await fetch(url, options)
        const data = await res.json();
        return {
            id: data.data.Media.id,
            title: data.data.Media.title.romaji,
            title_english: data.data.Media.title.english,
            title_japanese: data.data.Media.title.native,
            season: data.data.Media.season,
            episodes: data.data.Media.streamingEpisodes.map((episode) => {
                return {
                    title: episode.title,
                    image_url: episode.thumbnail
                }
            })
        }

    } catch (e) {
        console.log(e)
    }
}
