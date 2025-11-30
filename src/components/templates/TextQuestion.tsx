import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { questionTypes } from "@/features/formBuilder/types";

const schema = z.object({
  value: z.string().min(1, "Campo obrigatório"),
});

export default function TextQuestion({
  formData,
  nextFn,
  onAnswer,
}: {
  formData: questionTypes;
  nextFn?: () => void;
  onAnswer?: (id: string, value: any) => void;
}): React.JSX.Element {
  type FormType = z.infer<typeof schema>;

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: "",
    },
  });

  const onHandleSubmit = (data: FormType): void => {
    onAnswer?.(formData.id, data.value); // ← salvar respostas

    if (nextFn) nextFn();
  };
  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ duration: 0.3, type: "tween", ease: "anticipate" }}
      className="flex flex-col items-center p-5 md:p-10 gap-10 border rounded-xl bg-white max-w-xl w-full"
    >
      <div className="text-2xl font-bold mb-10">{formData.text}</div>

      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onHandleSubmit)}
            className="flex flex-col w-full gap-4"
          >
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formData.text}</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite sua resposta..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-10">
              continuar
            </Button>
          </form>
        </Form>
      </FormProvider>
    </motion.div>
  );
}
