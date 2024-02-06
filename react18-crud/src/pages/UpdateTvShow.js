import { useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateTvShow() {
  const showTitle = useRef(null);
  const genre = useRef(null);
  const releaseYear = useRef(null);
  const description = useRef(null);
  const coverImageUrl = useRef(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://localhost:44311/TvShows/GetSingleTvShow/${id}`).then((response) => {
      showTitle.current.value = response.data.showTitle;
      genre.current.value = response.data.genre;
      releaseYear.current.value = response.data.releaseYear;
      description.current.value = response.data.description;
      coverImageUrl.current.value = response.data.coverImageUrl;
    });
  }, [id]);

  function updateTvShowHandler() {
    var payload = {
      showTitle: showTitle.current.value,
      genre: genre.current.value,
      releaseYear: releaseYear.current.value,
      description: description.current.value,
      coverImageUrl: coverImageUrl.current.value,
      id: id,
    };
    axios.put(`https://localhost:44311/TvShows/UpdateTvShow`, payload).then((response) => {
      navigate("/");
    });
  }

  return (
    <>
      <legend>Update TV Show</legend>
      <form>
        <Form.Group className="mb-3" controlId="formShowTitle">
          <Form.Label>TV Show Label</Form.Label>
          <Form.Control type="text" ref={showTitle} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" ref={genre} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formReleaseYear">
          <Form.Label>Release Year</Form.Label>
          <Form.Control type="text" ref={releaseYear} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} ref={description} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImgUrl">
          <Form.Label>Poster URL</Form.Label>
          <Form.Control type="text" ref={coverImageUrl} />
        </Form.Group>
      </form>
      <Button variant="primary" type="button" onClick={updateTvShowHandler}>
        Submit
      </Button>
    </>
  );
}

export default UpdateTvShow;
