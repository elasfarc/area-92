import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { continents } = useSelector((state) => state.entities);
  return (
    <div className="home">
      {Object.keys(continents).map((continent) => (
        <div key={continent} className="box mb-1">
          <div className="container flex gap-2 cross-center">
            <img
              src={`${process.env.PUBLIC_URL}/imgs/${continent}.png`}
              alt=""
              className="box__img"
            />
            <div className="text-center">
              <h4 className="box__heading">{continent}</h4>
              <p className="box__text">blah blah blah</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
