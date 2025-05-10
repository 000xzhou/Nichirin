import { Link } from "react-router-dom";
import "./addresslist.css";
import usePatch from "../hooks/usePatch";
import useDelele from "../hooks/useDelete";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";

function Address({
  id,
  name,
  line1,
  line2,
  city,
  state,
  country,
  isDefault,
  refetch,
}) {
  const { isUser, setIsUser } = useCustomerAuth();

  const { setDefaultAdress, error: patchError } = usePatch(
    null,
    `/address/default-address/${id}/${isUser._id}`,
    "/customers/addresses"
  );
  const { handleDelete, error: deleteError } = useDelele(
    `/address/remove-address/${id}`
  );

  return (
    <li
      id={id}
      key={id}
      className={`user-address-container ${isDefault ? "is-default" : ""}`}
    >
      <div>
        <h5>{name}</h5>
        <p>{line1}</p>
        <p>{line2 ? line2 : ""}</p>
        <p>
          {city} {state}
        </p>
        <p>{country}</p>
      </div>
      <div>
        <Link to={`edit/${id}`}>Edit</Link> |{" "}
        <Link
          onClick={() => {
            handleDelete().then(() => {
              refetch();
            });
          }}
        >
          Remove
        </Link>
        {!isDefault && (
          <>
            {" | "}
            <Link onClick={setDefaultAdress}>Set as Default</Link>
          </>
        )}
      </div>
    </li>
  );
}

export default Address;
