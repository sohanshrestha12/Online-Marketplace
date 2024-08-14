import { User } from "@/Types/Auth";
import { Card } from "./ui/card";

interface CustomersTableProps {
  Customers: User[];
}

const CustomersTable = ({ Customers }: CustomersTableProps) => {
  return (
    <Card className="col-span-4 h-fit">
      <div className="px-3 py-3  bg-slate-100">
        <h2 className="font-semibold"> Yours Customers</h2>
      </div>
      <div className="w-100 h-[1px] bg-gray-300 mb-2"></div>

      {/* table  */}
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 w-1/3 text-center">
                  Customer Profile
                </th>
                <th className="px-6 py-3 w-2/3">Username</th>
              </tr>
            </thead>
            <tbody>
              {Customers.map((customer) => (
                <tr className="odd:bg-white odd:dark:bg-gray-900  hover:bg-gray-50 dark:hover:bg-gray-600 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-2 w-1/3 align-middle text-center break-all">
                    <img
                      className="rounded-full w-[50px] h-[50px] inline-block"
                      src={`http://localhost:5100/${customer.profileImage}`}
                      alt="Profile image not found"
                    />
                  </td>
                  <td className="px-6 py-4 w-2/3 break-all">
                    {customer.username}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default CustomersTable;
