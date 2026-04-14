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
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import type { questionTypes } from "@/features/formBuilder/types";

const schema = z.object({
  value: z.string().min(1, { message: "Selecione uma opção" }),
});

export default function RadioQuestion({
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
  if (builderPreview) {
    return (
      <div className="pointer-events-none flex w-full flex-col gap-3 text-left">
        {formData.description ? (
          <p className="text-sm opacity-70">{formData.description}</p>
        ) : null}
        <div className="text-lg font-semibold">{formData.text}</div>
        <div className="flex flex-col gap-2">
          {formData?.options?.map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between rounded border px-3 py-2"
            >
              <span>{option.label || "Opção"}</span>
              <span className="h-4 w-4 rounded-full border-2 border-current" />
            </div>
          ))}
        </div>
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
      className="flex w-full max-w-xl flex-col items-start gap-5 rounded-xl border bg-white p-5 md:gap-10 md:p-10"
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
            id="multistepform"
            onSubmit={form.handleSubmit(onHandleSubmit)}
            className="flex h-full w-full flex-col items-start gap-3"
          >
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-col gap-4"
                    >
                      {formData?.options?.map((option, index) => (
                        <motion.div
                          key={option.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          className="w-full"
                        >
                          <FormItem className="flex w-full items-center justify-between rounded border px-2">
                            <FormLabel className="w-full cursor-pointer p-3">
                              {option.label}
                            </FormLabel>
                            <FormControl>
                              <RadioGroupItem value={option.id} />
                            </FormControl>
                          </FormItem>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-20">
              continuar
            </Button>
          </form>
        </Form>
      </FormProvider>
    </motion.div>
  );
}
