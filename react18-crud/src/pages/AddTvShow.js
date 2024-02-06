import { useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTvShow() {
  const showTitle = useRef(null);
  const genre = useRef(null);
  const releaseYear = useRef(null);
  const description = useRef(null);
  const coverImageUrl = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    showTitle.current.value = "";
    genre.current.value = "";
    releaseYear.current.value = "";
    description.current.value = "";
    coverImageUrl.current.value = "";
  }, []);

  function generateYears() {
    const currentYear = new Date().getFullYear();
    const startYear = 1950;
    const yearsArray = [];

    for (let year = startYear; year <= currentYear; year++) {
      yearsArray.push(year);
    }

    return yearsArray;
  }

  const years = generateYears();

  function addTvShowHandler() {
    var payload = {
      showTitle: showTitle.current.value,
      genre: genre.current.value,
      releaseYear: releaseYear.current.value,
      description: description.current.value,
      coverImageUrl: coverImageUrl.current.value,
    };

    axios
      .post("https://localhost:44311/TvShows/AddTvShow", payload)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding TV show:", error);
        // Handle error (e.g., show a message to the user)
      });
  }

  return (
    <>
      <legend>Add A New TV Show</legend>
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
          <Form.Select ref={releaseYear} defaultValue="">
            <option value="" disabled>
              Select Release Year
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Select>
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
      <Button variant="dark" type="button" onClick={addTvShowHandler}>
        Submit
      </Button>
    </>
  );
}

export default AddTvShow;
