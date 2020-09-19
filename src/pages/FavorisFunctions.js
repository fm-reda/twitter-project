import axios from "axios";
const api = "http://127.0.0.1:8000";
const api2 = "http://twitterfeed.lahcen-elhanchir.com/";
export const addFavorie = tweet => {
  return axios
    .post(`${api}/api/add-tweet`, tweet, {
      headers: { Authorization: `Bearer ${localStorage.usertoken}` }
    })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => {
      return err.response;
    });
};
export const getFavoris = () => {
  // console.log('<i class="fas fa-thunderstorm-moon    "></i>');
  return axios
    .get(`${api}/api/get-favoris`, {
      headers: { Authorization: `Bearer ${localStorage.usertoken}` }
    })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => {
      return err.response;
    });
};

export const delFavorie = id => {
  // console.log('<i class="fas fa-thunderstorm-moon    "></i>');
  return axios
    .delete(`${api}/api/delete/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.usertoken}` }
    })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => {
      return err.response;
    });
};
