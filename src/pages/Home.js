import React, { useState, useEffect } from "react";
import {
  Form,
  Col,
  InputGroup,
  FormControl,
  Button,
  Row,
  Alert,
  Spinner
} from "react-bootstrap";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton
} from "react-twitter-embed";
import SingleTweetMedia from "../components/SingleTweetMedia";
import SingleTweetSlim from "../components/SingleTweetSlim";
import { searchTweets, getTrend } from "../components/searchFunctions";

const Home = props => {
  const [datas, setDatas] = useState({});
  const [params, setParams] = useState({});
  const [errors, setErrors] = useState({});
  const [tweets, setTweets] = useState([]);
  const [requestStatus, setRequestStatus] = useState(false);
  const [requestStatusTrend, setRequestStatusTrend] = useState(false);
  const [trends, setTrends] = useState([]);
  const [trend1, setTrend1] = useState("");
  const [editing, setEditing] = useState(true);
  const [update, setUpdate] = useState(false);
  // const [trend2, setTrend2] = useState("covid");
  const [trendParam, setTrendParam] = useState({
    // q: `%23${trend1}`
  });

  useEffect(() => {
    if (!localStorage.trend) {
      localStorage.setItem("trend", "maroc");
    }
    setTrend1(localStorage.trend);
    // console.log(localStorage.trend);
    const trendParam = {
      q: `%23${localStorage.trend}`
    };
    // setTrendParam({ q: `%23${localStorage.trend}` });
    // console.log(trendParam);
    setRequestStatusTrend(true);

    getTrend(trendParam).then(res => {
      setTimeout(() => {
        setRequestStatusTrend(false);
      }, 1000);
      // console.log(res);
      if (res && res.status == 200) {
        setTrends(res.data.statuses);
      }
    });
  }, [update]);
  // functions
  const handleSumbit = () => {
    setRequestStatus(true);

    searchTweets(datas).then(res => {
      setTimeout(() => {
        setRequestStatus(false);
      }, 1000);
      setTweets(res.data.statuses);
      if (res && res === 200) {
      }
      // console.log(res);
    });
  };
  const handleClik = () => {
    if (!datas.q) {
      setErrors({ ...errors, msg: "Please write a word for searching!!" });
      setTimeout(() => {
        setErrors({ ...errors, msg: "" });
      }, 3000);
    } else {
      setErrors({ ...errors, msg: "" });
      console.log(datas);
      handleSumbit();
      // setDatas({ ...datas, search: e.target.value });
    }
  };

  const handleKeyPress = e => {
    // e.preventDefault();

    if (e.charCode == 13) {
      e.preventDefault();

      // setq(e.target.value);
      // handleSubmit(e);
      if (e.target.id == "q" && !e.target.value) {
        setErrors({ ...errors, msg: "Please write a word for searching!!" });
        setTimeout(() => {
          setErrors({ ...errors, msg: "" });
        }, 3000);
      } else {
        setErrors({ ...errors, msg: "" });

        setDatas({ ...datas, q: e.target.value });
        handleSumbit();
      }

      // console.log(datas);
      // console.log(param);
    }
  };
  const handleChange = e => {
    // setParam({});
    setDatas({ ...datas, [e.target.id]: e.target.value });

    console.log(datas);
  };
  const handleEdit = e => {
    setEditing(true);
    setUpdate(!update);
  };
  const handleChangeTrend = e => {
    setTrend1(e.target.value);
    localStorage.setItem("trend", e.target.value);
  };
  const handleKeyPressTrend = e => {
    // e.preventDefault();
    // console.log("test");
    if (e.charCode == 13) {
      e.preventDefault();
      setTrend1(e.target.value);
      localStorage.setItem("trend", e.target.value);
      setEditing(true);
      setUpdate(!update);
    }
  };

  return (
    <div className="row p-2">
      {/* start left section */}
      <div className="col-lg-9">
        <div className="box rounded p-2">
          <h1>Welcom,</h1>
          <p className="text18 p-2">Search For Tweets.</p>
        </div>
        <div className="box ">
          {/* start Form searching */}
          <Form>
            <Form.Row className="align-items-center p-2">
              <i
                className="fas fa-2x fa-fw fa-search c-twitter cp"
                aria-hidden="true"
                onClick={handleClik}
              ></i>
              <Col sm={7} className="my-1 mr-5">
                <Form.Label htmlFor="inlineFormInputName" srOnly>
                  search
                </Form.Label>
                <Form.Control
                  id="q"
                  onChange={handleChange}
                  required
                  type="text"
                  placeholder="Search Twitter"
                  className="mr-5 rounded-pill p-4"
                  onKeyPress={handleKeyPress}

                  // defaultValue="Mark"
                />
              </Col>
              <Col xs="auto" className="my-1">
                <Form.Label
                  className="mr-sm-2"
                  htmlFor="inlineFormCustomSelect"
                  srOnly
                >
                  Number
                </Form.Label>
                <Form.Control
                  as="select"
                  className="mr-sm-2"
                  id="count"
                  onChange={handleChange}
                  custom
                >
                  <option value="">Number...</option>
                  <option value="6">6</option>
                  <option value="12">12</option>
                  <option value="">All</option>
                </Form.Control>
              </Col>
              <Col xs="auto" className="my-1">
                <Form.Label
                  className="mr-sm-2"
                  htmlFor="inlineFormCustomSelect"
                  srOnly
                >
                  Lang
                </Form.Label>
                <Form.Control
                  as="select"
                  className="mr-sm-2"
                  id="lang"
                  custom
                  onChange={handleChange}
                >
                  <option value="">Lang...</option>
                  <option value="en">En</option>
                  <option value="en">fra</option>
                  <option value="ar">Ar</option>
                  <option value="">All</option>
                </Form.Control>
              </Col>
            </Form.Row>
            {errors.msg && <Alert variant="danger">{errors.msg}</Alert>}
          </Form>
          <hr />
          {/* end Form searching */}

          {/* start tweet maping  */}
          {requestStatus ? (
            <div className="row justify-content-center align-items-center py-5">
              <Spinner animation="border" variant="info" />
            </div>
          ) : (
            <Row className="bg-light m-0 py-3">
              {tweets.map((item, i) => (
                <Col xs={4} key={i} className=" p-col mb-3">
                  <SingleTweetMedia tweet={item} />
                </Col>
              ))}
            </Row>
          )}

          {/* end tweet maping  */}

          {/* ----------- */}
        </div>
      </div>
      {/* end left section */}
      {/* start right section */}

      <div className="col-lg-3 box p-2 rounded">
        <h1>#Trending</h1>
        <Row className="align-items-center tags">
          {editing ? (
            <>
              <Col lg="9" className="text-uppercase">
                #{trend1}
              </Col>
              <Col lg="2">
                <i
                  className="fas fa-1x fa-fw fa-cogs cp "
                  onClick={() => setEditing(false)}
                ></i>
              </Col>
            </>
          ) : (
            <>
              <Col lg="9" className="text-uppercase">
                <Form.Control
                  id="trend1"
                  onChange={handleChangeTrend}
                  required
                  type="text"
                  placeholder="Search Twitter"
                  className=""
                  value={trend1}
                  onKeyPress={handleKeyPressTrend}

                  // onKeyPress={handleKeyPress}

                  // defaultValue="Mark"
                />
              </Col>
              <Col lg="2" onClick={() => handleEdit()}>
                <i className="fas fa-2x fa-fw fa-check-square cp"></i>
              </Col>
            </>
          )}
        </Row>

        {requestStatusTrend ? (
          <div className="row justify-content-center align-items-center py-5">
            <Spinner animation="border" variant="info" />
          </div>
        ) : (
          <div className="m-0 py-3 ">
            {trends.map((item, i) => (
              <Col key={i} lg={12} className="mb-3 ">
                <SingleTweetMedia tweet={item} />
              </Col>
            ))}
          </div>
        )}

        {/* <div className="m-0 py-3 ">
          {trends.map((item, i) => (
            <Col key={i} lg={12} className="mb-3 ">
              <SingleTweetMedia tweet={item} />
            </Col>
          ))}
        </div> */}
      </div>
      {/* end right section */}
    </div>
  );
};

export default Home;

{
  /* <div className="centerContent">
                  <div className="selfCenter">
                    <TwitterTweetEmbed
                      tweetId="1301566796668055555"
                      options={{
                        cards: "hidden",
                        height: 100,
                        maxWidth: 800,
                      }}

                      // onLoad={action}
                    />
                  </div>
                </div> */
}
