import type { NextPage } from "next";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import Head from "next/head";
import useSWRInfinite from "swr/infinite";
import { Product, Record } from "@prisma/client";
import { useEffect } from "react";
import { useInfiniteScroll } from "@libs/client/useInfiniteScroll";
import client from "@libs/server/client";
// import Image from "next/image";
// import riceCake from "../public/local.jpeg";

export interface ProductWithCount extends Product {
  records: Record[];
}
interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
  pages: number;
}
const getKey = (pageIndex: number, previousPageData: ProductsResponse) => {
  if (pageIndex === 0) return `/api/products?page=1`;
  if (pageIndex + 1 > previousPageData.pages) return null;
  return `/api/products?page=${pageIndex + 1}`;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage<{ products: ProductWithCount[] }> = ({ products }) => {
  const { data, setSize } = useSWRInfinite<ProductsResponse>(getKey, fetcher);
  // const products = data ? data.map((item) => item.products).flat() : [];
  const page = useInfiniteScroll();
  useEffect(() => {
    setSize(page);
  }, [setSize, page]);
  return (
    <Layout title="홈" hasTabBar seoTitle={""}>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col space-y-5 divide-y">
        {products?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            comments={1}
            hearts={product.records?.length}
            image={product.image}
          />
        ))}
        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
      {/* <Image src={riceCake} placeholder="blur" quality={5} alt="riceCake" /> */}
    </Layout>
  );
};

export async function getServerSideProps() {
  const products = await client.product.findMany({});
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Home;
