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
import type { formTypes } from "@/features/formBuilder/types";

const schema = z.object({
  values: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "required",
  }),
});

export default function CheckboxTemplate({
  formData,
}: {
  formData: formTypes;
}): React.JSX.Element {
  type FormType = z.infer<typeof schema>;

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      values: [],
    },
  });

  const { control } = form;

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
      <div className="text-2xl font-bold mb-10">{formData.question}</div>
      <FormProvider {...form}>
        <Form {...form}>
          <form
            id="multistepform"
            onSubmit={form.handleSubmit(onHandleSubmit)}
            className="flex flex-col h-full items-center w-full gap-3"
          >
            

            <>
              {formData?.options?.map((option, index) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="w-full"
                  >
                    <FormField
                      key={option.id}
                      control={control}
                      name="values"
                      render={({ field }) => (
                        <FormItem className="border  flex justify-between items-center px-2 rounded w-full">
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
                );

                return null;
              })}
            </>
            <Button type="submit" className="mt-20">continuar</Button>
          </form>
        </Form>
      </FormProvider>
    </motion.div>
  );
}
