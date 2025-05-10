import usePatch from "../hooks/usePatch";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";
import { useParams } from "react-router-dom";
import useGet from "../hooks/useGet";
import EditAddressForm from "./EditAddressForm";

function EditAddress() {
  // USA shipping only. country should auto fill as usa
  const { addressId } = useParams();

  const {
    apiData,
    loading,
    error: userError,
  } = useGet(`/address/find/${addressId}`);

  if (loading) return <div>...loading...</div>;

  return (
    <EditAddressForm
      id={apiData.address._id}
      line1={apiData.address.line1}
      line2={apiData.address.line2}
      city={apiData.address.city}
      state={apiData.address.state}
      postal_code={apiData.address.postal_code}
      country="usa"
    />
  );
}

export default EditAddress;
