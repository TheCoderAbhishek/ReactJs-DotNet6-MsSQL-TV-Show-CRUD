
import { Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";

function ListTvShow() {

    const [tvShows, setTvShows] = useState([]);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [itemToDeleteId, setItemToDeleteId] = useState(0);
 
  useEffect(() => {
    axios.get("https://localhost:44311/TvShows/GetListTvShows").then((response) => {
        setTvShows((data) => {
        return response.data;
      });
    });
  }, []);

  function confirmDeleteHandler() {
    axios
      .delete(`https://localhost:44311/TvShows/DeleteTvShow/${itemToDeleteId}`)
      .then((response) => {
        setShowModal(false);
        setTvShows((existingData) => {
          return existingData.filter((_) => _.id !== itemToDeleteId);
        });
        setItemToDeleteId(0);
      });
  }
 
  function showConfirmDeleteHandler(id) {
    setShowModal(true);
    setItemToDeleteId(id);
  }
 
  function hideConfirmDeleteHandler() {
    setShowModal(false);
 
    setItemToDeleteId(0);
  }

    return (
    <>
    <DeleteConfirmation
        showModal={showModal}
        title="Delete Confirmation"
        body="Are you want delete this itme?"
        confirmDeleteHandler={confirmDeleteHandler}
        hideConfirmDeleteHandler={hideConfirmDeleteHandler}
      ></DeleteConfirmation>

    <Row className="mt-2">
        <Col md={{ span: 4, offset: 5 }}>
          <Button
            variant="dark"
            type="button"
            onClick={() => navigate("/add-tvshow")}
          >
            Add A TV Show
          </Button>
        </Col>
      </Row>
    <Row md={3} className="g-4 mt-1">
        {tvShows.map((sv) => {
          return (
            <Col key={sv.id}>
              <Card>
                <Card.Img variant="top" src={sv.coverImageUrl} />
                <Card.Body>
                  <Card.Title>{sv.showTitle}</Card.Title>
                  <Card.Text>
                    <b>Genre: </b>
                    {sv.genre}
                  </Card.Text>
                  <Card.Text>
                    <b>Release Year: </b>
                    {sv.releaseYear}
                  </Card.Text>
                  <Card.Text>
                    <b>Description: </b>
                    {sv.description}
                  </Card.Text>
                  <Button variant="dark" onClick={() => navigate(`/update-tvshow/${sv.id}`)} >
                    Update
                  </Button>{' '}
                  <Button type="button" variant="danger" onClick={() => showConfirmDeleteHandler(sv.id)} >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
    );
  }

  export default ListTvShow;

