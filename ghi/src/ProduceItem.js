import { useAuthContext } from "./Auth";
import { useEffect, useState } from "react";
// removed BrowserRouter, NavLink, Route, Routes from this import
import { useNavigate } from "react-router-dom";

function ProduceItem(props) {
  const { token } = useAuthContext();
  const [item, setItem] = useState([]);
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
        headers: { "Content-Type": "application/json" },
      }
    ).then(() => {
      console.log("Produce deleted");
      navigate("/produce-admin");
      window.location.reload();
    });
  };
  if (token) {
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
                src={`https:vwimageuploads.s3.us-west-2.amazonaws.com/${item.picture_file}`}
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
                className="btn btn-primary"
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
  } else {
    console.log(token);
    return (
      <>
        <h2>You do not have permission to view this page.</h2>
      </>
    );
  }
}
export default ProduceItem;
