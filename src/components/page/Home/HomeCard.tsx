import { Button, Card, Input } from "@chakra-ui/react";
import { Field } from "../../ui/field";
import { useForm } from "react-hook-form";
import { HomeForm } from "./Type";

type HomeCardProps = {
  onSave: (data: HomeForm) => void;
};

export const HomeCard = ({ onSave }: HomeCardProps) => {
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
      <Card.Footer justifyContent="center">
        <Button
          variant="solid"
          colorPalette="teal"
          w="full"
          onClick={handleSubmit(onSave)}
        >
          名刺を見る
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};
