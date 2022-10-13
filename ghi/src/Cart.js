const [cartItems, setCartItems] = useState([]);
    const onAdd = (produce) => {
        const exist = cartItems.find((x) => x.id === produce.id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === produce.id ? { ...exist, qty: exist.qty + 1 } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...produce, qty: 1 }]);

        }
    };
    const onRemove = (produce) => {
        const exist = cartItems.find((x) => x.id === produce.id);
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x.id !== produce.id))
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id === produce.id ? { ...exist, qty: exist.qty - 1 } : x
                )
            )
        }
    }
    return <>
        <div>
            <Header countCartItems={cartItems.reduce((a, v) => a = a + v.qty, 0)}></Header>
            <div className="row">
                <Main onAdd={onAdd} produce={produce} />
                <Basket
                    onAdd={onAdd}
                    onRemove={onRemove}
                    cartItems={cartItems}>
                </Basket>
            </div>
        </div>
    </>
}