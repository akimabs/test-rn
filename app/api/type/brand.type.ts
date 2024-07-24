import { z } from "zod";
import BrandAPISchema from "../schema/brand.schema";

export namespace BrandAPIType {
  export namespace BrandImage {
    export type Request = z.infer<(typeof BrandAPISchema)["BrandImage"]["Request"]>;
    export type Response = z.infer<(typeof BrandAPISchema)["BrandImage"]["Response"]>;
  }
  export namespace BrandLetter {
    export type Request = z.infer<(typeof BrandAPISchema)["BrandLetter"]["Request"]>;
    export type Response = z.infer<(typeof BrandAPISchema)["BrandLetter"]["Response"]>;
  }
}
