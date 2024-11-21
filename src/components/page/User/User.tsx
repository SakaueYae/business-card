import { Box, Spinner, VStack, Text, Button } from "@chakra-ui/react";
import { UserCard } from "./UserCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "./models/getUser";
import { RegistrationForm } from "../Registration/Type";

export const User = () => {
  const [data, setData] = useState<RegistrationForm>();
  const params = useParams<{ id: string }>();
  useEffect(() => {
    (async () => {
      if (!params.id) return;
      const data = await getUser(params.id);
      if (data) {
        setData(data);
      }
    })();
  }, [params.id]);
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="teal.50"
      minH="100vh"
      p="10"
    >
      {data ? (
        <>
          <UserCard data={data} />
          <Button
            w={{ base: "100%", md: "lg" }}
            boxSizing="border-box"
            mt="5"
            colorPalette="teal"
            onClick={() => navigate("/")}
          >
            戻る
          </Button>
        </>
      ) : (
        <VStack colorPalette="teal">
          <Spinner color="colorPalette.600" size="xl" />
          <Text color="colorPalette.600">Loading...</Text>
        </VStack>
      )}
    </Box>
  );
};
