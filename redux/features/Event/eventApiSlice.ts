import { api } from "../../api/apiSlice";

const eventApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (body) => ({
        url: "/events/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json"
        }
      }),
      invalidatesTags: ["Events"]
    })
  })
});

export const { useCreateEventMutation } = eventApiSlice;
