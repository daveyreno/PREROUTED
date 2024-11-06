"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { QRCodeSVG } from 'qrcode.react';

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { aussieLinks, lendiLinks, LinkType } from "./Links";
import { toast } from "sonner";

const formSchema = z.object({
  uuid: z.string().uuid({
    message: "Please enter a valid UUID.",
  }),
  type: z.enum(["broker", "store"]),
});

type FormSchema = z.infer<typeof formSchema>;

interface LinkGenProps {
  brand: "aussie" | "lendi";
}

export function LinkGen({ brand }: LinkGenProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "broker",
    },
  });

  const [links, setLinks] = useState<{ title: string; url: string }[]>([]);
  const [showQR, setShowQR] = useState<number | null>(null);

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const baseUrls: LinkType[] = brand === "aussie" ? aussieLinks : lendiLinks;
    const idType = data.type === "broker" ? "brokerid" : "storeid";

    const generatedLinks = baseUrls.map((baseUrl: LinkType) => ({
      title: baseUrl.title,
      url: baseUrl.isAppLink 
        ? `${baseUrl.url}/?${idType}=${data.uuid}&utm_source=app-prl&utm_medium=qrcode&utm_campaign=app-prl-flow`
        : `${baseUrl.url}?${idType}=${data.uuid}&utm_content=pre_routed_leads`,
    }));
    setLinks(generatedLinks);
    toast("Links created!");
  };

  const copyToClipboard = (link: { title: string; url: string }) => {
    const textToCopy = `${link.title}\n${link.url}`;
    navigator.clipboard.writeText(textToCopy);
    toast("Copied to clipboard");
  };

  const copyAllToClipboard = () => {
    const allLinks = links
      .map((link) => `${link.title}\n${link.url}`)
      .join("\n\n");
    navigator.clipboard.writeText(allLinks);
    toast("Copied all to clipboard");
  };

  const downloadQR = (link: { title: string; url: string }) => {
    const canvas = document.createElement("canvas");
    const svg = document.querySelector(`#qr-${link.title.replace(/\s+/g, '-')}`) as SVGElement;
    
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        
        const a = document.createElement("a");
        a.download = `${link.title}-qr.png`;
        a.href = canvas.toDataURL("image/png");
        a.click();
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {brand === "aussie" && (
            <FormField
              control={form.control}
              name="type"
              render={() => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Controller
                      name="type"
                      control={form.control}
                      render={({ field }) => (
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="broker" id="broker" />
                            <Label htmlFor="broker">Broker</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="store" id="store" />
                            <Label htmlFor="store">Store</Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
                className="border-t border-x first:rounded-t-lg"
              >
                <div className="flex justify-between items-start p-3">
                  <div className="flex-1 break-words pr-4">
                    <p className="font-semibold">{link.title}</p>
                    <p className="text-sm text-slate-500 break-all">{link.url}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowQR(showQR === index ? null : index)}
                    >
                      {showQR === index ? 'Hide QR' : 'Show QR'}
                    </Button>
                    <Button onClick={() => copyToClipboard(link)}>Copy</Button>
                  </div>
                </div>
                {showQR === index && (
                  <div className="p-4 border-t bg-white">
                    <div className="flex flex-col items-center gap-2">
                      <QRCodeSVG 
                        id={`qr-${link.title.replace(/\s+/g, '-')}`}
                        value={link.url}
                        size={200}
                        level="H"
                        includeMargin
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadQR(link)}
                      >
                        Download QR
                      </Button>
                    </div>
                  </div>
                )}
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
