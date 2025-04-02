import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
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
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const AdminCreditScoresPage = () => {
  return (
    <NavbarSidebar isFooter={false}>
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
              <BreadcrumbItem>Credit Scores</BreadcrumbItem>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              All Credit Scores
            </h1>
          </div>
          <div className="block items-center sm:flex">
            <SearchForProducts />
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
              <AddProductModal />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <ProductsTable />
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebar>
  );
};

const SearchForProducts = () => {
  return (
    <form action="#" className="mb-4 sm:mb-0 sm:pr-3">
      <Label htmlFor="products-search" className="sr-only">
        Search
      </Label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        <TextInput
          id="products-search"
          name="products-search"
          placeholder="Search for products"
        />
      </div>
    </form>
  );
};

const AddProductModal = () => {
  const [isOpen, setOpen] = useState(false);
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
                <Label htmlFor="productName">Product Name</Label>
                <TextInput
                  id="productName"
                  name="productName"
                  placeholder="Apple iMac 27"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <TextInput
                  id="category"
                  name="category"
                  placeholder="Electronics"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder="Apple"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  name="price"
                  placeholder="Kshs. 5,200"
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="productDetails">Product Details</Label>
                <TextInput
                  id="productDetails"
                  name="productDetails"
                  placeholder="Enter product details"
                  className="mt-1"
                  rows={6}
                />
              </div>
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <Label
                    htmlFor="dropzone-file"
                    className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <FileInput id="dropzone-file" className="hidden" />
                  </Label>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="purple" onClick={() => setOpen(false)}>
            Add product
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const EditProductModal = () => {
  const [isOpen, setOpen] = useState(false);
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
          <form action="">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="productName">Product Name</Label>
                <TextInput
                  id="productName"
                  name="productName"
                  placeholder="Apple iMac 27"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <TextInput
                  id="category"
                  name="category"
                  placeholder="Electronics"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder="Apple"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  name="price"
                  placeholder="Kshs. 5,200"
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="productDetails">Product Details</Label>
                <TextInput
                  id="productDetails"
                  name="productDetails"
                  placeholder="Enter product details"
                  className="mt-1"
                  rows={6}
                />
              </div>
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <Label
                    htmlFor="dropzone-file"
                    className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600">
                        <span className="font-semibold">Upload a file</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <FileInput id="dropzone-file" className="hidden" />
                  </Label>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="green" onClick={() => setOpen(false)}>
            Save all
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const DeleteProductModal = () => {
  const [isOpen, setOpen] = useState(false);

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
              <Button color="purple" onClick={() => setOpen(false)}>
                Yes, I'm sure
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

const ProductsTable = () => {
  return (
    <Table className="min-w-full divide-y divide-gray-200">
      <TableHead className="bg-gray-100">
        <TableHeadCell>
          <span className="sr-only">Toggle selected</span>
          <Checkbox />
        </TableHeadCell>
        <TableHeadCell>Product Name</TableHeadCell>
        <TableHeadCell>Technology</TableHeadCell>
        <TableHeadCell>ID</TableHeadCell>
        <TableHeadCell>Price</TableHeadCell>
        <TableHeadCell>Actions</TableHeadCell>
      </TableHead>
      <TableBody className="divide-y divide-gray-200 bg-white">
        <TableRow className="hover:bg-gray-100">
          <TableCell className="w-4 p-4">
            <Checkbox />
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500">
            <div className="text-base font-semibold text-gray-900">
              Education Dashboard
            </div>
            <div className="text-sm font-normal text-gray-500">
              Html templates
            </div>
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
            Angular
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
            Kshs. 7,500
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
            Kshs. 1000
          </TableCell>
          <TableCell className="space-x-2 whitespace-nowrap p-4">
            <div className="flex items-center gap-x-3">
              <EditProductModal />
              <DeleteProductModal />
            </div>
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-gray-100">
          <TableCell className="w-4 p-4">
            <Checkbox />
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500">
            <div className="text-base font-semibold text-gray-900">
              Education Dashboard
            </div>
            <div className="text-sm font-normal text-gray-500">
              Html templates
            </div>
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
            Angular
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
            Kshs. 7,500
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
            Kshs. 1000
          </TableCell>
          <TableCell className="space-x-2 whitespace-nowrap p-4">
            <div className="flex items-center gap-x-3">
              <EditProductModal />
              <DeleteProductModal />
            </div>
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-gray-100">
          <TableCell className="w-4 p-4">
            <Checkbox />
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500">
            <div className="text-base font-semibold text-gray-900">
              Education Dashboard
            </div>
            <div className="text-sm font-normal text-gray-500">
              Html templates
            </div>
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
            Angular
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
            Kshs. 7,500
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
            Kshs. 1000
          </TableCell>
          <TableCell className="space-x-2 whitespace-nowrap p-4">
            <div className="flex items-center gap-x-3">
              <EditProductModal />
              <DeleteProductModal />
            </div>
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-gray-100">
          <TableCell className="w-4 p-4">
            <Checkbox />
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500">
            <div className="text-base font-semibold text-gray-900">
              Education Dashboard
            </div>
            <div className="text-sm font-normal text-gray-500">
              Html templates
            </div>
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
            Angular
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
            Kshs. 7,500
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
            Kshs. 1000
          </TableCell>
          <TableCell className="space-x-2 whitespace-nowrap p-4">
            <div className="flex items-center gap-x-3">
              <EditProductModal />
              <DeleteProductModal />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default AdminCreditScoresPage;
