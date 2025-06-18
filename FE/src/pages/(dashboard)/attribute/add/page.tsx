import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateAttribute } from "../actions/useCreateAttribute";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Hãy viết tên thuộc tính",
    })
    .max(50),
});

const CreateAttributePage = () => {
  const { createAttribute, isCreatting } = useCreateAttribute();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    createAttribute(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-2/3 ml-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên thuộc tính</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isCreatting} type="submit">
          {isCreatting ? "Đang tạo..." : "Tạo mới"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateAttributePage;
