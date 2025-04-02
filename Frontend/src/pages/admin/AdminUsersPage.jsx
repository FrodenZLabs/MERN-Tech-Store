import { useState } from "react";
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

const AdminUsersPage = () => {
  return (
    <NavbarSidebar isFooter={false}>
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
              <BreadcrumbItem href="/users/list">Users</BreadcrumbItem>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              All users
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
              <AllUsersTable />
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

const AllUsersTable = () => {
  return (
    <Table className="min-w-full divide-y divide-gray-200">
      <TableHead className="bg-gray-100">
        <TableHeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Position</TableHeadCell>
        <TableHeadCell>Country</TableHeadCell>
        <TableHeadCell>Status</TableHeadCell>
        <TableHeadCell>Actions</TableHeadCell>
      </TableHead>
      <TableBody className="divide-y divide-gray-200 bg-white">
        <TableRow className="hover:bg-gray-100">
          <TableCell className="w-4 p-4">
            <div className="flex items-center">
              <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
              <label htmlFor="checkbox-1" className="sr-only">
                checkbox
              </label>
            </div>
          </TableCell>
          <TableCell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
            <img
              className="h-10 w-10 rounded-full"
              src="../../images/users/neil-sims.png"
              alt="Neil Sims avatar"
            />
            <div className="text-sm font-normal text-gray-500">
              <div className="text-base font-semibold text-gray-900">
                Neil Sims
              </div>
              <div className="text-sm font-normal text-gray-500">
                neil.sims@flowbite.com
              </div>
            </div>
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
            Front-end developer
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
            United States
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-normal text-gray-900">
            <div className="flex items-center">
              <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>{" "}
              Active
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-x-3 whitespace-nowrap">
              <EditUserModal />
              <DeleteUserModal />
            </div>
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-gray-100">
          <TableCell className="w-4 p-4">
            <div className="flex items-center">
              <input
                id="checkbox-2"
                aria-describedby="checkbox-1"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-4 focus:ring-primary-300"
              />
              <label htmlFor="checkbox-2" className="sr-only">
                checkbox
              </label>
            </div>
          </TableCell>
          <TableCell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
            <img
              className="h-10 w-10 rounded-full"
              src="../../images/users/roberta-casas.png"
              alt="Roberta Casas avatar"
            />
            <div className="text-sm font-normal text-gray-500">
              <div className="text-base font-semibold text-gray-900">
                Roberta Casas
              </div>
              <div className="text-sm font-normal text-gray-500">
                roberta.casas@flowbite.com
              </div>
            </div>
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
            Designer
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
            Spain
          </TableCell>
          <TableCell className="whitespace-nowrap p-4 text-base font-normal text-gray-900">
            <div className="flex items-center">
              <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>{" "}
              Active
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-x-3 whitespace-nowrap">
              <EditUserModal />
              <DeleteUserModal />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const EditUserModal = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="green" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiOutlinePencilAlt className="text-lg" />
          Edit user
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <ModalHeader className="border-b border-gray-200 !p-6">
          <strong>Edit user</strong>
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
            <div>
              <Label htmlFor="passwordCurrent">Current password</Label>
              <div className="mt-1">
                <TextInput
                  id="passwordCurrent"
                  name="passwordCurrent"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">New password</Label>
              <div className="mt-1">
                <TextInput
                  id="passwordNew"
                  name="passwordNew"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>
          </div>
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

export default AdminUsersPage;
