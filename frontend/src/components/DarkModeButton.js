import React from "react";
import { Form } from "react-bootstrap";

const DarkModeButton = ({ mode }) => {
  const toggleButton = () => {
    let theme;
    if (mode === "light") {
      document.body.classList.toggle("light-theme");
      document.body.classList.toggle("dark-theme");
      theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";
    } else {
      document.body.classList.toggle("dark-theme");
      document.body.classList.toggle("light-theme");
      theme = document.body.classList.contains("light-theme")
        ? "dark"
        : "light";
    }
    document.cookie = `theme=${theme}`;
  };
  return (
    <div className="dark-btn">
      <Form.Text>Switch Color Modes</Form.Text>
      <Form.Label className="switch">
        <Form.Control type="checkbox" onClick={toggleButton} />
        <span className="slider round"></span>
      </Form.Label>
    </div>
  );
};

export default DarkModeButton;
