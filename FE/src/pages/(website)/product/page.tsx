import { Link, useParams } from "react-router-dom";
import ProductInfo from "./_components/ProductInfo";
import SeeMore from "./_components/SeeMore";
import SkeletonProduct from "./_components/SkeletonProduct";
import SliderImage from "./_components/SliderImage";
import { useGetProductById } from "./actions/useGetProductById";
import { useEffect, useState } from "react";
import axios from "@/configs/axios";
import ListProductFavorite from "./_components/ListProductFavorite";
import { ProductItem } from "../shop/types";

export type ListProductProps = {
  bestFavoriteProducts: Product[];
  bestSellerProducts: Product[];
  listRelatedProducts: Product[];
};

export type Product = {
  _id: string;
  name: string;
  price: number;
  priceSale: number;
  image: string;
};

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<ListProductProps>();
  const [isGetting, setIsGetting] = useState(false);
  const {
    isLoadingProduct,
    product,
    error,
  }: { isLoadingProduct: boolean; product: ProductItem; error: Error | null } =
    useGetProductById(id!);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsGetting(true);
        const response = await axios.get(
          `/listProductFavorite?categoryId=${product.category[0]._id}&productId=${product._id}`
        ); // URL API
        setIsGetting(false);
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsGetting(false);
      }
    };

    if (product) fetchProducts();
  }, [product]);

  if (isLoadingProduct || isGetting) {
    return (
      <div className="container mb-4">
        <SkeletonProduct />
      </div>
    );
  }

  if (error || !product) {
    return <div>Error loading product!</div>;
  }

  return (
    <div className="container mb-4">
      <div className="h-4 md:h-8 mb-0"></div>
      {/* Breadcrumbs */}
      <div className="text-[11px] leading-[18px] uppercase text-[#888] breadcrumbs">
        <Link to="/" className="bread">
          Trang chủ
        </Link>
        <Link to="/shopping" className="bread">
          Shopping
        </Link>
        <Link to={`/product/${product._id}`}>{product.name}</Link>
      </div>
      {/* Khoang cach */}
      <div className="h-4 md:h-12 lg:h-24 mb-0"></div>
      {/* Info product */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="px-[15px] mx-auto mb-[30px] md:mb-0">
          {/* Carousel */}
          <SliderImage imageMain={product.image} variants={product.variants} />
        </div>

        {/* Product info */}
        <div>
          {/* Sử dụng ProductInfo */}
          <ProductInfo product={product} />

          {/* BUTTON */}
        </div>
      </div>
      {/* See More */}
      <div className="h-[35px] md:h-[70px]"></div>
      <SeeMore
        descriptionDetail={product.descriptionDetail}
        comments={product?.comments}
      />
      <div className="h-[35px] md:h-[70px]"></div>
      {data && <ListProductFavorite data={data} />}
    </div>
  );
};

export default ProductDetail;
