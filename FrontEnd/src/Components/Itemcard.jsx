const ItemCard = ({
  item,
  quantity,
  increment,
  decrement,
  isAdmin,
  onEdit,
  onDelete,
  hideDietIndicator = false, // 👈 new prop
}) => {
  return (
    <div className="flex flex-col items-center rounded-lg p-4 bg-white shadow-sm relative">
      
      {/* Conditionally render veg/non-veg icon */}
      {!hideDietIndicator && (
        <div className="absolute top-2 right-2">
          {item.veganFriendly ? (
            <span
              className="w-4 h-4 bg-green-600 rounded-full border-2 border-green-600 inline-block"
              title="Veg"
            />
          ) : (
            <span
              className="w-4 h-4 bg-red-600 rounded-full border-2 border-red-600 inline-block"
              title="Non Veg"
            />
          )}
        </div>
      )}

      <div className="relative">
        {!isAdmin && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-between">
            <button
              onClick={() => decrement(item.id)}
              className="text-sm border rounded-full w-6 h-6 bg-white cursor-pointer"
            >
              -
            </button>
            <button
              onClick={() => increment(item.id)}
              className="text-sm border rounded-full w-6 h-6 bg-white cursor-pointer"
            >
              +
            </button>
          </div>
        )}
        <img
          src={item.cuisineImg}
          alt={item.cuisineName}
          className="w-24 h-24 object-cover rounded-full border mx-auto"
        />
      </div>

      <div className="mt-2 text-center">
        <h3 className="font-semibold text-sm">{item.cuisineName}</h3>
        <h3 className="text-sm">₹{item.cuisinePrice}</h3>
        {!isAdmin && <h3 className="text-sm">Quantity: {quantity || 0}</h3>}
      </div>

      {isAdmin && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onEdit(item)}
            className="bg-blue-500 text-white text-sm px-2 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item._id, item.cuisineName)}
            className="bg-red-500 text-white text-sm px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
