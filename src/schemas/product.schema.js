import {z} from 'zod'

export const createProductSchema = z.object({
    name: z.string({
        required_error: 'name is required',
    }),
    category:z.string({
        required_error: 'Category must be a string',
    }),
    price: z.number({
        required_error: 'Price is number required',
    }),
    imgURL: z.string({
        required_error: 'Insert url of the image',
    }).optional()
})