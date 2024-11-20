import { useNavigate } from "react-router-dom";
import { HomeCard } from "./HomeCard";
import { Heading, Link, Box } from "@chakra-ui/react";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="teal.50"
      minH="100vh"
    >
      <Heading mb="3" size="4xl">
        デジタル名刺アプリ
      </Heading>
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
    </Box>
  );
};
