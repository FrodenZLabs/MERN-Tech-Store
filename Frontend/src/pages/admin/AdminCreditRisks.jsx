import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
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
} from "react-icons/hi";
import { useEffect, useState } from "react";
import {
  fetchAllCreditRiskByID,
  fetchAllCreditRisks,
} from "../../services/userService";
import { FadeLoader, HashLoader } from "react-spinners";

const AdminCreditRisksPage = () => {
  const [creditRisks, setCreditRisks] = useState([]); // State to store credit risks
  const [loading, setLoading] = useState(true); // State to track loading

  // Fetch credit risks data from the backend
  const fetchCreditRisksData = async () => {
    try {
      const response = await fetchAllCreditRisks();

      setCreditRisks(response.creditRisks);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching credit risks:", err);
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCreditRisksData();
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
              <BreadcrumbItem>Credit Risks</BreadcrumbItem>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              All Credit Risks
            </h1>
          </div>
          <div className="block items-center sm:flex">
            <SearchForCredits />
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
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <CreditsTable creditRisks={creditRisks} />
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebar>
  );
};

const SearchForCredits = () => {
  return (
    <form action="#" className="mb-4 sm:mb-0 sm:pr-3">
      <Label htmlFor="credit-search" className="sr-only">
        Search
      </Label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        <TextInput
          id="credit-search"
          name="credit-search"
          placeholder="Search for credit risk scores"
        />
      </div>
    </form>
  );
};

const ViewCreditModal = ({ creditRiskId, getRiskLevel }) => {
  const [isOpen, setOpen] = useState(false);
  const [creditData, setCreditData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && creditRiskId) {
      fetchCreditData(creditRiskId); // Fetch data only when modal is open and ID is available
    }
  }, [isOpen, creditRiskId]);

  const fetchCreditData = async (creditRiskId) => {
    setLoading(true);
    try {
      const response = await fetchAllCreditRiskByID(creditRiskId);
      setCreditData(response.creditRisk); // Assuming single credit risk per user
    } catch (err) {
      console.error("Failed to fetch credit data.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button color="blue" onClick={() => setOpen(!isOpen)}>
        <HiPencilAlt className="mr-3 text-lg" />
        View item
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <ModalHeader className="border-b border-gray-200 !p-6">
          <strong>View Credit Risk Scores</strong>
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <div className="flex justify-center items-center">
              <FadeLoader color="#ffcb00" size={200} />
            </div>
          ) : !creditData ? (
            <p className="text-center text-red-500">No data available.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Personal Information */}
              <div>
                <Label>Full Name</Label>
                <TextInput
                  value={
                    creditData?.authId?.clientId?.first_name &&
                    creditData?.authId?.clientId?.last_name
                      ? `${creditData.authId.clientId.first_name} ${creditData.authId.clientId.last_name}`
                      : "N/A"
                  }
                  readOnly
                />
              </div>
              <div>
                <Label>ID Number</Label>
                <TextInput
                  value={creditData?.authId?.clientId?.id_number || "N/A"}
                  readOnly
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <TextInput
                  value={creditData?.authId?.clientId?.phone_no || "N/A"}
                  readOnly
                />
              </div>
              <div>
                <Label>Marital Status</Label>
                <TextInput
                  value={creditData?.marital_status || "N/A"}
                  readOnly
                />
              </div>
              <div>
                <Label>Education Level</Label>
                <TextInput
                  value={creditData?.education_level || "N/A"}
                  readOnly
                />
              </div>

              {/* Financial Details */}
              <div>
                <Label>Income (KES)</Label>
                <TextInput
                  value={creditData?.income_in_kes || "N/A"}
                  readOnly
                />
              </div>
              <div>
                <Label>Additional Income (KES)</Label>
                <TextInput
                  value={creditData?.additional_income || "N/A"}
                  readOnly
                />
              </div>
              <div>
                <Label>Employment Status</Label>
                <TextInput
                  value={creditData?.employment_status || "N/A"}
                  readOnly
                />
              </div>
              <div>
                <Label>Employment Length (Years)</Label>
                <TextInput
                  value={creditData?.employment_length || "N/A"}
                  readOnly
                />
              </div>

              {/* Guarantor Details */}
              <div>
                <Label>Guarantor Name</Label>
                <TextInput
                  value={creditData?.authId?.guarantorId?.full_name || "N/A"}
                  readOnly
                />
              </div>
              <div>
                <Label>Guarantor Credit Score</Label>
                <TextInput
                  value={creditData?.guarantor_credit_score || "N/A"}
                  readOnly
                />
              </div>
              <div>
                <Label>Guarantor Relationship</Label>
                <TextInput
                  value={
                    creditData?.authId?.guarantorId?.relationship_to_student ||
                    "N/A"
                  }
                  readOnly
                />
              </div>

              {/* Credit Risk Details */}
              <div>
                <Label>Risk Score</Label>
                <TextInput
                  value={getRiskLevel(creditData?.risk_score) || "N/A"}
                  readOnly
                />
              </div>
              <div>
                <Label>Existing Loans</Label>
                <TextInput
                  value={creditData?.existing_loans ? "Yes" : "No"}
                  readOnly
                />
              </div>
              <div>
                <Label>Outstanding Loan Amount</Label>
                <TextInput
                  value={`Kshs. ${
                    creditData?.outstanding_loan_amount || "N/A"
                  }`}
                  readOnly
                />
              </div>
              <div>
                <Label>Monthly Repayment Amount</Label>
                <TextInput
                  value={`Kshs. ${
                    creditData?.monthly_repayment_amount || "N/A"
                  }`}
                  readOnly
                />
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

const CreditsTable = ({ creditRisks }) => {
  // Function to map risk score to risk level
  const getRiskLevel = (riskScore) => {
    switch (riskScore) {
      case 0:
        return "Low";
      case 1:
        return "Medium";
      case 2:
        return "High";
      default:
        return "Unknown"; // Handle unexpected values gracefully
    }
  };

  return (
    <Table className="min-w-full divide-y divide-gray-200">
      <TableHead className="bg-gray-100 text-center">
        <TableHeadCell>Client Name</TableHeadCell>
        <TableHeadCell>Guarantor Name</TableHeadCell>
        <TableHeadCell>Relationship To Student</TableHeadCell>
        <TableHeadCell>Credit Score</TableHeadCell>
        <TableHeadCell>Credit Risk</TableHeadCell>
        <TableHeadCell>Actions</TableHeadCell>
      </TableHead>
      <TableBody className="divide-y divide-gray-200 bg-white">
        {creditRisks.map((risk, index) => (
          <TableRow key={index} className="hover:bg-gray-100 text-center">
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              {risk.authId.clientId.first_name} {risk.authId.clientId.last_name}
            </TableCell>
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              {risk.authId.guarantorId.full_name}
            </TableCell>
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              {risk.authId.guarantorId.relationship_to_student}
            </TableCell>
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              {risk.guarantor_credit_score}
            </TableCell>
            <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
              {getRiskLevel(risk.risk_score)}
            </TableCell>
            <TableCell className="space-x-2 whitespace-nowrap p-4">
              <div className="flex items-center gap-x-3">
                <ViewCreditModal
                  creditRiskId={risk._id}
                  getRiskLevel={getRiskLevel}
                />
                <DeleteProductModal />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminCreditRisksPage;
