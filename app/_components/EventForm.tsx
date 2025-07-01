"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import { useUploadThing } from '../../lib/uploadthing'

import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../../components/ui/checkbox"
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "../../lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"


type EventFormProps = {
  userId: string
  type: "Create" | "Update"
  event?: IEvent,
  eventId?: string
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const initialValues = event && type === 'Update' 
    ? { 
      ...event, 
      startDateTime: new Date(event.startDateTime), 
      endDateTime: new Date(event.endDateTime) 
    }
    : eventDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing('imageUploader')

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
  })
 
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;
    console.log("Form Type:", type);              // Should be "Update"
    console.log("Event ID received:", eventId);   // Should NOT be undefined
    console.log("Form Submitted with values:", values);


    if(files.length > 0) {
      const uploadedImages = await startUpload(files)

      if(!uploadedImages) {
        return
      }

      uploadedImageUrl = uploadedImages[0].url
    }

    if(type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: '/profile'
        })

        if(newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }

    if(type === 'Update') {
      if(!eventId) {
        console.log("NO event provided for update")
        router.back()
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId:userId.userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId,categoryId:values.categoryId },
          path: `/events/${eventId}`
        })

        if(updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

return (
  <div className="flex flex-col p-4 md:p-8 bg-black min-h-screen text-white">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
        
        {/* Title and Category */}
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Event Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input 
                    placeholder="Event title" 
                    {...field} 
                    className="bg-black border border-orange-500 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Category Dropdown */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown 
                    onChangeHandler={field.onChange} 
                    value={field.value}                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description and Image */}
        <div className="flex flex-col gap-6 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea 
                    placeholder="Description" 
                    {...field} 
                    className="bg-black text-white border border-orange-500 rounded-xl h-72 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FileUploader 
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex items-center bg-black border border-orange-500 rounded-full px-4 py-2">
                  <Image src="/assets/icons/location-grey.svg" alt="location" width={24} height={24} />
                  <Input 
                    placeholder="Event location or Online" 
                    {...field} 
                    className="bg-transparent text-white ml-3 flex-1 focus:outline-none"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start & End Date */}
        <div className="flex flex-col gap-6 md:flex-row">
          {[["startDateTime", "Start Date:"], ["endDateTime", "End Date:"]].map(([name, label], idx) => (
            <FormField
              key={idx}
              control={form.control}
              name={name as "startDateTime" | "endDateTime"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center bg-black border border-orange-500 rounded-full px-4 py-2">
                      <Image src="/assets/icons/calendar (1).svg" alt="calendar" width={24} height={24} className="bg-amber-700" />
                      <p className="ml-3 text-orange-400">{label}</p>
                      <DatePicker 
                        selected={field.value} 
                        onChange={(date) => field.onChange(date)} 
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="ml-3 text-black"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        {/* Price and URL */}
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Price with Checkbox */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center bg-black border border-orange-500 rounded-full px-4 py-2">
                    <Image src="/assets/icons/dollar.svg" alt="dollar" width={24} height={24} />
                    <Input 
                      type="number" 
                      placeholder="Price" 
                      {...field} 
                      className="bg-transparent text-white ml-3 flex-1 focus:outline-none"
                    />
                    {/* Free Ticket Checkbox */}
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center ml-4">
                              <label htmlFor="isFree" className="text-white pr-2">Free Ticket</label>
                              <Checkbox 
                                onCheckedChange={field.onChange} 
                                checked={field.value} 
                                id="isFree" 
                                className="h-5 w-5 border-2 border-orange-500 text-orange-500"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* URL Input */}
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center bg-black border border-orange-500 rounded-full px-4 py-2">
                    <Image src="/assets/icons/link.svg" alt="link" width={24} height={24} />
                    <Input 
                      placeholder="URL" 
                      {...field} 
                      className="bg-transparent text-white ml-3 flex-1 focus:outline-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button 
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl w-full mt-6 transition"
        >
          {form.formState.isSubmitting ? 'Submitting...' : `${type} Event`}
        </Button>
      </form>
    </Form>
  </div>
);

}

export default EventForm