import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import type { questionTypes } from "@/features/formBuilder/types";

const schema = z.object({
  value: z.string().min(1, "Selecione uma opção"),
});

export default function SelectQuestion({
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
  const ph =
    formData.placeholder?.trim() || "Selecione...";

  if (builderPreview) {
    return (
      <div className="pointer-events-none flex w-full flex-col gap-3 text-left">
        {formData.description ? (
          <p className="text-sm opacity-70">{formData.description}</p>
        ) : null}
        <div className="text-lg font-semibold">{formData.text}</div>
        <div className="rounded-md border bg-background/50 px-3 py-2 text-muted-foreground">
          {ph}
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
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={ph} />
                      </SelectTrigger>

                      <SelectContent>
                        {formData.options?.map((option, index) => (
                          <motion.div
                            key={option.id}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.25,
                              delay: index * 0.1,
                            }}
                          >
                            <SelectItem value={option.id}>
                              {option.label}
                            </SelectItem>
                          </motion.div>
                        ))}
                      </SelectContent>
                    </Select>
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
