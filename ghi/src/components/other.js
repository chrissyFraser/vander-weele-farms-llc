import React from "react"

export default function Header (props) {
    const {countCartItems} = props;
    return <div className="row center block">
        <div>
            <img src="https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/309061405_469280831892766_4474664018961093891_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=k7zIFnya-SsAX9PqDtS&_nc_ht=scontent-sjc3-1.xx&oh=00_AT9GdFObqxkNS0Qjg7gAb6umJ9DDCFQKvSj58w4UarmoXQ&oe=634999F9"/>
        </div>
        <div>
            <a href="#/">
                <h2>Shopping Cart</h2>
            </a>
        </div>
        <div>
            <a className="link" href="#/cart">
            Cart
            {" "}
            {countCartItems?(
                <button className="badge">{countCartItems}</button>
            ): ("")
            }
            </a>
            <p></p>
            <a className="link" href="#/signin">Sign In</a>
        </div>
    </div>
}