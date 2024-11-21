import { Box, Spinner, VStack, Text } from "@chakra-ui/react";
import { UserCard } from "./UserCard";
import { useParams } from "react-router-dom";
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

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="teal.50"
      minH="100vh"
    >
      {data ? (
        <UserCard data={data} />
      ) : (
        <VStack colorPalette="teal">
          <Spinner color="colorPalette.600" size="xl" />
          <Text color="colorPalette.600">Loading...</Text>
        </VStack>
      )}
    </Box>
  );
};
