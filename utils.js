import { api, getHome, getMenus, getPosts, getSubCategories } from "./api";
import { database } from "./model";

const USER_STORAGE_KEY = "user_nekhor_storage.v1";
const TOKEN_STORAGE_KEY = "token_nekhor_storage.v1";

export const DATA = [
  {
    id: 1,
    title: "Introduction to the Buddha",
    description: "Mumbai, India",
    date: "Nov 17th, 2020",
    poster:
      "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1612905103843-D35IV0LTOOG4IPF4XYDU/shutterstock_1031466766.jpg?format=2500w",
  },
  {
    id: 1,
    title: "Introduction to the Buddha",
    description: "Unknown",
    date: "Sept 3rd, 2020",
    poster:
      "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1612905103843-D35IV0LTOOG4IPF4XYDU/shutterstock_1031466766.jpg?format=2500w",
  },
  {
    id: 1,
    title: "Introduction to the Buddha",
    description: "New York, USA",
    date: "Oct 11th, 2020",
    poster:
      "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1612905103843-D35IV0LTOOG4IPF4XYDU/shutterstock_1031466766.jpg?format=2500w",
  },
  {
    id: 1,
    title: "Introduction to the Buddha",
    description: "Bucharest, Romania",
    date: "Aug 17th, 2020",
    poster:
      "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1612905103843-D35IV0LTOOG4IPF4XYDU/shutterstock_1031466766.jpg?format=2500w",
  },
  {
    id: 1,
    title: "Introduction to the Buddha",
    description: "Prague, Czech Republic",
    date: "Sept 11th, 2020",
    poster:
      "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1612905103843-D35IV0LTOOG4IPF4XYDU/shutterstock_1031466766.jpg?format=2500w",
  },
  {
    id: 1,
    title: "Introduction to the Buddha",
    description: "Berlin, Germany",
    date: "Apr 21th, 2021",
    poster:
      "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1612905103843-D35IV0LTOOG4IPF4XYDU/shutterstock_1031466766.jpg?format=2500w",
  },
  {
    id: 1,
    title: "Introduction to the Buddha",
    description: "Liboa, Portugal",
    date: "Aug 12th, 2020",
    poster:
      "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1612905103843-D35IV0LTOOG4IPF4XYDU/shutterstock_1031466766.jpg?format=2500w",
  },
];

export const Categories = [
  {
    id: 1,
    name: "The Buddha",
    countries: [
      {
        id: 1,
        name: "Nepal",
        posts: [
          {
            id: 1,
            image:
              "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613003896214-84327QJKCMI3ZJKKSMHY/shutterstock_1461171485.jpg?format=2500w",
            title: "BODH GAYA",
          },
          {
            id: 2,
            image:
              "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613008648899-EQ3VYDAK78GGYQCU0FSA/430399324-huge.jpg?format=2500w",
            title: "SARNATH",
          },
          {
            id: 2,
            image:
              "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613003896214-84327QJKCMI3ZJKKSMHY/shutterstock_1461171485.jpg?format=2500w",
            title: "BODH GAYA",
          },
          {
            id: 3,
            image:
              "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613008648899-EQ3VYDAK78GGYQCU0FSA/430399324-huge.jpg?format=2500w",
            title: "SARNATH",
          },
        ],
      },
      {
        id: 2,
        name: "India",
        posts: [
          {
            id: 1,
            image:
              "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613003896214-84327QJKCMI3ZJKKSMHY/shutterstock_1461171485.jpg?format=2500w",
            title: "BODH GAYA",
          },
          {
            id: 2,
            image:
              "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613008648899-EQ3VYDAK78GGYQCU0FSA/430399324-huge.jpg?format=2500w",
            title: "SARNATH",
          },
          {
            id: 2,
            image:
              "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613003896214-84327QJKCMI3ZJKKSMHY/shutterstock_1461171485.jpg?format=2500w",
            title: "BODH GAYA",
          },
          {
            id: 3,
            image:
              "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613008648899-EQ3VYDAK78GGYQCU0FSA/430399324-huge.jpg?format=2500w",
            title: "SARNATH",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Guru",
    countries: [
      {
        id: 1,
        name: "Nepal",
        posts: [
          {
            id: 1,
            image:
              "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613003896214-84327QJKCMI3ZJKKSMHY/shutterstock_1461171485.jpg?format=2500w",
            title: "BODH GAYA",
          },
          {
            id: 2,
            image:
              "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613008648899-EQ3VYDAK78GGYQCU0FSA/430399324-huge.jpg?format=2500w",
            title: "SARNATH",
          },
          {
            id: 2,
            image:
              "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613003896214-84327QJKCMI3ZJKKSMHY/shutterstock_1461171485.jpg?format=2500w",
            title: "BODH GAYA",
          },
          {
            id: 3,
            image:
              "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613008648899-EQ3VYDAK78GGYQCU0FSA/430399324-huge.jpg?format=2500w",
            title: "SARNATH",
          },
        ],
      },
      {
        id: 2,
        name: "India",
        posts: [
          {
            id: 1,
            image:
              "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613003896214-84327QJKCMI3ZJKKSMHY/shutterstock_1461171485.jpg?format=2500w",
            title: "BODH GAYA",
          },
          {
            id: 2,
            image:
              "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613008648899-EQ3VYDAK78GGYQCU0FSA/430399324-huge.jpg?format=2500w",
            title: "SARNATH",
          },
          {
            id: 2,
            image:
              "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613003896214-84327QJKCMI3ZJKKSMHY/shutterstock_1461171485.jpg?format=2500w",
            title: "BODH GAYA",
          },
          {
            id: 3,
            image:
              "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613008648899-EQ3VYDAK78GGYQCU0FSA/430399324-huge.jpg?format=2500w",
            title: "SARNATH",
          },
        ],
      },
    ],
  },
];

export const Itineraries = [
  {
    id: 1,
    name: "Itinerary example #21",
  },
  {
    id: 2,
    name: "Other itinerary example #1",
  },
];

export const PostsData = [
  {
    id: 1,
    image:
      "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613003896214-84327QJKCMI3ZJKKSMHY/shutterstock_1461171485.jpg?format=2500w",
    title: "Sites of the Guru: Kathmandu Valley and Pharping",
    description: "A SACRED URBAN LANDSCAPE",
  },
  {
    id: 2,
    image:
      "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613008648899-EQ3VYDAK78GGYQCU0FSA/430399324-huge.jpg?format=2500w",
    title: "Sites of the Guru: Kathmandu Valley and Pharping",
    description: "A SACRED URBAN LANDSCAPE",
  },
  {
    id: 2,
    image:
      "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613003896214-84327QJKCMI3ZJKKSMHY/shutterstock_1461171485.jpg?format=2500w",
    title: "Sites of the Guru: Kathmandu Valley and Pharping",
    description: "A SACRED URBAN LANDSCAPE",
  },
  {
    id: 3,
    image:
      "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613008648899-EQ3VYDAK78GGYQCU0FSA/430399324-huge.jpg?format=2500w",
    title: "Sites of the Guru: Kathmandu Valley and Pharping",
    description: "A SACRED URBAN LANDSCAPE",
  },
];

export const Countries = [
  {
    id: 1,
    name: "Nepal",
    posts: [
      {
        id: 1,
        image:
          "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613003896214-84327QJKCMI3ZJKKSMHY/shutterstock_1461171485.jpg?format=2500w",
        title: "BODH GAYA",
        description: "Guru",
      },
      {
        id: 2,
        image:
          "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613008648899-EQ3VYDAK78GGYQCU0FSA/430399324-huge.jpg?format=2500w",
        title: "SARNATH",
        description: "Guru",
      },
      {
        id: 2,
        image:
          "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613003896214-84327QJKCMI3ZJKKSMHY/shutterstock_1461171485.jpg?format=2500w",
        title: "BODH GAYA",
        description: "Guru",
      },
      {
        id: 3,
        image:
          "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613008648899-EQ3VYDAK78GGYQCU0FSA/430399324-huge.jpg?format=2500w",
        title: "SARNATH",
        description: "Guru",
      },
    ],
  },
  {
    id: 2,
    name: "India",
    posts: [
      {
        id: 1,
        image:
          "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613003896214-84327QJKCMI3ZJKKSMHY/shutterstock_1461171485.jpg?format=2500w",
        title: "BODH GAYA",
        description: "The Buddha",
      },
      {
        id: 2,
        image:
          "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613008648899-EQ3VYDAK78GGYQCU0FSA/430399324-huge.jpg?format=2500w",
        title: "SARNATH",
        description: "The Buddha",
      },
      {
        id: 2,
        image:
          "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613003896214-84327QJKCMI3ZJKKSMHY/shutterstock_1461171485.jpg?format=2500w",
        title: "BODH GAYA",
        description: "The Buddha",
      },
      {
        id: 3,
        image:
          "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1613008648899-EQ3VYDAK78GGYQCU0FSA/430399324-huge.jpg?format=2500w",
        title: "SARNATH",
        description: "The Buddha",
      },
    ],
  },
];

export const getMenusDb = async () => {
  return await database.get("locals").query();
};

export const saveMenus = async () => {
  const res = await database.get("locals").query();

  if (res.length <= 0) {
    const response = await getMenus();

    response.data.map(async (item) => {
      const newPost = await database.write(async () => {
        await database.get("locals").create((local) => {
          local.id = item.id;
          local.name = item.name;
          local.localId = item.local_id;
          local.languageId = item.language_id;
        });
      });
    });
  }
};

export const getHomesDb = async () => {
  return await database.get("homes").query();
};

export const saveHome = async () => {
  const res = await database.get("homes").query();
  const response = await getHome();
  const responsePostHome = await getPosts("q[has_home_true]=true");
  const newHome = await database.write(async () => {
    await database.get("homes").create((home) => {
      home.myId = 1;
      home.content = JSON.stringify(response.data);
      home.carousel = JSON.stringify(responsePostHome.data);
      home.languageId = 1;
    });
  });
};

export const getCountriesDb = async () => {
  return await database.get("countries").query();
};

export const saveCountries = async () => {
  const res = await database.get("countries").query();

  if (res.length <= 0) {
    const response = await getSubCategories();
    response.data.map(async (item) => {
      const newCountry = await database.write(async () => {
        await database.get("countries").create((country) => {
          country.myId = item.id;
          country.localId = item.local_id;
          country.content = JSON.stringify(item);
          country.languageId = 1;
        });
      });
    });
  }
};

export const getPostDb = async () => {
  return await database.get("posts").query();
};

export const savePosts = async () => {
  const res = await database.get("posts").query();
  console.log("SALVANDO DADOS D AHOME", res);
  if (res.length <= 0) {
    const response = await getPosts();
    response.data.map(async (item) => {
      const newPost = await database.write(async () => {
        await database.get("posts").create((post) => {
          post.myId = item.id;
          post.content = JSON.stringify(item);
          post.postId = item.post_id;
          post.localId = item.local_id;
          post.countryId = item.country_id;
          post.languageId = 1;
        });
      });
    });
  }
};
