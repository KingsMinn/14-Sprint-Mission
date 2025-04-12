import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import Selector from "../../../components/Selector";

const Container = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const DetailsContainer = styled.div`
  width: 100%;
  display: flex;

  .left {
    height: 100%;
    aspect-ratio: 1/1;
    border-radius: 16px;
    object-fit: cover;
    object-position: center;
  }

  .right {
    width: 100%;
    position: relative;

    .profile-container {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const CommentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProfileContainer = styled.div`
  display: flex;

  img {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 100px;
    object-fit: cover;
    object-position: center;
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;

function Profile({ nickname, updatedAt, image }) {
  return (
    <ProfileContainer>
      <img src={image} />
      <div>
        <span>{nickname}</span>
        <span>{updatedAt}</span>
      </div>
    </ProfileContainer>
  );
}

function Comment({ children, nickname, updatedAt, image }) {
  const [showOrder, setShowOrder] = useState(false);
  const [editComment, setEditComment] = useState(false);

  const ORDER_LIST = {
    edit: "수정하기",
    delete: "삭제하기",
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        {editComment ? (
          <>
            <textarea>{children}</textarea>
            <div style={{ display: "flex" }}>
              <Profile
                nickname={nickname}
                updatedAt={updatedAt}
                image={image}
              />
              <button
                onClick={() => setEditComment(false)}
                style={{ marginLeft: "auto" }}
              >
                취소
              </button>
              <Button onClick={() => setEditComment(false)}>수정 완료</Button>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setShowOrder((prev) => !prev)}
              style={{ position: "absolute", right: 0 }}
            >
              menu
              {showOrder && (
                <Selector
                  options={Object.values(ORDER_LIST)}
                  setter={setEditComment}
                  setterOptions={Object.keys(ORDER_LIST)}
                />
              )}
            </button>
            {children}
            <Profile nickname={nickname} updatedAt={updatedAt} image={image} />
          </>
        )}
      </div>
      <hr />
    </>
  );
}

function ItemDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [comments, setComments] = useState(null);
  const [showOrder, setShowOrder] = useState(false);
  const [articleOption, setArticleOption] = useState(null);

  const ORDER_LIST = {
    edit: "수정하기",
    delete: "삭제하기",
  };

  //details
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://panda-market-api.vercel.app/products/${id}`
        );
        console.log(response.data);
        setDetails(response.data);
      } catch (error) {
        console.error("API failed", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  //comments
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://panda-market-api.vercel.app/products/${id}/comments?limit=10`
        );
        console.log(response.data.list);
        setComments(response.data.list);
      } catch (error) {
        console.error("API failed", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Container>
      <DetailsContainer>
        <img src={details?.images[0]} className="left" />
        <div className="right">
          <button
            onClick={() => setShowOrder((prev) => !prev)}
            style={{ position: "absolute", right: 0 }}
          >
            menu
            {showOrder && (
              <Selector
                options={Object.values(ORDER_LIST)}
                setter={setArticleOption}
                setterOptions={Object.keys(ORDER_LIST)}
              />
            )}
          </button>
          <h1>{details?.name}</h1>
          <h2>{details?.price.toLocaleString() + "원"}</h2>
          <hr />
          <span>상품 소개</span>
          <p>{details?.description}</p>
          <span>상품 태그</span>
          <div>
            {details?.tags.map((v) => (
              <span>#{v}</span>
            ))}
          </div>
          <div className="profile-container">
            <Profile
              nickname={details?.ownerNickname}
              updatedAt={details?.updatedAt}
              image={details?.images[0]}
            />
            <button>{details?.favoriteCount}</button>
          </div>
        </div>
      </DetailsContainer>
      <hr />
      <CommentsContainer>
        <span>문의하기</span>
        <textarea placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다." />
        <Button width="74px" style={{ marginLeft: "auto" }}>
          등록
        </Button>
        {comments?.map((v) => (
          <Comment
            nickname={v.writer.nickname}
            updatedAt={v.updatedAt}
            image={v.writer.image}
          >
            {v.content}
          </Comment>
        ))}
      </CommentsContainer>
      <Button round>목록으로 돌아가기</Button>
    </Container>
  );
}

export default ItemDetail;
