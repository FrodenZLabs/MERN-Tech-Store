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
import { fetchAllPayments } from "../../services/paymentService";
import { HashLoader } from "react-spinners";

const AdminPaymentsPage = () => {
  const [payments, setPayments] = useState([]); // State to store credit risks
  const [loading, setLoading] = useState(true); // State to track loading

  // Function to fetch payments (with optional search parameter)
  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await fetchAllPayments(); // Fetch payments
      setPayments(response.payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch payments when the page loads or when search term changes
  useEffect(() => {
    fetchPayments();
  }, []);

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
              <BreadcrumbItem>Payments</BreadcrumbItem>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              All Payments
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <PaymentsTable payments={payments} />
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebar>
  );
};

const ViewPaymentModal = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button color="blue" onClick={() => setOpen(!isOpen)}>
        <HiPencilAlt className="mr-3 text-lg" />
        View payment
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <ModalHeader className="border-b border-gray-200 !p-6">
          <strong>View Payment</strong>
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
            Close
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

const PaymentsTable = ({ payments }) => {
  // Truncate title after a few words (e.g., 5 words)
  const truncateTitle = (title, wordLimit = 4) => {
    const words = title?.split(" ");
    return words?.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : title;
  };

  return (
    <Table className="min-w-full divide-y divide-gray-200">
      <TableHead className="bg-gray-100 text-center">
        <TableHeadCell>Product Name</TableHeadCell>
        <TableHeadCell>Category</TableHeadCell>
        <TableHeadCell>Repayment Plan (Months)</TableHeadCell>
        <TableHeadCell>Total Price</TableHeadCell>
        <TableHeadCell>Remaining Balance</TableHeadCell>
        <TableHeadCell>Payment Status</TableHeadCell>
        <TableHeadCell>Actions</TableHeadCell>
      </TableHead>
      <TableBody className="divide-y divide-gray-200 bg-white">
        {payments.map((payment, index) => (
          <TableRow key={index} className="hover:bg-gray-100 text-center">
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              <div className="text-base font-semibold text-gray-900">
                {truncateTitle(payment.items[0].productId.title)}
              </div>
              <div className="text-sm font-normal text-gray-500">
                Quantity: {payment.items[0].quantity}
              </div>
            </TableCell>
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              {payment.items[0].productId.category}
            </TableCell>
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              {payment.items[0].repayment_plan} Months
            </TableCell>
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              Kshs.{" "}
              {payment.total_price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </TableCell>
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              Kshs.{" "}
              {payment.remaining_balance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </TableCell>
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              {payment.payment_status.charAt(0).toUpperCase() +
                payment.payment_status.slice(1)}
            </TableCell>
            <TableCell className="space-x-2 whitespace-nowrap p-4">
              <div className="flex items-center gap-x-3">
                <ViewPaymentModal />
                <DeleteProductModal />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminPaymentsPage;
