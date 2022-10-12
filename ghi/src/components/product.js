export default function Products(props) {
    const {item, products, onAdd, onRemove} = props;
    return (
        <div className="card">
            <img className="small" src ={products.image} alt={products.name} />
            <h3>{products.name}</h3>
            <div>${products.price}</div>
            <div>
            {item ? (
            <div>
                <button onClick={() => onRemove(item)} className="remove">
                    -
                </button>
                <span className="p-1">{item.qty}</span>
                <button onClick={() => onAdd(item)} className="add">
                    +
                </button>
            </div>
            ): (
            <button onClick={() => onAdd(products)}>Add to Cart</button>
            )}
            </div>
        </div>
    )
}