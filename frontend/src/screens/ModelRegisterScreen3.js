import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { updateModelProfile } from "../actions/modelActions";
import {
  MODEL_UPDATE_PROFILE_RESET,
  MODEL_DETAILS_RESET,
} from "../constants/modelConstants";

const RegisterScreen2 = ({ location, history }) => {
  const modelLogin = useSelector((state) => state.modelLogin);
  const { modelInfo } = modelLogin;

  const modelUpdateProfile = useSelector((state) => state.modelUpdateProfile);
  const { loading, success, error } = modelUpdateProfile;

  const [upload, setUpload] = useState({
    id: modelInfo._id,
    profileImage: "",
    verificationImage: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    privateImage1: "",
    privateImage2: "",
  });

  const newModel = {
    images: [
      upload.image1,
      upload.image2,
      upload.image3,
      upload.image4,
      upload.image5,
    ],
    privateImages: [upload.privateImage1, upload.privateImage2],
    profileImage: upload.profileImage,
    verificationImage: upload.verificationImage,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch({ type: MODEL_UPDATE_PROFILE_RESET });
      dispatch({ type: MODEL_DETAILS_RESET });
      history.push("/model/profile");
    }
  }, [history, success, dispatch]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setUpload({
        ...upload,
        [e.target.name]: data,
      });
      console.log(upload);
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateModelProfile(newModel));
    // history.push('/');
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <h1>Step 3: Image uploads</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="image">
              <Form.Label>Profile picture</Form.Label>
              <Form.Control
                type="text"
                value={upload.profileImage}
              ></Form.Control>
              <Form.File
                name="profileImage"
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              <Form.Text className="text-muted">
                Note: This is the picture that will be displayed in the home
                page
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Full picture of you standing</Form.Label>
              <Form.Control type="text" value={upload.image1}></Form.Control>
              <Form.File
                id="image-file"
                name="image1"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Full picture of you wearing clothes</Form.Label>
              <Form.Control type="text" value={upload.image2}></Form.Control>
              <Form.File
                id="image-file"
                name="image2"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Full picture of you shirtless</Form.Label>
              <Form.Control type="text" value={upload.image3}></Form.Control>
              <Form.File
                name="image3"
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Random sexy pictures of you </Form.Label>
              <Form.Control type="text" value={upload.image4}></Form.Control>
              <Form.File
                id="image-file"
                name="image4"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Another random sexy pictures of you </Form.Label>
              <Form.Control type="text" value={upload.image5}></Form.Control>
              <Form.File
                id="image-file"
                name="image5"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Nude/semi nude picture of you 1</Form.Label>
              <Form.Control
                type="text"
                value={upload.privateImage1}
              ></Form.Control>
              <Form.File
                id="image-file"
                name="privateImage1"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              <Form.Text className="text-muted">
                Note: Don’t use fake nudes, we would catch you!
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Nude/semi nude picture of you 2</Form.Label>
              <Form.Control
                type="text"
                value={upload.privateImage2}
              ></Form.Control>
              <Form.File
                id="image-file"
                name="privateImage2"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              <Form.Text className="text-muted">
                Note: Don’t use fake nudes, we would catch you!
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Verified picture of you </Form.Label>
              <Form.Control
                type="text"
                value={upload.verificationImage}
              ></Form.Control>
              <Form.File
                id="image-file"
                name="verificationImage"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              <Form.Text className="text-muted">
                write dinner with models on a paper and Take a selfie with it.
                It would not be shared
              </Form.Text>
            </Form.Group>

            <Button type="submit" variant="primary">
              Register
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default RegisterScreen2;
