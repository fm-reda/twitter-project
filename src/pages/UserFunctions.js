import axios from "axios";
const api = "http://127.0.0.1:8000";
const api2 = "http://twitterfeed.lahcen-elhanchir.com/";
export const register = newUser => {
  //api twitter feed

  return axios
    .post(`${api}/api/register`, newUser, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

//////////////////////////////////////////////////////////////////
export const login = user => {
  return axios
    .post(
      `${api}/api/login`,
      {
        email: user.email,
        password: user.password
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      localStorage.setItem("usertoken", res.data.access_token);
      localStorage.setItem("name", res.data.user.name);
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
//////////////////////////////////////////////////////////////////////

export const getProfile = newUser => {
  return axios
    .get(`${api}/api/user`, {
      headers: { Authorization: `Bearer ${localStorage.usertoken}` }
    })
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

