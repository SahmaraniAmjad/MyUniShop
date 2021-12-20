import React, { useState } from 'react';
import { Nav, Col, Row, Container, Card, Button } from "react-bootstrap";
import { MDBIcon } from "mdbreact";
import MyPosts from "./MyPosts";
import ChatHistory from "./MyChatHistory";

const VIEWS = {
  MY_POSTS: "My Posts",
  DASHBOARD: "dashboard",
  MY_PROFILE: "My profile",
  MY_INBOX: "Inbox"
}

const Sidebar = () => {
  const [view, setView] = useState(VIEWS.DASHBOARD);
  const renderMyComponent = (viewName) => {
    setView(viewName);
  }
  return (
    <div className="sidenav">
      <Row className="dashboard">
        <Col xs={12} md={2}>
          <Nav defaultActiveKey="/dashboard" className="">
            <hr />
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <hr></hr>
            <Nav.Link onClick={() => renderMyComponent(VIEWS.MY_POSTS)}>My Posts</Nav.Link>
            <hr></hr>
            <Nav.Link eventKey="link-2">My profile</Nav.Link>
            <hr></hr>
            <Nav.Link eventKey="link-2">FAQ</Nav.Link>
            <hr></hr>
            <Nav.Link onClick={() => renderMyComponent(VIEWS.MY_INBOX)}> Inbox </Nav.Link>
            <hr></hr>
            <Nav.Link eventKey="disabled" disabled> Disabled </Nav.Link>
            <hr className="hr-divider visible-xs visible-sm visible-md hidden-lg"></hr>
          </Nav>
        </Col>

        {
          (view === VIEWS.DASHBOARD) && (
            <>
              <Col xs={12} md={5}>
                <Container>
                  <Card className='my-2'>
                    <Card.Header className="header"><MDBIcon icon="align-justify" /> My Posts</Card.Header>
                    <Card.Body>
                      <Card.Text>In few clicks, you can manage your posts, see their status and edit them.</Card.Text>
                      <Button className="button" onClick={() => renderMyComponent(VIEWS.MY_POSTS)}> Manage My Posts</Button>
                    </Card.Body>
                  </Card>
                  <Card className='my-2'>
                    <Card.Header className="header"> <MDBIcon icon="heart" /> My favorites</Card.Header>
                    <Card.Body>
                      <Card.Text> Save your favorites posts and sellers - here you can find a list of your favorite posts that you have saved </Card.Text>
                      <Button className="button"> My Favorites </Button>
                    </Card.Body>
                  </Card>
                </Container>
              </Col>
              <Col className="">
                <Container>
                  <Card className='my-2'>
                    <Card.Header> <MDBIcon icon="user-alt" /> My Profile</Card.Header>
                    <Card.Body>
                      <Card.Text>Here you can mangae and edit your personal data (add your name, change your password and many more things)</Card.Text>
                      <Button className="button"> Edit My Profile </Button>
                    </Card.Body>
                  </Card>
                  <Card className='my-2'>
                    <Card.Header> <MDBIcon icon="info-circle" /> FAQ </Card.Header>
                    <Card.Body>
                      <Card.Text>Here you can find most of the answers about your questions.</Card.Text>
                      <Button className="button"> To The FAQ </Button>
                    </Card.Body>
                  </Card>
                </Container>


              </Col>
            </>
          )
        }
        {
          (view === VIEWS.MY_POSTS) && (
            <Col>
              <Container>
                <MyPosts />
              </Container>
            </Col>
          )
        }
        {
          (view === VIEWS.MY_INBOX) && (
            <Col>
              <Container>
                <ChatHistory/>
              </Container>
            </Col>
          )
        }
      </Row>
    </div>
  )
}

export default Sidebar
