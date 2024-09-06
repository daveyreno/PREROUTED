"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

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
import { aussieLinks, lendiLinks } from "./Links";

const formSchema = z.object({
  uuid: z.string().uuid({
    message: "Please enter a valid UUID.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

interface LinkGenProps {
  brand: "aussie" | "lendi";
}

export function LinkGen({ brand }: LinkGenProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const [links, setLinks] = useState<{ title: string; url: string }[]>([]);

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const baseUrls = brand === "aussie" ? aussieLinks : lendiLinks;

    const generatedLinks = baseUrls.map((baseUrl) => ({
      title: baseUrl.title,
      url: `${baseUrl.url}?brokerid=${data.uuid}`,
    }));
    setLinks(generatedLinks);
  };

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
  };

  const copyAllToClipboard = () => {
    const allLinks = links.map((link) => link.url).join("\n");
    navigator.clipboard.writeText(allLinks);
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="uuid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UUID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter UUID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Generate Links</Button>
        </form>
      </Form>
      {links.length > 0 && (
        <div className="mt-4">
          <p className="text-xl tracking-tight font-semibold mb-4">
            Generated Links:
          </p>
          <div className="">
            {links.map((link, index) => (
              <div
                key={index}
                className="border-t border-x first:rounded-t-lg flex justify-between items-center p-3"
              >
                <div className="h-16">
                  <p className="font-semibold">{link.title}</p>
                  <p className="text-sm">{link.url}</p>
                </div>
                <Button onClick={() => copyToClipboard(link.url)}>Copy</Button>
              </div>
            ))}
            <div className="border rounded-b flex justify-between items-center p-3">
              <Button className="w-full" onClick={copyAllToClipboard}>
                Copy All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
