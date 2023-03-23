import { useEffect, useState } from "react";
import { useAuthContext } from "./Auth";
// removed BrowserRouter, NavLink, Route, Routes from this import
import { useNavigate } from "react-router-dom";

function ProduceItem(props) {
  const [item, setItem] = useState([]);
  console.log("item", item);
  // const [delete, setDelete] = useState([]);
  useEffect(() => {
    async function getProduceItem() {
      let url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/${props.produce_id}`;
      let response = await fetch(url);
      let data = await response.json();
      if (response.ok) {
        setItem(data);
      }
    }
    getProduceItem();
    //eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const handleDelete = (e) => {
    fetch(
      `${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/${props.produce_id}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(() => {
      console.log("Produce deleted");
      navigate("/produce-admin");
      window.location.reload();
    });
  };
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  const { token } = useAuthContext();
  if (token) {
    const data = parseJwt(token);
    console.log("DATA", Object.entries(data));
    console.log("specific", Object.values(data));
    const user = Object.values(data);
    console.log(user[3]);
    const myUser = user[3];
    const valuesUser = Object.values(myUser);
    console.log(valuesUser[0]);
    const user_status = valuesUser[2];
    if (user_status.toLowerCase().includes("admin")) {
      return (
        <table className="table is-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Available</th>
              <th>Picture</th>
              <th>Length</th>
              <th>Height</th>
              <th>Width</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{item.product_name}</td>
              <td className="has-text-centered">
                {item.available ? "Yes" : "No"}
              </td>
              <td>
                <img
                  src={`https://vwfpix.s3.us-west-1.amazonaws.com/${item.picture_file}`}
                  id="image"
                  alt="Thumbnail"
                  className="user-post"
                  width={100}
                />
              </td>
              <td>{item.length}</td>
              <td>{item.height}</td>
              <td>{item.width}</td>
              <td>
                <button
                  type="button"
                  className="create-btn"
                  id="delete_item button"
                  onClick={() =>
                    handleDelete(`/produce-admin/${item.produce_id}`)
                  }
                >
                  Delete Item
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
  } else {
    return (
      <>
        <h2>You do not have access to this page.</h2>
      </>
    );
  }
}
export default ProduceItem;
