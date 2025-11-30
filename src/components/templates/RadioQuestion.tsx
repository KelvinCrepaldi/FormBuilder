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
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

import type { questionTypes } from "@/features/formBuilder/types";

const schema = z.object({
  value: z.string().min(1, { message: "Selecione uma opção" }),
});

export default function RadioQuestion({
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
      className="flex w-full flex-col items-center p-5 md:p-10 gap-5 md:gap-10 border rounded-xl bg-white max-w-xl"
    >
      <div className="text-2xl font-bold mb-10">{formData.text}</div>

      <FormProvider {...form}>
        <Form {...form}>
          <form
            id="multistepform"
            onSubmit={form.handleSubmit(onHandleSubmit)}
            className="flex flex-col h-full items-center w-full gap-3"
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
                          <FormItem className="border flex justify-between items-center px-2 rounded w-full">
                            <FormLabel className="w-full p-3 cursor-pointer">
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
