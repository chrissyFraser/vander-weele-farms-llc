
import { useAuthContext, getTokenData } from "./Auth.js";



function HomePage() {


    // const createProduce = "/produce-create"; 
    const { token } = useAuthContext()
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
    if (token) {
        const data = parseJwt(token)
        console.log("DATA", Object.entries(data))
        console.log("specific", Object.values(data))
        const user = Object.values(data)
        console.log(user[3])
        const myUser = user[3]
        const valuesUser = Object.values(myUser)
        console.log(valuesUser[0])
        // console.log(myId)
    }
    
    return(
        <div style={{textAlign: "center"}}>
        <h1 style={{textAlign: "center", }} >VanderWeele Farm</h1>
        <h3 style={{textAlign: "center"}}>Coming Soon!</h3>
        {/* <img src="https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/309061405_469280831892766_4474664018961093891_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0FFC68GtDTgAX-AlbXs&_nc_ht=scontent-sjc3-1.xx&oh=00_AT9g2FzUrWsYkJFyDtW4gdLwtT5MJPFI9j1_2Ee-bF5Hsg&oe=63537D39" alt="logo"/> */}
        </div>
    )
}
export default HomePage;