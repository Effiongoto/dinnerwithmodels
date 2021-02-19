import React, { useEffect, useState } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ButtonGroup,
  Button,
  Carousel,
  Image,
  Form,
} from "react-bootstrap";
import Model from "../components/Model";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { listModels } from "../actions/modelActions";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Link } from "react-router-dom";
import { listCarousels } from "../actions/carouselActions";

const HomeScreen = ({ match, history }) => {
  const [filter, setFilter] = useState({
    country: "",
    state: "",
    city: "",
  });

  const keyword = match.params.keyword;
  const gender = match.params.gender;
  const verified = "true";
  const heading =
    gender === "male"
      ? "Male Models"
      : gender === "female"
      ? "Female Models"
      : "All Models";

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const modelList = useSelector((state) => state.modelList);
  const { loading, error, models, page, pages } = modelList;

  const [filterStatus, setFilterStatus] = useState(false);
  const [modelsList, setModelsList] = useState([]);

  const carousel = {
    signup: {
      image: "/images/2.jpg",
      text: (
        <Link to="/register/model" className="btn btn-success">
          Sign up as a model
        </Link>
      ),
    },
    maleModelOfTheDay: undefined,
    femaleModelOfTheDay: undefined,
  };

  if (models.length !== 0) {
    const highestRatedMaleModels = [
      ...models.filter(
        (model) =>
          model.gender === "male" &&
          model.rating ===
            Math.max(
              ...models
                .filter((model) => model.gender === "male")
                .map((model) => model.rating)
            )
      ),
    ];

    const highestRatedFemaleModels = [
      ...models.filter(
        (model) =>
          model.gender === "female" &&
          model.rating ===
            Math.max(
              ...models
                .filter((model) => model.gender === "female")
                .map((model) => model.rating)
            )
      ),
    ];

    const maleModelOfTheDay =
      highestRatedMaleModels[
        Math.floor(Math.random() * highestRatedMaleModels.length)
      ];
    const femaleModelOfTheDay =
      highestRatedFemaleModels[
        Math.floor(Math.random() * highestRatedFemaleModels.length)
      ];
    if (maleModelOfTheDay !== undefined) {
      carousel.maleModelOfTheDay = {
        image: maleModelOfTheDay.profileImage,
        text: (
          <Link to={`/model/${maleModelOfTheDay._id}`}>
            Male model of the day: {maleModelOfTheDay.username}
          </Link>
        ),
      };
    }
    if (femaleModelOfTheDay !== undefined) {
      carousel.femaleModelOfTheDay = {
        image: femaleModelOfTheDay.profileImage,
        text: (
          <Link to={`/model/${femaleModelOfTheDay._id}`}>
            Female model of the day: {femaleModelOfTheDay.username}
          </Link>
        ),
      };
    }
  }

  const carouselList = useSelector((state) => state.carouselList);
  const { carousels } = carouselList;
  const adminCarousels = {};
  if (carousels && carousels.length !== 0) {
    for (let i = 0; i < carousels.length; i++) {
      adminCarousels[carousels[i].name] = {
        image: carousels[i].image,
        text: carousels[i].text,
      };
    }
    Object.assign(carousel, adminCarousels);
  }

  const countryFilter = (value) => {
    setFilter({ ...filter, country: value });
    setModelsList([...models.filter((models) => models.country === value)]);
    setFilterStatus(true);
  };

  const stateFilter = (value) => {
    setFilter({ ...filter, state: value });
    setModelsList([...models.filter((models) => models.state === value)]);
    setFilterStatus(true);
  };

  const cityFilter = (event) => {
    const { name, value } = event.target;
    setFilter((prevValues) => {
      return { ...prevValues, [name]: value.toLowerCase() };
    });
    setModelsList([
      ...models.filter((models) =>
        models.city.toLowerCase().includes(value.toLowerCase())
      ),
    ]);
    setFilterStatus(true);
  };

  const resetFilter = () => {
    setFilter({
      country: "",
      state: "",
      city: "",
    });
    setFilterStatus(false);
  };

  const buttonHandler = (evt) => {
    // setHeading(evt.target.value);
    if (evt.target.value === "Female Models") {
      history.push("/gender/female");
    } else if (evt.target.value === "Male Models") {
      history.push("/gender/male");
    } else {
      history.push(`/`);
    }
  };

  useEffect(() => {
    dispatch(listModels(keyword, gender, verified, pageNumber));
    dispatch(listCarousels());
    setFilterStatus(false);
  }, [dispatch, keyword, gender, pageNumber]);

  return (
    <>
      <Carousel interval={3000} className="home-carousel">
        {Object.keys(carousel)
          .filter((item) => carousel[item] !== undefined)
          .map((item, index) => (
            <Carousel.Item key={index}>
              {carousel[item].image && (
                <Image
                  src={carousel[item].image}
                  className="d-block w-100"
                  alt="carousel image"
                />
              )}
              <Carousel.Caption>
                <h4>{carousel[item].text}</h4>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
      <ButtonGroup size="sm" className="justify-content-md-center">
        <Button onClick={buttonHandler} value="All Models">
          All Models
        </Button>
        <Button onClick={buttonHandler} value="Male Models">
          Male Models
        </Button>
        <Button onClick={buttonHandler} value="Female Models">
          Female Models
        </Button>
      </ButtonGroup>
      {gender && (
        <div>
          <br />

          <Form>
            <Form.Row>
              <Form.Group as={Col} md="2" controlId="country">
                <Form.Control
                  as={CountryDropdown}
                  type="text"
                  priorityOptions={["NG"]}
                  placeholder="Select Country"
                  name="country"
                  value={filter.country}
                  onChange={(country) => countryFilter(country)}
                />
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="state">
                <Form.Control
                  as={RegionDropdown}
                  country={filter.country}
                  type="text"
                  defaultOptionLabel={"Select state"}
                  name="state"
                  value={filter.state}
                  onChange={(state) => stateFilter(state)}
                />
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="city">
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={filter.city}
                  onChange={cityFilter}
                />
              </Form.Group>
            </Form.Row>
          </Form>
          <Button onClick={resetFilter}>
            <i className="fas fa-undo" style={{ color: "white" }}></i>
          </Button>
        </div>
      )}
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Col md={9}>
              <h1 style={{ fontFamily: "Imbue" }}>{heading}</h1>
              {!filterStatus ? (
                models && models.length !== 0 ? (
                  <Row>
                    {models.map((model) => (
                      <Col key={model._id} sm={12} md={6} lg={4} xl={4}>
                        <Model model={model} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <h1 style={{ fontFamily: "Imbue" }}>No models found :(</h1>
                )
              ) : modelsList && modelsList.length !== 0 ? (
                <Row>
                  {modelsList.map((model) => (
                    <Col key={model._id} sm={12} md={6} lg={4} xl={4}>
                      <Model model={model} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <h1 style={{ fontFamily: "Imbue" }}>No models found :(</h1>
              )}
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
            </Col>
            <Col md={3}>
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="dinnerwithmodel"
                options={{ height: 600 }}
              />
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default HomeScreen;
