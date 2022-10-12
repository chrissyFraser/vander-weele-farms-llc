import Products from "./product";

export default function Main(props) {
    const { cartItems, products, onAdd, onRemove } = props;
    return (
    <div className='block col-2'>
        <h2>Products</h2>
        <div className="row">
            {products.map((products) => (
                <Products 
                key={products.id}
                products={products}
                item={cartItems.find((x) => x.id === products.id)}
                onAdd={onAdd}
                onRemove={onRemove}
                ></Products>
            ))}
        </div>
    </div>
    );
}