/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import "./Home.css";
import { useContext, useState, useEffect } from "react";
import { CoinContext } from "../../context/Context";
import { Link } from "react-router-dom";
const Home = () => {
  const { allCoin, currency, setAllCoin, setCurrency } =
    useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchingHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return (
        item.name.toLowerCase().includes(input.toLowerCase()) ||
        item.symbol.toLowerCase().includes(input.toLowerCase())
      );
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more than cryptos.
        </p>
        <form onSubmit={searchingHandler}>
          <input
            onChange={inputHandler}
            list="coinlist"
            type="text"
            value={input}
            placeholder="Search crypto..."
            required
          />

          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option value={item.name} key={index}></option>
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24h Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 12).map((item, index) => (
          <Link to={`coin/${item.id}`} className="table-layout" key={index} >
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              style={{ textAlign: "center" }}
              className={
                item.market_cap_change_percentage_24h > 0 ? "green" : "red"
              }
            >
              {Math.floor(item.market_cap_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
