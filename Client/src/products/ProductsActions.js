import {
  setCategories,
  setProducts,
  setFilters,
  setCurrentProduct,
  addProduct,
  updateProduct,
  setEmpty,
} from "./ProductReducer";
import axios from "axios";
import { API } from "../configs";
import { getToken } from "../utils";
import { history } from "../store/store";
import { SuccessAlert, FailAlert } from "../components/Alerts";
import { push } from "connected-react-router";

export const getProducts = (filters) => async (dispatch) => {
  let apiUrl = `${API}/products`;
  if (filters) {
    let filterAdded = false;
    apiUrl = apiUrl.concat("?");
    if (filters.name) {
      apiUrl = apiUrl.concat(`name=${filters.name}`);
      filterAdded = true;
    }
    if (filters.category && filters.category >= 1) {
      if (filterAdded) {
        apiUrl = apiUrl.concat("&");
      }
      apiUrl = apiUrl.concat(`category=${filters.category}`);
      filterAdded = true;
    }
    if (filters.priceMin) {
      if (filterAdded) {
        apiUrl = apiUrl.concat("&");
      }
      apiUrl = apiUrl.concat(`priceMin=${filters.priceMin}`);
      filterAdded = true;
    }
    if (filters.priceMax) {
      if (filterAdded) {
        apiUrl = apiUrl.concat("&");
      }
      apiUrl = apiUrl.concat(`priceMax=${filters.priceMax}`);
    }
    apiUrl = apiUrl.concat(`&statusId=2`);
  }

  axios.get(apiUrl).then((products) => {
    console.log(products);
    const allProducts =
      products.data && products.data.length
        ? products.data
        : products.data.products;

    console.log(allProducts);
    dispatch(setProducts(allProducts));
    if (products.data.empty) {
      dispatch(setEmpty(true));
    } else {
      dispatch(setEmpty(false));
    }
  });
};
export const getPendingProducts = (filters) => async (dispatch) => {
  let apiUrl = `${API}/productsWithStatus/1`;

  axios.get(apiUrl).then((products) => {
    const allProducts = products.data;
    dispatch(setProducts(allProducts));
    if (products.data.length === 0) {
      dispatch(setEmpty(true));
    } else {
      dispatch(setEmpty(false));
    }
  });
};
export const updateProductStatus = (isApproved, productId) => async (
  dispatch
) => {
  const token = getToken();
  const apiUrl = `${API}/products/${productId}`;
  axios
    .put(
      apiUrl,
      {
        product_id: productId,
        status_id: isApproved ? 2 : 4,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    .then(
      (data) => {
        let action = "";
        isApproved ? (action = "approved") : (action = "rejected");
        SuccessAlert("Post has been " + action);
        history.push("/admin/pending");
      },
      (error) => {
        if (error.response.data.errors) {
          FailAlert(
            error.response.data.errors[0].param +
              ":" +
              error.response.data.errors[0].msg
          );
        } else {
          FailAlert(error.response.data.message);
        }
      }
    );
};
export const getCategories = () => async (dispatch) => {
  const apiUrl = `${API}/categories`;
  axios.get(apiUrl).then((categories) => {
    const response = categories.data;
    dispatch(setCategories(response));
  });
};

export const getProductAction = (id) => async (dispatch) => {
  const apiUrl = `${API}/products/${id}`;
  const token = localStorage.getItem("token");
  axios
    .get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((product) => {
      const response = product.data[0];
      console.log(product.data[0]);

      dispatch(setCurrentProduct(response));
    }).catch(e => {
      dispatch(push("/"));
    });
};

export const setFiltersAction = (filters) => async (dispatch) => {
  dispatch(setFilters(filters));
};

export const getProductsByUserAction = () => async (dispatch) => {
  const token = getToken();
  if (token === null) throw new Error("token does not exist");

  let apiUrl = `${API}/my-products`;

  axios
    .get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((products) => {
      const allProducts = products.data;

      console.log(allProducts);
      dispatch(setProducts(allProducts));
    });
};
export const saveProductAction = (product) => async (dispatch) => {
  try {
    let token = getToken();
    let data = new FormData();
    if (product && product.files) {
      console.log(product.files);
      if (product.files.length) {
        Array.from(product.files).forEach((img) => {
          data.append("images", img);
        });
      } else {
        data.append("images", product.files[0]);
      }
    }
    data.append("name", product.name ?? "");
    data.append("description", product.description);
    data.append("price", product.price);
    data.append("category_id", product.category);
    data.append("address", JSON.stringify(product.location));

    const response = await axios.post(`${API}/products/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addProduct(response.product));
    SuccessAlert('Post submitted for review');
    setTimeout(() => {
      dispatch(push('/'));
    }, 3000);
  } catch (error) {
    FailAlert("Create post failed");
  }
};

//deactivating a product by the user
export const updateProductStatusBySeller = (product, status) => async (
  dispatch
) => {
  try {
    const token = localStorage.getItem("token");
    const apiUrl = `${API}/products/${product.id}`;

    await axios.put(
      apiUrl,
      {
        product_id: product.id,
        status_id: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(
      updateProduct({
        ...product,
        status_id: status,
      })
    );
  } catch (e) {
    console.log(e);
  }
};
