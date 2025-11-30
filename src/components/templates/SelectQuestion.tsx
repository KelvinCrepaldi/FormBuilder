import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";

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
}: {
  formData: questionTypes;
}): React.JSX.Element {
  type FormType = z.infer<typeof schema>;

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: "",
    },
  });

  const onHandleSubmit = (data: FormType): void => {
    console.log(data);
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
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione..." />
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
