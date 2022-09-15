import React from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const BreadCrumb = ({ items }) => {
  const navigateTo = useNavigate();
  return (
    <div className="flex-small-gap">
      {items.map((item) => (
        <div key={item.id}>
          <div className="flex-small-gap">
            {item.id !== 0 && (
              <AiFillCaretRight
                style={
                  item.active
                    ? { color: "var(--red-shade-color)" }
                    : { color: "var(--primary-color)" }
                }
              />
            )}
            <div
              className={
                item.active
                  ? "bolder secondary-colour"
                  : "bolder primary-colour pointer"
              }
              onClick={() => navigateTo(item.url)}
            >
              {item.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BreadCrumb;
