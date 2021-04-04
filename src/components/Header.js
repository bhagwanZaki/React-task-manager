import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ onAdd, showAdd }) => {
  const loaction = useLocation();
  return (
    <header className="header">
      <h1>Task Manager</h1>
      {loaction.pathname === "/" && (
        <Button
          color={showAdd ? "Red" : "green"}
          text={showAdd ? "close" : "add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Zaki",
};

Header.prototype = {
  title: PropTypes.string.isRequired,
};
export default Header;
