import React, { useState } from "react";
import { Card, Button, Row, Col, Image, Media, Modal } from "react-bootstrap";
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

const SingleTweetMedia = props => {
  const { tweet } = props;
  // console.log(tweet);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card
        className="box-rounded p-2 justify-content-between "
        style={{ height: "350px" }}
      >
        <div>
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
            <span className="c-gray ft-400 mb-3">6:14 PM</span>
          </div>
          <div className="">
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
