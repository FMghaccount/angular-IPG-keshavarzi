export class Product {
  constructor(
    public id: number,
    public categoryId: number,
    public brandId: number,
    public brandCategoryId: number,
    public brandDescription: string,
    public pageTitle: string,
    public persianTitle: string,
    public model: string,
    public price: string,
    public discount: string,
    public discountAvailability: boolean,
    public inventoryStatus: string,
    public quantity: number,
    public isAvailable: boolean,
    public productDescription: string,
    public specsCategory: string,
    public specs: string,
    public rating: number
  ) {}
}
