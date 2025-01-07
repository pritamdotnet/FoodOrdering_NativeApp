import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { InsertTables, UpdateTables } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useAdminOrderList = ({archived = false }) => {
  const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];

  return useQuery({
    queryKey: ['orders', { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
      .from('orders')
      .select('*')
      .in('status', statuses)
      .order('created_at', {ascending: false});
      if (error) {
        console.warn(error);
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useMyOrderList = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  console.log("Session Object:", session); 
  console.log("User ID:", id);  
  
  return useQuery({
    queryKey: ['orders', { userId: id }],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', id)
        .order('created_at', {ascending: false});
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const {data, error} = await supabase
      .from('orders')
      .select('*, order_items(*, products(*))')
      .eq('id', id)
      .single();
      
      if (error) {
        throw new Error(error.message);
      }
      return data;
      }
  });
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
 async mutationFn(data: InsertTables<'orders'>) {
      const { error, data: newProduct } = await supabase
        .from('orders')
        .insert({ ...data,user_id: userId })
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      updatedFields,
      }: {
        id: number;
        updatedFields: UpdateTables<'orders'>;
      }) {
      const { error, data: updatedOrder } = await supabase
        .from('orders')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedOrder;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      await queryClient.invalidateQueries({ queryKey: ['orders', id]});

    },
  });
};


// export const useMyOrderList = () => {
//   const { session } = useAuth();
//   const id = session?.user.id;

//   console.log("Session Object:", session); // Debug session
//   console.log("User ID:", id);             // Debug user ID

//   return useQuery({
//     queryKey: ['orders', { userId: id }],
//     queryFn: async () => {
//       const userIdToFetch = '36e33a8a-1bf3-4bc5-822f-ea0bd937b3ee'; // Replace with dynamic `id` later
//       console.log("Fetching orders for User ID:", userIdToFetch);
     
//       if (!id) return null;
//       const { data, error } = await supabase
//         .from('orders')
//         .select('*')
//         .eq('user_id', userIdToFetch);
//         console.log("Supabase Data:", data);
//         console.log("Supabase Error:", error);
//       if (error) {
//         throw new Error(error.message);
//       }
//       console.log("Fetched orders for user:", data);
//       return data;
//     },
//   });
// };