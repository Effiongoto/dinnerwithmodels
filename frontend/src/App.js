import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ModelScreen from "./screens/ModelScreen";
import LoginScreen from "./screens/LoginScreen";
import ModelLoginScreen from "./screens/ModelLoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ModelRegisterScreen from "./screens/ModelRegisterScreen";
import ModelRegisterScreen3 from "./screens/ModelRegisterScreen3";
import ProfileScreen from "./screens/ProfileScreen";
import ModelProfileScreen from "./screens/ModelProfileScreen";
import SubscriptionScreen from "./screens/SubscriptionScreen";
import PaymentScreen from "./screens/PaymentScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ModelListScreen from "./screens/ModelListScreen";
import ModelAdminScreen from "./screens/ModelAdminScreen";
import ModelEditScreen from "./screens/ModelEditScreen";
import ModelEditProfileScreen from "./screens/ModelEditProfileScreen";
import ModelEditImagesScreen from "./screens/ModelEditImagesScreen";
import AddPlanScreen from "./screens/AddPlanScreen";
import PlanListScreen from "./screens/PlanListScreen";
import PlanEditScreen from "./screens/PlanEditScreen";
import VerifyTransactionScreen from "./screens/VerifyTransactionScreen";
import CarouselListScreen from "./screens/CarouselListScreen";
import AddCarouselScrren from "./screens/AddCarouselScreen";
import CarouselEditScreen from "./screens/CarouselEditScreen";

const App = () => {
  const getCookie = (name) => {
    const theme = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(theme) === 0) {
        return cookie.substring(theme.length, cookie.length);
      }
    }
    return "";
  };

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const currentTheme = getCookie("theme");
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (currentTheme === "light") {
      document.body.classList.toggle("light-theme");
      setTheme("dark");
    } else if (currentTheme === "dark") {
      document.body.classList.toggle("dark-theme");
      setTheme("light");
    } else if (prefersDarkScheme.matches) {
      document.body.classList.toggle("dark-theme");
      setTheme("light");
    } else {
      document.body.classList.toggle("dark-theme");
      setTheme("light");
    }
  }, []);

  return (
    <Router>
      <Header mode={theme} />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/pay/:id" component={PaymentScreen} exact />
          <Route path="/subscribe" component={SubscriptionScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/login/model" component={ModelLoginScreen} exact />
          <Route path="/register/model" component={ModelRegisterScreen} exact />
          <Route
            path="/register/model/3"
            component={ModelRegisterScreen3}
            exact
          />
          <Route path="/profile/model" component={ModelProfileScreen} exact />
          <Route
            path="/profile/model/edit"
            component={ModelEditProfileScreen}
            exact
          />
          <Route
            path="/profile/model/image"
            component={ModelEditImagesScreen}
            exact
          />
          <Route path="/model/:id" component={ModelScreen} exact />
          <Route path="/admin/plans" component={PlanListScreen} exact />
          <Route path="/admin/plans/add" component={AddPlanScreen} exact />
          <Route
            path="/admin/plans/:id/edit"
            component={PlanEditScreen}
            exact
          />
          <Route path="/admin/carousel" component={CarouselListScreen} exact />
          <Route
            path="/admin/carousel/add"
            component={AddCarouselScrren}
            exact
          />
          <Route
            path="/admin/carousel/:id/edit"
            component={CarouselEditScreen}
            exact
          />
          <Route
            path="/admin/verifyTransaction"
            component={VerifyTransactionScreen}
            exact
          />
          <Route path="/admin/userlist" component={UserListScreen} exact />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/modellist" component={ModelListScreen} exact />
          <Route path="/admin/model/:id" component={ModelAdminScreen} exact />
          <Route
            path="/admin/modellist/:pageNumber"
            component={ModelListScreen}
            exact
          />
          <Route path="/admin/model/:id/edit" component={ModelEditScreen} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route
            path="/gender/:gender/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/gender/:gender" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
