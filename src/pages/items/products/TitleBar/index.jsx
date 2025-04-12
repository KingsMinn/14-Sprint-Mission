import { useState } from "react";
import * as S from "./style";

import OrderArrow from "@/assets/icons/ico_arrow_down.svg";
import Magnify from "@/assets/icons/ico_magnify.svg";
import Order from "@/assets/icons/ico_order.svg";
import Button from "@/components/Button";
import Selector from "../../../../components/Selector";

function TitleBar({ winSize, keywords, pages, orders }) {
  const [showOrder, setShowOrder] = useState(false);
  const [keyword, setKeyword] = keywords;
  const [page, setPage] = pages;
  const [order, setOrder] = orders;

  const ORDER_LIST = {
    recent: "최신순",
    favorite: "좋아요순",
  };

  const search = (e) => {
    setKeyword(e.target.value);
    if (page != 1) {
      setPage(1);
    }
  };

  return (
    <S.TitleBar>
      {winSize === "mobile" ? (
        <div className="container">
          <div className="top-container">
            <span className="flex-grow">전체 상품</span>
            <Button width="132px" to="/additem">
              상품 등록하기
            </Button>
          </div>
          <div className="bottom-container">
            <label htmlFor="search" style={{ flexGrow: 1 }}>
              <img src={Magnify} alt="" />
              <input
                onChange={search}
                value={keyword}
                id="search"
                placeholder="검색할 상품을 입력해주세요"
                style={{ width: "100%" }}
              />
            </label>
            <div
              className="select-order"
              onClick={() => setShowOrder((prev) => !prev)}
            >
              <img src={Order} alt="" />
              {showOrder && (
                <Selector
                  options={Object.values(ORDER_LIST)}
                  setter={setOrder}
                  setterOptions={Object.keys(ORDER_LIST)}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <span className="flex-grow">전체 상품</span>
          <label htmlFor="search">
            <img src={Magnify} alt="" />
            <input
              onChange={search}
              value={keyword}
              id="search"
              placeholder="검색할 상품을 입력해주세요"
              style={{ width: "324px" }}
            />
          </label>
          <Button width="132px" to="/additem">
            상품 등록하기
          </Button>
          <div
            className="select-order"
            onClick={() => setShowOrder((prev) => !prev)}
          >
            <span>{ORDER_LIST[order]}</span>
            <img src={OrderArrow} alt="" />
            {showOrder && (
              <Selector
                options={Object.values(ORDER_LIST)}
                setter={setOrder}
                setterOptions={Object.keys(ORDER_LIST)}
              />
            )}
          </div>
        </>
      )}
    </S.TitleBar>
  );
}

export default TitleBar;
