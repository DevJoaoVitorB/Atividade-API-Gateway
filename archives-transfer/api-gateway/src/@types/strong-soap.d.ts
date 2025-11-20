declare module "strong-soap" {
  export const soap: {
    createClient: (
      wsdlUrl: string,
      options: any,
      callback: (err: any, client: any) => void
    ) => void;
  };
}