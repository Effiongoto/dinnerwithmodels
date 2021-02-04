import React from "react";
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

const App = () => {
  return (
    <Router>
      <Header />
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
