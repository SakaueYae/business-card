import { Button, Card, Input } from "@chakra-ui/react";
import { Field } from "../../ui/field";
import { useForm } from "react-hook-form";
import { HomeForm } from "./Type";
import { Alert } from "../../ui/alert";

type HomeCardProps = {
  error: {
    id: boolean;
    server: boolean;
  };
  onSave: (data: HomeForm) => void;
};

export const HomeCard = ({ error, onSave }: HomeCardProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<HomeForm>();

  return (
    <Card.Root maxW="sm">
      <Card.Body>
        <Field label="ID" invalid={!!errors.id} errorText={errors.id?.message}>
          <Input
            placeholder="ID"
            {...register("id", {
              required: "IDを入力してください",
            })}
          />
        </Field>
      </Card.Body>
      <Card.Footer justifyContent="center" flexDir="column">
        <Button
          variant="solid"
          colorPalette="teal"
          w="full"
          onClick={handleSubmit(onSave)}
        >
          名刺を見る
        </Button>
        {error.id && <Alert status="error">IDが存在しません。</Alert>}
        {error.server && (
          <Alert status="error">ログイン時にエラーが発生しました。</Alert>
        )}
      </Card.Footer>
    </Card.Root>
  );
};
