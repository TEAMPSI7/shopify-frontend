import ProductPage from "@/components/products/ProductPage";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const JacketPage = async () => {
  try {
    const response = await axios.get(`${baseUrl}/products/66ec0babc9db96a273e5da39`);
    const product = response.data;

    console.log("RESPONSE", response);
    let productImage = "";
    if (product.productImage && product.productImage.data) {
      const base64Image = Buffer.from(product.productImage.data).toString("base64");
      productImage = `data:image/jpeg;base64,${base64Image}`;
    }

    console.log(productImage);

    return <ProductPage product={product} productImage={productImage} />;
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    return <div>Error loading product data</div>;
  }
};

export default JacketPage;
