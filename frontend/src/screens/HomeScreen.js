import React, { useEffect, useState } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import Model from "../components/Model";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { listModels } from "../actions/modelActions";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

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

  useEffect(() => {
    dispatch(listModels(keyword, gender, verified, pageNumber));
    setFilterStatus(false);
  }, [dispatch, keyword, gender, pageNumber]);

  const countryFilter = (value) => {
    setFilter({ ...filter, country: value });
    setModelsList([...models.filter((models) => models.country === value)]);
    setFilterStatus(true);
  };

  const stateFilter = (value) => {
    setFilter({ ...filter, state: value });
    setModelsList([...modelsList.filter((models) => models.state === value)]);
    setFilterStatus(true);
  };

  const cityFilter = (event) => {
    const { name, value } = event.target;
    setFilter((prevValues) => {
      return { ...prevValues, [name]: value };
    });
    setModelsList([
      ...models.filter((models) => models.city.toLowerCase().includes(value)),
    ]);
    setFilterStatus(true);
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
  return (
    <>
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
          <ButtonGroup size="sm" className="justify-content-md-center">
            <Button
              size="sm-4"
              as={CountryDropdown}
              priorityOptions={["NG"]}
              onChange={(country) => countryFilter(country)}
            >
              Country
            </Button>
            <Button
              as={RegionDropdown}
              country={filter.country}
              onChange={(state) => stateFilter(state)}
            >
              State
            </Button>
            <input
              name="city"
              type="text"
              placeholder="City"
              onChange={cityFilter}
            />
            <Button onClick={() => setFilterStatus(false)}>
              <i className="fas fa-undo" style={{ color: "white" }}></i>
            </Button>
          </ButtonGroup>
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
                      <Col key={model._id} sm={12} md={6} lg={4} xl={3}>
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
                    <Col key={model._id} sm={12} md={6} lg={4} xl={3}>
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
                screenName="saurabhnemade"
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
