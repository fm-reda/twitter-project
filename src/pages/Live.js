import React, { Component } from "react";
import Axios from "axios";
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
import {
  Card,
  Button,
  Row,
  Col,
  Image,
  Media,
  Modal,
  Alert,
  Spinner,
  InputGroup,
  FormControl
} from "react-bootstrap";

export default class Live extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweet: [],
      rules: { value: "morocco", tag: "maroc" },

      search: "",
      result_type: "mixed",
      count: 1,
      cors2: "https://cors-anywhere.herokuapp.com/",
      connecting: false,
      goLiveStatus: false,
      inpStatus: true,
      stream: {}
    };
    this.streamConnect = this.streamConnect.bind(this);
  }

  // handleClick() {
  //   console.log("clicked");
  // }
  request = require("request");
  componentDidMount() {}
  // cors2 = "https://cors-anywhere.herokuapp.com/";

  //******************************************************** */ start streamconect
  streamConnect(token, source, stream) {
    if (source == "stop") {
      // console.log("ggggggggggggggggggggggggggggggggg");
      // stream.abort();
      //
      stream.on("disconnect", data => {});
      // stream.abort();
      this.setState({ tweet: [] });
    } else {
      stream
        .on("data", data => {
          try {
            const json = JSON.parse(data);
            console.log(json.data);

            this.setState({
              tweet: [...this.state.tweet, json.data]
            });
            console.log(this.state.tweet);
            // console.log(this.state.tweet);

            if (json.connection_issue) {
              stream.emit("timeout");
            }
          } catch (e) {
            // Heartbeat received. Do nothing.
          }
        })
        .on("error", error => {
          if (error.code === "ESOCKETTIMEDOUT") {
            stream.emit("timeout");
          }
        });

      return stream;
    }
    // ***************************************************************** LIVE ON
  }
  //******************************************************** */ end LIVE ON

  //******************************************************** */ end streamconect

  //******************************************************** */ start DIDMOUNT

  //******************************************************** */ end DIDMOUNT

  componentDidUpdate() {
    console.log("update");
  }

  handleStartLive = () => {
    this.setState({ tweet: [] });

    const config = {
      url:
        "https://cors-anywhere.herokuapp.com/" +
        // "https://api.twitter.com/labs/1/tweets/stream/filter?format=compact",
        "https://api.twitter.com/2/tweets/search/stream",

      auth: {
        bearer: process.env.REACT_APP_BEARER_TOKEN
      },
      timeout: 20000
    };
    // Listen to the stream

    this.setState({ stream: this.request.get(config) });

    console.log(this.request.get(config));

    // const stream = this.request.get(config);

    this.setState({ connecting: true });
    this.setState({ goLiveStatus: false });
    this.setState({ inpStatus: true });
    // console.log(this.state.rules);

    const bearerRandom = process.env.REACT_APP_BEARER_TOKEN;
    const consumer_key = process.env.REACT_APP_ACCESS_TOKEN;
    const consumer_secret = process.env.REACT_APP_ACCESS_TOKEN_SECRET;

    // const cors2 = "https://cors-anywhere.herokuapp.com/";

    //****************************************************************************************************************************** */
    const https = require("https");
    const request = require("request");
    const util = require("util");

    const get = util.promisify(request.get);
    const post = util.promisify(request.post);

    // const consumer_key = ""; // Add your API key here
    // const consumer_secret = ""; // Add your API secret key here

    const bearerTokenURL = new URL(
      this.state.cors2 + "https://api.twitter.com/oauth2/token"
    );
    const streamURL = new URL(
      this.state.cors2 + "https://api.twitter.com/labs/1/tweets/stream/filter"
    );
    const rulesURL = new URL(
      // cors2 + "https://api.twitter.com/labs/1/tweets/stream/filter/rules"
      this.state.cors2 + "https://api.twitter.com/2/tweets/search/stream/rules"
    );

    async function sleep(delay) {
      return new Promise(resolve => setTimeout(() => resolve(true), delay));
    }

    async function bearerToken(auth) {
      return bearerRandom;
    }

    async function getAllRules(token) {
      const requestConfig = {
        url: rulesURL,
        auth: {
          bearer: token
        }
      };

      const response = await get(requestConfig);
      if (response.statusCode !== 200) {
        throw new Error(response.body);
        return null;
      }

      return JSON.parse(response.body);
    }
    //************************************ ********************************  start delete rules/
    async function deleteAllRules(rules, token) {
      if (!Array.isArray(rules.data)) {
        return null;
      }

      const ids = rules.data.map(rule => rule.id);

      const requestConfig = {
        url: rulesURL,
        auth: {
          bearer: token
        },
        json: {
          delete: {
            ids: ids
          }
        }
      };

      const response = await post(requestConfig);
      if (response.statusCode !== 200) {
        throw new Error(JSON.stringify(response.body));
        return null;
      }

      return response.body;
    }
    //************************************ ********************************  end delete rules/
    //************************************ ********************************  start SET rules /
    // this.setState({rules: [{ value: "maroc ", tag: "maghrib" }]});
    async function setRules(token, rules) {
      const requestConfig = {
        url: rulesURL,
        auth: {
          bearer: token
        },
        json: {
          // add: [{ value: "maroc ", tag: "maghrib" }]
          add: [rules]
        }
      };

      const response = await post(requestConfig);
      console.log(response);
      if (response.statusCode !== 201) {
        throw new Error(JSON.stringify(response.body));
        return null;
      }

      return response.body;
    }
    //************************************ ********************************  end delete rules/

    (async () => {
      let token, currentRules, stream;
      let timeout = 0;

      // const rules = [
      //   { value: "rabat ", tag: "maghrib" },
      //   { value: "fes  -grumpy", tag: "morocco" }
      // ];

      try {
        // Exchange your credentials for a Bearer token
        token = await bearerToken({ consumer_key, consumer_secret });
      } catch (e) {
        console.error(
          `Could not generate a Bearer token. Please check that your credentials are correct and that the Filtered Stream preview is enabled in your Labs dashboard. (${e})`
        );
        process.exit(-1);
      }

      try {
        // Gets the complete list of rules currently applied to the stream
        currentRules = await getAllRules(token);

        // // Delete all rules. Comment this line if you want to keep your existing rules.
        await deleteAllRules(currentRules, token);

        // // Add rules to the stream. Comment this line if you want to keep your existing rules.
        await setRules(token, this.state.rules);
      } catch (e) {
        console.error(e);
        // process.exit(-1);
      }

      // Listen to the stream.
      // This reconnection logic will attempt to reconnect when a disconnection is detected.
      // To avoid rate limites, this logic implements exponential backoff, so the wait time
      // will increase if the client cannot reconnect to the stream.

      const connect = () => {
        this.setState({ connecting: false });
        this.setState({ goLiveStatus: true });
        try {
          stream = this.streamConnect(token, "on", this.state.stream);

          stream.on("timeout", async () => {
            // Reconnect on error
            console.warn("A connection error occurred. Reconnecting…");
            timeout++;
            stream.abort();
            await sleep(2 ** timeout * 1000);
            connect();
            // stream.abort();
          });
        } catch (e) {
          connect();
        }
      };

      connect();
    })();
  };
  //************************************************************ handle Stop live */
  // handleStopLive = e => {
  //   e.preventDefault();
  //   const connect = () => {};

  //   this.setState({ cors2: "" });
  // };
  handleStopLive = () => {
    this.setState({ goLiveStatus: false });
    this.setState({ connecting: false });
    console.log(this.state.stream);
    const stopStream = this.state.stream;
    stopStream.abort();
    // this.streamConnect(process.env.REACT_APP_BEARER_TOKEN, "stop");
  };
  handleChange = e => {
    this.setState({ rules: { value: e.target.value } });
    console.log(this.state.rules.value);
  };
  handleEdit = () => {
    this.setState({ inpStatus: false });
  };
  render() {
    return (
      <div>
        <div className="row mt-5">
          <div className="col-9 border p-3 ">
            <div className="row p-2 justify-content-between align-items-center">
              {/* <TwitterTweetEmbed tweetId="1307675968312664065" /> */}
              <div className="row m-0">
                <h2 className="mr-3">Live</h2>
                {!this.state.goLiveStatus && this.state.connecting && (
                  <div className="">
                    <Spinner
                      animation="grow"
                      variant="success"
                      className="mr-2"
                    />
                    <span>Connecting... </span>
                  </div>
                )}
                {this.state.goLiveStatus && !this.state.connecting && (
                  <i className="fas fa-2x fa-fw fa-blog c-green"></i>
                )}
              </div>
              <div>
                {this.state.goLiveStatus && !this.state.connecting && (
                  <Button
                    type="submit"
                    className="bg-red"
                    onClick={this.handleStopLive}
                  >
                    Stop Live
                  </Button>
                )}
              </div>

              {/* <i class="fab fa-blog c-green"></i> */}
            </div>
            <div className="row px-2">
              {/* //Design  */}
              {/* <div className=" col-lg-12 mb-2 p-2 justify-content-between box-live">
                <div className="mb-5 text22 ft500">
                  kqsghsgfh shjqskdjqgskd dqsjdbkqsbgdkjqsgd kqsghsgfh
                  shjqskdjqgskd dqsjdbkqsbgdkjqsgd kqsghsgfh shjqskdjqgskd
                  dqsjdbkqsbgdkjqsgd
                </div>
                <a
                  href=""
                  className="abs-btn  c-white p-2 b-twitter rounded btn-more"
                >
                  Show
                </a>
              </div> */}
              {/* end design */}

              {this.state.tweet.reverse().map((tw, i) => (
                <div
                  className=" col-lg-12 mb-2 p-2 justify-content-between box-live"
                  // style={{ position: "relative" }}
                  // style={{ height: "350px" }}
                  key={i}
                >
                  <div className="mb-5 text-30 ft500">{tw.text}</div>
                  <a
                    href=""
                    className="abs-btn  c-white p-2 b-twitter rounded btn-more"
                  >
                    Show
                  </a>
                </div>
              ))}
              {/* <TwitterTweetEmbed tweetId={tw} /> */}
            </div>
          </div>
          <div className="col-3 border p-2">
            <h2>Setting</h2>
            <InputGroup>
              <FormControl
                onChange={this.handleChange}
                value={this.state.rules.value}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                disabled={this.state.inpStatus}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.handleEdit}>
                  Edit
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={this.handleStartLive}
                >
                  Live
                </Button>
              </InputGroup.Append>
            </InputGroup>

            {/* <button type="submit" onClick={this.handleStopLive}>
              Stop
            </button>
            <button type="submit" onClick={this.handleStartLive}>
              Start
            </button> */}
          </div>
        </div>
      </div>
    );
  }
}

// <div key={tw.id} className="col-md-4 mt-4">
//   {/* <TwitterTweetEmbed tweetId={tw} /> */}
//   <h3>{tw.id}</h3>
//   <h3>{tw.text}</h3>
//   <a href="" className="btn-more b-twitter">
//     Show
//   </a>
// </div>
