import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Home from "../pages/Home/Home";
import Movies from "../pages/Movies/Movies";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import SeatBooking from "../pages/SeatBooking/SeatBooking";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import ReturnPolicy from "../pages/ReturnPolicy/ReturnPolicy";
import UserProfilePage from "../pages/Dashboard/UserProfilePage";   
import TermsAndConditions from "../pages/TermsAndCondition/TermsAndCondition";

import Payment from "../pages/Payment/Payment";
import { ROUTES } from "../constants/RouteConstants";
import Showtime from "../pages/ShowTime/ShowTime";
import Search from "../pages/Search/Search";
import Ticket from "../pages/Ticket/Ticket";
import TheaterOwnerDashboard from "../pages/Dashboard/TheaterOwner";
import AdminDashboard from "../pages/Dashboard/Admin";


export function AppRouter() {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Main />}>
                <Route index element={<Home />} />
                <Route path={ROUTES.MOVIES} element={<Movies />} />
                <Route path={ROUTES.ABOUTUS} element={<AboutUs />} />
                <Route path={ROUTES.CONTACTUS} element={<ContactUs />} />
                <Route path={ROUTES.USE_DASHBOARD} element={<UserProfilePage />} />
                <Route path={ROUTES.THEATER_OWNER_DASHBOARD} element={<TheaterOwnerDashboard/>}/>
                <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard/>}/>
                <Route path={`${ROUTES.MOVIE_DETAILS}/:id`} element={<MovieDetails />} />
                <Route path={`${ROUTES.SHOWTME}/:id`} element={<Showtime />} />
                <Route path={`${ROUTES.SEAT_BOOKING}/:showTimeId`} element={<SeatBooking />} />
                <Route path={ROUTES.TERMS_CONDITION} element={<TermsAndConditions />} />
                <Route path={ROUTES.RETURN_POLICY} element={<ReturnPolicy />} />  
                <Route path={`${ROUTES.PAYMENT}/:bookingId`} element={<Payment />} />
                <Route path={ROUTES.SEARCH} element={<Search/>}/>  
                <Route path={`${ROUTES.TICKET}/:bookingId`} element={<Ticket/>}/>   
            </Route>
        </Routes>
    )
}