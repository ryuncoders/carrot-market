import { z } from "zod";

export const productSchema = z.object({
  photo: z.string({ required_error: "사진을 등록해주세요" }),
  title: z.string({ required_error: "제목을 입력해주세요" }),
  description: z.string({ required_error: "10자 이상 작성" }),
  price: z.coerce.number({
    required_error: "금액을 입력하세요",
  }),
});

export type ProductType = z.infer<typeof productSchema>;
