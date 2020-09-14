import React from "react";
import { Media, Card, Row, Col } from "react-bootstrap";

const SingleTweetSlim = () => {
  return (
    <>
      <Card className="box-rounded p-2" style={{}}>
        <Media className="align-items-center">
          <img
            width={60}
            height={60}
            className="mr-2 rounded-pill"
            src="https://picsum.photos/200/300"
            alt="Generic placeholder"
          />
          <Media.Body>
            <div className="text15 bold">Name</div>
            <div className="text15 c-gray">@userName</div>
          </Media.Body>
        </Media>

        <div className="py-2 px-1">
          <div className="text19 ft-400 mb-3">
            Some quick example text to build on the card title
          </div>
          {/* <img
            width="100%"
            height="200px"
            className="mr-2 box-rounded"
            src="https://picsum.photos/200/300"
            alt="Generic placeholder"
          /> */}
        </div>
        <div className="c-gray ft-400 mb-3">6:13 AM · Jan 11, 2019</div>
        <Row>
          <Col md={{ span: 5, offset: 8 }} className="m-2">
            <a className="c-white p-2 b-twitter rounded btn-more mb-5">More</a>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default SingleTweetSlim;
