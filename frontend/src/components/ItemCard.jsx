import { Link } from "react-router-dom";

function ItemCard({ item = {}, onDelete }) {
  // Safely format price
  const formattedPrice =
    item.price !== undefined && item.price !== null && !isNaN(item.price)
      ? Number(item.price).toFixed(2)
      : "N/A";

  // Safely format date
  let formattedDate = "N/A";
  if (item.manufactureDate) {
    const date = new Date(item.manufactureDate);
    formattedDate = isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
  }

  return (
    <div className="card">
      <img
        src={item.imageUrl || "https://via.placeholder.com/400x220?text=Item"}
        alt={item.name || "Item image"}
        className="card-image"
      />
      <h3>{item.name || "Unnamed Item"}</h3>
      <p><strong>Category:</strong> {item.category || "N/A"}</p>
      <p><strong>Price:</strong> ${formattedPrice}</p>
      <p><strong>Manufacture Date:</strong> {formattedDate}</p>
      <p>{item.description || "No description available."}</p>

      <div className="card-actions">
        {item._id ? (
          <>
            <Link className="btn secondary" to={`/edit-item/${item._id}`}>Edit</Link>
            <button
              className="btn danger"
              onClick={() => onDelete && onDelete(item._id)}
            >
              Delete
            </button>
          </>
        ) : (
          <p><em>Item ID missing — cannot edit or delete.</em></p>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
