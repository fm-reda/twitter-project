import axios from "axios";

export const searchTweets = params => {
  params = { ...params, q: `%23${params.q}%26${params.q}` };
  // setDatas({ ...datas });
  console.log(params);
  return axios
    .get(process.env.REACT_APP_APIV1 + "search/tweets.json?has:media", {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`
      },
      params: params
    })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};
export const getTrend = params => {
  // params = { ...params, q: `%23${params.q}%26${params.q}` };
  // setDatas({ ...datas });
  // params = { q: "maroc" };
  // console.log(localStorage.trend);
  return axios
    .get(
      process.env.REACT_APP_APIV1 +
        "search/tweets.json?lang=en&count=4&has:media",
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`
        },
        params: params
      }
    )
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

// const getTweet = (params) => {
//     // console.log("paramsTweet in getTweet funct :" + params);
//     axios
//       .get(`${cors}${urlSearch}`, {
//         headers: { Authorization: `Bearer ${tokenMine}` },
//         params: params,
//       })
