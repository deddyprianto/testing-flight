import { useState } from 'react';
import Reservation from './Reservation';
import axios from 'axios';
import Swal from 'sweetalert2';

const ReservationContainer = () => {
  const [view, setView] = useState('search'); // 'search', 'select', 'book', 'modify', 'cancel'
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [booking, setBooking] = useState(null);
  const [passengers, setPassengers] = useState([{ first_name: '', last_name: '', email: '', phone_number: '' }]);
  const [searchParams, setSearchParams] = useState({ origin: '', destination: '', date: '' });
  const [bookingId, setBookingId] = useState('');

  const API_URL = 'http://localhost:3000/api';

  // Search Flights
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/flights`, { params: searchParams });
      setFlights(response.data);
      setView('select');
    } catch (error) {
      Swal.fire({
        title: "Terjadi kesalahan saat mencari penerbangan",
        text: `Error searching flights: ${error}`,
        icon: "error"
      });
    }
  };

  // Select Flight
  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setView('book');
  };

  // Save Booking
  const handleSaveBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/bookings`, {
        flight_id: selectedFlight.flight_id,
        passenger_data: passengers
      });
      setBooking(response.data);
      Swal.fire({
        title: `Success, ID KAMU: ${response.data.booking_id}`,
        icon: "success"
      }).then((result) =>{
        if (result.isConfirmed) {
          window.location.reload()
        } 
      })
    
    } catch (error) {
      Swal.fire({
        title: "Terjadi kesalahan saat menyimpan pemesanan",
        text: `Error saving booking: ${error}`,
        icon: "error"
      });
    }
  };

  // Fetch Booking Details
  const fetchBookingDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/bookings/${bookingId}`);
      setBooking(response.data.booking);
      setPassengers(response.data.passengers);
      setView('modify');
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Maaf ${error?.response?.data?.error}` ,
        icon: "error"
      })
    }
  };

  // Modify Booking
  const handleModifyBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/bookings/${booking.booking_id}`, {
        status: booking.status,
        passenger_data: passengers
      });
      Swal.fire({
        title: "Success",
        text: "Pemesanan berhasil diperbarui",
        icon: "success"
      }).then((result) =>{
        if (result.isConfirmed) {
          window.location.reload()
        } 
      })
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Error modifying booking: ${error}`,
        icon: "error"
      })
    }
  };

  // Cancel Booking
  const handleCancelBooking = async () => {
    try {
      await axios.delete(`${API_URL}/bookings/${booking.booking_id}`);
      Swal.fire({
        title: "Success",
        text: "Pemesanan berhasil dibatalkan",
        icon: "success"
      }).then((result) =>{
        if (result.isConfirmed) {
          window.location.reload()
        } 
      })
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Terjadi kesalahan : ${error}`,
        icon: "error"
      })
    }
  };

  return (
    <Reservation  handleSearch={handleSearch} origin={origin}   flights={flights} view={view} bookingId={booking} fetchBookingDetails={fetchBookingDetails} handleSaveBooking={handleSaveBooking} handleSelectFlight={handleSelectFlight} passenger={passengers} searchParams={searchParams} setBookingId={setBookingId} setSearchParams={setSearchParams} handleModifyBooking={handleModifyBooking} handleCancelBooking={handleCancelBooking} passengers={passengers} setPassengers={setPassengers} setView={setView}/>
  )
}

export default ReservationContainer