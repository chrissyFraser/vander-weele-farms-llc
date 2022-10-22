
import { useAuthContext } from "./Auth.js";


function HomePage() {
    // const createProduce = "/produce-create"; 
    const { token } = useAuthContext()
    console.log(token)
    return(
        <div style={{textAlign: "center"}}>
        <h1 style={{textAlign: "center", }} >VanderWeele Farm</h1>
        <h3 style={{textAlign: "center"}}>Coming Soon!</h3>
        <img src="https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/309061405_469280831892766_4474664018961093891_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0FFC68GtDTgAX-AlbXs&_nc_ht=scontent-sjc3-1.xx&oh=00_AT9g2FzUrWsYkJFyDtW4gdLwtT5MJPFI9j1_2Ee-bF5Hsg&oe=63537D39" alt="logo"/>
        </div>
    )
}
export default HomePage;