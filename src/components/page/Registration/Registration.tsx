import { Heading, Link, Box } from "@chakra-ui/react";
import { RegistrationCard } from "./RegistrationCard";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="teal.50"
      minH="100vh"
      p="5"
    >
      <Heading mb="3" size="3xl">
        新規名刺登録
      </Heading>
      <RegistrationCard
        skillsList={[{ id: "1", label: "React" }]}
        onSave={(data) => console.log(data)}
      />
      <Link onClick={() => navigate("/")}>ホームへ戻る</Link>
    </Box>
  );
};
