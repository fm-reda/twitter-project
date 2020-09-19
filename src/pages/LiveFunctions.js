import axios from "axios";
const api = "http://127.0.0.1:8000";
const api2 = "http://twitterfeed.lahcen-elhanchir.com/";
export const stream = () => {
  return axios
    .get(`${process.env.REACT_APP_APIV2}/tweets/search/stream`, {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}` }
    })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => {
      return err.response;
    });
};
