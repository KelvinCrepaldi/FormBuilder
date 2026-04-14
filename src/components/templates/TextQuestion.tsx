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

const defaultPlaceholder = "Digite sua resposta...";

export default function TextQuestion({
  formData,
  nextFn,
  onAnswer,
  builderPreview,
}: {
  formData: questionTypes;
  nextFn?: () => void;
  onAnswer?: (id: string, value: any) => void;
  builderPreview?: boolean;
}): React.JSX.Element {
  const ph = formData.placeholder?.trim() || defaultPlaceholder;

  if (builderPreview) {
    return (
      <div className="pointer-events-none flex w-full flex-col gap-3 text-left">
        {formData.description ? (
          <p className="text-sm opacity-70">{formData.description}</p>
        ) : null}
        <div className="text-lg font-semibold">{formData.text}</div>
        <Input readOnly placeholder={ph} className="bg-background/50" />
      </div>
    );
  }

  type FormType = z.infer<typeof schema>;

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: "",
    },
  });

  const onHandleSubmit = (data: FormType): void => {
    onAnswer?.(formData.id, data.value);

    if (nextFn) nextFn();
  };
  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ duration: 0.3, type: "tween", ease: "anticipate" }}
      className="flex w-full max-w-xl flex-col items-start gap-10 rounded-xl border bg-white p-5 md:p-10"
    >
      {formData.description ? (
        <p className="w-full text-left text-sm text-muted-foreground">
          {formData.description}
        </p>
      ) : null}
      <div className="mb-10 w-full text-left text-2xl font-bold">{formData.text}</div>

      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onHandleSubmit)}
            className="flex w-full flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formData.text}</FormLabel>
                  <FormControl>
                    <Input placeholder={ph} {...field} />
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
