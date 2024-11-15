import { useNavigate } from "react-router-dom";
import { HomeCard } from "./HomeCard";
import { Heading, Link } from "@chakra-ui/react";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Heading mb="3">デジタル名刺アプリ</Heading>
      <HomeCard onSave={(data) => console.log(data)} />
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Link onClick={() => navigate("/cards/register")}>
          新規登録はこちら
        </Link>
      </div>
    </div>
  );
};
