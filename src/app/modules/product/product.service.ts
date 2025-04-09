import { IProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProduct = async (payload: IProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

// get product

const getProduct = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  console.log('main query obj', query);
  console.log('Copy query obj', queryObj);

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchableFileds = ['title', 'author', 'category'];

  const searchQuery = ProductModel.find({
    $or: searchableFileds.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // filtering

  const excludeFields = [
    'searchTerm',
    'sort',
    'limit',
    'page',
    'minPrice',
    'maxPrice',
  ];
  excludeFields.forEach((el) => delete queryObj[el]);

  console.log(queryObj);

  const filterQuery = searchQuery.find(queryObj);

  //price filter query by price ranage

  let minPrice = 0;
  let maxPrice = 50000;
  if (query.maxPrice && query.minPrice) {
    minPrice = Number(query.minPrice);
    maxPrice = Number(query.maxPrice);
  }

  const priceFilterQuery = filterQuery.find({
    price: { $gte: minPrice, $lte: maxPrice },
  });

  // sort query

  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string;
  }
  const sortQuery = priceFilterQuery.sort(sort);

  let page = 1;
  let limit = 10;
  let skip = 0;
  if (query.limit) {
    limit = Number(query.limit) as number;
  }
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = await paginateQuery.limit(limit);

  return limitQuery;
};

const getSpecificProduct = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

const updateProduct = async (id: string, payload: IProduct) => {
  console.log(id, payload);
  const result = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const productServices = {
  createProduct,
  getProduct,
  getSpecificProduct,
  deleteProduct,
  updateProduct,
};
