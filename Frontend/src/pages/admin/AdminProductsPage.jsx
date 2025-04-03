import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Textarea,
  TextInput,
} from "flowbite-react";
import NavbarSidebar from "../../layouts/NavbarSidebar";
import {
  HiCog,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiPencilAlt,
  HiTrash,
  HiUpload,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  fetchProductsByID,
  updateProduct,
} from "../../services/productService";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";

const AdminProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });
  const [selectedType, setSelectedType] = useState({
    Laptop: false,
    notebook: false,
    phone: false,
    speaker: false,
  });
  const [sortOrder, setSortOrder] = useState("createdAt_desc");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Truncate title after a few words (e.g., 5 words)
  const truncateTitle = (title, wordLimit = 5) => {
    const words = title.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : title;
  };

  const loadProducts = async () => {
    setLoading(true);
    const filters = {
      searchTerm,
      ...selectedAvailability,
      selectedType,
      sortOrder,
    };
    const fetchedProducts = await fetchProducts(filters);
    setProducts(fetchedProducts);
    setLoading(false);
  };

  // Handle change of search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fetch products from the backend API
  useEffect(() => {
    loadProducts();
  }, [searchTerm]);

  return (
    <NavbarSidebar isFooter={false}>
      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <HashLoader color="#ffcb00" size={200} />
        </div>
      )}

      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <BreadcrumbItem href="">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="">Home</span>
                </div>
              </BreadcrumbItem>
              <BreadcrumbItem>Products</BreadcrumbItem>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              All Products
            </h1>
          </div>
          <div className="block items-center sm:flex">
            <form className="lg:pr-3">
              <Label htmlFor="users-search" className="sr-only">
                Search
              </Label>
              <div className="relative mt-1 lg:w-64 xl:w-96">
                <TextInput
                  id="users-search"
                  name="users-search"
                  placeholder="Search for departments"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </form>
            <div className="hidden space-x-1 border-l border-gray-100 pl-2 md:flex">
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="sr-only">Configure</span>
                <HiCog className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-text cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="sr-only">Delete</span>
                <HiTrash className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-text cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="sr-only">Purge</span>
                <HiExclamationCircle className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-text cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="sr-only">Settings</span>
                <HiDotsVertical className="text-2xl" />
              </a>
            </div>
            <div className="flex w-full items-center sm:justify-end">
              <AddProductModal loadProducts={loadProducts} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <ProductsTable
                products={products}
                truncateTitle={truncateTitle}
                loadProducts={loadProducts}
              />
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebar>
  );
};

const SearchForProducts = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Pass the trimmed search term to the parent component
    setSearchTerm(inputValue.trim());
  };

  return (
    <form nSubmit={handleSearch} className="mb-4 sm:mb-0 sm:pr-3">
      <Label htmlFor="products-search" className="sr-only">
        Search
      </Label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        <TextInput
          id="products-search"
          name="products-search"
          placeholder="Search for products"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </form>
  );
};

const AddProductModal = ({ loadProducts }) => {
  const [isOpen, setOpen] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    category: "",
    stock: "",
    base_price: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 6) {
      alert("You can only upload up to 6 images.");
      return;
    }
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (images.length > 0) {
        images.forEach((image) => {
          formData.append("images", image.file);
        });
      }

      await addProduct(formData);
      toast.success("Product added successfully!");
      setOpen(false);
      if (loadProducts) {
        loadProducts();
      }

      // Reset form
      setProductData({
        title: "",
        category: "",
        stock: "",
        base_price: "",
        description: "",
      });
      setImages([]);
      setLoading(false);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
      setLoading(false);
    }
  };

  return (
    <>
      <Button color="purple" onClick={() => setOpen(!isOpen)}>
        <FaPlus className="mr-3 text-sm" />
        Add product
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <ModalHeader className="border-b border-gray-200 !p-6">
          <strong>Add Product</strong>
        </ModalHeader>
        <ModalBody>
          <form action="">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="title">Product Title</Label>
                <TextInput
                  id="title"
                  name="title"
                  placeholder="Product Title"
                  className="mt-1"
                  value={productData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <TextInput
                  id="category"
                  name="category"
                  placeholder="Category"
                  className="mt-1"
                  value={productData.category}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <TextInput
                  id="stock"
                  name="stock"
                  placeholder="Stock"
                  className="mt-1"
                  value={productData.stock}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="base_price">Base Price</Label>
                <TextInput
                  id="base_price"
                  name="base_price"
                  placeholder="Price (KES)"
                  className="mt-1"
                  value={productData.base_price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="description">Product Details</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter product description"
                  className="mt-1"
                  rows={4}
                  value={productData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <Label
                    htmlFor="multiple-file-upload"
                    className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600">
                        <span className="font-semibold">
                          Upload multiple files (6 max)
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <FileInput
                      id="multiple-file-upload"
                      multiple
                      accept="image/png, image/jpeg, image/jpg, image/gif, image/svg+xml"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </Label>
                </div>
              </div>

              {/* Display Image Previews */}
              <div className="lg:col-span-2">
                <div className="mt-4 flex  gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <img
                        src={image.url}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 cursor-pointer rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="purple" onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const EditProductModal = ({ productId, loadProducts }) => {
  const [isOpen, setOpen] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    category: "",
    stock: "",
    base_price: "",
    description: "",
  });
  const [originalProductData, setOriginalProductData] = useState({});
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 6) {
      alert("You can only upload up to 6 images.");
      return;
    }
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isOpen && productId) {
      fetchProductData();
    }
  }, [isOpen, productId]);

  const fetchProductData = async () => {
    try {
      const response = await fetchProductsByID(productId);
      const { title, category, stock, base_price, description, images } =
        response;
      setProductData({ title, category, stock, base_price, description });
      setOriginalProductData({
        title,
        category,
        stock,
        base_price,
        description,
      });
      setExistingImages(images || []);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedFields = {};
      Object.keys(productData).forEach((key) => {
        if (productData[key] !== originalProductData[key]) {
          updatedFields[key] = productData[key];
        }
      });

      if (
        images.length === 0 &&
        existingImages.length === originalProductData.images?.length
      ) {
        delete updatedFields.images;
      }

      const formData = new FormData();
      Object.entries(updatedFields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (images.length > 0) {
        images.forEach((image) => {
          formData.append("images", image.file);
        });
      }

      await updateProduct(productId, formData);
      toast.success("Product updated successfully!");
      setOpen(false);
      if (loadProducts) {
        loadProducts();
      }

      setLoading(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
      setLoading(false);
    }
  };

  return (
    <>
      <Button color="green" onClick={() => setOpen(!isOpen)}>
        <HiPencilAlt className="mr-3 text-lg" />
        Edit item
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <ModalHeader className="border-b border-gray-200 !p-6">
          <strong>Edit Product</strong>
        </ModalHeader>
        <ModalBody>
          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="title">Product Title</Label>
                <TextInput
                  id="title"
                  name="title"
                  placeholder="Product Title"
                  className="mt-1"
                  value={productData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <TextInput
                  id="category"
                  name="category"
                  placeholder="Category"
                  className="mt-1"
                  value={productData.category}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <TextInput
                  id="stock"
                  name="stock"
                  placeholder="Stock Levels"
                  className="mt-1"
                  value={productData.stock}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="base_price">Base Price</Label>
                <TextInput
                  id="base_price"
                  name="base_price"
                  placeholder="Price (KES)"
                  className="mt-1"
                  value={productData.base_price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="description">Product Details</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter product description"
                  className="mt-1"
                  rows={4}
                  value={productData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="lg:col-span-2">
                <Label>Existing Images</Label>
                <div className="mt-4 flex gap-4">
                  {existingImages.map((image, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <img
                        src={image}
                        alt={`existing-${index}`}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <Label
                    htmlFor="multiple-file-upload"
                    className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600">
                        <span className="font-semibold">
                          Upload multiple files (6 max)
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <FileInput
                      id="multiple-file-upload"
                      multiple
                      accept="image/png, image/jpeg, image/jpg, image/gif, image/svg+xml"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </Label>
                </div>
              </div>

              {/* Display Image Previews */}
              <div className="lg:col-span-2">
                <div className="mt-4 flex  gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <img
                        src={image.url}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 cursor-pointer rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="green" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save all"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const DeleteProductModal = ({ productId, loadProducts }) => {
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProduct(productId);
      toast.success("Product deleted successfully!");

      if (loadProducts) {
        loadProducts(); // Refresh product list
      }
      setOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button color="red" onClick={() => setOpen(!isOpen)}>
        <HiTrash className="mr-2 text-lg" />
        Delete Item
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <ModalHeader className="px-3 pb-0 pt-2">
          <span className="sr-only">Delete product</span>
        </ModalHeader>
        <ModalBody className="px-6 py-6">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-600" />
            <p className="text-lg text-gray-500">
              Are you sure you want to delete this product?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="red" onClick={handleDelete}>
                {loading ? "Deleting..." : "Yes I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

const ProductsTable = ({ products, truncateTitle, loadProducts }) => {
  return (
    <Table className="min-w-full divide-y divide-gray-200">
      <TableHead className="bg-gray-100">
        <TableRow className="text-center">
          <TableHeadCell>Image</TableHeadCell>
          <TableHeadCell>Title</TableHeadCell>
          <TableHeadCell>Category</TableHeadCell>
          <TableHeadCell>Price (KES)</TableHeadCell>
          <TableHeadCell>Stock</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody className="divide-y divide-gray-200 bg-white">
        {products.length > 0 ? (
          products.map((product) => (
            <TableRow
              key={product._id}
              className="hover:bg-gray-100 text-center"
            >
              <TableCell>
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </TableCell>
              <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
                {truncateTitle(product.title, 5)}
              </TableCell>
              <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
                {product.category}
              </TableCell>
              <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
                KES {product.base_price.toLocaleString()}
              </TableCell>
              <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
                {product.stock > 0 ? product.stock : "Out of Stock"}
              </TableCell>
              <TableCell className="space-x-2 whitespace-nowrap p-4">
                <div className="flex items-center gap-x-3">
                  <EditProductModal
                    productId={product._id}
                    loadProducts={loadProducts}
                  />
                  <DeleteProductModal
                    productId={product._id}
                    loadProducts={loadProducts}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="6" className="text-center">
              No products found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AdminProductsPage;
