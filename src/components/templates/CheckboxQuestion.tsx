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
import { Checkbox } from "../ui/checkbox";
import type { questionTypes } from "@/features/formBuilder/types";

const schema = z.object({
  values: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "required",
  }),
});

export default function CheckboxQuestion({
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
              <span className="h-4 w-4 rounded border" />
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
      values: [],
    },
  });

  const { control } = form;

  const onHandleSubmit = (data: FormType): void => {
    onAnswer?.(formData.id, data.values);

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
            {formData?.options?.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="w-full"
              >
                <FormField
                  control={control}
                  name="values"
                  render={({ field }) => (
                    <FormItem className="flex w-full items-center justify-between rounded border px-2">
                      <FormLabel className="w-full p-3">{option.label}</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(option.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, option.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== option.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </motion.div>
            ))}
            <Button type="submit" className="mt-20">
              continuar
            </Button>
          </form>
        </Form>
      </FormProvider>
    </motion.div>
  );
}
