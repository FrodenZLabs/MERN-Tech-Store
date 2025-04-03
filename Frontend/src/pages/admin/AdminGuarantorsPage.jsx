import { useEffect, useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlinePencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
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
  fetchAllGuarantorDetails,
  fetchGuarantorDetailsByID,
} from "../../services/userService";
import { HashLoader } from "react-spinners";

const AdminGuarantorsPage = () => {
  const [guarantorDetails, setGuarantorDetails] = useState([]); // State to store credit risks
  const [loading, setLoading] = useState(true); // State to track loading

  // Fetch credit risks data from the backend
  const fetchGuarantorsData = async () => {
    try {
      const response = await fetchAllGuarantorDetails();

      setGuarantorDetails(response.guarantor);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching credit risks:", err);
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchGuarantorsData();
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
              <BreadcrumbItem href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="">Home</span>
                </div>
              </BreadcrumbItem>
              <BreadcrumbItem href="/users/list">Guarantors</BreadcrumbItem>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              All Guarantors
            </h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 hidden items-center sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    id="users-search"
                    name="users-search"
                    placeholder="Search for users"
                  />
                </div>
              </form>
              <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                >
                  <span className="sr-only">Configure</span>
                  <HiCog className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                >
                  <span className="sr-only">Delete</span>
                  <HiTrash className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                >
                  <span className="sr-only">Purge</span>
                  <HiExclamationCircle className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                >
                  <span className="sr-only">Settings</span>
                  <HiDotsVertical className="text-2xl" />
                </a>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <AddUserModal />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <AllGuarantorsTable guarantorDetails={guarantorDetails} />
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </NavbarSidebar>
  );
};

const AddUserModal = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="purple" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Add user
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <ModalHeader className="border-b border-gray-200 !p-6">
          <strong>Add new user</strong>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <div className="mt-1">
                <TextInput
                  id="firstName"
                  name="firstName"
                  placeholder="Bonnie"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <div className="mt-1">
                <TextInput id="lastName" name="lastName" placeholder="Green" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="mt-1">
                <TextInput
                  id="email"
                  name="email"
                  placeholder="example@company.com"
                  type="email"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <div className="mt-1">
                <TextInput
                  id="phone"
                  name="phone"
                  placeholder="e.g., +(12)3456 789"
                  type="tel"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <div className="mt-1">
                <TextInput
                  id="department"
                  name="department"
                  placeholder="Development"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <div className="mt-1">
                <TextInput
                  id="company"
                  name="company"
                  placeholder="Somewhere"
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="purple" onClick={() => setOpen(false)}>
            Add user
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const AllGuarantorsTable = ({ guarantorDetails }) => {
  return (
    <Table className="min-w-full divide-y divide-gray-200">
      <TableHead className="bg-gray-100 text-center">
        <TableHeadCell>Guarantor Name</TableHeadCell>
        <TableHeadCell>Phone Number</TableHeadCell>
        <TableHeadCell>ID Number</TableHeadCell>
        <TableHeadCell>KRA Pin</TableHeadCell>
        <TableHeadCell>Gender</TableHeadCell>
        <TableHeadCell>Relationship To student</TableHeadCell>
        <TableHeadCell>Actions</TableHeadCell>
      </TableHead>
      <TableBody className="divide-y divide-gray-200 bg-white">
        {guarantorDetails.map((guarantor, index) => (
          <TableRow key={index} className="hover:bg-gray-100 text-center">
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              {guarantor.full_name}
            </TableCell>
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              {guarantor.phone_no}
            </TableCell>
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              {guarantor.id_number}
            </TableCell>
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              {guarantor.kra_pin}
            </TableCell>
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              {guarantor.gender}
            </TableCell>
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              {guarantor.relationship_to_student}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-x-3 whitespace-nowrap">
                <ViewGuarantorModal guarantorId={guarantor._id} />
                <DeleteUserModal />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const ViewGuarantorModal = ({ guarantorId }) => {
  const [isOpen, setOpen] = useState(false);
  const [guarantorData, setGuarantorData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && guarantorId) {
      fetchGuarantorData(guarantorId); // Fetch data only when modal is open and ID is available
    }
  }, [isOpen, guarantorId]);

  const fetchGuarantorData = async (guarantorId) => {
    setLoading(true);
    try {
      const response = await fetchGuarantorDetailsByID(guarantorId);
      setGuarantorData(response.guarantor);
    } catch (err) {
      console.error("Failed to fetch credit data.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button color="blue" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiOutlinePencilAlt className="text-lg" />
          View guarantor
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <ModalHeader className="border-b border-gray-200 !p-6">
          <strong>View Guarantor</strong>
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : !guarantorData ? (
            <p className="text-red-500 text-center">
              No guarantor data available.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <div className="mt-1">
                  <TextInput
                    id="fullName"
                    name="fullName"
                    value={guarantorData?.full_name || "N/A"}
                    readOnly
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="mt-1">
                  <TextInput
                    id="phone"
                    name="phone"
                    value={guarantorData?.phone_no || "N/A"}
                    readOnly
                  />
                </div>
              </div>

              {/* ID Number */}
              <div>
                <Label htmlFor="idNumber">ID Number</Label>
                <div className="mt-1">
                  <TextInput
                    id="idNumber"
                    name="idNumber"
                    value={guarantorData?.id_number || "N/A"}
                    readOnly
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <Label htmlFor="gender">Gender</Label>
                <div className="mt-1">
                  <TextInput
                    id="gender"
                    name="gender"
                    value={guarantorData?.gender || "N/A"}
                    readOnly
                  />
                </div>
              </div>

              {/* KRA PIN */}
              <div>
                <Label htmlFor="kraPin">KRA PIN</Label>
                <div className="mt-1">
                  <TextInput
                    id="kraPin"
                    name="kraPin"
                    value={guarantorData?.kra_pin || "N/A"}
                    readOnly
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <div className="mt-1">
                  <TextInput
                    id="dob"
                    name="dob"
                    value={
                      guarantorData?.date_of_birth
                        ? new Date(
                            guarantorData.date_of_birth
                          ).toLocaleDateString()
                        : "N/A"
                    }
                    readOnly
                  />
                </div>
              </div>

              {/* Marital Status */}
              <div>
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <div className="mt-1">
                  <TextInput
                    id="maritalStatus"
                    name="maritalStatus"
                    value={guarantorData?.marital_status || "N/A"}
                    readOnly
                  />
                </div>
              </div>

              {/* Number of Dependents */}
              <div>
                <Label htmlFor="dependants">Number of Dependents</Label>
                <div className="mt-1">
                  <TextInput
                    id="dependants"
                    name="dependants"
                    value={guarantorData?.no_of_dependants || "N/A"}
                    readOnly
                  />
                </div>
              </div>

              {/* Education Level */}
              <div>
                <Label htmlFor="educationLevel">Education Level</Label>
                <div className="mt-1">
                  <TextInput
                    id="educationLevel"
                    name="educationLevel"
                    value={guarantorData?.education_level || "N/A"}
                    readOnly
                  />
                </div>
              </div>

              {/* Relationship to Student */}
              <div>
                <Label htmlFor="relationship">Relationship to Student</Label>
                <div className="mt-1">
                  <TextInput
                    id="relationship"
                    name="relationship"
                    value={guarantorData?.relationship_to_student || "N/A"}
                    readOnly
                  />
                </div>
              </div>

              {/* Client Details */}
              <div>
                <Label htmlFor="clientFirstName">Client First Name</Label>
                <div className="mt-1">
                  <TextInput
                    id="clientFirstName"
                    name="clientFirstName"
                    value={guarantorData?.authId?.clientId?.first_name || "N/A"}
                    readOnly
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="clientLastName">Client Last Name</Label>
                <div className="mt-1">
                  <TextInput
                    id="clientLastName"
                    name="clientLastName"
                    value={guarantorData?.authId?.clientId?.last_name || "N/A"}
                    readOnly
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="clientIdEmail">Client Email</Label>
                <div className="mt-1">
                  <TextInput
                    id="clientIdEmail"
                    name="clientIdEmail"
                    value={guarantorData?.authId?.email || "N/A"}
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="red" onClick={() => setOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const DeleteUserModal = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="red" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiTrash className="text-lg" />
          Delete user
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <ModalHeader className="px-6 pb-2 pt-3">
          <span className="sr-only">Delete user</span>
        </ModalHeader>
        <ModalBody className="px-6 py-6">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-500" />
            <p className="text-xl text-gray-500">
              Are you sure you want to delete this user?
            </p>
            <div className="flex items-center gap-x-5">
              <Button color="red" onClick={() => setOpen(false)}>
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

const Pagination = () => {
  return (
    <div className="sticky bottom-0 right-0 w-full items-center border-t border-gray-200 bg-white p-4 sm:flex sm:justify-between">
      <div className="mb-4 flex items-center sm:mb-0">
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <span className="sr-only">Previous page</span>
          <HiChevronLeft className="text-2xl" />
        </a>
        <a
          href="#"
          className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <span className="sr-only">Next page</span>
          <HiChevronRight className="text-2xl" />
        </a>
        <span className="text-sm font-normal text-gray-500">
          Showing&nbsp;
          <span className="font-semibold text-gray-900">1-20</span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900">2290</span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
        >
          <HiChevronLeft className="mr-1 text-base" />
          Previous
        </a>
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
        >
          Next
          <HiChevronRight className="ml-1 text-base" />
        </a>
      </div>
    </div>
  );
};

export default AdminGuarantorsPage;
