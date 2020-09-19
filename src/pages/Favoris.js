import React, { useState, useEffect } from "react";
import { getFavoris, delFavorie } from "./FavorisFunctions";
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
import { Card, Media, Modal, Button, Alert } from "react-bootstrap";

const Favoris = () => {
  const [favoris, setFavoris] = useState([]);
  const [status, setStatus] = useState(false);
  const [alert, setAlert] = useState({ msg: "", status: false });
  const [show, setShow] = useState(false);
  const [render, setRender] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = idStr => {
    setIdStr(idStr);
    // console.log("idstr: " + idStr);
    setShow(true);
  };
  const [idStr, setIdStr] = useState("");

  //   did Mount
  useEffect(() => {
    getFavoris().then(res => {
      if (res && res.status == 200) {
        setFavoris(res.data.user.favoris);
        console.log(res.data);
      } else if (res && res.status == 401) {
        localStorage.removeItem("usertoken");
        this.props.history.push("/signin");
      }
    });
  }, [render]);

  const handleDelete = id => {
    delFavorie(id).then(res => {
      if (res && res.status == 200) {
        setAlert({ msg: "Tweet deleted", status: true });
        setRender(!render);
        setTimeout(() => {
          setAlert({ status: false });
        }, 3000);
      }
    });
  };

  return (
    <>
      <div className="box rounded p-2">
        <h1>Favories</h1>
        <p>Enjoy your favories</p>
        {alert.status && (
          <div className="alertFav">
            <Alert className="" variant="success">
              {alert.msg}
            </Alert>
          </div>
        )}
      </div>
      <div className="row m-0 ">
        {favoris.map((item, i) => (
          <Card
            key={i}
            className="p-2 my-col mb-3 justify-content-between"
            style={{ height: "350px" }}
          >
            <div>
              {/* <Alert variant="danger">"{error.Msg}"</Alert> */}
              <Media className="align-items-center">
                <img
                  width={60}
                  height={60}
                  className="mr-2 rounded-pill"
                  src={item.avatar}
                  alt="Generic placeholder"
                />

                <Media.Body>
                  {/* <div className="text15 bold">
                  {item.name.substring(0, 20) +
                    (item.name.length > 20 ? "..." : "")}
                </div> */}
                  <div className="text15 bold">{item.name}</div>
                  {/* <div className="text15 c-gray">
                  @
                  {item.user.screen_name.substring(0, 20) +
                    (item.user.screen_name.length > 20 ? "..." : "")}
                </div> */}
                </Media.Body>
              </Media>

              <div className="py-2 px-1">
                {/* {item.entities.media ? (
                <>
                  <div className="text19 ft-400 mb-3">
                    {item.text.substring(0, 20)}...
                  </div>
                  <img
                    width="200px"
                    height="150px"
                    className="mr-2 box-rounded"
                    src={item.entities.media[0].media_url}
                    alt="Generic placeholder"
                  />
                </>
              ) : ( */}
                <div className="text19 ft-400 my-3">{item.text}</div>
                {/* )} */}
              </div>
            </div>
            <div className="row justify-content-center  pr-3 py-2 align-items-center">
              <div className="error-alert">
                <a
                  onClick={() => handleShow(item.twitterID)}
                  className="c-white p-2 b-twitter rounded btn-more mr-3"
                >
                  More
                </a>
              </div>
              <div className="error-alert">
                <a
                  onClick={() => handleDelete(item.id)}
                  className="c-white p-2  rounded btn-more bg-red"
                >
                  Delete
                </a>
              </div>
            </div>
          </Card>
          // <TwitterTweetEmbed
          //   key={i}
          //   tweetId={item.twitterID}
          //   placeholder="Loading"
          // />
        ))}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Tweet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="centerContent">
              <div className="selfCenter">
                <TwitterTweetEmbed
                  tweetId={idStr}
                  placeholder="Loading Tweet, Please wait"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="row justif-content-center">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Favoris;
