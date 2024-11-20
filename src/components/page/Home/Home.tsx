import { useNavigate } from "react-router-dom";
import { HomeCard } from "./HomeCard";
import { Heading, Link, Box } from "@chakra-ui/react";
import { login } from "./models/login";
import { useState } from "react";
import { HomeForm } from "./Type";

export const Home = () => {
  const [error, setError] = useState<{
    id: boolean;
    server: boolean;
  }>({
    id: false,
    server: false,
  });
  const navigate = useNavigate();

  const handleLogin = async (data: HomeForm) => {
    try {
      const res = await login(data.id);
      setError(res);
      if (res.id || res.server) return;
      navigate(`/cards/${data.id}`);
    } catch {
      setError({ id: false, server: true });
    }
  };

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
      <HomeCard error={error} onSave={handleLogin} />
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
