import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Image,
  Media,
  Modal,
  Alert
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
import { Link } from "react-router-dom";
import { addFavorie, getFavoris } from "../pages/FavorisFunctions";

const SingleTweetMedia = props => {
  // console.log(props);
  const { tweet } = props;
  // console.log(tweet);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [favoris, setFavoris] = useState([]);

  const [showError, setShowError] = useState(false);
  // useEffect(() => {
  //   // console.log("test");
  //   getFavoris().then(res => {
  //     setFavoris(res.data.user.favoris);
  //   });
  // }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddFav = (id_str, name, profile_image_url, text) => {
    addFavorie({
      twitterID: id_str,
      name: name,
      avatar: profile_image_url,
      text: text
    }).then(res => {
      if (res.status == 200) {
        setErrors({});
        setErrors({ Msg: "Tweet Added", color: "success" });
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      } else if (res && res.status == 403) {
        setErrors({ Msg: "Tweet already exist", color: "danger" });
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    });
    // console.log(id_str);
  };

  return (
    <>
      <Card
        className="box-rounded p-2 justify-content-between "
        style={{ height: "350px" }}
      >
        <div>
          {/* <Alert variant="danger">"{error.Msg}"</Alert> */}
          <Media className="align-items-center">
            <img
              width={60}
              height={60}
              className="mr-2 rounded-pill"
              src={tweet.user.profile_image_url}
              alt="Generic placeholder"
            />

            <Media.Body>
              <div className="text15 bold">
                {tweet.user.name.substring(0, 20) +
                  (tweet.user.name.length > 20 ? "..." : "")}
              </div>
              <div className="text15 c-gray">
                @
                {tweet.user.screen_name.substring(0, 20) +
                  (tweet.user.screen_name.length > 20 ? "..." : "")}
              </div>
            </Media.Body>
          </Media>

          <div className="py-2 px-1">
            {tweet.entities.media ? (
              <>
                <div className="text19 ft-400 mb-3">
                  {tweet.text.substring(0, 20)}...
                </div>
                <img
                  width="200px"
                  height="150px"
                  className="mr-2 box-rounded"
                  src={tweet.entities.media[0].media_url}
                  alt="Generic placeholder"
                />
              </>
            ) : (
              <div className="text19 ft-400 my-3">
                {tweet.text.substring(0, 100) +
                  (tweet.text.length > 100 ? "..." : "")}
              </div>
            )}
          </div>
        </div>
        <div className="row justify-content-between  pr-3 py-2 align-items-center">
          <div className="col-6">
            <span className="c-gray ft-400 mb-3">
              {tweet.created_at.substring(0, 10)}
            </span>
          </div>
          <div className="error-alert">
            <div className="e-alert-alert">
              {showError && <Alert variant={errors.color}>{errors.Msg}</Alert>}
            </div>

            <a
              onClick={() =>
                handleAddFav(
                  tweet.id_str,
                  tweet.user.name,
                  tweet.user.profile_image_url,
                  tweet.text
                )
              }
              // to={`/favoris/${tweet.id_str}`}
              className="c-white p-2 b-twitter rounded btn-more  bg-red mr-2 "
            >
              <i className="fa fa fa-fw fa-heart text-white "></i>
            </a>
            <a
              onClick={handleShow}
              className="c-white p-2 b-twitter rounded btn-more"
            >
              More
            </a>
          </div>
        </div>
      </Card>

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
              <TwitterTweetEmbed tweetId={tweet.id_str} placeholder="Loading" />
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
    </>
  );
};

export default SingleTweetMedia;
