import { z, ZodType } from "zod";


export class AppValidation {
    static readonly YEAR: ZodType = z.string().refine((year) => {
        const numYear = Number(year);
        return numYear >= 2000 && numYear <= new Date().getFullYear();
      })
}